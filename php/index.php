<?php
    require "Httpful/Bootstrap.php";
    \Httpful\Bootstrap::init();

    switch ( $_GET[ "action" ] ) {
        case "config":
            getConfig();
            break;

        case "entities":
            getEntities();
            break;

        case "localization":
            getLocalization();
            break;

        default:
            break;
    }

    function getConfig() {
        if ( isset( $_GET[ "name" ] ) && isset( $_GET[ "id" ] ) ) {
            $url = "http://ads.kpsule.me/".$_GET[ "name" ]."/".$_GET[ "name" ]."_".$_GET[ "id" ].".xml";
            $response = \Httpful\Request::get( $url )->send();
            echo $response;
        }
    }

    function getEntities() {
        if ( isset( $_GET[ "source" ] ) ) {
            $url = urldecode( $_GET[ "source" ] );
            $response = \Httpful\Request::get( $url )->send();
            echo $response;
        }
    }

    function getLocalization() {
        $url = "http://services.kpsule.me/cgi-bin/geoip-query";
        if ( isset( $_GET[ "zipCode" ] ) ) {
            $url = "http://services.kpsule.me/cgi-bin/latlng?req=".urlencode( $_GET[ "zipCode" ] );
        }
        $response = \Httpful\Request::get( $url )->send();
        echo $response;
    }
?>