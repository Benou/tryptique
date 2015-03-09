/**
 * Created by Benou on 07/03/15.
 */
( function() {

    var MapContainerView = Backbone.View.extend( {
        el: $( "#map_container").first(),
        events: {
            "click .icon_fullpage" : "toggleFullscreen"
        },

        _map: null,

        render: function() {
            this.$el.html( this.template() );

            // defaults to Google-style Mercator projection, so works
            // out of the box with OpenStreetMap and friends:
            var provider = new MM.TemplatedLayer( "http://tile.openstreetmap.org/{Z}/{X}/{Y}.png" );
            var markers = new MM.MarkerLayer();

            // without a size, it will expand to fit the parent:
            this._map = new MM.Map( this.el.id, provider );
            this._map.addLayer( markers );

            var locationList = [ ];
            var markerView = null;

            _.each( this.collection.models, function( entityModel ) {
                markerView = new kps.MarkerView( {
                    model: entityModel
                } ).render();

                markers.addMarker( markerView.el, entityModel.toJSON() );

                locationList.push( markerView.el.location );
            }, this );

            this._map.setExtent( locationList );

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
        }
    } );

    window.kps = window.kps || { };
    window.kps.MapContainerView = window.kps.MapContainerView || MapContainerView;

    function layoutFullMap() {
        $("div.visuel_client").css('display', 'none');
        $("div.visuel_video").css('display', 'none');
        $("div.visuel_form").addClass('visu2');
        $("div.visuel_map").addClass('visu1');
    };

    function layoutMiniMap() {
        $("div.visuel_client").css('display', 'block');
        $("div.visuel_video").css('display', 'block');
        $("div.visuel_form").removeClass('visu2');
        $("div.visuel_map").removeClass('visu1');
    };

} )();