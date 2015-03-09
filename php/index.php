<?php
    include( "./httpful.phar" );
    require "Slim/Slim.php";
    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim();
    $app->get( "/config", "getConfig" );
    $app->get( "/entities", "getEntities" );
    $app->get( "/localization", "getLocalization" );
    $app->get( "/localization/:zipCode", "getLocalizationByZipCode" );
    $app->run();

    function getConfig() {
        $url = "http://ads.kpsule.me/kiastorelocator/kiastorelocator_2602635.xml";
        $response = \Httpful\Request::get( $url )->send();
        echo $response;
    }

    function getEntities() {
        $url = "https://espacelicencie.ffgolf.org/loisir/common/files/get_go_for_golf_capsule.php?k=244d043cc0dae4794a0a4fb6e2e933e4";
        $response = \Httpful\Request::get( $url )->send();
        echo $response;
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