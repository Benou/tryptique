/**
 * Created by Benou on 07/03/15.
 */
( function() {

    var MapContainerView = Backbone.View.extend( {
        el: $( "#map_container").first(),
        events: {
            "click i.icon_fullscreen" : "toggleFullscreen",
            "click a.marker": "onMarkerClick",
            "click i.icon_close_shop": "closeShop"
        },

        _$fsBtn: null,
        _$shop: null,
        _map: null,

        initialize: function() {
            this.collection.on( "sort", _.bind( this.onCollectionSorted, this ) );
        },

        render: function() {
            this.$el.html( this.template() );

            // defaults to Google-style Mercator projection, so works
            // out of the box with OpenStreetMap and friends:
            var provider = new MM.TemplatedLayer( "http://tile.openstreetmap.org/{Z}/{X}/{Y}.png" );
            var markers = new MM.MarkerLayer();

            // without a size, it will expand to fit the parent:
            this._map = new MM.Map( $( "#map" ).attr( "id" ), provider );
            this._map.addLayer( markers );

            // Je récupère la balise shop
            this._$fsBtn = $( "i.icon_fullscreen" );
            this._$shop = $( "#shop" );

            _.each( this.collection.models, function( entityModel ) {
                markers.addMarker( new kps.MarkerView( {
                    model: entityModel
                } ).render().el, entityModel.toJSON() );
            }, this );

            return this;
        },

        toggleFullscreen: function() {
            if ( $("div.visuel_map" ).hasClass( 'visu1' ) ) {
                // alert( "affiche mini");
                layoutMiniMap();
            }
            else {
                // alert( "affiche full");
                layoutFullMap();
            }

            this._map._windowResize();
        },

        onCollectionSorted: function() {
            var locationList = [ ];
            var entityModel = null;

            _.times( this.collection._mapDefaults.maxaffcity, function( i ) {
                entityModel = this.collection.at( i );
                locationList.push( new MM.Location(
                    entityModel.get( "latitude" ),
                    entityModel.get( "longitude")
                ) );
            }, this );

            this._map.setExtent( locationList );
            this._map.setZoom( this.collection._mapDefaults.zoom );
        },

        onMarkerClick: function( e ) {
            var entityModel = this.collection.get( e.currentTarget.id );
            if ( entityModel ) {
                if ( !$("div.visuel_map" ).hasClass( 'visu1' ) ) {
                    this._$fsBtn.addClass( "close" );
                }

                this._$shop.removeClass( "close" );
            }
        },

        closeShop: function() {
            this._$fsBtn.removeClass( "close" );
            this._$shop.addClass( "close" );
        }
    } );

    window.kps = window.kps || { };
    window.kps.MapContainerView = window.kps.MapContainerView || MapContainerView;

    function layoutFullMap() {
        $("div.visuel_client").css('display', 'none');
        $("div.visuel_video").css('display', 'none');
        $("div.visuel_form").addClass('visu2');
        $("div.visuel_map").addClass('visu1');
        $( "i.icon_fullscreen" ).addClass( "top" );
    };

    function layoutMiniMap() {
        $("div.visuel_client").css('display', 'block');
        $("div.visuel_video").css('display', 'block');
        $("div.visuel_form").removeClass('visu2');
        $("div.visuel_map").removeClass('visu1');
        $( "i.icon_fullscreen" ).removeClass( "top" );

        if ( !$( "#shop" ).hasClass( "close" ) ) {
            $( "i.icon_fullscreen" ).addClass( "close" );
        }
    };

} )();