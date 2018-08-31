var objEmp;
var num = 1;
var dataidcard = {};
$(document).ready(function () {

    /*    $.ajax({
     method: "GET",
     url: "autocomp",
     success: (function(data) {
     // console.log(data);
     objEmp = data;
     bindObjAutoComplete();
     })
     });*/

    $("[data-mask]").inputmask();
    $("#btnAddFile").hide();
    $("#showcontant").hide();


    $('.select2').select2();
    $('.select2').select2().val('').trigger("change");

});

/*function bindObjAutoComplete() {
 $("#namefullemp").each(function() {
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
 }*/

$("#btnRecal").click(function () {
    var injectdate = $('#pay_date').prop('title');
    var id_emp = $("input[name='emp_idcard[]']")
        .map(function () {
            return $(this).val();
        }).get();

    if(id_emp.length > 0) {
        var postData = {
            'id_emp': id_emp,
            'pay_date' : injectdate,
            '_csrf' : $('meta[name="csrf-token"]').attr("content"),
            'mode' : 'recal'
        };

        $.ajax({
            method: "post",
            data: postData,
            url: "createsalary",
            success: (function (data) {
                $("#tblticket").empty();
                $('#btnRecal').hide();
                $('#showcontent').hide();
                var box = bootbox.alert({
                    size: "small",
                    title: "แจ้งเตือน",
                    message: "ระบบปรับปรุงข้อมูลเรียบร้อย" + data + "รายการ",
                    callback: function (result) {}
                });
            })
        });
    }
});



$("#seachdatalist").click(function () {

    var id_emp = $('#id_emp').val();
    if (id_emp != '' &&  id_emp != null) {

        var datapost = {
            id_emp: id_emp,
        }

        $('#btnRecal').show();
        $('#showcontent').show();

        $.ajax({
            method: "post",
            data: datapost,
            url: "searchempdata",
            success: (function (data) {
                listdetail(data);

            })
        });
    }
});

function deleteMe(me) {
    var tr = $(me).closest("tr");
    tr.remove();
    reindex();
}

function reindex() {
    var arrTD = $('#tbemployee tr').find("td:first");
    console.log(arrTD);
    var xcount = arrTD.length;
    for (var i = 1; i < xcount; i++) {
        var c = (i + 1) + '. ';
        $(arrTD[i]).html(c);
    }
}


function listdetail(data) {
    $.each(data, function (key, value) {
        var tbhtml = "<tr><td class='text-center'>" + num + '</td>';
        tbhtml += '<td>' + data[key].Fullname + '<input type="hidden" id="emp_idcard_'+num+'" name="emp_idcard[]" value="'+data[key].ID_Card+'"></td >';
        tbhtml += '<td>' + data[key].Position + '</td>';
        tbhtml += '<td>' + data[key].DepartmentName + '</td>';
        tbhtml += '<td>' + data[key].SectionName + '</td>';
        tbhtml += '<td>' + data[key].CompanyName + '</td>';
        tbhtml += '<td><div class="btn-group"><button type="button" id="del" onclick="deleteMe($(this));" class="btn btn-danger"><i class="fa fa-trash"></i> </button></div></td>< /tr >';

        $("#tblticket").append(tbhtml);
    });

    num++;
    reindex();
}
