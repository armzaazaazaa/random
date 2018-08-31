var num = 1;
$(document).ready(function() {
    // var idcardlogin = $('#idcardset').val();
    // $.ajax({
    //     method: "GET",
    //     url: "getyearbenefitlist?idcard=" + idcardlogin,
    //     success: (function(data) {
    //         // console.log(data);
    //         var datayear = '<option selected="selected" value=""> เลือกปี </option>';
    //         $.each(data, function(key, value) {
    //             datayear += "<option value='" + data[key] + "'>" + data[key] + "</option>";
    //         });
    //         $('#selectyearbenefit').html(datayear);
    //     })
    // });

    // $.ajax({
    //     method: "GET",
    //     url: "getyearssolist?idcard=" + idcardlogin,
    //     success: (function(data) {
    //         // console.log(data);
    //         var datayearsso = '<option selected="selected" value=""> เลือกปี </option>';
    //         $.each(data, function(key, value) {
    //             datayearsso += "<option value='" + data[key] + "'>" + data[key] + "</option>";
    //         });
    //         $('#selectyearsso').html(datayearsso);
    //     })
    // });


});

function selectyearben(val) {
    $('#tblticket').empty();
    $('#sumThisYear').empty();
    $('#sumThisAll').empty();
    $('#showtbcontent').show();
    var year = val.value;
    var idcardlogin = $('#idcardset').val();
    var datapost = {
        year: year,
        idcard: idcardlogin,
    }

    $.ajax({
        method: "post",
        url: "../sso/getdatabenefitthis",
        data: datapost,
        success: (function(data) {
            listdatabenefit(data);
        })
    });
    $.ajax({
        method: "post",
        url: "../sso/getdatabenefitsumthis",
        data: datapost,
        success: (function(data) {
            console.log(data);

            $('#showSumThis').show();
            $('#sumThisYear').append('เงินสะสมประจำปี ' + ' ' + year + ' เท่ากับ' + data['0'].BENEFIT_TOTAL_AMOUNT + 'บาท');

            $('#showSumAll').show();
            $('#sumThisAll').append('เงินสะสมทั้งหมด ' + ' เท่ากับ' + data['0'].BENEFIT_TOTAL_AMOUNT + 'บาท');
        })
    });
}

function listdatabenefit(data) {
    var tbhtml = "";
    num = 1;
    $.each(data, function(key, value) {
        tbhtml += "<tr><td>" + num + '</td>';
        tbhtml += '<td>' + data[key].BENEFIT_SAVING_DATE + '</td>';
        tbhtml += '<td>' + data[key].BENEFIT_DETAIL + '</td>';
        tbhtml += '<td>' + data[key].BENEFIT_AMOUNT + '</td></tr >';
        num++;
    });
    $("#tblticket").append(tbhtml);
}


///////////////////// sso  /////////////////////


function selectyearvalsso(val) {
    $('#tblticketsso').empty();
    $('#sumThisYear').empty();
    $('#sumThisAll').empty();
    $('#sumThisYearSso').empty();
    $('#sumThisAllSso').empty();
    $('#showtbcontentsso').show();
    var year = val.value;
    var idcardlogin = $('#idcardset').val();
    var datapost = {
        year: year,
        idcard: idcardlogin,
    }

    $.ajax({
        method: "post",
        url: "../sso/getdatassothis",
        data: datapost,
        success: (function(data) {
            listdatasso(data);
        })
    });
    $.ajax({
        method: "post",
        url: "../sso/getdatassosumthis",
        data: datapost,
        success: (function(data) {
            console.log(data);

            $('#showSumThisSso').show();
            $('#sumThisYearSso').append('เงินประกันสังคมประจำปี ' + ' ' + year + ' เท่ากับ' + data['0'].SUMSOCIAL_SALARY_ID + 'บาท');

            // $('#showSumAllSso').show();
            // $('#sumThisAllSso').append('เงินประกันสังคมทั้งหมด ' + ' เท่ากับ' + data['0'].SUMSOCIAL_SALARY_ID + 'บาท');
        })
    });

    $.ajax({
        method: "post",
        url: "../sso/getdatassosumall",
        data: datapost,
        success: (function(data) {
            console.log(data);

            // $('#showSumThisSso').show();
            // $('#sumThisYearSso').append('เงินประกันสังคมประจำปี ' + ' ' + year + ' เท่ากับ' + data['0'].SUMSOCIAL_SALARY_ID + 'บาท');

            $('#showSumAllSso').show();
            $('#sumThisAllSso').append('เงินประกันสังคมทั้งหมด ' + ' เท่ากับ' + data['0'].SUMALLSOCIAL_SALARY_ID + 'บาท');
        })
    });
}

function listdatasso(data) {
    var tbhtmlsso = "";
    num = 1;
    $.each(data, function(key, value) {
        tbhtmlsso += "<tr><td>" + num + '</td>';
        tbhtmlsso += '<td>' + data[key].SOCIAL_SALARY_DATE + '</td>';
        tbhtmlsso += '<td>' + data[key].SOCIAL_SALARY_PERCENT + '</td>';
        tbhtmlsso += '<td>' + data[key].SOCIAL_SALARY_AMOUNT + '</td></tr >';
        num++;
    });
    $("#tblticketsso").append(tbhtmlsso);
}


function loadSsohistory(tab) {

    var haveCont = $(tab).data('have-contend');
    //var id_card_ref = $('#id_card_ref').val();
    var idcardlogin = $('#id_card_ref').val();
    // var viewOnly = $('#viewOnly').val();
    $('#idcardset').val(idcardlogin);
    console.log(haveCont);
    console.log(idcardlogin);

    if (haveCont == 'no') {
        //load
        $.get('../sso/ssohistory', function(res) {

            $('#ssohistory .box-body').html(res).promise().done(function() {

                //-----
                $(".select2").select2();

                $("[data-mask]").inputmask();

                // console.log(emp_id);
                //

                if (haveCont != 'yes') {
                    $(tab).data('have-contend', 'yes');
                    $.ajax({
                        method: "GET",
                        url: "../sso/getyearbenefitlist?idcard=" + idcardlogin,
                        success: (function(data) {
                            // console.log(data);
                            var datayear = '<option selected="selected" value=""> เลือกปี </option>';
                            $.each(data, function(key, value) {
                                datayear += "<option value='" + data[key] + "'>" + data[key] + "</option>";
                            });
                            $('#selectyearbenefit').html(datayear);

                        })
                    });
                    $.ajax({
                        method: "GET",
                        url: "../sso/getyearssolist?idcard=" + idcardlogin,
                        success: (function(data) {
                            // console.log(data);
                            var datayearsso = '<option selected="selected" value=""> เลือกปี </option>';
                            $.each(data, function(key, value) {
                                datayearsso += "<option value='" + data[key] + "'>" + data[key] + "</option>";
                            });
                            $('#selectyearsso').html(datayearsso);
                        })
                    });

                    $.ajax({
                        method: "GET",
                        url: "../sso/getstatussso?idcard=" + idcardlogin,
                        success: (function(data) {
                            //  console.log(data);
                            if (data.socialBenefitStatus == 1) {
                                $('#socialBenefitStatus1').prop("checked", true);
                            } else {
                                $('#socialBenefitStatus0').prop("checked", true);
                            }
                            $('#socialBenifitPercent').val(data.socialBenifitPercent);
                            $('#EmployersocialBenifitPercent').val(data.socialBenifitPercent);

                            if (data.socialBenefitStatus == 1) {
                                $('#socialBenefitStatus1').prop("checked", true);
                            } else {
                                $('#socialBenefitStatus0').prop("checked", true);
                            }
                            $('#socialBenifitPercent').val(data.socialBenifitPercent);
                            $('#EmployersocialBenifitPercent').val(data.socialBenifitPercent);

                        })
                    });


                    //  $.ajax({
                    //     method: "GET",
                    //     url: "/wseasyerp/hr/sso/getstatusbenefit?idcard=" + idcardlogin,
                    //     success: (function(data) {
                    //          console.log(data);
                    //          if(data.socialBenefitStatus == 1){
                    //             $('#socialBenefitStatus1').prop("checked", true);
                    //          }else{
                    //             $('#socialBenefitStatus0').prop("checked", true);
                    //          }
                    //          $('#socialBenifitPercent').val(data.socialBenifitPercent);
                    //          $('#EmployersocialBenifitPercent').val(data.socialBenifitPercent)

                    //     })
                    // });



                } else {
                    //console.log("xxxxxxx");
                }
            });

        });
    }
}