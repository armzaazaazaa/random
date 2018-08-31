$(document).ready(function() {


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

function getDepartmentForSection(id, c = 0) {
    var dropdrow;
    if (c == 1) {
        $.get('getsectionbyid', { id: id.value }, function(res) {
            $.each(res, function(index, value) {
                dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
            });
            $('#Section').html(dropdrow);
        });
    } else {

        $.get('getsectionbyid', { id: id.value }, function(res) {
            $.each(res, function(index, value) {
                dropdrow += '<option value="' + value.id + '"> ' + value.name + ' </option>';
            });
            $('#selectsection').html(dropdrow);
        });
    }
}

function Search() {
    var objSearch = {};
    var dataTable;
    objSearch.company = $('#selectworking').val();
    objSearch.department = $('#selectdepartment').val()
    objSearch.section = $('#selectsection').val();
    window.location = 'emptypositiondata';


}