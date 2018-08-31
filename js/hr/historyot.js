

$(document).ready(function() {


});



function getCompanyForDepartment(val)
{
	var valueCompany = val.value;
	$('#hiddenvalCompany').val(valueCompany);

    $.ajax({
            method: "GET",
            url: "getdepartment?id_company="+valueCompany,
 			success: function(data, textStatus, jQxhr) {
            var derartment = '<option selected="selected" value=""> เลือกแผนก </option>';
            $.each(data, function(key, value) {
     			derartment += "<option value='" + data[key].id +"'>" + data[key].name + "</option>";               
            });
            $('#selectdepartment').html(derartment);
        	},
	        error: function(jqXhr, textStatus, errorThrown) {
	            console.log(errorThrown);
        }
        });
}

function getDepartmentForSection(val)
{
	var valueDepartment = val.value;
	$('#hiddenvalDepartment').val(valueDepartment);

    $.ajax({
            method: "GET",
            url: "getsection?id_department="+valueDepartment,
 			success: function(data, textStatus, jQxhr) {
            var derartment = '<option selected="selected" value="">  เลือกฝ่าย  </option>';
            $.each(data, function(key, value) {
     			derartment += "<option value='" + data[key].id +"'>" + data[key].name + "</option>";               
            });
            $('#selectsection').html(derartment);
        	},
	        error: function(jqXhr, textStatus, errorThrown) {
	            console.log(errorThrown);
        }
        });

}
