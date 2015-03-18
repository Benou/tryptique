/**
 * Created by Benou on 17/03/15.
 */
( function() {

    var AlertView = Backbone.View.extend( {
        el: $( "#alert" ).first(),

        _opened: false,

        initialize: function() {
            if ( kps.Utils.canTouchThis() ) {
                this.delegateEvents( {
                    "touchstart .icon_x_mark": "close"
                } );
            }
            else {
                this.delegateEvents( {
                    "click .icon_x_mark": "close"
                } );
            }
        },

        render: function() {
            this.$el.html( this.template() );
            return this;
        },

        open: function() {
            this._opened = true;
            this.$el.removeClass( "close" );
        },

        close: function( e ) {
            e.stopImmediatePropagation();
            e.preventDefault();

            this._opened = false;
            this.$el.addClass( "close" );
        }
    } );

    window.kps = window.kps || { };
    window.kps.AlertView = window.kps.AlertView || AlertView;

} )();