/**
 * Created by Benou on 08/03/15.
 */
( function() {

    var EntityModel = Backbone.Model.extend( {
        KEY_MAPPIMG: {
            n: "name",
            a: "address",
            c: "country",
            z: "zipCode",
            lat: "latitude",
            "long": "longitude",
            d: "description",
            t: "phone"
        },

        defaults: function() {
            return {
                name: "",
                address: "",
                country: "",
                zipCode: "",
                latitude: 0,
                longitude: 0,
                description: "",
                phone: "",
                geometry: null,
                itineraryURL: null
            };
        },

        parse: function( response, options ) {
            ( response ) || ( response = { } );
            var data = { };

            _.extend( data, response );

            for ( var key in this.KEY_MAPPIMG ) {
                if ( response[ key ] ) {
                    delete data[ key ];
                    data[ this.KEY_MAPPIMG[ key ] ] = response[ key ];
                }
            }

            data.geometry = {
                type: "Point",
                coordinates: [
                    response[ "long" ] || response.longitude,
                    response.lat || response.latitude
                ]
            };

            return data;
        }
    } );

    window.kps = window.kps || { };
    window.kps.EntityModel = window.kps.EntityModel || EntityModel;

} )();