$(document).ready(function() {
   
    //console.log($('#emp_name').html());
    

    $("#emp_name").select2({
        ajax: {
            url: "searchemp",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    //page: params.page
                };
            },
            processResults: function (data, params) {

                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.text,
                            name: item.text,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        },
        minimumInputLength: 2,
        placeholder: "  พิมพ์ชื่อ หรือ นามสกุล",
    });

    //dropdown 
    var objFullComp = $.parseJSON($('#fullcompanyinfo').val());
    runAbleDropdownCompany(objFullComp);

    $("#emp_name").show();

});

function runAbleDropdownCompany(objFullComp){

    
    var objCompanys = [];

    objCompanys.push({id: 'null', text:  'เลือก' });
    $.each(objFullComp, function(k , v){

        objCompanys.push({id: v.info.id, text:  v.info.name });
    });

    var selCompany = $("#company").select2({placeholder: "  เลือกบริษัท",data:objCompanys});
    var selDepartment = $("#department").select2({placeholder: "  เลือกแผนก"});
    var selSection = $("#section").select2({placeholder: "  เลือกฝ่าย"});

    $("#department").prop("disabled", true);
    $("#section").prop("disabled", true);

 
    selCompany.on("change", function (e) { 
        

        $("#department").prop("disabled", false);
        $("#department").select2().empty();
        var setData = (objFullComp[$(this).val()] != undefined) ? objFullComp[$(this).val()]['departments']:[];
        $("#department").select2({
            data  : paseDepartmentData(setData)
        });

        $("#section").select2().empty();
        $("#section").prop("disabled", true);
    });

    selDepartment.on("change", function (e) { 

        
        var companyNow = $("#company").val();
        
        $("#section").prop("disabled", false);
        $("#section").select2().empty();
        
        var setData = (objFullComp[companyNow]['departments'][$(this).val()] != undefined) ? objFullComp[companyNow]['departments'][$(this).val()]['sections']:[];
        $("#section").select2({
            data  : paseDepartmentData(setData)
        });
    });

}

function paseDepartmentData(mainObj){

    var out = [];

    out.push({id: 'null',text:'เลือก'});
    
    $.each(mainObj, function(k, v){

        out.push({id: v.id,text:v.name});
    });

    return out;

}

function empCardSearch(){

    // var objForm = $('#empCardForm').serializeArrayAnything();
    // console.log(objForm);
    var objForm = {};

    objForm.company     = $('#company').val();
    objForm.department  = $('#department').val();
    objForm.section     = $('#section').val();

    objForm.work_start_begin    = $('#work_start_begin').val();
    objForm.work_start_end      = $('#work_start_end').val();

    objForm.emp_code    = $('#emp_code').val();
    objForm.emp_name    = $("#emp_name").select2("val");


    //console.log(objForm);
    $.post('searchempcard',{

        info:JSON.stringify(objForm, null, 2)

    },function(res){

        //console.log(res);
        //var rObj = $.parseJSON(res);

        $('#empcard_img_print').html(res);
        console.log(res);
        $('#empcardDownloadPng').attr('disabled',false);
      
    });

}
function downloadEmpImagezip(){



    $.ajax({
        url: "zipping",
        type: 'GET',
        success: (function (data) {
            window.location.href = '../upload/zipimgcard/';
            console.log(data);

        })
    });



}

function downloadEmpImageCard(){

    var node = document.getElementById ('empcard_img_print');

    domtoimage.toBlob(node).then(function (blob) {

        console.log(blob);
        window.saveAs(blob,'my-node.png');
    }).catch(function (error) {

        console.error('oops, something went wrong!', error);
    });




}

function downloadEmpImageCardPDF(){

    var objForm = {};

    objForm.company     = $('#company').val();
    objForm.department  = $('#department').val();
    objForm.section     = $('#section').val();

    objForm.work_start_begin    = $('#work_start_begin').val();
    objForm.work_start_end      = $('#work_start_end').val();

    objForm.emp_code    = $('#emp_code').val();
    objForm.emp_name    = $("#emp_name").select2("val");

  
    window.open('printpdfempcard?info='+JSON.stringify(objForm, null, 2), "MsgWindow", "width=200,height=100");
    
    

}





function lodeimg () {


    for (var i = 1;  i <=  $('.imglodess').length;   i++){
    var node = document.getElementById('idlodeF'+i);

    domtoimage.toBlob(node).then(function (blob) {

        console.log(blob);
        window.saveAs(blob,'my-nodeF'+i+'.png');



    }).catch(function (error) {

        console.error('oops, something went wrong!', error);
    });


        var node1 = document.getElementById('idlodeB'+i);


        domtoimage.toBlob(node1).then(function (blob) {

            console.log(blob);
            window.saveAs(blob,'my-node'+i+'.png');



        }).catch(function (error) {

            console.error('oops, something went wrong!', error);
        });



    }
}