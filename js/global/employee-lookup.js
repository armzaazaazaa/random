/**
 * Created by adithep on 4/5/2017 AD.
 */
var objEmp;
var empty_option = '<option selected="selected" value="">  กรุณาเลือก  </option>';
$(document).ready(function() {

});


function lookupdepartment(me, objDept, objSection) {
    var CompanyID = me.val();
    var _options1 = empty_option;
    var _options2 = empty_option;
    if (CompanyID) {
        $.ajax({
            method: "POST",
            url: '../employee/finddepartment',
            data: { CompanyID: CompanyID },
            success: function(data, textStatus, jQxhr) {
                $.each(data, function(key, value) {
                    _options1 += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#' + objDept).html(_options1);

            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    } else {
        $('#' + objDept).html(_options1);
        $('#' + objSection).html(_options2);
    }
}



function lookupsection(me, comp, objSection) {
    var CompanyID = comp;
    var DepartmentID = me.val();
    var _options = empty_option ;
    if (DepartmentID) {
        $.ajax({
            method: "POST",
            url: '../employee/findsection',
            data: { CompanyID: CompanyID, DepartmentID: DepartmentID },
            success: function(data, textStatus, jQxhr) {
                $.each(data, function(key, value) {
                    _options += "<option value='" + data[key].id + "'>" + data[key].name + "</option>";
                });
                $('#' + objSection).html(_options);

            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    } else {
        $('#' + objSection).html(_options);
    }

}



function lookupemployee(CompanyID, DepartmentID, SectionID) {
    if (CompanyID != null && CompanyID != 'undefined') {
        //console.log("CompanyID" + CompanyID);
        $.ajax({
            method: "POST",
            data: { CompanyID: CompanyID },
            url: "../employee/getempdatabycompany",
            async : false,
            success: (function(data) {
                objEmp = data;
                console.log("objemp" + objEmp);
            })
        });
    }

    if (CompanyID != null && CompanyID != 'undefined' && DepartmentID != null && DepartmentID != 'undefined') {
        //look up company level
        $.ajax({
            method: "POST",
            data: { CompanyID: CompanyID, DepartmentID: DepartmentID },
            url: "../employee/getempdatabycompany",
            async : false,
            success: (function(data) {
                objEmp = data;
                console.log("objemp" + objEmp);
            })
        });
    }

    if (CompanyID != null && CompanyID != 'undefined' && DepartmentID != null && DepartmentID != 'undefined' && SectionID != null && SectionID != 'undefined') {
        //look up company level
        $.ajax({
            method: "POST",
            data: { CompanyID: CompanyID, DepartmentID: DepartmentID, SectionID: SectionID },
            url: "../employee/getempdatabycompany",
            async : false,
            success: (function(data) {
                objEmp = data;
                console.log("objemp" + objEmp);
            })
        });
    }

}