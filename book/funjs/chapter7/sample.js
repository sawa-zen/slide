var _ = require('underscore');


// P26 存在の有無を明瞭にするための関数
function existy(X) {
	return X != null;
}

// P55 いくつかの引数を取り、それらを結合する関数
function cat(/* いくつかの配列 */) {
	var head = _.first(arguments);
	if (existy(head)) {
		return head.concat.apply(head, _.rest(arguments));
	} else {
		return [];
	}
}

// P55 要素と配列を引数にとり、
// 配列の前に要素を挿入する関数
function construct(head, tail) {
	return cat([head], _.toArray(tail));
}

// P141 渡された関数の一個目の引数を固定
function partial1(fun, arg1) {
	return function(/* arguments */) {
		var args = construct(arg1, arguments);
		// 配列のまま引数として渡したいのでapplyを使う
		return fun.apply(fun, args);
	};
}

// P102
function repeatedly(times, fun) {
	return _.map(_.range(times), fun);
}

//////////////

//function div(n, d) { 
//	return n / d;
//}
//
//var over10Part1 = partial1(div, 10);
//
//console.info(over10Part1(5));

///////////////

// _.random(min, max);
// _.random(1, max);に部分適用
var rand = partial1(_.random, 1);
console.info(rand(10));

console.log(repeatedly(10, partial1(rand, 10)));
