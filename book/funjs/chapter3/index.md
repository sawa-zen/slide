footer: SAWADA takayoshi (2015/2/11|2015/2/18) 第二回/第三回 Topotal輪読会
slidenumbers: true

##JavaScript における<br/>変数のスコープとクロージャ
###JavaScript で学ぶ関数型プログラミング 3章


---
#内容
- バインディングとスコープ
    - グローバルスコープ / 静的スコープ / 動的スコープ
    関数スコープ
- JavaScript におけるスコープのシミュレーション
- クロージャ
    - 自由変数 / クロージャのシミュレーション


---
#本章の目的
- スコープとクロージャについて理解し基礎を抑える
    __=> 次章以降の内容に大きく関わる__

---
## バインディングとスコープ

---
#バインディングとは?

- ある値をある名前に関連付ける動作のこと
    - var 宣言による変数の定義
    - 関数の引数
    - this の設定
    - プロパティのアサイン


---
#バインディングの例

```javascript

var book = {
    title: '星降りの夜', // プロパティのアサイン
    getTitle: function (subTitle) { //関数の引数
        var titleHead = 'タイトル:'; // var 宣言による変数の定義
        return String.format(
            '%s %s %s', titleHead, this.title, subTitle
        );
    }
};

// call による this の設定
book.getTitle.call({title: '世界樹物語'}, '異世界への旅');
//=> 'タイトル: 世界樹物語 異世界への旅'
```



---
#スコープとは?
- スコープは以下のような意味を持つ
    - this バインディングの値
    - this バインディングの値により定義される実行コンテクスト
    - 変数の「生存期間」
    - 変数値の解決の仕組み __->本書ではこれを意味するものとする__



---
#スコープの種類
- JavaScript のスコープにはいくつかのタイプが存在する
    - グローバルスコープ (global scope)
    - 静的スコープ (lexical scope)
    - 動的スコープ (dynamic scope)
    - 関数スコープ (function scope)



---
#グローバルスコープとは?

- JavaScript 内で一番生存範囲が大きなスコープ
    __=> 生存範囲が広い分、書換えられる危険性が高い__

```javascript

// var を伴わない変数の宣言
aGlobalVariable = 'Livin la vida global';
(function () {
    // どこからでも書換えが可能!!
    aGlobalVariable = 'hoge!';
    return; 
})();
aGlobalVariable;
//=> 'hoge!'

```

---
#静的スコープとは?
- 変数とその値を参照できる範囲

```javascript
aVariable = '外';
function aFun() {
    var aVariable = '内';
    return _.map([1,2,3], function (num) {
        var aVariable = '最内';
        return [aVariable, num].join(' ');
    });
}
/** 出力される値を予想してみよう! **/
aFun();
//=>???
aVariable;
//=>???
```

---
#静的スコープとは?
- 呼出から最も近くでバインディングされいるものから順に参照

```javascript
aVariable = '外';
function aFun() {
    var aVariable = '内';
    return _.map([1,2,3], function (num) {
        var aVariable = '最内';
        return [aVariable, num].join(' ');
    });
}
/** 解答 **/
aFun();
//=> ['最内 1','最内 2','最内 3']
aVariable;
//=> 外
```


---
#動的スコープとは?
- 実行時における関数の呼び出され方により、スコープが変化するスコープ[^1] __=> this の参照がそれにあたる__

```javascript
function globalThis() {
    return this;
}

globalThis();
// => グローバルオブジェクト
globalThis.call('banana');
// => 'banana'
```

[^1]: [すぐに忘れる脳みそのためのメモ: レキシカルスコープとダイナミックスコープ](http://jutememo.blogspot.jp/2012/03/blog-post.html) 参照

---
#動的スコープが使われそうな例

```javascript
var hello = function (arg1, arg2){
    return this.calc(arg1, arg2);
};
var Add = {
    calc: function (arg1, arg2){
        return arg1 + arg2;
    }
};
var Mul = {
    calc: function (arg1, arg2){
        return arg1 * arg2;
    }
};
console.log(hello.apply(Add, [1, 2])); // => 3
console.log(hello.apply(Mul, [1, 2])); // => 2
```

---
#動的スコープのデメリットとその対策
- スコープが変化することにより混乱を招きやすい
    __=> `_.bind`[^2] or `_.bindAll`[^3] を使用することで固定値に設定ができる__

[^2]: _.bind(function, object, [*arguments]) function を object にバインドした関数を返す。返された関数はどのコンテクストで呼ばれても this の値として object を参照した状態で実行する。

[^3]: _.bindAll(object, *methodNames) methodNames で指定されたメソッドを、常に object にバインドし、どこで実行してもそれを this として実行するようになる。



---
#`_.bind` の例

```javascript
function globalThis() {
    return this;
}

// 実行時のthisを'nope'に固定！
var nopeThis = _.bind(globalThis, 'nope');

globalThis.call('banana');
// => 'nope'
```


---
#`_.bindAll` の例

```javascript
var target = {
    name: '正しい値',
    aux: function() { return this.name; },
    act: function() { return this.aux(); }
};

target.act.call('wat');
// TypeError: Object [object String] has no method 'aux'

// auxとactの実行時のthisをtargetに固定!
_.bindAll(target, 'aux', 'act');

target.act.call('wat');
// => '正しい値'
// これで動的スコープがもたらす危険から救われた！ ( (0) / (0)) ☆祝☆
```


---
#関数スコープとは?
- 関数内で var 宣言された変数の生存範囲

```javascript
var myname = "global";
 
function func() {
    console.log(myname);    //出力内容は？
    var myname = "local";
    console.log(myname);    //出力内容は？
}
 
func();
```


---
#関数スコープとは?
__[解答]__

```javascript
var myname = "global";
 
function func() {
    console.log(myname);    // => undefiend
    var myname = "local";
    console.log(myname);    // => 'local'
}
 
func();
```


---
#関数スコープとは?
__[解答]__

```javascript
var myname = "global";
 
function func() {
    console.log(myname);    // => undefiend??????????
    var myname = "local";
    console.log(myname);    // => 'local'
}
 
func();
```


---
#なぜこうなるのか?
- JavaScript では、関数内で宣言されたローカル変数は、すべてその関数の先頭で宣言されたものとみなされるから[^4]
    __=> これを「変数の巻き上げ」と呼ぶ__


[^4]: [ANALOGIC: 知らないと怖い「変数の巻き上げ」とは？](http://analogic.jp/hoisting/) 参照


---
##JavaScript における<br/>スコープのシミュレーション


---
#スコープはどうやって実装されてるの?
- 巨大なテーブル[^5]が１つ存在しその値を参照している
    - 名前と名前に紐付いている値のペアが格納されている

```javascript

// テーブルのイメージ
var globals = {
    key1: ['val1', 'val2'],
    key2: ['val1', 'val2', 'val3'],
    key3: ['val1', 'val2', 'val3', 'val4']
};

```

[^5]: どの JavaScript エンジンにもルックアップテーブルは存在します



---
#動的スコープのシミュレーション実装

```javascript
var globals = {}; // ルックアップテーブルを用意

function makeBindFun(resolver) {
    return function(k, v) {
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        return globals;
    };
}

// スタックへ値をバインディング
var stackBinder = makeBindFun(function(stack, v) {
    stack.push(v);
    return stack;
});

// スタックの最上部の値を削除
var stackUnbinder = makeBindFun(function(stack) {
    stack.pop();
    return stack;
});
```


---

```javascript
var dynamicLookup = function(k) {
    var slot = globals[k] || [];
    return _.last(slot);
};

stackBinder('a', 1);
stackBinder('b', 100);

dynamicLookup('a'); // => 1

globals;
// => {'a': [1], 'b': [100]}

stackBinder('a', '*');
dynamicLookup('a'); // => '*'
globals;
// => {'a': [1, '*'], 'b': [100]}


```


---
#動的スコープのシミュレーションの考察

- それぞれのキーと関連付けられたスタックを管理できる
    - 変数宣言時のようなスタックへの push
    - コンテクスト終了時のようなスタックの pop


---
#関数スコープのシミュレーション実装
- 以下の変数 i のスコープをthisを使って再現してみましょう

```javascript

function strangeIdentity(n) {
    // 意図的に変なコードを書いています
    for(var i=0; i<n; i++);
    return i;
}
 
strangeIdentity(108);
// => 108

```

---
- まずは変数 i を this のプロパティとして変換してみる

```javascript

function strangeIdentity(n) {
    // 意図的に変なコードを書いています
    for(this['i']=0; this['i']<n; this['i']++);
    return this['i'];
}
 
strangeIdentity(108);
// => 108

```

---
- thisを使って同じ結果を再現出来たが__問題有り__
    __=> ローカル変数のはずがグローバル変数の動きをしている__

```javascript

function strangeIdentity(n) {
    // 意図的に変なコードを書いています
    for(this['i']=0; this['i']<n; this['i']++);
    return this['i'];
}
 
strangeIdentity(108); // => 108

i; // => 108   Σq|ﾟДﾟ|p ﾜｵｫ

```

---
#ではどうするか?
- 実行時に空 object を渡して生存範囲を関数内に抑えてあげよう

```javascript

strangeIdentity.call({}, 10000);
// => 10000

i;
// => 108   
// やったね!( (0) / (0)) ☆祝☆

```

__=> 前の 108 は残ったがこれ以上の書換えを防ぐことができた__

---
#関数スコープのシミュレーションの考察
- 新たにテーブルを関数に渡す事でローカル変数の再現ができた

しかし...

---
#関数スコープのシミュレーションの考察
- 新たにテーブルを関数に渡す事でローカル変数の再現ができた
- 関数内の変数にしかアクセス出来ない
    __=> まだ擬似スコープを実装できたとは言えない__
   

---
#ではどうするか?
- 空 object ではなくコピーしたグローバルコンテクストを渡そう

```javascript
function f() {
    this['a'] = 200;
    return this['a'] + this['b'];
}

var globals = {'b': 2};

f.call(_.clone(globals));
// => 202

// グローバルコンテクストが書換えられていない事を確認
globals;
// => {'b': 2}

```

---
#スコープのシミュレートの考察
- _.clone[^6] を使用することで関数よりも外の変数を参照できた

    __=> スコープの動作の模写をより近いものにできた__


[^6]: _.clone(object) オブジェクトobjectを「浅くコピー」したものを返す。入れ子になっているオブジェクトや配列は参照がコピーされ、それらの実体は複製されない。


---
#クロージャ


---

#クロージャとは?

- 関数内で定義された値を後に使用できるように確保する関数
例えばローカル変数

```javascript
// 変数を確保するクロージャ
function whatWasTheLocal() {
    var CAPTURED = 'あ、こんにちは。';
    return function() {
        return 'ローカル変数: ' + CAPTURED; 
    };
}
var reportLocal = whatWasTheLocal();

reportLocal();
// => 'ローカル変数: あ、こんにちは。'
```


---
- 引数として渡した値も同様に確保できる

```javascript
function createScaleFunction(FACTOR) {
    return function(v) {
        return _.map(v, function(n) {
            return (n * FACTOR);
        });
    };
}

var scale10 = createScaleFunction(10);

scale10([1,2,3]);
// => [10, 20, 30]
```
__これらのクロージャによって確保される変数を自由変数と言う__

---
# クロージャを見てみて
- 外側の関数の実行後に寿命を終えるはずの変数が内側の関数によって守られているように見える




---
# クロージャを見てみて
- 外側の関数の実行後に寿命を終えるはずの変数が内側の関数によって守られているように見える
    __=>なぜ？？？？？__


---
# クロージャを見てみて
- 外側の関数の実行後に寿命を終えるはずの変数が内側の関数によって守られているように見える
	__=>this を使ってクロージャをシミュレートできる__


---
# クロージャのシミュレーション
- 以下のコードで考えてみる

```javascript
function makeAdder(CAPTURED) {
    return function(free) {
        return free + CAPTURED;
    };
}

var add10 = makeAdder(10);

add10(20);
// => 30
```

---
# クロージャのシミュレーション
- まずは変数を ``this`` に置き換えてみる

```javascript
function makeAdder() {
    this['CAPTURED'] = _.toArray(arguments)[0];
    return function(free) {
        return free + this['CAPTURED'];
    };
}

var add10 = makeAdder.call({}, 10);

add10(20);
// => ??????
```

---
# クロージャのシミュレーション
- まずは変数を ``this`` に置き換えてみる

```javascript
function makeAdder() {
    this['CAPTURED'] = _.toArray(arguments)[0];
    return function(free) {
        return free + this['CAPTURED'];
    };
}

var add10 = makeAdder.call({}, 10);

add10(20);
// => NaN (゜o゜;!!!!!!!!!!!!?????????
```

---
# なぜNaNになってしまうのか
- 内側の関数の ``this`` はグローバルを指してしまっているから

``this['CAPTURED']`` が存在しないために ``undefiend`` になった

```javascript
20 + undefined;
// => NaN
```
どうしよう...


---
# なぜNaNになってしまうのか
- 内側の関数の ``this`` はグローバルを指してしまっているから

``this['CAPTURED']`` が存在しないために ``undefiend`` になった

```javascript
20 + undefined;
// => NaN
```
どうしよう...
__そうだ! ``bind`` で ``this`` を固定しよう！__


---
# クロージャのシミュレーション
- ``bind`` を使って ``this`` を縛る

```javascript
function makeAdder() {
    this['CAPTURED'] = _.toArray(arguments)[0];
    return _.bind(function(free) {
        return free + this['CAPTURED'];
    }, this);
}

var add10 = makeAdder.call({}, 10);

add10(20);
// => 30   やったね!( (0) / (0)) ☆祝☆
```

---
# おや？


---
```javascript
function makeAdder() {
    this['CAPTURED'] = _.toArray(arguments)[0];
    return _.bind(function(free) {
        return free + this['CAPTURED'];
    }, this);
}

var add10 = makeAdder.call({}, 10);
add10(20);  // => 30 
add10(100); // => 110

var add20 = makeAdder.call({}, 20);
add20(20);  // => 40 
add20(100); // => 120
```
<br/>

---
```javascript
function makeAdder() {
    this['CAPTURED'] = _.toArray(arguments)[0];
    return _.bind(function(free) {
        return free + this['CAPTURED'];
    }, this);
}

var add10 = makeAdder.call({}, 10);
add10(20);  // => 30 
add10(100); // => 110

var add20 = makeAdder.call({}, 20);
add20(20);  // => 40 
add20(100); // => 120
```
クロージャのシミュレートができてしまった...!!!


---
# クロージャのシミュレーションの考察
- ``bind`` を使用することで内側の関数の ``this`` を固定できた
	__=> ``this`` を固定したことにより変数の確保を実現できた__



---
# 抽象としてのクロージャ
- クロージャは変数を確保すると同時に抽象を提供してくれる
__=> 自由変数は「設定情報」として考える事ができる__


---
# 例えば..
- 以下の ``plucker`` 関数は obj の中の指定されたキーの値を返す

```javascript
function plucker(FIELD) {
	return function(obj) {
		return (obj && obj[FIELD]);
	};
}

var bestNobel = {title: "Infinite Jest", author: "DFW"};

var getTitle = plucker('title'); // 設定情報に'title'を設定

getTitle(bestNobel); // => "Infinite Jest"
```

---
- もちろん配列が渡されてもOK

```javascript
var books = [
	{title: "Chthon"},
	{stars: 5},
	{title: "Botchan"}
];

// 設定情報に 2(3番目) を設定
var third = plucker(2);

third(books);
// => {title: "Botchan"}
```

---
# ``plucker`` 関数の考察
- 設定情報に title を設定したことで、タイトルを返してくれる ``getTitle`` 関数が ``plucker`` によって生み出された
- 設定情報に 2 を設定したことで、配列の3番目を返してくれる ``third`` 関数が ``plucker`` によって生み出された

---
# ``plucker`` 関数の考察
- 設定情報に title を設定したことで、タイトルを返してくれる ``getTitle`` 関数が ``plucker`` によって生み出された
- 設定情報に 2 を設定したことで、配列の3番目を返してくれる ``third`` 関数が ``plucker`` によって生み出された

## __=>抽象化された関数 ``plucker`` を定義することができた__


---
#まとめ

- スコープについて学び仕組みを知る事で参照の理解を深めた
	- 静的 / 動的 / 関数スコープ
- クロージャの特性を知り、抽象を得るための使用方法を学んだ
	- 変数の確保
	- 自由変数をつかった抽象化された関数の定義





