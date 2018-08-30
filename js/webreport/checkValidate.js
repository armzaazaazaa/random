function frmValidate()
{
	var text = document.getElementById("btn-select").innerHTML;
	if(text == "None selected") {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        //window.location.href = "http://localhost/wseasyerp/webreport/default/wage";
    }
}


/*var faults = $('#'+frm+' input').filter(function() {
return $(this).data('required') && $(this).val() === "";
}).css( {'background-color' : "#FFFF99",'border':'1px solid red'});*/

// var faults2 = $('#'+frm+' select').filter(function() {
// return $(this).data('required') && $(this).val() === "";
// }).css( {'background-color' : "#FFFF99",'border':'1px solid red'});

// //console.log(faults.length);
// //console.log(faults2.length);
// //if(faults.length || faults2.length) return false;
// return ((faults2.length) > 0) ? false : true;
// }

// function CheckNotNumber(id,val){
//    // alert(val);
//      if(!isNaN(val)){
//          document.getElementById(id).value = "";
        
//          //alert(val);
//      }
