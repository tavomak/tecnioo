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
                //console.log(this)
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

                $('.tecnioo-card').each(function (i, v) {
                    var checkData = $(this).find('.custom-checkbox input').data('id');
                    //console.log(checkData);

                    if (checkData === myId) {

                        $(this).toggleClass('llamadoMarkerActivo');

                        var chequeadoAnterior = $(this).find('.bk-marker').prop('checked');

                        if (chequeadoAnterior) {
                            $(this).find('.bk-marker').prop('checked', false);
                        } else {
                            $(this).find('.bk-marker').prop('checked', true);
                            $(this).parent().prepend($(this));
                        }
                    }

                });

                registroPuntos();
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

    $(".bk-marker").change(function () {
        registroPuntos();
    });


    function registroPuntos(){
        var count = 0;
        $('.bk-marker:checked').each(function(){
            count += Number($(this).data('pts'));
        });
        $('.tecnioo-biglist--puntos').text(count);
    }
});