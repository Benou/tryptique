/**
 * Created by Benou on 08/03/15.
 */
( function() {

    var EntityModel = Backbone.Model.extend( {
        KEY_MAPPIMG: {
            n: "name",
            a: "address",
            c: "country",
            z: "zipCode"
        },

        defaults: function() {
            return {
                name: "",
                adress: "",
                country: "",
                zipCode: "",
                geometry: null
            };
        },

        parse: function( response, options ) {
            ( response ) || ( response = { } );
            var data = { };

            for ( var key in this.KEY_MAPPIMG ) {
                if ( response[ key ] ) {
                    data[ this.KEY_MAPPIMG[ key ] ] = response[ key ];
                }
            }

            data.geometry = {
                type: "Point",
                coordinates: [ response.long, response.lat ]
            }

            return data;
        }
    } );

    window.kps = window.kps || { };
    window.kps.EntityModel = window.kps.EntityModel || EntityModel;

} )();