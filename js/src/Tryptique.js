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

        _maximized: false,

        initialize: function() {
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
        },

        minimize: function() {
            this._maximized = false;
            this._ctaView.show();
            this._videoView.show();
            this._localizationView.minimize();
            this._mapView.minimize();
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
            }

            this._localizationModel.fetch();
        },

        onLocalizationChange: function() {
            this._mapView.repositionUserMarker( this._localizationModel.toJSON() );
        }
    } );

    window.kps = window.kps || { };
    window.kps.Tryptique = window.kps.Tryptique || Tryptique;

    $( document ).ready( function() {
        kps.Utils.loadTemplates( [
            "CallToActionView",
            "VideoContainerView",
            "LocalizationFormView",
            "MapContainerView",
            "MarkerView",
            "ShopDetailsView"
        ], kps, function() {
            kps.app = new kps.Tryptique();
            Backbone.history.start();
        } );
    } );

} )();