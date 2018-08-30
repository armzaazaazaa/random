arrayphoto = [];//เก็บรูป

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var Photo = $('#blah').val();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
            //$('#blah').attr(input.files[0]);
            $('#blah').hide();
            $('#blah').fadeIn(650); //พ้นรูป


        }

        reader.readAsDataURL(input.files[0]);
    }

    console.log (input.files[0]);
    console.log (input.files[0].name);


}

$("#imgInp").change(function () {
    readURL(this);
});

function Photo_Storage() {


    var formData = new FormData();

    var files   = $('#imgInp')[0].files[0];
    formData.append('laout_upload',files);

    formData.append('name_id','');

    console.log(formData.getAll('laout_upload'));

    $.ajax({
        url: 'uplodeimg',
        type: "POST",
        data: formData,
        async:false,
        processData: false,
        contentType: false,
        success: function (res) {

            console.log(res);
        }
    });


}
