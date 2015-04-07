/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var LocalizationFormView = Backbone.View.extend( {
        el: $( "#localization_form").first(),

        _$textInput: null,

        initialize: function() {
            this.listenToOnce( this.model, "change", this.render );
            this.$el.submit( _.bind( this.changeLocalization, this ) );
            /*if ( kps.Utils.canTouchThis() ) {
                this.delegateEvents( {
                    "touchstart .btn.search": "changeLocalization"
                } );
            }
            else {
                this.delegateEvents( {
                    "click .btn.search": "changeLocalization"
                } );
            }*/
        },

        render: function() {
            this.$el.html( this.template() );
            this._$textInput = $( ".form_control", this.el );
            this.listenTo( this.model, "change", this.onLocalizationChange );
            return this;
        },

        changeLocalization: function( e ) {
            e.stopImmediatePropagation();
            e.preventDefault();

            this.model.fetchByZipCode( this._$textInput.val() );

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "POSTALCODE",
                    label: this._$textInput.val()
                }
            } );
            return false;
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