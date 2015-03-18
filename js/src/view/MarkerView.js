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
            if ( this.model.get( "type" ) == "user" ) {
                this.$el.addClass( "mk_shop" );
            }
            else {
                this.$el.find( "path" ).css( "fill", kps.app._configModel.get( "darkColor" ) );
            }

            return this;
        },

        reposition: function( localization ) {
            this.model.set( this.model.parse( localization ) );
        }
    } );

    window.kps = window.kps || { };
    window.kps.MarkerView = window.kps.MarkerView || MarkerView;

} )();