/**
 * Created by Benou on 17/03/15.
 */
( function() {

    var AlertView = Backbone.View.extend( {
        el: $( "#alert" ).first(),

        events: {
            "click .icon_x_mark": "close"
        },

        _opened: false,
        _callback: null,

        render: function() {
            this.$el.html( this.template() );
            return this;
        },

        open: function( callback ) {
            this._opened = true;
            this._callback = callback;
            this.$el.removeClass( "close" );
        },

        close: function() {
            this._opened = false;
            this.$el.addClass( "close" );

            if ( this._callback ) {
                this._callback();
                this._callback = null;
            }
        }
    } );

    window.kps = window.kps || { };
    window.kps.AlertView = window.kps.AlertView || AlertView;

} )();