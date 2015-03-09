/**
 * Created by Benou on 07/03/15.
 */
( function() {

    var MapView = Backbone.View.extend( {
        el: $( "#map").first(),

        _map: null,

        render: function() {
            // defaults to Google-style Mercator projection, so works
            // out of the box with OpenStreetMap and friends:
            var provider = new MM.TemplatedLayer( "http://tile.openstreetmap.org/{Z}/{X}/{Y}.png" );
            var markers = new MM.MarkerLayer();

            // without a size, it will expand to fit the parent:
            this._map = new MM.Map( this.el.id, provider );
            this._map.addLayer( markers );

            var locationList = [ ];
            var entityView = null;

            _.each( this.collection.models, function( entityModel ) {
                entityView = new kps.EntityView( {
                    model: entityModel
                } ).render();

                markers.addMarker( entityView.el, entityModel.toJSON() );

                locationList.push( entityView.el.location );
            }, this );

            this._map.setExtent( locationList );

            return this;
        }
    } );

    window.kps = window.kps || { };
    window.kps.MapView = window.kps.MapView || MapView;

} )();