/**
 * Created by adithep on 3/13/2017 AD.
 */


$(document).ready(function(){

    $('#btnSaveOtConfigFormular').on("click",function(){
        var datavar = $('#configtime-table').serialize();
        $.ajax({
            url: 'saveotconfig',
            data: datavar,
            type: 'POST',
            success: function (data) {
                console.log(data);
                if(parseInt(data)==1) {
                    showSaveSuccess();
                    //initForm('frmHoliday');
                   // $.pjax.reload({container: "#pjax_gridholiday"});  //Reload GridView
                }
                else { showSaveError(); }
            }
        });
    });
});