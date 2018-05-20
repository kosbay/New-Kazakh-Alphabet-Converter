$(document).ready(function(){
    /*$('.modal').modal();*/

    $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
        }
    );

    $('.collapsible').collapsible();

    $('#input_text').click(function (e) {

        $('.grid_left').addClass('state-focused')

        $('.state-focused').css({
           'display': 'block'
       })
        e.stopPropagation();
    });
    $('body').click(function () {
        $('.grid_left').removeClass('state-focused')
    });

    /*открытие клавиатуры*/
    $('textarea#input_text').mlKeyboard({layout: 'cy_RU', trigger: '.mdi-keyboard'});
    $('textarea#input_text').mlKeyboard({layout: 'la_KZ', trigger: '.mdi-arrow-expand'});


    $('#keyboard').on("click", function () {
        $('#keyboard').toggleClass('clicked');
    })

    /*var clipboard = new ClipboardJS('.copy');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });*/

    /*копировать*/
    new ClipboardJS('.copy');

    /*подсчет введенных символов*/
    $("#input_text").keyup(function () {
        var count = $("#input_text").val().length;
       $('#textCounter').text(count);
    });

    /*мобильное меню*/
    $('[data-activates="main-menu"]').sideNav();
    $('.collapsible').collapsible();
    $('select').material_select();

});

