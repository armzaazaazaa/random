$(document).ready(function () {
    $("#btnSave").on("click", function () {
        var f = frmValidate('pgenerate');
        if (!f) {
            showWarningInputForm();
        } else {

            save(1);

        }
    });

});
function save() {
    var datavar = $('#pgenerate').serialize();
    var objForm = {};
    objForm.randorm = $('#randorm').val();
    objForm.numname = $('#numname').val();
    console.log(datavar);
    $.ajax({
        url: 'save',
        data: objForm,
        type: 'POST',
        success: function (data) {
            console.log(data);
            if (parseInt(data) == 1) {
                initForm('pgenerate');
                $.pjax.reload({container: "#pjax_tb"});  //Reload GridView
            }
            else {
                $.pjax.reload({container: "#pjax_tb"});  //Reload GridView
            }
        }
    });
}
function selecttab(val) {
    $(".tabselect").removeClass("active");
    $("#tabselect" + val).addClass("active");
    $("#tab" + val).addClass("active");

    if (val == 1) {
        $.pjax.reload({container: "#pjax_tb_adddeducttemp"}); //Reload GridView
    } else {
        $.pjax.reload({container: "#pjax_tb"}); //Reload GridView
    }


}


var keylist="0123456789"
var temp=''

function generatepass(plength){
    temp=''
    for (i=0;i<plength;i++)
        temp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
    return temp
}

function populateform(enterlength){
    document.pgenerate.output.value=generatepass(enterlength)
}