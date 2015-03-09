/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var VideoContainerView = Backbone.View.extend( {
        el: $( "#video_container").first(),

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }
    } );

    window.kps = window.kps || { };
    window.kps.VideoContainerView = window.kps.VideoContainerView || VideoContainerView;

} )();