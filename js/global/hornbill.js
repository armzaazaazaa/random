/**
 * Created by adithep on 9/13/2016 AD.
 */

/** init JS **/
var BootboxTimeOut = 3000;
var HornBill = (function() {
    "use strict";
    var elem,
        hideHandler,
        that = {};
    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(4000).fadeOut();
    };
    return that;
}());



$(document).ready(function () {
    HornBill.init({
        "selector": ".bb-alert"
    });

});



//** Utility function js **/
function matchDatePattern(str)
{
    //eg.  30/12/2015  pattern
    var patt = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g;
    return  patt.test(str);
}

function matchInputDatePattern(str)
{
    //Input only number or Date with Slash
    var patt = /^[0-9a/-]+$/g;
    return  patt.test(str);
}


function matchInputSlash(str)
{
    return (str.indexOf("/") > -1) ? true : false;
}

function matchDecimal(str)
{
    var patt = /^\d+(\.\d{1,2})?$/g;
    return patt.test(str);
}