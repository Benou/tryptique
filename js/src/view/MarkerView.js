/**
 * Created by Benou on 09/03/15.
 */
( function() {

    var MarkerView = Backbone.View.extend( {
        tagName: "a",
        className: "marker",

        render: function() {
            this.$el.html( this.template() );
            this.$el.attr( "id", this.model.cid );
            this.$el.addClass( this.model.get( "type" ) == "user" ? "mk_user path" : "mk_shop" );
            return this;
        },

        reposition: function( localization ) {
            this.model.set( this.model.parse( localization ) );
        }
    } );

    window.kps = window.kps || { };
    window.kps.MarkerView = window.kps.MarkerView || MarkerView;

} )();