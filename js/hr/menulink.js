function toggleProgramListActive(li,pId, noValid){

    $('.program-lists-ul li').removeClass('active');
    $(li).addClass('active');

    $('#manage_menu_title').html($(li).find('.list-menu-name').text());

    $('#pre-load').hide();
    $('#manage-data-content').show();

    if(noValid == undefined){
        //check save menu
        var isEmty = $('#tree').data('obj-take');
        if(isEmty != undefined && isEmty.length > 0){
            //alert('กรุณาบันทึกเมนู');

        }
    }


    //load menu lists
    $.get('loadmenulist',{place_id:pId},function(res){

        //$('#manage_menu_list').html(res);
       var resData = $.parseJSON(res);
    
       //console.log(resData);

       //return false;
       //console.log(defaultData);
        var maxRank = resData['maxRank'];
        var html = ' <div id="tree" data-obj-take="[]" data-max-rank="'+maxRank+'" ></div>';
        $('#manage_menu_list').html(html).promise().done(function(){

            // $('#tree1').treed();
            $('#tree').treeview({
                data: resData['nodes'],
                showTags:false,
                showSpTags:true,
                preventUnselect:true
                //collapseAll:{ silent: true }
                
            });
            $('#tree').treeview('collapseAll', { silent: true });

            $('#place_id_sel').val(pId);
                
        });
    });
    //

}

function showModelFormPlace(btn, mode,ev){

    

    var objCur = {};
    if(mode == 'edit'){

        var li = $(btn).closest('li');
        objCur = li.data('obj-plan');
        $('#form-add-place form').data('sel-now',li);

        //console.log(objCur);
    }

    fullFillTextbox('#form-add-place form',objCur);

    $('#modal-form-add-place').modal('show');


    ev.stopPropagation();

}

function fullFillTextbox(form, obj){

    $(form).find('input').each(function(){

        var inpCurent = $(this);
        var intName = $(inpCurent).attr('name');
     
        var curVAl = (obj[intName] == undefined) ? "":obj[intName];
   
        $(inpCurent).val(curVAl);
       
    });

}

function savePlaceList(){

    var data = $('#form-add-place form').serializeArrayAnything();

    //var isNew  = (data['id'] != undefined && data['id'] != '') ? true:false;
    var selNow = $('#form-add-place form').data('sel-now');
    //console.log(selNow);
    var isNew  = (selNow  == '') ? true:false;

    $.post('saveplace',{data:data},function(res){

        try{

            var resData = $.parseJSON(res);
            if(resData.status){

                if(isNew){
                    $('.program-lists-ul').append(resData.html);
                }else{
                    $(selNow).replaceWith(resData.html);
                }

            }else{
               throw resData.msg;
            }

        }catch(e){
            alert(e.message);
        }

        $('#modal-form-add-place').modal('hide');
       

    });

}

function delPlace(id,btn,ev){

     bootbox.confirm("ต้องการลบโปรแกรมนี้หรือไม่!!", function(result) {
  
        if(result){

            var li = $(btn).closest('li');
   
            $.post('delplace',{
                place_id:id
            },function(res){

                 try{

                    var rObj = $.parseJSON(res);
                    if(rObj.status){

                        $(li).remove();
                         $('#pre-load').show();
                        $('#manage-data-content').hide();   

                    }else{

                        throw rObj.msg;
                    }

                 }catch(e){
                    alert(e.message);
                 }

               
                
            });
           
        }
       
    });

    ev.stopPropagation();
}


function showModelFormMenu(stage, id, runningNo){

    //state add_parent, add_child, edit

    $('#modal-form-add-menu').modal('show');
    $('#form-add-menu form').data('state-form', stage);

    var treeView    = $('#tree');
    var selNode     = treeView.treeview('getSelected');
    var objSet      = {};



    if(stage == 'add_parent'){

    }else if(stage == 'add_child'){

    }else if(stage == 'edit'){
      
        //update mode
        if(runningNo != undefined && runningNo != '' && runningNo != 'undefined'){
            console.log('1');
            //var nodeNow = treeView.treeview('findNodes', [runningNo, 'runningNo']);
            var nodeNow = treeView.treeview('findNodes', [runningNo, 'g','runningNo']);
        }else{
             console.log('2');
            var nodeNow = treeView.treeview('findNodes', [id,'g', 'id']);
        }
        
       
        if(nodeNow.length > 0){
            
            $('#form-add-menu form').data('sel-now', nodeNow[0]);
            objSet = nodeNow[0].model;

        }
        // console.log(selNode);
        //console.log(objSet);
        // //fill form

    }else{

        alert('state is not undefined !!!');
        return false;

    }
   
    fullFillTextbox('#form-add-menu form', objSet);

}


function addMenuToObj(){

    var formRef = $('#form-add-menu form');
    var nodeRef = formRef.data('sel-now');
    var isNew = true;

    if(nodeRef == ""){
        isNew = true;
    }else{
        isNew = false;
    }

    var objForm = formRef.serializeArrayAnything();

    addNode(objForm);

}

function addNode(obj){

    var treeView    = $('#tree');
    var placeIdSel  = $('#place_id_sel').val();
    var selNode     = treeView.treeview('getSelected');
    var hasParent   = false;
    var state       =  $('#form-add-menu form').data('state-form');
    var parent_id       = "";
 

    //set default by state
    if(state == 'add_parent'){

        parent_id   = "";
        //selNode     = false;
        selNode[0] = undefined;

    }else if(state == 'add_child'){

        parent_id = selNode[0].id;
        hasParent = true;

    }else if(state == 'edit'){

        parent_id = selNode[0].id;
        hasParent = true;

    }else{

        alert('state is not undefined !!!');
        return false;
    }
    //--

    //add node
    if(state == 'edit'){

       //console.log(selNode);
        var addObj = jQuery.extend({}, selNode[0]);
        addObj.text         = obj.name;
        addObj.menu_desc    = obj.menu_desc;
        addObj.parent_id    = parent_id;
        addObj.process_id   = obj.process_id;
        addObj.model = {

                place_id : placeIdSel,
                name : obj.name,
                menu_desc : obj.menu_desc,
                link : obj.link,
                parent_id :parent_id,
                rankking : '1',
                process_id : obj.process_id,
                status : '',
                menu_manage_permission : '1'

            };
    
        if(addObj.nodes != undefined && addObj.nodes.length > 0){

            addObj.nodes = cloneTree(addObj.nodes);
        }
        addObj.action = 'edit';

        delete addObj['$el'];

        //treeView.treeview('updateNode', [ selNode[0], addObj, { silent: true } ]);
        treeView.treeview('updateNode', [addObj]);


    }else{

        var run = runningSaveNew();

        var maxRank = $('#tree').data('max-rank');

        var plusMax = parseInt(maxRank) +1;
        $('#tree').data('max-rank', plusMax);

        var addObj = {

            id : obj.id,
            runningNo:run,
            model:{

                place_id : placeIdSel,
                name : obj.name,
                menu_desc : obj.menu_desc,
                link : obj.link,
                parent_id :parent_id,
                rankking : plusMax,
                process_id : obj.process_id,
                status : '',
                menu_manage_permission : '1'

            },
            rankking:plusMax,
            ref_id:obj.ref_id,
            text:obj.name,
            tags:[getHtmlTag(''+obj.id+'',''+run+'')],
            action:'add'

        };

        treeView.treeview('addNodes',[addObj,selNode[0],false]);
    }
   
    //show treeview after set node
    treeView.treeview('expandAll', { silent: true });
    
    if(!hasParent){
       treeView.treeview('collapseAll', { silent: true }); 
    }else{
       treeView.treeview('collapseAll', { silent: true }); 
       
       var node = treeView.treeview('search', [ obj.name, { ignoreCase: false, exactMatch: false } ]);
       treeView.treeview('selectNode', [ node, { silent: true}]);
    }
    //--

    setObjTake(addObj);

    $('#modal-form-add-menu').modal('hide');


}


function runningSaveNew(){

    var max = $('#form-add-menu form').data('save-runno');

    max = parseInt(max) + 1;

    $('#form-add-menu form').data('save-runno',max);

    return max;

}

function cloneTree(obj){
    var resArr = [];

    $.each(obj,function(k,v){

        var subNode = jQuery.extend({}, v);
        //console.log(subNode);
        delete subNode['$el'];

        if(subNode.nodes != undefined && subNode.nodes.length > 0){
            subNode.nodes = cloneTree(subNode.nodes);
        }
        
        resArr.push(subNode);
    });

    return resArr;
}


function setObjTake(obj){

    //obj-take
    var curObj = $('#tree').data('obj-take');
    
    if(curObj.length > 0){
        
        var hasIt = false;
        //console.log(curObj);

        $.each(curObj,function(k,v){

            if(obj.runningNo != '' && obj.runningNo != undefined){

                if(v.runningNo === obj.runningNo){

                    //console.log(obj.action);
                   
                    if(obj.action == 'del'){
                        
                       // curObj.splice(k, 1);
                       //console.log(k);
                       //console.log(curObj[k]);
                        //delete curObj[k];
                        curObj.splice(k, 1);
                        hasIt = true;

                    }else{

                        curObj[k] = obj;
                        hasIt = true;
                    }
                    
                }

            }else{

                if(v.id === obj.id){
                    curObj[k] = obj;
                    hasIt = true;
                }
            }

            
        });

        if(!hasIt){
            curObj.push(obj);
        }

    }else{

        curObj.push(obj);
    }

    


    $('#tree').data('obj-take',curObj);

}


function delMenuList(id, runningNo){

     bootbox.confirm("ต้องการลบเมนูหรือไม่!!", function(result) {
  
        if(result){

           var treeView    = $('#tree');
            var nodes;

            if(runningNo != undefined && runningNo != '' && runningNo != 'undefined'){

                nodes = treeView.treeview('findNodes', [runningNo,'g', 'runningNo']);

            }else{

                nodes = treeView.treeview('findNodes', [id,'g', 'id']);
            }
           
            treeView.treeview('removeNode', [ nodes[0], { silent: true } ]);
            // treeView.treeview('expandAll', { silent: true });
            // treeView.treeview('collapseAll', { silent: true }); 

            nodes[0].action = 'del';

            //keep data
            setObjTake(nodes[0])
           
        }
       
    });

    

}


function getObjTake(){
    var curObj = $('#tree').data('obj-take');
    return curObj;
}

function getAllNodes(){
    var treeViewObject = $('#tree').data('treeview'),
        allCollapsedNodes = treeViewObject.getCollapsed(),
        allExpandedNodes = treeViewObject.getExpanded(),
        allNodes = allCollapsedNodes.concat(allExpandedNodes);

    return allNodes;
}

function getHtmlTag(id,runningNo){
    var html = '';

    html += '<span class="pull-right action-menu">';
    html += '<button type="button" onclick="showModelFormMenu(\'add_child\')" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-plus"></span> เพิ่ม</button>';
    html += '<button type="button" onclick="showModelFormMenu(\'edit\',\''+id+'\',\''+runningNo+'\')" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span> แก้ไข</button>';
    html += '<button type="button" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-move"></span> ย้าย</button>';
    html += '<button type="button" onclick="delMenuList(\''+id+'\',\''+runningNo+'\')" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span> ลบ</button>';
    html += '</span>';

    //return html;

    return html;
}

function saveMenu(){

    var menuObjAll = $('#tree').treeview('getNodes');
    var menuObj = getObjTake();
      //console.log(menuObjAll);
      //console.log(JSON.stringify(menuObjAll, null, 2));
    // return false;

    if(menuObj.length <= 0 ){
        alert('เมนูไม่ได้ถูกเปลี่ยนแปลง');
        return false;
    }else{

        // $.post('savemenu',{menuObj:JSON.stringify(menuObj, null, 2)},function(res){

        //     var resData = $.parseJSON(res);
        //     if(resData.status == true){
        //         alert('บันทึกสำเร็จ');
        //     }else{
        //         alert(resData.msg);
        //     }

        // });

        $.post('savemenuall',{
            menuObjAll:JSON.stringify(menuObjAll, null, 2),
            forDel:JSON.stringify(menuObj, null, 2)
        
        },function(res){

            var resData = $.parseJSON(res);
            if(resData.status == true){
                alert('บันทึกสำเร็จ');
                $('.program-lists-ul .list-group-item.active').click();
            }else{
                alert(resData.msg);
            }

        });

    }

    

}

function changeRank(nodeId,selInp, ev){

    // console.log('changeRange');
    // console.log(nodeId);

    var treeView    = $('#tree');
    var textVal = $(selInp).find('option:selected').text();
    var nodeTargetId = $(selInp).val();

    var resOuts = treeView.treeview('changeRankNode', [nodeId,textVal,nodeTargetId]);

    $.each(resOuts,function(k, node){
        setObjTake(node);
    });

    

    ev.stopPropagation();
}

function clickInside(ev){

    ev.stopPropagation();
}

function showMoveMenuForm(nodeId){

    //console.log(nodeId);

    $('#modal-form-move-menu').modal('show');

    var pId = $('#place_id_sel').val();

    //edit new 
    


    var menuObjAll = $('#tree').treeview('getNodes');

    var menuMain = [
        {
            text:'เมนูหลัก',
            main_menu:true,
            nodes:menuObjAll
        }
    ];

    var html = ' <div id="treeMove" ></div>';

    $('#form-move-menu').html(html).promise().done(function(){

        // $('#tree1').treed();
        $('#treeMove').treeview({
            //data: menuObjAll,
            data: menuMain,
            showTags:false,
            showSpTags:false,
            preventUnselect:true,
            showCheckbox:true,
            selectedBackColor:'#34b586',
            levels:2,
            //showRadio:true
            //collapseAll:{ silent: true }
            onNodeChecked:function(event, data){

                $(this).treeview('uncheckAll',{ silent: true });
                $(this).treeview('checkNode',[data.nodeId,{ silent: true }]);
            
            }
            
        });
        //$('#treeMove').treeview('collapseAll', { silent: true });
    
    });

    //--

     //load menu lists
    // $.get('loadmenulist',{place_id:pId},function(res){

    //     var resData = $.parseJSON(res);

    //     var maxRank = resData['maxRank'];
    //     var html = ' <div id="treeMove" data-obj-take="[]" data-max-rank="'+maxRank+'" ></div>';

    //     $('#form-move-menu').html(html).promise().done(function(){

    //         // $('#tree1').treed();
    //         $('#treeMove').treeview({
    //             data: resData['nodes'],
    //             showTags:false,
    //             showSpTags:false,
    //             preventUnselect:true,
    //             showCheckbox:true,
    //             selectedBackColor:'#34b586',
    //             //showRadio:true
    //             //collapseAll:{ silent: true }
    //             onNodeChecked:function(event, data){
 
    //                 $(this).treeview('uncheckAll',{ silent: true });
    //                 $(this).treeview('checkNode',[data.nodeId,{ silent: true }]);
                
    //             }
                
    //         });
    //         $('#treeMove').treeview('collapseAll', { silent: true });
     
    //     });
    // });
    //



}

function moveMenu(){

  
    var moveToTree = $('#treeMove').treeview('getChecked');

    // console.log(moveToTree);
    // return false;
    var toMain = (moveToTree[0].main_menu != undefined && moveToTree[0].main_menu ) ? true:false;
    
    var resNode = $('#tree').treeview('moveTree',[moveToTree[0].old_nodeId,toMain]);
   
    if(resNode.nodeId == undefined){
        alert('ไม่สามารถย้ายไปเมนูเดิมได้');
    }else{
        setObjTake(resNode);
    }
   
    $('#modal-form-move-menu').modal('hide');

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


//tree
$.fn.extend({
    treed: function (o) {
      
      var openedClass = 'glyphicon-minus-sign';
      var closedClass = 'glyphicon-plus-sign';
      
      if (typeof o != 'undefined'){
        if (typeof o.openedClass != 'undefined'){
        openedClass = o.openedClass;
        }
        if (typeof o.closedClass != 'undefined'){
        closedClass = o.closedClass;
        }
      };
      
        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().toggle();
                }
            })
            branch.children().children().toggle();
        });
        //fire event from the dynamically added icon
      tree.find('.branch .indicator').each(function(){
        $(this).on('click', function () {
            $(this).closest('li').click();
        });
      });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find('.branch>a').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});

//--