$(function () {

    $('#btnDatepicker').on('click', function () {
        $('#datepickerRoutes').toggleClass('d-none');
    })
    $("#datepickerRoutes").datepicker();

    const TIME = new Date(),
    TODAY = TIME.getDay();

    $(`.weekDay-${TODAY}`).css({
        'color': 'white',
        'background' : '#007bff'
    });

    $(`.weekDay-${TODAY} .nav-item`).addClass('text-white');
    $(`.weekDay-${TODAY} #activeDay`).removeClass('d-none');

    $('.routeCard').on('click', function (e) {
        e.preventDefault(); //Prevenimos el comportamiento por defecto del evento
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        $('.routeCardGroup').fadeOut();

        //Si la tarjeta se activa se agrega un sombreado
        if ($(this).parents('.routeCardGroup').is('.shadow')) {
            $('.routeCardGroup').removeClass('shadow');
            $('#pills-home').find('.wrap').fadeIn()
            $('.routeCardGroup').fadeIn();

        } else {
            $('.routeCardGroup').removeClass('shadow');
            $(this).parents('.routeCardGroup').fadeIn();
            $(this).parents('.routeCardGroup').addClass('shadow');

            //Deselecciona todos los badges activos
            $('.badge--container .badge').removeClass('bg-info');
            //Oculta los botones activos
            $('.card-day').find('.cardBtnAsignacion').addClass('d-none')

            let rutas = $(this).data('rutas');
            //Si la maquina tiene rutas asignadas
            if (rutas.length) {
                $('#pills-home').find('.wrap').fadeOut()

                $.each(rutas, function (k, v) {
                    $('#pills-home').find('.ruta' + v).fadeIn()
                })
            } else {
                $('#pills-home').find('.wrap').fadeOut()

                setTimeout(function () {
                    $('.wrap-active').fadeIn()
                }, 0);
            }
        }

        //Seleccina y resalta las comunas
        let comuna = $(this).data('comuna');
        $(`[data-comuna=${comuna}]`).toggleClass('bg-info');
        $('.wrap').removeClass('wrap-active');
        $(`[data-comuna=${comuna}]`).parents('.wrap').addClass('wrap-active');

        //muestra u oculta el boton
        $(`[data-comuna=${comuna}]`).parents('.card-day').find('.cardBtnAsignacion').toggleClass('d-none')
    })

    $('.routeCardGroup select').on('change', function () {
        let value = this.value;
        if (value != "Seleccionar Ruta") {
            $(this).parents('.routeCardGroup').find('.btn').removeClass('d-none')
        } else {
            $(this).parents('.routeCardGroup').find('.btn').addClass('d-none')
        }
    });


}); 