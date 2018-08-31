/**
 * Created by adithep on 4/7/2017 AD.
 */


$(document).ready(function () {
    $("[data-mask]").inputmask();

    $('#btnAddNewBenefitStructure').on("click",function () {
        initForm('frmBenefitStructure');
    });

    $('#btnSaveBenefitincomeStructure').on("click",function () {

        var f = frmValidate('frmBenefitStructure');
        if (f) {
            saveBenefitincomeStructure();
        }
        else {
            showWarningInputForm();
        }
    });

});


function saveBenefitincomeStructure() {
    var datavar = $('#frmBenefitStructure').serialize();
    $.ajax({
        url: 'savebenefitincomestructure',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if (parseInt(data) == 1) {
                showSaveSuccess();
                initForm('frmBenefitStructure');
                $.pjax.reload({container: "#pjax_benefitstructure"});  //Reload GridView
            }
            else {
                showSaveError();
            }
        }
    });
}



function editBenefitincomeStructure(id) {
    initForm('frmBenefitStructure');
    $.ajax({
        url: 'editbenefitincomestructure',
        data: {id: id,},
        type: 'POST',
        success: function (res) {
            $.each(res, function(index, value) {
                $('#' + index).val(value);
            });
            $('#hide_benefitstructureedit').val(res.id);

            $('#be_from_year').val(res.from_year);
            $('#be_to_year').val(res.to_year);
            $('#be_remark').val(res.remark);
            $("#benefitincome_status option[value='" + res.status_active + "']").prop("selected", true);
            $('#modalfrmBenefitStructure').modal();
        }
    });
}

function deleteBenefitincomeStructure(id) {
    $.ajax({
        url: 'deletebenefitincomestructure',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            if(parseInt(data)==1) {
                showDeleteSuccess();
                $.pjax.reload({container: "#pjax_benefitstructure"});  //Reload GridView
            }
            else { showDeleteError(); }
        }
    });
}