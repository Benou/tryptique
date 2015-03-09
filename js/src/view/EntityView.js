/**
 * Created by Benou on 09/03/15.
 */
( function() {

    var EntityView = Backbone.View.extend( {
        tagName: "a",
        className: "marker",

        render: function() {
            return this;
        }
    } );

    window.kps = window.kps || { };
    window.kps.EntityView = window.kps.EntityView || EntityView;

} )();