$(document).ready(function() {
    $('#empName').SumoSelect({ search: true });
});

function getCompanyForDepartment(id, c = 0) {
    var dropdrow;
    if (c == 1) {
        $.get('getdepartmentbyid', { id: id.value }, function(res) {
            $.each(res, function(index, value) {
                dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
            });
            $('#Department').html(dropdrow);
        });
    } else {
        $.get('getdepartmentbyid', { id: id.value }, function(res) {
            $.each(res, function(index, value) {
                dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';

            });
            $('#selectdepartment').html(dropdrow);
        });
    }

}

function getPositionByEmp(params) {
    $('#selectPosition').html('');
    $.get('seartpositionbyemp', { data: params.value }, function(res) {
        $.each(res, function(index, value) {
            $('#selectPosition').append('<option value="' + value.position_id + '">' + '[' + value.PositionCode + ']' + value.Name + '</option>');
        })
    })
}

function searchEmp(params) {
    data = {}
    data = $('#sectionstap3').serializeArrayAnything();
    $.get('seartdatapositionbyemp', { data: data }, function(res) {
        var html = ' <div id="tree" data-obj-take="[]" ></div>';
        $('#dataEmp').html(html).promise().done(function() {

            // $('#tree1').treed();
            $('#tree').treeview({
                data: res,
                showTags: false,
                showSpTags: false,
                preventUnselect: true
                    //collapseAll:{ silent: true }

            });
            $('#tree').treeview('collapseAll', { silent: true });
        });
    });
    return false;
}

function searchEmp11(params) {
    $.each(params, function(k, d) {
        $.get('loadmenulist', { place_id: d.id }, function(res) {


            //$('#manage_menu_list').html(res);
            var resData = $.parseJSON(res);

            //console.log(resData);

            //return false;
            //console.log(defaultData);
            var maxRank = resData['maxRank'];
            var html = ' <div id="tree" data-obj-take="[]" data-max-rank="' + maxRank + '" ></div>';
            $('#manage_menu_list').html(html).promise().done(function() {

                // $('#tree1').treed();
                $('#tree').treeview({
                    data: resData['nodes'],
                    showTags: false,
                    showSpTags: true,
                    preventUnselect: true
                        //collapseAll:{ silent: true }

                });
                $('#tree').treeview('collapseAll', { silent: true });

                $('#place_id_sel').val(d.id);

            });
        });
    })
}

function searchCompany(params) {
    var datas = {};
    data = $('#sectionstap2').serializeArrayAnything();
    $.get('seartpositionbyprogram', { data: data }, function(res) {
        $html = '<td></td>'
    });
    return false;
}


function getDepartmentForSection(id, c = 0) {
    var dropdrow = '';

    if (c == 1) {
        $.get('getsectionbyid', { id: id.value }, function(res) {
            $.each(res, function(index, value) {
                dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
            });
            $('#selectsection').html(dropdrow);

        });
    } else {

        $.get('getsectionbyid', { id: id.value }, function(res) {
            $.each(res, function(index, value) {
                dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
            });
            $('#selectsection').html(dropdrow);;
            $('#selectsection').attr("multiple", "multiple");
            $('#selectsection').SumoSelect({ selectAll: true, search: true });
            $('#selectsection')[0].sumo.reload();
        });


    }

}



function Search() {

    var valid = $('#seartFrom').validator('validate').has('.has-error').length;
    if (valid == 0) {
        companyInpus = $('#seartFrom').serializeArrayAnything();
        var datas = JSON.stringify(companyInpus);
        var Test =
            $.get('seartreprot', { data: datas }, function(res) {
                var conpanyInpus = null;
                $('#dataserat').html(res);
                $.get('getdatareport', { data: datas }, function(res) {
                    var idata = jQuery.parseJSON(res);
                    $.each(idata, function(index, data) {
                        console.log('#' + data.place_id + '-' + data.id + '-' + data.Section + '-' + data.positionID);
                        $('#' + data.place_id + '-' + data.id + '-' + data.Section + '-' + data.positionID).attr('checked', true);
                    });
                });
            });

    }
    return false;
}
(function($) {

    $.fn.serializeArrayAnything = function() {

        var toReturn = new Object();
        var els = $(this).find(':input').get();

        $.each(els, function() {
            //if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) { 
            if (this.name && (!this.disabled || $(this).hasClass('except_disable')) && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
                //if (this.name && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) { 
                var val = $(this).val();
                // toReturn.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( val ) ); 
                // toReturn[encodeURIComponent(this.name)] = encodeURIComponent( val ); 
                toReturn[this.name] = val;
            }
        });

        //return toReturn.join("&").replace(/%20/g, "+"); 
        return toReturn;

    }

})(jQuery);