/**
 * Created by adithep on 3/13/2017 AD.
 */


$(document).ready(function () {
    $("[data-mask]").inputmask();


    $('#btnSaveOTProfileRoute').on("click", function () {
        var start = $('#time_start');
        var end = $('#time_end');

        var f1 = validateHhMm(start);
        var f2 =true;
        if (end.val() != '') {
            var f2 = validateHhMm(end);
        }

        var f = frmValidate('frmOTProfileRoute');
        if (f && f1 && f2) {
            saveProfileRoute();
        }
        else {
            showWarningInputForm();
        }
    });

});

function saveProfileRoute() {
    var datavar = $('#frmOTProfileRoute').serialize();
    $.ajax({
        url: 'saveprofileroute',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmOTProfileRoute');
                $.pjax.reload({container: "#pjax_otconfigtimetable"});  //Reload GridView
            }
            else {
                showSaveError();
            }
        }
    });
}

function editprofileroute(id) {
    initForm('frmOTProfileRoute');
    $.ajax({
        url: 'editprofileroute',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            $('#hide_timetableedit').val(data.id);
            $('#profile_name').val(data.profile_name);
            $('#time_start').val(data.time_start);
            $('#time_end').val(data.time_end);
            $('#budget').val(data.budget);
            $("#timetable_status option[value='" + data.status_active + "']").attr("selected", "selected");
            $('#modalfrmOtProfileRoute').modal();
        }
    });
}

function deleteprofileroute(id) {
    $.ajax({
        url: 'deleteprofileroute',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            if(parseInt(data)==1) {
                showDeleteSuccess();
                $.pjax.reload({container: "#pjax_otconfigtimetable"});  //Reload GridView
            }
            else { showDeleteError(); }
        }
    });
}


//http://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes
function validateHhMm(inputField) {
    var isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.val());

    /*    if (isValid) {
     inputField.css('background-color','#bfa');
     } else {
     inputField.css('background-color','#fba');
     //inputField.style.backgroundColor = '#fba';
     }*/

    if (!isValid) {
        inputField.css('background-color', '#fba');
    }

    return isValid;
}

