/**
 * Created by Benou on 05/03/15.
 */
( function() {

    var Tryptique = Backbone.Router.extend( {
        _configModel: null,
        _entityList: null,
        _localizationModel: null,

        _mapView: null,

        initialize: function() {
            if ( window.tryptique_params ) {
                this._configModel = new kps.ConfigModel();
                this._configModel.on( "change", _.bind( this.onConfigChange, this ) );
                this._configModel.fetch( tryptique_params );
            }
        },

        onConfigChange: function() {
            this._entityList = new kps.EntityCollection();
            this._entityList.fetch( this._configModel.get( "entitiesURL" ), {
                success: _.bind( this.onEntitiesFetched, this )
            } );
        },

        onEntitiesFetched: function() {
            this._mapView = new kps.MapView( {
                collection: this._entityList
            } ).render();
            this._localizationModel = new kps.LocalizationModel();
            this._localizationModel.on( "change", _.bind( this.onLocalizationChange, this ) );
            this._localizationModel.fetch();
        },

        onLocalizationChange: function() {
            console.log( "  -> onLocalizationChange" );
        }
    } );

    window.kps = window.kps || { };
    window.kps.Tryptique = window.kps.Tryptique || Tryptique;

    $( document ).ready( function() {
        kps.Utils.loadTemplates( [ ], kps, function() {
            kps.app = new kps.Tryptique();
            Backbone.history.start();
        } );
    } );

} )();