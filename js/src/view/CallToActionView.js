/**
 * Created by Benou on 09/03/15.
 */
( function() {

    var CallToActionView = Backbone.View.extend( {
        el: $( "#cta").first(),

        initialize: function() {
            this.listenTo( this.model, "change", this.render );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        show: function() {
            this.$el.css( "display", "block" );
        },

        hide: function() {
            this.$el.css( "display", "none" );
        }
    } );

    window.kps = window.kps || { };
    window.kps.CallToActionView = window.kps.CallToActionView || CallToActionView;

} )();