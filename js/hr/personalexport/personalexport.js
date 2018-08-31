$(document).ready(function() {
   
    //console.log($('#emp_name').html());
    
    $("#work_start_begin").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });
    $("#work_start_end").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy'
    });

    //dropdown 
    var objFullComp = $.parseJSON($('#fullcompanyinfo').val());
    runAbleDropdownCompany(objFullComp);

    loadFirstIndexTab();
});

function loadFirstIndexTab(){

    var selTab = "1";

    $.get('getpersonalinfo',{},function(res){

        $('#fill_tab_1 .box-body').html(res);
        // $('.tab-filter .nav-tabs li:eq(0) a').tab('show');
    });


}

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

function filterToggleCheck(inp, target){

    $(target+' input[type="checkbox"]').prop('checked',$(inp).is(':checked'));
}



function showTableExportEmp(toFile,btn){

    var filter = {};
    var sel_field = {};
    var sel_field_sp = [];
    var map_titles = {};

    //disabled
    $(btn).find('.emp-btn-load').show();
    $(btn).find('.emp-btn-normal').hide();
    $('.emp-btn-main-search').prop('disabled',true);
    //--

    $('#border-emp-filter-field input[type="checkbox"]:checked').each(function(){

        var tbName = $(this).data('tb');
        var fName = $(this).prop('name');
        var spField =  $(this).data('special');
        var mapTitle =$(this).data('mtitle');

        if(tbName != undefined){

           if(sel_field[tbName] == undefined){
               sel_field[tbName] = [];
           }

           sel_field[tbName].push(fName);

           

        }

        if(mapTitle != undefined){
                map_titles[fName] = mapTitle;
        }else{
            map_titles[fName] = fName;
        }

        if(fName != undefined && spField == "1"){

             sel_field_sp.push(fName);
        }

       
    });

    //--

    //console.log(sel_field);
    filter = $('#form_search_emp_export').serializeArrayAnything();
    // console.log(map_titles);
    // return false;

    var urlName = (!toFile) ? "showtableempdata":"exportempfile";
    
    $.post(urlName,{

        filter:JSON.stringify(filter, null, 2), 
        sel_field:JSON.stringify(sel_field, null, 2),
        sel_field_sp:JSON.stringify(sel_field_sp, null, 2),
        map_titles:JSON.stringify(map_titles, null, 2)
    
    },function(res){

        //draw table
        //console.log(res);
        $(btn).find('.emp-btn-load').hide();
        $(btn).find('.emp-btn-normal').show();
        $('.emp-btn-main-search').prop('disabled',false);

        var resData = $.parseJSON(res);
        if(resData.status){

             var heads = [];
            // $.each(resData.head, function(k,v){
            //     var title = resData.map_titles[v];
            //     console.log(title);
            //     heads.push({title:'title',data:v});
            // });

            if(toFile){
                 window.open('downloadempexcel?name='+resData.name, '_blank');   
            }else{
                initTable(resData.data, resData.map_titles);
            }
            
            
        }else{
            alert(resData.msg);
            console.log(resData);
        }
        //console.log(resData.mtitle);
       
       
        


    });
}

var table = null;
function initTable(data,titles) {
    var columns = [], keys = Object.keys(data[0]);
    for (var i=0;i<keys.length;i++) {
        columns.push({ data: keys[i], title: titles[keys[i]] ,className:keys[i]});
    }                  
    if (table) {
        table.destroy();        
        $('#showAllExportEmp').empty(); 
    }  

     var columnDefs = [
            {
                "render": function ( data, type, row ) {
                    return '<img src="/wseasyerp/upload/personal/'+row['Pictures_HyperL']+'" alt="image img" style="height:50px;">';
                },
                "targets": getColumnIndexesWithClass(columns,"Pictures_HyperL")
            }
        ];     
    table = $('#showAllExportEmp').DataTable({
       data: data,
       columnDefs:columnDefs,
       columns : columns,
       //paging:   false,
        ordering: false,
        info:     false,
        searching: false,
    })  
} 

function getColumnIndexesWithClass( columns, className ) {
    var indexes = [];
    $.each( columns, function( index, columnInfo ) {
        // note: doesn't attempt to support multiple class names on a column
        //if( columnInfo.className == className ) {
        var re = '/\b'+className+'\b/';
        if ( re.match( columnInfo.className ) ) {
            indexes.push( index );
        }
    } );
 
    return indexes;
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
