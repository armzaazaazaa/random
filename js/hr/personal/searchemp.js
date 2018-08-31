/**
 * Created by pacharapol on 6/13/2017 AD.
 */





var num = 1 ;

$(document).ready(function() {
    $("#start_date, #end_date").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
    });


});



function getCompanyForDepartment(val) {

    var _options1 = '<option selected="selected" value="">  เลือกแผนก  </option>';
    var _options2 = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _url = $('#urlGetDepartment').attr('title');
    var valueCompany = val.value;
    //$('#hiddenvalCompany').val(valueCompany);
    if(valueCompany !='') {
        $.ajax({
            method: "GET",
            url: _url + "?id_company=" + valueCompany,
            success: function (data, textStatus, jQxhr) {
                $.each(data, function (key, value) {
                    _options1 += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#selectdepartment').html(_options1);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else {
        $('#selectdepartment').html(_options1);
        $('#selectsection').html(_options2);
    }
}

function getDepartmentForSection(val) {

    var _options = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
    var _url = $('#urlGetSection').attr('title');
    var valueDepartment = val.value;
    //$('#hiddenvalDepartment').val(valueDepartment);

    if(valueDepartment !='') {
        $.ajax({
            method: "GET",
            url: _url + "?id_department=" + valueDepartment,
            success: function (data, textStatus, jQxhr) {
                $.each(data, function (key, value) {
                    _options += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#selectsection').html(_options);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else {
        $('#selectsection').html(_options);
    }
}

$('#searchEmp').click(function() {
    var selectworking = $('#selectworking').val();
    var selectdepartment = $('#selectdepartment').val();
    var selectsection = $('#selectsection').val();
    var nameEmp = $('#nameEmp').val();
    var lastNameEmp = $('#lastNameEmp').val();
    var nickName = $('#nickName').val();
    var personal_begin1 = $('input[name="personal_begin1"]:checked').val();//$('#personal_begin1').val();
    var personal_begin2 = $('input[name="personal_begin2"]:checked').val();//$('#personal_begin2').val();
    var Personal_daily = $('input[name="Personal_daily"]:checked').val();//$('#Personal_daily').val();
    var personal_begin3 = $('input[name="personal_begin3"]:checked').val();//$('#personal_begin3').val();

    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();

    if(personal_begin1 == undefined){
        personal_begin1='';
    }else{
        personal_begin1 = personal_begin1;
    }

    if(personal_begin2 == undefined){
        personal_begin2 = '';
    }else{
        personal_begin2 = personal_begin2;
    }

    if(personal_begin3 == undefined){
        personal_begin3 = '';
    }else{
        personal_begin3 = personal_begin3;
    }

    if(Personal_daily == undefined){
        Personal_daily = '';
    }else {
        Personal_daily = Personal_daily;
    }

    var postData = {
        'selectworking':selectworking,
        'selectdepartment':selectdepartment,
        'selectsection':selectsection,
        'nameEmp':nameEmp,
        'lastNameEmp':lastNameEmp,
        'nickName':nickName,
        'personal_begin1':personal_begin1,
        'personal_begin2':personal_begin2,
        'Personal_daily':Personal_daily,
        'personal_begin3':personal_begin3,
        'start_date' : start_date,
        'end_date' : end_date,
    }

    var tbhtml = "";
    $('#tbticker').empty();

    var imagespass = "";
    var url = '../../upload/personal/';
    $.ajax({
        method: "post",
        url: 'searchempdata',
        data:postData,
        success: function (data, textStatus, jQxhr) {
            //console.log(data);

            var counter =0;
            $.each(data, function(key, value) {
                if(data[key].Prosonnal_Being == "1"){
                    imagespass = "userpass.png";
                }else if(data[key].Prosonnal_Being == "2"){
                    imagespass = "usertest.png";
                }else if(data[key].Prosonnal_Being == "3"){
                    imagespass = "usermoveout.png";
                }else if(data[key].Personal_daily == "1"){
                    imagespass = "userdaily.png";
                }
                //console.log(imagespass);

                var userIMG = '';
                var img = '&nbsp;';
                if(data[key].Pictures_HyperL !='' && data[key].Pictures_HyperL !='null' && data[key].Pictures_HyperL != null)  {
                    userIMG = url+data[key].Pictures_HyperL;
                    img = '<img class="tooltip-img" src="'+userIMG+'" style="cursor: pointer;" width="30" height="30">';
                }
                else {
                    userIMG = url+'no-photo.png';
                    img = '<img src="'+userIMG+'" width="30" height="30">';
                }

                var statusName = undefined;
                if(data[key].Prosonnal_Being=="1") {
                    statusName = 'ผ่านงาน';
                }
                if(data[key].Prosonnal_Being=="2") {
                    statusName = 'ทดลองงาน';
                }
                if(data[key].Prosonnal_Being=="3") {
                    statusName = 'ลาออก';
                }
                if(data[key].Personal_daily=="1") {
                    statusName = 'พนักงานรายวัน';
                }

                tbhtml += '<tr style="font-size: 12px;">';
                tbhtml += '<td>'+img+'</td>';
                tbhtml += '<td>'+data[key].Code+'</td>';
                tbhtml += '<td><a href="../personal/viewempform?dataNo='+data[key].DataNo+'">'+data[key].Fullname+'</a></td>';
                tbhtml += '<td>'+data[key].Position+'</td>';
                tbhtml += '<td>'+data[key].working_companynamem+'</td>';
                tbhtml += '<td>'+data[key].departmentname+'</td>';
                tbhtml += '<td>'+data[key].sectionname+'</td>';
                tbhtml += '<td>'+showDateFromMySQL(data[key].Start_date)+'</td>';
                tbhtml += '<td>'+showDateFromMySQL(data[key].End_date)+'</td>';
                tbhtml += '<td>'+'<img src ="../../images/global/'+imagespass+'" alt="'+statusName+'" title="'+statusName+'" width="24px" higth="24px">'+'</td>';

               // tbhtml += '<td> <a href="../hr/personal/viewempform?dataNo='+data[key].DataNo+'"<img src ="../../images/global/usertest.png" width="50px" higth="50px"></a></td>';
                //tbhtml += '<td align="center"><a href="../personal/viewempform?dataNo='+data[key].DataNo+'">'+'<img src ="../../images/global/view.png" width="25px" higth="25px">'+'</a></td>';
                tbhtml += '</tr>';
                counter++;
            });
            $('#tbticker').append(tbhtml);
            $('#btn_info').html('<button class="btn btn-info">ผลการค้นหาทั้งหมด '+counter+' รายการ</button>');

            $('.tooltip-img').imageTooltip();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });



});

