var objMonth = {
    1: 'มกราคม',
    2: 'กุมภาพันธ์',
    3: 'มีนาคม',
    4: 'เมษายน',
    5: 'พฤษภาคม',
    6: 'มิถุนายน',
    7: 'กรกฎาคม',
    8: 'สิงหาคม',
    9: 'กันยายน',
    10: 'ตุลาคม',
    11: 'พฤศจิกายน',
    12: 'ธันวาคม',
};

var countchkfile = 1;
var objEmp;
var TodayDate = new Date();
var optionYear;
var optionMonth;
$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "autocomp",
        success: (function (data) {
            //console.log(data);
            objEmp = data;
        })
    });

    $('#showSubmit').hide();

    loopMonth($('#montsA'));
    loopYear($('#yearsA'));
    loopMonth($('#montsB'));
    loopYear($('#yearsB'));

    $('.select2').select2();
    $('.select2').css({"width": "100%"});

    $("[data-mask]").inputmask();
    $('.select2').select2().val('').trigger("change");


    //* Create Option for list Month, Year **/
    optionMonth = '<option value="0">เลือกเดือน</option>';
    $.each(objMonth, function (key, value) {
        optionMonth += '<option value=' + key + '>' + value + '</option>';
    });


    optionYear = '<option value="0" >เลือกปี</option>';
    var start_year = new Date().getFullYear();
    for (var i = start_year; i <= start_year + 2; i++) {
        optionYear += '<option value=' + i + '>' + i + '</option>';
    }


});


$(document).on('keyup', '.numberformat', function () {
    var x = $(this).val();
    $(this).val(x.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
});

function changeloopmonth(sel) {


    var montsB = $(sel).closest('.maintr').find('#montsB')


    var montsA = $(sel).val()
    loopMonth(montsB, montsA)

}

function changeloopyear(sel) {
    var yearsA = $(sel).val()
    var currentYear = new Date().getFullYear();


    var montsA = (yearsA <= currentYear) ? TodayDate.getMonth() + 1 : 1;

    var montsA1 = $(sel).closest('.maintr').find('#montsA')
    loopMonth(montsA1, montsA)

    var montsB1 = $(sel).closest('.maintr').find('#montsB')
    loopMonth(montsB1, montsA)

    var yearsB2 = $(sel).closest('.maintr').find('#yearsB')
    loopYear(yearsB2, yearsA)


}


function changeloopyearB(sel) {
    var yearsB = $(sel).val()
    var montsA = $(sel).closest('.maintr').find('#montsA').val()
    var yearsA = $(sel).closest('.maintr').find('#yearsA').val()

    //  var yearsA = $('#yearsA').val()
    //  var currentYear = new Date().getFullYear();

    //  console.log( 'b====>>>',yearsB)
    // console.log( 'A====>>>',yearsA)

    var montsB = (yearsB <= yearsA) ? montsA : 1;
    //loopMonth('montsA',montsA)

    var montsB3 = $(sel).closest('.maintr').find('#montsB')
    loopMonth(montsB3, montsB)

    //loopYear('yearsB',yearsA)

}


function loopMonth(idSelf, monts) {

    // console.log('id----->',idSelf);
    //  console.log('mon----->',monts);


    var month = "<option value='0'>เลือกเดือน</option>";

    var m = (monts == undefined) ? TodayDate.getMonth() + 1 : monts;

    $.each(objMonth, function (key, value) {
        if (parseInt(key) >= parseInt(m)) {

            month += '<option value=' + key + '>' + value + '</option>';
        }

    });

    $(idSelf).html(month);

}

function loopYear(idSelf, year) {
    var start_year = (year == undefined) ? new Date().getFullYear() : parseInt(year);

    // console.log('year===>',year);
    var yearSelect = "<option value='0' select='select' >เลือกปี</option>";
    for (var i = start_year; i <= start_year + 10; i++) {

        yearSelect += '<option value=' + i + '>' + i + '</option>';
    }
    $(idSelf).html(yearSelect);


}


function bindHideteax(counting) {
    $("#detail" + counting).hide();
    ;
}


function bindRemoveFile() {
    $('button[id^="btnRemoveFile"]').filter(function () {
        $(this).click(function () {
            // var totalrow = $('#tbactionlist tr').length;
            var rowindex = $(this).closest('tr').index();
            // console.log(rowindex);
            if (rowindex >= 0) {
                //var start_tr = rowindex-4;
                removeTRFile(rowindex);
            }
        });
    });
}

function removeTRFile(index) {
    $('#tblticket tr').eq(index + 0).remove();
    countchkfile--;
}

function showtextdetail(idshow) {
    $('#detail' + idshow).show();
}

function showhidedetail(x) {
    //var x = $(this).parents('table tbody tr').index();
    //console.log($(x).closest('tr.maintr').find('.showdetail').attr('name'));
    $(x).closest('tr.maintr').find('.showdetail').toggle();
}

$('#btnAddFile').on("click", function () {
    var options = null;

    CloneTableRow(options);
    //bindDataWithStep();
});

function CloneTableRow(options) {
    $('#tblticket tbody:first').append($('#tblticket tbody tr:eq(0)').clone());
    var btn = '<div class="btn-group">';
    btn += '<button type="button" id="del" onclick="deleteMe(this);" class="btn btn-danger"><i class="fa fa-trash"></i> </button>';
    btn += '</div>';

    var lasttd = $("#tblticket tbody:first tr:last td:last");
    //console.log(lasttd);
    lasttd.html(btn);
    reindex();
    bindEventSelect2AfterCloneRow();
    $("[data-mask]").inputmask();
    //  $('.select2').select2();

}

function deleteMe(me) {
    var tr = $(me).closest("tr.maintr");
    tr.remove();
    reindex();
    // console.log(me);
}

function reindex() {


    var arrTD = $('#tblticket tr.maintr').find("td:first");
    console.log(arrTD);
    var xcount = arrTD .length;
    for (var i = 1; i < xcount; i++) {
        var c = (i + 1) + '. ';
        $(arrTD[i]).html(c);
    }


}

function bindEventSelect2AfterCloneRow() {

    var xrows = $('#tblticket  tbody:first > tr');
    var xcount = xrows.length;
    var xlastRow = xrows[xcount - 1];

    var textInput = $(xlastRow).find('input');
    var objInp = $(textInput[0]);
    objInp.val('');

    var select = $(xlastRow).find('select');
    // console.log(select);
    var td = $(select.eq(0)).closest('td');
    td.html('');


    var divv = '<select class="form-control select2" style="width: 100%;" id="id_emp" name="id_emp[]">';
    divv += '</select>';

    td.html(divv);
    //  console.log(td);
    //console.log(objEmp);

    var _options;
    $.each(objEmp, function (key, value) {
        _options += "<option value='" + objEmp[key].value + "'>" + objEmp[key].label + "</option>";
    });

    td.find('select').append(_options);
    td.find('select').select2();
    td.find('select').select2().val('').trigger("change");


    /*
        var selMonth = $(select.eq(3));
        var selYear = $(select.eq(3));
        console.log(selMonth);
    */

}


function checkInputName() {
    var na = true;

    var id_emp = $("select[name='id_emp[]']");
    $.each(id_emp, function (key, obj) {
     //   console.log(obj.value);
        if (obj.value == '') {
            na = false;
            obj.style.borderColor = "red";
        }
    });

    return na;
}


function checkInputYearstart() {
    var ds = true;

    var start_year = $("select[name='start_year_add[]']");
    $.each(start_year, function (key, obj) {
      //  console.log(obj.value);
        if (obj.value === "0") {
            ds = false;
            obj.style.borderColor = "red";
        }
    });

    return ds;
}


function checkInputMonthstart() {
    var ms = true;

    var start_month = $("select[name='start_month_add[]']");
    $.each(start_month, function (key, obj) {
     //   console.log(obj.value);
        if (obj.value === "0") {
            ms = false;
            obj.style.borderColor = "red";
        }
    });

    return ms;
}


function checkInputYearend() {
    var ye = true;

    var end_year = $("select[name='end_year_add[]']");
    $.each(end_year, function (key, obj) {
     //   console.log(obj.value);
        if (obj.value === "0") {
            ye = false;
            obj.style.borderColor = "red";
        }
    });

    return ye;
}


function checkInputMonthend() {
    var me = true;

    var end_month = $("select[name='end_month_add[]']");
    $.each(end_month, function (key, obj) {
    //    console.log(obj.value);
        if (obj.value === "0") {
            me = false;
            obj.style.borderColor = "red";
        }
    });

    return me;
}


function checkInputMoney() {
    var f = true;

    var total = $("input[name='total[]']");
    $.each(total, function (key, obj) {
        //  console.log(obj.value);
        if (obj.value == '') {
            f = false;
            obj.style.borderColor = "red";
        }
    });

    return f;
}


$('#saveAdddeduct').on('click', function () {


    var id_deduct_template = $('#id_deduct_template').val();
    if (id_deduct_template === "0") {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาเลือกประเภทรายการ</h4>",
            callback: function () {
            }
        });
        htmlError($('#id_deduct_template'));
        return false;
    }

    var na = checkInputName();
    if (na == false) {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาระบุชื่อ</h4>",
            callback: function () {
            }
        });
        return false;
    }


    var ds = checkInputYearstart();
    if (ds == false) {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาระบุปีเริ่มต้น</h4>",
            callback: function () {
            }
        });
        return false;
    }

    var ms = checkInputMonthstart();
    if (ms == false) {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาระบุเดือนเริ่มต้น</h4>",
            callback: function () {
            }
        });
        return false;
    }


    var ye = checkInputYearend();
    if (ye == false) {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาระบุปีสิ้นสุด</h4>",
            callback: function () {
            }
        });
        return false;
    }


    var me = checkInputMonthend();
    if (me == false) {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาระบุเดือนสิ้นสุด</h4>",
            callback: function () {
            }
        });
        return false;
    }


    var f = checkInputMoney();
    if (f == false) {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาป้อนข้อมูล</h4>",
            callback: function () {
            }
        });
        return false;
    }


    var valid = $('#AddLevelForm').validator('validate').has('.has-error').length;
    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันการบันทึก ? </h4>",
            callback: function (result) {
                if (result == 1) {

                    var id_emp = $("select[name='id_emp[]']")
                        .map(function () {
                            console.log('id_emp=====>' + $(this).val());
                            return $(this).val();
                        }).get();

                    var total = $("input[name='total[]']")
                        .map(function () {
                            //  console.log('total=====>'+$(this).val());
                            return $(this).val();
                        }).get();

                    var detail = $("input[name='detail[]']")
                        .map(function () {
                            return $(this).val();
                        }).get();

                    var start_month_add = $("select[name='start_month_add[]']")
                        .map(function () {
                            //  console.log('mon=====>'+$(this).val());
                            return $(this).val();
                        }).get();

                    var start_year_add = $("select[name='start_year_add[]']")
                        .map(function () {
                            //console.log('year=====>'+$(this).val());
                            return $(this).val();
                        }).get();

                    var end_month_add = $("select[name='end_month_add[]']")
                        .map(function () {
                            return $(this).val();
                        }).get();

                    var end_year_add = $("select[name='end_year_add[]']")
                        .map(function () {
                            return $(this).val();
                        }).get();

                    //var id_deduct_template = $('#id_deduct_template').val();


                    var postData = {
                        'id_emp': id_emp,
                        'total': total,
                        'detail': detail,
                        'start_month_add': start_month_add,
                        'start_year_add': start_year_add,
                        'end_month_add': end_month_add,
                        'end_year_add': end_year_add,
                        'id_deduct_template': id_deduct_template,
                    };
                    //console.log(postData);

                    $.ajax({
                        url: "saveexpensesallmonth",
                        data: postData,
                        type: 'POST',
                        success: (function (data) {
                            console.log(data);
                            var result = true;
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ระบบบันทึกข้อมูลเรียบร้อย" + data + "รายการ",
                                callback: function (result) {
                                    if (result == true) {
                                        //location.reload();

                                    } else {
                                        location.reload();
                                    }
                                }

                            });

                        })
                    });

                }
            }
        });
    }


    return false;


})