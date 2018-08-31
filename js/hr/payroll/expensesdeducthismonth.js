var countchkfile = 1;
var objEmp;

$(document).ready(function() {
    // alert(PATH);
    $.ajax({
        method: "GET",
        url: "autocomp",
        success: (function(data) {
            //console.log(data);
            objEmp = data;
        })
    });

    $('#hiddenShow').hide();
    $('.select2').css({ "width": "100%" });

    // $('#btnAddFile').click(function() {
    //     var thtml = '<tr>';
    //     thtml += '<td><label>ลำดับที่ ' + countchkfile + ' ชื่อพนักงาน</label>&nbsp;&nbsp;<input type="text" name="name_emp[]" id="name_emp' + countchkfile + '" ><input type="hidden" name="id_emp[]" id="id_emp' + countchkfile + '" >&nbsp;&nbsp;</td>';
    //     thtml += '<td><label>จำนวน</label> <input type="text" name="total[]" id="total' + countchkfile + '"><label>บาท</label>&nbsp;&nbsp;&nbsp;&nbsp;</td>';
    //     thtml += '<td><a href="javascript:;" onclick="showtextdetail(' + countchkfile + ')"><i class="fa fa-fw fa-pencil-square-o" ></i></a><input type="text" name="detail[]" id="detail' + countchkfile + '">&nbsp;&nbsp;&nbsp;</td>';
    //     thtml += '<td><button class="btn btn-sm btn-danger" type="button" id="btnRemoveFile"> ลบแถว </button></td>';
    //     thtml += '</tr>';


    //     $("#tblticket").last().append(thtml);

    //     var projects = objEmp;

    //     bindRemoveFile();
    //     bindHideteax(countchkfile)
    //     bindObjAutoComplete(countchkfile);
    //     $('#hiddenShow').show();
    //     countchkfile++;
    // });


    $(".select2").select2();
    $('.select2').select2().val('').trigger("change");
    $("[data-mask]").inputmask();
    // $(".numberformat").maskNumber({
    //     integer: true,
    // });


    $('#date_pay').MonthPicker(MonthPickerConfig);

});

// $(document).on('keyup', '.numberformat', function() {
//     var x = $(this).val();
//     $(this).val(x.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
// });

function bindHideteax(counting) {
    $("#detail" + counting).hide();;
}

function bindObjAutoComplete(counting) {
    $("input[name^='name_emp']").each(function() {
        $(this).autocomplete({
                minLength: 2,
                source: objEmp,
                focus: function(event, ui) {
                    $(this).val(ui.item.label);
                    return false;
                },
                select: function(event, ui) {
                    $(this).val(ui.item.label);
                    $("#id_emp" + counting).val(ui.item.value);
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

function bindRemoveFile() {
    $('button[id^="btnRemoveFile"]').filter(function() {
        $(this).click(function() {
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

}


function checkInputMoney() {
    var f = true;

    var total = $("input[name='total[]']");
    $.each(total, function (key, obj) {
        console.log(obj.value);
        if (obj.value == '') {
            f = false;
            obj.style.borderColor = "red";
        }
    });

    return f;
}




$('#saveAdddeduct').on('click', function() {


    var add_deduct_template_id = $('#add_deduct_template_id').val();
    if (add_deduct_template_id === "0") {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">กรุณาเลือกประเภทรายการ</h4>",
            callback: function () {
            }
        });
        htmlError($('#add_deduct_template_id'));
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
            callback: function(result) {
                if (result == 1) {

                    var id_emp = $("select[name='id_emp[]']")
                        .map(function() { return $(this).val(); }).get();

                    var total = $("input[name='total[]']")
                        .map(function() { return $(this).val(); }).get();

                    var detail = $("input[name='detail[]']")
                        .map(function() { return $(this).val(); }).get();

                    //var add_deduct_template_id = $('#add_deduct_template_id').val();
                    var date_pay = $('#date_pay').val();
                    var postData = {
                        'id_emp': id_emp,
                        'total': total,
                        'detail': detail,
                        'datepay' : date_pay,
                        'add_deduct_template_id': add_deduct_template_id,
                    };
                    //console.log(postData);

                    $.ajax({
                        url: "saveexpensesthismonth",
                        data: postData,
                        type: 'POST',
                        success: (function(data) {
                            console.log(data);
                            var result = true;
                            var box = bootbox.alert({
                                size: "small",
                                title: "แจ้งเตือน",
                                message: "ระบบบันทึกข้อมูลเรียบร้อย" + data + "รายการ",
                                callback: function(result) {
                                    if (result == true) {
                                        location.reload();

                                    } else {
                                        location.reload();
                                    }
                                }

                            }); //"ระบบลบข้อมูลเรียบร้อย");

                        })
                    });

                }
            }
        });
    }
    return false;




})

$('#btnAddFile').on("click", function() {
    var options = null;

    CloneTableRow(options);
    //bindDataWithStep();
});

function CloneTableRow(options) {
    $('#tblticket tbody').append($('#tblticket tbody tr:last').clone());
    var btn = '<div class="btn-group">';
    btn += '<button type="button" id="del" onclick="deleteMe($(this));" class="btn btn-danger"><i class="fa fa-trash"></i> </button>';
    btn += '</div>';

    var lasttd = $("#tblticket tbody tr:last td:last");
    //console.log(lasttd);
    lasttd.html(btn);
    reindex();
    bindEventSelect2AfterCloneRow();
    $("[data-mask]").inputmask();


}

function deleteMe(me) {
    var tr = $(me).closest("tr");
    tr.remove();
    reindex();
}

function reindex() {
    var arrTD = $('#tblticket tr').find("td:first");
    // console.log(arrTD);
    var xcount = arrTD.length;
    for (var i = 1; i < xcount; i++) {
        var c = (i + 1) + '. ';
        $(arrTD[i]).html(c);

    }
}

function bindEventSelect2AfterCloneRow() {

    var xrows = $('#tblticket tr');
    var xcount = xrows.length;
    var xlastRow = xrows[xcount - 1];
    var select = $(xlastRow).find('select');
    // console.log(select);

    var textInput = $(xlastRow).find('input');
    var objInp = $(textInput[0]);
    objInp.val('');


    var td = $(select.eq(0)).closest("td");
    td.html('');
    var divv = '<select class="form-control select2" style="width: 100%;" id="id_emp" name="id_emp[]">';
    divv += '</select>';

    td.html(divv);

    // console.log(objEmp);

    var _options;
    $.each(objEmp, function(key, value) {
        _options += "<option value='" + objEmp[key].value + "'>" + objEmp[key].label + "</option>";
    });

    td.find('select').append(_options);
    td.find('select').select2();
    td.find('select').select2().val('').trigger("change");


}

// $('table tbody tr td img').click(function() {
//     console.log($(this).index());
// });




function showhidedetail(x) {
    //var x = $(this).parents('table tbody tr').index();
    var rowIndex = $(x).closest('tr').index();
    //alert("Row index is: " + rowIndex);
    $("table tr:eq(" + rowIndex + ") td:eq(5) input").toggle();


}

// $("#tblticket").on("click", "td:eq(4)", function() {
//     var x = this.cellIndex;
//     var y = this.parentNode.rowIndex;
//     // console.log(x, y);
//     //('table tr:eq(1)').hide()

//     $("table tr:eq(" + y + ") td:eq(5) input").show();

// });