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
            createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', checkboxId, map);
        });

        function createMarker(position, icon, id, map) {
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                icon: icon,
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

                        var chequeadoAnterior = $(this).find('.bk-marker').prop('checked');

                        if (chequeadoAnterior) {
                            //var resta = (this).find('.bk-marker');
                            $(this).find('.bk-marker').prop('checked', false);
                            if (counter > 0) {
                                counter -= checkDataPts;
                            }
                        } else {
                            $(this).find('.bk-marker').prop('checked', true);
                            $(this).parent().prepend($(this));
                            counter += checkDataPts;
                            console.log(counter + "esta es la suma");
                        }
                    }

                });

            });

            markers.push(marker);
            return marker;
        }

        $('.bk-marker').on('click', function () {
            markers = [];
            $('.tecnioo-card').each(function (i, v) {
                var checkboxLat = $(this).find('.bk-marker').data('lat'),
                    checkboxLng = $(this).find('.bk-marker').data('lng'),
                    ceckboxChecked = $(this).find('.bk-marker').prop('checked'),
                    checkboxId = $(this).find('.bk-marker').data('id');

                    if (ceckboxChecked ){
                        createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', checkboxId, map);
                    } else{
                        createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', checkboxId, map);
                    }
            });

        });

    }
    google.maps.event.addDomListener(window, 'load', initMap);
});