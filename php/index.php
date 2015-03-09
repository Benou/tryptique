<?php
    include( "./httpful.phar" );
    require "Slim/Slim.php";
    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim();
    $app->get( "/config/:name/:id", "getConfig" );
    $app->get( "/entities", "getEntities" );
    $app->get( "/localization", "getLocalization" );
    $app->get( "/localization/:zipCode", "getLocalizationByZipCode" );
    $app->run();

    function getConfig( $name, $id ) {
        $url = "http://ads.kpsule.me/".$name."/".$name."_".$id.".xml";
        $response = \Httpful\Request::get( $url )->send();
        echo $response;
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
        $response = \Httpful\Request::get( $url )->send();
        echo $response;
    }

    function getLocalizationByZipCode( $zipCode ) {
        $url = "http://services.kpsule.me/cgi-bin/latlng?requ=".$zipCode;
        $response = \Httpful\Request::get( $url )->send();
        echo $response;
    }
?>