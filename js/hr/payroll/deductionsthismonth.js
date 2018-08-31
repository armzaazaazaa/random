var countchkfile = 1;
var objEmp;

$(document).ready(function() {

    $('#saveShow').hide();


    $('#btnAddFile').click(function() {



        var thtml = '<tr>';
        thtml += '<td width="16%">'
        thtml += '<select name="paytypededuct[]" class="form-control" onchange="changPaytype(this)">'
        thtml += '<option value="">รูปแบบการจ่าย</option>'
        thtml += '<option value="1">ประจำทุกเดือน</option>'
        thtml += '<option value="2">เฉพาะเดือน</option>'
        thtml += '</select>'
        thtml += '</td>';
        thtml += '<td width="16%"><select name="id_deduct[]" id="id_deduct' + countchkfile + '" class="form-control" ></select></td>';
        thtml += '<td width="16%"><input type="text" name="paydate[]" id="paydate' + countchkfile + '" ></td>';
        thtml += '<td width="16%"><input type="text" name="usedate[]" id="usedate' + countchkfile + '"></td>';
        thtml += '<td width="16%"><input type="text" name="enddate[]" id="enddate' + countchkfile + '"></td>';
        thtml += '<td width="10%"><input type="text" name="amount[]" class="form-control" size="3" ';
        thtml += " data-inputmask=\"'alias': 'decimal'\" class=\"form-control hidetext\" placeholder=\"0.00\" data-mask></div></td>";
        thtml += '<td width="19%"><input type="text" name="detail[]" class="form-control" size="7"></td>';
        thtml += '<td><button class="btn btn-sm btn-danger" type="button" id="btnRemoveFile"> ลบแถว </button></td>';
        thtml += '</tr>';



        $("#tblticket").last().append(thtml);
        $("[data-mask]").inputmask();


        $('#paydate' + countchkfile).datepicker({
            autoclose: true,
            language: 'th',
            dateFormat: 'yy-mm',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
        });


        $('#usedate' + countchkfile).datepicker({
            autoclose: true,
            language: 'th',
            dateFormat: 'yy-mm',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
        });

        $('#enddate' + countchkfile).datepicker({
            autoclose: true,
            language: 'th',
            dateFormat: 'yy-mm',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
        });

        var projects = objEmp;

        $('#saveShow').show();
        bindRemoveFile();
        bindHideteax(countchkfile)
        bindLoadsesucttem(countchkfile);
        countchkfile++;
    });

    $('#selectworking').change(function() {
        lookupdepartment($(this), 'selectdepartment', 'selectsection', true);
        var CopmanyId = $('#selectworking').val();
        lookupemployee(CopmanyId, null, null);
    });

    $('#selectdepartment').change(function() {

        lookupsection($(this), $('#selectworking').val(), 'selectsection', true); //ค่า demp working selection true
        var DepartmentID = $('#selectdepartment').val();
        lookupemployee($('#selectworking').val(), DepartmentID, null);
    });

    $('#selectsection').change(function() {
        lookupemployee($('#selectworking').val(), $('#selectdepartment').val(), $('#selectsection').val(), true);
    });

});

function bindHideteax(counting) {
    $("#paydate" + counting).hide();
    $("#usedate" + counting).hide();
    $("#enddate" + counting).hide();
}

function bindLoadsesucttem(counting) {
    $.ajax({
        method: "GET",
        url: "getlistdeducttem",
        success: function(data, textStatus, jQxhr) {
            console.log(data);
            var listdata = '<option selected="selected" value=""> รายการ </option>';
            $.each(data, function(key, value) {
                listdata += "<option value='" + data[key].ADD_DEDUCT_TEMPLATE_ID + "'>" + data[key].ADD_DEDUCT_TEMPLATE_NAME + "</option>";
            });
            $('#id_deduct' + counting).html(listdata);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
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


function getDataEmpbyidcard(id_card) {

    $.ajax({
        method: "GET",
        url: "getdataempjson?id_card=" + id_card,
        success: function(data, textStatus, jQxhr) {
            //console.log(data);
            $('#BeShow').html(data['0'].Be);
            $('#NameShow').html(data['0'].Name);
            $('#Surname').html(data['0'].Surname);
            $('#Position').html(data['0'].Position);
            $('#NameDepartment').html(data['0'].NameDepartment);
            $('#NameSection').html(data['0'].NameSection);
            $('#NameCompany').html(data['0'].NameCompany);
            $('#Id_Card').val(data['0'].ID_Card);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}

function changPaytype(val) {
    var tr = $(val).closest('tr');
    if (val.value == 2) {
        $(tr).find('td:eq(2) input').show();
        $(tr).find('td:eq(3) input').hide();
        $(tr).find('td:eq(4) input').hide();
    } else if (val.value == 1) {
        $(tr).find('td:eq(2) input').hide();
        $(tr).find('td:eq(3) input').show();
        $(tr).find('td:eq(4) input').show();
        console.log(val.value);
    }
}