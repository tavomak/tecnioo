$(function () {

    var markers = [];

    function initMap() {
        var latlng = new google.maps.LatLng(-33.4041299, -70.657178),
            map = new google.maps.Map(document.getElementById('map'), { zoom: 8, center: latlng });

        //var marker = createMarker(latlng, 125, map);
        $('.tecnioo-card').each(function (i, v) {
            var checkboxLat = $(this).find('.bk-marker').data('lat'),
                checkboxLng = $(this).find('.bk-marker').data('lng'),
                checkboxId = $(this).find('.bk-marker').data('id');
            createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), checkboxId, map);
        });

        function createMarker(position, id, map) {
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                idCall: id

            });
            marker.addListener('click', function () {
                console.log(this)
                var symbol = this.getIcon();
                if (symbol === undefined) {
                    this.setIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png');
                } else {
                    if (symbol === 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png') {
                        this.setIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png');
                    } else {
                        this.setIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png');
                    }
                }

                var myId = this.idCall;
                var counter = 0;

                $('.tecnioo-card').each(function (i, v) {
                    var checkData = $(this).find('.custom-checkbox input').data('id'),
                        checkDataPts = $(this).find('.custom-checkbox input').data('pts');
                    console.log(checkData);

                    if (checkData === myId) {

                        $(this).toggleClass('llamadoMarkerActivo');

                        var chequeadoAnterior = $(this).find('input[type="checkbox"]').prop('checked');

                        if (chequeadoAnterior) {
                            //var resta = (this).find('input[type="checkbox"]');
                            $(this).find('input[type="checkbox"]').prop('checked', false);
                            if (counter > 0) {
                                counter -= checkDataPts;
                            }
                        } else {
                            $(this).find('input[type="checkbox"]').prop('checked', true);
                            $(this).parent().prepend($(this));
                            counter += checkDataPts;
                            console.log(counter + "esta es la suma");
                        }
                    }

                });

            });

            /*deleteMarker = function (id) {
                var marker = markers[id]; // find the marker by given id
                marker.setMap(null);
            }*/


            markers.push(marker);
            return marker;
        }

        $('.bk-marker').on('click', function () {

            x = Number($(this).attr('data-lat'));
            y = Number($(this).attr('data-lng'));
            checkboxId = $(this).find('.bk-marker').data('id');
            markers.setMap(null);

            let marker = new google.maps.Marker({
                map: map,
                position: { lat: -33.397, lng: -70.644 },
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                },
                idCall: 10
            });

        });


        /*function pinSymbol(color) {
            return {
                path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
                fillColor: color,
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 1
            };
        }*/

        /*         google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        var symbol = this.getIcon();
                        if (symbol === undefined) {
                            this.setIcon(pinSymbol('blue'));
                        } else {
                            if (symbol.fillColor === 'blue') {
                                this.setIcon('https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png');
                            } else {
                                this.setIcon(pinSymbol('blue'));
                            }
                        }
                        var myId = this.idCall,
                            counter = 0;
        
                        $('.tecnioo-card').each(function (i, v) {
                            var checkData = $(this).find('.custom-checkbox input').data('id'),
                                checkDataPts = $(this).find('.custom-checkbox input').data('pts');
                            console.log(checkData);
                            console.log(checkDataPts);
        
                            if (checkData === myId) {
                                $(this).toggleClass('llamadoMarkerActivo');
        
                                var chequeadoAnterior = $(this).find('input[type="checkbox"]').prop('checked');
        
                                if (chequeadoAnterior) {
                                    //var resta = (this).find('input[type="checkbox"]');
                                    $(this).find('input[type="checkbox"]').prop('checked', false);
                                    if (counter > 0) {
                                        counter -= checkDataPts;
                                    }
                                } else {
                                    $(this).find('input[type="checkbox"]').prop('checked', true);
                                    $(this).parent().prepend($(this));
                                    counter += checkDataPts;
                                }
                            }
        
                        });
                        console.log(counter);
                        infowindow.setContent('#' + positions[i].idLlamado + ' ' + positions[i].direccion);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
        
                $('.custom-checkbox input[type="checkbox"]').click(function () {
        
                }); */
    }
    google.maps.event.addDomListener(window, 'load', initMap);
});