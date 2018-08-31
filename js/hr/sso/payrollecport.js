$(document).ready(function() {
    exportText();
    $("#sso_date").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
    });
});

function exportText() {
    var data = {};
    $("#btnexport").click(function() {
        var valid = $('#exportcompany').validator('validate').has('.has-error').length;
        if (valid == 0) {
            data.type_data = $('#selecttype').val();
            data.selectworking = $('#selectworking').val();
            data.selectmonth = $('#selectmonth').val();
            data.selectyear = $('#selectyear').val();
            data.ssoDate = $('#sso_date').val();
            $.post('exportcompany', { data: data }, function(res) {
                if (res !== "0") {
                    window.location.href = '../payrollexport/downloadfile?data=' + JSON.stringify(data);
                } else {
                    bootbox.alert({
                        size: 'small',
                        message: "<h4 class=\"btalertsave\">ไม่สามารถดาวน์โหลดได้</h4>",
                        callback: function() {}
                    });
                }
            });
        }
        return false;
    });

}