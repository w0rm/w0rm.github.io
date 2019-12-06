(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.bV.aH === region.cf.aH)
	{
		return 'on line ' + region.bV.aH;
	}
	return 'on lines ' + region.bV.aH + ' through ' + region.cf.aH;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return $elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return $elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? $elm$core$Result$Ok(value)
				: (value instanceof String)
					? $elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return $elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.co,
		impl.c3,
		impl.dY,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		K: func(record.K),
		bW: record.bW,
		bO: record.bO
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.K;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bW;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bO) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.co,
		impl.c3,
		impl.dY,
		function(sendToApp, initialModel) {
			var view = impl.c5;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.co,
		impl.c3,
		impl.dY,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bT && impl.bT(sendToApp)
			var view = impl.c5;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dd);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.dZ) && (_VirtualDom_doc.title = title = doc.dZ);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.dH;
	var onUrlRequest = impl.dI;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bT: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cU === next.cU
							&& curr.cm === next.cm
							&& curr.cR.a === next.cR.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		co: function(flags)
		{
			return A3(impl.co, flags, _Browser_getUrl(), key);
		},
		c5: impl.c5,
		c3: impl.c3,
		dY: impl.dY
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { dr: 'hidden', aw: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dr: 'mozHidden', aw: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dr: 'msHidden', aw: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dr: 'webkitHidden', aw: 'webkitvisibilitychange' }
		: { dr: 'hidden', aw: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cY: _Browser_getScene(),
		c7: {
			bk: _Browser_window.pageXOffset,
			bl: _Browser_window.pageYOffset,
			as: _Browser_doc.documentElement.clientWidth,
			af: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		as: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		af: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cY: {
				as: node.scrollWidth,
				af: node.scrollHeight
			},
			c7: {
				bk: node.scrollLeft,
				bl: node.scrollTop,
				as: node.clientWidth,
				af: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cY: _Browser_getScene(),
			c7: {
				bk: x,
				bl: y,
				as: _Browser_doc.documentElement.clientWidth,
				af: _Browser_doc.documentElement.clientHeight
			},
			dm: {
				bk: x + rect.left,
				bl: y + rect.top,
				as: rect.width,
				af: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.g) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.j),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.j);
		} else {
			var treeLen = builder.g * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.k) : builder.k;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.g);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.j) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.j);
		}
	});
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{k: nodeList, g: (len / $elm$core$Array$branchFactor) | 0, j: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$img = _VirtualDom_node('img');
var $w0rm$elm_slice_show$SliceShow$State$Inactive = 0;
var $w0rm$elm_slice_show$SliceShow$ContentData$Item = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $w0rm$elm_slice_show$SliceShow$Content$item = $w0rm$elm_slice_show$SliceShow$ContentData$Item(0);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Formatting$image = F3(
	function (w, h, url) {
		return $w0rm$elm_slice_show$SliceShow$Content$item(
			A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src(url),
						$elm$html$Html$Attributes$width(w),
						$elm$html$Html$Attributes$height(h)
					]),
				_List_Nil));
	});
var $elm$html$Html$a = _VirtualDom_node('a');
var $w0rm$elm_slice_show$SliceShow$ContentData$Container = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $w0rm$elm_slice_show$SliceShow$Content$container = $w0rm$elm_slice_show$SliceShow$ContentData$Container(0);
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Formatting$link = F2(
	function (url, content) {
		return A2(
			$w0rm$elm_slice_show$SliceShow$Content$container,
			$elm$html$Html$a(
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'color', 'inherit'),
						$elm$html$Html$Attributes$href(url)
					])),
			_List_fromArray(
				[content]));
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Formatting$position = F3(
	function (left, top, content) {
		return A2(
			$w0rm$elm_slice_show$SliceShow$Content$container,
			$elm$html$Html$div(
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$elm$core$String$fromInt(left) + 'px'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$elm$core$String$fromInt(top) + 'px')
					])),
			_List_fromArray(
				[content]));
	});
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Formatting$text = function (txt) {
	return $w0rm$elm_slice_show$SliceShow$Content$item(
		A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font', '48px sans-serif')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(txt)
				])));
};
var $author$project$Main$blueprint = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		210,
		20,
		A3($author$project$Formatting$image, (2560 / 3) | 0, (1600 / 3) | 0, 'assets/blueprint.jpg')),
		A3(
		$author$project$Formatting$position,
		208,
		595,
		$author$project$Formatting$text('設計図')),
		A3(
		$author$project$Formatting$position,
		410,
		600,
		A2(
			$author$project$Formatting$link,
			'https://www.thingiverse.com/thing:2839405/',
			$author$project$Formatting$text('thingiverse.com/thing:2839405')))
	]);
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Formatting$title = function (txt) {
	return $w0rm$elm_slice_show$SliceShow$Content$item(
		A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font', 'bold 48px sans-serif'),
					A2($elm$html$Html$Attributes$style, 'margin', '1em 0')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(txt)
				])));
};
var $author$project$Main$demo = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		300,
		300,
		A2(
			$author$project$Formatting$link,
			'https://unsoundscapes.com/slides/2019-12-07-how-to-flip-a-table-with-elm/lack.html',
			$author$project$Formatting$title('「ちゃぶ台返し」しましょう！')))
	]);
var $author$project$Main$ikea = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		110,
		50,
		A3($author$project$Formatting$image, (2022 / 2) | 0, (1307 / 2) | 0, 'assets/ikea.jpg'))
	]);
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $w0rm$elm_slice_show$SliceShow$Protected$Protected = $elm$core$Basics$identity;
var $w0rm$elm_slice_show$SliceShow$Model$init = F2(
	function (slides, key) {
		return {dj: $elm$core$Maybe$Nothing, af: 0, cp: key, V: slides, as: 0};
	});
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $w0rm$elm_slice_show$SliceShow$init = function (slides) {
	return {
		S: $w0rm$elm_slice_show$SliceShow$Model$init(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var data = _v0;
					return data;
				},
				slides)),
		dY: function (_v1) {
			return $elm$core$Platform$Sub$none;
		},
		c3: F2(
			function (_v2, a) {
				return _Utils_Tuple2(a, $elm$core$Platform$Cmd$none);
			}),
		c5: function (_v3) {
			return $elm$html$Html$text('');
		}
	};
};
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $author$project$Schema$Display = 4;
var $author$project$Schema$End = 0;
var $author$project$Schema$MouseDown = 1;
var $author$project$Schema$MouseRay = 2;
var $author$project$Schema$Table = 0;
var $author$project$Schema$White = 0;
var $ianmackenzie$elm_geometry$Geometry$Types$Circle2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0;
	return $elm$core$Basics$abs(value);
};
var $ianmackenzie$elm_geometry$Circle2d$withRadius = F2(
	function (givenRadius, givenCenterPoint) {
		return {
			b5: givenCenterPoint,
			dK: $ianmackenzie$elm_units$Quantity$abs(givenRadius)
		};
	});
var $ianmackenzie$elm_geometry$Circle2d$atPoint = F2(
	function (givenCenterPoint, givenRadius) {
		return A2($ianmackenzie$elm_geometry$Circle2d$withRadius, givenRadius, givenCenterPoint);
	});
var $elm$core$Basics$pi = _Basics_pi;
var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return numRadians;
};
var $ianmackenzie$elm_units$Angle$degrees = function (numDegrees) {
	return $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi * (numDegrees / 180));
};
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Geometry$Types$Vector3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector3d$cross = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {bk: (v1.bl * v2.bm) - (v1.bm * v2.bl), bl: (v1.bm * v2.bk) - (v1.bk * v2.bm), bm: (v1.bk * v2.bl) - (v1.bl * v2.bk)};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction3d = $elm$core$Basics$identity;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $ianmackenzie$elm_geometry$Vector3d$direction = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.bk),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.bl),
			$elm$core$Basics$abs(v.bm)));
	if (!largestComponent) {
		return $elm$core$Maybe$Nothing;
	} else {
		var scaledZ = v.bm / largestComponent;
		var scaledY = v.bl / largestComponent;
		var scaledX = v.bk / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $elm$core$Maybe$Just(
			{bk: scaledX / scaledLength, bl: scaledY / scaledLength, bm: scaledZ / scaledLength});
	}
};
var $ianmackenzie$elm_geometry$Vector3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		return {bk: p2.bk - p1.bk, bl: p2.bl - p1.bl, bm: p2.bm - p1.bm};
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$dot = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return ((v1.bk * v2.bk) + (v1.bl * v2.bl)) + (v1.bm * v2.bm);
	});
var $ianmackenzie$elm_units$Quantity$greaterThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > 0;
	});
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 0;
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {bk: v1.bk - v2.bk, bl: v1.bl - v2.bl, bm: v1.bm - v2.bm};
	});
var $ianmackenzie$elm_geometry$Vector3d$projectionIn = F2(
	function (_v0, _v1) {
		var d = _v0;
		var v = _v1;
		var projectedLength = ((v.bk * d.bk) + (v.bl * d.bl)) + (v.bm * d.bm);
		return {bk: d.bk * projectedLength, bl: d.bl * projectedLength, bm: d.bm * projectedLength};
	});
var $ianmackenzie$elm_geometry$Vector3d$reverse = function (_v0) {
	var v = _v0;
	return {bk: -v.bk, bl: -v.bl, bm: -v.bm};
};
var $ianmackenzie$elm_units$Quantity$zero = 0;
var $ianmackenzie$elm_geometry$Vector3d$zero = {bk: 0, bl: 0, bm: 0};
var $ianmackenzie$elm_geometry$Direction3d$orthonormalize = F3(
	function (xVector, xyVector, xyzVector) {
		return A2(
			$elm$core$Maybe$andThen,
			function (xDirection) {
				var yVector = A2(
					$ianmackenzie$elm_geometry$Vector3d$minus,
					A2($ianmackenzie$elm_geometry$Vector3d$projectionIn, xDirection, xyVector),
					xyVector);
				return A2(
					$elm$core$Maybe$andThen,
					function (yDirection) {
						var rightHandedZVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, xyVector, xVector);
						var tripleProduct = A2($ianmackenzie$elm_geometry$Vector3d$dot, xyzVector, rightHandedZVector);
						var zVector = A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? rightHandedZVector : (A2($ianmackenzie$elm_units$Quantity$lessThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? $ianmackenzie$elm_geometry$Vector3d$reverse(rightHandedZVector) : $ianmackenzie$elm_geometry$Vector3d$zero);
						return A2(
							$elm$core$Maybe$map,
							function (zDirection) {
								return _Utils_Tuple3(xDirection, yDirection, zDirection);
							},
							$ianmackenzie$elm_geometry$Vector3d$direction(zVector));
					},
					$ianmackenzie$elm_geometry$Vector3d$direction(yVector));
			},
			$ianmackenzie$elm_geometry$Vector3d$direction(xVector));
	});
var $ianmackenzie$elm_geometry$Direction3d$perpendicularTo = function (_v0) {
	var d = _v0;
	var absZ = $elm$core$Basics$abs(d.bm);
	var absY = $elm$core$Basics$abs(d.bl);
	var absX = $elm$core$Basics$abs(d.bk);
	if (_Utils_cmp(absX, absY) < 1) {
		if (_Utils_cmp(absX, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.bm * d.bm) + (d.bl * d.bl));
			return {bk: 0, bl: (-d.bm) / scale, bm: d.bl / scale};
		} else {
			var scale = $elm$core$Basics$sqrt((d.bl * d.bl) + (d.bk * d.bk));
			return {bk: (-d.bl) / scale, bl: d.bk / scale, bm: 0};
		}
	} else {
		if (_Utils_cmp(absY, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.bm * d.bm) + (d.bk * d.bk));
			return {bk: d.bm / scale, bl: 0, bm: (-d.bk) / scale};
		} else {
			var scale = $elm$core$Basics$sqrt((d.bk * d.bk) + (d.bl * d.bl));
			return {bk: (-d.bl) / scale, bl: d.bk / scale, bm: 0};
		}
	}
};
var $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis = function (direction) {
	var xDirection = $ianmackenzie$elm_geometry$Direction3d$perpendicularTo(direction);
	var _v0 = xDirection;
	var dX = _v0;
	var _v1 = direction;
	var d = _v1;
	var yDirection = {bk: (d.bl * dX.bm) - (d.bm * dX.bl), bl: (d.bm * dX.bk) - (d.bk * dX.bm), bm: (d.bk * dX.bl) - (d.bl * dX.bk)};
	return _Utils_Tuple2(xDirection, yDirection);
};
var $ianmackenzie$elm_geometry$Direction3d$toVector = function (_v0) {
	var components = _v0;
	return components;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Frame3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Frame3d$unsafe = function (properties) {
	return properties;
};
var $ianmackenzie$elm_geometry$Frame3d$withZDirection = F2(
	function (givenZDirection, givenOrigin) {
		var _v0 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(givenZDirection);
		var computedXDirection = _v0.a;
		var computedYDirection = _v0.b;
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{bF: givenOrigin, b0: computedXDirection, b1: computedYDirection, b2: givenZDirection});
	});
var $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt = function (_arguments) {
	var zVector = A2($ianmackenzie$elm_geometry$Vector3d$from, _arguments.cj, _arguments.ci);
	var yVector = $ianmackenzie$elm_geometry$Direction3d$toVector(_arguments.c2);
	var xVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, zVector, yVector);
	var _v0 = A3($ianmackenzie$elm_geometry$Direction3d$orthonormalize, zVector, yVector, xVector);
	if (!_v0.$) {
		var _v1 = _v0.a;
		var normalizedZDirection = _v1.a;
		var normalizedYDirection = _v1.b;
		var normalizedXDirection = _v1.c;
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{bF: _arguments.ci, b0: normalizedXDirection, b1: normalizedYDirection, b2: normalizedZDirection});
	} else {
		var _v2 = $ianmackenzie$elm_geometry$Vector3d$direction(zVector);
		if (!_v2.$) {
			var zDirection = _v2.a;
			return A2($ianmackenzie$elm_geometry$Frame3d$withZDirection, zDirection, _arguments.ci);
		} else {
			var _v3 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(_arguments.c2);
			var arbitraryZDirection = _v3.a;
			var arbitraryXDirection = _v3.b;
			return $ianmackenzie$elm_geometry$Frame3d$unsafe(
				{bF: _arguments.ci, b0: arbitraryXDirection, b1: _arguments.c2, b2: arbitraryZDirection});
		}
	}
};
var $ianmackenzie$elm_units$Length$meters = function (numMeters) {
	return numMeters;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Point3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Point3d$meters = F3(
	function (x, y, z) {
		return {bk: x, bl: y, bm: z};
	});
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_units$Quantity$half = function (_v0) {
	var value = _v0;
	return 0.5 * value;
};
var $ianmackenzie$elm_geometry$Point3d$along = F2(
	function (_v0, _v1) {
		var axis = _v0;
		var distance = _v1;
		var _v2 = axis.bF;
		var p0 = _v2;
		var _v3 = axis.w;
		var d = _v3;
		return {bk: p0.bk + (distance * d.bk), bl: p0.bl + (distance * d.bl), bm: p0.bm + (distance * d.bm)};
	});
var $ianmackenzie$elm_units$Quantity$negate = function (_v0) {
	var value = _v0;
	return -value;
};
var $ianmackenzie$elm_geometry$Direction3d$reverse = function (_v0) {
	var d = _v0;
	return {bk: -d.bk, bl: -d.bl, bm: -d.bm};
};
var $ianmackenzie$elm_geometry$Geometry$Types$Plane3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Plane3d$through = F2(
	function (givenPoint, givenNormalDirection) {
		return {dG: givenNormalDirection, bF: givenPoint};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Axis3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Axis3d$through = F2(
	function (givenPoint, givenDirection) {
		return {w: givenDirection, bF: givenPoint};
	});
var $ianmackenzie$elm_geometry$Frame3d$zAxis = function (_v0) {
	var frame = _v0;
	return A2($ianmackenzie$elm_geometry$Axis3d$through, frame.bF, frame.b2);
};
var $ianmackenzie$elm_geometry$Frame3d$zDirection = function (_v0) {
	var properties = _v0;
	return properties.b2;
};
var $ianmackenzie$elm_3d_camera$Camera3d$offsetClipPlane = F2(
	function (_v0, depth) {
		var frame = _v0;
		return A2(
			$ianmackenzie$elm_geometry$Plane3d$through,
			A2(
				$ianmackenzie$elm_geometry$Point3d$along,
				$ianmackenzie$elm_geometry$Frame3d$zAxis(frame),
				$ianmackenzie$elm_units$Quantity$negate(depth)),
			$ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_geometry$Frame3d$zDirection(frame)));
	});
var $elm$core$Basics$tan = _Basics_tan;
var $ianmackenzie$elm_units$Angle$tan = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$tan(angle);
};
var $ianmackenzie$elm_3d_camera$Camera3d$perspective = function (_arguments) {
	var halfFieldOfView = $ianmackenzie$elm_units$Quantity$half(
		$ianmackenzie$elm_units$Quantity$abs(_arguments.c4));
	var frustumSlope = $ianmackenzie$elm_units$Angle$tan(halfFieldOfView);
	var absoluteClipDepth = $ianmackenzie$elm_units$Quantity$abs(_arguments.b8);
	return {
		b8: absoluteClipDepth,
		bn: A2($ianmackenzie$elm_3d_camera$Camera3d$offsetClipPlane, _arguments.c6, absoluteClipDepth),
		ba: $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective(frustumSlope),
		c6: _arguments.c6
	};
};
var $ianmackenzie$elm_geometry$Direction3d$unsafe = function (components) {
	return components;
};
var $ianmackenzie$elm_geometry$Direction3d$positiveZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bk: 0, bl: 0, bm: 1});
var $author$project$Schema$camera = $ianmackenzie$elm_3d_camera$Camera3d$perspective(
	{
		b8: $ianmackenzie$elm_units$Length$meters(0.1),
		c4: $ianmackenzie$elm_units$Angle$degrees(24),
		c6: $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt(
			{
				ci: A3($ianmackenzie$elm_geometry$Point3d$meters, 3.05, 4.2, 2.1),
				cj: A3($ianmackenzie$elm_geometry$Point3d$meters, 0.3, -0.7, 0),
				c2: $ianmackenzie$elm_geometry$Direction3d$positiveZ
			})
	});
var $author$project$Schema$eyePoint = A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 4, 2);
var $ianmackenzie$elm_geometry$Geometry$Types$LineSegment2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$LineSegment2d$from = F2(
	function (startPoint_, endPoint_) {
		return $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints(
			_Utils_Tuple2(startPoint_, endPoint_));
	});
var $ianmackenzie$elm_geometry$Geometry$Types$LineSegment3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$LineSegment3d$fromEndpoints = function (givenEndpoints) {
	return givenEndpoints;
};
var $ianmackenzie$elm_geometry$LineSegment3d$from = F2(
	function (givenStartPoint, givenEndPoint) {
		return $ianmackenzie$elm_geometry$LineSegment3d$fromEndpoints(
			_Utils_Tuple2(givenStartPoint, givenEndPoint));
	});
var $ianmackenzie$elm_geometry$Direction3d$componentIn = F2(
	function (_v0, _v1) {
		var d2 = _v0;
		var d1 = _v1;
		return ((d1.bk * d2.bk) + (d1.bl * d2.bl)) + (d1.bm * d2.bm);
	});
var $ianmackenzie$elm_geometry$Axis3d$direction = function (_v0) {
	var axis = _v0;
	return axis.w;
};
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0;
		return scale * value;
	});
var $ianmackenzie$elm_geometry$Axis3d$originPoint = function (_v0) {
	var axis = _v0;
	return axis.bF;
};
var $ianmackenzie$elm_geometry$Point3d$signedDistanceFrom = F2(
	function (_v0, _v1) {
		var plane = _v0;
		var p = _v1;
		var _v2 = plane.bF;
		var p0 = _v2;
		var _v3 = plane.dG;
		var n = _v3;
		return (((p.bk - p0.bk) * n.bk) + ((p.bl - p0.bl) * n.bl)) + ((p.bm - p0.bm) * n.bm);
	});
var $ianmackenzie$elm_geometry$Point3d$translateIn = F3(
	function (_v0, _v1, _v2) {
		var d = _v0;
		var distance = _v1;
		var p = _v2;
		return {bk: p.bk + (distance * d.bk), bl: p.bl + (distance * d.bl), bm: p.bm + (distance * d.bm)};
	});
var $ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane = F2(
	function (plane, axis) {
		var axisDirection = $ianmackenzie$elm_geometry$Axis3d$direction(axis);
		var _v0 = plane;
		var normalDirection = _v0.dG;
		var normalComponent = A2($ianmackenzie$elm_geometry$Direction3d$componentIn, normalDirection, axisDirection);
		if (!normalComponent) {
			return $elm$core$Maybe$Nothing;
		} else {
			var axisOrigin = $ianmackenzie$elm_geometry$Axis3d$originPoint(axis);
			var normalDistance = A2($ianmackenzie$elm_geometry$Point3d$signedDistanceFrom, plane, axisOrigin);
			var axialDistance = A2($ianmackenzie$elm_units$Quantity$multiplyBy, (-1) / normalComponent, normalDistance);
			return $elm$core$Maybe$Just(
				A3($ianmackenzie$elm_geometry$Point3d$translateIn, axisDirection, axialDistance, axisOrigin));
		}
	});
var $ianmackenzie$elm_geometry$Direction3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		var deltaZ = p2.bm - p1.bm;
		var deltaY = p2.bl - p1.bl;
		var deltaX = p2.bk - p1.bk;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(deltaX),
			A2(
				$elm$core$Basics$max,
				$elm$core$Basics$abs(deltaY),
				$elm$core$Basics$abs(deltaZ)));
		if (!largestComponent) {
			return $elm$core$Maybe$Nothing;
		} else {
			var scaledZ = deltaZ / largestComponent;
			var scaledY = deltaY / largestComponent;
			var scaledX = deltaX / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
			return $elm$core$Maybe$Just(
				{bk: scaledX / scaledLength, bl: scaledY / scaledLength, bm: scaledZ / scaledLength});
		}
	});
var $author$project$Schema$raycastPoint = A3($ianmackenzie$elm_geometry$Point3d$meters, 0.2749908595123403, 0.01770722162219407, 0.41410641712205626);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $ianmackenzie$elm_geometry$Direction3d$z = $ianmackenzie$elm_geometry$Direction3d$positiveZ;
var $author$project$Schema$mouseRay1 = A2(
	$ianmackenzie$elm_geometry$Axis3d$through,
	$author$project$Schema$eyePoint,
	A2(
		$elm$core$Maybe$withDefault,
		$ianmackenzie$elm_geometry$Direction3d$z,
		A2($ianmackenzie$elm_geometry$Direction3d$from, $author$project$Schema$eyePoint, $author$project$Schema$raycastPoint)));
var $ianmackenzie$elm_geometry$Point3d$origin = {bk: 0, bl: 0, bm: 0};
var $author$project$Schema$focalPoint = A3($ianmackenzie$elm_geometry$Point3d$meters, -0.5, -0.5, 0);
var $author$project$Schema$cameraDirection = A2(
	$elm$core$Maybe$withDefault,
	$ianmackenzie$elm_geometry$Direction3d$z,
	A2($ianmackenzie$elm_geometry$Direction3d$from, $author$project$Schema$eyePoint, $author$project$Schema$focalPoint));
var $author$project$Schema$screenPlane = A2(
	$ianmackenzie$elm_geometry$Plane3d$through,
	A3(
		$ianmackenzie$elm_geometry$Point3d$translateIn,
		$author$project$Schema$cameraDirection,
		$ianmackenzie$elm_units$Length$meters(0.1),
		$author$project$Schema$eyePoint),
	$author$project$Schema$cameraDirection);
var $author$project$Schema$mouseDownPoint = A2(
	$elm$core$Maybe$withDefault,
	$ianmackenzie$elm_geometry$Point3d$origin,
	A2($ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane, $author$project$Schema$screenPlane, $author$project$Schema$mouseRay1));
var $ianmackenzie$elm_geometry$Geometry$Types$Point2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Point2d$origin = {bk: 0, bl: 0};
var $ianmackenzie$elm_units$Pixels$pixels = function (numPixels) {
	return numPixels;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Rectangle2d = $elm$core$Basics$identity;
var $elm$core$Basics$ge = _Utils_ge;
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > -1;
	});
var $ianmackenzie$elm_units$Quantity$midpoint = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x + (0.5 * (y - x));
	});
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x - y;
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Direction2d$negativeX = {bk: -1, bl: 0};
var $ianmackenzie$elm_geometry$Direction2d$negativeY = {bk: 0, bl: -1};
var $ianmackenzie$elm_geometry$Direction2d$positiveX = {bk: 1, bl: 0};
var $ianmackenzie$elm_geometry$Direction2d$positiveY = {bk: 0, bl: 1};
var $ianmackenzie$elm_geometry$Geometry$Types$Frame2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Frame2d$unsafe = function (properties) {
	return properties;
};
var $ianmackenzie$elm_geometry$Point2d$xy = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return {bk: x, bl: y};
	});
var $ianmackenzie$elm_geometry$Rectangle2d$axisAligned = F4(
	function (x1, y1, x2, y2) {
		var computedYDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, y1, y2) ? $ianmackenzie$elm_geometry$Direction2d$positiveY : $ianmackenzie$elm_geometry$Direction2d$negativeY;
		var computedXDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, x1, x2) ? $ianmackenzie$elm_geometry$Direction2d$positiveX : $ianmackenzie$elm_geometry$Direction2d$negativeX;
		var computedDimensions = _Utils_Tuple2(
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, x1, x2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, y1, y2)));
		var computedCenterPoint = A2(
			$ianmackenzie$elm_geometry$Point2d$xy,
			A2($ianmackenzie$elm_units$Quantity$midpoint, x1, x2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, y1, y2));
		var computedAxes = $ianmackenzie$elm_geometry$Frame2d$unsafe(
			{bF: computedCenterPoint, b0: computedXDirection, b1: computedYDirection});
		return {db: computedAxes, v: computedDimensions};
	});
var $ianmackenzie$elm_geometry$Rectangle2d$with = function (_v0) {
	var x1 = _v0.d3;
	var y1 = _v0.d6;
	var x2 = _v0.d4;
	var y2 = _v0.d7;
	return A4($ianmackenzie$elm_geometry$Rectangle2d$axisAligned, x1, y1, x2, y2);
};
var $author$project$Schema$screen = $ianmackenzie$elm_geometry$Rectangle2d$with(
	{
		d3: $ianmackenzie$elm_units$Pixels$pixels(0),
		d4: $ianmackenzie$elm_units$Pixels$pixels(1280),
		d6: $ianmackenzie$elm_units$Pixels$pixels(720),
		d7: $ianmackenzie$elm_units$Pixels$pixels(0)
	});
var $ianmackenzie$elm_3d_camera$Camera3d$clipPlane = function (_v0) {
	var camera = _v0;
	return camera.bn;
};
var $ianmackenzie$elm_geometry$LineSegment3d$endpoints = function (_v0) {
	var lineSegmentEndpoints = _v0;
	return lineSegmentEndpoints;
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $ianmackenzie$elm_geometry$Point3d$interpolateFrom = F3(
	function (_v0, _v1, t) {
		var p1 = _v0;
		var p2 = _v1;
		return (t <= 0.5) ? {bk: p1.bk + (t * (p2.bk - p1.bk)), bl: p1.bl + (t * (p2.bl - p1.bl)), bm: p1.bm + (t * (p2.bm - p1.bm))} : {bk: p2.bk + ((1 - t) * (p1.bk - p2.bk)), bl: p2.bl + ((1 - t) * (p1.bl - p2.bl)), bm: p2.bm + ((1 - t) * (p1.bm - p2.bm))};
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x / y;
	});
var $ianmackenzie$elm_units$Quantity$times = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x * y;
	});
var $ianmackenzie$elm_geometry$LineSegment3d$intersectionWithPlane = F2(
	function (plane, lineSegment) {
		var _v0 = $ianmackenzie$elm_geometry$LineSegment3d$endpoints(lineSegment);
		var p1 = _v0.a;
		var p2 = _v0.b;
		var d1 = A2($ianmackenzie$elm_geometry$Point3d$signedDistanceFrom, plane, p1);
		var d2 = A2($ianmackenzie$elm_geometry$Point3d$signedDistanceFrom, plane, p2);
		var product = A2($ianmackenzie$elm_units$Quantity$times, d2, d1);
		if (A2($ianmackenzie$elm_units$Quantity$lessThan, $ianmackenzie$elm_units$Quantity$zero, product)) {
			var t = A2(
				$ianmackenzie$elm_units$Quantity$ratio,
				d1,
				A2($ianmackenzie$elm_units$Quantity$minus, d2, d1));
			return $elm$core$Maybe$Just(
				A3($ianmackenzie$elm_geometry$Point3d$interpolateFrom, p1, p2, t));
		} else {
			if (A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, product)) {
				return $elm$core$Maybe$Nothing;
			} else {
				if (!_Utils_eq(d1, $ianmackenzie$elm_units$Quantity$zero)) {
					return $elm$core$Maybe$Just(p2);
				} else {
					if (!_Utils_eq(d2, $ianmackenzie$elm_units$Quantity$zero)) {
						return $elm$core$Maybe$Just(p1);
					} else {
						if (_Utils_eq(p1, p2)) {
							return $elm$core$Maybe$Just(p1);
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}
				}
			}
		}
	});
var $ianmackenzie$elm_geometry$Frame2d$copy = function (_v0) {
	var properties = _v0;
	return properties;
};
var $ianmackenzie$elm_geometry$Rectangle2d$axes = function (_v0) {
	var rectangle = _v0;
	return $ianmackenzie$elm_geometry$Frame2d$copy(rectangle.db);
};
var $ianmackenzie$elm_geometry$Rectangle2d$dimensions = function (_v0) {
	var rectangle = _v0;
	return rectangle.v;
};
var $ianmackenzie$elm_geometry$Point3d$xCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var _v3 = frame.b0;
		var d = _v3;
		return (((p.bk - p0.bk) * d.bk) + ((p.bl - p0.bl) * d.bl)) + ((p.bm - p0.bm) * d.bm);
	});
var $ianmackenzie$elm_geometry$Point2d$xyIn = F3(
	function (_v0, _v1, _v2) {
		var frame = _v0;
		var x = _v1;
		var y = _v2;
		var _v3 = frame.bF;
		var p0 = _v3;
		var _v4 = frame.b1;
		var j = _v4;
		var _v5 = frame.b0;
		var i = _v5;
		return {bk: (p0.bk + (x * i.bk)) + (y * j.bk), bl: (p0.bl + (x * i.bl)) + (y * j.bl)};
	});
var $ianmackenzie$elm_geometry$Point3d$yCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var _v3 = frame.b1;
		var d = _v3;
		return (((p.bk - p0.bk) * d.bk) + ((p.bl - p0.bl) * d.bl)) + ((p.bm - p0.bm) * d.bm);
	});
var $ianmackenzie$elm_geometry$Point3d$zCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var _v3 = frame.b2;
		var d = _v3;
		return (((p.bk - p0.bk) * d.bk) + ((p.bl - p0.bl) * d.bl)) + ((p.bm - p0.bm) * d.bm);
	});
var $ianmackenzie$elm_3d_camera$Camera3d$Internal$unsafeProjection = F3(
	function (_v0, screen, point) {
		var camera = _v0;
		var _v1 = camera.c6;
		var viewpointFrame = _v1;
		var viewX = A2($ianmackenzie$elm_geometry$Point3d$xCoordinateIn, viewpointFrame, point);
		var viewY = A2($ianmackenzie$elm_geometry$Point3d$yCoordinateIn, viewpointFrame, point);
		var viewZ = A2($ianmackenzie$elm_geometry$Point3d$zCoordinateIn, viewpointFrame, point);
		var depth = $ianmackenzie$elm_units$Quantity$negate(viewZ);
		var _v2 = $ianmackenzie$elm_geometry$Rectangle2d$dimensions(screen);
		var screenWidth = _v2.a;
		var screenHeight = _v2.b;
		var aspectRatio = A2($ianmackenzie$elm_units$Quantity$ratio, screenWidth, screenHeight);
		var _v3 = camera.ba;
		if (!_v3.$) {
			var frustumSlope = _v3.a;
			var ndcY = A2($ianmackenzie$elm_units$Quantity$ratio, viewY, depth) / frustumSlope;
			var ndcX = A2($ianmackenzie$elm_units$Quantity$ratio, viewX, depth) / (aspectRatio * frustumSlope);
			return A3(
				$ianmackenzie$elm_geometry$Point2d$xyIn,
				$ianmackenzie$elm_geometry$Rectangle2d$axes(screen),
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, ndcX / 2, screenWidth),
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, ndcY / 2, screenHeight));
		} else {
			var viewportHeight = _v3.a;
			var halfNdcY = A2($ianmackenzie$elm_units$Quantity$ratio, viewY, viewportHeight);
			var halfNdcX = A2(
				$ianmackenzie$elm_units$Quantity$ratio,
				viewX,
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, aspectRatio, viewportHeight));
			return A3(
				$ianmackenzie$elm_geometry$Point2d$xyIn,
				$ianmackenzie$elm_geometry$Rectangle2d$axes(screen),
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, halfNdcX, screenWidth),
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, halfNdcY, screenHeight));
		}
	});
var $ianmackenzie$elm_3d_camera$Point3d$Projection$toScreenSpace = F3(
	function (camera, screen, point) {
		return A2(
			$ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo,
			$ianmackenzie$elm_units$Quantity$zero,
			A2(
				$ianmackenzie$elm_geometry$Point3d$signedDistanceFrom,
				$ianmackenzie$elm_3d_camera$Camera3d$clipPlane(camera),
				point)) ? $elm$core$Maybe$Just(
			A3($ianmackenzie$elm_3d_camera$Camera3d$Internal$unsafeProjection, camera, screen, point)) : $elm$core$Maybe$Nothing;
	});
var $ianmackenzie$elm_3d_camera$LineSegment3d$Projection$toScreenSpace = F3(
	function (camera, screen, lineSegment) {
		var clipPlane = $ianmackenzie$elm_3d_camera$Camera3d$clipPlane(camera);
		var _v0 = $ianmackenzie$elm_geometry$LineSegment3d$endpoints(lineSegment);
		var p1 = _v0.a;
		var p2 = _v0.b;
		var candidates = _List_fromArray(
			[
				A3($ianmackenzie$elm_3d_camera$Point3d$Projection$toScreenSpace, camera, screen, p1),
				A2(
				$elm$core$Maybe$map,
				A2($ianmackenzie$elm_3d_camera$Camera3d$Internal$unsafeProjection, camera, screen),
				A2($ianmackenzie$elm_geometry$LineSegment3d$intersectionWithPlane, clipPlane, lineSegment)),
				A3($ianmackenzie$elm_3d_camera$Point3d$Projection$toScreenSpace, camera, screen, p2)
			]);
		var _v1 = A2($elm$core$List$filterMap, $elm$core$Basics$identity, candidates);
		_v1$2:
		while (true) {
			if (_v1.b && _v1.b.b) {
				if (!_v1.b.b.b) {
					var firstPoint = _v1.a;
					var _v2 = _v1.b;
					var secondPoint = _v2.a;
					return $elm$core$Maybe$Just(
						A2($ianmackenzie$elm_geometry$LineSegment2d$from, firstPoint, secondPoint));
				} else {
					if (!_v1.b.b.b.b) {
						var startPoint = _v1.a;
						var _v3 = _v1.b;
						var intersectionPoint = _v3.a;
						var _v4 = _v3.b;
						var endPoint = _v4.a;
						return $elm$core$Maybe$Just(
							A2($ianmackenzie$elm_geometry$LineSegment2d$from, startPoint, endPoint));
					} else {
						break _v1$2;
					}
				}
			} else {
				break _v1$2;
			}
		}
		return $elm$core$Maybe$Nothing;
	});
var $author$project$Schema$cameraMouseDownSegment = A2(
	$elm$core$Maybe$withDefault,
	A2($ianmackenzie$elm_geometry$LineSegment2d$from, $ianmackenzie$elm_geometry$Point2d$origin, $ianmackenzie$elm_geometry$Point2d$origin),
	A3(
		$ianmackenzie$elm_3d_camera$LineSegment3d$Projection$toScreenSpace,
		$author$project$Schema$camera,
		$author$project$Schema$screen,
		A2($ianmackenzie$elm_geometry$LineSegment3d$from, $author$project$Schema$eyePoint, $author$project$Schema$mouseDownPoint)));
var $author$project$Schema$cameraPoint = A2(
	$elm$core$Maybe$withDefault,
	$ianmackenzie$elm_geometry$Point2d$origin,
	A3($ianmackenzie$elm_3d_camera$Point3d$Projection$toScreenSpace, $author$project$Schema$camera, $author$project$Schema$screen, $author$project$Schema$eyePoint));
var $ianmackenzie$elm_geometry$Circle2d$centerPoint = function (_v0) {
	var properties = _v0;
	return properties.b5;
};
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$core$String$fromFloat = _String_fromNumber;
var $ianmackenzie$elm_units$Pixels$inPixels = function (_v0) {
	var numPixels = _v0;
	return numPixels;
};
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $ianmackenzie$elm_geometry$Circle2d$radius = function (_v0) {
	var properties = _v0;
	return properties.dK;
};
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $ianmackenzie$elm_geometry$Point2d$toPixels = function (_v0) {
	var coordinates = _v0;
	return coordinates;
};
var $author$project$Schema$circle = F2(
	function (fill, circle2d) {
		var radius = $ianmackenzie$elm_units$Pixels$inPixels(
			$ianmackenzie$elm_geometry$Circle2d$radius(circle2d));
		var c = $ianmackenzie$elm_geometry$Point2d$toPixels(
			$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle2d));
		var _v0 = function () {
			switch (fill) {
				case 0:
					return _Utils_Tuple2('black', 'white');
				case 1:
					return _Utils_Tuple2('black', 'black');
				default:
					return _Utils_Tuple2('red', 'red');
			}
		}();
		var strokeColor = _v0.a;
		var fillColor = _v0.b;
		return A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$r(
					$elm$core$String$fromFloat(radius)),
					$elm$svg$Svg$Attributes$stroke(strokeColor),
					$elm$svg$Svg$Attributes$fill(fillColor),
					$elm$svg$Svg$Attributes$strokeWidth('3'),
					$elm$svg$Svg$Attributes$cx(
					$elm$core$String$fromFloat(c.bk)),
					$elm$svg$Svg$Attributes$cy(
					$elm$core$String$fromFloat(c.bl))
				]),
			_List_Nil);
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$marker = $elm$svg$Svg$trustedNode('marker');
var $elm$svg$Svg$Attributes$markerHeight = _VirtualDom_attribute('markerHeight');
var $elm$svg$Svg$Attributes$markerWidth = _VirtualDom_attribute('markerWidth');
var $elm$svg$Svg$Attributes$orient = _VirtualDom_attribute('orient');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$refX = _VirtualDom_attribute('refX');
var $elm$svg$Svg$Attributes$refY = _VirtualDom_attribute('refY');
var $author$project$Schema$defs = A2(
	$elm$svg$Svg$defs,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$marker,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$id('arrow'),
					$elm$svg$Svg$Attributes$markerHeight('10'),
					$elm$svg$Svg$Attributes$markerWidth('10'),
					$elm$svg$Svg$Attributes$orient('auto'),
					$elm$svg$Svg$Attributes$refX('10'),
					$elm$svg$Svg$Attributes$refY('5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M0,0 L10,5 0,10'),
							$elm$svg$Svg$Attributes$fill('transparent'),
							$elm$svg$Svg$Attributes$stroke('black')
						]),
					_List_Nil)
				])),
			A2(
			$elm$svg$Svg$marker,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$id('gray-arrow'),
					$elm$svg$Svg$Attributes$markerHeight('10'),
					$elm$svg$Svg$Attributes$markerWidth('10'),
					$elm$svg$Svg$Attributes$orient('auto'),
					$elm$svg$Svg$Attributes$refX('10'),
					$elm$svg$Svg$Attributes$refY('5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M0,0 L10,5 0,10'),
							$elm$svg$Svg$Attributes$fill('transparent'),
							$elm$svg$Svg$Attributes$stroke('black')
						]),
					_List_Nil)
				]))
		]));
var $ianmackenzie$elm_geometry$LineSegment2d$endPoint = function (_v0) {
	var _v1 = _v0;
	var end = _v1.b;
	return end;
};
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Schema$label = F3(
	function (point2d, textAnchor, str) {
		var _v0 = $ianmackenzie$elm_geometry$Point2d$toPixels(point2d);
		var x = _v0.bk;
		var y = _v0.bl;
		var _v1 = function () {
			switch (textAnchor) {
				case 0:
					return _Utils_Tuple3('end', -15, 0);
				case 3:
					return _Utils_Tuple3('end', -25, -10);
				case 1:
					return _Utils_Tuple3('start', 15, 25);
				default:
					return _Utils_Tuple3('start', 15, -20);
			}
		}();
		var anchor = _v1.a;
		var offsetX = _v1.b;
		var offsetY = _v1.c;
		return A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(x + offsetX)),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(y + offsetY)),
					$elm$svg$Svg$Attributes$textAnchor(anchor),
					A2($elm$html$Html$Attributes$style, 'font', 'bold 24px/1.3 sans-serif'),
					A2($elm$html$Html$Attributes$style, 'paint-order', 'stroke'),
					A2($elm$html$Html$Attributes$style, 'stroke', 'white'),
					A2($elm$html$Html$Attributes$style, 'stroke-width', '10px')
				]),
			_List_fromArray(
				[
					$elm$svg$Svg$text(str)
				]));
	});
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $ianmackenzie$elm_geometry$LineSegment2d$startPoint = function (_v0) {
	var _v1 = _v0;
	var start = _v1.a;
	return start;
};
var $elm$svg$Svg$Attributes$markerEnd = _VirtualDom_attribute('marker-end');
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $author$project$Schema$styleAttrs = function (style) {
	switch (style) {
		case 0:
			return _List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('black'),
					$elm$svg$Svg$Attributes$strokeWidth('1')
				]);
		case 1:
			return _List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('red'),
					$elm$svg$Svg$Attributes$strokeWidth('1')
				]);
		case 2:
			return _List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('black'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$markerEnd('url(#arrow)')
				]);
		case 3:
			return _List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('black'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeDasharray('10,5'),
					$elm$svg$Svg$Attributes$markerEnd('url(#gray-arrow)')
				]);
		case 4:
			return _List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('black'),
					$elm$svg$Svg$Attributes$strokeWidth('3')
				]);
		default:
			return _List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('black'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeDasharray('10,5')
				]);
	}
};
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$Schema$line = F2(
	function (style, segment) {
		var p2 = $ianmackenzie$elm_geometry$Point2d$toPixels(
			$ianmackenzie$elm_geometry$LineSegment2d$endPoint(segment));
		var p1 = $ianmackenzie$elm_geometry$Point2d$toPixels(
			$ianmackenzie$elm_geometry$LineSegment2d$startPoint(segment));
		return A2(
			$elm$svg$Svg$line,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x1(
						$elm$core$String$fromFloat(p1.bk)),
						$elm$svg$Svg$Attributes$y1(
						$elm$core$String$fromFloat(p1.bl)),
						$elm$svg$Svg$Attributes$x2(
						$elm$core$String$fromFloat(p2.bk)),
						$elm$svg$Svg$Attributes$y2(
						$elm$core$String$fromFloat(p2.bl))
					]),
				$author$project$Schema$styleAttrs(style)),
			_List_Nil);
	});
var $ianmackenzie$elm_geometry$Point2d$pixels = F2(
	function (x, y) {
		return {bk: x, bl: y};
	});
var $ianmackenzie$elm_units$Quantity$at = F2(
	function (_v0, _v1) {
		var rate = _v0;
		var independentValue = _v1;
		return rate * independentValue;
	});
var $ianmackenzie$elm_units$Quantity$divideBy = F2(
	function (divisor, _v0) {
		var value = _v0;
		return value / divisor;
	});
var $ianmackenzie$elm_geometry$Frame3d$originPoint = function (_v0) {
	var properties = _v0;
	return properties.bF;
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint = function (_v0) {
	var frame = _v0;
	return $ianmackenzie$elm_geometry$Frame3d$originPoint(frame);
};
var $ianmackenzie$elm_geometry$Direction3d$negativeZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bk: 0, bl: 0, bm: -1});
var $ianmackenzie$elm_units$Quantity$per = F2(
	function (_v0, _v1) {
		var independentValue = _v0;
		var dependentValue = _v1;
		return dependentValue / independentValue;
	});
var $ianmackenzie$elm_geometry$Direction3d$placeIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var d = _v1;
		var _v2 = frame.b2;
		var k = _v2;
		var _v3 = frame.b1;
		var j = _v3;
		var _v4 = frame.b0;
		var i = _v4;
		return {bk: ((i.bk * d.bk) + (j.bk * d.bl)) + (k.bk * d.bm), bl: ((i.bl * d.bk) + (j.bl * d.bl)) + (k.bl * d.bm), bm: ((i.bm * d.bk) + (j.bm * d.bl)) + (k.bm * d.bm)};
	});
var $ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection = function (_v0) {
	var frame = _v0;
	return $ianmackenzie$elm_geometry$Direction3d$reverse(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
};
var $ianmackenzie$elm_geometry$Point2d$xCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var _v3 = frame.b0;
		var d = _v3;
		return ((p.bk - p0.bk) * d.bk) + ((p.bl - p0.bl) * d.bl);
	});
var $ianmackenzie$elm_geometry$Vector3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0;
		var y = _v1;
		var z = _v2;
		return {bk: x, bl: y, bm: z};
	});
var $ianmackenzie$elm_geometry$Point3d$xyzIn = F4(
	function (_v0, _v1, _v2, _v3) {
		var frame = _v0;
		var x = _v1;
		var y = _v2;
		var z = _v3;
		var _v4 = frame.bF;
		var p0 = _v4;
		var _v5 = frame.b2;
		var k = _v5;
		var _v6 = frame.b1;
		var j = _v6;
		var _v7 = frame.b0;
		var i = _v7;
		return {bk: ((p0.bk + (x * i.bk)) + (y * j.bk)) + (z * k.bk), bl: ((p0.bl + (x * i.bl)) + (y * j.bl)) + (z * k.bl), bm: ((p0.bm + (x * i.bm)) + (y * j.bm)) + (z * k.bm)};
	});
var $ianmackenzie$elm_geometry$Point2d$yCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var _v3 = frame.b1;
		var d = _v3;
		return ((p.bk - p0.bk) * d.bk) + ((p.bl - p0.bl) * d.bl);
	});
var $ianmackenzie$elm_3d_camera$Camera3d$ray = F3(
	function (_v0, screen, point) {
		var camera = _v0;
		var screenY = A2(
			$ianmackenzie$elm_geometry$Point2d$yCoordinateIn,
			$ianmackenzie$elm_geometry$Rectangle2d$axes(screen),
			point);
		var screenX = A2(
			$ianmackenzie$elm_geometry$Point2d$xCoordinateIn,
			$ianmackenzie$elm_geometry$Rectangle2d$axes(screen),
			point);
		var _v1 = camera.c6;
		var viewpointFrame = _v1;
		var _v2 = $ianmackenzie$elm_geometry$Rectangle2d$dimensions(screen);
		var screenWidth = _v2.a;
		var screenHeight = _v2.b;
		var _v3 = camera.ba;
		if (!_v3.$) {
			var frustumSlope = _v3.a;
			var screenZ = $ianmackenzie$elm_units$Quantity$negate(
				A2(
					$ianmackenzie$elm_units$Quantity$divideBy,
					frustumSlope,
					A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, screenHeight)));
			var direction = A2(
				$ianmackenzie$elm_geometry$Direction3d$placeIn,
				viewpointFrame,
				A2(
					$elm$core$Maybe$withDefault,
					$ianmackenzie$elm_geometry$Direction3d$negativeZ,
					$ianmackenzie$elm_geometry$Vector3d$direction(
						A3($ianmackenzie$elm_geometry$Vector3d$xyz, screenX, screenY, screenZ))));
			return A2(
				$ianmackenzie$elm_geometry$Axis3d$through,
				$ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(camera.c6),
				direction);
		} else {
			var viewpointHeight = _v3.a;
			var resolution = A2($ianmackenzie$elm_units$Quantity$per, screenHeight, viewpointHeight);
			var origin = A4(
				$ianmackenzie$elm_geometry$Point3d$xyzIn,
				viewpointFrame,
				A2($ianmackenzie$elm_units$Quantity$at, resolution, screenX),
				A2($ianmackenzie$elm_units$Quantity$at, resolution, screenY),
				$ianmackenzie$elm_units$Quantity$zero);
			return A2(
				$ianmackenzie$elm_geometry$Axis3d$through,
				origin,
				$ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection(camera.c6));
		}
	});
var $author$project$Schema$screenCamera = $ianmackenzie$elm_3d_camera$Camera3d$perspective(
	{
		b8: $ianmackenzie$elm_units$Length$meters(0.1),
		c4: $ianmackenzie$elm_units$Angle$degrees(24),
		c6: $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt(
			{
				ci: A3($ianmackenzie$elm_geometry$Point3d$meters, 3, 4, 2),
				cj: A3($ianmackenzie$elm_geometry$Point3d$meters, -0.5, -0.5, 0),
				c2: $ianmackenzie$elm_geometry$Direction3d$positiveZ
			})
	});
var $ianmackenzie$elm_geometry$Rectangle2d$vertices = function (rectangle) {
	var localFrame = $ianmackenzie$elm_geometry$Rectangle2d$axes(rectangle);
	var _v0 = $ianmackenzie$elm_geometry$Rectangle2d$dimensions(rectangle);
	var width = _v0.a;
	var height = _v0.b;
	var y = $ianmackenzie$elm_units$Quantity$half(height);
	var x = $ianmackenzie$elm_units$Quantity$half(width);
	return _List_fromArray(
		[
			A3(
			$ianmackenzie$elm_geometry$Point2d$xyIn,
			localFrame,
			$ianmackenzie$elm_units$Quantity$negate(x),
			$ianmackenzie$elm_units$Quantity$negate(y)),
			A3(
			$ianmackenzie$elm_geometry$Point2d$xyIn,
			localFrame,
			x,
			$ianmackenzie$elm_units$Quantity$negate(y)),
			A3($ianmackenzie$elm_geometry$Point2d$xyIn, localFrame, x, y),
			A3(
			$ianmackenzie$elm_geometry$Point2d$xyIn,
			localFrame,
			$ianmackenzie$elm_units$Quantity$negate(x),
			y)
		]);
};
var $author$project$Schema$screenPlaneRectangle = function () {
	var corners = A2(
		$elm$core$List$filterMap,
		A2($ianmackenzie$elm_3d_camera$Point3d$Projection$toScreenSpace, $author$project$Schema$camera, $author$project$Schema$screen),
		A2(
			$elm$core$List$filterMap,
			$ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane($author$project$Schema$screenPlane),
			A2(
				$elm$core$List$map,
				A2($ianmackenzie$elm_3d_camera$Camera3d$ray, $author$project$Schema$screenCamera, $author$project$Schema$screen),
				$ianmackenzie$elm_geometry$Rectangle2d$vertices($author$project$Schema$screen))));
	if ((((corners.b && corners.b.b) && corners.b.b.b) && corners.b.b.b.b) && (!corners.b.b.b.b.b)) {
		var c1 = corners.a;
		var _v1 = corners.b;
		var c2 = _v1.a;
		var _v2 = _v1.b;
		var c3 = _v2.a;
		var _v3 = _v2.b;
		var c4 = _v3.a;
		return _List_fromArray(
			[
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c1, c2),
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c2, c3),
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c3, c4),
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c4, c1)
			]);
	} else {
		return _List_Nil;
	}
}();
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $ianmackenzie$elm_geometry$Frame3d$copy = function (_v0) {
	var properties = _v0;
	return properties;
};
var $ianmackenzie$elm_geometry$Block3d$axes = function (_v0) {
	var block = _v0;
	return $ianmackenzie$elm_geometry$Frame3d$copy(block.db);
};
var $ianmackenzie$elm_geometry$Block3d$dimensions = function (_v0) {
	var block = _v0;
	return block.v;
};
var $ianmackenzie$elm_geometry$Block3d$edges = function (block) {
	var localFrame = $ianmackenzie$elm_geometry$Block3d$axes(block);
	var _v0 = $ianmackenzie$elm_geometry$Block3d$dimensions(block);
	var xDimension = _v0.a;
	var yDimension = _v0.b;
	var zDimension = _v0.c;
	var positiveX = $ianmackenzie$elm_units$Quantity$half(xDimension);
	var negativeX = $ianmackenzie$elm_units$Quantity$negate(positiveX);
	var positiveY = $ianmackenzie$elm_units$Quantity$half(yDimension);
	var negativeY = $ianmackenzie$elm_units$Quantity$negate(positiveY);
	var positiveZ = $ianmackenzie$elm_units$Quantity$half(zDimension);
	var negativeZ = $ianmackenzie$elm_units$Quantity$negate(positiveZ);
	var p1 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, negativeX, negativeY, negativeZ);
	var p3 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, negativeX, positiveY, negativeZ);
	var p5 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, positiveX, negativeY, negativeZ);
	var p7 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, positiveX, positiveY, negativeZ);
	var p2 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, negativeX, negativeY, positiveZ);
	var p4 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, negativeX, positiveY, positiveZ);
	var p6 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, positiveX, negativeY, positiveZ);
	var p8 = A4($ianmackenzie$elm_geometry$Point3d$xyzIn, localFrame, positiveX, positiveY, positiveZ);
	return _List_fromArray(
		[
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p1, p3),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p3, p4),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p4, p2),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p2, p1),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p1, p5),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p3, p7),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p4, p8),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p2, p6),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p5, p7),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p7, p8),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p8, p6),
			A2($ianmackenzie$elm_geometry$LineSegment3d$from, p6, p5)
		]);
};
var $ianmackenzie$elm_geometry$Geometry$Types$Block3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Direction3d$negativeX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bk: -1, bl: 0, bm: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bk: 0, bl: -1, bm: 0});
var $ianmackenzie$elm_geometry$Direction3d$positiveX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bk: 1, bl: 0, bm: 0});
var $ianmackenzie$elm_geometry$Direction3d$positiveY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bk: 0, bl: 1, bm: 0});
var $ianmackenzie$elm_geometry$Point3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0;
		var y = _v1;
		var z = _v2;
		return {bk: x, bl: y, bm: z};
	});
var $ianmackenzie$elm_geometry$Block3d$axisAligned = F6(
	function (x1, y1, z1, x2, y2, z2) {
		var computedZDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, z1, z2) ? $ianmackenzie$elm_geometry$Direction3d$positiveZ : $ianmackenzie$elm_geometry$Direction3d$negativeZ;
		var computedYDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, y1, y2) ? $ianmackenzie$elm_geometry$Direction3d$positiveY : $ianmackenzie$elm_geometry$Direction3d$negativeY;
		var computedXDirection = A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, x1, x2) ? $ianmackenzie$elm_geometry$Direction3d$positiveX : $ianmackenzie$elm_geometry$Direction3d$negativeX;
		var computedDimensions = _Utils_Tuple3(
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, x1, x2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, y1, y2)),
			$ianmackenzie$elm_units$Quantity$abs(
				A2($ianmackenzie$elm_units$Quantity$minus, z1, z2)));
		var computedCenterPoint = A3(
			$ianmackenzie$elm_geometry$Point3d$xyz,
			A2($ianmackenzie$elm_units$Quantity$midpoint, x1, x2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, y1, y2),
			A2($ianmackenzie$elm_units$Quantity$midpoint, z1, z2));
		var computedAxes = $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{bF: computedCenterPoint, b0: computedXDirection, b1: computedYDirection, b2: computedZDirection});
		return {db: computedAxes, v: computedDimensions};
	});
var $ianmackenzie$elm_geometry$Point3d$xCoordinate = function (_v0) {
	var p = _v0;
	return p.bk;
};
var $ianmackenzie$elm_geometry$Point3d$yCoordinate = function (_v0) {
	var p = _v0;
	return p.bl;
};
var $ianmackenzie$elm_geometry$Point3d$zCoordinate = function (_v0) {
	var p = _v0;
	return p.bm;
};
var $ianmackenzie$elm_geometry$Block3d$from = F2(
	function (p1, p2) {
		return A6(
			$ianmackenzie$elm_geometry$Block3d$axisAligned,
			$ianmackenzie$elm_geometry$Point3d$xCoordinate(p1),
			$ianmackenzie$elm_geometry$Point3d$yCoordinate(p1),
			$ianmackenzie$elm_geometry$Point3d$zCoordinate(p1),
			$ianmackenzie$elm_geometry$Point3d$xCoordinate(p2),
			$ianmackenzie$elm_geometry$Point3d$yCoordinate(p2),
			$ianmackenzie$elm_geometry$Point3d$zCoordinate(p2));
	});
var $ianmackenzie$elm_units$Length$millimeters = function (numMillimeters) {
	return $ianmackenzie$elm_units$Length$meters(0.001 * numMillimeters);
};
var $ianmackenzie$elm_geometry$Point3d$millimeters = F3(
	function (x, y, z) {
		return A3(
			$ianmackenzie$elm_geometry$Point3d$xyz,
			$ianmackenzie$elm_units$Length$millimeters(x),
			$ianmackenzie$elm_units$Length$millimeters(y),
			$ianmackenzie$elm_units$Length$millimeters(z));
	});
var $author$project$Schema$table = A2(
	$elm$core$List$filterMap,
	A2($ianmackenzie$elm_3d_camera$LineSegment3d$Projection$toScreenSpace, $author$project$Schema$camera, $author$project$Schema$screen),
	A2(
		$elm$core$List$concatMap,
		$ianmackenzie$elm_geometry$Block3d$edges,
		_List_fromArray(
			[
				A2(
				$ianmackenzie$elm_geometry$Block3d$from,
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, 222, 222, 0),
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, 272, 272, 400)),
				A2(
				$ianmackenzie$elm_geometry$Block3d$from,
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, -272, 222, 0),
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, -222, 272, 400)),
				A2(
				$ianmackenzie$elm_geometry$Block3d$from,
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, -272, -272, 0),
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, -222, -222, 400)),
				A2(
				$ianmackenzie$elm_geometry$Block3d$from,
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, 222, -272, 0),
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, 272, -222, 400)),
				A2(
				$ianmackenzie$elm_geometry$Block3d$from,
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, -275, -275, 400),
				A3($ianmackenzie$elm_geometry$Point3d$millimeters, 275, 275, 450))
			])));
var $author$project$Schema$step1 = A2(
	$elm$core$List$cons,
	$author$project$Schema$defs,
	_Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Schema$line(0),
			$author$project$Schema$table),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Schema$line(4),
				$author$project$Schema$screenPlaneRectangle),
			_List_fromArray(
				[
					A3(
					$author$project$Schema$label,
					A2($ianmackenzie$elm_geometry$Point2d$pixels, 630, 640),
					0,
					'画面'),
					A2(
					$author$project$Schema$circle,
					0,
					A2(
						$ianmackenzie$elm_geometry$Circle2d$atPoint,
						$author$project$Schema$cameraPoint,
						$ianmackenzie$elm_units$Pixels$pixels(10))),
					A2($author$project$Schema$line, 2, $author$project$Schema$cameraMouseDownSegment),
					A3(
					$author$project$Schema$label,
					$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$cameraMouseDownSegment),
					1,
					'マウスダウン'),
					A3($author$project$Schema$label, $author$project$Schema$cameraPoint, 0, 'カメラ')
				]))));
var $author$project$Schema$Black = 1;
var $author$project$Schema$MouseBody = 2;
var $author$project$Schema$Ray = 3;
var $author$project$Schema$mouseDownRaycastSegment = A2(
	$elm$core$Maybe$withDefault,
	A2($ianmackenzie$elm_geometry$LineSegment2d$from, $ianmackenzie$elm_geometry$Point2d$origin, $ianmackenzie$elm_geometry$Point2d$origin),
	A3(
		$ianmackenzie$elm_3d_camera$LineSegment3d$Projection$toScreenSpace,
		$author$project$Schema$camera,
		$author$project$Schema$screen,
		A2($ianmackenzie$elm_geometry$LineSegment3d$from, $author$project$Schema$mouseDownPoint, $author$project$Schema$raycastPoint)));
var $author$project$Schema$step2 = A2(
	$elm$core$List$cons,
	$author$project$Schema$defs,
	_Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Schema$line(0),
			$author$project$Schema$table),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Schema$line(4),
				$author$project$Schema$screenPlaneRectangle),
			_List_fromArray(
				[
					A3(
					$author$project$Schema$label,
					A2($ianmackenzie$elm_geometry$Point2d$pixels, 630, 640),
					0,
					'画面'),
					A2(
					$author$project$Schema$circle,
					1,
					A2(
						$ianmackenzie$elm_geometry$Circle2d$atPoint,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment),
						$ianmackenzie$elm_units$Pixels$pixels(10))),
					A3(
					$author$project$Schema$label,
					$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment),
					2,
					'マウスのボディ'),
					A2(
					$author$project$Schema$circle,
					0,
					A2(
						$ianmackenzie$elm_geometry$Circle2d$atPoint,
						$author$project$Schema$cameraPoint,
						$ianmackenzie$elm_units$Pixels$pixels(10))),
					A2($author$project$Schema$line, 3, $author$project$Schema$mouseDownRaycastSegment),
					A2($author$project$Schema$line, 2, $author$project$Schema$cameraMouseDownSegment),
					A3(
					$author$project$Schema$label,
					$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$cameraMouseDownSegment),
					1,
					'マウスダウン'),
					A3($author$project$Schema$label, $author$project$Schema$cameraPoint, 0, 'カメラ')
				]))));
var $author$project$Schema$Red = 2;
var $author$project$Schema$TableRed = 1;
var $author$project$Schema$step3 = A2(
	$elm$core$List$cons,
	$author$project$Schema$defs,
	_Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Schema$line(1),
			$author$project$Schema$table),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Schema$line(4),
				$author$project$Schema$screenPlaneRectangle),
			_List_fromArray(
				[
					A3(
					$author$project$Schema$label,
					A2($ianmackenzie$elm_geometry$Point2d$pixels, 630, 640),
					0,
					'画面'),
					A2(
					$author$project$Schema$circle,
					2,
					A2(
						$ianmackenzie$elm_geometry$Circle2d$atPoint,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment),
						$ianmackenzie$elm_units$Pixels$pixels(10))),
					A3(
					$author$project$Schema$label,
					$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment),
					2,
					'マウスのボディ'),
					A2(
					$author$project$Schema$circle,
					0,
					A2(
						$ianmackenzie$elm_geometry$Circle2d$atPoint,
						$author$project$Schema$cameraPoint,
						$ianmackenzie$elm_units$Pixels$pixels(10))),
					A2($author$project$Schema$line, 3, $author$project$Schema$mouseDownRaycastSegment),
					A2($author$project$Schema$line, 2, $author$project$Schema$cameraMouseDownSegment),
					A3(
					$author$project$Schema$label,
					$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$cameraMouseDownSegment),
					1,
					'マウスダウン'),
					A3($author$project$Schema$label, $author$project$Schema$cameraPoint, 0, 'カメラ')
				]))));
var $author$project$Schema$DraggingPlane = 5;
var $author$project$Schema$draggingPlane = A2($ianmackenzie$elm_geometry$Plane3d$through, $author$project$Schema$raycastPoint, $author$project$Schema$cameraDirection);
var $ianmackenzie$elm_geometry$Point2d$scaleAbout = F3(
	function (_v0, k, _v1) {
		var p0 = _v0;
		var p = _v1;
		return {bk: p0.bk + (k * (p.bk - p0.bk)), bl: p0.bl + (k * (p.bl - p0.bl))};
	});
var $author$project$Schema$draggingPlaneRectangle = function () {
	var corners = A2(
		$elm$core$List$filterMap,
		A2($ianmackenzie$elm_3d_camera$Point3d$Projection$toScreenSpace, $author$project$Schema$camera, $author$project$Schema$screen),
		A2(
			$elm$core$List$filterMap,
			$ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane($author$project$Schema$draggingPlane),
			A2(
				$elm$core$List$map,
				A2($ianmackenzie$elm_3d_camera$Camera3d$ray, $author$project$Schema$screenCamera, $author$project$Schema$screen),
				A2(
					$elm$core$List$map,
					A2(
						$ianmackenzie$elm_geometry$Point2d$scaleAbout,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 400, 260),
						0.5),
					$ianmackenzie$elm_geometry$Rectangle2d$vertices($author$project$Schema$screen)))));
	if ((((corners.b && corners.b.b) && corners.b.b.b) && corners.b.b.b.b) && (!corners.b.b.b.b.b)) {
		var c1 = corners.a;
		var _v1 = corners.b;
		var c2 = _v1.a;
		var _v2 = _v1.b;
		var c3 = _v2.a;
		var _v3 = _v2.b;
		var c4 = _v3.a;
		return _List_fromArray(
			[
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c1, c2),
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c2, c3),
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c3, c4),
				A2($ianmackenzie$elm_geometry$LineSegment2d$from, c4, c1)
			]);
	} else {
		return _List_Nil;
	}
}();
var $author$project$Schema$step4 = A2(
	$elm$core$List$cons,
	$author$project$Schema$defs,
	_Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Schema$line(1),
			$author$project$Schema$table),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Schema$line(4),
				$author$project$Schema$screenPlaneRectangle),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					$author$project$Schema$line(5),
					$author$project$Schema$draggingPlaneRectangle),
				_List_fromArray(
					[
						A3(
						$author$project$Schema$label,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 1060, 515),
						0,
						'カメラに向いた平面'),
						A3(
						$author$project$Schema$label,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 630, 640),
						0,
						'画面'),
						A2(
						$author$project$Schema$circle,
						2,
						A2(
							$ianmackenzie$elm_geometry$Circle2d$atPoint,
							$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment),
							$ianmackenzie$elm_units$Pixels$pixels(10))),
						A3(
						$author$project$Schema$label,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment),
						2,
						'マウスのボディ'),
						A2(
						$author$project$Schema$circle,
						0,
						A2(
							$ianmackenzie$elm_geometry$Circle2d$atPoint,
							$author$project$Schema$cameraPoint,
							$ianmackenzie$elm_units$Pixels$pixels(10))),
						A2($author$project$Schema$line, 3, $author$project$Schema$mouseDownRaycastSegment),
						A2($author$project$Schema$line, 2, $author$project$Schema$cameraMouseDownSegment),
						A3(
						$author$project$Schema$label,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$cameraMouseDownSegment),
						1,
						'マウスダウン'),
						A3($author$project$Schema$label, $author$project$Schema$cameraPoint, 0, 'カメラ')
					])))));
var $author$project$Schema$MouseMove = 3;
var $author$project$Schema$mouseMovePoint = A2(
	$elm$core$Maybe$withDefault,
	$ianmackenzie$elm_geometry$Point3d$origin,
	A2(
		$ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane,
		$author$project$Schema$screenPlane,
		A3(
			$ianmackenzie$elm_3d_camera$Camera3d$ray,
			$author$project$Schema$screenCamera,
			$author$project$Schema$screen,
			A2($ianmackenzie$elm_geometry$Point2d$pixels, 300, 300))));
var $author$project$Schema$cameraMouseMoveSegment = A2(
	$elm$core$Maybe$withDefault,
	A2($ianmackenzie$elm_geometry$LineSegment2d$from, $ianmackenzie$elm_geometry$Point2d$origin, $ianmackenzie$elm_geometry$Point2d$origin),
	A3(
		$ianmackenzie$elm_3d_camera$LineSegment3d$Projection$toScreenSpace,
		$author$project$Schema$camera,
		$author$project$Schema$screen,
		A2($ianmackenzie$elm_geometry$LineSegment3d$from, $author$project$Schema$eyePoint, $author$project$Schema$mouseMovePoint)));
var $author$project$Schema$draggingPoint = A2(
	$elm$core$Maybe$withDefault,
	$ianmackenzie$elm_geometry$Point3d$origin,
	A2(
		$ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane,
		$author$project$Schema$draggingPlane,
		A3(
			$ianmackenzie$elm_3d_camera$Camera3d$ray,
			$author$project$Schema$screenCamera,
			$author$project$Schema$screen,
			A2($ianmackenzie$elm_geometry$Point2d$pixels, 300, 300))));
var $author$project$Schema$mouseMoveDraggingSegment = A2(
	$elm$core$Maybe$withDefault,
	A2($ianmackenzie$elm_geometry$LineSegment2d$from, $ianmackenzie$elm_geometry$Point2d$origin, $ianmackenzie$elm_geometry$Point2d$origin),
	A3(
		$ianmackenzie$elm_3d_camera$LineSegment3d$Projection$toScreenSpace,
		$author$project$Schema$camera,
		$author$project$Schema$screen,
		A2($ianmackenzie$elm_geometry$LineSegment3d$from, $author$project$Schema$mouseMovePoint, $author$project$Schema$draggingPoint)));
var $author$project$Schema$step5 = A2(
	$elm$core$List$cons,
	$author$project$Schema$defs,
	_Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Schema$line(1),
			$author$project$Schema$table),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Schema$line(4),
				$author$project$Schema$screenPlaneRectangle),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					$author$project$Schema$line(5),
					$author$project$Schema$draggingPlaneRectangle),
				_List_fromArray(
					[
						A2(
						$author$project$Schema$circle,
						2,
						A2(
							$ianmackenzie$elm_geometry$Circle2d$atPoint,
							$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseMoveDraggingSegment),
							$ianmackenzie$elm_units$Pixels$pixels(10))),
						A3(
						$author$project$Schema$label,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseMoveDraggingSegment),
						2,
						'マウスのボディ'),
						A2($author$project$Schema$line, 3, $author$project$Schema$mouseMoveDraggingSegment),
						A3(
						$author$project$Schema$label,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 1060, 515),
						0,
						'カメラに向いた平面'),
						A3(
						$author$project$Schema$label,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 630, 640),
						0,
						'画面'),
						A2(
						$author$project$Schema$circle,
						0,
						A2(
							$ianmackenzie$elm_geometry$Circle2d$atPoint,
							$author$project$Schema$cameraPoint,
							$ianmackenzie$elm_units$Pixels$pixels(10))),
						A2($author$project$Schema$line, 2, $author$project$Schema$cameraMouseMoveSegment),
						A3(
						$author$project$Schema$label,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$cameraMouseMoveSegment),
						3,
						'マウス移動'),
						A3($author$project$Schema$label, $author$project$Schema$cameraPoint, 0, 'カメラ')
					])))));
var $ianmackenzie$elm_geometry$Direction2d$x = $ianmackenzie$elm_geometry$Direction2d$positiveX;
var $ianmackenzie$elm_geometry$Direction2d$y = $ianmackenzie$elm_geometry$Direction2d$positiveY;
var $ianmackenzie$elm_geometry$Frame2d$atPoint = function (point) {
	return $ianmackenzie$elm_geometry$Frame2d$unsafe(
		{bF: point, b0: $ianmackenzie$elm_geometry$Direction2d$x, b1: $ianmackenzie$elm_geometry$Direction2d$y});
};
var $ianmackenzie$elm_geometry$LineSegment2d$endpoints = function (_v0) {
	var endpoints_ = _v0;
	return endpoints_;
};
var $ianmackenzie$elm_geometry$LineSegment2d$mapEndpoints = F2(
	function (_function, lineSegment) {
		var _v0 = $ianmackenzie$elm_geometry$LineSegment2d$endpoints(lineSegment);
		var p1 = _v0.a;
		var p2 = _v0.b;
		return $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints(
			_Utils_Tuple2(
				_function(p1),
				_function(p2)));
	});
var $ianmackenzie$elm_geometry$Point2d$placeIn = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var _v3 = frame.b1;
		var j = _v3;
		var _v4 = frame.b0;
		var i = _v4;
		return {bk: (p0.bk + (p.bk * i.bk)) + (p.bl * j.bk), bl: (p0.bl + (p.bk * i.bl)) + (p.bl * j.bl)};
	});
var $ianmackenzie$elm_geometry$LineSegment2d$placeIn = function (frame) {
	return $ianmackenzie$elm_geometry$LineSegment2d$mapEndpoints(
		$ianmackenzie$elm_geometry$Point2d$placeIn(frame));
};
var $ianmackenzie$elm_geometry$Point2d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.bF;
		var p0 = _v2;
		var deltaX = p.bk - p0.bk;
		var deltaY = p.bl - p0.bl;
		var _v3 = frame.b1;
		var j = _v3;
		var _v4 = frame.b0;
		var i = _v4;
		return {bk: (deltaX * i.bk) + (deltaY * i.bl), bl: (deltaX * j.bk) + (deltaY * j.bl)};
	});
var $ianmackenzie$elm_geometry$LineSegment2d$relativeTo = function (frame) {
	return $ianmackenzie$elm_geometry$LineSegment2d$mapEndpoints(
		$ianmackenzie$elm_geometry$Point2d$relativeTo(frame));
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $ianmackenzie$elm_geometry$Direction2d$fromAngle = function (_v0) {
	var angle = _v0;
	return {
		bk: $elm$core$Basics$cos(angle),
		bl: $elm$core$Basics$sin(angle)
	};
};
var $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise = function (_v0) {
	var d = _v0;
	return {bk: -d.bl, bl: d.bk};
};
var $ianmackenzie$elm_geometry$Frame2d$withXDirection = F2(
	function (givenDirection, givenOrigin) {
		return $ianmackenzie$elm_geometry$Frame2d$unsafe(
			{
				bF: givenOrigin,
				b0: givenDirection,
				b1: $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise(givenDirection)
			});
	});
var $ianmackenzie$elm_geometry$Frame2d$withAngle = F2(
	function (givenAngle, givenOrigin) {
		return A2(
			$ianmackenzie$elm_geometry$Frame2d$withXDirection,
			$ianmackenzie$elm_geometry$Direction2d$fromAngle(givenAngle),
			givenOrigin);
	});
var $author$project$Schema$movedTable = A2(
	$elm$core$List$map,
	$ianmackenzie$elm_geometry$LineSegment2d$placeIn(
		A2(
			$ianmackenzie$elm_geometry$Frame2d$withAngle,
			$ianmackenzie$elm_units$Angle$degrees(-15),
			$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseMoveDraggingSegment))),
	A2(
		$elm$core$List$map,
		$ianmackenzie$elm_geometry$LineSegment2d$relativeTo(
			$ianmackenzie$elm_geometry$Frame2d$atPoint(
				$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseDownRaycastSegment))),
		$author$project$Schema$table));
var $author$project$Schema$step6 = A2(
	$elm$core$List$cons,
	$author$project$Schema$defs,
	_Utils_ap(
		A2(
			$elm$core$List$map,
			$author$project$Schema$line(1),
			$author$project$Schema$movedTable),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				$author$project$Schema$line(4),
				$author$project$Schema$screenPlaneRectangle),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					$author$project$Schema$line(5),
					$author$project$Schema$draggingPlaneRectangle),
				_List_fromArray(
					[
						A2(
						$author$project$Schema$circle,
						2,
						A2(
							$ianmackenzie$elm_geometry$Circle2d$atPoint,
							$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseMoveDraggingSegment),
							$ianmackenzie$elm_units$Pixels$pixels(10))),
						A3(
						$author$project$Schema$label,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$mouseMoveDraggingSegment),
						2,
						'マウスのボディ'),
						A2($author$project$Schema$line, 3, $author$project$Schema$mouseMoveDraggingSegment),
						A3(
						$author$project$Schema$label,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 1060, 515),
						0,
						'カメラに向いた平面'),
						A3(
						$author$project$Schema$label,
						A2($ianmackenzie$elm_geometry$Point2d$pixels, 630, 640),
						0,
						'画面'),
						A2(
						$author$project$Schema$circle,
						0,
						A2(
							$ianmackenzie$elm_geometry$Circle2d$atPoint,
							$author$project$Schema$cameraPoint,
							$ianmackenzie$elm_units$Pixels$pixels(10))),
						A2($author$project$Schema$line, 2, $author$project$Schema$cameraMouseMoveSegment),
						A3(
						$author$project$Schema$label,
						$ianmackenzie$elm_geometry$LineSegment2d$endPoint($author$project$Schema$cameraMouseMoveSegment),
						3,
						'マウス移動'),
						A3($author$project$Schema$label, $author$project$Schema$cameraPoint, 0, 'カメラ')
					])))));
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Schema$view = function (step) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'block'),
				$elm$svg$Svg$Attributes$width('1280'),
				$elm$svg$Svg$Attributes$height('720')
			]),
		function () {
			switch (step) {
				case 1:
					return $author$project$Schema$step1;
				case 2:
					return $author$project$Schema$step2;
				case 3:
					return $author$project$Schema$step3;
				case 4:
					return $author$project$Schema$step4;
				case 5:
					return $author$project$Schema$step5;
				default:
					return $author$project$Schema$step6;
			}
		}());
};
var $author$project$Main$interaction = function (step) {
	return _List_fromArray(
		[
			A3(
			$author$project$Formatting$position,
			0,
			0,
			$w0rm$elm_slice_show$SliceShow$Content$item(
				$author$project$Schema$view(step)))
		]);
};
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$Formatting$code = function (str) {
	return $w0rm$elm_slice_show$SliceShow$Content$item(
		A2(
			$elm$html$Html$pre,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin', '0')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$code,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font', '36px monospace'),
							A2($elm$html$Html$Attributes$style, 'margin', '0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(str)
						]))
				])));
};
var $author$project$Main$interaction1 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('インタラクション・MouseDown')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$code('maybeRaycastResult =\n    model.world\n    |> World.keepIf\n        (\\body ->\n          (Body.getData body).id == Table\n        )\n    |> World.raycast mouseRay\n'))
	]);
var $author$project$Main$interaction2 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('model.world\n  |> World.add (Body.moveTo worldPoint mouse)\n  |> World.constrain\n    (\\b1 b2 ->\n        if\n          ((Body.getData b1).id == Mouse)\n          && ((Body.getData b2).id == selectedId)\n        then\n          [ Constraint.pointToPoint\n              Point3d.origin\n              point\n          ]\n        else\n          []\n    )\n'))
	]);
var $author$project$Main$interaction3 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('インタラクション・MouseMove')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$code('World.update\n  (\\body ->\n    if (Body.getData body).id == Mouse then\n      case intersectionWithPlane plane mouseRay of\n        Just intersection ->\n          Body.moveTo intersection body\n        Nothing -> body\n    else\n      body\n  )\n  model.world\n'))
	]);
var $author$project$Main$intro = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		900,
		100,
		A3($author$project$Formatting$image, (600 / 2) | 0, (977 / 2) | 0, 'assets/game.jpg')),
		A3(
		$author$project$Formatting$position,
		100,
		100,
		$author$project$Formatting$title('Elm で「ちゃぶ台返し」する方法')),
		A3(
		$author$project$Formatting$position,
		100,
		250,
		A3($author$project$Formatting$image, 50, 50, 'assets/twitter.png')),
		A3(
		$author$project$Formatting$position,
		170,
		240,
		$author$project$Formatting$text('アンドレイ'))
	]);
var $author$project$Main$lack = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		0,
		0,
		A3($author$project$Formatting$image, 1280, 720, 'assets/lack.jpg'))
	]);
var $elm$html$Html$li = _VirtualDom_node('li');
var $author$project$Formatting$bulletLink = F2(
	function (str, url) {
		return $w0rm$elm_slice_show$SliceShow$Content$item(
			A2(
				$elm$html$Html$li,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'font', '48px sans-serif'),
						A2($elm$html$Html$Attributes$style, 'margin', '1em 0')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href(url),
								A2($elm$html$Html$Attributes$style, 'color', 'inherit')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(str)
							]))
					])));
	});
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Formatting$bullets = $w0rm$elm_slice_show$SliceShow$Content$container(
	$elm$html$Html$ul(_List_Nil));
var $author$project$Main$links = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$bullets(
			_List_fromArray(
				[
					A2($author$project$Formatting$bulletLink, '「ちゃぶ台返し」のコード', 'https://github.com/ianmackenzie/elm-3d-scene/blob/master/examples/Lack.elm'),
					A2($author$project$Formatting$bulletLink, 'elm-physicsについて', 'https://discourse.elm-lang.org/search?q=%223D%20Physics%20Engine%22'),
					A2($author$project$Formatting$bulletLink, '新しいelm-geometryについて', 'https://discourse.elm-lang.org/t/elm-geometry-3-now-with-units-and-coordinate-systems/4780'),
					A2($author$project$Formatting$bulletLink, 'elm-3d-sceneの発表', 'https://www.youtube.com/watch?v=Htqc64s5qYU'),
					A2($author$project$Formatting$bulletLink, '影のレンダリング', 'https://discourse.elm-lang.org/t/rendering-real-time-shadows-in-webgl-using-shadow-volumes/4029')
				])))
	]);
var $author$project$Main$modelling1 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('blocks =\n    [ Block3d.from\n        (Point3d.millimeters\n            222\n            222\n            0\n        )\n        (Point3d.millimeters\n            272\n            272\n            400\n        )\n    ...')),
		A3(
		$author$project$Formatting$position,
		960,
		50,
		A3($author$project$Formatting$image, (780 / 4) | 0, (2242 / 4) | 0, 'assets/dimensions.png'))
	]);
var $author$project$Main$modelling2 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('shapes =\n    blocks\n        |> List.map Shape.block\n\ndrawables =\n    blocks\n        |> List.map\n            (\\block ->\n                ...\n'))
	]);
var $author$project$Main$modelling3 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('type Id = Mouse | Floor | Table\n\ntype alias Data =\n  { drawable : Drawable BodyCoordinates\n  , id : Id\n  }\n\ntable : Body Data\ntable =\n  Body.compound shapes\n    { id = Table\n    , drawable = Drawable.group drawables\n    }\n    |> Body.setBehavior\n      (Body.dynamic (kilograms 3.58))\n'))
	]);
var $author$project$Main$modelling4 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('initialWorld : World Data\ninitialWorld =\n  World.empty\n    |> World.setGravity\n      (Acceleration.metersPerSecondSquared 9.80665)\n      Direction3d.negativeZ\n    |> World.add table\n    |> World.add floor\n'))
	]);
var $author$project$Formatting$bullet = function (str) {
	return $w0rm$elm_slice_show$SliceShow$Content$item(
		A2(
			$elm$html$Html$li,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font', '48px sans-serif'),
					A2($elm$html$Html$Attributes$style, 'margin', '1em 0')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(str)
				])));
};
var $author$project$Main$packages1 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('使うパッケージ')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$bullets(
			_List_fromArray(
				[
					$author$project$Formatting$bullet('w0rm/elm-physics 物理シミュレーション'),
					$author$project$Formatting$bullet('ianmackenzie/elm-geometry 3D 計算'),
					$author$project$Formatting$bullet('ianmackenzie/elm-units 型安全な単位')
				])))
	]);
var $author$project$Main$packages2 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('使うパッケージ')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$bullets(
			_List_fromArray(
				[
					$author$project$Formatting$bullet('ianmackenzie/elm-3d-scene レンダリング'),
					$author$project$Formatting$bullet('ianmackenzie/elm-3d-camera'),
					$author$project$Formatting$bullet('avh4/elm-color')
				])))
	]);
var $author$project$Main$rendering1 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('レンダリング・カメラ')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$code('camera =\n  Camera3d.perspective\n    { viewpoint =\n        Viewpoint3d.lookAt\n          { eyePoint = Point3d.meters 3 4 2\n          , focalPoint = Point3d.meters -0.5 -0.5 0\n          , upDirection = Direction3d.positiveZ\n          }\n    , clipDepth = meters 0.1\n    , verticalFieldOfView = Angle.degrees 24\n    }\n'))
	]);
var $author$project$Main$rendering2 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('レンダリング・光')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$code('sunlight = Light.directional Chromaticity.daylight\n    (Illuminance.lux 10000)\n    (Direction3d.xyZ\n      (Angle.degrees 135)\n      (Angle.degrees -60)\n    )\nambientLighting = Light.overcast\n    { zenithDirection = Direction3d.z\n    , chromaticity = Chromaticity.daylight\n    , zenithLuminance = Luminance.nits 5000\n    }\n'))
	]);
var $author$project$Main$rendering3 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('レンダリング・座標系変換')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$code('drawables =\n    world\n      |> World.getBodies\n      |> List.map\n          (\\body ->\n            Drawable.placeIn\n              (Body.getFrame3d body)\n              (Body.getData body).drawable\n          )\n'))
	]);
var $author$project$Main$rendering4 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('Scene3d.render []\n  { width = width\n  , height = height\n  , camera = camera\n  , lights = Scene3d.oneLight sunlight\n      { castsShadows = True }\n  , ambientLighting = Just ambientLighting\n  , exposure = Exposure.fromMaxLuminance\n      (Luminance.nits 10000)\n  , whiteBalance = Chromaticity.daylight\n  }\n  drawables\n'))
	]);
var $w0rm$elm_slice_show$SliceShow$Slide$setDimensions = F2(
	function (_v0, _v1) {
		var width = _v0.a;
		var height = _v0.b;
		var data = _v1;
		return _Utils_update(
			data,
			{af: height, as: width});
	});
var $w0rm$elm_slice_show$SliceShow$Messages$Custom = function (a) {
	return {$: 7, a: a};
};
var $w0rm$elm_slice_show$SliceShow$Messages$Index = {$: 5};
var $w0rm$elm_slice_show$SliceShow$Messages$NavigateToUrl = function (a) {
	return {$: 8, a: a};
};
var $w0rm$elm_slice_show$SliceShow$Messages$Next = {$: 0};
var $w0rm$elm_slice_show$SliceShow$Messages$Noop = {$: 6};
var $w0rm$elm_slice_show$SliceShow$Messages$Open = function (a) {
	return {$: 3, a: a};
};
var $w0rm$elm_slice_show$SliceShow$Messages$Prev = {$: 1};
var $w0rm$elm_slice_show$SliceShow$Messages$Resize = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {ck: fragment, cm: host, cO: path, cR: port_, cU: protocol, cV: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$html$Html$Events$keyCode = A2($elm$json$Json$Decode$field, 'keyCode', $elm$json$Json$Decode$int);
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$browser$Browser$Events$Document = 0;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {cP: pids, c$: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {ch: event, cp: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.cP,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.cp;
		var event = _v0.ch;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.c$);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, 0, 'keydown');
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $w0rm$elm_slice_show$SliceShow$Model$open = F2(
	function (maybeFragment, model) {
		var _v0 = A2($elm$core$Maybe$andThen, $elm$core$String$toInt, maybeFragment);
		if (!_v0.$) {
			var _int = _v0.a;
			return ((_int > 0) && (_Utils_cmp(
				_int,
				$elm$core$List$length(model.V)) < 1)) ? _Utils_update(
				model,
				{
					dj: $elm$core$Maybe$Just(_int - 1)
				}) : _Utils_update(
				model,
				{dj: $elm$core$Maybe$Nothing});
		} else {
			return _Utils_update(
				model,
				{dj: $elm$core$Maybe$Nothing});
		}
	});
var $elm$core$Basics$round = _Basics_round;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $w0rm$elm_slice_show$SliceShow$Model$currentSlide = function (m) {
	return A2(
		$elm$core$Maybe$andThen,
		$elm$core$List$head,
		A2(
			$elm$core$Maybe$map,
			function (currentSlide_) {
				return A2($elm$core$List$drop, currentSlide_, m.V);
			},
			m.dj));
};
var $w0rm$elm_slice_show$SliceShow$State$Hidden = 1;
var $w0rm$elm_slice_show$SliceShow$ContentData$subscriptions = F2(
	function (customSubscription, elements) {
		subscriptions:
		while (true) {
			if (!elements.b) {
				return _List_Nil;
			} else {
				switch (elements.a.$) {
					case 2:
						var _v1 = elements.a;
						var state_ = _v1.a;
						var data = _v1.b;
						var rest = elements.b;
						if (state_ !== 1) {
							return A2(
								$elm$core$List$cons,
								customSubscription(data),
								A2($w0rm$elm_slice_show$SliceShow$ContentData$subscriptions, customSubscription, rest));
						} else {
							var $temp$customSubscription = customSubscription,
								$temp$elements = rest;
							customSubscription = $temp$customSubscription;
							elements = $temp$elements;
							continue subscriptions;
						}
					case 0:
						var _v2 = elements.a;
						var state_ = _v2.a;
						var render = _v2.b;
						var items = _v2.c;
						var rest = elements.b;
						if (state_ !== 1) {
							return _Utils_ap(
								A2($w0rm$elm_slice_show$SliceShow$ContentData$subscriptions, customSubscription, items),
								A2($w0rm$elm_slice_show$SliceShow$ContentData$subscriptions, customSubscription, rest));
						} else {
							var $temp$customSubscription = customSubscription,
								$temp$elements = rest;
							customSubscription = $temp$customSubscription;
							elements = $temp$elements;
							continue subscriptions;
						}
					default:
						var rest = elements.b;
						var $temp$customSubscription = customSubscription,
							$temp$elements = rest;
						customSubscription = $temp$customSubscription;
						elements = $temp$elements;
						continue subscriptions;
				}
			}
		}
	});
var $w0rm$elm_slice_show$SliceShow$SlideData$subscriptions = F2(
	function (customSubscription, slide) {
		return $elm$core$Platform$Sub$batch(
			A2($w0rm$elm_slice_show$SliceShow$ContentData$subscriptions, customSubscription, slide.dn));
	});
var $w0rm$elm_slice_show$SliceShow$Model$subscriptions = F2(
	function (customSubscription, model) {
		var _v0 = $w0rm$elm_slice_show$SliceShow$Model$currentSlide(model);
		if (!_v0.$) {
			var slide = _v0.a;
			return A2($w0rm$elm_slice_show$SliceShow$SlideData$subscriptions, customSubscription, slide);
		} else {
			return $elm$core$Platform$Sub$none;
		}
	});
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.cU;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.ck,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.cV,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.cR,
					_Utils_ap(http, url.cm)),
				url.cO)));
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Platform$Cmd$map = _Platform_map;
var $w0rm$elm_slice_show$SliceShow$ContentData$hasHidden = function (elements) {
	hasHidden:
	while (true) {
		if (!elements.b) {
			return false;
		} else {
			switch (elements.a.$) {
				case 1:
					var _v1 = elements.a;
					var state_ = _v1.a;
					var rest = elements.b;
					if (state_ === 1) {
						return true;
					} else {
						var $temp$elements = rest;
						elements = $temp$elements;
						continue hasHidden;
					}
				case 2:
					var _v3 = elements.a;
					var state_ = _v3.a;
					var rest = elements.b;
					if (state_ === 1) {
						return true;
					} else {
						var $temp$elements = rest;
						elements = $temp$elements;
						continue hasHidden;
					}
				default:
					var _v5 = elements.a;
					var state_ = _v5.a;
					var render = _v5.b;
					var items = _v5.c;
					var rest = elements.b;
					if (state_ === 1) {
						return true;
					} else {
						return $w0rm$elm_slice_show$SliceShow$ContentData$hasHidden(items) || $w0rm$elm_slice_show$SliceShow$ContentData$hasHidden(rest);
					}
			}
		}
	}
};
var $w0rm$elm_slice_show$SliceShow$SlideData$hasHiddenElements = function (_v0) {
	var elements = _v0.dn;
	return $w0rm$elm_slice_show$SliceShow$ContentData$hasHidden(elements);
};
var $w0rm$elm_slice_show$SliceShow$State$Active = 2;
var $w0rm$elm_slice_show$SliceShow$ContentData$Custom = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $w0rm$elm_slice_show$SliceShow$State$Visited = 3;
var $w0rm$elm_slice_show$SliceShow$ContentData$visited = function (state_) {
	if (state_ === 2) {
		return 3;
	} else {
		return state_;
	}
};
var $w0rm$elm_slice_show$SliceShow$ContentData$next = function (elements) {
	if (!elements.b) {
		return _List_Nil;
	} else {
		switch (elements.a.$) {
			case 1:
				var _v1 = elements.a;
				var state_ = _v1.a;
				var html = _v1.b;
				var rest = elements.b;
				if (state_ === 1) {
					return A2(
						$elm$core$List$cons,
						A2($w0rm$elm_slice_show$SliceShow$ContentData$Item, 2, html),
						rest);
				} else {
					return A2(
						$elm$core$List$cons,
						A2(
							$w0rm$elm_slice_show$SliceShow$ContentData$Item,
							$w0rm$elm_slice_show$SliceShow$ContentData$visited(state_),
							html),
						$w0rm$elm_slice_show$SliceShow$ContentData$next(rest));
				}
			case 2:
				var _v3 = elements.a;
				var state_ = _v3.a;
				var data = _v3.b;
				var rest = elements.b;
				if (state_ === 1) {
					return A2(
						$elm$core$List$cons,
						A2($w0rm$elm_slice_show$SliceShow$ContentData$Custom, 2, data),
						rest);
				} else {
					return A2(
						$elm$core$List$cons,
						A2(
							$w0rm$elm_slice_show$SliceShow$ContentData$Custom,
							$w0rm$elm_slice_show$SliceShow$ContentData$visited(state_),
							data),
						$w0rm$elm_slice_show$SliceShow$ContentData$next(rest));
				}
			default:
				var _v5 = elements.a;
				var state_ = _v5.a;
				var render = _v5.b;
				var items = _v5.c;
				var rest = elements.b;
				if (state_ === 1) {
					return A2(
						$elm$core$List$cons,
						A3($w0rm$elm_slice_show$SliceShow$ContentData$Container, 2, render, items),
						rest);
				} else {
					return $w0rm$elm_slice_show$SliceShow$ContentData$hasHidden(items) ? A2(
						$elm$core$List$cons,
						A3(
							$w0rm$elm_slice_show$SliceShow$ContentData$Container,
							$w0rm$elm_slice_show$SliceShow$ContentData$visited(state_),
							render,
							$w0rm$elm_slice_show$SliceShow$ContentData$next(items)),
						rest) : A2(
						$elm$core$List$cons,
						A3(
							$w0rm$elm_slice_show$SliceShow$ContentData$Container,
							$w0rm$elm_slice_show$SliceShow$ContentData$visited(state_),
							render,
							items),
						$w0rm$elm_slice_show$SliceShow$ContentData$next(rest));
				}
		}
	}
};
var $w0rm$elm_slice_show$SliceShow$SlideData$next = function (slide) {
	return _Utils_update(
		slide,
		{
			dn: $w0rm$elm_slice_show$SliceShow$ContentData$next(slide.dn)
		});
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $w0rm$elm_slice_show$SliceShow$Model$offset = F2(
	function (offset_, model) {
		var _v0 = model.dj;
		if (_v0.$ === 1) {
			return _Utils_update(
				model,
				{
					dj: $elm$core$Maybe$Just(0)
				});
		} else {
			var index = _v0.a;
			return _Utils_update(
				model,
				{
					dj: $elm$core$Maybe$Just(
						A3(
							$elm$core$Basics$clamp,
							0,
							$elm$core$List$length(model.V) - 1,
							index + offset_))
				});
		}
	});
var $w0rm$elm_slice_show$SliceShow$Model$replaceCurrent = F2(
	function (slide, model) {
		var replaceWith = F3(
			function (atIndex, currentIndex, currentSlide_) {
				return _Utils_eq(atIndex, currentIndex) ? slide : currentSlide_;
			});
		var _v0 = model.dj;
		if (!_v0.$) {
			var index = _v0.a;
			return _Utils_update(
				model,
				{
					V: A2(
						$elm$core$List$indexedMap,
						replaceWith(index),
						model.V)
				});
		} else {
			return model;
		}
	});
var $w0rm$elm_slice_show$SliceShow$Model$next = function (model) {
	var _v0 = $w0rm$elm_slice_show$SliceShow$Model$currentSlide(model);
	if (!_v0.$) {
		var slide = _v0.a;
		return $w0rm$elm_slice_show$SliceShow$SlideData$hasHiddenElements(slide) ? A2(
			$w0rm$elm_slice_show$SliceShow$Model$replaceCurrent,
			$w0rm$elm_slice_show$SliceShow$SlideData$next(slide),
			model) : A2($w0rm$elm_slice_show$SliceShow$Model$offset, 1, model);
	} else {
		return A2($w0rm$elm_slice_show$SliceShow$Model$offset, 1, model);
	}
};
var $w0rm$elm_slice_show$SliceShow$Model$prev = $w0rm$elm_slice_show$SliceShow$Model$offset(-1);
var $w0rm$elm_slice_show$SliceShow$ContentData$update = F3(
	function (updateCustom, action, elements) {
		if (!elements.b) {
			return _Utils_Tuple2(_List_Nil, _List_Nil);
		} else {
			switch (elements.a.$) {
				case 2:
					var _v1 = elements.a;
					var state_ = _v1.a;
					var data = _v1.b;
					var rest = elements.b;
					if (state_ !== 1) {
						var _v2 = A3($w0rm$elm_slice_show$SliceShow$ContentData$update, updateCustom, action, rest);
						var updatedSiblings = _v2.a;
						var siblingsCmd = _v2.b;
						var _v3 = A2(updateCustom, action, data);
						var updatedSelf = _v3.a;
						var selfEffect = _v3.b;
						return _Utils_eq(selfEffect, $elm$core$Platform$Cmd$none) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2($w0rm$elm_slice_show$SliceShow$ContentData$Custom, state_, updatedSelf),
								updatedSiblings),
							siblingsCmd) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2($w0rm$elm_slice_show$SliceShow$ContentData$Custom, state_, updatedSelf),
								updatedSiblings),
							A2($elm$core$List$cons, selfEffect, siblingsCmd));
					} else {
						var _v4 = A3($w0rm$elm_slice_show$SliceShow$ContentData$update, updateCustom, action, rest);
						var updatedSiblings = _v4.a;
						var siblingsCmd = _v4.b;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2($w0rm$elm_slice_show$SliceShow$ContentData$Custom, state_, data),
								updatedSiblings),
							siblingsCmd);
					}
				case 0:
					var _v5 = elements.a;
					var state_ = _v5.a;
					var render = _v5.b;
					var items = _v5.c;
					var rest = elements.b;
					var _v6 = A3($w0rm$elm_slice_show$SliceShow$ContentData$update, updateCustom, action, rest);
					var updatedSiblings = _v6.a;
					var siblingsCmd = _v6.b;
					var _v7 = A3($w0rm$elm_slice_show$SliceShow$ContentData$update, updateCustom, action, items);
					var updatedChildren = _v7.a;
					var childrenCmd = _v7.b;
					return _Utils_Tuple2(
						A2(
							$elm$core$List$cons,
							A3($w0rm$elm_slice_show$SliceShow$ContentData$Container, state_, render, updatedChildren),
							updatedSiblings),
						_Utils_ap(childrenCmd, siblingsCmd));
				default:
					var _v8 = elements.a;
					var state_ = _v8.a;
					var html = _v8.b;
					var rest = elements.b;
					var _v9 = A3($w0rm$elm_slice_show$SliceShow$ContentData$update, updateCustom, action, rest);
					var updatedSiblings = _v9.a;
					var siblingsCmd = _v9.b;
					return _Utils_Tuple2(
						A2(
							$elm$core$List$cons,
							A2($w0rm$elm_slice_show$SliceShow$ContentData$Item, state_, html),
							updatedSiblings),
						siblingsCmd);
			}
		}
	});
var $w0rm$elm_slice_show$SliceShow$SlideData$update = F3(
	function (updateCustom, customAction, slide) {
		var _v0 = A3($w0rm$elm_slice_show$SliceShow$ContentData$update, updateCustom, customAction, slide.dn);
		var newElements = _v0.a;
		var effects = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				slide,
				{dn: newElements}),
			$elm$core$Platform$Cmd$batch(effects));
	});
var $w0rm$elm_slice_show$SliceShow$Model$update = F3(
	function (updateCustom, customAction, model) {
		var _v0 = $w0rm$elm_slice_show$SliceShow$Model$currentSlide(model);
		if (!_v0.$) {
			var slide = _v0.a;
			var _v1 = A3($w0rm$elm_slice_show$SliceShow$SlideData$update, updateCustom, customAction, slide);
			var newSlide = _v1.a;
			var cmd = _v1.b;
			return _Utils_Tuple2(
				A2($w0rm$elm_slice_show$SliceShow$Model$replaceCurrent, newSlide, model),
				cmd);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $w0rm$elm_slice_show$SliceShow$Model$hash = function (model) {
	var _v0 = model.dj;
	if (_v0.$ === 1) {
		return '#';
	} else {
		var index = _v0.a;
		return '#' + $elm$core$String$fromInt(index + 1);
	}
};
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $w0rm$elm_slice_show$SliceShow$Update$withHashChange = function (model) {
	return _Utils_Tuple2(
		model,
		A2(
			$elm$browser$Browser$Navigation$pushUrl,
			model.cp,
			$w0rm$elm_slice_show$SliceShow$Model$hash(model)));
};
var $w0rm$elm_slice_show$SliceShow$Update$update = F3(
	function (updateCustom, message, model) {
		switch (message.$) {
			case 0:
				return $w0rm$elm_slice_show$SliceShow$Update$withHashChange(
					$w0rm$elm_slice_show$SliceShow$Model$next(model));
			case 1:
				return $w0rm$elm_slice_show$SliceShow$Update$withHashChange(
					$w0rm$elm_slice_show$SliceShow$Model$prev(model));
			case 5:
				return $w0rm$elm_slice_show$SliceShow$Update$withHashChange(
					_Utils_update(
						model,
						{dj: $elm$core$Maybe$Nothing}));
			case 2:
				var index = message.a;
				return $w0rm$elm_slice_show$SliceShow$Update$withHashChange(
					_Utils_update(
						model,
						{
							dj: $elm$core$Maybe$Just(index)
						}));
			case 3:
				var locationHash = message.a;
				return _Utils_Tuple2(
					A2($w0rm$elm_slice_show$SliceShow$Model$open, locationHash, model),
					$elm$core$Platform$Cmd$none);
			case 4:
				var width = message.a;
				var height = message.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{af: height, as: width}),
					$elm$core$Platform$Cmd$none);
			case 8:
				var url = message.a;
				return _Utils_Tuple2(
					model,
					$elm$browser$Browser$Navigation$load(url));
			case 6:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			default:
				var msg = message.a;
				var _v1 = A3($w0rm$elm_slice_show$SliceShow$Model$update, updateCustom, msg, model);
				var newModel = _v1.a;
				var effects = _v1.b;
				return _Utils_Tuple2(
					newModel,
					A2($elm$core$Platform$Cmd$map, $w0rm$elm_slice_show$SliceShow$Messages$Custom, effects));
		}
	});
var $w0rm$elm_slice_show$SliceShow$Messages$Goto = function (a) {
	return {$: 2, a: a};
};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $w0rm$elm_slice_show$SliceShow$View$fit = F4(
	function (w1, h1, w2, h2) {
		return (_Utils_cmp(w1 * h2, w2 * h1) < 0) ? (w1 / w2) : (h1 / h2);
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $w0rm$elm_slice_show$SliceShow$View$toPx = function (x) {
	return $elm$core$String$fromInt(x) + 'px';
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $w0rm$elm_slice_show$SliceShow$ContentData$state = function (element) {
	switch (element.$) {
		case 0:
			var state_ = element.a;
			return state_;
		case 1:
			var state_ = element.a;
			return state_;
		default:
			var state_ = element.a;
			return state_;
	}
};
var $w0rm$elm_slice_show$SliceShow$View$viewElement = F2(
	function (renderCustom, content) {
		switch (content.$) {
			case 0:
				var render = content.b;
				var items = content.c;
				return render(
					A2($w0rm$elm_slice_show$SliceShow$View$viewElements, renderCustom, items));
			case 1:
				var html = content.b;
				return html;
			default:
				var data = content.b;
				return renderCustom(data);
		}
	});
var $w0rm$elm_slice_show$SliceShow$View$viewElements = F2(
	function (renderCustom, elements) {
		return A2(
			$elm$core$List$map,
			$w0rm$elm_slice_show$SliceShow$View$viewElement(renderCustom),
			A2(
				$elm$core$List$filter,
				function (c) {
					return $w0rm$elm_slice_show$SliceShow$ContentData$state(c) !== 1;
				},
				elements));
	});
var $w0rm$elm_slice_show$SliceShow$View$viewSlide = F4(
	function (renderCustom, width, height, slide) {
		return A2(
			$elm$html$Html$map,
			$w0rm$elm_slice_show$SliceShow$Messages$Custom,
			A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'transform',
						'scale(' + ($elm$core$String$fromFloat(
							A4($w0rm$elm_slice_show$SliceShow$View$fit, width, height, slide.as, slide.af)) + ')')),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$w0rm$elm_slice_show$SliceShow$View$toPx(slide.as)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$w0rm$elm_slice_show$SliceShow$View$toPx(slide.af)),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'left', '50%'),
						A2($elm$html$Html$Attributes$style, 'top', '50%'),
						A2(
						$elm$html$Html$Attributes$style,
						'margin-left',
						$w0rm$elm_slice_show$SliceShow$View$toPx((slide.as / (-2)) | 0)),
						A2(
						$elm$html$Html$Attributes$style,
						'margin-top',
						$w0rm$elm_slice_show$SliceShow$View$toPx((slide.af / (-2)) | 0)),
						A2($elm$html$Html$Attributes$style, 'background', '#fff'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'text-align', 'left')
					]),
				A2($w0rm$elm_slice_show$SliceShow$View$viewElements, renderCustom, slide.dn)));
	});
var $w0rm$elm_slice_show$SliceShow$View$viewSlideItem = F3(
	function (renderCustom, index, slide) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'width', '240px'),
					A2($elm$html$Html$Attributes$style, 'height', '150px'),
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'margin', '20px 0 0 20px'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					A2(
					$elm$html$Html$Events$custom,
					'click',
					$elm$json$Json$Decode$succeed(
						{
							K: $w0rm$elm_slice_show$SliceShow$Messages$Goto(index),
							bO: true,
							bW: false
						}))
				]),
			_List_fromArray(
				[
					A4($w0rm$elm_slice_show$SliceShow$View$viewSlide, renderCustom, 240, 150, slide),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							A2($elm$html$Html$Attributes$style, 'top', '0'),
							A2($elm$html$Html$Attributes$style, 'width', '240px'),
							A2($elm$html$Html$Attributes$style, 'height', '150px'),
							$elm$html$Html$Attributes$href(
							'#' + $elm$core$String$fromInt(index + 1))
						]),
					_List_Nil)
				]));
	});
var $w0rm$elm_slice_show$SliceShow$View$viewContainer = F2(
	function (renderCustom, model) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'text-align', 'center')
				]),
			A2(
				$elm$core$List$indexedMap,
				$w0rm$elm_slice_show$SliceShow$View$viewSlideItem(renderCustom),
				model.V));
	});
var $w0rm$elm_slice_show$SliceShow$View$view = F2(
	function (renderCustom, model) {
		var _v0 = $w0rm$elm_slice_show$SliceShow$Model$currentSlide(model);
		if (_v0.$ === 1) {
			return A2($w0rm$elm_slice_show$SliceShow$View$viewContainer, renderCustom, model);
		} else {
			var slide = _v0.a;
			return A4($w0rm$elm_slice_show$SliceShow$View$viewSlide, renderCustom, model.as, model.af, slide);
		}
	});
var $w0rm$elm_slice_show$SliceShow$show = function (_v0) {
	var model = _v0.S;
	var update = _v0.c3;
	var view = _v0.c5;
	var subscriptions = _v0.dY;
	return $elm$browser$Browser$application(
		{
			co: F3(
				function (_v1, _v2, key) {
					var fragment = _v2.ck;
					return _Utils_Tuple2(
						A2(
							$w0rm$elm_slice_show$SliceShow$Model$open,
							fragment,
							model(key)),
						A2(
							$elm$core$Task$perform,
							function (_v3) {
								var viewport = _v3.c7;
								return A2(
									$w0rm$elm_slice_show$SliceShow$Messages$Resize,
									$elm$core$Basics$round(viewport.as),
									$elm$core$Basics$round(viewport.af));
							},
							$elm$browser$Browser$Dom$getViewport));
				}),
			dH: A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.ck;
				},
				$w0rm$elm_slice_show$SliceShow$Messages$Open),
			dI: function (request) {
				if (!request.$) {
					var url = request.a;
					return $w0rm$elm_slice_show$SliceShow$Messages$NavigateToUrl(
						$elm$url$Url$toString(url));
				} else {
					var url = request.a;
					return $w0rm$elm_slice_show$SliceShow$Messages$NavigateToUrl(url);
				}
			},
			dY: function (model_) {
				return $elm$core$Platform$Sub$batch(
					_List_fromArray(
						[
							$elm$browser$Browser$Events$onKeyDown(
							A2(
								$elm$json$Json$Decode$map,
								function (code) {
									switch (code) {
										case 37:
											return $w0rm$elm_slice_show$SliceShow$Messages$Prev;
										case 39:
											return $w0rm$elm_slice_show$SliceShow$Messages$Next;
										case 27:
											return $w0rm$elm_slice_show$SliceShow$Messages$Index;
										default:
											return $w0rm$elm_slice_show$SliceShow$Messages$Noop;
									}
								},
								$elm$html$Html$Events$keyCode)),
							$elm$browser$Browser$Events$onResize($w0rm$elm_slice_show$SliceShow$Messages$Resize),
							A2(
							$elm$core$Platform$Sub$map,
							$w0rm$elm_slice_show$SliceShow$Messages$Custom,
							A2($w0rm$elm_slice_show$SliceShow$Model$subscriptions, subscriptions, model_))
						]));
			},
			c3: $w0rm$elm_slice_show$SliceShow$Update$update(update),
			c5: function (model_) {
				return {
					dd: _List_fromArray(
						[
							A2($w0rm$elm_slice_show$SliceShow$View$view, view, model_)
						]),
					dZ: function () {
						var _v6 = model_.dj;
						if (!_v6.$) {
							var n = _v6.a;
							return 'Slide ' + $elm$core$String$fromInt(n + 1);
						} else {
							return 'Slides';
						}
					}()
				};
			}
		});
};
var $author$project$Main$simulation1 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('シミュレーション・AnimationFrame')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$code('update : Msg -> Model -> ( Model, Cmd Msg )\nupdate msg model =\n    case msg of\n        AnimationFrame ->\n            ( { model\n              | world = World.simulate\n                  (seconds (1 / 60))\n                  model.world\n              }\n            , Cmd.none\n            )\n'))
	]);
var $author$project$Main$simulation2 = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$code('type Msg\n  = AnimationFrame\n  | Resize\n      (Quantity Float Pixels)\n      (Quantity Float Pixels)\n  | MouseDown\n      (Axis3d Meters WorldCoordinates)\n  | MouseMove\n      (Axis3d Meters WorldCoordinates)\n  | MouseUp\n'))
	]);
var $w0rm$elm_slice_show$SliceShow$Slide$slide = function (elements) {
	return {dn: elements, af: 640, i: 1, as: 1024};
};
var $author$project$Main$topics = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$bullets(
			_List_fromArray(
				[
					$author$project$Formatting$bullet('必要なパッケージ'),
					$author$project$Formatting$bullet('3D モデリング'),
					$author$project$Formatting$bullet('レンダリングの設定'),
					$author$project$Formatting$bullet('シミュレーション'),
					$author$project$Formatting$bullet('ユーザーインタラクション')
				]))),
		A3(
		$author$project$Formatting$position,
		760,
		110,
		A3($author$project$Formatting$image, 400, 311, 'assets/meme.jpg'))
	]);
var $w0rm$elm_slice_show$SliceShow$Content$hide = function (content) {
	switch (content.$) {
		case 0:
			var render = content.b;
			var elements = content.c;
			return A3($w0rm$elm_slice_show$SliceShow$ContentData$Container, 1, render, elements);
		case 1:
			var html = content.b;
			return A2($w0rm$elm_slice_show$SliceShow$ContentData$Item, 1, html);
		default:
			var data = content.b;
			return A2($w0rm$elm_slice_show$SliceShow$ContentData$Custom, 1, data);
	}
};
var $author$project$Main$why = _List_fromArray(
	[
		A3(
		$author$project$Formatting$position,
		100,
		50,
		$author$project$Formatting$title('どうして「ちゃぶ台返し」？')),
		A3(
		$author$project$Formatting$position,
		100,
		180,
		$author$project$Formatting$bullets(
			_List_fromArray(
				[
					$w0rm$elm_slice_show$SliceShow$Content$hide(
					$author$project$Formatting$bullet('ストレス解消')),
					$w0rm$elm_slice_show$SliceShow$Content$hide(
					$author$project$Formatting$bullet('新しい機能')),
					$w0rm$elm_slice_show$SliceShow$Content$hide(
					$author$project$Formatting$bullet('elm-3d-sceneと使う例'))
				]))),
		A3(
		$author$project$Formatting$position,
		760,
		110,
		A3($author$project$Formatting$image, 400, 311, 'assets/meme.jpg'))
	]);
var $author$project$Main$main = $w0rm$elm_slice_show$SliceShow$show(
	$w0rm$elm_slice_show$SliceShow$init(
		A2(
			$elm$core$List$map,
			A2(
				$elm$core$Basics$composeR,
				$w0rm$elm_slice_show$SliceShow$Slide$slide,
				$w0rm$elm_slice_show$SliceShow$Slide$setDimensions(
					_Utils_Tuple2(1280, 720))),
			_List_fromArray(
				[
					$author$project$Main$intro,
					$author$project$Main$why,
					$author$project$Main$topics,
					$author$project$Main$packages1,
					$author$project$Main$packages2,
					$author$project$Main$ikea,
					$author$project$Main$blueprint,
					$author$project$Main$modelling1,
					$author$project$Main$modelling2,
					$author$project$Main$modelling3,
					$author$project$Main$modelling4,
					$author$project$Main$lack,
					$author$project$Main$rendering1,
					$author$project$Main$rendering2,
					$author$project$Main$rendering3,
					$author$project$Main$rendering4,
					$author$project$Main$simulation1,
					$author$project$Main$simulation2,
					$author$project$Main$interaction(1),
					$author$project$Main$interaction(2),
					$author$project$Main$interaction(3),
					$author$project$Main$interaction(4),
					$author$project$Main$interaction(5),
					$author$project$Main$interaction(6),
					$author$project$Main$interaction1,
					$author$project$Main$interaction2,
					$author$project$Main$interaction3,
					$author$project$Main$demo,
					$author$project$Main$links
				]))));
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));