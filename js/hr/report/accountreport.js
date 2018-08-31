
var MonthPickerConfig = {
    Button: false,
    MonthFormat: 'mm-yy',
    IsRTL: true,
    i18n: {
        year: 'ปี',
        buttonText: 'เลือกเดือน',
        prevYear: 'ปีก่อนหน้า',
        nextYear: 'ปีถัดไป',
        next12Years: 'ถัดไป  12 ปี',
        prev12Years: 'ก่อนหน้า 12 ปี',
        nextLabel: 'ถัดไป',
        prevLabel:'ถัดไป',
        jumpYears:  'ข้ามไปที่ปี',
        backTo: 'ย้อนกลับ',
        months: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]
    },
    allSelectedText:'ทั้งหมด',
    disableIfEmpty: true,
    disabledText: 'ไม่พบรายการ ...'
    ,
    OnAfterChooseMonth: function(selectedDate) {
        // Do something with selected JavaScript date.
        binding_data($(this),2);
    }
};



$(document).ready(function() {
    // var activetab = $('#activetab').attr("title");
    selecttab($('#tabselectsubmit').val());
    // alert(activetab);

    $('.companyid').multiselect({
        includeSelectAllOption: true
    });



    $(".adddeducttemp").multiselect({
        includeSelectAllOption: true
    });

    $('.monthpicker').MonthPicker(MonthPickerConfig);
    $('.monthpicker').prop('readonly',true);

    binding_data($('#rpt1_monthselect'),1);



    $('#btnShowRpt1').on('click',function () {
        show_report1();
    });

    $('#btnShowRpt2').on('click',function () {
        show_report2();
    });

    $('#btnShowRpt3').on('click',function () {
        show_report3();
    });

    $('#btnShowRpt4').on('click',function () {
        show_report4();
    });

    $('#btnShowRpt5').on('click',function () {
        show_report5();
    });

    $('#btnShowRpt6').on('click',function () {
        show_report6();
    });

    $('#btnShowRpt7').on('click',function () {
        show_report7();
    });

    $('#btnShowRpt8').on('click',function () {
        show_report8();
    });

    $('.select2').css({ "width": "100%" });
    $(".select2").select2();
});



function selecttab(val) {
    //alert("2222" + val);
    // console.log($("#tabselect" + val));
    $(".tabselect").removeClass("active");
    $("#tabselect" + val).addClass("active");
    $("#tab" + val).addClass("active");
}

function binding_all_company(data) {

    var objResp = ['rpt1_company','rpt2_company','rpt4_company','rpt6_company','rpt7_company','rpt8_company'];

    for(var p = 0; p<objResp.length;p++) {
        RespTO = objResp[p];

        $("#" + RespTO).empty();
        var k = 0;
        $.each(data, function (key, value) {
            var id = data[key].COMPANY_ID;
            var label = data[key].COMPANY_NAME;
            $("#" + RespTO).append(new Option(label, id));
            k++;
        });
        $('#' + RespTO).multiselect('rebuild');
        $("#" + RespTO).multiselect('selectAll', false);
        $("#" + RespTO).multiselect('updateButtonText');

        if(k==0) {
            showMessageBox('ไม่พบรายการ');
        }
    }
}


function binding_data(me,flag) {

    var RespTO = me.data('to');
    var objVar = {};
    objVar.month = me.val();
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getcompanywage',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {

            var exclude = ['rpt3_company','rpt5_company'];
            if(flag==1) {
                binding_all_company(data);
            }
            else {
                $("#" + RespTO).empty();
                var k = 0;
                $.each(data, function (key, value) {
                    var id = data[key].COMPANY_ID;
                    var label = data[key].COMPANY_NAME;
                    $("#" + RespTO).append(new Option(label, id));
                    k++;
                });
                $('#' + RespTO).multiselect('rebuild');
                if($.inArray(RespTO,exclude) == -1) {
                    $("#" + RespTO).multiselect('selectAll', false);
                    console.log(RespTO);
                }
                $("#" + RespTO).multiselect('updateButtonText');

                if(k==0) {
                    showMessageBox('ไม่พบรายการ');
                }
            }

        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report1() {

    var xmonths = $('#rpt1_monthselect').val();
    var xcompany = $('#rpt1_company').val();

    if(xcompany===null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัท');
        return false;
    }

    $('#dv_report1').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport1',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report1').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report2() {

    var xmonths = $('#rpt2_monthselect').val();
    var xcompany = $('#rpt2_company').val();
    var xtemplate = $('#rpt2_tempate').val();

    if(xcompany===null || xtemplate === null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัทหรือรายการเพิ่ม');
        return false;
    }

    $('#dv_report2').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar.xtemplate = xtemplate;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport2',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report2').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report3() {
    var xmonths = $('#rpt3_monthselect').val();
    var xcompany = $('#rpt3_company').val();
    var xtemplate = $('#rpt3_tempate').val();
    if(xcompany===null || xtemplate === null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัทหรือรายการเพิ่ม');
        return false;
    }

    $('#dv_report3').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar.xtemplate = xtemplate;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport3',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report3').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report4() {
    var xmonths = $('#rpt4_monthselect').val();
    var xcompany = $('#rpt4_company').val();
    var xtemplate = $('#rpt4_tempate').val();
    if(xcompany===null || xtemplate === null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัทหรือรายการเพิ่ม');
        return false;
    }
    $('#dv_report4').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar.xtemplate = xtemplate;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport4',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report4').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report5() {
    var xmonths = $('#rpt5_monthselect').val();
    var xcompany = $('#rpt5_company').val();
    var xtemplate = $('#rpt5_tempate').val();
    if(xcompany===null || xtemplate === null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัทหรือรายการเพิ่ม');
        return false;
    }
    $('#dv_report5').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar.xtemplate = xtemplate;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport5',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report5').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report6() {
    var xmonths = $('#rpt6_monthselect').val();
    var xcompany = $('#rpt6_company').val();
    var xtemplate = $('#rpt6_tempate').val();
    if(xcompany===null || xtemplate === null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัทหรือรายการเพิ่ม');
        return false;
    }
    $('#dv_report6').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar.xtemplate = xtemplate;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport6',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report6').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report7() {
    var xmonths = $('#rpt7_monthselect').val();
    var xcompany = $('#rpt7_company').val();
    var xtemplate = $('#rpt7_tempate').val();
    if(xcompany===null || xtemplate === null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุบริษัทหรือรายการเพิ่ม');
        return false;
    }
    $('#dv_report7').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.xmonth = xmonths;
    objVar.xcompany = xcompany;
    objVar.xtemplate = xtemplate;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport7',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report7').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function show_report8() {

    var emp_idcard = $('#emp_idcard').val();
    if(emp_idcard===null) {
        showMessageBox('ระบุเงื่อนไขไม่ถูกต้อง : ไม่ได้ระบุพนักงาน');
        return false;
    }
    $('#dv_report8').html('<img class="loading-image" src="../../images/global/ajax-loader.gif" alt="loading..">');
    var objVar = {};
    objVar.emp_idcard = emp_idcard;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: 'getreport8',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            $('#dv_report8').html(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}