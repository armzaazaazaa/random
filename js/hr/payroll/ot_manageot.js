var empty_option = '<option selected="selected" value="">  กรุณาเลือก  </option>';
var formMode;
$(document).ready(function () {

    //Get FORM Mode
    formMode = $('#mode').prop('title');

    if(formMode=='edit') {
        var CompanyId = $('#xcompany').val();
        if (CompanyId != undefined && CompanyId != '') {
            clearCssStyle($(this));
            //lookupdepartment($(this), 'xdepartment', 'xsection');
            lookupemployee(CompanyId, null, null);
            buildOptionSelect2();
            $(".select2").select2();
        }
        else {
            $("#otEmployee").empty();
        }

    }


    setTimeout(function () {
        $('#message').fadeOut('slow');
    }, 3000);

    /*    $("#example2").DataTable({
     "lengthChange": false,
     "searching": true,
     "paging": true,
     "info": true,
     "pageLength" : 10,
     }
     );*/


    $('#btnAddNewRow').on("click", function () {

        var f = checkCondition();
        if (f) {
            var options = null;
            CloneTableRow();
        }
        //bindDataWithStep();
    });

    $("#ot_date").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
    });

    $("#month_pay").datepicker({
        autoclose: true,
        language: 'th',
        format: "mm-yyyy",
        startView: "year",
        minView: "year",
        minViewMode: "months"
    });


    $('#btnSaveManageOT').on("click", function () {

        var actiions = (formMode=='add') ? 'savemanageot' : 'saveeditmanageot';
        var f = (formMode=='add') ? checkValidForm() : checkValidFormEdit();

        /** IF Input is Valid **/
        if (f) {
            var datavar = $('#frmListOTRequest').serialize();
            $.ajax({
                url: actiions,
                data: datavar,
                type: 'POST',
                success: function (data) {
                    //console.log(data);
                    if (parseInt(data) >= 1) {
                        showSaveSuccess();
                        //initForm('frmPosition');
                        $.pjax.reload({container: "#pjax_tbemployeeot"});  //Reload GridView
                    }
                    else {
                        showSaveError();
                    }
                }
            });
        }

    });


    /***********/

    $('#xcompany').change(function () {
        var CompanyId = $('#xcompany').val();
        if (CompanyId != undefined && CompanyId != '') {
            clearCssStyle($(this));
            lookupdepartment($(this), 'xdepartment', 'xsection');
            lookupemployee(CompanyId, null, null);
            buildOptionSelect2();
            $(".select2").select2();
        }
        else {
            $("#otEmployee").empty();
        }

        removeCloneTR();
    });


    $('#xdepartment').change(function () {

        lookupsection($(this), $('#xcompany').val(), 'xsection'); //ค่า demp working selection true
        var DepartmentID = $('#xdepartment').val();

        lookupemployee($('#xcompany').val(), DepartmentID, null);
        buildOptionSelect2();
        $(".select2").select2();
    });

    $('#xsection').change(function () {
        lookupemployee($('#xcompany').val(), $('#xdepartment').val(), $('#xsection').val());
        buildOptionSelect2();
        $(".select2").select2();
    });


    $('#otEmployee').change(function () {
        var IDCard = $(this).val();
        if (IDCard != undefined && IDCard != '') {
            var targetTextBox = $('#txtDepartment');
            getEmpDepartment(IDCard, targetTextBox);
        }
    });

    $('#otreturn_id').change(function () {
        var id = $(this).val();
        if (id != undefined && id != '') {
            clearCssStyle($(this));
        }
    });


    $('#activity_id').change(function () {
        var id = $(this).val();
        if (id != undefined && id != '') {
            clearCssStyle($(this));
        }
    });


    $('#openrouteprofile').on('click', function () {
        enableRouteProfile();
    });

    $('#closerouteprofile').on('click', function () {
        disableRouteProfile();
    });


    $('#openmotel').on('click', function () {
        enableMotel();
    });

    $('#closemotel').on('click', function () {
        disableMotel();
    });


    disableRouteProfile();
    disableMotel();


    //event & clear style sheet when change
    select_time_event($('#start_hour'), $('#start_minute'), $('#end_hour'), $('#end_minute'), $('#totaltime'), $('#totalmoney'));
});

function select_time_event(start_hour, start_minute, end_hour, end_minute, totaltime, totalmoney) {
    start_hour.change(function () {
        checkValidTimeInline(start_hour, start_minute, end_hour, end_minute, totaltime, totalmoney);
        clearCssStyle(start_hour);
    });

    end_hour.change(function () {
        checkValidTimeInline(start_hour, start_minute, end_hour, end_minute, totaltime, totalmoney);
        clearCssStyle(end_hour);
    });

    start_minute.change(function () {
        checkValidTimeInline(start_hour, start_minute, end_hour, end_minute, totaltime, totalmoney);
        clearCssStyle(start_minute);
    });

    end_minute.change(function () {
        checkValidTimeInline(start_hour, start_minute, end_hour, end_minute, totaltime, totalmoney);
        clearCssStyle(end_minute);
    });
}

function clearAllCssStyleTime(start_hour, start_minute, end_hour, end_minute) {
    clearCssStyle(start_hour);
    clearCssStyle(start_minute);
    clearCssStyle(end_hour);
    clearCssStyle(end_minute);
}

function clearCssStyle(obj) {
    $(obj).removeAttr("style");
}

function checkValidForm() {
    var all = true;
    var a = checkCompay(); //check company empty
    var b = checkActivity(); //check activity empty
    var c = checkEmpSelect();
    var d = checkTimeSelected();
    var e = checkValidTimeInline($('#start_hour'), $('#start_minute'), $('#end_hour'), $('#end_minute'), $('#totaltime'), $('#totalmoney'));
    var f = checkReturn();
    var g = checkdistance();

    if (a != true) return false;
    if (b != true) return false;
    if (c != true) return false;
    if (d != true) return false;
    if (e != true) return false;
    if (f != true) return false;
    if (g != true) return false;

    return all;
}

function checkdistance() {
    var ot_route = $("input[name='ot_route']:checked").val();
    var ot_distance = $('#ot_distance').val();
    var f = true;
    if(parseInt(ot_route)===1) {
        if(ot_distance == '' || ot_distance =='0') {
            htmlObjectError('ot_distance');
            showAlertMessage('กรุณาระบุระยะทาง');
            f = false;
        }
    }
    return f;
}

function checkValidFormEdit() {
    var all = true;
    var a = checkCompay(); //check company empty
    var b = checkActivity(); //check activity empty
    var g = checkdistance();
    if (a != true) return false;
    if (b != true) return false;
    if (g != true) return false;
    return all;
}

function checkCompay() {
    var companyID = $('#xcompany').val();
    if (companyID == '') {
        showAlertMessage('กรุณาเลือกบริษัท');
        htmlObjectError('xcompany');
        return false;
    }
    else {
        return true;
    }
}

function checkActivity() {
    var activityID = $('#activity_id').val();
    if (activityID == '') {
        showAlertMessage('กรุณาเลือกกิจกรรม');
        htmlObjectError('activity_id');
        return false;
    }
    else {
        return true;
    }

}



function checkEmpSelect() {
    var chPass = true;
    $("select[name^='otEmployee']").each(function () {
        if ($(this).val() == '') {
            htmlError($(this));
            chPass = false;
        }
    });

    if (chPass == false) {
        showMessageBox('ไม่ได้ระบุพนักงาน');
        return false;
    } else {
        return true;
    }

}


function checkTimeSelected() {

    var chPass = true;
    //var  a = $("select[name^='start_hour']" );
    $("select[name^='start_hour']").each(function () {
        if ($(this).val() == '') {
            chPass = false;
            htmlError($(this));
            // terror += 'กรุณาระบุชั่วโมงเริ่มต้น <br/>';
        }
    });


    $("select[name^='start_minute']").each(function () {
        if ($(this).val() == '') {
            chPass = false;
            htmlError($(this));
            //terror += 'กรุณาระบุนาทีเริ่มต้น <br/>';
        }
    });


    $("select[name^='end_hour']").each(function () {
        if ($(this).val() == '') {
            chPass = false;
            htmlError($(this));
            //terror += 'กรุณาระบุชั่วโมงสิ้นสุด <br/>';
        }
    });

    $("select[name^='end_minute']").each(function () {
        if ($(this).val() == '') {
            chPass = false;
            htmlError($(this));
            //terror += 'กรุณาระบุนาทีสิ้นสุด <br/>';
        }
    });

    return chPass;
}



function checkValidTimeInline(startHour, startMinute, endHour, endMinute, totaltime, totalmoney) {

    var activity_id = $('#activity_id').val();
    if (activity_id === '' || activity_id === undefined) {
        showMessageBox('ยังไม่ได้เลือกกิจกรรม');
        return false;
    }

    var wdate = $('#ot_date').val();
    var workdate;
    if (wdate == '' || wdate == 'undefined') {
        showMessageBox('ยังไม่ได้เลือกวันที่');
        return false;
    } else {
        var t = wdate.split("/");
        workdate = t[2] + '/' + t[1] + '/' + t[0];
    }


    var check = false;
    //if ($.isNumeric(startHour.val()) && $.isNumeric(startMinute.val()) &&  $.isNumeric(endHour.val())  && $.isNumeric(endMinute.val()) ) {
    if (startHour.val() != '' && startMinute.val() != '' && endHour.val() != '' && endMinute.val() != '') {
        var _sh = startHour.val();
        var _sm = startMinute.val();
        var _eh = endHour.val();
        var _em = endMinute.val();


        var stformat = workdate + ' ' + _sh + ':' + _sm + ':00';
        var edformat = workdate + ' ' + _eh + ':' + _em + ':00';

        var date_start = new Date(stformat);
        var date_end = new Date(edformat);

        if (date_end < date_start) {

            htmlError(startHour);
            htmlError(startMinute);
            htmlError(endHour);
            htmlError(endMinute);
            totaltime.val('');
            showMessageBox('ระบุเวลาไม่ถูกต้อง');
        } else {
            //select_time_event(startHour, startMinute, endHour, endMinute, totaltime);
            clearAllCssStyleTime(startHour, startMinute, endHour, endMinute);
            var stformat = workdate + ' ' + _sh + ':' + _sm + ':00';
            var edformat = workdate + ' ' + _eh + ':' + _em + ':00';
            var _stime = _sh + ':' + _sm + ':00';
            var _etime = _eh + ':' + _em + ':00';

            var diff = date_end - date_start;
            var times = calculatetime(diff);

            if (times == NaN || !$.isNumeric(times)) {
                times = '';
                return false;
            }
            totaltime.val(times);
            check = true;

            //console.log('x');
            //calculate ot line by line
            calculate_ot_money(times,_stime,_etime,totalmoney);

        }
    }


    return check;
}

function calculate_ot_money(times,_stime,_etime,totalmoney) {

    //var span = find_span(0);
    var wage = find_hidden(4);
    if(wage) {
        var strid = wage.attr('id');
        var _tmp = strid.split('_');
        var _idcard = _tmp[1];
        var _wage = wage.val();

        var objVar = {};
        objVar.ot_route = $("input[name='ot_route']:checked").val();
        objVar.ot_calculate_type = $("input[name='ot_calculate_type']:checked").val();
        objVar.ot_motel = $("input[name='ot_motel']:checked").val();
        objVar.profileroute_id = $('#profileroute_id').val();
        objVar.ot_distance = $('#ot_distance').val();
        objVar.motel_price = $('#motel_price').val();
        objVar.salary = _wage;
        objVar.start_time = _stime;
        objVar.end_time = _etime;
        objVar.totaltime = times;
        objVar.idcard = _idcard;
        objVar._csrf = $('meta[name="csrf-token"]').attr("content");

        $.ajax({
            method: "POST",
            data: objVar,
            url: "calculateot",
            //async: false,
            success: (function (data) {

                var remark = find_hidden(3);
                var idcard = find_hidden(4);
                remark.val(data.remark);
                totalmoney.val(data.money);
                console.log(data);
            })
        });
    }else {
        console.log('span not found');
        return false;
    }
}

function calculatetime(d) {
    //var times_inday =  24 * 1000 * 60 * 60;
    var diff = parseInt(d);
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    /*if (hours < 0)
     hours = hours + 24;*/
    var ret = hours + "." + minutes;
    return parseFloat(ret);
}


function checkReturn() {

    var returnRev = $("select[name^='otreturn_id']");
    return checkPass(returnRev);
}

function checkPass(obj) {
    var pass = true;
    $.each(obj, function (key, value) {
        if ($(this).val() == '') {
            htmlError($(this));
            pass = false;
        }
    });
    return pass;
}


function disableRouteProfile() {
    $('#profileroute_id').attr('disabled', true);
    $('#ot_distance').attr('disabled', true);
}

function enableRouteProfile() {
    $('#profileroute_id').attr('disabled', false);
    $('#ot_distance').attr('disabled', false);
}

function disableMotel() {
    $('#motel_price').attr('disabled', true);
}


function enableMotel() {
    $('#motel_price').attr('disabled', false);
    $('#motel_price').attr('readonly', true);
}

function getEmpDepartment(IDCard, targetTextBox) {
    if (IDCard != '') {
        $.ajax({
            method: "POST",
            data: {IDCard: IDCard},
            url: "getdepartmentbyidcard",
            async: false,
            success: (function (data) {
                //console.log(data.NameDepartment);
                targetTextBox.val(data.NameDepartment);

/*                var span = find_span(0);
                if(span) {
                    span.prop('id',IDCard);
                    span.prop('title',data.EMP_SALARY_WAGE);
                }*/

                var remark = find_hidden(3);
                if(remark) {
                    remark.prop('id','remark_'+IDCard);
                    remark.prop('value','');
                }

                var wage = find_hidden(4);
                if(wage) {
                    wage.prop('id','wage_'+IDCard);
                    wage.prop('value',data.EMP_SALARY_WAGE);
                }

            })
        });
    }
}

function find_span(idx) {
    var lrow = $('#tbemployeeot tr');
    var lc = lrow.length;
    var lastRow = lrow[lc - 1];
    return span = $(lastRow).find('span').eq(idx);
}

function find_hidden(idx) {
    var lrow = $('#tbemployeeot tr');
    var lc = lrow.length;
    var lastRow = lrow[lc - 1];
    return hidden = $(lastRow).find('input').eq(idx);
}



function removeCloneTR() {

    var del = $('#del');
    //console.log(del);
    /* $('#del').each(function (k,v) {
     console.log($(this));
     });*/
}


function checkCondition() {
    var companyID = $('#xcompany').val();
    if (companyID == '') {
        showAlertMessage('กรุณาเลือกบริษัท');
        htmlObjectError('xcompany');
        return false;
    }
    else {

        var terror = '';
        var chPass = true;
        $("select[name^='otEmployee']").each(function () {
            if ($(this).val() == '') {
                chPass = false;
                terror += 'กรุณาเลือกพนักงาน <br/>';
            }
        });


        if (chPass == false) {
            showAlertMessage(terror);
            return chPass;
        }
        else {
            return chPass;
        }

    }

}


function buildOptionSelect2() {
    var _options = empty_option;
    $("#otEmployee").empty();
    $.each(objEmp, function (key, value) {
        _options += "<option value='" + objEmp[key].ID_Cardauto + "'>" + objEmp[key].Fullnameauto + "</option>";
    });

    $("#otEmployee").append(_options);
}


function deleteMe(me) {
    var tr = $(me).closest("tr");
    tr.remove();
    reindex();
}

function deleteMewithEmp(me,reqdetailID) {

    if(reqdetailID != '') {
        var objVar = {};
        objVar.id = reqdetailID;
        objVar._csrf = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            url: 'deleteempinot',
            data: objVar,
            type: 'POST',
            success: function (data, textStatus, jQxhr) {
                //loadotedit();
                var tr = $(me).closest("tr");
                tr.remove();
                reindex();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}


function reindex() {
    var arrTD = $('#tbemployeeot tr').find("td:first");
    console.log(arrTD);
    var xcount = arrTD.length;
    for (var i = 1; i < xcount; i++) {
        var c = (i + 1) + '. ';
        $(arrTD[i]).html(c);
    }

    /*    $(".hit").click(function(){
     var value=$(this).closest('tr').children('td:first').text();
     alert(value);
     });*/
}


function CloneTableRow() {
    $('#tbemployeeot tbody').append($('#tbemployeeot tbody tr:last').clone());

    var btn = '<div class="btn-group">';
    btn += '<button type="button" id="del" onclick="deleteMe($(this));" class="btn btn-danger"><i class="fa fa-trash"></i> </button>';
    btn += '</div>';

    var lasttd = $("#tbemployeeot tbody tr:last td:last");
    //console.log(lasttd);
    lasttd.html(btn);
    reindex();
    bindEventAfterCloneRow();
}

function bindEventAfterCloneRow() {

    var xrows = $('#tbemployeeot tr');
    var xcount = xrows.length;
    var xlastRow = xrows[xcount - 1];
    var select = $(xlastRow).find('select');

    //Bind Event of select2
    var td = $(select.eq(0)).closest("td");
    td.html('');
    var divv = '<select class="form-control select2" style="width: 100%;" id="otEmployee" name="otEmployee[]">';
    divv += '</select>';

    td.html(divv);

    var _options;
    $.each(objEmp, function (key, value) {
        _options += "<option value='" + objEmp[key].ID_Cardauto + "'>" + objEmp[key].Fullnameauto + "</option>";
    });

    td.find('select').append(_options);
    td.find('select').select2();
    td.find('select').select2().val('').trigger("change");

    //get html object
    var LastEmp = $(xlastRow).find('select').eq(0);
    var LastDepartment = $(xlastRow).find('input').eq(0);
    var LastStartHour = $(xlastRow).find('select').eq(1);  //hour
    var LastStartMinute = $(xlastRow).find('select').eq(2); //minute
    var LastEndHour = $(xlastRow).find('select').eq(3);  //hour
    var LastEndMinute = $(xlastRow).find('select').eq(4); //minute
    var LastTotalTime = $(xlastRow).find('input').eq(1);  //total time
    var LastReturn = $(xlastRow).find('select').eq(5);  //return revenue
    var LastTotalMoney = $(xlastRow).find('input').eq(2);  //total money

    var LastRemark = $(xlastRow).find('input').eq(3);  //remark
    var LastWage = $(xlastRow).find('input').eq(4);  //wage

    LastTotalTime.val('');
    LastTotalMoney.val('');

    LastRemark.val('');
    //LastRemark.removeProp('value');

    LastWage.val('');
    //LastWage.removeProp('value');

    LastDepartment.val('');

    //event change of employee
    LastEmp.change(function () {
        var IDCard = $(this).val();
        if (IDCard != undefined && IDCard != '') {
            getEmpDepartment(IDCard, LastDepartment);
        }
    });

    //event change of Start Hour
    LastStartHour.change(function () {
        checkValidTimeInline(LastStartHour, LastStartMinute, LastEndHour, LastEndMinute, LastTotalTime, LastTotalMoney);
        clearCssStyle(LastStartHour);
    });


    //event change of Start Minute
    LastStartMinute.change(function () {
        checkValidTimeInline(LastStartHour, LastStartMinute, LastEndHour, LastEndMinute, LastTotalTime, LastTotalMoney);
        clearCssStyle(LastStartMinute);
    });

    //event change of End Hour
    LastEndHour.change(function () {
        checkValidTimeInline(LastStartHour, LastStartMinute, LastEndHour, LastEndMinute, LastTotalTime ,LastTotalMoney);
        clearCssStyle(start_hour);
    });

    //event change of End Minute
    LastEndMinute.change(function () {
        checkValidTimeInline(LastStartHour, LastStartMinute, LastEndHour, LastEndMinute, LastTotalTime, LastTotalMoney);
        clearCssStyle(LastEndMinute);
    });


    //event change of Return Revenue
    LastReturn.change(function () {
        var id = $(this).val();
        if (id != undefined && $.isNumeric(id)) {
            clearCssStyle($(this));
        }
    });



}
































