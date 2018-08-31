/**
 * Created by adithep on 3/13/2017 AD.
 */


$(document).ready(function(){
    //btnSaveActivity
    $("#btnSaveActivity").on("click",function(){
        var f = frmValidate('frmOtActivity');
        if(!f) {
            showWarningInputForm();
        }
        else {
            saveotactivity();
        }
    });

    $('#btnAddNewOTActivity').on("click",function(){
        initForm('btnSaveActivity');
    });
});


function saveotactivity() {
    var datavar = $('#frmOtActivity').serialize();
    $.ajax({
        url: 'saveotactivity',
        data: datavar,
        type: 'POST',
        success: function (data) {
            if(parseInt(data)==1) {
                showSaveSuccess();
                initForm('frmOtActivity');
                $.pjax.reload({container: "#pjax_otactivity"});  //Reload GridView
            }
            else { showSaveError(); }
        }
    });
}


function updateotactivity(id) {
    initForm('frmOtActivity');
    $.ajax({
        url: 'editotactivity',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            $('#hide_activityedit').val(data.id);
            $('#activity_name').val(data.activity_name);
            $("#activity_status option[value='"+data.status_active+"']").attr("selected", "selected");
            $('#modalfrmOtActivity').modal();
        }
    });
}


function deleteotactivity(id) {
    $.ajax({
        url: 'deleteotactivity',
        data: {id: id,},
        type: 'POST',
        success: function (data) {
            if(parseInt(data)==1) {
                showDeleteSuccess();
                $.pjax.reload({container: "#pjax_otactivity"});  //Reload GridView
            }
            else { showDeleteError(); }
        }
    });
}