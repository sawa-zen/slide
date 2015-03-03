// 1
function complement() {
    this['PRED'] = _.toArray(arguments)[0];
    this['captures'] = this;
    return _.bind(function() {
        return !this['PRED'].apply(null, _.toArray(arguments));
    }, this['captures']);
}

function isEven(n) {
    return (n%2) === 0;
}

var isOdd = complement.call({}, isEven);


function showObj() {
    this['OBJ'] = _.toArray(arguments)[0];
    return _.bind(function() {
        return this['OBJ'];
    }, this);
}

var o = {a: 56};

var showO = showObj.call({}, o);

showO();
