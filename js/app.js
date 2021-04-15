$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function () {
        current_fs = $(this).parent().parent();
        next_fs = $(this).parent().parent().next();

        //Validation
        if (!validateFieldSet(current_fs)) return;

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        setProgressBar(++current);
    });

    $(".previous").click(function () {

        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    $(".submit").click(function () {
        return false;
    })

    /** 
     * Check if the current fieldset has been filled correctly
     * 
     * @return Boolean (true if filled correctly else false)
     */
    function validateFieldSet(currentFieldset) {

        var inputs = currentFieldset.find('input')
        var textareas = currentFieldset.find('textarea')
        var selects = currentFieldset.find('select')

        var fieldsetValid = true;

        inputs.each(function () {
            let fieldValue = $(this).val();
            if (fieldValue === '' || fieldValue === undefined || fieldValue === null) {
                $(this).addClass('is-invalid')

                fieldsetValid = false;
            }
        })

        textareas.each(function () {
            let fieldValue = $(this).val();
            if (fieldValue === '' || fieldValue === undefined || fieldValue === null) {
                $(this).addClass('is-invalid')
                fieldsetValid = false;
            }
        })

        selects.each(function () {
            let fieldValue = $(this).val();
            if (fieldValue === '' || fieldValue === undefined || fieldValue === null) {
                $(this).addClass('is-invalid')
                fieldsetValid = false;
            }
        })

        return fieldsetValid;
    }

    $("input").focus(function () {
        $(this).removeClass('is-invalid');
    });

});