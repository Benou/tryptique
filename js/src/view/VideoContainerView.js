/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var VideoContainerView = Backbone.View.extend( {
        el: $( "#video_container").first(),

        _player: null,
        _playhead: null,
        _quarterIndex: 0,
        _quarterDuration: 0,
        _initialized: false,

        initialize: function() {
            this.listenTo( this.model, "change", this.render );
        },

        render: function() {
            this.$el.html( this.template() );
            this.renderYoutubeVideo();
            return this;
        },

        renderYoutubeVideo: function() {
            var tag = document.createElement( "script" );
            tag.src = "https://www.youtube.com/iframe_api";

            var firstScriptTag = document.getElementsByTagName( "script" )[ 0 ];
            firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

            window.onYouTubeIframeAPIReady = _.bind( this.onYouTubeIframeAPIReady, this );
        },

        show: function() {
            this.$el.css( "display", "block" );
        },

        hide: function() {
            this.$el.css( "display", "none" );
        },

        updateQuarterIndex: function( value ) {
            var progress = 0;
            value = Math.max( 0, Math.min( Math.floor( value ), 4 ) );
            while ( this._quarterIndex < value ) {
                ++this._quarterIndex;
                progress = ( this._quarterIndex / 4 * 100 );

                kps.Utils.sendMessage( {
                    type: "STAT",
                    info: {
                        category: "PROGRESS",
                        action: "TEASER_" + ( progress < 100 ? progress : "COMPLETE" ),
                        value: progress
                    }
                } );
            }
        },

        onYouTubeIframeAPIReady: function() {
            this._player = new YT.Player( "player", {
                height: "100%",
                width: "100%",
                videoId: this.model.get( "videoURL" ),
                events: {
                    "onReady": _.bind( this.onPlayerReady, this ),
                    "onStateChange": _.bind( this.onPlayerStateChange, this )
                }
            } );
        },

        onPlayerReady: function( e ) {
            this._quarterIndex = 0;
            this._quarterDuration = this._player.getDuration() / 4;
        },

        onPlayerStateChange: function( e ) {
            if ( this._player.getVideoData().video_id != this.model.get( "videoURL" ) ) {
                return;
            }

            switch ( e.data ) {
                case YT.PlayerState.PLAYING:
                    if ( !this._initialized ) {
                        this._initialized = true;
                        this._quarterIndex = 0;
                        this._quarterDuration = this._player.getDuration() / 4;
                        this._playhead = setInterval(_.bind( function() {
                            this.updateQuarterIndex( this._player.getCurrentTime() / this._quarterDuration );
                        }, this ), 100 );

                        kps.Utils.sendMessage( {
                            type: "STAT",
                            info: {
                                category: "OPEN_CONTENT",
                                action: "TEASER_VIEW"
                            }
                        } );
                    }
                    break;

                case YT.PlayerState.PAUSED:
                    clearInterval( this._playhead );
                    this._playhead = 0;
                    break;

                case YT.PlayerState.ENDED:
                    clearInterval( this._playhead );
                    this._playhead = 0;
                    this.updateQuarterIndex( 4 );
                    this._quarterIndex = 0;
                    this._initialized = false;
                    break;

                default:
                    break;
            }
        }
    } );

    window.kps = window.kps || { };
    window.kps.VideoContainerView = window.kps.VideoContainerView || VideoContainerView;

} )();