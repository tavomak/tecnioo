$(function () {

    $('#btnDatepicker').on('click', function(){
        $('#datepickerRoutes').toggleClass('d-none');
    } )
    $( "#datepickerRoutes" ).datepicker();

    $('.routeCard').on('click', function(e) {
        e.preventDefault();
        $('.card-day-3 .badge-las-condes').toggleClass('bg-info');
        if ($(".card-day-3 .btn").length ) {
            $('.cardBtnAsignacion').toggleClass('d-none')
        }else {
            $('.card-day-3').append(`
                <button class="btn btn-outline-primary btn-sm mt-2 cardBtnAsignacion"> Asignar </button>
            `)
        }
    })


}); 