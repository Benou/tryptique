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

        initialize: function() {
            if ( window.tryptique_params ) {
                this._configModel = new kps.ConfigModel();
                this._configModel.on( "change", _.bind( this.onConfigChange, this ) );
                this._configModel.fetch( tryptique_params );
            }
        },

        onConfigChange: function() {
            this._ctaView = new kps.CallToActionView( {
                model: this._configModel
            } ).render();
             this._videoView = new kps.VideoContainerView( {
             model: this._configModel
             } ).render();
            this._entityList = new kps.EntityCollection();
            this._entityList.on( "reset", _.bind( this.onEntitiesChange, this ) );
            this._entityList.fetch( this._configModel.get( "entitiesURL" ) );
        },

        onEntitiesChange: function() {
            this._localizationModel = new kps.LocalizationModel();
            this._localizationView = new kps.LocalizationFormView( {
                model: this._localizationModel
            } ).render();
            this._mapView = new kps.MapContainerView( {
                collection: this._entityList
            } ).render();
            this._localizationModel.on( "change", _.bind( this.onLocalizationChange, this ) );
            this._localizationModel.fetch();
        },

        onLocalizationChange: function() {
            this._entityList.calculateDelta( this._localizationModel.toJSON() );
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
            "MarkerView"
        ], kps, function() {
            kps.app = new kps.Tryptique();
            Backbone.history.start();
        } );
    } );

} )();