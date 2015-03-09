/**
 * Created by Benou on 09/03/15.
 */
( function() {

    var CallToActionView = Backbone.View.extend( {
        el: $( "#cta").first(),

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }
    } );

    window.kps = window.kps || { };
    window.kps.CallToActionView = window.kps.CallToActionView || CallToActionView;

} )();