/**
 * Created by Benou on 05/03/15.
 */
( function() {

    var Utils = {
        EARTH_RADIUS: 6378,

        loadTemplates: function( viewList, namespace, callback ) {
            var deferreds = [ ];

            $.each( viewList, function( index, view ) {
                if ( namespace[ view ] ) {
                    deferreds.push( $.get( "tpl/" + view + ".html", function( data ) {
                        namespace[ view ].prototype.template = _.template( data );
                    } ) );
                }
            } );

            $.when.apply( null, deferreds ).done( callback );
        },

        calculateDelta: function( c1, c2 ) {
            var a = c1.latitude * Math.PI / 180;
            var b = c2.latitude * Math.PI / 180;
            var c = c1.longitude * Math.PI / 180;
            var d = c2.longitude * Math.PI / 180;

            return kps.Utils.EARTH_RADIUS * Math.acos( Math.sin( a ) * Math.sin( b ) + Math.cos( a ) * Math.cos( b ) * Math.cos( c - d ) ) ;
        },

        sendMessage: function( data ) {
            console.log( data );
        }
    };

    window.kps = window.kps || { };
    window.kps.Utils = window.kps.Utils || Utils;

} )();