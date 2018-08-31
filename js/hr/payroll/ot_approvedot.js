/**
 * Created by adithep on 6/7/2017 AD.
 */

$(document).ready(function () {


    $('#btnSaveApproved').one( "click", function() {
        SaveApproved(1);
    });

    $('#btnSaveApprovedHr').one( "click", function() {
        SaveApproved(2);
    });

    $('#btnCancelReply').one( "click", function() {
        CancelReply();
    });

    $('#btnApprovedAll').on("click",function(){
        ApprovedAll();
    });

    $('#btnApprovedPartial').on("click",function(){
        UnApprovedAll();
    });

    var isApproved = $('#is_approved').val();
    var isHrApproved = $('#is_hr_approved').val();
    var opt = $('#opt').val();

    if(isApproved=="1") {
        $("input[id^='item_approveda_']").each(function () {
            $(this).prop('disabled',true);
        });
        $("input[id^='item_approvedb_']").each(function () {
            $(this).prop('disabled',true);
        });
    }


    if(opt==='hr') {
        if(isHrApproved=="1") {
            $("input[id^='item_approveda_']").each(function () {
                $(this).prop('disabled',true);
            });
            $("input[id^='item_approvedb_']").each(function () {
                $(this).prop('disabled',true);
            });
        }
        else {
            $("input[id^='item_approveda_']").each(function () {
                $(this).prop('disabled',false);
            });
            $("input[id^='item_approvedb_']").each(function () {
                $(this).prop('disabled',false);
            });
        }
    }


});


function SaveApproved(mode) {

    var url = (parseInt(mode)===1) ? 'saveapproved' : 'saveapprovedhr';

    var f = checkForm();
    if(f) {
        var crsf = $('meta[name="csrf-token"]').attr("content");
        var datavar = '_csrf='+crsf+'&'+$('#frmApproved').serialize();
        $.ajax({
            url: url,
            data: datavar,
            type: 'POST',
            success: function (data, textStatus, jQxhr) {
                if(parseInt(data)==1) {
                    showMessageBox('บันทึกรายการเรียบร้อยแล้ว');
                    $('#btnSaveApproved').prop('disabled',true);
                    $('#btnSaveApprovedHr').prop('disabled',true);
                    $('#btnCancelReply').prop('disabled',true);
                    window.location.reload();
                }
                else {
                    showSaveError();
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}


function CancelReply() {
    bootbox.confirm("คุณแน่ใจว่าจะส่งรายการนี้ปรับปรุงอีกครั้ง?", function(result) {
        if (result == 1) {
            var objVar = {};
            objVar.id = $('#rqmaster_id').val();
            objVar._csrf = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                url: 'otcancelreply',
                data: objVar,
                type: 'POST',
                success: function (data, textStatus, jQxhr) {
                    if(data=="1") {
                        showMessageBox('บันทึกรายการเรียบร้อยแล้ว');
                        $('#btnSaveApproved').prop('disabled',true);
                        $('#btnCancelReply').prop('disabled',true);
                    }
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    });
}

function checkForm() {

    var fa = [];
    var fb = [];
    $("input[id^='item_approveda_']").each(function () {
        var a = $(this).is(':checked');
        fa.push(a); //collect value of item approved
    });
    $("input[id^='item_approvedb_']").each(function () {
        var b = $(this).is(':checked');
        fb.push(b); //collect value of item unapproved
    });

    var c = fa.length;
    var pass = true;
    for(var i=0;i<c;i++) {  //Loop thought array fa, fb
        if(fa[i]==false && fb[i]==false) {  //check if approved and unapproved not checked
            pass = false;
            break;
        }
    }

    if(!pass) {
        showMessageBox('มีบางรายการไม่ได้ระบุการอนุมัติ');
        return false;
    }
    else {
        return true;
    }
}


function ApprovedAll() {
    $("input[id^='item_approveda_']").each(function () {
        $(this).prop('checked', true);

    });

    $("input[id^='item_comment_']").each(function () {
        $(this).val('');
        $(this).css('display','none');
    });


}

function ApprovedOne(id) {
    var me = $('#item_approveda_'+id);
    me.prop('checked', true);

    var me = $('#item_comment_'+id);
    me.val('');
    me.css('display','none');
}


function UnApprovedAll() {
    $("input[id^='item_approvedb_']").each(function () {
        $(this).prop('checked', true);
    });
    $("input[id^='item_comment_']").each(function () {
        $(this).css('display','block');
    });
}


function UnApprovedOne(id) {
    var me = $('#item_approvedb_'+id);
    me.prop('checked', true);

    var me = $('#item_comment_'+id);
    me.val('');
    me.css('display','block');
}