/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var VideoContainerView = Backbone.View.extend( {
        el: $( "#video_container").first(),

        initialize: function() {
            this.listenTo( this.model, "change", this.render );
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
        }
    } );

    window.kps = window.kps || { };
    window.kps.VideoContainerView = window.kps.VideoContainerView || VideoContainerView;

} )();