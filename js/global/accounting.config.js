/**
 * Created by AEEDY on 16/12/2558.
 */

/** Global Setting accounting floating point */
accounting.settings = {
    currency: {
        symbol : "",   // default currency symbol is '$'
        format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
        decimal : ".",  // decimal point separator
        thousand: ",",  // thousands separator
        precision : 2   // decimal places
    },
    number: {
        precision : 0,  // default precision on numbers is 0
        thousand: ",",
        decimal : "."
    }
}

