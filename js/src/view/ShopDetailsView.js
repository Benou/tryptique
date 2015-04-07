/**
 * Created by Benou on 10/03/15.
 */
( function() {

    var ShopDetailsView = Backbone.View.extend( {
        _opened: false,

        initialize: function() {
            this.model = new kps.EntityModel();
            this.listenTo( this.model, "change", this.render );

            if ( kps.Utils.canTouchThis() ) {
                this.delegateEvents( {
                    "touchstart .icon_map": "onMapClick",
                    "touchstart .icon_phone": "onPhoneClick"
                } );
            }
            else {
                this.delegateEvents( {
                    "click .icon_map": "onMapClick",
                    "click .icon_phone": "onPhoneClick"
                } );
            }
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            $( "h1.title", this.el ).css( "color", kps.app._configModel.get( "majorColor" ) );
            return this;
        },

        open: function() {
            this._opened = true;
            this.$el.removeClass( "close" );
        },

        close: function() {
            this._opened = false;
            this.$el.addClass( "close" );
        },

        setDetails: function( data ) {
            this.model.set( data );
        },

        onMapClick: function( e ) {
            e.stopImmediatePropagation();
            e.preventDefault();

            kps.Utils.sendMessage( {
                type: "EXTERNAL_LINK",
                info: {
                    action: "CUSTOM",
                    url: this.model.get( "itineraryURL" )
                }
            } );

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "ITINERARY",
                    label: this.model.get( "itineraryURL" )
                }
            } );
        },

        onPhoneClick: function() {
            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "EXTERNAL_LINK",
                    action: "CUSTOM",
                    label: this.model.get( "phone" )
                }
            } );

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "PHONE",
                    label: this.model.get( "phone" )
                }
            } );
        }
    } );

    window.kps = window.kps || { };
    window.kps.ShopDetailsView = window.kps.ShopDetailsView || ShopDetailsView;

} )();