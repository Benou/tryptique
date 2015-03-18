/**
 * Created by Benou on 09/03/15.
 */
( function() {

    var CallToActionView = Backbone.View.extend( {
        el: $( "#cta").first(),

        initialize: function() {
            this.listenTo( this.model, "change", this.render );

            if ( kps.Utils.canTouchThis() ) {
                this.delegateEvents( {
                    "touchstart": "onCtaClick"
                } );
            }
            else {
                this.delegateEvents( {
                    "click": "onCtaClick"
                } );
            }
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
        },

        onCtaClick: function( e ) {
            e.stopImmediatePropagation();
            e.preventDefault();

            kps.Utils.sendMessage( {
                type: "EXTERNAL_LINK",
                info: {
                    action: "CUSTOM",
                    url: this.model.get( "ctaLinkURL" )
                }
            } );
        }
    } );

    window.kps = window.kps || { };
    window.kps.CallToActionView = window.kps.CallToActionView || CallToActionView;

} )();