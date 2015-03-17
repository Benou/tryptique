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
            this.listenTo( this.model, "change", this.onLocalizationChange );
            return this;
        },

        changeLocalization: function( e ) {
            e.preventDefault();
            this.model.fetchByZipCode( this._$textInput.val() );

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "POSTALCODE",
                    label: this._$textInput.val()/*,
                    path: _config.eid_stat*/
                }
            } );
        },

        maximize: function() {
            this.$el.addClass( "visu2" );
        },

        minimize: function() {
            this.$el.removeClass( "visu2" );
        },

        onLocalizationChange: function() {
            this._$textInput.val( this.model.get( "city" ) );
        }
    } );

    window.kps = window.kps || { };
    window.kps.LocalizationFormView = window.kps.LocalizationFormView || LocalizationFormView;

} )();