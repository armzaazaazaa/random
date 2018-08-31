$(document).ready(function() {

    loadManageRequestLists();

    var eventSelect = $("#empId").select2({
        ajax: {
            url: "searchempdata",
            dataType: 'json',
            delay: 250,
            data: function(params) {
                return {
                    q: params.term, // search term
                    //page: params.page
                };
            },
            processResults: function(data, params) {

                return {
                    results: $.map(data, function(item) {
                        return {

                            text: item.text,
                            name: item.name,
                            id: item.id,
                            code: item.code,
                            id_card: item.id_card,
                            position_id: item.position_id
                        }
                    })
                };
            },
            cache: true
        },
        minimumInputLength: 2,
        placeholder: "พิมพ์ชื่อหรือรหัสพนักงาน",
    });

    eventSelect.on("select2:select", function(e) {

        var dataObj = e.params.data;

        $('#emp_info').data('inf', dataObj);
    });

});
(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4; // chosen by fair dice roll
        }
    };
})(jQuery);

function loadManageRequestLists() {

    $.get('approvedrequestlists', {}, function(res) {

        var resData = $.parseJSON(res);
        if (resData.status) {


            //console.log(resData.head);
            initailManageRequestTable(resData.head, resData.body);

        } else {
            alert(resData.msg);
            console.log(resData);
        }

    });

}

var tableR = null;

function initailManageRequestTable(head, body) {

    if (tableR) {
        tableR.destroy();
        $('#showManageRequest').empty();
    }

    var action = function(data, row) {
        // console.log(data);
        // console.log(row);
        return '<center><input type="radio" name="' + row.id + '" value="1" > อนุมัติ <input type="radio" name="' + row.id + '" value="0">  ไม่อนุมัติ</center>'

    };
    var color = ['primary', 'success', 'info', 'warning', 'danger'];
    var count = 1;
    $.each(body, function(index, value) {
        var html = '';
        html = '<div class="panel panel-default">';
        html += '<div class="panel-heading">';
        html += '<h4 class="panel-title">';
        html += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + count + '">' + value[0]['place_name'] + ' <span id="countHead' + count + '" class="label label-' + jQuery.rand(color) + '"></span></a>';
        html += '</h4>';
        html += '</div>';
        html += '<div id="collapse' + count + '" class="panel-collapse collapse">';
        html += '<div style="margin-left:10px;margin-right:10px">';
        html += '<table id="showManageRequest' + count + '"  width="100%"></table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $('#collapsebox').append(html).promise().done(function() {

            var size = 0;
            $.each(value, function(index, item) {
                if (index != 'place_name') {
                    size++;
                }
            })
            console.log('--->');
            console.log($('#countHead' + count).length);
            $('#countHead' + count).html(size);
        });


        tableR = $('#showManageRequest' + count).DataTable({
            data: value,
            //columnDefs:columnDefs,
            "columnDefs": [{
                "render": function(data, type, row) {
                    return action(data, row);
                },
                "targets": 12
            }],
            columns: head,
            //paging:   false,
            ordering: false,
            info: false,
            searching: false,
        })
        count++;
    });


}

function saveApprovedrequest() {
    var accordion = null;
    accordion = $('#accordion').serializeArrayAnything();
    $.post("saveapprovedrequest", { data: accordion }, function(data) {
        alert('ok');
    });
}


function clearAll() {
    $('input[type=radio]').removeAttr('checked');
}


function delMenageRequest(id) {


    $.post('delmanagerequest', { id: id }, function(res) {

        var resData = $.parseJSON(res);
        if (resData.status) {


            //console.log(resData.head);
            alert('ลบสำเร็จ');
            loadManageRequestLists();

        } else {
            alert(resData.msg);

        }
    });
}



function showModalManageRequestForm() {

    resetForm();

    $('#form-manage-request').hide();
    $('#pre_load_form').show();



    $('#modal-form-manage-request').modal('show');

    var chkHaveMenu = $('#allMenus').data('allmenu');

    if (chkHaveMenu.length <= 0) {

        $.get('loadallmenu', {}, function(res) {

            var menuAll = $.parseJSON(res);

            $('#allMenus').data('allmenu', menuAll);

            $('#form-manage-request').show();
            $('#pre_load_form').hide();
        });
    } else {
        $('#form-manage-request').show();
        $('#pre_load_form').hide();
    }

}

function resetForm() {
    $('#form-manage-request input[type="text"]').val("");
    $('#form-manage-request select').val("");
    $('#form-manage-request input[type="hidden"]').val("");
    $('#form-manage-request textarea').val("");
    $('#form-manage-request textarea').html("");

    $('#empId').val(null).trigger("change");
    $('.option_content_menus').html('');
}

function showOptionMenu(selPlace) {
    var placeId = $(selPlace).val();

    var menuAll = $('#allMenus').data('allmenu');

    var keepMenu = [];
    $.each(menuAll, function(k, v) {

        if (v.model.place_id == placeId) {
            keepMenu.push(v);
        }
    });

    //console.log(keepMenu);
    //clear content
    $('.option_content_menus').html('');

    var html = createOptionMenu(keepMenu, 0);

    appendMenu(1, html);

}

function showNextMenu(selMenu) {

    var menuId = $(selMenu).val();
    var currentNo = $(selMenu).data('selno');
    var menuAll = $(selMenu).find('option:selected').data('sub-menu');


    //check have childs
    if (menuAll.nodes != undefined && menuAll.nodes.length > 0) {

        var html = createOptionMenu(menuAll.nodes, currentNo);
        appendMenu((currentNo + 1), html);

    }
    //--
    // console.log(menuId);
    // console.log(menuAll);
}

function appendMenu(targetNo, html) {

    //console.log(targetNo);

    $('#menuOption_' + (targetNo - 1)).closest('div').nextAll().remove();

    if ($('#menuOption_' + targetNo).size() > 0) {

        //clear old menu



        //--

        $('#menuOption_' + targetNo).replaceWith(html);
    } else {
        $('.option_content_menus').append(html);

    }

}

function createOptionMenu(keepMenu, fromNo) {

    var total = fromNo;

    var html = $('<select>')
        .prop({ id: 'menuOption_' + (total + 1) })
        .addClass('menuOption')
        .data('selno', (total + 1))
        .on('change', function() {
            showNextMenu(this);
        });

    var option = $('<option>').prop({ value: "" }).html('เลือกเมนู');
    $(html).append(option);

    $.each(keepMenu, function(k, v) {

        var option = $('<option>')
            .prop({ value: v.id })
            .data('sub-menu', v)
            .html(v.text);

        $(html).append(option);
    });

    var wrapper = $('<div>').html(html);

    return wrapper;

}

function saveManageRequest() {
    var data = {};

    var empInf = $('#emp_info').data('inf');

    data.change_to = $('input[name="change_to"]:checked').val();
    data.menu_id = $('.menuOption:last').val();
    data.position_id = empInf.position_id;
    data.id_card = empInf.id_card;
    data.reason_request = $('#reason_request').val();

    //console.log(data);

    //varidate
    var msg = '';
    if (data.menu_id == '' || data.menu_id == undefined) {
        msg += '\n- เมนู';
    }
    if (data.position_id == '' || data.position_id == undefined) {
        msg += '\n- พนักงาน';
    }

    if (msg != '') {
        alert('กรุณาเลือก \n' + msg);
        return false;
    }
    //--

    $.post('savemanagerequest', { data: JSON.stringify(data, null, 2) }, function(res) {

        var resData = $.parseJSON(res);
        if (resData.status) {


            //console.log(resData.head);
            alert('บันทึกสำเร็จ');
            loadManageRequestLists();

        } else {
            alert(resData.msg);

        }

        $('#modal-form-manage-request').modal('hide');

    });


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