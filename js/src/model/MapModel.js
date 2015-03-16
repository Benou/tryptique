/**
 * Created by Benou on 11/03/15.
 */
( function() {

    var MapModel = Backbone.Model.extend( {
        defaults: function() {
            return {
                zoom: 5,
                maxaffcity: 25
            };
        }
    } );

    window.kps = window.kps || { };
    window.kps.MapModel = window.kps.MapModel || MapModel;

} )();