$(function () {

    //Selecciona todos los cheboxes en las tarjetas de llamados
    $('#selectAllcheckbox').click(function () {
        if ($(this).is(':checked')) {
            $('.tecnioo-card').find('.custom-control-input').attr('checked', true);
        } else {
            $('.tecnioo-card').find('.custom-control-input').attr('checked', false);
        }
    });

    // Arregla el campo de RUT
    $('.Rut').Rut({
        on_error: function () {
            console.log('rut invalido');
        },
        on_success: function () {
            console.log('RUT válido')
        },
        format_on: 'keyup'
    });

    // Validador de RUT
    $.validator.addMethod("Rut", function (value, element) {
        return this.optional(element) || $.Rut.validar(value);
    }, "Este campo debe ser un rut valido.");

    // Validación de sólo letras y espacio
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Por favor ingresa sólo letras.");

    $('#fieldsetStep1').validate({
        rules: {
            inputRut: {
                required: true,
                Rut: true,
            },
            inputNombre: {
                required: true,
                lettersonly: true,
            },
            inputTelefono: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9,
            },
            inputEmail: {
                required: true,
                email: true,
            },
        },
        messages: {
            step1SelectCallSource: { valueNotEquals: "Seleccionar un origen de llamado" }
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error)
            console.log(error);
        }
    });

}); 