$(document).ready(function() {

    $(".dateselect").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
    });

    $(".monthselect").datepicker({
        autoclose: true,
        language: 'th',
        format: 'mm-yyyy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
    });


    $(".multiselect").multiselect({
        includeSelectAllOption: true
    });

});

$('#submitexportbank').click(function() {

    var valid = $('#exporttoexcel').validator('validate').has('.has-error').length;
    if (valid == 0) {
        var arrComexport = $('#arrComexport').val();
        var datepayexport = $('#datepayexport').val();
        var postData = {
            'arrComexport': arrComexport,
            'datepayexport': datepayexport,
        }

        //console.log(arrComexport);
        $.ajax({
            url: 'exportexceltobank',
            data: postData,
            type: 'POST',
            success: function(data) {
                console.log(data);
                if (data == 1) {
                    window.location.href = '../payrollexport/downloadtobank?arrComexport=' + arrComexport + '&&datepayexport=' + datepayexport;
                } else {
                    var box = bootbox.alert({
                        size: "small",
                        title: "แจ้งเตือน",
                        message: "ไม่สามารถส่งออกข้อมูลได้",
                    }); //"ระบบลบข้อมูลเรียบร้อย");

                    setTimeout(function() {
                        // be careful not to call box.hide() here, which will invoke jQuery's hide method
                        box.modal('hide');
                    }, BootboxTimeOut);
                }

            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

    }
    return false;


});

$('#seachdatalistreport').click(function() {
    $('#showdetail').show();
});


$('#seachdatalist').click(function() {
    var arrCom = $('#selectworking').val();
    var postData = {
        'arrCom':arrCom,
    }
    var valid = 0;
    // $.ajax({
    //     url: 'movewagethismonth',
    //     data: postData,
    //     type: 'POST',
    //     success: function(data) {
    //         console.log(data);
    //     },
    //     error: function(jqXhr, textStatus, errorThrown) {
    //         console.log(errorThrown);
    //     }
    // });

    if (valid == 0) {
        bootbox.confirm({
            size: "small",
            message: "<h4 class=\"btalert\">ยืนยันกรบันทึกรายการ? </h4>",
            callback: function(result) {
                if (result == 1) {
                    $.ajax({
                        url: 'confirmexporttobank',
                        data: postData,
                        type: 'POST',
                        success: function(data) {
                            console.log(data);
                        },
                        error: function(jqXhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                }
            }
        });
    }

    return false;

});
// function showheadtemp(postReport) {
//     var thtemp;
//     thtemp += '<th>xxxx</th>';
//     thtemp += '<th>yyyyy</th>';
//     //  $("#tbltead").last().append(thtemp);

// }

//
// $('#seachdatalist').click(function() {
//     var arrComexport = $('#selectworking').val();
//     var postData = {
//         'arrCom':arrComexport,
//     }
//
//     console.log(postData);
//     $.ajax({
//         url: 'confirmexporttobank',
//         data: postData,
//         type: 'POST',
//         success: function(data) {
//             console.log(data);
//         },
//         error: function(jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// });