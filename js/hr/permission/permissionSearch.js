$(document).ready(function() {
    $('#sectionstap2').hide();
    $('#sectionstap3').hide();
});
var count = 0;

function getCompanyForDepartment(id, c ) {
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

function getProgramforMenu(id) {
    var dropdrow = '';
    $.get('munubyid', { id: id.value }, function(res) {
        $.each(res, function(index, value) {
            dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
        });
        $('#menu').html(dropdrow);
    });

}

function countObj(obj) {
    var i = 0;
    for (var item in obj) {
        i++;
    }
    return i;
}

function getSubMenu(id) {
    var countp = parseInt(id.id.replace("submenu", ""));
    for (var i = countp + 1; i < ($('#submenu')[0].children.length); i++) {
        $('div#' + i).empty();
    }
    var html = '<div class="col-md-3" id="' + count + '">';
    html += '<div class="form-group">';
    html += '<select class="form-control" name="submenu' + count + '" id="submenu_' + count + '" onchange="getSubMenu(this);" required>';
    html += '< /select>';
    html += '< /div>';
    html += '</div>';
    var dropdrow = '<option value="All" id="000"> เลือกทั้งหมด </option>';
    $.get('submenu', { id: id.value }, function(res) {
        if (countObj(res) >= 1) {
            $('#submenu').append(html).promise().done(
                $.each(res, function(index, value) {
                    dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
                })
            );
            $('#submenu_' + count).html(dropdrow);
            count++;
        }
    });

}


function getDepartmentForSection(id, c ) {
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

        });


    }

}


function SearchStap1() {
    Stap1 = $('#seartFrom1').serializeArrayAnything();
    console.log(Stap1);
    if (Stap1.typesearch == '1') {
        $('#sectionstap1').hide();
        $('#sectionstap2').show();
        $('#sectionstap3').hide();

    }
    if (Stap1.typesearch == '2') {
        $('#sectionstap1').hide();
        $('#sectionstap2').hide();
        $('#sectionstap3').show();
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

function toggleProgramListActive(li, pId, noValid) {

    $('.program-lists-ul li').removeClass('active');
    $(li).addClass('active');

    $('#manage_menu_title').html($(li).find('.list-menu-name').text());

    $('#pre-load').hide();
    $('#manage-data-content').show();

    if (noValid == undefined) {
        //check save menu
        var isEmty = $('#tree').data('obj-take');
        if (isEmty != undefined && isEmty.length > 0) {
            //alert('กรุณาบันทึกเมนู');

        }
    }


    //load menu lists
    $.get('loadmenulistprogramsearch', { place_id: pId }, function(res) {

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

            $('#place_id_sel').val(pId);

        });
    });
    //

}