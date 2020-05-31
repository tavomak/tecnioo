
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


    recorrePorAsignar();
    recorreAsignados();

    function createMarkerAssigned(position, icon, id, tec, loc, map) {
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: icon,
            idCall: id,
            tec: tec,
            label: tec,
            title: loc
        });
        var infowindow = new google.maps.InfoWindow();
        marker.addListener('click', function () {
            infowindow.setContent('#' + id + '-' + tec);

            infowindow.open(map, marker);
        });
        markers.push(marker);
        return marker;
    }

    function createMarker(position, icon, id, loc, map) {
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: icon,
            idCall: id,
            title: loc
        });
        var infowindow = new google.maps.InfoWindow();

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

            var myId = this.idCall,
                prev_infowindow = false;
            var counter = 0;

            $('.tecnioo-card').each(function (i, v) {
                var checkData = $(this).find('.custom-checkbox input').data('id'),
                    checkDataPts = $(this).find('.custom-checkbox input').data('pts'),
                    dirCS = $(this).find('.custom-checkbox input').data('dir');
                //console.log(checkData);

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
                        //console.log(counter + "esta es la suma");
                    }
                    infowindow.close();
                    var contentString = '<div class="card" style="width: 22rem;border:none;">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">#' + myId + ' <small>Urgencia Cooler  [Modelo]</small></h5>' +
                        '<p class="card-text">' + dirCS + '</p>' +
                        '<a href="" class="btn btn-primary btn-sm m-auto">Ver detalle</a>' +
                        '<table class="table table-striped mt-4">' +
                        '<thead>' +
                        '<tr>' +
                        '<th scope="col">Días</th>' +
                        '<th scope="col">Apertura</th>' +
                        '<th scope="col">Cierre</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody id="step6TableTimes"><tr>' +
                        '<td>Lunes a Domingo</td>' +
                        '<td>08:00 a 15:00</td>' +
                        '<td>15:00 a 23:59</td>' +
                        '</tr><tr>' +
                        '<td>Lunes a Domingo</td>' +
                        '<td>08:00 a 15:00</td>' +
                        '<td>15:00 a 23:59</td>' +
                        '</tr></tbody>' +
                        '</table>' +
                        '</div> ';
                    infowindow.setContent(contentString);

                    if (prev_infowindow) {
                        prev_infowindow.close();
                    }
                    prev_infowindow = infowindow;
                    infowindow.open(map, marker);
                }

            });

            registroPuntos();

        });

        markers.push(marker);
        return marker;
    }

    $('#selectAllcheckbox').click(function () {
        deleteMarkers();
        if ($(this).is(':checked')) {
            $('.tecnioo-card').find('.custom-control-input').prop('checked', true);
            $('.tecnioo-card').each(function (i, v) {
                var checkboxLat = $(this).find('.bk-marker').data('lat'),
                    checkboxLng = $(this).find('.bk-marker').data('lng'),
                    ceckboxChecked = $(this).find('.bk-marker').prop('checked'),
                    checkboxLoc = $(this).find('.bk-marker').data('loc'),
                    checkboxId = $(this).find('.bk-marker').data('id');
                createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', checkboxId, checkboxLoc, map);
            });
        } else {
            $('.tecnioo-card').find('.custom-control-input').prop('checked', false);
            recorrePorAsignar();
        }
        recorreAsignados();
        registroPuntos();
    });

    $('#filterSla').click(function () {
        deleteMarkers();
        if ($(this).is(':checked')) {
            $('.tecnioo-card').each(function (i, v) {
                $(this).show("slow");
                var checksla = $(this).find('.bk-marker').data('sla');
                //console.log(Number(checksla));
                if (Number(checksla) < 24) {
                    //$(this).find('.custom-control-input').attr('checked', true);
                    var checkboxLat = $(this).find('.bk-marker').data('lat'),
                        checkboxLng = $(this).find('.bk-marker').data('lng'),
                        ceckboxChecked = $(this).find('.bk-marker').prop('checked'),
                        checkboxLoc = $(this).find('.bk-marker').data('loc'),
                        checkboxId = $(this).find('.bk-marker').data('id');
                    createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', checkboxId, checkboxLoc, map);
                } else {
                    $(this).hide("slow");
                }
            });
        } else {
            $(".tecnioo-card").each(function (i, v) {
                $(this).show("slow");
            });
            $('.tecnioo-card').find('.custom-control-input').attr('checked', false);
            recorrePorAsignar();
        }
        recorreAsignados();
        registroPuntos();

    });

    $('.bk-marker').on('click', function () {
        markers = [];
        //console.log("click!!")
        $('.tecnioo-card').each(function (i, v) {
            var checkboxLat = $(this).find('.bk-marker').data('lat'),
                checkboxLng = $(this).find('.bk-marker').data('lng'),
                ceckboxChecked = $(this).find('.bk-marker').prop('checked'),
                checkboxLoc = $(this).find('.bk-marker').data('loc'),
                checkboxId = $(this).find('.bk-marker').data('id');

            if (ceckboxChecked) {
                createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', checkboxId, checkboxLoc, map);
            } else {
                createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', checkboxId, checkboxLoc, map);
            }
        });

    });


    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        deleteMarkers();

        let dataTipe = $(this).data('tip');
        //console.log(dataTipe);

        if (dataTipe == 'todos') {
            $('.tecnioo-card').removeClass('d-none');
            recorrePorAsignar();
            recorreAsignados();
        } else {
            $('.tecnioo-card').each(function () {
                $(this).removeClass('d-none');
                let checkData = $(this).find('.custom-checkbox input').data('tip');

                if (checkData != dataTipe) {
                    $(this).addClass('d-none');
                }else {
                    var checkboxLat = $(this).find('.bk-marker').data('lat'),
                        checkboxLng = $(this).find('.bk-marker').data('lng'),
                        checkboxId = $(this).find('.bk-marker').data('id'),
                        checkboxLoc = $(this).find('.bk-marker').data('loc');
                    createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', checkboxId, checkboxLoc, map);
                }

            })
        }


    })

    /*Cambio de fecha*/

    $('#FechaAsignacion').on('dp.change', function (e) {

        $('.tecnioo-assigned-list').empty();
        var fecha = e.date.format('DD/MM/YYYY');
        $('.tecnioo-card-tecnico').each(function (i, v) {
            var x = $(this).attr('href'),
                indice = x.indexOf("&"),
                xCortado = x.substr(0, indice),
                concatenado = '&fechaAsignacion=';
            $(this).attr('href', xCortado + concatenado + fecha);
        });

        deleteMarkers();

        $.ajax({
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            url: '/Admin/GestionLlamados/jsonPuntosAsignados',
            data: { "fechaProgramacion": fecha },
            dataType: "json",
            beforeSend: function () {
                //alert(id);
            },
            success: function (data) {
                $.each(data, function (i, data) {
                    $('.tecnioo-assigned-list').append(
                        '<div class="tecnioo-assigned-card">\n\
                                <div class="custom-control-input bk-marker"\n\
                                    data-id="'+ data.IdLlamado + '"\n\
                                    data-lat="'+ data.Latitud + '"\n\
                                    data-lng="'+ data.Longitud + '"\n\
                                    data-dir="'+ data.DireccionCS + '"\n\
                                    data-tec="'+ data.NombreTecnico + '"\n\
                                    data-loc="'+ data.NombreLocalCS + '">\n\
                                </div>\n\
                            </div>'
                    );
                });
                recorrePorAsignar();
                recorreAsignados();

            },
            error: function (result) {
                alert('Falló el servicio de puntos: ' + result.status + ' Tipo :' + result.statusText);
            }
        });

        $.ajax({
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            url: '/Admin/GestionLlamados/jsonInfoTecPorFecha',
            data: { "fechaProgramacion": fecha },
            dataType: "json",
            beforeSend: function () {
                //alert(id);
            },
            success: function (data) {

                $.each(data, function (i, data) {
                    var nuevoWidth = 'width: ' + data.Porcentaje + '%';
                    $('#IdTecnico_' + data.IdTecnico).attr('style', nuevoWidth);
                    $('#cantOtTec_' + data.IdTecnico).text(data.CantOT + ' Tickets');
                    $('#CantPtsTec_' + data.IdTecnico).text(data.CantPuntos + ' pts');
                });


            },
            error: function (result) {
                alert('Falló el servicio de actualizacion info tecnicos: ' + result.status + ' Tipo :' + result.statusText);
            }
        });


    });

    function recorrePorAsignar() {
        //var marker = createMarker(latlng, 125, map);
        $('.tecnioo-card').each(function (i, v) {
            var checkboxLat = $(this).find('.bk-marker').data('lat'),
                checkboxLng = $(this).find('.bk-marker').data('lng'),
                checkboxId = $(this).find('.bk-marker').data('id'),
                checkboxLoc = $(this).find('.bk-marker').data('loc');
            createMarker(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', checkboxId, checkboxLoc, map);
        });
    }

    function recorreAsignados() {
        $('.tecnioo-assigned-card').each(function (i, v) {
            var checkboxLat = $(this).find('.bk-marker').data('lat'),
                checkboxLng = $(this).find('.bk-marker').data('lng'),
                checkboxId = $(this).find('.bk-marker').data('id'),
                checkboxLoc = $(this).find('.bk-marker').data('loc'),
                checkboxTec = $(this).find('.bk-marker').data('tec');
            createMarkerAssigned(new google.maps.LatLng(checkboxLat, checkboxLng), 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', checkboxId, checkboxTec, checkboxLoc, map);
        });
    }
}

$(".bk-marker").change(function () {
    registroPuntos();
});


function registroPuntos() {
    var count = 0;
    $('.bk-marker:checked').each(function () {
        count += Number($(this).data('pts'));
    });
    $('.tecnioo-biglist--puntos').text(count);
}
