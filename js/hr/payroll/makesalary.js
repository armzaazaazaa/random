
$(document).ready(function() {
    var injectdate = $('#pay_date').prop('title');
    $.ajax({
        url: 'checkmakesalary',
        data: {pay_date:injectdate},
        type: 'get',
        success: function(data) {
            if (data == 1) {
                afterCalMonthly();
                //$('#markdalarycomplete').show();
               // $('#deletemakesalary').show()
               // $('#markdalary').hide();

            } else {
               // $('#markdalarycomplete').hide();
                //$('#deletemakesalary').hide()
               // $('#markdalary').show();
            }
        }
    });


    /* Date Range Picker in Thailanguage */
    moment.locale('th');
    $('#salary_date_range').daterangepicker({
        locale: {
            format: 'DD/MM/YYYY'
        }
    });



    $("#salary_between_month").datepicker({
        autoclose: true,
        language: 'th',
        format: "mm-yyyy",
        startView: "year",
        minView: "year",
        minViewMode: "months",
        startDate: '+0d'
    });



    $('#chkCalsalary').on('click',function(){

       if($(this).is(":checked")){
            enableCalculate();
        }
        else {
            disableCalculate();
        }
    });



    //Binding select2
    $(".select2").select2();

    //Inititalize page
    initPage();
});





function initPage() {
    beforeCalMonthly();
    //beforeCalWeekly(1);
    //disableCalculate();
}

function clearCalculate() {
    $('#salary_date_range').val('');
    $('#EmpDataList').val('');
}


function enableCalculate()
{
    clearCalculate();
    $('#salary_date_range, #EmpDataList').prop('disabled',false);
}


function disableCalculate() {
    $('#salary_date_range, #EmpDataList').prop('disabled',true);
    clearCalculate();
}


function makeSaralyฺBetweenMonth(idBtn,idTextStatus,idBtnDelete,idImgLoading,wageType,wageTimes) {

    if($('#txtWageName').val() == '') {
        showMessageBox('กรุณาระบุชื่อ');
        $('#txtWageName').focus;
        return false;
    }

    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการสร้างเงินเดือนระหว่างเดือน หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {

                $('#'+idBtn).attr('disabled','disabled');
                $('#'+idImgLoading).show();

                var postvalue = {};
                postvalue.wageName = $('#txtWageName').val();
                postvalue.dateRange = $('#salary_date_range').val();
                postvalue.empList = $('#EmpDataList').val();
                postvalue.wageType = wageType;
                postvalue.wageTimes = wageTimes;

                $.ajax({
                    url: 'hrmakesalary',
                    data: postvalue,
                    type: 'POST',
                    success: function (data) {
                        $('#'+idImgLoading).hide();
                        if(data=="1") {

                            if(wageType==3) afterCalMonthly();
                            if(wageType==2) afterCalWeekly(wageTimes);
                            //if(wageType==1) afterCal7Day(wageTimes);

                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ระบบสร้างข้อมูลเรียบร้อย",
                            });
                        }
                        else {
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "เกิดข้อผิดพลาดในการสร้างเงินเดือน",
                            }); //"ระบบลบข้อมูลเรียบร้อย");
                        }

                        setTimeout(function() {
                            box.modal('hide');
                        }, BootboxTimeOut);

                    }
                });
            }
        }
    });
}

function dropSalaryBetween() {

}

function runcronjobsmanual(idBtn,idTextStatus,idBtnDelete,idImgLoading) {
    var injectdate = $('#pay_date').prop('title');
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการสร้างเงินเดือน หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {

                $('#' + idBtn).attr('disabled', 'disabled');
                $('#' + idImgLoading).show();

                var postvalue = {};
                postvalue.mode = 'drop';
                postvalue.injectdate = injectdate;
                postvalue._csrf = $('meta[name="csrf-token"]').attr("content");

                $.ajax({
                    url: '../../cronjob/payrollcrons/makelist',
                    data: postvalue,
                    type: 'POST',
                    success: function (data) {
                        $('#' + idImgLoading).hide();
                        //var t = parseInt(data);
                        $('#monthly_status_text1').html(data);
                        $('#make_monthly_salary1').hide();
                        $('#monthly_status_text1').show();
                    }
                });
            }
        }
    });
}
function reloadcronjobsmanual(idBtn,idTextStatus,idBtnDelete,idImgLoading) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการสร้างเงินเดือน หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {

                $('#' + idBtn).attr('disabled', 'disabled');
                $('#' + idImgLoading).show();

                var postvalue = {};
                postvalue.mode = 'drop';
                postvalue._csrf = $('meta[name="csrf-token"]').attr("content");
            }
        }
    });
}


function makeSaraly(idBtn,idTextStatus,idBtnDelete,idImgLoading) {
    var injectdate = $('#pay_date').prop('title');
    console.log(injectdate);
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการสร้างเงินเดือน หรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {

                //$('#'+idBtn).attr('disabled','disabled');
                $('#'+idImgLoading).show();

                var postvalue = {};
                postvalue.mode = 'normal';
                postvalue.pay_date = injectdate;
                postvalue._csrf = $('meta[name="csrf-token"]').attr("content");
                $.ajax({
                    url: 'createsalary',
                    data: postvalue,
                    type: 'POST',
                    success: function (data) {
                        $('#'+idImgLoading).hide();
                        var t = parseInt(data);
                        if(t > 0) {
                            afterCalMonthly();
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ระบบสร้างข้อมูลเรียบร้อย "+t+" รายการ",
                            });
                        }
                        else {
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "เกิดข้อผิดพลาดในการสร้างเงินเดือน",
                            }); //"ระบบลบข้อมูลเรียบร้อย");
                        }

/*                        setTimeout(function() {
                            box.modal('hide');
                        }, BootboxTimeOut);*/

                    }
                });
            }
        }
    });
}



function deleteSaraly(idBtn,idTextStatus,idBtnDelete,idImgLoading) {
    var injectdate = $('#pay_date').prop('title');
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการลบเงินเดือนหรือไม่?</h4>",
        callback: function (result) {
            if (result == 1) {

                $('#'+idImgLoading).show();
                $('#'+idBtnDelete).prop( "disabled",true);

                var postvalue = {};
                postvalue.pay_date = injectdate;
                postvalue._csrf = $('meta[name="csrf-token"]').attr("content");
                $.ajax({
                    url: 'hrdeletesalary',
                    data: postvalue,
                    type: 'POST',
                    success: function (data) {
                        $('#'+idImgLoading).hide();
                        if(data=="1") {
                            beforeCalMonthly();

                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ลบข้อมูลเรียบร้อย",
                            });
                        }
                        else {
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "เกิดข้อผิดพลาดในการลบข้อมูลเงินเดือน",
                            }); //"ระบบลบข้อมูลเรียบร้อย");
                        }

                        setTimeout(function() {
                            box.modal('hide');
                        }, BootboxTimeOut);

                    }
                });
            }
        }
    });
}




$('#markdalary').click(function() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันการสร้างเงินเดือน หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var id_cradmaker = $('#idcard_makesalary').val();
                var datemakesalary = $('#datemakesalary').val();
                var postvalue = {
                    id_cradmaker: id_cradmaker,
                    datemakesalary: datemakesalary,
                }
                $('#loadimage').show();
                $('#btnCreateSalary').hide();
                $.ajax({
                    url: 'buindingsalary',
                    data: postvalue,
                    type: 'POST',
                    success: function(data) {
                        console.log(data);
                        $('#loadimage').hide();
                        $('#markdalary').hide();
                        $('#markdalarycomplete').show();
                        $('#btnCreateSalary').show();
                        $('#deletemakesalary').show()
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบสร้างข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);
                    }
                });
            }
        }
    });

});


$('#deletemakesalary').click(function() {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันข้อมูลการสร้างเงินเดือน หรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var postvalue = {
                    submitremove: "1",
                    datetimeremove: $('#deletedateremovesalary').val(),
                }
                $.ajax({
                    url: 'removesalary',
                    data: postvalue,
                    type: 'POST',

                    success: function(data) {
                        console.log(data);
                        $('#loadimage').hide();
                        $('#markdalary').show();
                        $('#markdalarycomplete').hide();
                        $('#deletemakesalary').hide();
                        $('#btnCreateSalary').show();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบลบข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);
                    }
                });
            }
        }
    });

});



/** function show/hide object
 *  ================================
 *  For monthly salary
 * **/
function beforeCalMonthly() {
   $('#make_monthly_salary').prop( "disabled", false );
    $('#make_monthly_salary').show();
    $('#monthly_status_text').hide();
    $('#delete_monthly_salary').hide();
    $('#delete_monthly_salary').prop( "disabled", true );
}

function afterCalMonthly() {
    $('#make_monthly_salary').prop( "disabled", true );
    $('#make_monthly_salary').hide();
    $('#monthly_status_text').show();
    $('#delete_monthly_salary').show();
    $('#delete_monthly_salary').prop( "disabled", false );
}


/** function show/hide object
 *  ================================
 *  For weekly salary
 * **/
function beforeCalWeekly(times) {
    $('#make_weekly_salary_'+times).prop( "disabled", false );
    $('#make_weekly_salary_'+times).show();
    $('#weekly_status_text_'+times).hide();
    $('#delete_weekly_salary_'+times).hide();
    $('#delete_weekly_salary_'+times).prop( "disabled", true );
}

function afterCalWeekly(times) {

    $('#make_weekly_salary_'+times).prop( "disabled", true );
    $('#make_weekly_salary_'+times).hide();
    $('#weekly_status_text_'+times).show();
    $('#delete_weekly_salary_'+times).show();
    $('#delete_weekly_salary_'+times).prop( "disabled", false );
    $('#txtWageName').hide();
    $('#txtWageName').prop( "disabled", true );

}


/** function show/hide object
 *  ================================
 *  For day salary
 * **/
function beforeCal7Day(times) {
    $('#make_day_salary_'+times).prop( "disabled", false );
    $('#make_day_salary_'+times).show();
    $('#day_status_text_'+times).hide();
    $('#delete_day_salary_'+times).hide();
    $('#delete_day_salary_'+times).prop( "disabled", true );
}

function afterCal7Day(times) {

    $('#make_day_salary_'+times).prop( "disabled", true );
    $('#make_day_salary_'+times).hide();
    $('#day_status_text_'+times).show();
    $('#delete_day_salary_'+times).show();
    $('#delete_day_salary_'+times).prop( "disabled", false );

}