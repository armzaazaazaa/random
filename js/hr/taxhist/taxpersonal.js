/**
 * Created by pacharapol on 6/6/2017 AD.
 */
var num = 1;

var idcard;

function loadPersonaltaxtsearch(tab) {

    var haveCont = $(tab).data('have-contend');
    //var id_card_ref = $('#id_card_ref').val();
    var idcardlogin = $('#id_card_ref').val();
    // var viewOnly = $('#viewOnly').val();
    $('#idcardset').val(idcardlogin);
    //   console.log(haveCont);
    //   console.log(idcardlogin);
    idcard = idcardlogin;

    if (haveCont == 'no') {
        //load
        $.get('../personal/personaltaxsearch', function(res) {

            $('#taxhistory .box-body').html(res).promise().done(function() {

                //-----
                $(".select2").select2();

                $("[data-mask]").inputmask();

                getYeartax();
                $("#selectyeartax").change(function() {
                    searchTax();
                });


            });

        });
    }
}

function getYeartax() {

    $.ajax({
        method: "GET",
        url: "../payroll/getsalarybyidcard",
        success: (function(data) {
            // console.log(data);
            var _options = "";
            _options += "<option value=''>เลือกปี</option>";
            $.each(data, function(key, value) {
                _options += "<option value='" + data[key].Year + "'>" + data[key].Year + "</option>";
                $("#selectyeartax").html(_options);
            });

        })
    });
}

function searchTax() {

    var y = $('#selectyeartax').val(); //select year
    if(y.length==0) {
        showMessageBox('กรุณาเลือกปี');
        return false;
    }


    var data = {
        'idcard': idcard,
        'monthselect': $('#selectmonthtax').val(),
        'yearselect': $('#selectyeartax').val(),

    }
    $('#detailtaxpersonal').empty();
    $('#sum_tax_all').html('');
    $('#foot_sumtax_all').css( "display","none" );

    var tbhtml = "";
    var sumall = 0;
    //console.log(data);
    $.ajax({
        method: "post",
        url: "../personal/searchtaxpersonal",
        data: data,
        success: (function(data) {
            // console.log(data);
            num = 1;
            $.each(data, function(key, value) {
                var amt = parseFloat(data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT);

                tbhtml += '<tr>';
                tbhtml += '<td>' + num + '</td>';
                tbhtml += '<td>' + data[key].ADD_DEDUCT_THIS_MONTH_TMP_NAME + '</td>';
                tbhtml += '<td>' + accounting.formatMoney(amt)+ '</td>';
                tbhtml += '<td>' + data[key].ADD_DEDUCT_THIS_MONTH_DETAIL + '</td>';
                tbhtml += '</tr>';
                num++;
                sumall += parseFloat(data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT);
            });

            if(num==1) {
                tbhtml += '<tr>';
                tbhtml += '<td colspan="4">ไม่พบรายการ</td>';
                tbhtml += '</tr>';

            }

            if(num > 1) {
                //$('#foot_sumtax_all').css("display","");
                $('#sum_tax_all').html(accounting.formatMoney(sumall));
                $('#foot_sumtax_all').prop( "style", null );
            }
            $('#detailtaxpersonal').append(tbhtml);
        })
    });
}