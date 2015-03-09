/**
 * Created by Benou on 05/03/15.
 */
( function() {

    var Utils = {
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
        }
    };

    window.kps = window.kps || { };
    window.kps.Utils = window.kps.Utils || Utils;

} )();