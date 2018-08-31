/**
 * Created by adithep on 7/6/2017 AD.
 */


$(document).ready(function() {

    $(".dateselect").datepicker({
        autoclose: true,
        language: 'th',
        format: 'dd/mm/yyyy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
    });

    $(".monthselect").datepicker({
        autoclose: true,
        language: 'th',
        format: 'mm-yyyy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
    });


    $(".multiselect").multiselect({
        includeSelectAllOption: true
    });

});
