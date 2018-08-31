/**
 * Created by pacharapol on 6/6/2017 AD.
 */
var idcardlogin;
var num = 1;
function loadPersonalhisdeduct(tab) {

    var haveCont = $(tab).data('have-contend');
    //var id_card_ref = $('#id_card_ref').val();
     idcardlogin = $('#id_card_ref').val();
    // var viewOnly = $('#viewOnly').val();
    $('#idcardset').val(idcardlogin);
    //console.log(haveCont);
    //console.log(idcardlogin);

    if (haveCont == 'no') {
        //load
        $.get('../hr/payroll/personaldeduct', function(res) {

            $('#histdeduct .box-body').html(res).promise().done(function() {

                //-----
                $(".select2").select2();

                $("[data-mask]").inputmask();

                $.ajax({
                    method: "GET",
                    url: "../hr/payroll/listyearhistdeduct?idcard="+idcardlogin,
                    success: (function(data) {
                        console.log(data);

                        var year = "<option value='0'>เลือกเดือน</option>";
                        $.each(data, function(key, value) {
                            year += '<option value=' + value + '>' + value + '</option>';
                        });
                        $('#selectyear').html(year);

                    })
                });


            });

        });
    }
}

function seachPersonaldeduct() {
    var postData = {
        'selectmonth':$('#selectmonth').val(),
        'selectyear':$('#selectyear').val(),
        'idcardset':idcardlogin,
    }
    console.log(postData);
    $("#showdetaildeduct").empty();
    var tbhtml = "";
    num = 1;
    $.ajax({
        method: "post",
        url: "../hr/payroll/listgetdeductpersonal",
        data:postData,
        success: (function(data) {
            console.log(data);
            $.each(data, function(key, value) {
                tbhtml += "<tr><td>" + num + '</td>';
                tbhtml += '<td>' + data[key].ADD_DEDUCT_THIS_MONTH_TMP_NAME + '</td > ';
                tbhtml += '<td>' + data[key].ADD_DEDUCT_THIS_MONTH_AMOUNT + '</td>';
                tbhtml += '<td>' + data[key].ADD_DEDUCT_THIS_MONTH_DETAIL + '</td>';
                tbhtml += '<td><font id="workingnamededuct'+num+'"></font></td></tr>';
                num++;

            });
            $("#showdetaildeduct").append(tbhtml);

            workingdeduct(data);
        })
    });
}

function workingdeduct(data) {
        console.log(data);
        num =1;
    $.each(data, function(key, value) {
        $.ajax({
            method: "get",
            url: "../hr/payroll/workingcompany?id_deductdetail="+data[key].ADD_DEDUCT_THIS_MONTH_DETAIL_ID,
            success: (function(data) {
                console.log(data);
                $('#workingnamededuct'+num).append("<h5>data[0].Workingname</h5>");
            })
        });
        //console.log(num);
        num++;
    });

}