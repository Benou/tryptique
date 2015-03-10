/**
 * Created by Benou on 09/03/15.
 */
( function() {

    var MarkerView = Backbone.View.extend( {
        tagName: "a",
        className: "marker",

        render: function() {
            this.$el.html( this.template() );
            return this;
        }
    } );

    window.kps = window.kps || { };
    window.kps.MarkerView = window.kps.MarkerView || MarkerView;

} )();