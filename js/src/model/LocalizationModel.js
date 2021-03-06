/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var LocalizationModel = Backbone.Model.extend( {
        url: "php/index.php?action=localization",

        defaults: function() {
            return {
                timeZone: null,
                country: null,
                countryCode: null,
                region: null,
                regionCode: null,
                areaCode: 0,
                city: null,
                zipCode: null,
                latitude: 0,
                longitude: 0,
                metroCode: 0,
                dmaCode: 0
            };
        },

        fetch: function( options ) {
            ( options ) || ( options = { } );
            _.extend( options, {
                parse: true,
                dataType: "text",
                url: this.url
            } );
            kps.LocalizationModel.__super__.fetch.call( this, options );
        },

        fetchByZipCode: function( zipCode, options ) {
            ( options ) || ( options = { } );
            _.extend( options, {
                parse: true,
                dataType: "text",
                url: this.url + "&zipCode=" + encodeURIComponent( zipCode )
            } );
            kps.LocalizationModel.__super__.fetch.call( this, options );
        },

        parse: function( response, options ) {
            if ( !( /error/.test( response ) ) ) {
                var $xml = $( $.parseXML( response ) );
                var data = {
                    timeZone: $xml.find( "time_zone" ).text(),
                    country: $xml.find( "country" ).text(),
                    countryCode: $xml.find( "countrycode" ).text(),
                    region: $xml.find( "region" ).text(),
                    regionCode: $xml.find( "regioncode" ).text(),
                    areaCode: parseInt( $xml.find( "areacode" ).text() ),
                    city: $xml.find( "city" ).text(),
                    zipCode: $xml.find( "postalcode" ).text() || $xml.find( "postal_code" ).text(),
                    latitude: parseFloat( $xml.find( "latitude" ).text() ) || parseFloat( $xml.find( "lat" ).text() ),
                    longitude: parseFloat( $xml.find( "longitude" ).text() ) || parseFloat( $xml.find( "lng" ).text() ),
                    metroCode: parseInt( $xml.find( "metro_code" ).text() ),
                    dmaCode: parseInt( $xml.find( "dma_code" ).text() )
                };

                return data;
            }
            else {
                this.trigger( "error" );
            }
        }
    } );

    window.kps = window.kps || { };
    window.kps.LocalizationModel = window.kps.LocalizationModel || LocalizationModel;

} )();