$(function () {

    //WIZARD ANIMATION ====================================================== //

    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 500,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeOutQuint'
        });
    });

    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 500,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeOutQuint'
        });
    });
    
    //WIZARD STEP 1 ====================================================== //
    $('.bk-step1-hidden').hide();
    $('#step1ShowResults').on('click', function () {
        $('.bk-step1-hidden').show('slow')
    });

    $('#step1SelectClientName').on('click', function (e) {
        e.preventDefault();
        $(this).find('.card').addClass('shadow');
        $('#step1Next').removeClass('disabled')
    });

    $('#step1Next').on('click', function () {
        var step1SelectCallSource = $('#step1SelectCallSource').val(),
            step1SelectCallType = $('#step1SelectCallType').val(),
            step1SelectClientType = $('#step1SelectClientType').val(),
            step1InputSelectTipe = $('#step1InputSelectTipe').val();
        console.log(step1SelectCallSource);
        console.log(step1SelectCallType);
        console.log(step1SelectClientType);
        console.log(step1InputSelectTipe);

        $('.list-step-1 i').removeClass('d-none');
    });

    $('#step1SelectClientType').on('change ', function(){
        var step1SelectClientTypeSelected = $(this).val();
        if (step1SelectClientTypeSelected != "Rut"){
            $('#step1InputSelectTipe').removeClass('Rut');
        }else{
            $('#step1InputSelectTipe').addClass('Rut');
        }
    });

    $('#step1SelectCallType').on('change', function(){
        var step1SelectCallType = $(this).val(),
        reloadClass = $(this).hasClass('reloadPage');
        if (step1SelectCallType == "Instalaciones *" || step1SelectCallType == 'Retiros **'){
            $(this).addClass('reloadPage');
            $('#progressStep').find('.list-step-3').remove();
            $('#progressStep').find('.list-step-4').remove();
            $('#progressbar').find('.progressbarItem-2').remove();
            $('#progressbar').find('.progressbarItem-3').remove();
            $('.step-remove').remove();
            $('.list-step-5 span').text('3 ');
            $('.list-step-2').addClass('itemIrregular');
        }
        if (reloadClass) {
            location.reload(true);
        }
    });

    //WIZARD STEP 2 ====================================================== //
    $('.bk-step2-hidden').hide();
    $('.step2AddNewContact-wrap').hide();

    $('#step2SelectClientType').on('change', function () {
        var step2SelectClientType = $(this).val();
        console.log(step2SelectClientType);

        $('.bk-step2-hidden').show('slow');
    });

    $('#step2AddNewContact').on('click', function () {
        $('.step2AddNewContact-wrap').show('slow');
    });
    //WIZARD STEP 3 ====================================================== //
    $('#agregarNuevaMaquina').on('click', function () {
        var numberCheckboxRandom = Math.floor(Math.random()*1000);
        $('#crearMaquinaModal').modal('hide');
        $('#contenedorMaquinasListado').append(
            '<li class="my-2">\n\
                <ul class="tecnioo-card d-flex align-items-center">\n\
                    <li class="tecnioo-card--item">\n\
                        <input class="custom-control-input" type="radio" id="checkboxForMachine-'+numberCheckboxRandom+'" name="checkboxForMachine">\n\
                        <label class="custom-control-label" for="checkboxForMachine-'+numberCheckboxRandom+'"></label>\n\
                    </li>\n\
                    <li class="tecnioo-card--item p-2 bg-grey w-100 row align-items-center">\n\
                        <div class="col-4 tecnioo-card--title"><span class="tecnioo-card--title__text"> <b>[Maquina Modelo]</b></span></div>\n\
                        <div class="col-4 tecnioo-card--place"> <span class="pl-2">[Maquina Código]</span></div>\n\
                        <div class="col-4">\n\
                            <div class="tecnioo-card--img m-auto"><img class="w-100" src="./assets/img/logo-cristal.jpg" alt=""></div>\n\
                        </div>\n\
                    </li>\n\
                </ul>\n\
            </li>'
        );
    });

    $('#step3Prev').on('click', function () {
        $('.list-step-1 i').addClass('d-none');
    });
    $('#step3Next').on('click', function () {
        $('.list-step-2 i').removeClass('d-none');
    });
    //WIZARD STEP 4 ====================================================== //
    $('#step4Prev').on('click', function () {
        $('.list-step-2 i').addClass('d-none');
    });
    $('#step4Next').on('click', function () {
        $('.list-step-3 i').removeClass('d-none');
    });
    //WIZARD STEP 5 ====================================================== //
    $('#step5Prev').on('click', function () {
        $('.list-step-3 i').addClass('d-none');
    });
    $('#step5Next').on('click', function () {
        $('.list-step-4 i').removeClass('d-none');
    });
    
    $('input.step5SelectCheckbox').on('change', function (evt) {
        if ($('#step5SelectCheckbox').find('.step5SelectCheckbox:checked').length > 3) {
            this.checked = false;
        }
    });
    //WIZARD STEP 6 ====================================================== //
    var fromDay = 'Lunes',
        toDay = 'Domingo',
        fromApe = '08:00',
        toApe = '15:00',
        fromCie = '15:00',
        toCie = '23:59';

    var saveResult = function (data) {
        fromDay = data.from_value;
        toDay = data.to_value;
    };
    var saveResult2 = function (data) {
        fromApe = data.from_value;
        toApe = data.to_value;
    };
    var saveResult3 = function (data) {
        fromCie = data.from_value;
        toCie = data.to_value;
    };

    var writeResult = function () {
        var result = "De: " + fromDay + " a: " + toDay,
            result2 = "De: " + fromApe + " a: " + toApe,
            result3 = "De: " + fromCie+ " a: " + toCie;
        $('#step6TableTimes').append(
            '<tr>\n\
                <td>'+ result +'</td>\n\
                <td>'+ result2 +'</td>\n\
                <td>'+ result3 +'</td>\n\
                <td><a href="#" class="eliminaHorario">Eliminar</a></td>\n\
            </tr>'
        );
    };
    $('#step6TableHorarios').delegate('.eliminaHorario', 'click', function (e){
        e.preventDefault();
        $(this).parents('tr').remove();
    });
    $("#selectTypeOfTime").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,
        //from: new Date().getDay(),
        values: [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo"
        ],
        onLoad: function (data) {
            saveResult(data);
            writeResult();
        },
        onChange: saveResult,
        onFinish: saveResult
    });
    $("#selectTimeStart").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,
        values: [
            '08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'
        ],
        onChange: function (data) {
            $('#HorarioAperturaDesde').val(data.from_value);
            $('#HorarioAperturaHasta').val(data.to_value);
        },
        onLoad: function (data) {
            saveResult2(data);
            writeResult();
        },
        onChange: saveResult2,
        onFinish: saveResult2
    });
    $("#selectTimeEnd").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,
        values: [
            '15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'
        ],
        onChange: function (data) {
            $('#HorarioCierreDesde').val(data.from_value);
            $('#HorarioCierreHasta').val(data.to_value);
        },
        onLoad: function (data) {
            saveResult3(data);
            writeResult();
        },
        onChange: saveResult3,
        onFinish: saveResult3
    });
    
    $('#step6Prev').on('click', function () {
        $('.list-step-4 i').addClass('d-none');
        $('.list-step-5 i').addClass('d-none');
        $('.itemIrregular i').addClass('d-none');
    });
    $('#step6Next').on('click', function () {
        $('.list-step-5 i').removeClass('d-none');
    });

    $('#step1SelectCallType').on('change', function(){
        var selectCallType = $(this).val();
        console.log(selectCallType);
    });
    $('#agregarHorario').on('click', writeResult);

    $('#selectAllcheckbox').click(function() {
        console.log('Funca')
        if ($(this).is(':checked')) {
            $('.tecnioo-card').find('.custom-control-input').attr('checked', true);
        } else {
            $('.tecnioo-card').find('.custom-control-input').attr('checked', false);
        }
    });

});