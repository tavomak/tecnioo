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
        on_error: function () { },
        format_on: 'keyup'
    });

    $('.inputsFormulario').rules("add", {
        required: true,
        number: true,
        minlength: 9,
        maxlength: 9,
        messages: {
            required: "Teléfono requerido",
            minlength: jQuery.validator.format("Por favor ingresa un teléfono de 9 digitos."),
            maxlength: jQuery.validator.format("Por favor ingresa un teléfono de 9 digitos."),
        }
    });

    /* $('#email').on('keyup keypress', function (e) {
        if ($(this).valid()) {
            $('#btnEnvia').prop('disabled', false);
        } else {
            $('#btnEnvia').prop('disabled', true);
        }
    }); */

    //Mensajes Personalizados
    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio",
        email: "Por favor ingresa un correo válido.",
        number: "Please sólo numeros",
        lettersonly: "Por favor ingresa sólo letras.",
        digits: "Por favor ingresa sólo números."
    });

    // Validador de RUT
    $.validator.addMethod("Rut", function (value, element) {
        return this.optional(element) || $.Rut.validar(value);
    }, "Este campo debe ser un rut valido.");

    // Validación de sólo letras y espacio
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Por favor ingresa sólo letras.");


});