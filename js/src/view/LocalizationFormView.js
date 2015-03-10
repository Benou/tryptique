/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var LocalizationFormView = Backbone.View.extend( {
        el: $( "#localization_form").first(),

        render: function() {
            this.$el.html( this.template() );
            return this;
        }
    } );

    window.kps = window.kps || { };
    window.kps.LocalizationFormView = window.kps.LocalizationFormView || LocalizationFormView;

} )();