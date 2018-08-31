/**
 * Created by adithep on 6/21/2017 AD.
 */


$(document).ready(function() {

    $('#saveChangePwd').on('click', function() {
        changePwd();
    });
});


function changePwd() {
    var oldPwd = $('#oldpassword').val();
    var newPwd = $('#newpassword').val();
    var cnewPwd = $('#cnewpassword').val();

    if (oldPwd == '' || newPwd == '' || cnewPwd == '') {
        showMessageBox('กรุณาป้อนข้อมูลให้ครบ');
        return false;
    } else {
        if (cnewPwd === newPwd) {
            var datavar = $('#formChangePwd').serialize();
            $.ajax({
                url: '../personal/changepassword',
                data: datavar,
                type: 'POST',
                success: function(data) {
                    if (data === "1") {
                        showMessageBox('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว');
                        $('#formChangePwd')[0].reset();
                    } else {
                        showMessageBox(data);
                    }

                }
            });
        } else {
            showMessageBox('รหัสผ่านใหม่ไม่ตรงกัน');
            return false;
        }
    }
}