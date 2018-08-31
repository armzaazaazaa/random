/**
 * Created by adithep on 6/20/2017 AD.
 */


$(document).ready(function(){

    $('#btnSavePayrollConfig').on("click",function(){
        var datavar = $('#payrollconfig-form').serialize();
        $.ajax({
            url: 'savepayrollconfig',
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