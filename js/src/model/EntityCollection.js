/**
 * Created by Benou on 08/03/15.
 */
( function() {

    var EntityCollection = Backbone.Collection.extend( {
        url: "php/index.php?action=entities",
        model: kps.EntityModel,

        _defaultLocalizationData: { },
        _mapData: { },

        initialize: function() {
            ( this.model ) || ( this.model = kps.EntityModel );
        },

        fetch: function( source, options ) {
            ( options ) || ( options = { } );
            _.extend( options, {
                parse: true,
                reset: true,
                dataType: "json",
                url: this.url + "&source=" + encodeURIComponent( source )
            } );
            kps.EntityCollection.__super__.fetch.call( this, options );
        },

        parse: function( response, options ) {
            ( response ) || ( response = { } );
            var data = response.events ? response.events.slice() : null;

            _.extend( this._defaultLocalizationData, response.localisation );
            _.extend( this._mapData, response.map );
            this._mapData.maxaffcity = response.maxaffcity;

            return data;
        },

        calculateDelta: function( localization ) {
            _.each( this.models, function( m ) {
                m.set( {
                    delta: kps.Utils.calculateDelta( localization, m.toJSON() ),
                    itineraryURL: "https://www.google.fr/maps/preview/dir/" + localization.latitude + "," + localization.longitude + "/" + m.get( "latitude" ) + "," + m.get( "longitude" )
                } );
            }, this );

            this.comparator = "delta";
            this.sort();
        }
    } );

    window.kps = window.kps || { };
    window.kps.EntityCollection = window.kps.EntityCollection || EntityCollection;



} )();