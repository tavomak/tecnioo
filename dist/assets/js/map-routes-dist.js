
var markers = [];

function initMap() {
    var latlng = new google.maps.LatLng(-33.4041299, -70.657178),
        map = new google.maps.Map(document.getElementById('map'), { zoom: 8, center: latlng });


    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }


    recorreA();
    recorreB();
    recorreC();
    recorreD();

    function createMarkerA(position, icon, id, loc, map) {
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: icon,
            idCall: id,
            title: loc
        });
        var infowindow = new google.maps.InfoWindow();
        marker.addListener('click', function () {
        });
        markers.push(marker);
        return marker;
    }

    function createMarkerB(position, icon, id, loc, map) {
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: icon,
            idCall: id,
            title: loc
        });
        var infowindow = new google.maps.InfoWindow();

        markers.push(marker);
        return marker;
    }
    
    function recorreA() {
        var points = [
            {
                "id":"266",
                "lat":"-33.123457",
                "lng":"-71.570543",
                "dir":"AVDA LARRAIN 5862  LOC 4036 5862  L 0 LA REINA",
                "tec":"Juan Gonzalez",
                "loc":"FUENTE NICANOR SPA"
            },
            {
                "id":"269",
                "lat":"-33.8655349",
                "lng":"-71.661426",
                "dir":"GRAN AVENIDA 7716 7716 0 LA CISTERNA",
                "tec":"Juan Gonzalez",
                "loc":"CESAR CRISTOBAL ARANCIBIA FERNANDEZ"
            },
            {
                "id":"270",
                "lat":"-33.3865681",
                "lng":"-71.5224323",
                "dir":"EL RODEO 13032 0 LO BARNECHEA",
                "tec":"Juan Gonzalez",
                "loc":"SOCIEDAD GASTRONOMICA TANAKA SPA"
            }
            
        ];
        $.each(points, function (i, v) {
            var checkboxLat = v.lat,
            checkboxLng = v.lng,
            checkboxId = v.id,
            checkboxLoc = v.loc;
            createMarkerA(new google.maps.LatLng(checkboxLat, checkboxLng), './assets/img/favicon-a.png', checkboxId, checkboxLoc, map);
        });
    }
    
        function recorreB() {
            //var marker = createMarkerB(latlng, 125, map);
            var points = [
                {
                    "id":"266",
                    "lat":"-33.453397",
                    "lng":"-70.570569",
                    "dir":"AVDA LARRAIN 5862  LOC 4036 5862  L 0 LA REINA",
                    "tec":"Juan Gonzalez",
                    "loc":"FUENTE NICANOR SPA"
                },
                {
                    "id":"269",
                    "lat":"-33.525189",
                    "lng":"-70.661016",
                    "dir":"GRAN AVENIDA 7716 7716 0 LA CISTERNA",
                    "tec":"Juan Gonzalez",
                    "loc":"CESAR CRISTOBAL ARANCIBIA FERNANDEZ"
                },
                {
                    "id":"270",
                    "lat":"-33.353681",
                    "lng":"-70.522913",
                    "dir":"EL RODEO 13032 0 LO BARNECHEA",
                    "tec":"Juan Gonzalez",
                    "loc":"SOCIEDAD GASTRONOMICA TANAKA SPA"
                }
    
            ];
            $.each(points, function (i, v) {
                var checkboxLat = v.lat,
                    checkboxLng = v.lng,
                    checkboxId = v.id,
                    checkboxLoc = v.loc;
                createMarkerB(new google.maps.LatLng(checkboxLat, checkboxLng), './assets/img/favicon-b.png', checkboxId, checkboxLoc, map);
            });
        }


        function recorreC() {
            //var marker = createMarkerB(latlng, 125, map);
            var points = [
                {
                    "id":"266",
                    "lat":"-32.453397",
                    "lng":"-70.570569",
                    "dir":"AVDA LARRAIN 5862  LOC 4036 5862  L 0 LA REINA",
                    "tec":"Juan Gonzalez",
                    "loc":"FUENTE NICANOR SPA"
                },
                {
                    "id":"269",
                    "lat":"-32.525189",
                    "lng":"-70.661016",
                    "dir":"GRAN AVENIDA 7716 7716 0 LA CISTERNA",
                    "tec":"Juan Gonzalez",
                    "loc":"CESAR CRISTOBAL ARANCIBIA FERNANDEZ"
                },
                {
                    "id":"270",
                    "lat":"-32.353681",
                    "lng":"-70.522913",
                    "dir":"EL RODEO 13032 0 LO BARNECHEA",
                    "tec":"Juan Gonzalez",
                    "loc":"SOCIEDAD GASTRONOMICA TANAKA SPA"
                }
    
            ];
            $.each(points, function (i, v) {
                var checkboxLat = v.lat,
                    checkboxLng = v.lng,
                    checkboxId = v.id,
                    checkboxLoc = v.loc;
                createMarkerA(new google.maps.LatLng(checkboxLat, checkboxLng), './assets/img/favicon-c.png', checkboxId, checkboxLoc, map);
            });
        }


        function recorreD() {
            //var marker = createMarkerB(latlng, 125, map);
            var points = [
                {
                    "id":"266",
                    "lat":"-31.1453397",
                    "lng":"-70.1570569",
                    "dir":"AVDA LARRAIN 5862  LOC 4036 5862  L 0 LA REINA",
                    "tec":"Juan Gonzalez",
                    "loc":"FUENTE NICANOR SPA"
                },
                {
                    "id":"269",
                    "lat":"-32.1525189",
                    "lng":"-70.1661016",
                    "dir":"GRAN AVENIDA 7716 7716 0 LA CISTERNA",
                    "tec":"Juan Gonzalez",
                    "loc":"CESAR CRISTOBAL ARANCIBIA FERNANDEZ"
                },
                {
                    "id":"270",
                    "lat":"-32.1353681",
                    "lng":"-70.1522913",
                    "dir":"EL RODEO 13032 0 LO BARNECHEA",
                    "tec":"Juan Gonzalez",
                    "loc":"SOCIEDAD GASTRONOMICA TANAKA SPA"
                }
    
            ];
            $.each(points, function (i, v) {
                var checkboxLat = v.lat,
                    checkboxLng = v.lng,
                    checkboxId = v.id,
                    checkboxLoc = v.loc;
                createMarkerB(new google.maps.LatLng(checkboxLat, checkboxLng), './assets/img/favicon-d.png', checkboxId, checkboxLoc, map);
            });
        }
}