var objEmp;
var num = 1;
var objDeductList;
var objAddList;
var pay_type;

$(document).ready(function() {

    /*
    $.ajax({
        method: "GET",
        url: "autocomp",
        success: (function(data) {
            // console.log(data);
            objEmp = data;
            bindObjAutoComplete();
        })
    });
    */


    /*
    $.ajax({
        method: "GET",
        url: "getdeductlisttempall",
        success: function(data, textStatus, jQxhr) {
            var datalist = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            $.each(data, function(key, value) {
                datalist += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
            });

            $('#selectdeduct').html(datalist);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    */






    $("[data-mask]").inputmask();
    $('#hideseach').hide();


    $('.select2').css({ "width": "100%" });
    $('.select2').select2().val('').trigger("change");

});


function getTemplateData(callback) {
    $.ajax({
        method: "GET",
        url: "loaddeducttemplate",
        success: function(data, textStatus, jQxhr) {
            var datalist1 = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            var datalist2 = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';

            $.each(data, function(key, value) {
                if(data[key].ADD_DEDUCT_TEMPLATE_TYPE=="1") {
                    datalist1 += '<option value="' + data[key].ADD_DEDUCT_TEMPLATE_ID + '">' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '</option>';
                }
                else {
                    datalist2 += '<option value="' + data[key].ADD_DEDUCT_TEMPLATE_ID + '">' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '</option>';
                }
            });

            callback(datalist1,datalist2);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


getTemplateData(function(datalist1,datalist2) {
    objAddList = datalist1;
    objDeductList = datalist2;
    //console.log(objAddList);
});



function bindObjAutoComplete() {
    $("#seachnameemp").each(function() {
        $(this).autocomplete({
                minLength: 0,
                source: objEmp,
                focus: function(event, ui) {
                    $(this).val(ui.item.label);
                    return false;
                },
                select: function(event, ui) {
                    $(this).val(ui.item.label);
                    $("#id_emp").val(ui.item.value);
                    //console.log(ui.item.value);
                    return false;
                }
            })
            .autocomplete("instance")._renderItem = function(ul, item) {
                return $("<li>")
                    .append("<div>" + item.label + "</div>")
                    .appendTo(ul);
            };
    });
}



$("#seachdatalist").click(function() {
    var id_card = $('#seachnameemp').val();
    var datapost = {
        id_card: id_card
    };

    $.ajax({
        url: 'seachembyidcard',
        data: datapost,
        type: 'POST',
        success: function(data) {
            //   console.log(data);
            var divhidedetail = '<div class="box-header with-border">';
            divhidedetail += '<h3 class="box-title">ข้อมูลรายการ</h3>';
            divhidedetail += '</div>';
            divhidedetail += '<div class="box-body">';
            divhidedetail += '<div class="row">';
            divhidedetail += '<div class="col-md-4"> &nbsp; </div>';
            divhidedetail += '<div class="col-md-2">';
            divhidedetail += '<div class="form-group">';
            divhidedetail += '<label  class="col-sm-2 control-label">ชื่อ&nbsp;</label>';
            divhidedetail += '<label  class="control-label"><U>' + data.Name + '     ' + data.Surname + '</U></label>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '<div class="col-md-2">';
            divhidedetail += '<div class="form-group">';
            divhidedetail += '<label  class="col-sm-4 control-label">ตำแหน่งชื่อ</label>';
            divhidedetail += '<label  class="control-label"><U>' + data.Position + '</U></label>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '<div class="row">';
            divhidedetail += '<div class="col-md-3"> &nbsp; </div>';
            divhidedetail += '<div class="col-md-2">';
            divhidedetail += '<div class="form-group">';
            divhidedetail += '<label  class="col-sm-4 control-label">ฝ่าย</label>';
            divhidedetail += '<label  class="control-label"><U>' + data.NameDepartment + '</U></label>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '<div class="col-md-2">';
            divhidedetail += '<div class="form-group">';
            divhidedetail += '<label  class="col-sm-4 control-label">แผนก</label>';
            divhidedetail += '<label  class="control-label"><U>' + data.NameSection + '</U></label>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '<div class="col-md-2">';
            divhidedetail += '<div class="form-group">';
            divhidedetail += '<label  class="col-sm-4 control-label">บริษัท</label>';
            divhidedetail += '<label  class="col-sm-8 control-label"><U>' + data.NameCompany + '</U></label>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '<div  class="row">';
            divhidedetail += '<div class="col-md-3"> &nbsp; </div>';
            divhidedetail += '<div class="col-md-6">';
            divhidedetail += '<div class="form-group">';
            divhidedetail += '<label  class="col-sm-5 control-label">ประเภทรายการ</label>';
            divhidedetail += '<div class="btn-group">';
            divhidedetail += '<select class="form-control"  id="selecttypepay"  onchange="changetype()"> ';
            divhidedetail += '<option>เลือกชื่อรายการ</option>';
            divhidedetail += '<option value="1">รายการเพิ่ม</option>';
            divhidedetail += '<option value="2">รายการหัก</option>';
            divhidedetail += '</select>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            divhidedetail += '</div>';
            $("#hidedetail").append(divhidedetail);
            hideseach();
        }
    });


});

function hideseach() {
    $("#showseach").hide();
}


function changetype() {
    factory_permanent();
    factory_thismonth();
}

function factory_permanent(){
    pay_type = $('#selecttypepay').val();
    var id_card = $('#seachnameemp').val();
    var datapost = {
        valueselecttypepay: pay_type,
        id_card: id_card
    };

    loadmaster(datapost);
}

function factory_thismonth(){
    pay_type = $('#selecttypepay').val();
    var id_card = $('#seachnameemp').val();
    var datapost = {
        valueselecttypepay: pay_type,
        id_card: id_card
    };

    loaddetail(datapost);
}


function loadmaster(datapost) {

    $('#showMaster').empty();
    $.ajax({
        async: true,
        method: "post",
        url: "seachpermanentmonthly",
        data: datapost,
        success: function(data) {
            var divhideseach = '<div class="box box-success">';
            divhideseach += '<div class="box-header with-border">';
            divhideseach += '<h3 class="box-title">ข้อมูลหลัก (Master)</h3>';
            divhideseach += '</div>';
            divhideseach += '<div class="box-body" style="background-color: #c8e6c9 !important;">';
            divhideseach += '<table class="table table-hover">';
            divhideseach += '<thead style="background-color: #00a65a !important;">';
            divhideseach += '<tr>';
            divhideseach += '<th width="5%" class="text-center">ลำดับ</th>';
            divhideseach += '<th width="15%">รูปแบบการจ่าย</th>';
            divhideseach += '<th width="20%">ชื่อรายการ</th>';
            divhideseach += '<th width="15%">เดือนเริ่มต้น</th>';
            divhideseach += '<th width="15%">เดือนที่สิ้นสุด</th>';
            divhideseach += '<th width="15%" class="text-right">จำนวน</th>';
            divhideseach += '<th width="15%" class="text-center">จัดการ</th>';
            divhideseach += '</tr>';
            divhideseach += '</thead>';
            divhideseach += '<tbody id="tblmaster">';
            divhideseach += '</tbody>';
            divhideseach += '</table>';
            divhideseach += '</div>';
            divhideseach += '</div> ';
            $("#showMaster").append(divhideseach)

            masterlist(data);

            //$('#modalLoader').modal('hide');
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}



function masterlist(data) {
    //console.log(data);

    var tbhtml;
    var deductdetailtype = "";
    var valuetype = "";
    var num=1;
    $.each(data, function(key, value) {
        $("[data-mask]").inputmask();
        deductdetailtype = data[key].ADD_DEDUCT_DETAIL_TYPE;
        var resulttype = "";
        if (deductdetailtype == 1) {
            resulttype = "ประจำเดือน";
        } else {
            resulttype = "เฉพาะเดือน";
        };
        // console.log(num);
        // console.log(key);

        var money = parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);

        tbhtml += '<tr><td class="text-center">' + num + '</td>';
        tbhtml += '<td>' + resulttype ;
        tbhtml += '</td>';
        tbhtml += '<td>' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '<input type="hidden" id="hide_master_deduct_tempate' + num + '" value="' + data[key].ADD_DEDUCT_TEMPLATE_ID + '"><br><div class = "col-xs-8"><select id="master_deduct_tempate' + num + '"  class="form-control hidetext"></select></div></td > ';
        tbhtml += '<td>' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_START_USE_DATE) + '<br>';
        tbhtml += '<input type="text" id="date_use_start' + num + '" value="' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_START_USE_DATE) + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td>' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_END_USE_DATE) + '<br>';
        tbhtml += '<input type="text" id="date_use_end' + num + '" value="' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_END_USE_DATE) + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td style="text-align: right">' + accounting.formatMoney(money)+ '<br><input type="text" id="master_amount' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_AMOUNT + '" ';
        tbhtml += " data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" class=\"form-control hidetext\" class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
        tbhtml += '<td>';
        tbhtml += '<center><button class = "btn btn-sm btn-warning" type = "button" onclick = "editMasterDeductDetail(' + num + ')" > แก้ ไข </button >';
        tbhtml += '&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteMasterDeductDetail(' + data[key].ID + ')" > ลบแถว </button>';
        tbhtml += '<br>';
        tbhtml += '<button class = "btn btn-sm btn-primary hidetext" id="saveEditMasterDeductDetail' + num + '" type = "button" onclick = "saveEditMasterDeductDetail(' + data[key].ID + ',' + num +
            ')" > บันทึก </button></center>';
        tbhtml += '</td ></tr > ';
        valuetype = data[key].ADD_DEDUCT_ID;
        listdeduct(num, valuetype);

        num++;
    });
    $("#tblmaster").append(tbhtml);


    hidetext();
    bindDatepicker();
    //bindMonthPaydate();

}



function loaddetail(datapost){
    //$('#modalLoader').modal();
    $('#showtable').empty();

    $.ajax({
        async: true,
        method: "post",
        url: "seachdeducdetailofmanagemonthly",
        data: datapost,
        success: function(data) {
            var divhideseach = '<div class="box box-info">';
            divhideseach += '<div class="box-header with-border">';
            divhideseach += '<h3 class="box-title">รายการรอประมวลผล</h3>';
            divhideseach += '</div>';
            divhideseach += '<div class="box-body">';
            divhideseach += '<table class="table table-bordered table-hover dataTable" >';
            divhideseach += '<thead>';
            divhideseach += '<tr>';
            divhideseach += '<th class="text-center" style="width: 3px;">ลำดับ</th>';
            divhideseach += '<th style="width: 50px;">รูปแบบการจ่าย</th>';
            divhideseach += '<th style="width: 50px;">ชื่อรายการ</th>';
            divhideseach += '<th style="width: 50px;">รอบเงินเดือน</th>';
            divhideseach += '<th style="width: 50px;">เดือนที่สิ้นสุด</th>';
            divhideseach += '<th style="width: 50px;" class="text-right">จำนวน</th>';
            divhideseach += '<th style="width: 50px;" class="text-left">หมายเหตุ</th>';
            divhideseach += '<th style="width: 50px;" class="text-center">จัดการ</th>';
            divhideseach += '</tr>';
            divhideseach += '</thead>';
            divhideseach += '<tbody id="tblticket">';
            divhideseach += '</tbody>';
            divhideseach += '</table>';
            divhideseach += '</div>';
            divhideseach += '</div> ';
            $("#showtable").append(divhideseach)

            listtabledetail(data);

            //$('#modalLoader').modal('hide');
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function listtabledetail(data) {
    //console.log(data);

    var tbhtml;
    var deductdetailtype = "";
    var valuetype = "";
    var rec = 1;
    $.each(data, function(key, value) {
        $("[data-mask]").inputmask();
        deductdetailtype = data[key].ADD_DEDUCT_DETAIL_TYPE;
        var resulttype = "";
        if (deductdetailtype == 1) {
            resulttype = "ประจำเดือน";
        } else {
            resulttype = "เฉพาะเดือน";
        };
        // console.log(num);
        // console.log(key);

        var money = parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);

        tbhtml += '<tr><td class="text-center">' + rec + '</td>';
        /*tbhtml += '<td>' + resulttype + '<br><input type="text" id="valuetypepay' + num + '" value="' + deductdetailtype + '" class="form-control hidetext">';
         tbhtml += '<select class="form-control hidetext"  id="selecttypepaylist' + num + '"> ';
         tbhtml += '<option>เลือกชื่อรายการ</option>';
         tbhtml += '<option value="1">ประจำเดือน</option>';
         tbhtml += '<option value="2">เฉพาะเดือน</option>';
         tbhtml += '</select>';*/
        tbhtml += '<td >'+resulttype;
        tbhtml += '</td>';
        tbhtml += '<td>' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '<input type="hidden" id="id_deduct' + num + '" value="' + data[key].ADD_DEDUCT_ID + '"></td > ';
        tbhtml += '<td>' + data[key].ADD_DEDUCT_DETAIL_PAY_DATE + '<br>';
        //tbhtml += '<input type="text" id="monthpaydate' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_PAY_DATE + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td>' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_END_USE_DATE);
        //tbhtml += '<input type="text" id="monthusedate' + num + '" value="' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_END_USE_DATE) + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td style="text-align: right">' + accounting.formatMoney(money)+ '<br><input type="text" id="amounttotal' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_AMOUNT + '" ';
        tbhtml += " data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
        tbhtml += '<td >'+data[key].ADD_DEDUCT_DETAIL + '<br>';
        tbhtml += '<input type="text" id="remarks' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td>';
        tbhtml += '<center><button class = "btn btn-sm btn-warning" type = "button" onclick = "editDeductDetail(' + num + ')" > แก้ ไข </button >';
        tbhtml += '&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ')" > ลบแถว </button>';
        tbhtml += '<br>';
        tbhtml += '<button class = "btn btn-sm btn-primary hidetext" id="saveEditDeductDetail' + num + '" type = "button" onclick = "saveEditDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ',' + num +
            ')" > บันทึก </button></center>';
        tbhtml += '</td ></tr > ';
        valuetype = data[key].ADD_DEDUCT_ID;

        listdeduct(num, valuetype);

        num++;
        rec++;
    });
    $("#tblticket").append(tbhtml);


    hidetext();
    bindDatepicker();
    bindMonthPaydate();

}


/*
function listtabledetail(data) {
    //console.log(data);

    var tbhtml;
    var deductdetailtype = "";
    var valuetype = "";
    $.each(data, function(key, value) {
        $("[data-mask]").inputmask();
        deductdetailtype = data[key].ADD_DEDUCT_DETAIL_TYPE;
        var resulttype = "";
        if (deductdetailtype == 1) {
            resulttype = "ประจำเดือน";
        } else {
            resulttype = "เฉพาะเดือน";
        };
        // console.log(num);
        // console.log(key);

        var money = parseFloat(data[key].ADD_DEDUCT_DETAIL_AMOUNT);

        tbhtml += '<tr><td class="text-center">' + num + '</td>';
        /*tbhtml += '<td>' + resulttype + '<br><input type="text" id="valuetypepay' + num + '" value="' + deductdetailtype + '" class="form-control hidetext">';
        tbhtml += '<select class="form-control hidetext"  id="selecttypepaylist' + num + '"> ';
        tbhtml += '<option>เลือกชื่อรายการ</option>';
        tbhtml += '<option value="1">ประจำเดือน</option>';
        tbhtml += '<option value="2">เฉพาะเดือน</option>';
        tbhtml += '</select>';
        tbhtml += '<td >'+resulttype;
        tbhtml += '</td>';
        tbhtml += '<td>' + data[key].ADD_DEDUCT_TEMPLATE_NAME + '<input type="hidden" id="id_deduct' + num + '" value="' + data[key].ADD_DEDUCT_ID + '"><br><div class = "col-xs-8"><select id="selecttypeadddeduc' + num + '"  class="form-control hidetext"><option value="51">ค่ามาตราฐาน</option></select></div></td > ';
        tbhtml += '<td>' + data[key].ADD_DEDUCT_DETAIL_PAY_DATE + '<br>';
        tbhtml += '<input type="text" id="monthpaydate' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_PAY_DATE + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td>' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_END_USE_DATE) + '<br>';
        tbhtml += '<input type="text" id="monthusedate' + num + '" value="' + showDateFromMySQL(data[key].ADD_DEDUCT_DETAIL_END_USE_DATE) + '"  class="form-control hidetext">';
        tbhtml += '</td>';
        tbhtml += '<td style="text-align: right">' + accounting.formatMoney(money)+ '<br><input type="text" id="amounttotal' + num + '" value="' + data[key].ADD_DEDUCT_DETAIL_AMOUNT + '" ';
        tbhtml += " data-inputmask=\"'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true\" class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
        tbhtml += '<td >'+data[key].ADD_DEDUCT_DETAIL;
        tbhtml += '</td>';
        tbhtml += '<td>';
        tbhtml += '<center><button class = "btn btn-sm btn-warning" type = "button" onclick = "editDeductDetail(' + num + ')" > แก้ ไข </button >';
        tbhtml += '&nbsp;<button class = "btn btn-sm btn-danger" type = "button" onclick = "deleteDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ')" > ลบแถว </button>';
        tbhtml += '<br>';
        tbhtml += '<button class = "btn btn-sm btn-primary hidetext" id="saveEditDeductDetail' + num + '" type = "button" onclick = "saveEditDeductDetail(' + data[key].ADD_DEDUCT_DETAIL_ID + ',' + num +
            ')" > บันทึก </button></center>';
        tbhtml += '</td ></tr > ';
        valuetype = data[key].ADD_DEDUCT_ID;
        listdeduct(num, valuetype);

        num++;
    });
    $("#tblticket").append(tbhtml);


    hidetext();
    bindDatepicker();
    bindMonthPaydate();

}
*/


function bindDatepicker() {
    // monthpaydat
    var objID = $("input[id^='monthusedate']");
    $.each(objID, function(key, value) {
        $(this).datepicker({
            autoclose: true,
            language: 'th',
            format: 'dd/mm/yyyy',
        });
    });

    var objID = $("input[id^='date_use']");
    $.each(objID, function(key, value) {
        $(this).datepicker({
            autoclose: true,
            language: 'th',
            format: 'dd/mm/yyyy',
        });
    });



}


function bindMonthPaydate() {
    //monthpaydate
    var objID = $("input[id^='monthpaydate']");
    $.each(objID, function(key, value) {
        //$(this).MonthPicker(MonthPickerConfig);

        $(this).datepicker({
            autoclose: true,
            language: 'th',
            format: "mm-yyyy",
            startView: "year",
            minView: "year",
            minViewMode: "months"
        });


    });


}

/*function createdatepicker(row) {

    $('#monthpaydate' + row).datepicker({
        autoclose: true,
        language: 'th',
        dateFormat: 'yy-mm',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
    });
}*/

/*
function listdeduct_old(row, valuetype) {

    var selecttypepay = $('#selecttypepay').val();
    if(selecttypepay=="1") {
        $('#selecttypeadddeduc' + row).html(objAddList);

    }
    else {
        $('#selecttypeadddeduc' + row).html(objDeductList);
    }
}
*/

//Master
function editMasterDeductDetail(val) {

    var SelAddDeductID = $('#hide_master_deduct_tempate'+val).val();

    if(parseInt(pay_type)===1 && pay_type !== undefined)
        $('#master_deduct_tempate'+val).html(objAddList);
    else
        $('#master_deduct_tempate'+val).html(objDeductList);

    $("#master_deduct_tempate"+val+" option[value='"+SelAddDeductID+"']").prop("selected", true);

    //set readonly
    $('#date_use_start' + val).prop('readonly',true);
    $('#date_use_end' + val).prop('readonly',true);
    $('#date_use_start' + val).show();
    $('#date_use_end' + val).show();

    $('#master_deduct_tempate' + val).show();
    $('#master_amount' + val).show();
    $('#saveEditMasterDeductDetail' + val).show();

    //set mask
    $("[data-mask]").inputmask();

}




function deleteMasterDeductDetail(id) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันลบข้อมูลหรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {

                var datapost = {
                    id: id,
                    _csrf : $('meta[name="csrf-token"]').attr("content")
                };

                $.ajax({
                    url: 'deletepermanent',
                    data: datapost,
                    type: 'POST',
                    success: function(data) {
                        factory_permanent();
                        hidetext();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบลบข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        }
    });

}

function saveEditMasterDeductDetail(id,row) {

    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลหรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {

                var master_deduct_tempate = $('#master_deduct_tempate' + row).val();
                var date_use_start = $('#date_use_start' + row).val();
                var date_use_end = $('#date_use_end' + row).val();
                var master_amount = $('#master_amount' + row).val();

                var datapostsave = {
                    id: id,
                    template_id: master_deduct_tempate,
                    date_use_start: date_use_start,
                    date_use_end: date_use_end,
                    master_amount: master_amount,
                    _csrf : $('meta[name="csrf-token"]').attr("content")
                };

                $.ajax({
                    url: 'savepermanent',
                    data: datapostsave,
                    type: 'POST',
                    success: function(data) {
                        factory_permanent();
                        hidetext();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        }
    });
}




function listdeduct(row, valuetype) {
    var selecttypepay = $('#selecttypepay').val();
    //console.log(selecttypepay);
    $.ajax({
        method: "GET",
        url: "getdeductlisttempall?selecttypepay=" + selecttypepay,
        success: function(data, textStatus, jQxhr) {
            var datalist = '<option selected="selected" value=""> เลือกชื่อรายการ </option>';
            $.each(data, function(key, value) {
                datalist += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";

            });

            $('#selecttypeadddeduc' + row).html(datalist);
            $('#selecttypeadddeduc' + row).val(valuetype);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function hidetext() {
    $('.hidetext').hide();

}

function deleteDeductDetail(val) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันที่จะลบข้อมูลหรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                var add_deductdetail_id = val;
                //var id_card = $('#id_emp').val();
                var id_card = $('#seachnameemp').val();

                var valueselecttypepay = $('#selecttypepay').val();
                var datapostdete = { add_deductdetail_id: add_deductdetail_id, id_card: id_card, valueselecttypepay: valueselecttypepay };
                //console.log(datapostdete);

                $.ajax({
                    url: 'deletedeductdetailformanagemonthly',
                    data: datapostdete,
                    type: 'POST',
                    success: function(data) {
                        $("#tblticket").empty();
                        num = 1;
                        //var tbhtml = "";
                        console.log(data);
                        listtabledetail(data);
                        // $("[data-mask]").inputmask();
                        hidetext();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบลบข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });

            }
        }
    });
}



function editDeductDetail(val) {

    //TODO : Adjust Code like master
    var setSelect = $('#id_deduct' + val).val();
    var valuetypepay = $('#valuetypepay' + val).val();

    //console.log(setSelect);

    //set readonly
    //$('#monthpaydate' + val).prop('readonly',true);
    //$('#monthusedate' + val).prop('readonly',true);

    //set show
    $('#selecttypepaylist' + val).show();
    $('#monthpaydate' + val).show();
    $('#monthusedate' + val).show();
    $('#selecttypeadddeduc' + val).show();
    $('#amounttotal' + val).show();
    $('#saveEditDeductDetail' + val).show();
    $('#remarks'+val).show();

    //$('#selecttypepaylist' + val).val(valuetypepay);

    $('#selecttypeadddeduc' + val).val(setSelect);
    
    //set mask
    $("[data-mask]").inputmask();
}

function saveEditDeductDetail(val, row) {
    bootbox.confirm({
        size: "small",
        message: "<h4 class=\"btalert\">คุณยืนยันบันทึกข้อมูลหรือไม่?</h4>",
        callback: function(result) {
            if (result == 1) {
                //var id_emp = $('#id_emp').val();
                var id_emp = $('#seachnameemp').val();
               // var selecttypepaylist = $('#selecttypepaylist' + row).val();
               // var selecttypeadddeduc = $('#selecttypeadddeduc' + row).val();
               // var monthpaydate = $('#monthpaydate' + row).val();
                //var monthusedate = $('#monthusedate' + row).val();
                var amounttotal = $('#amounttotal' + row).val();
                var remarks = $('#remarks' + row).val();
                var add_deductdetail_id = val;
                var valueselecttypepay = $('#selecttypepay').val();




                var datapostsave = {
                    id_emp: id_emp,
                   // selecttypepaylist: selecttypepaylist,
                    //selecttypeadddeduc: selecttypeadddeduc,
                    //monthpaydate: monthpaydate,
                    //monthusedate: monthusedate,
                    remarks : remarks,
                    amounttotal: amounttotal,
                    add_deductdetail_id: add_deductdetail_id,
                    valueselecttypepay: valueselecttypepay
                };

                console.log(datapostsave);
                //return false;
                $.ajax({
                    url: 'savedeductdetailformanagemonthly',
                    data: datapostsave,
                    type: 'POST',
                    success: function(data) {
                        $("#tblticket").empty();
                        num = 1;
                        var tbhtml = "";
                        // console.log(data);
                        listtabledetail(data);
                        $("[data-mask]").inputmask();
                        hidetext();
                        var box = bootbox.alert({
                            size: "small",
                            title: "แจ้งเตือน",
                            message: "ระบบบันทึกข้อมูลเรียบร้อย",
                        }); //"ระบบลบข้อมูลเรียบร้อย");

                        setTimeout(function() {
                            // be careful not to call box.hide() here, which will invoke jQuery's hide method
                            box.modal('hide');
                        }, BootboxTimeOut);

                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        }
    });

}