
var work_golf = $('#work_golf').attr('title');
var work_kwan = $('#work_kwan').attr('title');
var work_em = $('#work_em').attr('title');

var bullets = [];
var objEmp1 = {};
objEmp1.title = "Golf";
objEmp1.subtitle = "Issues";
objEmp1.ranges = [15,20, 25, 30];
objEmp1.measures = [work_golf];
objEmp1.markers = [28];

var objEmp2 = {};
objEmp2.title = "Kwan";
objEmp2.subtitle = "Issues";
objEmp2.ranges = [15,20, 25, 30];
objEmp2.measures = [work_kwan];
objEmp2.markers = [28];

var objEmp3 = {};
objEmp3.title = "Em";
objEmp3.subtitle = "Issues";
objEmp3.ranges = [15,20, 25, 30];
objEmp3.measures = [work_em];
objEmp3.markers = [28];

bullets.push(objEmp1);
bullets.push(objEmp2);
bullets.push(objEmp3);

    /*
    var bullets = [
        {
            title: "Golf",
            subtitle: "Issues",
            ranges: [20, 25, 30],
            measures: [9],
            markers: [28]
        },
        {
            title: "Kwan",
            subtitle: "Issues",
            ranges: [20, 25, 30],
            measures: [15],
            markers: [28]
        },
        {
            title: "Em",
            subtitle: "Issues",
            ranges: [20, 25, 30],
            measures: [18],
            markers: [28]
        },
    ];
*/


/*
 var bullets = [
 {
 title: "Revenue",
 subtitle: "US$, in thousands",
 ranges: [150, 225, 300],
 measures: [270],
 markers: [250]
 },
 {
 title: "Profit",
 subtitle: "%",
 ranges: [20, 25, 30],
 measures: [23],
 markers: [26]
 },
 {
 title: "Order Size",
 subtitle: "US$, average",
 ranges: [350, 500, 600],
 measures: [320],
 markers: [550]
 },
 {
 title: "New Customers",
 subtitle: "count",
 ranges: [1400, 2000, 2500],
 measures: [1650],
 markers: [2100]
 },
 {
 title: "Satisfaction",
 subtitle: "out of 5",
 ranges: [3.5, 4.25, 5],
 measures: [4.7],
 markers: [4.4]
 }
 ];

 */
