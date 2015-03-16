/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var LocalizationFormView = Backbone.View.extend( {
        el: $( "#localization_form").first(),

        events: {
            "click .btn.search": "changeLocalization"
        },

        _$textInput: null,

        initialize: function() {
            this.listenToOnce( this.model, "change", this.render );
        },

        render: function() {
            this.$el.html( this.template() );
            this._$textInput = $( ".form_control", this.el );
            return this;
        },

        changeLocalization: function() {
            this.model.fetchByZipCode( this._$textInput.val() );
        },

        maximize: function() {
            this.$el.addClass( "visu2" );
        },

        minimize: function() {
            this.$el.removeClass( "visu2" );
        }
    } );

    window.kps = window.kps || { };
    window.kps.LocalizationFormView = window.kps.LocalizationFormView || LocalizationFormView;

} )();