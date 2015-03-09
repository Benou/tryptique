/**
 * Created by Benou on 08/03/15.
 */
( function() {

    var EntityCollection = Backbone.Collection.extend( {
        url: "php/entities",
        model: kps.EntityModel,

        _localizationDefaults: { },
        _mapDefaults: { },

        fetch: function( url, options ) {
            ( options ) || ( options = { } );
            _.extend( options, {
                parse: true,
                dataType: "json"
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
        }
    } );

    window.kps = window.kps || { };
    window.kps.EntityCollection = window.kps.EntityCollection || EntityCollection;

} )();