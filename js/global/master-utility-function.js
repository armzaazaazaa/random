/**
 * Created by adithep on 3/14/2017 AD.
 */

/** Example of Input Mask **/
/** Example numeric
$('#price').inputmask({alias: 'numeric',
    allowMinus: false,
    digits: 2,
    max: 999.99});

*/

/** Example dicimal
 $('#money_bonds').inputmask("decimal");

 */



function initForm(form) {
    $("#" + form + ' input').each(function() {
        $(this).val('');
    });

    $("#" + form + ' textarea').each(function() {
        $(this).val('');
    });

    $("#" + form + ' select').each(function() {
        var n = $(this)[0].name;
        $("#" + n + "").find('option').removeAttr("selected");
        $("#" + n + "")[0].selectedIndex = 0;
    });

    $("#" + form + ' input[type="checkbox"]').each(function() {
        $(this).prop('checked', false); //normal checkbox
        $(this).iCheck('uncheck'); //use for icheck checkbox
    });

}



function initFormarm(form) {
    $("#" + form + ' input').each(function() {
        if($(this).attr('type')!= 'checkbox'){
            $(this).val('');
        }
       // console.log($(this).attr('type'))


    });

    $("#" + form + ' textarea').each(function() {
        $(this).val('');
    });

    $("#" + form + ' select').each(function() {
        var n = $(this)[0].name;
        $("#" + n + "").find('option').removeAttr("selected");
        $("#" + n + "")[0].selectedIndex = 0;
    });

    $("#" + form + ' input[type="checkbox"]').each(function() {
        $(this).prop('checked', false); //normal checkbox
        $(this).iCheck('uncheck'); //use for icheck checkbox
    });

}

function frmValidate(frm) {
    var faults = $('#' + frm + ' input').filter(function() {
        console.log($(this));
        console.log($(this).data('required') && $(this).val() === "");
        console.log($(this).data('required'));
        console.log($(this).val() === "");
        console.log($(this).val());
        return $(this).data('required') && $(this).val() === "";

    }).css({ 'background-color': "#FFFF99", 'border': '1px solid red' });

    var faults2 = $('#' + frm + ' select').filter(function() {
        // console.log($(this));
        // console.log($(this).data('required') && $(this).val() === "");
        // console.log($(this).data('required'));
        // console.log($(this).val());
        return $(this).data('required') && $(this).val() === "";
    }).css({ 'background-color': "#FFFF99", 'border': '1px solid red' });

    return ((faults.length + faults2.length) > 0) ? false : true;
}


function htmlObjectError(obj) {
    $('#' + obj).css({ 'background-color': "#FFFF99", 'border': '1px solid red' });
}


function htmlError(obj) {
    $(obj).css({ 'background-color': "#FFFF99", 'border': '1px solid red' });
}

function clearCssStyle(obj) {
    $(obj).removeAttr("style");
}

function showMessageBox(message) {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalert\">" + message + "</h4>",
        callback: function() {}
    });
}



function showDateTimeFromMySQL(dt) {
    if (dt === null || dt == '0000-00-00 00:00:00' || dt ==='' || dt == undefined) {
        return "";
    } else {
        var a = dt.split(" ");
        var t = a[0].split("-");
        return t[2] + '/' + t[1] + '/' + t[0] + ' ' + a[1];
    }
}


function showDateFromMySQL(dt) {
    if (dt === null || dt == '0000-00-00' || dt ==='' || dt == undefined) {
        return "";
    } else {
        var t = dt.split("-");
        return t[2] + '/' + t[1] + '/' + t[0];
    }
}



function validateEmail(str) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    return (testEmail.test(str));
}



function extractCalendar(strdate) {
    if (strdate !== null) {
        var t = strdate.split("/");
        var arr = new Object();
        arr['Y'] = t[2];
        arr['M'] = t[1];
        arr['D'] = t[0];
        return arr;
    } else {
        return null;
    }
}


function getLastdayOfmonth(strdate) {
    var arr = extractCalendar(strdate);
    var y = parseInt(arr['Y']);
    var m = parseInt(arr['M']);
    //var lastDay = new Date(y, m+1 , 0);

    var date = new Date(y, m, 0);
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var lastDayWithSlashes = (lastDay.getDate()) + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getFullYear();
    return lastDayWithSlashes;
}



function decodeTax(value, tax) {
    var a = parseFloat(value);
    var b = parseFloat(tax);
    return a * b / (b + 100);
}



$('.confirm-delete').on('click', function(e) {
    bootbox.confirm("คุณแน่ใจว่าจะลบข้อมูลนี้?", function(result) {
        if (result == 1) {
            HornBill.show("ลบข้อมูลเรียบร้อยแล้ว ");
        }
    });
});



function showSaveSuccess() {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalertsave\">บันทึกข้อมูลเรียบร้อยแล้ว</h4>",
        callback: function() {}
    });
}

function showSaveError() {

    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalert\">พบข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้</h4>",
        callback: function() {}
    });
}

function showDeleteSuccess() {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalertsave\">ลบข้อมูลเรียบร้อยแล้ว</h4>",
        callback: function() {}
    });
}

function showDeleteError() {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalert\">พบข้อผิดพลาดไม่สามารถลบได้</h4>",
        callback: function() {}
    });
}

function showWarningInputForm() {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalert\">กรุณาป้อนข้อมูลให้ถูกต้อง</h4>",
        callback: function() {}
    });
}

function showAlertMessage(msg) {
    bootbox.alert({
        size: 'small',
        message: "<h4 class=\"btalert\">" + msg + "</h4>",
        callback: function() {}
    });
}


//<input type="text" onkeypress="return onlyNumber(event);" />
function onlyNumber(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

//<input type="text" onkeypress="return onlyNumberAndSlash(event);" />
function onlyNumberAndSlash(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    return !(charCode > 31 && (charCode < 47 || charCode > 57));
}

//<input type="text" onkeypress="return onlyDecimal(event);" />
function onlyDecimal(evt){
   // var charCode = (evt.which) ? evt.which : evt.keyCode
    //return !(charCode > 31 && (charCode < 48 || charCode > 57) && (charCode == 46));
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))return false;

    return true;
}


//<input type="text" onkeypress="return onlyAlphabets(event,this);" />
function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}



function setdatatable(tbl, page) {

    $("#" + tbl).DataTable({
        "lengthChange": false,
        "searching": true,
        "paging": true,
        "info": true,
        "pageLength": page,
        "language": {
            "info": "แสดงหน้าที่ _PAGE_ จาก _PAGES_ แสดงหน้าละ " + page + " รายการ",
            "emptyTable": "ไม่พบรายการ",
            "infoEmpty": "",
            "paginate": {
                "next": "ต่อไป",
                "previous": "ก่อนหน้า"
            }
        },

        "drawCallback": function(settings) {
            if (Math.ceil((this.fnSettings().fnRecordsDisplay()) / this.fnSettings()._iDisplayLength) > 1) {
                $('#' + tbl + '_paginate').css("display", "block");
            } else {
                $('#' + tbl + '_paginate').css("display", "none");
            }
        }

    });
}


function checkDuplicateArray(arrInput)
{
    var recipientsArray = arrInput.sort();

    var reportRecipientsDuplicate = [];
    for (var i = 0; i < recipientsArray.length - 1; i++) {
        if (recipientsArray[i + 1] == recipientsArray[i]) {
            reportRecipientsDuplicate.push(recipientsArray[i]);
        }
    }
    return reportRecipientsDuplicate;
}