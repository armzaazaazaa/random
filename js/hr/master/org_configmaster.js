/**
 * Created by adithep on 3/17/2017 AD.
 */



$(document).ready(function(){

    $('#btnSaveOrgMaster').on("click",function(){
        var datavar = $('#frmOrgConfigMaster').serialize();
        $.ajax({
            url: 'saveorgconfig',
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