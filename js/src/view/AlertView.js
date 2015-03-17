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

        render: function() {
            this.$el.html( this.template() );
            return this;
        },

        open: function() {
            this._opened = true;
            this.$el.removeClass( "close" );
        },

        close: function() {
            this._opened = false;
            this.$el.addClass( "close" );
        }
    } );

    window.kps = window.kps || { };
    window.kps.AlertView = window.kps.AlertView || AlertView;

} )();