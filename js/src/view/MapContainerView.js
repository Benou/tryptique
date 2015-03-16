/**
 * Created by Benou on 07/03/15.
 */
( function() {

    var MapContainerView = Backbone.View.extend( {
        el: $( "#map_container").first(),

        events: {
            "click .icon_fullscreen" : "toggleLayout",
            "click .marker": "openShopDetails",
            "click .icon_close_shop": "closeShopDetails"
        },

        _map: null,
        _markerLayer: null,
        _shopView: null,
        _$layoutButton: null,
        _userMarkerView: null,

        initialize: function() {
            this.listenTo( this.collection, "reset", this.onCollectionChange );
            this.listenTo( this.collection, "sort", this.onCollectionSorted );
        },

        render: function() {
            this.$el.html( this.template() );

            // defaults to Google-style Mercator projection, so works
            // out of the box with OpenStreetMap and friends:
            var provider = new MM.TemplatedLayer( "http://tile.openstreetmap.org/{Z}/{X}/{Y}.png" );
            this._markerLayer = new MM.MarkerLayer();

            // without a size, it will expand to fit the parent:
            this._map = new MM.Map( $( "#map" ).attr( "id" ), provider );
            this._map.addLayer( this._markerLayer );

            this._shopView = new kps.ShopDetailsView( {
                el: $( "#shop_details").first()
            } ).render();
            this._$layoutButton = $( ".icon_fullscreen", this.el );

            return this;
        },

        repositionUserMarker: function( localization ) {
            if ( !this._userMarkerView ) {
                _.extend( localization, {
                    type: "user"
                } );

                this._userMarkerView = new kps.MarkerView( {
                    model: new kps.EntityModel( localization, {
                        parse: true
                    } )
                } ).render();

                this._markerLayer.addMarker(
                    this._userMarkerView.el,
                    this._userMarkerView.model.toJSON()
                );
            }

            this._userMarkerView.reposition( localization );

            repositionMarker.call(
                this._markerLayer,
                this._userMarkerView.el,
                this._userMarkerView.model.toJSON()
            );

            this.collection.calculateDelta( localization );
        },

        toggleLayout: function() {
            kps.app.toggleLayout();
            this._map._windowResize();
        },

        maximize: function() {
            this.$el.addClass( "visu1" );
            this._$layoutButton.addClass( "top" );
        },

        minimize: function() {
            this.$el.removeClass( "visu1" );
            this._$layoutButton.removeClass( "top" );

            if ( this._shopView._opened ) {
                this._$layoutButton.addClass( "close" );
            }
        },

        openShopDetails: function( e ) {
            var entityModel = this.collection.get( e.currentTarget.id );
            if ( entityModel ) {
                if ( !kps.app._maximized ) {
                    this._$layoutButton.addClass( "close" );
                }

                this._shopView.open();
                this._shopView.setDetails( entityModel.toJSON() );
            }
        },

        closeShopDetails: function() {
            this._$layoutButton.removeClass( "close" );
            this._shopView.close();
        },

        onCollectionChange: function() {
            if ( !this.model ) {
                this.model = new kps.MapModel( this.collection._mapData );
                this.render();
            }

            this._markerLayer.removeAllMarkers();

            _.each( this.collection.models, function( entityModel ) {
                this._markerLayer.addMarker( new kps.MarkerView( {
                    model: entityModel
                } ).render().el, entityModel.toJSON() );
            }, this );

            this._map.setZoom( this.model.get( "zoom" ) );
        },

        onCollectionSorted: function() {
            var locationList = [ ];
            var entityModel = null;

            _.times( this.model.get( "maxaffcity" ), function( i ) {
                entityModel = this.collection.at( i );
                locationList.push( new MM.Location(
                    entityModel.get( "latitude" ),
                    entityModel.get( "longitude")
                ) );
            }, this );

            this._map.setZoom( this.model.get( "zoom" ) );
            this._map.setExtent( locationList );
        }
    } );

    window.kps = window.kps || { };
    window.kps.MapContainerView = window.kps.MapContainerView || MapContainerView;

    function repositionMarker( marker, feature ) {
        // convert the feature to a Location instance
        marker.location = this.coerceLocation( feature );
        // remember the tile coordinate so we don't have to reproject every time
        marker.coord = this.map.locationCoordinate( marker.location );
        // update the marker's position
        this.repositionMarker( marker );
    };

} )();