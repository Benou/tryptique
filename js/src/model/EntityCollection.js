/**
 * Created by Benou on 08/03/15.
 */
( function() {

    var EntityCollection = Backbone.Collection.extend( {
        url: "php/entities",
        model: kps.EntityModel,

        _localizationDefaults: { },
        _mapDefaults: { },

        initialize: function() {
            ( this.model ) || ( this.model = kps.EntityModel );
        },

        fetch: function( source, options ) {
            ( options ) || ( options = { } );
            _.extend( options, {
                parse: true,
                reset: true,
                dataType: "json",
                url: this.url + "?source=" + encodeURIComponent( source )
            } );
            kps.EntityCollection.__super__.fetch.call( this, options );
        },

        parse: function( response, options ) {
            ( response ) || ( response = { } );
            var data = response.events ? response.events.slice() : null;

            _.extend( this._localizationDefaults, response.localisation );
            _.extend( this._mapDefaults, response.map );
            this._mapDefaults.maxaffcity = response.maxaffcity;

            return data;
        },

        calculateDelta: function( localization ) {
            _.each( this.models, function( m ) {
                m.set( "delta", kps.Utils.calculateDelta( localization, m.toJSON() ) );
            }, this );

            this.comparator = "delta";
            this.sort();
        }
    } );

    window.kps = window.kps || { };
    window.kps.EntityCollection = window.kps.EntityCollection || EntityCollection;



} )();