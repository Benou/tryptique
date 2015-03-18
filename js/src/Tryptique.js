/**
 * Created by Benou on 05/03/15.
 */
( function() {

    var Tryptique = Backbone.Router.extend( {
        _configModel: null,
        _entityList: null,
        _localizationModel: null,

        _ctaView: null,
        _videoView: null,
        _localizationView: null,
        _mapView: null,
        _alertView: null,
        _maximized: false,
        _ready: false,

        initialize: function() {
            $( "#collapse_button").on( "click touchstart", _.bind( this.onCollapseButtonClick, this ) );

            if ( window.tryptique_params ) {
                this._configModel = new kps.ConfigModel();

                this._ctaView = new kps.CallToActionView( {
                    model: this._configModel
                } );
                this._videoView = new kps.VideoContainerView( {
                    model: this._configModel
                } );

                this.listenTo( this._configModel, "change", this.onConfigChange );
                this._configModel.fetch( tryptique_params );
            }
        },

        toggleLayout: function() {
            if ( this._maximized ) {
                this.minimize();
            }
            else {
                this.maximize();
            }
        },

        maximize: function() {
            this._maximized = true;
            this._ctaView.hide();
            this._videoView.hide();
            this._localizationView.maximize();
            this._mapView.maximize();

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "MAXIMIZE"/*,
                     path: _config.eid_stat*/
                }
            } );
        },

        minimize: function() {
            this._maximized = false;
            this._ctaView.show();
            this._videoView.show();
            this._localizationView.minimize();
            this._mapView.minimize();

            kps.Utils.sendMessage( {
                type: "STAT",
                info: {
                    category: "CUSTOM",
                    action: "MINIMIZE"/*,
                     path: _config.eid_stat*/
                }
            } );
        },

        setDefaultLocalization: function() {
            this._localizationModel.set( this._configModel.get( "defaultLocalizationData" ) );
        },

        onCollapseButtonClick: function() {
            kps.Utils.sendMessage( {
                type: "COLLAPSE"
            } );
        },

        onConfigChange: function() {
            if ( !this._entityList ) {
                this._entityList = new kps.EntityCollection();

                this._mapView = new kps.MapContainerView( {
                    collection: this._entityList
                } );

                this.listenTo( this._entityList, "reset", this.onEntitiesChange );
            }

            this._entityList.fetch( this._configModel.get( "entitiesURL" ) );
        },

        onEntitiesChange: function() {
            if ( !this._localizationModel ) {
                this._localizationModel = new kps.LocalizationModel();

                this._localizationView = new kps.LocalizationFormView( {
                    model: this._localizationModel
                } );

                this.listenTo( this._localizationModel, "change", this.onLocalizationChange );
                this.listenTo( this._localizationModel, "error", this.onLocalizationError );
            }

            this._configModel.set( {
                defaultLocalizationData: this._entityList._defaultLocalizationData
            }, { silent: true } );

            this._localizationModel.fetch();
        },

        onLocalizationChange: function() {
            this._mapView.repositionUserMarker( this._localizationModel.toJSON() );
            this._ready = true;
        },

        onLocalizationError: function() {
            if ( !this._alertView ) {
                this._alertView = new kps.AlertView().render();
            }

            if ( this._ready ) {
                this._alertView.open();
            }
            else {
                this.setDefaultLocalization();
            }
        }
    } );

    window.kps = window.kps || { };
    window.kps.vars = window.kps.vars || { };
    window.kps.Tryptique = window.kps.Tryptique || Tryptique;

    $( document ).ready( function() {
        window.location.search.replace( /([^=&?]+)=([^&]*)/g, function( search, key, value ) {
            kps.vars[ key ] = decodeURIComponent( value );
        } );

        kps.Utils.loadTemplates( [
            "CallToActionView",
            "VideoContainerView",
            "LocalizationFormView",
            "MapContainerView",
            "MarkerView",
            "ShopDetailsView",
            "AlertView"
        ], kps, function() {
            kps.app = new kps.Tryptique();
            Backbone.history.start();
        } );
    } );

} )();