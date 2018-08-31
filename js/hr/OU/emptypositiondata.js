$(document).ready(function() {

    $('#datatable').DataTable({
        dom: 'Bfrtip',
        buttons: [{
                extend: 'csv',
                text: 'CSV',
                exportOptions: {
                    modifier: {
                        search: 'none'
                    }
                }
            },
            {
                extend: 'excel',
                text: 'Excel',
                exportOptions: {
                    modifier: {
                        search: 'none'
                    }
                }
            },
            {
                extend: 'pdf',
                text: 'PDF',
                orientation: 'landscape',
                pageSize: 'A4',
                exportOptions: {
                    modifier: {
                        fontSize: 36,
                        search: 'none'
                    },
                },


            }
        ]
    });




});