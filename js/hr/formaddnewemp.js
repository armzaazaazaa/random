var tChild;
var mode;
var pass = true;
var gVarDataNo;
var gVarIDCard;
var gVarAgeOlder = 60;  //อายุพ่อแม่ ที่จะขอลดหย่อนภาษี
var gVarFatherHaveTax = false;
var gVarMotherHaveTax = false;

var gVarArrayEmposition;

$(document).ready(function() {

    gVarArrayEmposition=[];
    //form mode ==> add/edit
    mode = $('#mode').prop('title');
    gVarDataNo = $('#dataNo').prop('title');
    gVarIDCard = $('#IdCard').prop('title');


    //check login duplicate
    $('#nameEmpLogin').on('blur',function () {
        var _u = $(this).val();
        //var _dataNo = $('#dataNo').prop('title');
        if(_u.length < 3) {
            pass = false;
            alert('ชื่อล็อกอินให้ยาวกว่า 3 ตัวอักษร');
            return false;
        }
        else {
            pass = checkUserNameDuplicate(_u, gVarDataNo);
        }
    });


    /*** DatePicker  บิดา/มารดาลดหย่อนภาษี**/
    $("#father_birthday").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
        endDate: '+0d'
    }).on('changeDate', function(ev) {
        var age = calFatMotAge(this, '#father_birthday_day');
        if(gVarFatherHaveTax==true && age < gVarAgeOlder) {
            alert('อายุบิดาผู้ลดหย่อนภาษีไม่ถึงเกณฑ์');
            $('#father_birthday_day').val('');
            $(this).val('');
        }else {
            $('#father_birthday_day').val(age);
        }
    });

    $("#mother_birthday").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
        endDate: '+0d'
    }).on('changeDate', function(ev) {
        var age = calFatMotAge(this, '#mother_birthday_day');
        if(gVarMotherHaveTax==true && age < gVarAgeOlder) {
            alert('อายุมารดาผู้ลดหย่อนภาษีไม่ถึงเกณฑ์');
            $('#mother_birthday_day').val('');
            $(this).val('');
        }else {
            $('#mother_birthday_day').val(age);
        }
    });



    $('#otherBeNameEmp').hide();

    var id_card_ref = $('#id_card_ref').val();
    var emp_id_ref = $('#emp_id_ref').val();


    
    /******************************************************
    *   Binding ADDRESS TAB
    *   
    *******************************************************/
    //checkbox copy
    $('#personal_card_addr .isCheckCopy').on('click', function () {

       disableFormAddr(this,'#home_addr');
    });

    // $('#contact_addr .isCheckCopy').on('click', function () {

    //    disableFormAddr(this,'#personal_card_addr');
    // });
    
    $('#contact_addr #copy_addr1').on('click', function () {

       disableFormAddrRadio(this,'#home_addr');
    });
    $('#contact_addr #copy_addr2').on('click', function () {

       disableFormAddrRadio(this,'#personal_card_addr');
    });

     //textbox onchange copy
    $('#home_addr input').on('change',function(){

        biningTag(this, ['#personal_card_addr','#contact_addr']);

    });

    $('#personal_card_addr input').on('change',function(){

        biningTag(this, ['#contact_addr']);

    });

    //input mask
    $('#Tel_Num').inputmask("999-999999");

    $('#Mobile_Num, #father_phone, #mother_phone, #relative_phone, #spouse_phone').inputmask("999-9999999");

    //$('.ADDR_POSTCODE').inputmask("99999");
    

    //--
    //
    /******************************************************
    *   Binding family TAB
    *   
    *******************************************************/

    $("input:radio[name=father_tax_status]").click(function() {
        var val = parseInt($(this).val());
        if(val==1) {
            gVarFatherHaveTax = true;
            $('#father_birthday').val('');
            $('#father_birthday_day').val('');
            validAgeOlderTax('father');
        }else {
            gVarFatherHaveTax = false;
        }
    });

    $("input:radio[name=mother_tax_status]").click(function() {
        var val = parseInt($(this).val());
        if(val==1) {
            $('#mother_birthday').val('');
            $('#mother_birthday_day').val('');
            gVarMotherHaveTax = true;
            validAgeOlderTax('mother');
        }else {
            gVarMotherHaveTax = false;
        }
    });


    //IF has children
    $('#btnAddChildren').hide();
    $("input:radio[name=children_status]").click(function() {
        var val = $(this).val();
        if(val=='มี') {
            $('#btnAddChildren').show();
        }else {
            $('#btnAddChildren').hide();
        }
    });


    //relative_status
    $("input:radio[name=relative_status]").click(function() {
        var val = $(this).val();
        var s = ''; //sex
        var p = ''; //prefix
        var n = ''; //name
        var r =''; //surname
        var t =''; //tel

        if(val=='บิดา') {
            s = 'ชาย';
            $( "#relative_sexe_1" ).trigger( "click" );
            p = $('#father_be').val();
            n = $('#father_name').val();
            r = $('#father_surname').val();
            t = $('#father_phone').val();
            coptyToRelative(s,p,n,r,t);
        }
        else if(val=='มารดา'){
            s = 'หญิง';
            $( "#relative_sexe_2" ).trigger( "click" );
            p = $('#mother_be').val();
            n = $('#mother_name').val();
            r = $('#mother_surname').val();
            t = $('#mother_phone').val();
            coptyToRelative(s,p,n,r,t);
        }
        else if(val=='คู่สมรส')
        {
            s = $("input[name='spouse_sex']:checked").val();
            if(s=='นาย') {
                $( "#relative_sexe_1" ).trigger( "click" );
            }

            if(s=='หญิง') {
                $( "#relative_sexe_2" ).trigger( "click" );
            }


            p = $('#spouse_be').val();
            n = $('#spouse_name').val();
            r = $('#spouse_surname').val();
            t = $('#spouse_phone').val();
            coptyToRelative(s,p,n,r,t);
        }
        //else {}
    });


    //spouse_status
    var vstatus;
    $("#spouse_status").on('change', function () {
        console.log($(this).val());
        vstatus = $(this).val();
        if(vstatus=='โสด' || vstatus=='หย่า' || vstatus=='คู่สมรสเสียชีวิต') {
            //frmMarrystatus
            disableFormMarrystatus('frmMarrystatus');
        }
        else {
            enableFormMarrystatus('frmMarrystatus');
        }

        console.log(vstatus);
        $(this).prop('disabled',false);
        $("#spouse_status option[value='"+vstatus+"']").attr("selected", "selected");
    });


    //$('#father_birthday').change();
    //$('#mother_birthday').change();
    /*
    var inpFB = document.getElementById('father_birthday');
    calDateToDay(inpFB, '#father_birthday_day');
    var inpMB = document.getElementById('mother_birthday');
    calDateToDay(inpMB, '#mother_birthday_day');
    */

    var inpSB = document.getElementById('spouse_birthday');
    calDateToDay(inpSB, '#spouse_birthday_day');

    var viewOnly = $('#viewOnly').val();
    var childMaHtml = function(obj){
        var out = '';

        out += '<a href="#" class="btn btn-info btn-sm" onclick="showModalChildren(this)" >';
        out += '  <span class="glyphicon glyphicon-edit"></span> แก้ไข';
        out += '</a>';
        out += '<a href="#" class="btn btn-danger btn-sm" onclick="deleteChildren(this)" style="margin-left:5px">';
        out += '  <span class="glyphicon glyphicon-trash"></span> ลบ ';
        out += '</a>';

       
        //console.log(viewOnly);
        if(viewOnly == 1){
            out = "";
        }
        
        return out;
    };

    var storeObj = function(data,row){
        var out = "";

        var text = row['prefix']+" "+row['name']+" "+row['surname'];

        out += '<span class="child-store" data-obj=\''+JSON.stringify(row, null, 2)+'\'>'+text+'</span>';

        return out;
    };

    tChild = $('#children_tbx').DataTable( {

        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return storeObj(data, row);
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                    return childMaHtml(row);
                },
                "targets": 7
            }
        ],
        "paging":   false,
        "ordering": false,
        "info":     false,
        "ajax": {
            "url": "getchildren",
            "data": {
                "id_card": id_card_ref,
                "emp_id": emp_id_ref
            }
        },
        "columns": [
            { "data": null },
            { "data": "name" },
            { "data": "sex" },
            { "data": "school" },
            { "data": "grade" },
            { "data": "birthday" },
            { "data": "age" },
            { "data": null }
        ],
        "order": [[ 1, 'asc' ]],
        "drawCallback": function(settings) {
            //console.log(settings.json);
            calChildrenInfo(); 
        }
    });

    tChild.on( 'search.dt', function () {
        tChild.column(0, {search:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    $('#children_tbx_filter').hide();

    //mask 
    $('#father_idcard').inputmask("9-9999-99999-99-9");
    $('#mother_idcard').inputmask("9-9999-99999-99-9");
    $('#spouse_idcard').inputmask("9-9999-99999-99-9");
    $('#child_grade').inputmask("decimal");

    //--

    /******************************************************
    *   education TAB
    *   
    *******************************************************/
    var maEduHtml = function(obj){
        var out = '';

        out += '<a href="#" class="btn btn-info btn-sm" onclick="showModalEducation(this)" >';
        out += '  <span class="glyphicon glyphicon-edit"></span> แก้ไข';
        out += '</a>';
        out += '<a href="#" class="btn btn-danger btn-sm" onclick="deleteEdu(this)" style="margin-left:5px">';
        out += '  <span class="glyphicon glyphicon-trash"></span> ลบ ';
        out += '</a>';

       
        //console.log(viewOnly);
        if(viewOnly == 1){
            out = "";
        }
        
        return out;
    };

    var storeEduObj = function(data,row){
        var out = "";

        var text = data;

        out += '<span class="child-store" data-obj=\''+JSON.stringify(row, null, 2)+'\'>'+text+'</span>';

        return out;
    };

    var tEdu = $('#emp_education_tb').DataTable( {

        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return storeEduObj(data, row);
                },
                "targets": 0
            },
            {
                "render": function ( data, type, row ) {
                    return maEduHtml(row);
                },
                "targets": 5
            }
        ],
        "paging":   false,
        "ordering": false,
        "searching":false,
        "info":     false,
        "ajax": {
            "url": "geteducation",
            "data": {
                "id_card": id_card_ref,
                "emp_id": emp_id_ref
            }
        },
        "columns": [
            { "data": "edu_level" },
            { "data": "edu_school" },
            { "data": "edu_major" },
            { "data": "edu_finish" },
            { "data": "edu_GPA" },
            { "data": null }
        ],
        "order": [[ 1, 'asc' ]]
    }).draw();

    //mask 
    $('#edu_GPA').inputmask('decimal');



    /******************************************************
     *   Emp Position TAB
     *
     *******************************************************/


    $('#promp_pay_no').inputmask("9-9999-99999-99-9");
    $('#promtpay_type').change(function() {
        $('#promp_pay_no').val('');
        var v = $(this).val();
        if(v==="1") {
            $('#promp_pay_no').inputmask("099-999-9999");
        }else {
            $('#promp_pay_no').inputmask("9-9999-99999-99-9");
        }
    });


    //$('#bondsman_year').inputmask("decimal");

    var maEmpPositionHtml = function(obj){
        var out = '';
        out += '<a href="#" class="btn btn-info btn-sm" onclick="showModalEmpPosition(this)" >';
        out += '  <span class="glyphicon glyphicon-edit"></span> แก้ไข';
        out += '</a>';
        out += '<a href="#" class="btn btn-danger btn-sm" onclick="deleteEmpPosition(this)" style="margin-left:5px">';
        out += '  <span class="glyphicon glyphicon-trash"></span> ลบ ';
        out += '</a>';

        //console.log(viewOnly);
        if(viewOnly == 1){
            out = "";
        }
        return out;
    };


    var storeEmpPositionObj = function(data,row){
        var out = "";
        var text = data;
        out += '<span class="position-store" data-obj=\''+JSON.stringify(row, null, 2)+'\'>'+text+'</span>';
        return out;
    };


    var FormatSSO = function(data,row){

        var sel = (data=="1") ? 'checked' : '';
        var out = '';
        out += '<input type="checkbox" name="SetSSO" id="SetSSO" value="1" '+sel+'>';
        return out;
    };


    var FormatMainPoisition = function(data,row){
        var sel = (data=="1") ? 'checked' : '';
        var out = '';
        out += '<input type="radio" name="SetMainPosition" id="SetMainPosition" value="1" '+sel+'>';
        return out;
    };


    var FormatPaidMoney = function(data,row){
        var sel = (data=="1") ? 'checked' : '';
        var out = '';
        out += '<input type="checkbox" name="SetPaidMoney" id="SetPaidMoney" value="1" '+sel+'>';
        return out;
    };


    var tEmpPos = $('#emp_position_tb').DataTable( {

        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return storeEmpPositionObj(data, row);
                },
                "targets": 0
            },
            {
                "render": function ( data, type, row ) {
                    return FormatSSO(data, row);
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                    return FormatMainPoisition(data, row);
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return FormatPaidMoney(data, row);
                },
                "targets": 3
            },
            {
                "render": function ( data, type, row ) {
                    return maEmpPositionHtml(row);
                },
                "targets": 14
            },
            {
                "visible": false,
                "targets": [15,16,17,18,19,20,21,22,23]
            }
        ],
        "paging":   false,
        "ordering": false,
        "searching":false,
        "info":     false,
        /*"ajax": {
            "url": "getposition",
            "data": {
                "id_card": id_card_ref,
                "emp_id": emp_id_ref
            }
        },*/
        "columns": [
            { "data": "counter" },
            { "data": "isPaidSSO" },
            { "data": "isMainPosition" },
            { "data": "isPaidSalary" },
            { "data": "companyName" },
            { "data": "positionCode" },
            { "data": "positionName" },
            { "data": "StartEffectDate" },
            { "data": "EndEffectDate" },
            { "data": "salaryChart" },
            { "data": "salaryType" },
            { "data": "salaryStep" },
            { "data": "salaryAmt" },
            { "data": "status" },
            { "data": null },
            { "data": "CompanyID" },
            { "data": "DepartmentID" },
            { "data": "DepartmentName" },
            { "data": "SectionID" },
            { "data": "SectionName" },
            { "data": "StepAdded" },
            { "data": "WhatChangeID" },
            { "data": "WhatChangeName" },
            { "data": "IDRefOrgChart" }
        ],
        "order": [[ 1, 'asc' ]]
    }).draw();





    //--
    //--
    /******************************************************
    *   tax TAB
    *   
    *******************************************************/
    //mask
    $('#tab_4 input[type="text"]').inputmask('decimal');
    //--
    
    /******************************************************
    *  ganeral info TAB
    *   
    *******************************************************/
    $("#fileEmp").on('change', function () {

        if (typeof (FileReader) != "undefined") {

            var image_holder = $("#img-holder");
            image_holder.empty();

            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image",
                    "style":"height:160px",
                }).appendTo(image_holder);

            }   
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }
    });

    //แผนที่
    $("#Pic_map").on('change', function () {

        if (typeof (FileReader) != "undefined") {

            var image_holder = $("#img-holder-map");
            image_holder.empty();

            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image",
                    "style":"height:160px",
                }).appendTo(image_holder);

            }   
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }
    });

    //mask 
    $('#Weight').inputmask('decimal');
    $('#Height').inputmask('decimal');
    //$('#ID_Card').inputmask("9-9999-99999-99-9");
    var blockIdcard = $('#ID_Card').closest('.form-group');
    $('#ID_Card').inputmask("9-9999-99999-99-9",{
        "oncomplete": function(){ $(blockIdcard).removeClass('emp-has-error'); },
        "onincomplete": function(){ $(blockIdcard).addClass('emp-has-error'); },
        "oncleared": function(){ $(blockIdcard).addClass('emp-has-error'); }
    });

    $("#birthdayEmp").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
    $("#DateOfIssuePassport").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
    $("#DateOfExpiryPassport").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
     $("#DateOfIssueIdcrad").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
     $("#DateOfExpiryIdcrad").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
     $("#father_birthday").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
     $("#mother_birthday").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });

    $("#spouse_birthday").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
    $("#child_birthday").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });

    $("#tab_6 #Start_date").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });

     $("#tab_6 #End_date").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });

    $("#tab_6 #Probation_Date").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });


    //{ "oncomplete": function(){ alert('inputmask complete'); } }

    //--


    //binding EVENT for select2 find TUMBON, AMPHUR, PROVINCE
    //bindingTumbonSelect2('home_addr');
    //bindingTumbonSelect2('personal_card_addr');
    //bindingTumbonSelect2('contact_addr');


    //check valid IDcard, EMP, EMP_father, EMP_mother, EMP_spous
    $('#ID_Card').on('blur',function () {
        validIDcard($(this).val(),'ID_Card');
    });

    /* Disabled/Removed for Check Duplicate ID card
    $('#father_idcard').on('blur',function () {
        validIDcard($(this).val(),'father_idcard');
    });

    $('#mother_idcard').on('blur',function () {
        validIDcard($(this).val(),'mother_idcard');
    });

    $('#spouse_idcard').on('blur',function () {
        validIDcard($(this).val(),'spouse_idcard');
    });
*/


    /** Close popover when click out side container **/
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });


    /** Popover tumbon home address search **/
    $("#btnTHomeAddr").popover({
        content: function() {
            var sel2 = '<select class="home_addr-select2-ajax"  style="width: 100% !important;"></select>';
            return sel2; //$('#popover-content').html();
        }
    });

    $('#btnTHomeAddr').click(function () {
        bindingTumbonSelect2('home_addr');
    });


    /** Popover tumbon IDcard personal address search **/
    $("#btnTIDcardAddr").popover({
        content: function() {
            var sel2 = '<select class="personal_card_addr-select2-ajax" style="width: 100% !important;"></select>';
            return sel2; //$('#popover-content').html();
        }
    });

    $('#btnTIDcardAddr').click(function () {
        bindingTumbonSelect2('personal_card_addr');
    });


    /** Popover tumbon Contact address search **/
    $("#btnTContactAddr").popover({
        content: function() {
            var sel2 = '<select class="contact_addr-select2-ajax" style="width: 100% !important;"></select>';
            return sel2; //$('#popover-content').html();
        }
    });

    $('#btnTContactAddr').click(function () {
        bindingTumbonSelect2('contact_addr');
    });


    $('#father_insurance, #mother_insurance, #spouse_insurance').inputmask("decimal"); //mask decimal father, mother and spouse insurance
    TransferBank(); //Default payment transfer bank



    $('#edu_school').css('width','200px');
    $(".select2").select2();

    LoadEmpPosition();

});
//End Document Ready


function LoadEmpPosition()
{
    if((mode=='edit'  || mode=='view') && gVarDataNo !='') {
        var objVar = {};
        objVar.dataNo = gVarDataNo;
        objVar.idCard = gVarIDCard;
        objVar._csrf = $('meta[name="csrf-token"]').attr("content");

        $.ajax({
            url: 'loadempposition',
            data: objVar,
            type: 'GET',
            success: function(data, textStatus, jQxhr) {
                var json_data = $.parseJSON(data);
                $.each(json_data,function (index,obj) {
                    gVarArrayEmposition.push(obj);
                });
                showEmpPositionList();
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}


function Cash()
{
    //$('#Salary_BankNo').val('');
    $('#Salary_BankNo').val('');
    $("#Salary_Bank").prop("selectedIndex", 0);
    $('#Salary_Bank').prop('disabled',true);
    $('#Salary_BankNo').prop('disabled',true);
    $('#promtpay_type').prop('disabled',true);
    $('#promp_pay_no').prop('disabled',true);

}

function TransferBank()
{
  /*  document.getElementById('Salary_BankNo').value="";*/
    //$('#Salary_BankNo').val('');
    //$('#promp_pay_no').val('');

    $('#Salary_Bank').prop('disabled',false);
    $('#Salary_BankNo').prop('disabled',false);
    $('#promtpay_type').prop('disabled',true);
    $('#promp_pay_no').prop('disabled',true);
    $('#Salary_BankNo').inputmask("999-9-99999-9");
    /*document.getElementById('Salary_BankNo').value="";*/



   /* console.log(document.getElementById('Salary_BankNo').value);*/
}

function TransferPromptPay()
{
    //$('#promp_pay_no').val('');
    $('#Salary_BankNo').val('');
    $("#Salary_Bank").prop("selectedIndex", 0);
    $('#Salary_Bank').prop('disabled',true);
    $('#Salary_BankNo').prop('disabled',true);
    $('#promtpay_type').prop('disabled',false);
    $('#promp_pay_no').prop('disabled',false);
}


function checkValidSavePosition() {

    var fa_sso = []; //check for sso
    var fb_mainpos = [];  //check for main position
    var fc_paidmoney = [];  //check for paid money
    $("#SetSSO").each(function () {
        var a = $(this).is(':checked');
        fa_sso.push(a); //collect value of item sso
    });

    $("#SetMainPosition").each(function () {
        var b = $(this).is(':checked');
        fb_mainpos.push(b); //collect value of item main position
    });

    $("#SetPaidMoney").each(function () {
        var c = $(this).is(':checked');
        fc_paidmoney.push(c); //collect value of item paid money
    });


    var c = fa_sso.length;
    var pass = true;
    for(var i=0;i<c;i++) {  //Loop thought array fa, fb
        if(fa_sso[i]==false || fb_mainpos[i]==false || fc_paidmoney[i]==false) {  //check if approved and unapproved not checked
            pass = false;
            break;
        }
    }

    if(!pass) {
        showMessageBox('พบปัญหา!! ตำแหน่งเงินเดือนบางรายการไม่ได้กำหนด');
        return false;
    }
    else {
        return true;
    }
}



function coptyToRelative(s,p,n,r,t)
{
    //console.log(s);
    //console.log(p);
    $("#relative_be option[value='"+p+"']").attr("selected", "selected");
    $('#relative_name').val(n);
    $('#relative_surname').val(r);
    $('#relative_phone').val(t);
}


function disableFormUseTax(frm) {
    $("#"+frm)[0].reset();
    $("#"+frm+" :input").prop("disabled", true);

    $("#"+frm+" :radio").prop("disabled", false);
}

function enableFormUseTax(frm) {
    $("#"+frm+" :input").prop("disabled", false);

    $("#"+frm+" #father_birthday").prop("readonly", true);
    $("#"+frm+" #mother_birthday").prop("readonly", true);
}

function disableFormMarrystatus(frm) {
    //$("#"+frm)[0].reset();
    $("#"+frm+" :input").prop("disabled", true);
    //$("#"+frm+" :radio").prop("disabled", true);
}

function enableFormMarrystatus(frm) {
    $("#"+frm+" :input").prop("disabled", false);
    //$("#"+frm+" :radio").prop("disabled", false);

    $("#"+frm+" #spouse_birthday").prop("readonly", true);
    $("#"+frm+" #spouse_birthday_day").prop("readonly", true);
}


/** function ตรวจสอบ ว่ามีการใช้ลดหย่อนภาษีหรือไม่ **/
function validAgeOlderTax(fm,age) {
    if(fm=='father') {

    }

    if(fm=='mother') {

    }

}



/** function ตรวจสอบ ว่าเลขบัตรประชาชนซ้ำหรือไม่ **/
function validIDcard(idCard,who)
{
    var objVar = {};
    objVar.idCard = idCard;
    objVar.dataNo = gVarDataNo;
    objVar.who = who;
    objVar._csrf = $('meta[name="csrf-token"]').attr("content");

    $.ajax({
        url: 'valididcard',
        data: objVar,
        type: 'POST',
        success: function(data, textStatus, jQxhr) {
            if(data == "0") {
                pass = true;
            }
            else  {
                $('#'+who).val('');
                pass = false;
                bootbox.alert({
                    //size: 'small',
                    message: "<h4 class=\"btalert\">"+data+"</h4>",
                    callback: function(){}
                });
            }
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function bindingTumbonSelect2(cssClass) {
    //home_addr <== ฟอร์ม ที่อยู่ตามทะเบียนบ้าน
    //personal_card_addr <==  ฟอร์ม ที่อยู่ตามบัตรประชาชน
    //contact_addr <== ฟอร์ม ที่อยู่ที่ติดต่อได้

    var mainAddr = [ 'home_addr', 'personal_card_addr', 'contact_addr'];


    $('.'+cssClass+'-select2-ajax').select2({
        placeholder: 'ค้นหาตำบล',
        language: "th",
        minimumInputLength: 2,
        ajax: {
            url: 'searchtumbon',
            dataType: 'json',
            delay: 250,
            processResults: function (data) {
                return {
                    results: data
                };
            },
        }
    }).on("select2:select", function (e) {
        var select_val  = $('.'+cssClass+'-select2-ajax :selected').val();
        var select_text  = $('.'+cssClass+'-select2-ajax :selected').text();
        var t = select_text.split('__');
        if(t.length > 0) {

            //ข้อมูลที่อยู่ Tab2
            if($.inArray(cssClass, mainAddr) !== -1) {
                $('div#' + cssClass + ' #ADDR_SUB_DISTRICT').val(t[0]);
                $('div#' + cssClass + ' #ADDR_DISTRICT').val(t[1]);
                $('div#' + cssClass + ' #ADDR_PROVINCE').val(t[2]);
                $('div#' + cssClass + ' #ADDR_POSTCODE').val(t[3]);
            }

            if(cssClass==='bonds_idcardaddr') {
                //ที่อยู่ตามบัตรผู้ค้ำ Tab7
                $('div#' + cssClass + ' #addr_idcard_district').val(t[0]);
                $('div#' + cssClass + ' #addr_idcard_amphur').val(t[1]);
                $('div#' + cssClass + ' #addr_idcard_province').val(t[2]);
                $('div#' + cssClass + ' #addr_idcard_postcode').val(t[3]);
            }

            if(cssClass==='bonds_workaddr') {
                //ที่อยู่ที่ทำงานผู้ค้ำ Tab7
                $('div#' + cssClass + ' #addr_plance_district').val(t[0]);
                $('div#' + cssClass + ' #addr_plance_amphur').val(t[1]);
                $('div#' + cssClass + ' #addr_plance_province').val(t[2]);
                $('div#' + cssClass + ' #addr_plance_postcode').val(t[3]);
            }


        }
        $('.popover').popover('hide');
    });

}




function checkUserNameDuplicate(_u,_dataNo ){
    $.ajax({
        url: 'checkusername',
        data: {u:_u,data_no:_dataNo},
        type: 'POST',
        success: function (data) {
            console.log(data);
            if (parseInt(data) >= 1) {
                pass = false;
                $('#nameEmpLogin').val('');
                bootbox.alert({
                    //size: 'small',
                    message: "<h4 class=\"btalert\">ชื่อล็อกอินซ้ำ</h4>",
                    callback: function(){}
                });
            }else {
                pass = true;
            }
        }
    });
}

function biningTag(actionTag, parent){

    
    var val = $(actionTag).val();
    var clsName = $(actionTag).attr('id');
    var clsFormRef = $(actionTag).closest('.outlet-addr-form');
    var nameFormRef = $(clsFormRef).attr('id');
    //console.log(val);

    //is copy 
    var isChk = $(parent+' .isCheckCopy').is(":checked");
    //--
  
    $.each(parent,function(k, v){

        var isChk = $(v+' .isCheckCopy').is(":checked");
        if(isChk){

            var currInp = $(v).find("."+clsName);

            if(v == '#contact_addr'){
                var nameDirect = $(v+' input[name="copy_addr"]:checked').val();
                
                if(nameFormRef == nameDirect){
                    currInp.val(val);
                    currInp.change();
                }

            }else{

                currInp.val(val);
                currInp.change();

            }
        }
       
    });

}

function __biningTag(actionTag, parent){

    
    var val = $(actionTag).val();
    var clsName = $(actionTag).attr('id');
    //console.log(val);

    //is copy 
    var isChk = $(parent+' .isCheckCopy').is(":checked");
    //--
    if(isChk){
        $.each(parent,function(k, v){

            var currInp = $(v).find("."+clsName);
            currInp.val(val);
            currInp.change();
        });
    } 

}



function toggleCopyAddr(inp){
    var isChk = $(inp).is(':checked');
    var rChk = $(inp).closest('.border-form-add').find('input[name="copy_addr"]:checked'); 
    

    if(isChk){
        if(rChk.size() == 0){
            rChk =  $(inp).closest('.border-form-add').find('input#copy_addr1'); 
        }
        $('.select_copy').show();
    }else{
        $('.select_copy').hide();
    }

    rChk.click();
    
}

function addChildren(btn){

    var trRefOpen = $(btn).data('reftr');
    //console.log(trRefOpen);
    //return false;

    
    var obj = $('#modalAddChild').serializeArrayAnything();
    // console.log(obj);
    // return false;

    //varlidate
    if(obj.child_name == '' && obj.child_surname == ''){
        alert('กรูณากรอกชื่อ และ นามสกุล');
        return false;
    }
    //--

    var addObj = {};
    $.each(obj, function(k,v){
        
        if(k != '_csrf'){
            var eKey = k.replace(/child_/g, "");
            addObj[eKey] = v;
        }
        
    });

    //console.log(addObj);
    var table = $('#children_tbx').DataTable();

   

    if(trRefOpen != undefined && trRefOpen != ''){
        //update
        //console.log('update');
        var d = table.row( trRefOpen ).data();
        //console.log(d);

        $.each(d,function(k,v){
            
            if(addObj[k] != undefined && addObj[k] != ''){
                //console.log(addObj[k]);
                d[k] = addObj[k];
            }
            
        });
        
        table.row( trRefOpen ).data( d ).draw();

    }else{
        //new
        //console.log('new');
        table.row.add(addObj).draw( false );
    }
   // return false;

    
    // table.row.add(addObj).draw( false );

    
    // table.rows().every( function () {
    //     var d = this.data();
    
    //     console.log(d);
    //     //d.counter++; // update data source for the row
    
    //     this.invalidate(); // invalidate the data DataTables has cached for this row
    // } );
    
    // // Draw once all updates are done
    // table.draw();
   
    calChildrenInfo();
    $('#modalAddChild').modal('hide');


}

function deleteChildren(btn){

    bootbox.confirm("ต้องการที่จะลบ ข้อมูลบุตร?", function(result) {
  
        if(result){
            var tr = $(btn).closest('tr');
    
            var table = $('#children_tbx').DataTable();
            var d = table.row( tr ).data();

            if(d.id != undefined && d.id != ""){
                //from db
                var objDel = $('#children_tbx').data('delchild');
                objDel.push(d.id);
                $('#children_tbx').data('delchild',objDel);

            }else{
                //from clien
            }

            table.row( tr ).remove().draw();
        }
       
    });


   

}

function showModalChildren(btn, addNew){

    $('#modalAddChild').modal('show');

    var obj = {};

    if(addNew == "new"){
        $('#btnSaveChild').data('reftr','');
    }else{
        var tr = $(btn).closest('tr');
        $('#btnSaveChild').data('reftr',tr);
        obj = $( tr).find('.child-store').data('obj');
        //console.log(obj);
    }
    var optionFix = '';
    $('#modalAddChild').find('input,select').each(function(){
        //console.log($(this).attr('name'));
        var nameRef = $(this).attr('name');
        if(nameRef != undefined && nameRef != '_csrf' && nameRef != 'child_sex'){

             nameRef = nameRef.replace(/child_/g, "");
            var setVal = obj[nameRef];
            $(this).val( setVal );
            if(nameRef == 'prefix'){
                optionFix = setVal;
            }
        }
        
       
    });

    
    var afterSelSex =  function(typeGender,targetDiv,optionVal){

 
        $.ajax({
            method: "GET",
            url: "seachbenameth?typeGender=" + typeGender,
            success: (function(data) {
                //console.log(data);
                var listdata = '';
                $.each(data, function(key, value) {
                    listdata += "<option value='" + data[key].title_name_th + "'>" + data[key].title_name_th + "</option>";
                });
                $(targetDiv).html(listdata);
                $('#child_prefix').val(optionVal);
            })
        });
    }

    //radio
    $('#modalAddChild input[name="child_sex"]').each(function(){
        var v = $(this).val();
        if(v == obj['sex']){
            //console.log(v);
            var vType = (v == 'ชาย') ? 1:2;
            $(this).attr('checked',true);
            //console.log(optionFix);
            $(this).click(afterSelSex(vType,'#child_prefix',optionFix));
        }
    });
    //--


}


/*** function Emp Education Tab **/
function showModalEducation(btn, addNew){


    $('#modalAddEducate').modal('show');

    var obj = {};
    $('#edu_school').select2().css('width','400px'); //set with for select2

    if(addNew == "new"){
        $('#btnSaveEducation').data('reftr','');
        $('#edu_school').select2().val([]).trigger("change");
    }else{
        var tr = $(btn).closest('tr');
        $('#btnSaveEducation').data('reftr',tr);
        obj = $( tr).find('.child-store').data('obj');
        //console.log(obj);
        var arrStaff = [];
        arrStaff.push(obj.edu_school);
        $('#edu_school').select2().val(arrStaff).trigger("change");
    }

    $('#modalAddEducate').find('input,select').each(function(){
        //console.log($(this).attr('name'));
        var nameRef = $(this).attr('name');
        if(nameRef != undefined && nameRef != '_csrf' ){

            // nameRef = nameRef.replace(/child_/g, "");
            var setVal = obj[nameRef];
            $(this).val( setVal );
        }
       
    });

}

function addEducation(btn){

    var trRefOpen = $(btn).data('reftr');

    var obj = $('#modalAddEducate').serializeArrayAnything();

    var addObj = {};
    $.each(obj, function(k,v){
        
        if(k != '_csrf'){
            
            addObj[k] = v;
        }
        
    });

    var table = $('#emp_education_tb').DataTable();

    if(trRefOpen != undefined && trRefOpen != ''){
        //update
        //console.log('update');
        var d = table.row( trRefOpen ).data();
        //console.log(d);

        $.each(d,function(k,v){
            
            if(addObj[k] != undefined && addObj[k] != ''){
                //console.log(addObj[k]);
                d[k] = addObj[k];
            }
            
        });
        
        table.row( trRefOpen ).data( d ).draw();

    }else{
        //new
        //console.log('new');
        table.row.add(addObj).draw( false );
    }
  
    $('#modalAddEducate').modal('hide');


}

function deleteEdu(btn){

    bootbox.confirm("ต้องการที่จะลบ ข้อมูลการศึกษา?", function(result) {
  
        if(result){
            var tr = $(btn).closest('tr');
    
            var table = $('#emp_education_tb').DataTable();
            var d = table.row( tr ).data();

            if(d.id != undefined && d.id != ""){
                //from db
                var objDel = $('#emp_education_tb').data('delchild');
                objDel.push(d.id);
                $('#emp_education_tb').data('delchild',objDel);

            }else{
                //from clien
            }

            table.row( tr ).remove().draw();
        }
       
    });
}


/*** function Emp Position Tab **/
function showModalEmpPosition(btn, addNew){

    $('#start_effectdate, #end_effectdate').datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,

    });


    if(addNew == "new"){
        $('#btnSaveEmpPosition').data('reftr','');

    }
    else {  //mode edit
        /** get data **/
        var tr = $(btn).closest('tr');
        var table = $('#emp_position_tb').DataTable();
        var d = table.row(tr).data();
        console.log(d);
        editEmpPosition(d);
    }
    $('#modalAddEmpPosition').modal('show');

    /*
    var obj = {};

    if(addNew == "new"){
        $('#btnSaveEmpPosition').data('reftr','');
    }else{
        var tr = $(btn).closest('tr');
        $('#btnSaveEducation').data('reftr',tr);
        obj = $( tr).find('.position-store').data('obj');
        //console.log(obj);
    }

    $('#modalAddEmpPosition').find('input,select').each(function(){
        //console.log($(this).attr('name'));
        var nameRef = $(this).attr('name');
        if(nameRef != undefined && nameRef != '_csrf' ){

            // nameRef = nameRef.replace(/child_/g, "");
            var setVal = obj[nameRef];
            $(this).val( setVal );
        }
    });
    */
}

function editEmpPosition(d)
{
   // console.log(d);
    $("#selectworking option[value='"+d.CompanyID+"']").prop("selected", true);
    $("#selectdepartment option[value='"+d.DepartmentID+"']").prop("selected", true);
    $("#selectsection option[value='"+d.SectionID+"']").prop("selected", true);
    $("#selectposition option[value='"+d.positionCode+"']").prop("selected", true);
    $('#start_effectdate').val(d.StartEffectDate);
    $('#end_effectdate').val(d.EndEffectDate);
    $("#selectposition option[value='"+d.salaryChart+"']").prop("selected", true);
    $("#salarysteplevel option[value='"+d.salaryType+"']").prop("selected", true);
    $("#empsalarystep option[value='"+d.salaryStep+"']").prop("selected", true);
    $('#salarystepstartsalary').val(d.salaryAmt);
}

function addEmpPosition(btn){ //ตำแหน่งเงินเดือน


    if($('#selectposition').val() == '' || $('#salarystepstartsalary').val()=='') {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">ระบุข้อมูลไม่ครบ</h4>",
            callback: function() {}
        });
        return false;
    }

    var table = $('#emp_position_tb').DataTable();
    var trRefOpen = $(btn).data('reftr');

    //var objElement = $('#modalAddEmpPosition').serializeArrayAnything();
    //var i=1;

    var pcode = $('#selectposition').val(); // value of position
    if(pcode.indexOf("-") == -1) { //ตรวจสอบความถูกต้อง
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\"> พบข้อมูลตำแหน่งไม่ถูกต้อง </h4>",
            callback: function() {}
        });
        return false;
    }

    var pc = pcode.split("-");
    var position_code;
    var id_ref_orgchart;
    if(pc.length > 0) {
        position_code = pc[0];
        id_ref_orgchart = pc[1];
    }


    var addObj = {};
    addObj.counter = null;
    addObj.isPaidSSO = 1;
    addObj.isMainPosition = 1;
    addObj.isPaidSalary = 1;
    addObj.companyName = $('#selectworking option:selected').html();
    addObj.positionCode = position_code;
    addObj.positionName = $('#selectposition option:selected').html();
    addObj.StartEffectDate = $('#start_effectdate').val();
    addObj.EndEffectDate = $('#end_effectdate').val();
    addObj.salaryChart = $('#salarystepchartname').val();
    addObj.salaryType = $('#salarysteplevel').val();
    addObj.salaryStep = $('#empsalarystep').val();
    addObj.salaryAmt = $('#salarystepstartsalary').val();
    addObj.status = '1';
    addObj.action = 'Delete';
    addObj.CompanyID = $('#selectworking').val();
    addObj.DepartmentID = $('#selectdepartment').val();
    addObj.DepartmentName = $('#selectdepartment option:selected').html();
    addObj.SectionID = $('#selectsection').val();
    addObj.SectionName = $('#selectsection option:selected').html();

    addObj.StepAdded = $('#stapupnew').val();
    addObj.WhatChangeID = $('#selectsalarychangetype').val();
    addObj.WhatChangeName = $('#selectsalarychangetype option:selected').html();
    addObj.IDRefOrgChart = id_ref_orgchart;
    console.log(addObj);




    if(!isPositionDuplicate(addObj)) {
        gVarArrayEmposition.push(addObj);
    }
    else {
        bootbox.alert({
            size: 'small',
            message: "<h4 class=\"btalert\">ตำแหน่งที่เลือกมีอยู่แล้ว</h4>",
            callback: function() {}
        });
        return false;
    }



    showEmpPositionList();
    $('#modalAddEmpPosition').modal('hide');
}

function showEmpPositionList() {
    var table = $('#emp_position_tb').DataTable();
    table.clear().draw();
    var icounter =1;
    $.each(gVarArrayEmposition, function(k,v){
        v.counter = icounter;
        table.row.add(v).draw(false);
        icounter++;
    });
}

function countEmpPosition()
{
    var length=1;
    $.each(gVarArrayEmposition, function(k,v){
        length++;
    });
    return length;
}

function removeObjElement(obj) {
    var PosCode = obj.positionCode;
    var idx;
    $.each(gVarArrayEmposition, function(k,v){
        if(v.positionCode===PosCode) {
            idx = k;
        }
    });
    gVarArrayEmposition.splice(idx, 1);
}

function isPositionDuplicate(obj) {
    var PosCode = obj.positionCode;
    var found = false;
    $.each(gVarArrayEmposition, function(k,v){
        if(v.positionCode===PosCode) {
            found = true;
        }
    });
    return found;
}


function deleteEmpPosition(btn){
    bootbox.confirm("ต้องการที่จะลบ ข้อมูลตำแหน่งเงินเดือน?", function(result) {
        if(result){
            var tr = $(btn).closest('tr');
            var table = $('#emp_position_tb').DataTable();
            var d = table.row( tr ).data();
            removeObjElement(d);
            showEmpPositionList();
        }
    });
}




function hideBename() {
    $('#otherBeNameEmp').hide();
}

function showBename() {
    $('#otherBeNameEmp').show();
}


function selectBirthdayEmp(inp) {
  
    var age;
    try{

       // if(val.value == "") throw "empty";
        //if(isNaN(val)) throw "not a value";
        var refVal = inp.value;
        var conv = refVal.split("/");
        var birth = new Date(conv[2]+"-"+conv[1]+"-"+conv[0]);
        // var check = new Date();
        // var milliDay = 1000 * 60 * 60 * 24;
        // var AgeinDay = (check - birth) / milliDay;
        // var ComputAge = Math.floor(AgeinDay / 365 );
        // var age = ComputAge / 365;

        //console.log(birth);
        if(birth == "Invalid Date") throw "Invalid Date";

        var curr = new Date();
        var diff = curr.getTime() - birth.getTime();
        age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }catch(e){
        //console.log(e);
        age = "";
    }
   

    $('#ageEmp').val(age);
}

function getGenderEmp(val) {
    //alert(val);
    var typeGender = val;
    $.ajax({
        method: "GET",
        url: "seachbenameth?typeGender=" + typeGender,
        success: (function(data) {
            //console.log(data);
            var listdata = '<option selected="selected" value=""> เลือกคำนำหน้า </option>';
            $.each(data, function(key, value) {
                listdata += "<option value='" + data[key].title_name_th + "'>" + data[key].title_name_th + "</option>";
            });
            $('#selectBenameTH').html(listdata);
        })
    });

    $.ajax({
        method: "GET",
        url: "seachbenameen?typeGender=" + typeGender,
        success: (function(data) {
            console.log(data);
            var listdata = '<option selected="selected" value=""> เลือกคำนำหน้า </option>';
            $.each(data, function(key, value) {
                listdata += "<option value='" + data[key].title_name_en + "'>" + data[key].title_name_en + "</option>";
            });
            $('#selectBenameEN').html(listdata);
        })
    });

}

function relativeGetGender(typeGender, targetDiv){
    $.ajax({
        method: "GET",
        url: "seachbenameth?typeGender=" + typeGender,
        success: (function(data) {
            //console.log(data);
            var listdata = '';
            $.each(data, function(key, value) {
                listdata += "<option value='" + data[key].title_name_th + "'>" + data[key].title_name_th + "</option>";
            });
            $(targetDiv).html(listdata);
        })
    });
}

function getBeNameChild(val) {
    var typeGender = val;
    $.ajax({
        method: "GET",
        url: "seachbenameth?typeGender=" + typeGender,
        success: (function(data) {
            console.log(data);
            var listdata = '<option selected="selected" value=""> เลือกคำนำหน้า </option>';
            $.each(data, function(key, value) {
                listdata += "<option value='" + data[key].title_name_th + "'>" + data[key].title_name_th + "</option>";
            });
            $('#beNameChild').html(listdata);
        })
    });

}

function saveNewEmp(btn, dataNo){
    

    var isNew = true;
    if(dataNo != ""){
        isNew = false;
    }

    //check position
    var p = checkValidSavePosition();
    if(p==false) return false;




    //check pass Username VALID && NOT DUPLICATE
    //console.log(pass);
    if(!pass) {
        var t = ($('#nameEmpLogin').val().length < 3) ? 'ชื่อล็อกอินไม่ถูกต้อง' : 'ชื่อล็อกอินซ้ำ';
        bootbox.alert({
            //size: 'small',
            message: "<h4 class=\"btalert\">"+t+"</h4>",
            callback: function(){}
        });
        return false;
    }


    //prerare config
    //var direct = (isNew) ? "addnewemp":"updateemp";
    var direct = "addnewemp";
    //--

    //submit for validate
    $("#id_card_form").submit();
    $("#form_id_card_info").submit();

    var hasError    = $("#tab_1 .form-group").hasClass('has-error');

    if(hasError){
         bootbox.alert({
            //size: 'small',
            message: "<h4 class=\"btalert\">พบข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้</h4>",
            callback: function(){}
        });
        return false;
    }
    //--

    var glObj   = [];
    var addrObj = [];
    var relationObj = [];
    var children = {};
    var taxIncome = [];
    var time = [];
    var workHistory = [];

    glObj           = $('#tab_1').serializeArrayAnything();
    addrObj         = getAddrForm();
    relationObj     = $('#tab_3 #family_relation').serializeArrayAnything();
    children        = getAllChildren();
    taxIncome       = getEmpTaxIncome();
    time            = $('#tab_6').serializeArrayAnything();

    bondsman        = getBondsman();
    workHistory     = getWorkHistory();

    var eposition   = getAllEmposition();
    var edu         = getAllEdu();
    var wageChannel = getWageChannel();

    if(wageChannel==false) return false;

     //console.log(wageChannel);
     //return false;
    

    //image 
    var formData = new FormData();
    
    var files   = $('#fileEmp')[0].files[0];
    formData.append('fileEmp_upload', files);
    var filesMap   = $('#Pic_map')[0].files[0];
    formData.append('fileMap_upload', filesMap);
    

    //--
    formData.append('allData', JSON.stringify(glObj, null, 2));
    formData.append('addData', JSON.stringify(addrObj,null, 2));
    formData.append('familyData', JSON.stringify(relationObj,null, 2));
    formData.append('children' ,JSON.stringify(children,null, 2));
    formData.append('taxIncome' ,JSON.stringify(taxIncome,null, 2));
    formData.append('edu' ,JSON.stringify(edu,null, 2));
    formData.append('eposition' ,JSON.stringify(eposition,null, 2));
    formData.append('time',JSON.stringify(time,null, 2));

    formData.append('bondsman',JSON.stringify(bondsman,null, 2));
    formData.append('workHistory',JSON.stringify(workHistory,null, 2));
    formData.append('wagechannel' ,JSON.stringify(wageChannel,null, 2));

    // if(bondsman.money_bonds != undefined){
        
    // }

    
    
    if(!isNew){
        formData.append('dataNo',dataNo);
    }


    $.ajax({
        url: direct,
        type: "POST",
        data: formData,
        async:false,
        processData: false,
        contentType: false,
        success: function (res) {

          var rObj = $.parseJSON(res);
          console.log(rObj);
          if(rObj.status){
            bootbox.alert({
                size: 'small',
                message: "<h4 class=\"btalert\">บันทึกข้อมูลสำเร็จ</h4>",
                callback: function(){
                    
                    if(isNew){
                        //window.location = "formaddnewemp";
                        window.location = "editempform?dataNo="+rObj.dataNo;
                    }
                }
            });
          }else{
            console.log(rObj.msg);
             bootbox.alert({
                size: 'large',
                message: "<h4 class=\"btalert\">"+rObj.msg+"</h4>",
                callback: function(){}
            });
          }
        }
    });



}

function getAddrForm(){

    var outInf = {};
    outInf.home_addr = $('#home_addr').serializeObjDisabled();
    outInf.personal_card_addr = $('#personal_card_addr').serializeObjDisabled();
    outInf.contact_addr = $('#contact_addr').serializeObjDisabled();
    outInf.liveWith = $('#liveWithForm').serializeObjDisabled();
    outInf.residentWith = $('#residentWithForm').serializeObjDisabled();
    outInf.Latitude = $('#Latitude').val();
    outInf.Longitude = $('#Longitude').val();

    outInf.Tel_Num = $('#Tel_Num').val();
    outInf.Mobile_Num = $('#Mobile_Num').val();


    //console.log(outInf);

    return outInf;
}

function getAllChildren(){
    var objOut = [];

    var table = $('#children_tbx').DataTable();

    table.rows().every( function () {
        var d = this.data();
        objOut.push(d);
    } );

     var objDel = $('#children_tbx').data('delchild');
     var children_status = $('#tab_3 input[name="children_status"]:checked').val();

    return {'allChild':objOut,'del':objDel,'childs':children_status};
}

function getAllEdu(){
    var objOut = [];

    var table = $('#emp_education_tb').DataTable();

    table.rows().every( function () {
        var d = this.data();
        objOut.push(d);
    } );

    var objDel = $('#emp_education_tb').data('delchild');
  
    return {'allEdu':objOut,'del':objDel};
}


function getAllEmposition(){
    var objOut = [];
    var table = $('#emp_position_tb').DataTable();
    table.rows().every( function () {
        var d = this.data();
        objOut.push(d);
    } );
    var objDel = $('#emp_position_tb').data('delchild');
    return {'allPosition':objOut,'del':objDel};
}

function getWageChannel()
{
    var channel = [];
    var _SalaryViaBank = $("input[name='SalaryViaBank']:checked").val(); //radio
    var SalaryViaBank = parseInt(_SalaryViaBank);
    var Salary_Bank;
    var Salary_BankNo;
    var promtpay_type; // $('#promtpay_type').val();
    var promtpay_number; // $('#promtpay_number').val();

    //cash
    if(SalaryViaBank==0)
    {
        Salary_Bank = null;
        Salary_BankNo = null;
        promtpay_type = null;
        promtpay_number = null;
    }

    //transfer
    if(SalaryViaBank==1)
    {
        Salary_Bank = $('#Salary_Bank').val();
        Salary_BankNo = $('#Salary_BankNo').val();
        if(Salary_Bank=='') {
            alert('ยังไม่ระบุธนาคารรับเงิน');
            return false;
        }

        if(Salary_BankNo=='') {
            alert('ยังไม่ระบุหมายเลขบัญชี');
            return false;
        }

        promtpay_type = null;
        promtpay_number = null;
    }

    //promtpay
    if(SalaryViaBank==2)
    {
        promtpay_type = $('#promtpay_type').val();
        promtpay_number = $('#promp_pay_no').val();
        if(promtpay_type=='') {
            alert('ยังไม่ระบุประเภทพร้อมเพย์');
            return false;
        }

        if(promtpay_number=='') {
            alert('ยังไม่ระบุหมายเลขพร้อมเพย์');
            return false;
        }

        Salary_Bank = null;
        Salary_BankNo = null;
    }


    var ret = {};
    ret.SalaryViaBank = SalaryViaBank;
    ret.Salary_Bank = Salary_Bank;
    ret.Salary_BankNo = Salary_BankNo;
    ret.promtpay_type = promtpay_type;
    ret.promtpay_number = promtpay_number;
    return ret;
}


function getEmpTaxIncome(){

    var obj = $('#tab_4').serializeArrayAnything();
    
    return obj;
}

function getBondsman(){

    var bondsman        = $('#tab_7').serializeArrayAnything();

    //tel
    bondsman['boundsman_tel'] = [];
    var bondManTel = [];
    $('.bondsman_tel_list').each(function(){

        var tel = $(this).find('input[type="text"]').val();
        var telMain = $(this).find('input[type="radio"]').is(':checked');
        if(tel == '' || tel == undefined){

        }else{
            bondManTel.push({'tel':tel, 'main':telMain});
        }
        
    });

    bondsman['boundsman_tel'] = bondManTel;

    return bondsman;
}

function getWorkHistory(){
    var inf = {};

    inf.type1 = [];
    $('#workhis_tb_1 tr').each(function(){

        var data = $(this).data('inf');
        if(data != undefined){
            inf.type1.push(data);
        }
        
    });

    inf.type3 = [];
    $('#workhis_tb_2 tr').each(function(){

        var data = $(this).data('inf');
        if(data != undefined){
            inf.type3.push(data);
        }
        
    });

    inf.del = $('#workhis_tb_1').data('del');


    return inf;
}

function showMoneybondsList(){
    $('#modalMoneybondslists').modal('show');

    //moneybondsTable
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    $.get('moneybondspayment',{emp_id:emp_id,viewOnly:viewOnly},function(res){

        $('#moneybondsTable').html(res);
        
    });


}

function calChildrenInfo(){

    // var amount_child_m  = $('#amount_child_m').val();
    // var amount_child_w  = $('#amount_child_w').val();
    // var amount_edu_no   = $('#amount_edu_no').val();
    // var amount_edu_do   = $('#amount_edu_do').val();
    // var amount_edu_past = $('#amount_edu_past').val();
    var amount_child_m  = 0;
    var amount_child_w  = 0;
    var amount_edu_no   = 0;
    var amount_edu_do   = 0;
    var amount_edu_past = 0;

    var table = $('#children_tbx').DataTable();
    table.rows().every( function () {
        var d = this.data();
        //console.log(d);
        amount_child_m = parseInt(amount_child_m) + parseInt((d.sex == 'ชาย') ? 1:0);
        amount_child_w = parseInt(amount_child_w) + parseInt((d.sex == 'หญิง') ? 1:0);
        amount_edu_no = parseInt(amount_edu_no) +  parseInt((d.education_status == '3') ? 1:0);
        amount_edu_do = parseInt(amount_edu_do) +  parseInt((d.education_status == '1') ? 1:0);
        amount_edu_past = parseInt(amount_edu_past) +  parseInt((d.education_status == '2') ? 1:0);
    });

    $('#amount_child_m').val(amount_child_m);
    $('#amount_child_w').val(amount_child_w);
    $('#amount_edu_no').val(amount_edu_no);
    $('#amount_edu_do').val(amount_edu_do);
    $('#amount_edu_past').val(amount_edu_past);

}

function editEmp(dataNo,view){

    if(view == ""){
        window.location = "editempform?dataNo="+dataNo;
    }else{
        window.location = "viewempform?dataNo="+dataNo;
    }
}

function disableFormAddr(chkBox,copyFrom){

    var dis = false;

    dis = ($(chkBox).is(":checked")) ? true:false;
    //console.log(dis);

    var parent = $(chkBox).closest('.border-form-add');
    var refForm = $(copyFrom);
    
    $(parent).find('input').each(function(){

        if(!$(this).is('.isCheckCopy, .except_dis')){    
            $(this).attr('disabled',dis);
            var valRef = refForm.find('.'+($(this).attr('id'))).val();
            $(this).val(valRef);
            $(this).change();
        }
        
    });

}

function disableFormAddrRadio(chkBox,copyFrom){

    var dis = false;


    var parent = $(chkBox).closest('.border-form-add');
    dis = ($(parent).find('#isCopyPersonalAddr').is(":checked")) ? true:false;
    var refForm = $(copyFrom);
    
    $(parent).find('input').each(function(){

        if(!$(this).is('.isCheckCopy, .except_dis')){    
            $(this).attr('disabled',dis);
            var valRef = refForm.find('.'+($(this).attr('id'))).val();
            $(this).val(valRef);
            $(this).change();
        }
        
    });

}

function loadBondsman(tab){

    var haveCont = $(tab).data('have-contend');
    var emp_id = $('#emp_id_ref').val();

    var viewOnly = $('#viewOnly').val();
    selecttab(7);
    //console.log(viewOnly);

    if(haveCont == 'no'){
        //load
        $.get('bondsmanform',{emp_id:emp_id,viewOnly:viewOnly},function(res){


            $('#tab_7 .box-body').html(res).promise().done(function(){

                var dVal = document.getElementById("bondsman_birthday");
                calDateToDay(dVal,'#bondsmanAge');

                //set format
                $('#money_bonds').inputmask("decimal");
                $('#first_money').inputmask("decimal");
                $('#pay_money').inputmask("decimal");
                $('#bondsman_idcard').inputmask("9-9999-99999-99-9");
                $('#bondsman_year').inputmask("decimal");
                $('#bank_no').inputmask("999-9-99999-9");

                $(tab).data('have-contend','yes');
                //--
                $("#tab_7 #start_date_pay").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });
                $("#tab_7 #end_date_pay").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });
                $("#tab_7 #bondsman_birthday").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });

                $("[data-mask]").inputmask();





                /** Popover tumbon Bonds home address search **/
                $("#btnTBondsHomeAddr").popover({
                    content: function() {
                        var sel2 = '<select class="bonds_idcardaddr-select2-ajax"  style="width: 100% !important;"></select>';
                        return sel2; //$('#popover-content').html();
                    }
                });

                $('#btnTBondsHomeAddr').click(function () {
                    bindingTumbonSelect2('bonds_idcardaddr');
                });

                /** Popover tumbon Bonds work address search **/
                $("#btnTBondsWorkAddr").popover({
                    content: function() {
                        var sel2 = '<select class="bonds_workaddr-select2-ajax"  style="width: 100% !important;"></select>';
                        return sel2; //$('#popover-content').html();
                    }
                });

                $('#btnTBondsWorkAddr').click(function () {
                    bindingTumbonSelect2('bonds_workaddr');
                });

                
            });
    
           
        });
    }

}

function loadEmpPromise(tab){
    
    var haveCont = $(tab).data('have-contend');
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    selecttab(7);
    //console.log(viewOnly);

    if(haveCont == 'no'){
        //load
        $.get('emppromisetb',{emp_id:emp_id,viewOnly:viewOnly},function(res){

            //console.log(res);

            $('#tab_8 .box-body').html(res).promise().done(function(){

                // var dVal = document.getElementById("bondsman_birthday");
                // calDateToDay(dVal,'#bondsmanAge');

                // //set format
                // $('#money_bonds').inputmask("decimal");
                // $('#first_money').inputmask("decimal");
                // $('#pay_money').inputmask("decimal");
                // $('#bondsman_idcard').inputmask("9-9999-99999-99-9");
                // $('#bondsman_year').inputmask("decimal");

                // $(tab).data('have-contend','yes');
                //--
            });
    
           
        });
    }

}

function printPromise(promiseId,btn){

    //PrintPromise
    //var win = window.open('printpromise', '_blank');
    //win.focus();

    //prepare print 
    var whatPrint = $(btn).closest('.promise_list').data("promiseprint");
    var emp_id = $('#emp_id_ref').val();
    // var objWP = $.parseJSON(whatPrint);
    // console.log(promiseId);
    // console.log(objWP);
   
    //console.log( whatPrint['bond']);
    //--
    $.each(whatPrint, function(k, v){
       
        if(v == 1){
            //print
            window.open('printpromise?type='+k+'&promiseId='+promiseId+'&emp_id='+emp_id, '_blank');
        }
    });


}

function loadEmpPosition(tab) {
    var haveCont = $(tab).data('have-contend');
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    selecttab(10);

    console.log(emp_id);

}

function loadEmpWorkhistory(tab){
    var haveCont = $(tab).data('have-contend');
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    selecttab(9);
    if(haveCont == 'no'){
        //load
        $.get('empworkhistorytb',{emp_id:emp_id,viewOnly:viewOnly},function(res){

            $('#tab_9 .box-body').html(res).promise().done(function(){

                $('#tab_9 .workhisDecimal').inputmask('decimal');
                
                //autocom
                var eventSelect = $("#position_code").select2({
                    ajax: {
                        url: "searchposition",
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
                                        name: item.name,
                                        id: item.id,
                                        code:item.code
                                    }
                                })
                            };
                        },
                        cache: true
                    },
                    minimumInputLength: 2,
                    placeholder: "  พิมพ์รหัสพนักงาน",
                });

                eventSelect.on("select2:select", function (e) { 
                    
                    var dataObj = e.params.data;
                   
                    $('#empWorkHistoryForm2 #old_work_position').val(dataObj.name);
                });
               

                //$("#position_code").show();
                $("#tab_9 #empWorkHistoryForm #work_since_full").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });
                $("#tab_9 #empWorkHistoryForm #work_until_full").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });

                $("#tab_9 #empWorkHistoryForm2 #work_since_full").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });
                $("#tab_9 #empWorkHistoryForm2 #work_until_full").datepicker({
                    autoclose: true,
                    language: 'th',
                    format: 'dd/mm/yyyy'
                });
    
            });
    
           
        });
    }


}

function addPrepareDataWorkHistory(){

    var obj = $('#modalAddWorkHistory1 #empWorkHistoryForm').serializeArrayAnything();
    var isNew = false;
    //
    var trRef = null;
    if($('#modalAddWorkHistory1 #empWorkHistoryForm').data('refopen') != ''){
        //update
        trRef  = $('#modalAddWorkHistory1 #empWorkHistoryForm').data('refopen');
        var trData = $(trRef).data('inf');
        $.extend( trData, obj);

        //console.log(trData);

        $(trRef).data('inf',trData);
        isNew = false;

    }else{
        //new
        isNew = true;
    }

    var rowNow = $('#workhis_tb_1 tr.rdata').size();
    //console.log(obj);

    var btn ='<a href="#" class="btn btn-info btn-sm" onclick="showAddWorkHistory(1,this)" > ';
    btn +='                      <span class="glyphicon glyphicon-edit"></span> แก้ไข';
    btn +='                        </a>';
    btn +='                        <a href="#" class="btn btn-danger btn-sm" onclick="delTrWorkhis(this)" style="margin-left:5px">';
    btn +='                            <span class="glyphicon glyphicon-trash"></span> ลบ ';
    btn +='                        </a>';

    //var html = '<tr class="rdata" data-inf=\''+JSON.stringify(obj, null, 2)+'\'>';
    var trNow = $('<tr>');
    $(trNow).addClass('rdata');
    $(trNow).data('inf',obj);

    var html = '<td>'+(rowNow+1)+'</td>';
    html += '<td>'+obj['old_work_company']+'</td>';
    html += '<td>'+obj['old_work_position']+'</td>';
    html += '<td class="calDateDiff">..</td>';
    html += '<td>'+obj['old_work_salary']+'</td>';
    html += '<td>'+btn+'</td>';

    //html += '</tr>';

    $(trNow).html(html);
    
    if(isNew){
        $('#workhis_tb_1').append(trNow);
    }else{
        $(trRef).replaceWith(trNow);
    }

    //update date diff
    $.get('caldiffdate',{date1:obj['work_since_full'],date2:obj['work_until_full']},function(ref){
        $(trNow).find('td.calDateDiff').html(ref);
    });

    $('#modalAddWorkHistory1').modal('hide');

}

function addPrepareDataWorkHistoryAssign(){

    var obj = $('#modalAddWorkHistory2 #empWorkHistoryForm2').serializeArrayAnything();
    //console.log(obj);
    var isNew = false;
    //
    var trRef = null;
    if($('#modalAddWorkHistory2 #empWorkHistoryForm2').data('refopen') != ''){
        //update
        trRef  = $('#modalAddWorkHistory2 #empWorkHistoryForm2').data('refopen');
        var trData = $(trRef).data('inf');
        $.extend( trData, obj);

        //console.log(trData);

        $(trRef).data('inf',trData);
        isNew = false;

    }else{
        //new
        isNew = true;
    }

    var rowNow = $('#workhis_tb_2 tr.rdata').size();
    //console.log(obj);

    var btn ='<a href="#" class="btn btn-info btn-sm" onclick="showAddWorkHistory(2,this)" > ';
    btn +='                      <span class="glyphicon glyphicon-edit"></span> แก้ไข';
    btn +='                        </a>';
    btn +='                        <a href="#" class="btn btn-danger btn-sm" onclick="delTrWorkhis(this)" style="margin-left:5px">';
    btn +='                            <span class="glyphicon glyphicon-trash"></span> ลบ ';
    btn +='                        </a>';

    //var html = '<tr class="rdata" data-inf=\''+JSON.stringify(obj, null, 2)+'\'>';
    var trNow = $('<tr>');
    $(trNow).addClass('rdata');
    $(trNow).data('inf',obj);

    var html = '<td>'+(rowNow+1)+'</td>';
    html += '<td>'+obj['work_since_full']+'</td>';
    html += '<td>'+obj['work_until_full']+'</td>';
    html += '<td>'+obj['position_code']+'</td>';
    html += '<td>'+obj['old_work_position']+'</td>';
    html += '<td>'+obj['assigned']+'</td>';
    html += '<td>'+obj['work_performance']+'</td>';
    html += '<td>'+btn+'</td>';

    //html += '</tr>';

    $(trNow).html(html);
    
    if(isNew){
        //
        $('#workhis_tb_2 tr.tr_emty_data').remove();
        $('#workhis_tb_2').append(trNow);
    }else{
        $(trRef).replaceWith(trNow);
    }


    $('#modalAddWorkHistory2').modal('hide');

}

function delTrWorkhis(btn){
    var trRef = $(btn).closest('tr');
    var inf = $(trRef).data('inf');

    var delDb = (inf['id'] == '') ? false:true;

    if(delDb){
        //var oldObj = $(trRef).closest('table').data('del');
        var oldObj = $('#workhis_tb_1').data('del');
        oldObj.push(inf['id']);
    }

    $(trRef).remove();
}


function showAddWorkHistory(type, btn){

    var trRef = $(btn).closest('tr');
    var inf = $(trRef).data('inf');
    //console.log(inf);
    var tableName = "";
    if(type == 1){
        tableName = "#empWorkHistoryForm";
    }else{
        tableName = "#empWorkHistoryForm2";
    }
    //console.log(inf);
    var isNew = true;
    if(inf == undefined){
        //new
        isNew = true;
        $('#modalAddWorkHistory'+type+' '+tableName).data('refopen','');
    }else{
        isNew = false;
        $('#modalAddWorkHistory'+type+' '+tableName).data('refopen',trRef);
    }

    $('#modalAddWorkHistory'+type+' form input,#modalAddWorkHistory'+type+' form select').each(function(){

        var inpCurent = $(this);
        var intName = $(inpCurent).attr('name');
        //console.log(inf[intCurent]);
       
        if(isNew){
            $(inpCurent).val("");
        }else{
            $(inpCurent).val(inf[intName]);
        }

    });

    $('#modalAddWorkHistory'+type+' form textarea').each(function(){

        var inpCurent = $(this);
        var intName = $(inpCurent).attr('name');
        //console.log(inf[intCurent]);
        
        if(isNew){
            //console.log(intName);
            $(inpCurent).text("");
            $(inpCurent).empty();
            $(inpCurent).val("");
        }else{
            //console.log(inf[intName]);
            $(inpCurent).text(inf[intName]);
            $(inpCurent).val(inf[intName]);
        }

    });

    if(type == 2){
         
         var fixData;
         if(isNew){
             inf = {};
             inf['position_code'] = '';

         }
         var  fixData = [{
                id:inf['position_code'],
                name:inf['old_work_position'],
                text:inf['position_code']+" "+inf['old_work_position'],
                code:inf['position_code']
            }];
        

         //autocom
                var eventSelect = $("#empWorkHistoryForm2 #position_code").select2({
                    data: fixData,
                    ajax: {
                        url: "searchposition",
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
                                        name: item.name,
                                        id: item.id,
                                        code:item.code
                                    }
                                })
                            };
                        },
                        cache: true
                    },
                    minimumInputLength: 2,
                    placeholder: "  พิมพ์รหัสพนักงาน",
                }).val(inf['position_code']).trigger('change');

                eventSelect.on("select2:select", function (e) { 
                    
                    var dataObj = e.params.data;
                   
                    $('#empWorkHistoryForm2 #old_work_position').val(dataObj.name);
                });



    }


    //modalAddWorkHistory1
     $('#modalAddWorkHistory'+type).modal('show');


}


function resetWorkOut(inp){
    if(inp.value != 3){
        $('#End_date').val('');
        $('#Main_EndWork_Reason').val('');
        $('#EndWork_Reason').val('');
        $('#EndWork_Reason').text('');
    }
}

function toggleDivPayType(direct){

    var div = $('#paymentTypeDiv');
    var setTo = (direct == 1) ? 'none':'block';
    $(div).css('display',setTo);

}

function boundsmanAddTelForm(){
    var htmlRef = $('#bondsmanFormRef').html();

    $('.bondsman_tel_contends').append(htmlRef);
    $("[data-mask]").inputmask();
}

function boundsmanDelTelForm(btnDel){
    $(btnDel).closest('.bondsman_tel_list').remove();
}

function addPromise(){

    $('#modalAddPromise').modal('hide');

    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();

    var promiseType = $('#selPromiseType').val();
    var promiseTypeId = $('#selPromiseType option:selected').data('protype');
    if(promiseType == undefined && promiseType == ''){
        return false;
    }

    $.get('addpromise',{
        emp_id:emp_id,
        viewOnly:viewOnly,
        promiseType:promiseType,
        promiseTypeId:promiseTypeId
    },function(res){

         //console.log(res);
         var rObj = $.parseJSON(res);
         if(rObj.status){
             alert('บันทึกข้อมูลสำเร็จ');
             //$('#modalAddPromise').modal('hide');
             var tab = $('#title_tab8');
            loadEmpPromise(tab);
         }else{
             alert(rObj.msg);
         }
           
    });

}

function signPromise(val){

    

    bootbox.confirm("ต้องการที่เซ็นสัญญา", function(result) {
  
        if(result){

            var emp_id = $('#emp_id_ref').val();
            var viewOnly = $('#viewOnly').val();

            $.get('signpromsie',{
                emp_id:emp_id,
                viewOnly:viewOnly,
                promiseId:val
            },function(res){

                //console.log(res);
                var rObj = $.parseJSON(res);
                if(rObj.status){
                    
                    var tab = $('#title_tab8');
                    loadEmpPromise(tab);
                }else{
                    alert(rObj.msg);
                }
                
            });
           
        }
       
    });

}

function showAddPromise(){
    $('#modalAddPromise').modal('show');
    var havePromise = [];
    $('.promise_list').each(function(){
        havePromise.push($(this).data('promisetypeid'));
    });

    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();


    $.get('showaddpromise',{

            emp_id:emp_id,
            viewOnly:viewOnly,
            havePromise:JSON.stringify(havePromise, null, 2)

        },function(res){

            $('#addPromiseForm').html(res);
            
        });

}

function showFormEditContentPromise(btn,promiseId){

    $('#modalEditContentPromise').modal('show');
    $('#submitEditpromiseContent').data('promiseid',promiseId);
    //lineheightselect
    var option = {
        selector: '#text_promise_detail',
        menubar: false,
        plugins: 'lineheight',
        toolbar: 'undo redo  | styleselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | fontsizeselect | outdent indent  '
    };

    option.selector = '#text_promise_detail';
    tinymce.init(option);

    option.selector = '#text_promise_bond';
    tinymce.init(option);

    option.selector = '#text_promise_attach';
    tinymce.init(option);
   
   //remove  tooltip
   
   //--
   //
    //load content
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    var promiseId = promiseId;
    $.get('getcontentpromise',{

        emp_id:emp_id,
        viewOnly:viewOnly,
        promiseId:promiseId

    },function(res){

        //$('#addPromiseForm').html(res);
        var obj = $.parseJSON(res);

        if(obj.detail !=''  && obj.detail != null){
            tinyMCE.get('text_promise_detail').setContent(obj.detail);
        }

        if(obj.bond !=''  && obj.bond != null){
            tinyMCE.get('text_promise_bond').setContent(obj.bond);
        }
       
        if(obj.attach !='' && obj.attach != null){
            tinyMCE.get('text_promise_attach').setContent(obj.attach);
        }
    });
    //--

}

function editPromiseContent(promiseId){

    var objTempl = {};
    objTempl.promise_detail = "";
    objTempl.promise_bond = "";
    objTempl.promise_attach = "";

    if(tinyMCE.get('text_promise_detail') != null){
        objTempl.promise_detail = tinyMCE.get('text_promise_detail').getContent();
    }

    if(tinyMCE.get('text_promise_bond') != null){
        objTempl.promise_bond = tinyMCE.get('text_promise_bond').getContent();
    }
    
    if(tinyMCE.get('text_promise_attach') != null){
        objTempl.promise_attach = tinyMCE.get('text_promise_attach').getContent();
    }

    //console.log(objTempl);
    var emp_id = $('#emp_id_ref').val();
    var viewOnly = $('#viewOnly').val();
    var promiseId = $('#submitEditpromiseContent').data('promiseid');
    $.post('editcontentpromise',{

        emp_id:emp_id,
        viewOnly:viewOnly,
        promiseId:promiseId,
        content:JSON.stringify(objTempl, null, 2)

    },function(res){

        //console.log(res);
        var rObj = $.parseJSON(res);
        if(rObj.status){
            alert('บันทึกสำเร็จ');
            $('#modalEditContentPromise').modal('hide');
        }else{
            alert(rObj.msg);
        }
      
    });

}

function delPromise(val){

    

    bootbox.confirm("ต้องการที่จะลบ ข้อมูลสัญญา?", function(result) {
  
        if(result){

           var emp_id = $('#emp_id_ref').val();
            var viewOnly = $('#viewOnly').val();

            var getpromiPe_ids = [];
            getpromiPe_ids.push( val );

            //console.log(getpromiPe_ids);

            $.get('delpromise',{

                emp_id:emp_id,
                viewOnly:viewOnly,
                promise_ids:JSON.stringify(getpromiPe_ids, null, 2)

            },function(res){

                //console.log(res);
                var rObj = $.parseJSON(res);
                if(rObj.status){
                    alert('ลบสำเร็จ');
                    var tab = $('#title_tab8');
                    loadEmpPromise(tab);
                }else{
                    alert(rObj.msg);
                }
                
                
            });
        }
       
    });

}





function calDateToDay(inp,targetDiv) {
  
    var age;
    try{


        var refVal = inp.value;
        var conv = refVal.split("/");
        var birth = new Date(conv[2]+"-"+conv[1]+"-"+conv[0]);

    
        if(birth == "Invalid Date") throw "Invalid Date";

        var curr = new Date();
        var diff = curr.getTime() - birth.getTime();
        age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }catch(e){
        //console.log(e);
        age = "";
    }
    $(targetDiv).val(age);
}


function calFatMotAge(inp,targetDiv) {

    var age;
    try{
        var refVal = inp.value;
        var conv = refVal.split("/");
        var birth = new Date(conv[2]+"-"+conv[1]+"-"+conv[0]);

        if(birth == "Invalid Date") throw "Invalid Date";
        var curr = new Date();
        var diff = curr.getTime() - birth.getTime();
        age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    }catch(e){
        //console.log(e);
        age = 0;
    }
    return age;
    //$(targetDiv).val(age);
}




function moneyBondHave(sts){
    
    if(sts == 0){
        $('.bond-series').hide();
    }else{
        $('.bond-series').show();
    }
}

(function($) {

    $.fn.serializeArrayAnything = function() {

        var toReturn    = new Object();
        var els         = $(this).find(':input').get();

        $.each(els, function() {
            
            if (this.name && (!this.disabled || $(this).hasClass('except_disable') ) && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|date/i.test(this.type))) {

                var val = $(this).val();
                toReturn[this.name] =   val ;
            }
        });

        //return toReturn.join("&").replace(/%20/g, "+");
        return toReturn;

    }

})(jQuery);
(function($) {

    $.fn.serializeObjDisabled = function() {

        var toReturn    = new Object();
        var els         = $(this).find(':input').get();

        $.each(els, function() {
            
            if (this.name && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|date/i.test(this.type))) {

                var val = $(this).val();
                toReturn[this.name] =   val ;
            }
        });

        //return toReturn.join("&").replace(/%20/g, "+");
        return toReturn;

    }

})(jQuery);


function selecttab(selectval) {
    var selectval = selectval;
    mode = $('#mode').prop('title');

    //check mode for view
    if(mode=='edit' || mode=='add') $('#btnSaveClient').show();
    else $('#btnSaveClient').hide();

    //alert(selectval);
    if(selectval == '10'){
        //$('#btnSaveClient').hide();
        $('#btnCancelClient').hide();
        $('#SaveSalaryBank').show()
    }else{
        //$('#btnSaveClient').show();
        $('#btnCancelClient').show();
        $('#SaveSalaryBank').hide()
    }
}