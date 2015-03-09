/**
 * Created by Benou on 06/03/15.
 */
( function() {

    var ConfigModel = Backbone.Model.extend( {
        url: "php/config",

        defaults: function() {
            return {
                entitiesURL: null
            };
        },

        fetch: function( tryptique_params, options ) {
            ( options ) || ( options = { } );
            _.extend( options, {
                parse: true,
                dataType: "text",
                url: this.url + "/" + tryptique_params.name + "/" + tryptique_params.id
            } );
            kps.ConfigModel.__super__.fetch.call( this, options );
        },

        parse: function( response, options ) {
            var $xml = $( $.parseXML( response ) );
            var data = {
                entitiesURL: $xml.find( "json_path" ).text()
            };

            return data;
        }
    } );

    window.kps = window.kps || { };
    window.kps.ConfigModel = window.kps.ConfigModel || ConfigModel;

} )();