/**
 * Created by adithep on 4/7/2017 AD.
 */

$(document).ready(function () {
    $("[data-mask]").inputmask();

    $('#btnAddNewBenefitStructure').on("click",function () {
        initForm('frmSsoStructure');
    });

    $('#btnSaveSSOincomeStructure').on("click",function () {

        var f = frmValidate('frmSsoStructure');
        if (f) {
            saveSSOincomeStructure();
        }
        else {
            showWarningInputForm();
        }
    });

});


function saveSSOincomeStructure() {
    var datavar = $('#frmSsoStructure').serialize();
    $.ajax({
        url: 'savessoincomestructure',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmSsoStructure');
                $.pjax.reload({container: "#pjax_pjax_ssostructure"});  //Reload GridView
            }
            else {
                showSaveError();
            }
        }
    });
}



function editSSOincomeStructure(id) {
    initForm('frmSsoStructure');
    $.ajax({
        url: 'editssoincomestructure',
        data: {id: id,},
        type: 'POST',
        success: function (res) {
            $.each(res, function(index, value) {
                $('#' + index).val(value);
            });
            $('#hide_ssostructureedit').val(res.id);

            $("#ssoincome_status option[value='" + res.status_active + "']").prop("selected", true);
            $("#is_calculate_percent option[value='" + res.is_calculate_percent + "']").prop("selected", true);
            $('#modalfrmSsoStructure').modal();
        }
    });
}

function deleteSSOincomeStructure(id) {
    $.ajax({
        url: 'deletessoincomestructure',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            if(parseInt(data)==1) {
                showDeleteSuccess();
                $.pjax.reload({container: "#pjax_ssostructure"});  //Reload GridView
            }
            else { showDeleteError(); }
        }
    });
}