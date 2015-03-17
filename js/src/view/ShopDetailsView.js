/**
 * Created by Benou on 10/03/15.
 */
( function() {

    var ShopDetailsView = Backbone.View.extend( {
        events: {
            "click .icon_map": "onMapClick",
            "click .icon_phone": "onPhoneClick"
        },

        _opened: false,

        initialize: function() {
            this.model = new kps.EntityModel();
            this.listenTo( this.model, "change", this.render );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
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

        onMapClick: function() {
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
                    label: this.model.get( "itineraryURL" )/*,
                    path: _config.eid_stat*/
                }
            } );
        },

        onPhoneClick: function() {
            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "EXTERNAL_LINK",
                    action: "CUSTOM",
                    label: this.model.get( "phone" )/*,
                     path: _config.eid_stat*/
                }
            } );

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "PHONE",
                    label: this.model.get( "phone" )/*,
                     path: _config.eid_stat*/
                }
            } );
        }
    } );

    window.kps = window.kps || { };
    window.kps.ShopDetailsView = window.kps.ShopDetailsView || ShopDetailsView;

} )();