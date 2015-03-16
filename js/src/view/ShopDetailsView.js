/**
 * Created by Benou on 10/03/15.
 */
( function() {

    var ShopDetailsView = Backbone.View.extend( {
        events: {
            "click .icon_map": "",
            "click .icon_phone": ""
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
        }
    } );

    window.kps = window.kps || { };
    window.kps.ShopDetailsView = window.kps.ShopDetailsView || ShopDetailsView;

} )();