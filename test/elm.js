
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
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


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
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


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

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

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_community$easing_functions$Ease$reverse = F2(
	function (easing, time) {
		return easing(1 - time);
	});
var _elm_community$easing_functions$Ease$flip = F2(
	function (easing, time) {
		return 1 - easing(1 - time);
	});
var _elm_community$easing_functions$Ease$retour = F2(
	function (easing, time) {
		return (_elm_lang$core$Native_Utils.cmp(time, 0.5) < 0) ? easing(time * 2) : A2(_elm_community$easing_functions$Ease$flip, easing, (time - 0.5) * 2);
	});
var _elm_community$easing_functions$Ease$inOut = F3(
	function (e1, e2, time) {
		return (_elm_lang$core$Native_Utils.cmp(time, 0.5) < 0) ? (e1(time * 2) / 2) : (0.5 + (e2((time - 0.5) * 2) / 2));
	});
var _elm_community$easing_functions$Ease$inElastic = function (time) {
	if (_elm_lang$core$Native_Utils.eq(time, 0.0)) {
		return 0.0;
	} else {
		var t = time - 1;
		var p = 0.3;
		var s = 7.5e-2;
		return 0 - (Math.pow(2, 10 * t) * _elm_lang$core$Basics$sin(((t - s) * (2 * _elm_lang$core$Basics$pi)) / p));
	}
};
var _elm_community$easing_functions$Ease$outElastic = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inElastic);
var _elm_community$easing_functions$Ease$inOutElastic = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inElastic, _elm_community$easing_functions$Ease$outElastic);
var _elm_community$easing_functions$Ease$outBounce = function (time) {
	var t4 = time - (2.625 / 2.75);
	var t3 = time - (2.25 / 2.75);
	var t2 = time - (1.5 / 2.75);
	var a = 7.5625;
	return (_elm_lang$core$Native_Utils.cmp(time, 1 / 2.75) < 0) ? ((a * time) * time) : ((_elm_lang$core$Native_Utils.cmp(time, 2 / 2.75) < 0) ? (((a * t2) * t2) + 0.75) : ((_elm_lang$core$Native_Utils.cmp(time, 2.5 / 2.75) < 0) ? (((a * t3) * t3) + 0.9375) : (((a * t4) * t4) + 0.984375)));
};
var _elm_community$easing_functions$Ease$inBounce = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$outBounce);
var _elm_community$easing_functions$Ease$inOutBounce = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inBounce, _elm_community$easing_functions$Ease$outBounce);
var _elm_community$easing_functions$Ease$inBack = function (time) {
	return (time * time) * ((2.70158 * time) - 1.70158);
};
var _elm_community$easing_functions$Ease$outBack = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inBack);
var _elm_community$easing_functions$Ease$inOutBack = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inBack, _elm_community$easing_functions$Ease$outBack);
var _elm_community$easing_functions$Ease$outCirc = function (time) {
	return _elm_lang$core$Basics$sqrt(
		1 - Math.pow(time - 1, 2));
};
var _elm_community$easing_functions$Ease$inCirc = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$outCirc);
var _elm_community$easing_functions$Ease$inOutCirc = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inCirc, _elm_community$easing_functions$Ease$outCirc);
var _elm_community$easing_functions$Ease$inExpo = function (time) {
	return _elm_lang$core$Native_Utils.eq(time, 0.0) ? 0.0 : Math.pow(2, 10 * (time - 1));
};
var _elm_community$easing_functions$Ease$outExpo = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inExpo);
var _elm_community$easing_functions$Ease$inOutExpo = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inExpo, _elm_community$easing_functions$Ease$outExpo);
var _elm_community$easing_functions$Ease$outSine = function (time) {
	return _elm_lang$core$Basics$sin(time * (_elm_lang$core$Basics$pi / 2));
};
var _elm_community$easing_functions$Ease$inSine = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$outSine);
var _elm_community$easing_functions$Ease$inOutSine = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inSine, _elm_community$easing_functions$Ease$outSine);
var _elm_community$easing_functions$Ease$inQuint = function (time) {
	return Math.pow(time, 5);
};
var _elm_community$easing_functions$Ease$outQuint = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inQuint);
var _elm_community$easing_functions$Ease$inOutQuint = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inQuint, _elm_community$easing_functions$Ease$outQuint);
var _elm_community$easing_functions$Ease$inQuart = function (time) {
	return Math.pow(time, 4);
};
var _elm_community$easing_functions$Ease$outQuart = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inQuart);
var _elm_community$easing_functions$Ease$inOutQuart = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inQuart, _elm_community$easing_functions$Ease$outQuart);
var _elm_community$easing_functions$Ease$inCubic = function (time) {
	return Math.pow(time, 3);
};
var _elm_community$easing_functions$Ease$outCubic = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inCubic);
var _elm_community$easing_functions$Ease$inOutCubic = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inCubic, _elm_community$easing_functions$Ease$outCubic);
var _elm_community$easing_functions$Ease$inQuad = function (time) {
	return Math.pow(time, 2);
};
var _elm_community$easing_functions$Ease$outQuad = _elm_community$easing_functions$Ease$flip(_elm_community$easing_functions$Ease$inQuad);
var _elm_community$easing_functions$Ease$inOutQuad = A2(_elm_community$easing_functions$Ease$inOut, _elm_community$easing_functions$Ease$inQuad, _elm_community$easing_functions$Ease$outQuad);
var _elm_community$easing_functions$Ease$bezier = F5(
	function (x1, y1, x2, y2, time) {
		var pair = F4(
			function (interpolate, _p1, _p0, v) {
				var _p2 = _p1;
				var _p3 = _p0;
				return {
					ctor: '_Tuple2',
					_0: A3(interpolate, _p2._0, _p3._0, v),
					_1: A3(interpolate, _p2._1, _p3._1, v)
				};
			});
		var lerp = F3(
			function (from, to, v) {
				return from + ((to - from) * v);
			});
		var casteljau = function (ps) {
			casteljau:
			while (true) {
				var _p4 = ps;
				if (((_p4.ctor === '::') && (_p4._0.ctor === '_Tuple2')) && (_p4._1.ctor === '[]')) {
					return _p4._0._1;
				} else {
					var _p5 = _p4;
					var _v3 = A3(
						_elm_lang$core$List$map2,
						F2(
							function (x, y) {
								return A4(pair, lerp, x, y, time);
							}),
						_p5,
						A2(
							_elm_lang$core$Maybe$withDefault,
							{ctor: '[]'},
							_elm_lang$core$List$tail(_p5)));
					ps = _v3;
					continue casteljau;
				}
			}
		};
		return casteljau(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: 0},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: x1, _1: y1},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: x2, _1: y2},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 1, _1: 1},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _elm_community$easing_functions$Ease$linear = _elm_lang$core$Basics$identity;


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * File: mjs
 *
 * Vector and Matrix math utilities for JavaScript, optimized for WebGL.
 * Edited to work with the Elm Programming Language
 */

var _elm_community$linear_algebra$Native_MJS = function() {


    /*
     * Constant: MJS_VERSION
     *
     * mjs version number aa.bb.cc, encoded as an integer of the form:
     * 0xaabbcc.
     */
    var MJS_VERSION = 0x000000;

    /*
     * Constant: MJS_DO_ASSERT
     *
     * Enables or disables runtime assertions.
     *
     * For potentially more performance, the assert methods can be
     * commented out in each place where they are called.
     */
    // var MJS_DO_ASSERT = false;

    /*
     * Constant: MJS_FLOAT_ARRAY_TYPE
     *
     * The base float array type.  By default, WebGLFloatArray.
     *
     * mjs can work with any array-like elements, but if an array
     * creation is requested, it will create an array of the type
     * MJS_FLOAT_ARRAY_TYPE.  Also, the builtin constants such as (M4x4.I)
     * will be of this type.
     */
    //MJS_FLOAT_ARRAY_TYPE = WebGLFloatArray;
    //MJS_FLOAT_ARRAY_TYPE = Float32Array;
    var MJS_FLOAT_ARRAY_TYPE = Float64Array;
    //MJS_FLOAT_ARRAY_TYPE = Array;

    /*
    if (MJS_DO_ASSERT) {
        function MathUtils_assert(cond, msg) {
            if (!cond) {
                throw "Assertion failed: " + msg;
            }
        }
    } else {
    */
        function MathUtils_assert() { }
    //}

    /*
     * Class: V3
     *
     * Methods for working with 3-element vectors.  A vector is represented by a 3-element array.
     * Any valid JavaScript array type may be used, but if new
     * vectors are created they are created using the configured MJS_FLOAT_ARRAY_TYPE.
     */

    var V3 = { };

    V3._temp1 = new MJS_FLOAT_ARRAY_TYPE(3);
    V3._temp2 = new MJS_FLOAT_ARRAY_TYPE(3);
    V3._temp3 = new MJS_FLOAT_ARRAY_TYPE(3);

    if (MJS_FLOAT_ARRAY_TYPE == Array) {
        V3.x = [1.0, 0.0, 0.0];
        V3.y = [0.0, 1.0, 0.0];
        V3.z = [0.0, 0.0, 1.0];

        V3.$ = function V3_$(x, y, z) {
            return [x, y, z];
        };
    } else {
        V3.x = new MJS_FLOAT_ARRAY_TYPE([1.0, 0.0, 0.0]);
        V3.y = new MJS_FLOAT_ARRAY_TYPE([0.0, 1.0, 0.0]);
        V3.z = new MJS_FLOAT_ARRAY_TYPE([0.0, 0.0, 1.0]);

        /*
         * Function: V3.$
         *
         * Creates a new 3-element vector with the given values.
         *
         * Parameters:
         *
         *   x,y,z - the 3 elements of the new vector.
         *
         * Returns:
         *
         * A new vector containing with the given argument values.
         */

        V3.$ = function V3_$(x, y, z) {
            return new MJS_FLOAT_ARRAY_TYPE([x, y, z]);
        };
    }

    V3.u = V3.x;
    V3.v = V3.y;

    V3.getX = function V3_getX(a) {
        return a[0];
    }
    V3.getY = function V3_getY(a) {
        return a[1];
    }
    V3.getZ = function V3_getZ(a) {
        return a[2];
    }
    V3.setX = function V3_setX(x, a) {
        return new MJS_FLOAT_ARRAY_TYPE([x, a[1], a[2]]);
    }
    V3.setY = function V3_setY(y, a) {
        return new MJS_FLOAT_ARRAY_TYPE([a[0], y, a[2]]);
    }
    V3.setZ = function V3_setZ(z, a) {
        return new MJS_FLOAT_ARRAY_TYPE([a[0], a[1], z]);
    }

    V3.toTuple3 = function V3_toTuple3(a) {
      return {
        ctor:"_Tuple3",
        _0:a[0],
        _1:a[1],
        _2:a[2]
      };
    };
    V3.fromTuple3 = function V3_fromTuple3(t) {
      return new MJS_FLOAT_ARRAY_TYPE([t._0, t._1, t._2]);
    };

    V3.toRecord3 = function V3_toRecord3(a) {
      return {
        _:{},
        x:a[0],
        y:a[1],
        z:a[2]
      };
    };
    V3.fromRecord3 = function V3_fromRecord3(r) {
      return new MJS_FLOAT_ARRAY_TYPE([r.x, r.y, r.z]);
    };

    /*
     * Function: V3.add
     *
     * Perform r = a + b.
     *
     * Parameters:
     *
     *   a - the first vector operand
     *   b - the second vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.add = function V3_add(a, b, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(b.length == 3, "b.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        return r;
    };

    /*
     * Function: V3.sub
     *
     * Perform
     * r = a - b.
     *
     * Parameters:
     *
     *   a - the first vector operand
     *   b - the second vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.sub = function V3_sub(a, b, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(b.length == 3, "b.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        return r;
    };

    /*
     * Function: V3.neg
     *
     * Perform
     * r = - a.
     *
     * Parameters:
     *
     *   a - the vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.neg = function V3_neg(a, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        r[0] = - a[0];
        r[1] = - a[1];
        r[2] = - a[2];
        return r;
    };

    /*
     * Function: V3.direction
     *
     * Perform
     * r = (a - b) / |a - b|.  The result is the normalized
     * direction from a to b.
     *
     * Parameters:
     *
     *   a - the first vector operand
     *   b - the second vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.direction = function V3_direction(a, b, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(b.length == 3, "b.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        return V3.normalize(V3.sub(a, b, r), r);
    };

    /*
     * Function: V3.length
     *
     * Perform r = |a|.
     *
     * Parameters:
     *
     *   a - the vector operand
     *
     * Returns:
     *
     *   The length of the given vector.
     */
    V3.length = function V3_length(a) {
        //MathUtils_assert(a.length == 3, "a.length == 3");

        return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
    };

    /*
     * Function: V3.lengthSquard
     *
     * Perform r = |a|*|a|.
     *
     * Parameters:
     *
     *   a - the vector operand
     *
     * Returns:
     *
     *   The square of the length of the given vector.
     */
    V3.lengthSquared = function V3_lengthSquared(a) {
        //MathUtils_assert(a.length == 3, "a.length == 3");

        return a[0]*a[0] + a[1]*a[1] + a[2]*a[2];
    };

    V3.distance = function V3_distance(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        var dz = a[2] - b[2];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    V3.distanceSquared = function V3_distanceSquared(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        var dz = a[2] - b[2];
        return dx * dx + dy * dy + dz * dz;
    };

    /*
     * Function: V3.normalize
     *
     * Perform r = a / |a|.
     *
     * Parameters:
     *
     *   a - the vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.normalize = function V3_normalize(a, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        var im = 1.0 / V3.length(a);
        r[0] = a[0] * im;
        r[1] = a[1] * im;
        r[2] = a[2] * im;
        return r;
    };

    /*
     * Function: V3.scale
     *
     * Perform r = k * a.
     *
     * Parameters:
     *
     *   a - the vector operand
     *   k - a scalar value
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.scale = function V3_scale(k, a, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        r[0] = a[0] * k;
        r[1] = a[1] * k;
        r[2] = a[2] * k;
        return r;
    };

    /*
     * Function: V3.dot
     *
     * Perform
     * r = dot(a, b).
     *
     * Parameters:
     *
     *   a - the first vector operand
     *   b - the second vector operand
     *
     * Returns:
     *
     *   The dot product of a and b.
     */
    V3.dot = function V3_dot(a, b) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(b.length == 3, "b.length == 3");

        return a[0] * b[0] +
            a[1] * b[1] +
            a[2] * b[2];
    };

    /*
     * Function: V3.cross
     *
     * Perform r = a x b.
     *
     * Parameters:
     *
     *   a - the first vector operand
     *   b - the second vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     */
    V3.cross = function V3_cross(a, b, r) {
        //MathUtils_assert(a.length == 3, "a.length == 3");
        //MathUtils_assert(b.length == 3, "b.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        r[0] = a[1]*b[2] - a[2]*b[1];
        r[1] = a[2]*b[0] - a[0]*b[2];
        r[2] = a[0]*b[1] - a[1]*b[0];
        return r;
    };

    /*
     * Function: V3.mul4x4
     *
     * Perform
     * r = m * v.
     *
     * Parameters:
     *
     *   m - the 4x4 matrix operand
     *   v - the 3-element vector operand
     *   r - optional vector to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3-element vector with the result.
     *   The 4-element result vector is divided by the w component
     *   and returned as a 3-element vector.
     */
    V3.mul4x4 = function V3_mul4x4(m, v, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");

        var w;
        var tmp = V3._temp1;
        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);
        tmp[0] = m[ 3];
        tmp[1] = m[ 7];
        tmp[2] = m[11];
        w    =  V3.dot(v, tmp) + m[15];
        tmp[0] = m[ 0];
        tmp[1] = m[ 4];
        tmp[2] = m[ 8];
        r[0] = (V3.dot(v, tmp) + m[12])/w;
        tmp[0] = m[ 1];
        tmp[1] = m[ 5];
        tmp[2] = m[ 9];
        r[1] = (V3.dot(v, tmp) + m[13])/w;
        tmp[0] = m[ 2];
        tmp[1] = m[ 6];
        tmp[2] = m[10];
        r[2] = (V3.dot(v, tmp) + m[14])/w;
        return r;
    };

    /*
     * Class: M4x4
     *
     * Methods for working with 4x4 matrices.  A matrix is represented by a 16-element array
     * in column-major order.  Any valid JavaScript array type may be used, but if new
     * matrices are created they are created using the configured MJS_FLOAT_ARRAY_TYPE.
     */

    var M4x4 = { };

    M4x4._temp1 = new MJS_FLOAT_ARRAY_TYPE(16);
    M4x4._temp2 = new MJS_FLOAT_ARRAY_TYPE(16);

    if (MJS_FLOAT_ARRAY_TYPE == Array) {
        M4x4.I = [1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0];

        M4x4.$ = function M4x4_$(m00, m01, m02, m03,
                m04, m05, m06, m07,
                m08, m09, m10, m11,
                m12, m13, m14, m15)
        {
            return [m00, m01, m02, m03,
            m04, m05, m06, m07,
            m08, m09, m10, m11,
            m12, m13, m14, m15];
        };
    } else {
        M4x4.I = new MJS_FLOAT_ARRAY_TYPE([1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0]);

        /*
         * Function: M4x4.$
         *
         * Creates a new 4x4 matrix with the given values.
         *
         * Parameters:
         *
         *   m00..m15 - the 16 elements of the new matrix.
         *
         * Returns:
         *
         * A new matrix filled with the given argument values.
         */
        M4x4.$ = function M4x4_$(m00, m01, m02, m03,
                m04, m05, m06, m07,
                m08, m09, m10, m11,
                m12, m13, m14, m15)
        {
            return new MJS_FLOAT_ARRAY_TYPE([m00, m01, m02, m03,
                    m04, m05, m06, m07,
                    m08, m09, m10, m11,
                    m12, m13, m14, m15]);
        };
    }

    M4x4.identity = M4x4.I;

    /*
     * Function: M4x4.fromList
     *
     * Creates a new 4x4 matrix with the given values.
     *
     * Parameters:
     *
     *   list - A list of the 16 elements of the new matrix.
     *
     * Returns:
     *
     * Just a new matrix filled with the given argument values.
     * Nothing, if the length of the list is not exactly 16.
     */
    M4x4.fromList = function(list) {
        var m = _elm_lang$core$Native_List.toArray(list);
        if (m.length === 16) {
            return _elm_lang$core$Maybe$Just(M4x4.$(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]));
        } else {
            return _elm_lang$core$Maybe$Nothing;
        }
    }

    /*
     * Function: M4x4.topLeft3x3
     *
     * Return the top left 3x3 matrix from the given 4x4 matrix m.
     *
     * Parameters:
     *
     *   m - the matrix
     *   r - optional 3x3 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3x3 matrix with the result.
     */
    M4x4.topLeft3x3 = function M4x4_topLeft3x3(m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 9, "r == undefined || r.length == 9");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(9);
        r[0] = m[0]; r[1] = m[1]; r[2] = m[2];
        r[3] = m[4]; r[4] = m[5]; r[5] = m[6];
        r[6] = m[8]; r[7] = m[9]; r[8] = m[10];
        return r;
    };

    /*
     * Function: M4x4.inverse
     *
     * Computes the inverse of the given matrix m.
     *
     * Parameters:
     *
     *   m - the matrix
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.inverse = function M4x4_inverse(m, r) {
        if (r == undefined) {
            r = new MJS_FLOAT_ARRAY_TYPE(16);
        }

        r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
            m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
        r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
            m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
        r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
            m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
        r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
            m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
        r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
            m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
        r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
            m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
        r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
            m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
        r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
            m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
        r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
            m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
        r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
            m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
        r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
            m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
        r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
            m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
        r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
            m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
        r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
            m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
        r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
            m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
        r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
            m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

        var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

        if (det === 0) {
            return _elm_lang$core$Maybe$Nothing;
        }

        det = 1.0 / det;

        for (var i = 0; i < 16; i = i + 1) {
            r[i] = r[i] * det;
        }

        return _elm_lang$core$Maybe$Just(r);
    };

    /*
     * Function: M4x4.inverseOrthonormal
     *
     * Computes the inverse of the given matrix m, assuming that
     * the matrix is orthonormal.
     *
     * Parameters:
     *
     *   m - the matrix
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.inverseOrthonormal = function M4x4_inverseOrthonormal(m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        //MathUtils_assert(m != r, "m != r");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);
        M4x4.transpose(m, r);
        var t = [m[12], m[13], m[14]];
        r[3] = r[7] = r[11] = 0;
        r[12] = -V3.dot([r[0], r[4], r[8]], t);
        r[13] = -V3.dot([r[1], r[5], r[9]], t);
        r[14] = -V3.dot([r[2], r[6], r[10]], t);
        return r;
    };

    /*
     * Function: M4x4.inverseTo3x3
     *
     * Computes the inverse of the given matrix m, but calculates
     * only the top left 3x3 values of the result.
     *
     * Parameters:
     *
     *   m - the matrix
     *   r - optional 3x3 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 3x3 matrix with the result.
     */
    M4x4.inverseTo3x3 = function M4x4_inverseTo3x3(m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 9, "r == undefined || r.length == 9");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(9);

        var a11 = m[10]*m[5]-m[6]*m[9],
            a21 = -m[10]*m[1]+m[2]*m[9],
            a31 = m[6]*m[1]-m[2]*m[5],
            a12 = -m[10]*m[4]+m[6]*m[8],
            a22 = m[10]*m[0]-m[2]*m[8],
            a32 = -m[6]*m[0]+m[2]*m[4],
            a13 = m[9]*m[4]-m[5]*m[8],
            a23 = -m[9]*m[0]+m[1]*m[8],
            a33 = m[5]*m[0]-m[1]*m[4];
        var det = m[0]*(a11) + m[1]*(a12) + m[2]*(a13);
        if (det == 0) // no inverse
            throw "matrix not invertible";
        var idet = 1.0 / det;

        r[0] = idet*a11;
        r[1] = idet*a21;
        r[2] = idet*a31;
        r[3] = idet*a12;
        r[4] = idet*a22;
        r[5] = idet*a32;
        r[6] = idet*a13;
        r[7] = idet*a23;
        r[8] = idet*a33;

        return r;
    };

    /*
     * Function: M4x4.makeFrustum
     *
     * Creates a matrix for a projection frustum with the given parameters.
     *
     * Parameters:
     *
     *   left - the left coordinate of the frustum
     *   right- the right coordinate of the frustum
     *   bottom - the bottom coordinate of the frustum
     *   top - the top coordinate of the frustum
     *   znear - the near z distance of the frustum
     *   zfar - the far z distance of the frustum
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the projection matrix.
     *   Otherwise, returns a new 4x4 matrix.
     */
    M4x4.makeFrustum = function M4x4_makeFrustum(left, right, bottom, top, znear, zfar, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        var X = 2*znear/(right-left);
        var Y = 2*znear/(top-bottom);
        var A = (right+left)/(right-left);
        var B = (top+bottom)/(top-bottom);
        var C = -(zfar+znear)/(zfar-znear);
        var D = -2*zfar*znear/(zfar-znear);

        r[0] = 2*znear/(right-left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2*znear/(top-bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = (right+left)/(right-left);
        r[9] = (top+bottom)/(top-bottom);
        r[10] = -(zfar+znear)/(zfar-znear);
        r[11] = -1;
        r[12] = 0;
        r[13] = 0;
        r[14] = -2*zfar*znear/(zfar-znear);
        r[15] = 0;

        return r;
    };

    /*
     * Function: M4x4.makePerspective
     *
     * Creates a matrix for a perspective projection with the given parameters.
     *
     * Parameters:
     *
     *   fovy - field of view in the y axis, in degrees
     *   aspect - aspect ratio
     *   znear - the near z distance of the projection
     *   zfar - the far z distance of the projection
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the projection matrix.
     *   Otherwise, returns a new 4x4 matrix.
     */
    M4x4.makePerspective = function M4x4_makePerspective (fovy, aspect, znear, zfar, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return M4x4.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar, r);
    };

    /*
     * Function: M4x4.makeOrtho
     *
     * Creates a matrix for an orthogonal frustum projection with the given parameters.
     *
     * Parameters:
     *
     *   left - the left coordinate of the frustum
     *   right- the right coordinate of the frustum
     *   bottom - the bottom coordinate of the frustum
     *   top - the top coordinate of the frustum
     *   znear - the near z distance of the frustum
     *   zfar - the far z distance of the frustum
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the projection matrix.
     *   Otherwise, returns a new 4x4 matrix.
     */
    M4x4.makeOrtho = function M4x4_makeOrtho (left, right, bottom, top, znear, zfar, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        var tX = -(right+left)/(right-left);
        var tY = -(top+bottom)/(top-bottom);
        var tZ = -(zfar+znear)/(zfar-znear);
        var X = 2 / (right-left);
        var Y = 2 / (top-bottom);
        var Z = -2 / (zfar-znear);

        r[0] = 2 / (right-left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 / (top-bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = -2 / (zfar-znear);
        r[11] = 0;
        r[12] = -(right+left)/(right-left);
        r[13] = -(top+bottom)/(top-bottom);
        r[14] = -(zfar+znear)/(zfar-znear);
        r[15] = 1;

        return r;
    };

    /*
     * Function: M4x4.makeOrtho2D
     *
     * Creates a matrix for a 2D orthogonal frustum projection with the given parameters.
     * znear and zfar are assumed to be -1 and 1, respectively.
     *
     * Parameters:
     *
     *   left - the left coordinate of the frustum
     *   right- the right coordinate of the frustum
     *   bottom - the bottom coordinate of the frustum
     *   top - the top coordinate of the frustum
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the projection matrix.
     *   Otherwise, returns a new 4x4 matrix.
     */
    M4x4.makeOrtho2D = function M4x4_makeOrtho2D (left, right, bottom, top, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        return M4x4.makeOrtho(left, right, bottom, top, -1, 1, r);
    };

    /*
     * Function: M4x4.mul
     *
     * Performs r = a * b.
     *
     * Parameters:
     *
     *   a - the first matrix operand
     *   b - the second matrix operand
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.mul = function M4x4_mul(a, b, r) {
        //MathUtils_assert(a.length == 16, "a.length == 16");
        //MathUtils_assert(b.length == 16, "b.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        //MathUtils_assert(a != r && b != r, "a != r && b != r");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        var a11 = a[0];
        var a21 = a[1];
        var a31 = a[2];
        var a41 = a[3];
        var a12 = a[4];
        var a22 = a[5];
        var a32 = a[6];
        var a42 = a[7];
        var a13 = a[8];
        var a23 = a[9];
        var a33 = a[10];
        var a43 = a[11];
        var a14 = a[12];
        var a24 = a[13];
        var a34 = a[14];
        var a44 = a[15];

        var b11 = b[0];
        var b21 = b[1];
        var b31 = b[2];
        var b41 = b[3];
        var b12 = b[4];
        var b22 = b[5];
        var b32 = b[6];
        var b42 = b[7];
        var b13 = b[8];
        var b23 = b[9];
        var b33 = b[10];
        var b43 = b[11];
        var b14 = b[12];
        var b24 = b[13];
        var b34 = b[14];
        var b44 = b[15];

        r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return r;
    };

    /*
     * Function: M4x4.mulAffine
     *
     * Performs r = a * b, assuming a and b are affine (elements 3,7,11,15 = 0,0,0,1)
     *
     * Parameters:
     *
     *   a - the first matrix operand
     *   b - the second matrix operand
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.mulAffine = function M4x4_mulAffine(a, b, r) {
        //MathUtils_assert(a.length == 16, "a.length == 16");
        //MathUtils_assert(b.length == 16, "b.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        //MathUtils_assert(a != r && b != r, "a != r && b != r");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);
        var a11 = a[0];
        var a21 = a[1];
        var a31 = a[2];
        var a12 = a[4];
        var a22 = a[5];
        var a32 = a[6];
        var a13 = a[8];
        var a23 = a[9];
        var a33 = a[10];
        var a14 = a[12];
        var a24 = a[13];
        var a34 = a[14];

        var b11 = b[0];
        var b21 = b[1];
        var b31 = b[2];
        var b12 = b[4];
        var b22 = b[5];
        var b32 = b[6];
        var b13 = b[8];
        var b23 = b[9];
        var b33 = b[10];
        var b14 = b[12];
        var b24 = b[13];
        var b34 = b[14];

        r[0] = a11 * b11 + a12 * b21 + a13 * b31;
        r[1] = a21 * b11 + a22 * b21 + a23 * b31;
        r[2] = a31 * b11 + a32 * b21 + a33 * b31;
        r[3] = 0;
        r[4] = a11 * b12 + a12 * b22 + a13 * b32;
        r[5] = a21 * b12 + a22 * b22 + a23 * b32;
        r[6] = a31 * b12 + a32 * b22 + a33 * b32;
        r[7] = 0;
        r[8] = a11 * b13 + a12 * b23 + a13 * b33;
        r[9] = a21 * b13 + a22 * b23 + a23 * b33;
        r[10] = a31 * b13 + a32 * b23 + a33 * b33;
        r[11] = 0;
        r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
        r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
        r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
        r[15] = 1;

        return r;
    };

    /*
     * Function: M4x4.makeRotate
     *
     * Creates a transformation matrix for rotation by angle radians about the 3-element vector axis.
     *
     * Parameters:
     *
     *   angle - the angle of rotation, in radians
     *   axis - the axis around which the rotation is performed, a 3-element vector
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the matrix.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.makeRotate = function M4x4_makeRotate(angle, axis, r) {
        //MathUtils_assert(angle.length == 3, "angle.length == 3");
        //MathUtils_assert(axis.length == 3, "axis.length == 3");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        axis = V3.normalize(axis, V3._temp1);
        var x = axis[0], y = axis[1], z = axis[2];
        var c = Math.cos(angle);
        var c1 = 1-c;
        var s = Math.sin(angle);

        r[0] = x*x*c1+c;
        r[1] = y*x*c1+z*s;
        r[2] = z*x*c1-y*s;
        r[3] = 0;
        r[4] = x*y*c1-z*s;
        r[5] = y*y*c1+c;
        r[6] = y*z*c1+x*s;
        r[7] = 0;
        r[8] = x*z*c1+y*s;
        r[9] = y*z*c1-x*s;
        r[10] = z*z*c1+c;
        r[11] = 0;
        r[12] = 0;
        r[13] = 0;
        r[14] = 0;
        r[15] = 1;

        return r;
    };

    /*
     * Function: M4x4.rotate
     *
     * Concatenates a rotation of angle radians about the axis to the give matrix m.
     *
     * Parameters:
     *
     *   angle - the angle of rotation, in radians
     *   axis - the axis around which the rotation is performed, a 3-element vector
     *   m - the matrix to concatenate the rotation to
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after performing the operation.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.rotate = function M4x4_rotate(angle, axis, m, r) {
        //MathUtils_assert(angle.length == 3, "angle.length == 3");
        //MathUtils_assert(axis.length == 3, "axis.length == 3");
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);
        var a0=axis [0], a1=axis [1], a2=axis [2];
        var l = Math.sqrt(a0*a0 + a1*a1 + a2*a2);
        var x = a0, y = a1, z = a2;
        if (l != 1.0) {
            var im = 1.0 / l;
            x *= im;
            y *= im;
            z *= im;
        }
        var c = Math.cos(angle);
        var c1 = 1-c;
        var s = Math.sin(angle);
        var xs = x*s;
        var ys = y*s;
        var zs = z*s;
        var xyc1 = x * y * c1;
        var xzc1 = x * z * c1;
        var yzc1 = y * z * c1;

        var m11 = m[0];
        var m21 = m[1];
        var m31 = m[2];
        var m41 = m[3];
        var m12 = m[4];
        var m22 = m[5];
        var m32 = m[6];
        var m42 = m[7];
        var m13 = m[8];
        var m23 = m[9];
        var m33 = m[10];
        var m43 = m[11];

        var t11 = x * x * c1 + c;
        var t21 = xyc1 + zs;
        var t31 = xzc1 - ys;
        var t12 = xyc1 - zs;
        var t22 = y * y * c1 + c;
        var t32 = yzc1 + xs;
        var t13 = xzc1 + ys;
        var t23 = yzc1 - xs;
        var t33 = z * z * c1 + c;

        r[0] = m11 * t11 + m12 * t21 + m13 * t31;
        r[1] = m21 * t11 + m22 * t21 + m23 * t31;
        r[2] = m31 * t11 + m32 * t21 + m33 * t31;
        r[3] = m41 * t11 + m42 * t21 + m43 * t31;
        r[4] = m11 * t12 + m12 * t22 + m13 * t32;
        r[5] = m21 * t12 + m22 * t22 + m23 * t32;
        r[6] = m31 * t12 + m32 * t22 + m33 * t32;
        r[7] = m41 * t12 + m42 * t22 + m43 * t32;
        r[8] = m11 * t13 + m12 * t23 + m13 * t33;
        r[9] = m21 * t13 + m22 * t23 + m23 * t33;
        r[10] = m31 * t13 + m32 * t23 + m33 * t33;
        r[11] = m41 * t13 + m42 * t23 + m43 * t33;
        if (r != m) {
            r[12] = m[12];
            r[13] = m[13];
            r[14] = m[14];
            r[15] = m[15];
        }
        return r;
    };

    /*
     * Function: M4x4.makeScale3
     *
     * Creates a transformation matrix for scaling by 3 scalar values, one for
     * each of the x, y, and z directions.
     *
     * Parameters:
     *
     *   x - the scale for the x axis
     *   y - the scale for the y axis
     *   z - the scale for the z axis
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the matrix.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.makeScale3 = function M4x4_makeScale3(x, y, z, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        r[0] = x;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = y;
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = z;
        r[11] = 0;
        r[12] = 0;
        r[13] = 0;
        r[14] = 0;
        r[15] = 1;

        return r;
    };

    /*
     * Function: M4x4.makeScale1
     *
     * Creates a transformation matrix for a uniform scale by a single scalar value.
     *
     * Parameters:
     *
     *   k - the scale factor
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the matrix.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.makeScale1 = function M4x4_makeScale1(k, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        return M4x4.makeScale3(k, k, k, r);
    };

    /*
     * Function: M4x4.makeScale
     *
     * Creates a transformation matrix for scaling each of the x, y, and z axes by the amount
     * given in the corresponding element of the 3-element vector.
     *
     * Parameters:
     *
     *   v - the 3-element vector containing the scale factors
     *   r - optional 4x4 matrix to store the result in
     *
     * Returns:
     *
     *   If r is specified, returns r after creating the matrix.
     *   Otherwise, returns a new 4x4 matrix with the result.
     */
    M4x4.makeScale = function M4x4_makeScale(v, r) {
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        return M4x4.makeScale3(v[0], v[1], v[2], r);
    };

    /*
     * Function: M4x4.scale3
     */
    M4x4.scale3 = function M4x4_scale3(x, y, z, m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == m) {
            m[0] *= x;
            m[1] *= x;
            m[2] *= x;
            m[3] *= x;
            m[4] *= y;
            m[5] *= y;
            m[6] *= y;
            m[7] *= y;
            m[8] *= z;
            m[9] *= z;
            m[10] *= z;
            m[11] *= z;
            return m;
        }

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        r[0] = m[0] * x;
        r[1] = m[1] * x;
        r[2] = m[2] * x;
        r[3] = m[3] * x;
        r[4] = m[4] * y;
        r[5] = m[5] * y;
        r[6] = m[6] * y;
        r[7] = m[7] * y;
        r[8] = m[8] * z;
        r[9] = m[9] * z;
        r[10] = m[10] * z;
        r[11] = m[11] * z;
        r[12] = m[12];
        r[13] = m[13];
        r[14] = m[14];
        r[15] = m[15];

        return r;
    };

    /*
     * Function: M4x4.scale1
     */
    M4x4.scale1 = function M4x4_scale1(k, m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        if (r == m) {
            m[0] *= k;
            m[1] *= k;
            m[2] *= k;
            m[3] *= k;
            m[4] *= k;
            m[5] *= k;
            m[6] *= k;
            m[7] *= k;
            m[8] *= k;
            m[9] *= k;
            m[10] *= k;
            m[11] *= k;
            return m;
        }


        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        r[0] = m[0] * k;
        r[1] = m[1] * k;
        r[2] = m[2] * k;
        r[3] = m[3] * k;
        r[4] = m[4] * k;
        r[5] = m[5] * k;
        r[6] = m[6] * k;
        r[7] = m[7] * k;
        r[8] = m[8] * k;
        r[9] = m[9] * k;
        r[10] = m[10] * k;
        r[11] = m[11] * k;
        r[12] = m[12];
        r[13] = m[13];
        r[14] = m[14];
        r[15] = m[15];

        return r;
    };

    /*
     * Function: M4x4.scale1
     */
    M4x4.scale = function M4x4_scale(v, m, r) {
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        var x = v[0], y = v[1], z = v[2];

        if (r == m) {
            m[0] *= x;
            m[1] *= x;
            m[2] *= x;
            m[3] *= x;
            m[4] *= y;
            m[5] *= y;
            m[6] *= y;
            m[7] *= y;
            m[8] *= z;
            m[9] *= z;
            m[10] *= z;
            m[11] *= z;
            return m;
        }

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);


        r[0] = m[0] * x;
        r[1] = m[1] * x;
        r[2] = m[2] * x;
        r[3] = m[3] * x;
        r[4] = m[4] * y;
        r[5] = m[5] * y;
        r[6] = m[6] * y;
        r[7] = m[7] * y;
        r[8] = m[8] * z;
        r[9] = m[9] * z;
        r[10] = m[10] * z;
        r[11] = m[11] * z;
        r[12] = m[12];
        r[13] = m[13];
        r[14] = m[14];
        r[15] = m[15];

        return r;
    };

    /*
     * Function: M4x4.makeTranslate3
     */
    M4x4.makeTranslate3 = function M4x4_makeTranslate3(x, y, z, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        r[0] = 1;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 1;
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = 1;
        r[11] = 0;
        r[12] = x;
        r[13] = y;
        r[14] = z;
        r[15] = 1;

        return r;
    };

    /*
     * Function: M4x4.makeTranslate1
     */
    M4x4.makeTranslate1 = function M4x4_makeTranslate1 (k, r) {
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        return M4x4.makeTranslate3(k, k, k, r);
    };

    /*
     * Function: M4x4.makeTranslate
     */
    M4x4.makeTranslate = function M4x4_makeTranslate (v, r) {
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        return M4x4.makeTranslate3(v[0], v[1], v[2], r);
    };

    /*
     * Function: M4x4.translate3Self
     */
    M4x4.translate3Self = function M4x4_translate3Self (x, y, z, m) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        m[12] += m[0] * x + m[4] * y + m[8] * z;
        m[13] += m[1] * x + m[5] * y + m[9] * z;
        m[14] += m[2] * x + m[6] * y + m[10] * z;
        m[15] += m[3] * x + m[7] * y + m[11] * z;
        return m;
    };

    /*
     * Function: M4x4.translate3
     */
    M4x4.translate3 = function M4x4_translate3 (x, y, z, m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (r == m) {
            m[12] += m[0] * x + m[4] * y + m[8] * z;
            m[13] += m[1] * x + m[5] * y + m[9] * z;
            m[14] += m[2] * x + m[6] * y + m[10] * z;
            m[15] += m[3] * x + m[7] * y + m[11] * z;
            return m;
        }

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        var m11 = m[0];
        var m21 = m[1];
        var m31 = m[2];
        var m41 = m[3];
        var m12 = m[4];
        var m22 = m[5];
        var m32 = m[6];
        var m42 = m[7];
        var m13 = m[8];
        var m23 = m[9];
        var m33 = m[10];
        var m43 = m[11];


        r[0] = m11;
        r[1] = m21;
        r[2] = m31;
        r[3] = m41;
        r[4] = m12;
        r[5] = m22;
        r[6] = m32;
        r[7] = m42;
        r[8] = m13;
        r[9] = m23;
        r[10] = m33;
        r[11] = m43;
        r[12] = m11 * x + m12 * y + m13 * z + m[12];
        r[13] = m21 * x + m22 * y + m23 * z + m[13];
        r[14] = m31 * x + m32 * y + m33 * z + m[14];
        r[15] = m41 * x + m42 * y + m43 * z + m[15];

        return r;
    };

    /*
     * Function: M4x4.translate1
     */
    M4x4.translate1 = function M4x4_translate1 (k, m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        return M4x4.translate3(k, k, k, m, r);
    };
    /*
     * Function: M4x4.translateSelf
     */
    M4x4.translateSelf = function M4x4_translateSelf (v, m) {
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(m.length == 16, "m.length == 16");
        var x=v[0], y=v[1], z=v[2];
        m[12] += m[0] * x + m[4] * y + m[8] * z;
        m[13] += m[1] * x + m[5] * y + m[9] * z;
        m[14] += m[2] * x + m[6] * y + m[10] * z;
        m[15] += m[3] * x + m[7] * y + m[11] * z;
        return m;
    };
    /*
     * Function: M4x4.translate
     */
    M4x4.translate = function M4x4_translate (v, m, r) {
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");
        var x=v[0], y=v[1], z=v[2];
        if (r == m) {
            m[12] += m[0] * x + m[4] * y + m[8] * z;
            m[13] += m[1] * x + m[5] * y + m[9] * z;
            m[14] += m[2] * x + m[6] * y + m[10] * z;
            m[15] += m[3] * x + m[7] * y + m[11] * z;
            return m;
        }

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        var m11 = m[0];
        var m21 = m[1];
        var m31 = m[2];
        var m41 = m[3];
        var m12 = m[4];
        var m22 = m[5];
        var m32 = m[6];
        var m42 = m[7];
        var m13 = m[8];
        var m23 = m[9];
        var m33 = m[10];
        var m43 = m[11];

        r[0] = m11;
        r[1] = m21;
        r[2] = m31;
        r[3] = m41;
        r[4] = m12;
        r[5] = m22;
        r[6] = m32;
        r[7] = m42;
        r[8] = m13;
        r[9] = m23;
        r[10] = m33;
        r[11] = m43;
        r[12] = m11 * x + m12 * y + m13 * z + m[12];
        r[13] = m21 * x + m22 * y + m23 * z + m[13];
        r[14] = m31 * x + m32 * y + m33 * z + m[14];
        r[15] = m41 * x + m42 * y + m43 * z + m[15];

        return r;
    };

    /*
     * Function: M4x4.makeLookAt
     */
    M4x4.makeLookAt = function M4x4_makeLookAt (eye, center, up, r) {
        //MathUtils_assert(eye.length == 3, "eye.length == 3");
        //MathUtils_assert(center.length == 3, "center.length == 3");
        //MathUtils_assert(up.length == 3, "up.length == 3");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        var z = V3.direction(eye, center, V3._temp1);
        var x = V3.normalize(V3.cross(up, z, V3._temp2), V3._temp2);
        var y = V3.normalize(V3.cross(z, x, V3._temp3), V3._temp3);

        var tm1 = M4x4._temp1;
        var tm2 = M4x4._temp2;

        tm1[0] = x[0];
        tm1[1] = y[0];
        tm1[2] = z[0];
        tm1[3] = 0;
        tm1[4] = x[1];
        tm1[5] = y[1];
        tm1[6] = z[1];
        tm1[7] = 0;
        tm1[8] = x[2];
        tm1[9] = y[2];
        tm1[10] = z[2];
        tm1[11] = 0;
        tm1[12] = 0;
        tm1[13] = 0;
        tm1[14] = 0;
        tm1[15] = 1;

        tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
        tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
        tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
        tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);
        return M4x4.mul(tm1, tm2, r);
    };

    /*
     * Function: M4x4.transposeSelf
     */
    M4x4.transposeSelf = function M4x4_transposeSelf (m) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        var tmp = m[1]; m[1] = m[4]; m[4] = tmp;
        tmp = m[2]; m[2] = m[8]; m[8] = tmp;
        tmp = m[3]; m[3] = m[12]; m[12] = tmp;
        tmp = m[6]; m[6] = m[9]; m[9] = tmp;
        tmp = m[7]; m[7] = m[13]; m[13] = tmp;
        tmp = m[11]; m[11] = m[14]; m[14] = tmp;
        return m;
    };
    /*
     * Function: M4x4.transpose
     */
    M4x4.transpose = function M4x4_transpose (m, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(r == undefined || r.length == 16, "r == undefined || r.length == 16");

        if (m == r) {
            var tmp = 0.0;
            tmp = m[1]; m[1] = m[4]; m[4] = tmp;
            tmp = m[2]; m[2] = m[8]; m[8] = tmp;
            tmp = m[3]; m[3] = m[12]; m[12] = tmp;
            tmp = m[6]; m[6] = m[9]; m[9] = tmp;
            tmp = m[7]; m[7] = m[13]; m[13] = tmp;
            tmp = m[11]; m[11] = m[14]; m[14] = tmp;
            return m;
        }

        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(16);

        r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
        r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
        r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
        r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

        return r;
    };


    /*
     * Function: M4x4.transformPoint
     */
    M4x4.transformPoint = function M4x4_transformPoint (m, v, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");
        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];

        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12];
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13];
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14];
        var w = m[3] * v0 + m[7] * v1 + m[11] * v2 + m[15];

        if (w != 1.0) {
            r[0] /= w;
            r[1] /= w;
            r[2] /= w;
        }

        return r;
    };

    /*
     * Function: M4x4.transformLine
     */
    M4x4.transformLine = function M4x4_transformLine(m, v, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");
        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];
        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2;
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2;
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2;
        var w = m[3] * v0 + m[7] * v1 + m[11] * v2;

        if (w != 1.0) {
            r[0] /= w;
            r[1] /= w;
            r[2] /= w;
        }

        return r;
    };


    /*
     * Function: M4x4.transformPointAffine
     */
    M4x4.transformPointAffine = function M4x4_transformPointAffine (m, v, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");
        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];

        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12];
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13];
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14];

        return r;
    };

    /*
     * Function: M4x4.transformLineAffine
     */
    M4x4.transformLineAffine = function M4x4_transformLineAffine(m, v, r) {
        //MathUtils_assert(m.length == 16, "m.length == 16");
        //MathUtils_assert(v.length == 3, "v.length == 3");
        //MathUtils_assert(r == undefined || r.length == 3, "r == undefined || r.length == 3");
        if (r == undefined)
            r = new MJS_FLOAT_ARRAY_TYPE(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];
        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2;
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2;
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2;

        return r;
    };

    M4x4.makeBasis = function M4x4_makeBasis(vx,vy,vz) {

        var r = new MJS_FLOAT_ARRAY_TYPE(16);

        r[0] = vx[0];
        r[1] = vx[1];
        r[2] = vx[2];
        r[3] = 0;
        r[4] = vy[0];
        r[5] = vy[1];
        r[6] = vy[2];
        r[7] = 0;
        r[8] = vz[0];
        r[9] = vz[1];
        r[10] = vz[2];
        r[11] = 0;
        r[12] = 0;
        r[13] = 0;
        r[14] = 0;
        r[15] = 1;

        return r;

    };

    return {
        vec3: F3(V3.$),
        v3getX: V3.getX,
        v3getY: V3.getY,
        v3getZ: V3.getZ,
        v3setX: F2(V3.setX),
        v3setY: F2(V3.setY),
        v3setZ: F2(V3.setZ),
        toTuple3: V3.toTuple3,
        toRecord3: V3.toRecord3,
        fromTuple3: V3.fromTuple3,
        fromRecord3: V3.fromRecord3,
        v3add: F2(V3.add),
        v3sub: F2(V3.sub),
        v3neg: V3.neg,
        v3direction: F2(V3.direction),
        v3length: V3.length,
        v3lengthSquared: V3.lengthSquared,
        v3distance: F2(V3.distance),
        v3distanceSquared: F2(V3.distanceSquared),
        v3normalize: V3.normalize,
        v3scale: F2(V3.scale),
        v3dot: F2(V3.dot),
        v3cross: F2(V3.cross),
        v3mul4x4: F2(V3.mul4x4),
        m4x4fromList: M4x4.fromList,
        m4x4identity: M4x4.identity,
        m4x4topLeft3x3: M4x4.topLeft3x3,
        m4x4inverse: M4x4.inverse,
        m4x4inverseOrthonormal: M4x4.inverseOrthonormal,
        m4x4inverseTo3x3: M4x4.inverseTo3x3,
        m4x4makeFrustum: F6(M4x4.makeFrustum),
        m4x4makePerspective: F4(M4x4.makePerspective),
        m4x4makeOrtho: F6(M4x4.makeOrtho),
        m4x4makeOrtho2D: F4(M4x4.makeOrtho2D),
        m4x4mul: F2(M4x4.mul),
        m4x4Affine: F2(M4x4.mulAffine),
        m4x4makeRotate: F2(M4x4.makeRotate),
        m4x4rotate: F3(M4x4.rotate),
        m4x4makeScale3: F3(M4x4.makeScale3),
        m4x4makeScale1: M4x4.makeScale1,
        m4x4makeScale: M4x4.makeScale,
        m4x4scale3: F4(M4x4.scale3),
        m4x4scale: F2(M4x4.scale),
        m4x4makeTranslate3: F3(M4x4.makeTranslate3),
        m4x4makeTranslate: M4x4.makeTranslate,
        m4x4translate3: F4(M4x4.translate3),
        m4x4translate: F2(M4x4.translate),
        m4x4makeLookAt: F3(M4x4.makeLookAt),
        m4x4transpose: M4x4.transpose,
        m4x4transformPoint: F2(M4x4.transformPoint),
        m4x4makeBasis: F3(M4x4.makeBasis)
    };

}();

var _elm_community$linear_algebra$Math_Vector3$cross = _elm_community$linear_algebra$Native_MJS.v3cross;
var _elm_community$linear_algebra$Math_Vector3$dot = _elm_community$linear_algebra$Native_MJS.v3dot;
var _elm_community$linear_algebra$Math_Vector3$scale = _elm_community$linear_algebra$Native_MJS.v3scale;
var _elm_community$linear_algebra$Math_Vector3$normalize = _elm_community$linear_algebra$Native_MJS.v3normalize;
var _elm_community$linear_algebra$Math_Vector3$distanceSquared = _elm_community$linear_algebra$Native_MJS.v3distanceSquared;
var _elm_community$linear_algebra$Math_Vector3$distance = _elm_community$linear_algebra$Native_MJS.v3distance;
var _elm_community$linear_algebra$Math_Vector3$lengthSquared = _elm_community$linear_algebra$Native_MJS.v3lengthSquared;
var _elm_community$linear_algebra$Math_Vector3$length = _elm_community$linear_algebra$Native_MJS.v3length;
var _elm_community$linear_algebra$Math_Vector3$direction = _elm_community$linear_algebra$Native_MJS.v3direction;
var _elm_community$linear_algebra$Math_Vector3$negate = _elm_community$linear_algebra$Native_MJS.v3neg;
var _elm_community$linear_algebra$Math_Vector3$sub = _elm_community$linear_algebra$Native_MJS.v3sub;
var _elm_community$linear_algebra$Math_Vector3$add = _elm_community$linear_algebra$Native_MJS.v3add;
var _elm_community$linear_algebra$Math_Vector3$fromRecord = _elm_community$linear_algebra$Native_MJS.fromRecord3;
var _elm_community$linear_algebra$Math_Vector3$fromTuple = _elm_community$linear_algebra$Native_MJS.fromTuple3;
var _elm_community$linear_algebra$Math_Vector3$toRecord = _elm_community$linear_algebra$Native_MJS.toRecord3;
var _elm_community$linear_algebra$Math_Vector3$toTuple = _elm_community$linear_algebra$Native_MJS.toTuple3;
var _elm_community$linear_algebra$Math_Vector3$setZ = _elm_community$linear_algebra$Native_MJS.v3setZ;
var _elm_community$linear_algebra$Math_Vector3$setY = _elm_community$linear_algebra$Native_MJS.v3setY;
var _elm_community$linear_algebra$Math_Vector3$setX = _elm_community$linear_algebra$Native_MJS.v3setX;
var _elm_community$linear_algebra$Math_Vector3$getZ = _elm_community$linear_algebra$Native_MJS.v3getZ;
var _elm_community$linear_algebra$Math_Vector3$getY = _elm_community$linear_algebra$Native_MJS.v3getY;
var _elm_community$linear_algebra$Math_Vector3$getX = _elm_community$linear_algebra$Native_MJS.v3getX;
var _elm_community$linear_algebra$Math_Vector3$k = A3(_elm_community$linear_algebra$Native_MJS.vec3, 0, 0, 1);
var _elm_community$linear_algebra$Math_Vector3$j = A3(_elm_community$linear_algebra$Native_MJS.vec3, 0, 1, 0);
var _elm_community$linear_algebra$Math_Vector3$i = A3(_elm_community$linear_algebra$Native_MJS.vec3, 1, 0, 0);
var _elm_community$linear_algebra$Math_Vector3$vec3 = _elm_community$linear_algebra$Native_MJS.vec3;
var _elm_community$linear_algebra$Math_Vector3$Vec3 = {ctor: 'Vec3'};

var _elm_community$linear_algebra$Math_Matrix4$makeFromList = _elm_community$linear_algebra$Native_MJS.m4x4fromList;
var _elm_community$linear_algebra$Math_Matrix4$makeBasis = _elm_community$linear_algebra$Native_MJS.m4x4makeBasis;
var _elm_community$linear_algebra$Math_Matrix4$transpose = _elm_community$linear_algebra$Native_MJS.m4x4transpose;
var _elm_community$linear_algebra$Math_Matrix4$makeLookAt = _elm_community$linear_algebra$Native_MJS.m4x4makeLookAt;
var _elm_community$linear_algebra$Math_Matrix4$translate = _elm_community$linear_algebra$Native_MJS.m4x4translate;
var _elm_community$linear_algebra$Math_Matrix4$translate3 = _elm_community$linear_algebra$Native_MJS.m4x4translate3;
var _elm_community$linear_algebra$Math_Matrix4$makeTranslate = _elm_community$linear_algebra$Native_MJS.m4x4makeTranslate;
var _elm_community$linear_algebra$Math_Matrix4$makeTranslate3 = _elm_community$linear_algebra$Native_MJS.m4x4makeTranslate3;
var _elm_community$linear_algebra$Math_Matrix4$scale = _elm_community$linear_algebra$Native_MJS.m4x4scale;
var _elm_community$linear_algebra$Math_Matrix4$scale3 = _elm_community$linear_algebra$Native_MJS.m4x4scale3;
var _elm_community$linear_algebra$Math_Matrix4$makeScale = _elm_community$linear_algebra$Native_MJS.m4x4makeScale;
var _elm_community$linear_algebra$Math_Matrix4$makeScale3 = _elm_community$linear_algebra$Native_MJS.m4x4makeScale3;
var _elm_community$linear_algebra$Math_Matrix4$rotate = _elm_community$linear_algebra$Native_MJS.m4x4rotate;
var _elm_community$linear_algebra$Math_Matrix4$makeRotate = _elm_community$linear_algebra$Native_MJS.m4x4makeRotate;
var _elm_community$linear_algebra$Math_Matrix4$mulAffine = _elm_community$linear_algebra$Native_MJS.m4x4mulAffine;
var _elm_community$linear_algebra$Math_Matrix4$mul = _elm_community$linear_algebra$Native_MJS.m4x4mul;
var _elm_community$linear_algebra$Math_Matrix4$makeOrtho2D = _elm_community$linear_algebra$Native_MJS.m4x4makeOrtho2D;
var _elm_community$linear_algebra$Math_Matrix4$makeOrtho = _elm_community$linear_algebra$Native_MJS.m4x4makeOrtho;
var _elm_community$linear_algebra$Math_Matrix4$makePerspective = _elm_community$linear_algebra$Native_MJS.m4x4makePerspective;
var _elm_community$linear_algebra$Math_Matrix4$makeFrustum = _elm_community$linear_algebra$Native_MJS.m4x4makeFrustum;
var _elm_community$linear_algebra$Math_Matrix4$inverseOrthonormal = _elm_community$linear_algebra$Native_MJS.m4x4inverseOrthonormal;
var _elm_community$linear_algebra$Math_Matrix4$inverse = _elm_community$linear_algebra$Native_MJS.m4x4inverse;
var _elm_community$linear_algebra$Math_Matrix4$identity = _elm_community$linear_algebra$Native_MJS.m4x4identity;
var _elm_community$linear_algebra$Math_Matrix4$transform = _elm_community$linear_algebra$Native_MJS.v3mul4x4;
var _elm_community$linear_algebra$Math_Matrix4$Mat4 = {ctor: 'Mat4'};


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * File: mjs
 *
 * Vector and Matrix math utilities for JavaScript, optimized for WebGL.
 * Edited to work with the Elm Programming Language
 */

var _elm_community$linear_algebra$Native_Math_Vector2 = function() {

    var MJS_FLOAT_ARRAY_TYPE = Float32Array;

    var V2 = { };

    if (MJS_FLOAT_ARRAY_TYPE == Array) {
        V2.$ = function V2_$(x, y) {
            return [x, y];
        };
    } else {
        V2.$ = function V2_$(x, y) {
            return new MJS_FLOAT_ARRAY_TYPE([x, y]);
        };
    }

    V2.getX = function V2_getX(a) {
        return a[0];
    }
    V2.getY = function V2_getY(a) {
        return a[1];
    }
    V2.setX = function V2_setX(x, a) {
        return new MJS_FLOAT_ARRAY_TYPE([x, a[1]]);
    }
    V2.setY = function V2_setY(y, a) {
        return new MJS_FLOAT_ARRAY_TYPE([a[0], y]);
    }

    V2.toTuple = function V2_toTuple(a) {
        return {
            ctor:"_Tuple2",
            _0:a[0],
            _1:a[1]
        };
    };
    V2.fromTuple = function V2_fromTuple(t) {
        return new MJS_FLOAT_ARRAY_TYPE([t._0, t._1]);
    };

    V2.toRecord = function V2_toRecord(a) {
        return {
            _:{},
            x:a[0],
            y:a[1]
        };
    };
    V2.fromRecord = function V2_fromRecord(r) {
        return new MJS_FLOAT_ARRAY_TYPE([r.x, r.y]);
    };

    V2.add = function V2_add(a, b) {
        var r = new MJS_FLOAT_ARRAY_TYPE(2);
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        return r;
    };

    V2.sub = function V2_sub(a, b) {
        var r = new MJS_FLOAT_ARRAY_TYPE(2);
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        return r;
    };

    V2.neg = function V2_neg(a) {
        var r = new MJS_FLOAT_ARRAY_TYPE(2);
        r[0] = - a[0];
        r[1] = - a[1];
        return r;
    };

    V2.direction = function V2_direction(a, b) {
        var r = new MJS_FLOAT_ARRAY_TYPE(2);
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        var im = 1.0 / V2.length(r);
        r[0] = r[0] * im;
        r[1] = r[1] * im;
        return r;
    };

    V2.length = function V2_length(a) {
        return Math.sqrt(a[0]*a[0] + a[1]*a[1]);
    };

    V2.lengthSquared = function V2_lengthSquared(a) {
        return a[0]*a[0] + a[1]*a[1];
    };

    V2.distance = function V2_distance(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    };

    V2.distanceSquared = function V2_distanceSquared(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        return dx * dx + dy * dy;
    };

    V2.normalize = function V2_normalize(a) {
        var r = new MJS_FLOAT_ARRAY_TYPE(2);
        var im = 1.0 / V2.length(a);
        r[0] = a[0] * im;
        r[1] = a[1] * im;
        return r;
    };

    V2.scale = function V2_scale(k, a) {
        var r = new MJS_FLOAT_ARRAY_TYPE(2);
        r[0] = a[0] * k;
        r[1] = a[1] * k;
        return r;
    };

    V2.dot = function V2_dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    };

    return {
        vec2: F2(V2.$),
        getX: V2.getX,
        getY: V2.getY,
        setX: F2(V2.setX),
        setY: F2(V2.setY),
        toTuple: V2.toTuple,
        toRecord: V2.toRecord,
        fromTuple: V2.fromTuple,
        fromRecord: V2.fromRecord,
        add: F2(V2.add),
        sub: F2(V2.sub),
        neg: V2.neg,
        direction: F2(V2.direction),
        length: V2.length,
        lengthSquared: V2.lengthSquared,
        distance: F2(V2.distance),
        distanceSquared: F2(V2.distanceSquared),
        normalize: V2.normalize,
        scale: F2(V2.scale),
        dot: F2(V2.dot)
    };

}();

var _elm_community$linear_algebra$Math_Vector2$dot = _elm_community$linear_algebra$Native_Math_Vector2.dot;
var _elm_community$linear_algebra$Math_Vector2$scale = _elm_community$linear_algebra$Native_Math_Vector2.scale;
var _elm_community$linear_algebra$Math_Vector2$normalize = _elm_community$linear_algebra$Native_Math_Vector2.normalize;
var _elm_community$linear_algebra$Math_Vector2$distanceSquared = _elm_community$linear_algebra$Native_Math_Vector2.distanceSquared;
var _elm_community$linear_algebra$Math_Vector2$distance = _elm_community$linear_algebra$Native_Math_Vector2.distance;
var _elm_community$linear_algebra$Math_Vector2$lengthSquared = _elm_community$linear_algebra$Native_Math_Vector2.lengthSquared;
var _elm_community$linear_algebra$Math_Vector2$length = _elm_community$linear_algebra$Native_Math_Vector2.length;
var _elm_community$linear_algebra$Math_Vector2$direction = _elm_community$linear_algebra$Native_Math_Vector2.direction;
var _elm_community$linear_algebra$Math_Vector2$negate = _elm_community$linear_algebra$Native_Math_Vector2.neg;
var _elm_community$linear_algebra$Math_Vector2$sub = _elm_community$linear_algebra$Native_Math_Vector2.sub;
var _elm_community$linear_algebra$Math_Vector2$add = _elm_community$linear_algebra$Native_Math_Vector2.add;
var _elm_community$linear_algebra$Math_Vector2$fromRecord = _elm_community$linear_algebra$Native_Math_Vector2.fromRecord;
var _elm_community$linear_algebra$Math_Vector2$fromTuple = _elm_community$linear_algebra$Native_Math_Vector2.fromTuple;
var _elm_community$linear_algebra$Math_Vector2$toRecord = _elm_community$linear_algebra$Native_Math_Vector2.toRecord;
var _elm_community$linear_algebra$Math_Vector2$toTuple = _elm_community$linear_algebra$Native_Math_Vector2.toTuple;
var _elm_community$linear_algebra$Math_Vector2$setY = _elm_community$linear_algebra$Native_Math_Vector2.setY;
var _elm_community$linear_algebra$Math_Vector2$setX = _elm_community$linear_algebra$Native_Math_Vector2.setX;
var _elm_community$linear_algebra$Math_Vector2$getY = _elm_community$linear_algebra$Native_Math_Vector2.getY;
var _elm_community$linear_algebra$Math_Vector2$getX = _elm_community$linear_algebra$Native_Math_Vector2.getX;
var _elm_community$linear_algebra$Math_Vector2$vec2 = _elm_community$linear_algebra$Native_Math_Vector2.vec2;
var _elm_community$linear_algebra$Math_Vector2$Vec2 = {ctor: 'Vec2'};

// eslint-disable-next-line no-unused-vars, camelcase
var _elm_community$webgl$Native_Texture = function () {

  var NEAREST = 9728;
  var LINEAR = 9729;
  var CLAMP_TO_EDGE = 33071;

  function guid() {
    // eslint-disable-next-line camelcase
    return _elm_lang$core$Native_Utils.guid();
  }

  function load(magnify, mininify, horizontalWrap, verticalWrap, flipY, url) {
    // eslint-disable-next-line camelcase
    var Scheduler = _elm_lang$core$Native_Scheduler;
    var isMipmap = mininify !== NEAREST && mininify !== LINEAR;
    return Scheduler.nativeBinding(function (callback) {
      var img = new Image();
      function createTexture(gl) {
        var tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magnify);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mininify);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, horizontalWrap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, verticalWrap);
        if (isMipmap) {
          gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        return tex;
      }
      img.onload = function () {
        var width = img.width;
        var height = img.height;
        var widthPowerOfTwo = (width & (width - 1)) === 0;
        var heightPowerOfTwo = (height & (height - 1)) === 0;
        var isSizeValid = (widthPowerOfTwo && heightPowerOfTwo) || (
          !isMipmap
          && horizontalWrap === CLAMP_TO_EDGE
          && verticalWrap === CLAMP_TO_EDGE
        );
        if (isSizeValid) {
          callback(Scheduler.succeed({
            ctor: 'Texture',
            id: guid(),
            createTexture: createTexture,
            width: width,
            height: height
          }));
        } else {
          callback(Scheduler.fail({
            ctor: 'SizeError',
            _0: width,
            _1: height
          }));
        }
      };
      img.onerror = function () {
        callback(Scheduler.fail({ ctor: 'LoadError' }));
      };
      if (url.slice(0, 5) !== 'data:') {
        img.crossOrigin = 'Anonymous';
      }
      img.src = url;
    });
  }

  function size(texture) {
    // eslint-disable-next-line camelcase
    return _elm_lang$core$Native_Utils.Tuple2(texture.width, texture.height);
  }

  return {
    size: size,
    load: F6(load)
  };

}();

// eslint-disable-next-line no-unused-vars, camelcase
var _elm_community$webgl$Native_WebGL = function () {

  // setup logging
  // eslint-disable-next-line no-unused-vars
  function LOG(msg) {
    // console.log(msg);
  }

  function guid() {
    // eslint-disable-next-line camelcase
    return _elm_lang$core$Native_Utils.guid();
  }
  function listEach(fn, list) {
    while (list.ctor !== '[]') {
      fn(list._0);
      list = list._1;
    }
  }
  function listLength(list) {
    var length = 0;
    while (list.ctor !== '[]') {
      length++;
      list = list._1;
    }
    return length;
  }

  var rAF = typeof requestAnimationFrame !== 'undefined' ?
    requestAnimationFrame :
    function (cb) { setTimeout(cb, 1000 / 60); };

  function unsafeCoerceGLSL(src) {
    return { src: src };
  }

  function entity(settings, vert, frag, buffer, uniforms) {

    if (!buffer.guid) {
      buffer.guid = guid();
    }

    return {
      ctor: 'Entity',
      vert: vert,
      frag: frag,
      buffer: buffer,
      uniforms: uniforms,
      settings: settings
    };

  }

 /**
  *  Apply setting to the gl context
  *
  *  @param {WebGLRenderingContext} gl context
  *  @param {Setting} setting coming in from Elm
  */
  function applySetting(gl, setting) {
    switch (setting.ctor) {
      case 'Blend':
        gl.enable(gl.BLEND);
        // eq1 f11 f12 eq2 f21 f22 r g b a
        gl.blendEquationSeparate(setting._0, setting._3);
        gl.blendFuncSeparate(setting._1, setting._2, setting._4, setting._5);
        gl.blendColor(setting._6, setting._7, setting._8, setting._9);
        break;
      case 'DepthTest':
        gl.enable(gl.DEPTH_TEST);
        // func mask near far
        gl.depthFunc(setting._0);
        gl.depthMask(setting._1);
        gl.depthRange(setting._2, setting._3);
        break;
      case 'StencilTest':
        gl.enable(gl.STENCIL_TEST);
        // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
        gl.stencilFuncSeparate(gl.FRONT, setting._3, setting._0, setting._1);
        gl.stencilOpSeparate(gl.FRONT, setting._4, setting._5, setting._6);
        gl.stencilMaskSeparate(gl.FRONT, setting._2);
        gl.stencilFuncSeparate(gl.BACK, setting._7, setting._0, setting._1);
        gl.stencilOpSeparate(gl.BACK, setting._8, setting._9, setting._10);
        gl.stencilMaskSeparate(gl.BACK, setting._2);
        break;
      case 'Scissor':
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(setting._0, setting._1, setting._2, setting._3);
        break;
      case 'ColorMask':
        gl.colorMask(setting._0, setting._1, setting._2, setting._3);
        break;
      case 'CullFace':
        gl.enable(gl.CULL_FACE);
        gl.cullFace(setting._0);
        break;
      case 'PolygonOffset':
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(setting._0, setting._1);
        break;
      case 'SampleCoverage':
        gl.enable(gl.SAMPLE_COVERAGE);
        gl.sampleCoverage(setting._0, setting._1);
        break;
      case 'SampleAlphaToCoverage':
        gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
        break;
    }
  }

 /**
  *  Revert setting that was applied to the gl context
  *
  *  @param {WebGLRenderingContext} gl context
  *  @param {Setting} setting coming in from Elm
  */
  function revertSetting(gl, setting) {
    switch (setting.ctor) {
      case 'Blend':
        gl.disable(gl.BLEND);
        break;
      case 'DepthTest':
        gl.disable(gl.DEPTH_TEST);
        break;
      case 'StencilTest':
        gl.disable(gl.STENCIL_TEST);
        break;
      case 'Scissor':
        gl.disable(gl.SCISSOR_TEST);
        break;
      case 'ColorMask':
        gl.colorMask(true, true, true, true);
        break;
      case 'CullFace':
        gl.disable(gl.CULL_FACE);
        break;
      case 'PolygonOffset':
        gl.disable(gl.POLYGON_OFFSET_FILL);
        break;
      case 'SampleCoverage':
        gl.disable(gl.SAMPLE_COVERAGE);
        break;
      case 'SampleAlphaToCoverage':
        gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
        break;
    }
  }

  function doCompile(gl, src, type) {

    var shader = gl.createShader(type);
    LOG('Created shader');

    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw gl.getShaderInfoLog(shader);
    }

    return shader;

  }

  function doLink(gl, vshader, fshader) {

    var program = gl.createProgram();
    LOG('Created program');

    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw gl.getProgramInfoLog(program);
    }

    return program;

  }

  function getRenderInfo(gl, renderType) {
    switch (renderType) {
      case 'Triangles':
        return { mode: gl.TRIANGLES, elemSize: 3, indexSize: 0 };
      case 'LineStrip':
        return { mode: gl.LINE_STRIP, elemSize: 1, indexSize: 0 };
      case 'LineLoop':
        return { mode: gl.LINE_LOOP, elemSize: 1, indexSize: 0 };
      case 'Points':
        return { mode: gl.POINTS, elemSize: 1, indexSize: 0 };
      case 'Lines':
        return { mode: gl.LINES, elemSize: 2, indexSize: 0 };
      case 'TriangleStrip':
        return { mode: gl.TRIANGLE_STRIP, elemSize: 1, indexSize: 0 };
      case 'TriangleFan':
        return { mode: gl.TRIANGLE_FAN, elemSize: 1, indexSize: 0 };
      case 'IndexedTriangles':
        return { mode: gl.TRIANGLES, elemSize: 1, indexSize: 3 };
    }
  }

  function getAttributeInfo(gl, type) {
    switch (type) {
      case gl.FLOAT:
        return { size: 1, type: Float32Array, baseType: gl.FLOAT };
      case gl.FLOAT_VEC2:
        return { size: 2, type: Float32Array, baseType: gl.FLOAT };
      case gl.FLOAT_VEC3:
        return { size: 3, type: Float32Array, baseType: gl.FLOAT };
      case gl.FLOAT_VEC4:
        return { size: 4, type: Float32Array, baseType: gl.FLOAT };
      case gl.INT:
        return { size: 1, type: Int32Array, baseType: gl.INT };
      case gl.INT_VEC2:
        return { size: 2, type: Int32Array, baseType: gl.INT };
      case gl.INT_VEC3:
        return { size: 3, type: Int32Array, baseType: gl.INT };
      case gl.INT_VEC4:
        return { size: 4, type: Int32Array, baseType: gl.INT };
    }
  }

 /**
  *  Form the buffer for a given attribute.
  *
  *  @param {WebGLRenderingContext} gl context
  *  @param {WebGLActiveInfo} attribute the attribute to bind to.
  *         We use its name to grab the record by name and also to know
  *         how many elements we need to grab.
  *  @param {List} bufferElems The list coming in from Elm.
  *  @param {Number} elemSize The length of the number of vertices that
  *         complete one 'thing' based on the drawing mode.
  *         ie, 2 for Lines, 3 for Triangles, etc.
  *  @return {WebGLBuffer}
  */
  function doBindAttribute(gl, attribute, bufferElems, elemSize) {
    var idxKeys = [];
    for (var i = 0; i < elemSize; i++) {
      idxKeys.push('_' + i);
    }

    function dataFill(data, cnt, fillOffset, elem, key) {
      if (elemSize === 1) {
        for (var i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
        }
      } else {
        idxKeys.forEach(function (idx) {
          for (var i = 0; i < cnt; i++) {
            data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
          }
        });
      }
    }

    var attributeInfo = getAttributeInfo(gl, attribute.type);

    if (attributeInfo === undefined) {
      throw new Error('No info available for: ' + attribute.type);
    }

    var dataIdx = 0;
    var array = new attributeInfo.type(listLength(bufferElems) * attributeInfo.size * elemSize);

    listEach(function (elem) {
      dataFill(array, attributeInfo.size, dataIdx, elem, attribute.name);
      dataIdx += attributeInfo.size * elemSize;
    }, bufferElems);

    var buffer = gl.createBuffer();
    LOG('Created attribute buffer ' + attribute.name);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    return buffer;
  }

 /**
  *  This sets up the binding caching buffers.
  *
  *  We don't actually bind any buffers now except for the indices buffer.
  *  The problem with filling the buffers here is that it is possible to
  *  have a buffer shared between two webgl shaders;
  *  which could have different active attributes. If we bind it here against
  *  a particular program, we might not bind them all. That final bind is now
  *  done right before drawing.
  *
  *  @param {WebGLRenderingContext} gl context
  *  @param {Object} renderType
  *  @param {Number} renderType.indexSize size of the index
  *  @param {Number} renderType.elemSize size of the element
  *  @param {Drawable} drawable a drawable object from Elm
  *         that contains elements and optionally indices
  *  @return {Object} buffer - an object with the following properties
  *  @return {Number} buffer.numIndices
  *  @return {WebGLBuffer} buffer.indexBuffer
  *  @return {Object} buffer.buffers - will be used to buffer attributes
  */
  function doBindSetup(gl, renderType, drawable) {
    LOG('Created index buffer');
    var indexBuffer = gl.createBuffer();
    var indices = (renderType.indexSize === 0)
      ? makeSequentialBuffer(renderType.elemSize * listLength(drawable._0))
      : makeIndexedBuffer(drawable._1, renderType.indexSize);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  }

 /**
  *  Create an indices array and fill it with 0..n
  *
  *  @param {Number} numIndices The number of indices
  *  @return {Uint16Array} indices
  */
  function makeSequentialBuffer(numIndices) {
    var indices = new Uint16Array(numIndices);
    for (var i = 0; i < numIndices; i++) {
      indices[i] = i;
    }
    return indices;
  }

 /**
  *  Create an indices array and fill it from indices
  *  based on the size of the index
  *
  *  @param {List} indicesList the list of indices
  *  @param {Number} indexSize the size of the index
  *  @return {Uint16Array} indices
  */
  function makeIndexedBuffer(indicesList, indexSize) {
    var indices = new Uint16Array(listLength(indicesList) * indexSize);
    var fillOffset = 0;
    var i;
    listEach(function (elem) {
      if (indexSize === 1) {
        indices[fillOffset++] = elem;
      } else {
        for (i = 0; i < indexSize; i++) {
          indices[fillOffset++] = elem['_' + i.toString()];
        }
      }
    }, indicesList);
    return indices;
  }

  function getProgID(vertID, fragID) {
    return vertID + '#' + fragID;
  }

  function drawGL(domNode, data) {

    var model = data.model;
    var gl = model.cache.gl;

    if (!gl) {
      return domNode;
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    LOG('Drawing');

    function drawEntity(entity) {
      if (entity.buffer._0.ctor === '[]') {
        return;
      }

      var progid;
      var program;
      if (entity.vert.id && entity.frag.id) {
        progid = getProgID(entity.vert.id, entity.frag.id);
        program = model.cache.programs[progid];
      }

      if (!program) {

        var vshader;
        if (entity.vert.id) {
          vshader = model.cache.shaders[entity.vert.id];
        } else {
          entity.vert.id = guid();
        }

        if (!vshader) {
          vshader = doCompile(gl, entity.vert.src, gl.VERTEX_SHADER);
          model.cache.shaders[entity.vert.id] = vshader;
        }

        var fshader;
        if (entity.frag.id) {
          fshader = model.cache.shaders[entity.frag.id];
        } else {
          entity.frag.id = guid();
        }

        if (!fshader) {
          fshader = doCompile(gl, entity.frag.src, gl.FRAGMENT_SHADER);
          model.cache.shaders[entity.frag.id] = fshader;
        }

        program = doLink(gl, vshader, fshader);
        progid = getProgID(entity.vert.id, entity.frag.id);
        model.cache.programs[progid] = program;

      }

      gl.useProgram(program);

      progid = progid || getProgID(entity.vert.id, entity.frag.id);
      var setters = model.cache.uniformSetters[progid];
      if (!setters) {
        setters = createUniformSetters(gl, model, program);
        model.cache.uniformSetters[progid] = setters;
      }

      setUniforms(setters, entity.uniforms);

      var entityType = getRenderInfo(gl, entity.buffer.ctor);
      var buffer = model.cache.buffers[entity.buffer.guid];

      if (!buffer) {
        buffer = doBindSetup(gl, entityType, entity.buffer);
        model.cache.buffers[entity.buffer.guid] = buffer;
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);

      var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

      for (var i = 0; i < numAttributes; i++) {
        var attribute = gl.getActiveAttrib(program, i);

        var attribLocation = gl.getAttribLocation(program, attribute.name);
        gl.enableVertexAttribArray(attribLocation);

        if (buffer.buffers[attribute.name] === undefined) {
          buffer.buffers[attribute.name] = doBindAttribute(gl, attribute, entity.buffer._0, entityType.elemSize);
        }
        var attributeBuffer = buffer.buffers[attribute.name];
        var attributeInfo = getAttributeInfo(gl, attribute.type);

        gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      }

      listEach(function (setting) {
        applySetting(gl, setting);
      }, entity.settings);

      gl.drawElements(entityType.mode, buffer.numIndices, gl.UNSIGNED_SHORT, 0);

      listEach(function (setting) {
        revertSetting(gl, setting);
      }, entity.settings);

    }

    listEach(drawEntity, model.entities);
    return domNode;
  }

  function createUniformSetters(gl, model, program) {
    var textureCounter = 0;
    function createUniformSetter(program, uniform) {
      var uniformLocation = gl.getUniformLocation(program, uniform.name);
      switch (uniform.type) {
        case gl.INT:
          return function (value) {
            gl.uniform1i(uniformLocation, value);
          };
        case gl.FLOAT:
          return function (value) {
            gl.uniform1f(uniformLocation, value);
          };
        case gl.FLOAT_VEC2:
          return function (value) {
            gl.uniform2fv(uniformLocation, new Float32Array(value));
          };
        case gl.FLOAT_VEC3:
          return function (value) {
            gl.uniform3fv(uniformLocation, new Float32Array(value));
          };
        case gl.FLOAT_VEC4:
          return function (value) {
            gl.uniform4fv(uniformLocation, new Float32Array(value));
          };
        case gl.FLOAT_MAT4:
          return function (value) {
            gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
          };
        case gl.SAMPLER_2D:
          var currentTexture = textureCounter++;
          return function (texture) {
            gl.activeTexture(gl.TEXTURE0 + currentTexture);
            var tex = model.cache.textures[texture.id];
            if (!tex) {
              LOG('Created texture');
              tex = texture.createTexture(gl);
              model.cache.textures[texture.id] = tex;
            }
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.uniform1i(uniformLocation, currentTexture);
          };
        case gl.BOOL:
          return function (value) {
            gl.uniform1i(uniformLocation, value);
          };
        default:
          LOG('Unsupported uniform type: ' + uniform.type);
          return function () {};
      }
    }

    var uniformSetters = {};
    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < numUniforms; i++) {
      var uniform = gl.getActiveUniform(program, i);
      uniformSetters[uniform.name] = createUniformSetter(program, uniform);
    }

    return uniformSetters;
  }

  function setUniforms(setters, values) {
    Object.keys(values).forEach(function (name) {
      var setter = setters[name];
      if (setter) {
        setter(values[name]);
      }
    });
  }

  // VIRTUAL-DOM WIDGET

  function toHtml(options, factList, entities) {
    var model = {
      entities: entities,
      cache: {},
      options: options
    };
    // eslint-disable-next-line camelcase
    return _elm_lang$virtual_dom$Native_VirtualDom.custom(factList, model, implementation);
  }

  var implementation = {
    render: render,
    diff: diff
  };

  /**
   *  Creates canvas and schedules initial drawGL
   *  @param {Object} model
   *  @param {Object} model.cache that may contain the following properties:
             gl, shaders, programs, uniformSetters, buffers, textures
   *  @param {List<Option>} model.options list of options coming from Elm
   *  @param {List<Entity>} model.entities list of entities coming from Elm
   *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
   */
  function render(model) {

    var contextAttributes = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false
    };
    var sceneSettings = [];

    listEach(function (option) {
      var s1 = option._0;
      switch (option.ctor) {
        case 'Alpha':
          contextAttributes.alpha = true;
          contextAttributes.premultipliedAlpha = s1;
          break;
        case 'Antialias':
          contextAttributes.antialias = true;
          break;
        case 'Depth':
          contextAttributes.depth = true;
          sceneSettings.push(function (gl) {
            gl.clearDepth(s1);
          });
          break;
        case 'ClearColor':
          sceneSettings.push(function (gl) {
            gl.clearColor(option._0, option._1, option._2, option._3);
          });
          break;
        case 'Stencil':
          contextAttributes.stencil = true;
          sceneSettings.push(function (gl) {
            gl.clearStencil(s1);
          });
          break;
      }
    }, model.options);

    LOG('Render canvas');
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext && (
      canvas.getContext('webgl', contextAttributes) ||
      canvas.getContext('experimental-webgl', contextAttributes)
    );

    if (gl) {
      sceneSettings.forEach(function (sceneSetting) {
        sceneSetting(gl);
      });
    } else {
      canvas = document.createElement('div');
      canvas.innerHTML = '<a href="http://get.webgl.org/">Enable WebGL</a> to see this content!';
    }

    model.cache.gl = gl;
    model.cache.shaders = [];
    model.cache.programs = {};
    model.cache.uniformSetters = {};
    model.cache.buffers = [];
    model.cache.textures = [];

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet,
    // when renderCanvas is called by virtual-dom
    rAF(function () {
      drawGL(canvas, {model: model});
    });

    return canvas;
  }


  function diff(oldModel, newModel) {
    newModel.model.cache = oldModel.model.cache;
    return {
      applyPatch: drawGL,
      data: newModel
    };
  }

  return {
    unsafeCoerceGLSL: unsafeCoerceGLSL,
    entity: F5(entity),
    toHtml: F3(toHtml)
  };

}();

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
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
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
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


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_community$webgl$WebGL_Settings_Internal$SampleAlphaToCoverage = {ctor: 'SampleAlphaToCoverage'};
var _elm_community$webgl$WebGL_Settings_Internal$SampleCoverage = F2(
	function (a, b) {
		return {ctor: 'SampleCoverage', _0: a, _1: b};
	});
var _elm_community$webgl$WebGL_Settings_Internal$PolygonOffset = F2(
	function (a, b) {
		return {ctor: 'PolygonOffset', _0: a, _1: b};
	});
var _elm_community$webgl$WebGL_Settings_Internal$CullFace = function (a) {
	return {ctor: 'CullFace', _0: a};
};
var _elm_community$webgl$WebGL_Settings_Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {ctor: 'ColorMask', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_community$webgl$WebGL_Settings_Internal$Scissor = F4(
	function (a, b, c, d) {
		return {ctor: 'Scissor', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_community$webgl$WebGL_Settings_Internal$StencilTest = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {ctor: 'StencilTest', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f, _6: g, _7: h, _8: i, _9: j, _10: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_community$webgl$WebGL_Settings_Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {ctor: 'DepthTest', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_community$webgl$WebGL_Settings_Internal$Blend = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {ctor: 'Blend', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f, _6: g, _7: h, _8: i, _9: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};

var _elm_community$webgl$WebGL_Settings$cullFace = function (_p0) {
	var _p1 = _p0;
	return _elm_community$webgl$WebGL_Settings_Internal$CullFace(_p1._0);
};
var _elm_community$webgl$WebGL_Settings$sampleCoverage = _elm_community$webgl$WebGL_Settings_Internal$SampleCoverage;
var _elm_community$webgl$WebGL_Settings$sampleAlphaToCoverage = _elm_community$webgl$WebGL_Settings_Internal$SampleAlphaToCoverage;
var _elm_community$webgl$WebGL_Settings$polygonOffset = _elm_community$webgl$WebGL_Settings_Internal$PolygonOffset;
var _elm_community$webgl$WebGL_Settings$colorMask = _elm_community$webgl$WebGL_Settings_Internal$ColorMask;
var _elm_community$webgl$WebGL_Settings$scissor = _elm_community$webgl$WebGL_Settings_Internal$Scissor;
var _elm_community$webgl$WebGL_Settings$FaceMode = function (a) {
	return {ctor: 'FaceMode', _0: a};
};
var _elm_community$webgl$WebGL_Settings$front = _elm_community$webgl$WebGL_Settings$FaceMode(1028);
var _elm_community$webgl$WebGL_Settings$back = _elm_community$webgl$WebGL_Settings$FaceMode(1029);
var _elm_community$webgl$WebGL_Settings$frontAndBack = _elm_community$webgl$WebGL_Settings$FaceMode(1032);

var _elm_community$webgl$WebGL_Settings_DepthTest$greaterOrEqual = function (_p0) {
	var _p1 = _p0;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 518, _p1.write, _p1.near, _p1.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$lessOrEqual = function (_p2) {
	var _p3 = _p2;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 515, _p3.write, _p3.near, _p3.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$notEqual = function (_p4) {
	var _p5 = _p4;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 517, _p5.write, _p5.near, _p5.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$greater = function (_p6) {
	var _p7 = _p6;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 516, _p7.write, _p7.near, _p7.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$equal = function (_p8) {
	var _p9 = _p8;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 514, _p9.write, _p9.near, _p9.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$always = function (_p10) {
	var _p11 = _p10;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 519, _p11.write, _p11.near, _p11.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$never = function (_p12) {
	var _p13 = _p12;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 512, _p13.write, _p13.near, _p13.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$less = function (_p14) {
	var _p15 = _p14;
	return A4(_elm_community$webgl$WebGL_Settings_Internal$DepthTest, 513, _p15.write, _p15.near, _p15.far);
};
var _elm_community$webgl$WebGL_Settings_DepthTest$default = _elm_community$webgl$WebGL_Settings_DepthTest$less(
	{write: true, near: 0, far: 1});
var _elm_community$webgl$WebGL_Settings_DepthTest$Options = F3(
	function (a, b, c) {
		return {write: a, near: b, far: c};
	});

var _elm_community$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_elm_community$webgl$Native_WebGL.toHtml, options, attributes, entities);
	});
var _elm_community$webgl$WebGL$entityWith = _elm_community$webgl$Native_WebGL.entity;
var _elm_community$webgl$WebGL$entity = _elm_community$webgl$WebGL$entityWith(
	{
		ctor: '::',
		_0: _elm_community$webgl$WebGL_Settings_DepthTest$default,
		_1: {ctor: '[]'}
	});
var _elm_community$webgl$WebGL$unsafeShader = _elm_community$webgl$Native_WebGL.unsafeCoerceGLSL;
var _elm_community$webgl$WebGL$IndexedTriangles = F2(
	function (a, b) {
		return {ctor: 'IndexedTriangles', _0: a, _1: b};
	});
var _elm_community$webgl$WebGL$indexedTriangles = _elm_community$webgl$WebGL$IndexedTriangles;
var _elm_community$webgl$WebGL$TriangleStrip = function (a) {
	return {ctor: 'TriangleStrip', _0: a};
};
var _elm_community$webgl$WebGL$triangleStrip = _elm_community$webgl$WebGL$TriangleStrip;
var _elm_community$webgl$WebGL$TriangleFan = function (a) {
	return {ctor: 'TriangleFan', _0: a};
};
var _elm_community$webgl$WebGL$triangleFan = _elm_community$webgl$WebGL$TriangleFan;
var _elm_community$webgl$WebGL$Points = function (a) {
	return {ctor: 'Points', _0: a};
};
var _elm_community$webgl$WebGL$points = _elm_community$webgl$WebGL$Points;
var _elm_community$webgl$WebGL$LineLoop = function (a) {
	return {ctor: 'LineLoop', _0: a};
};
var _elm_community$webgl$WebGL$lineLoop = _elm_community$webgl$WebGL$LineLoop;
var _elm_community$webgl$WebGL$LineStrip = function (a) {
	return {ctor: 'LineStrip', _0: a};
};
var _elm_community$webgl$WebGL$lineStrip = _elm_community$webgl$WebGL$LineStrip;
var _elm_community$webgl$WebGL$Lines = function (a) {
	return {ctor: 'Lines', _0: a};
};
var _elm_community$webgl$WebGL$lines = _elm_community$webgl$WebGL$Lines;
var _elm_community$webgl$WebGL$Triangles = function (a) {
	return {ctor: 'Triangles', _0: a};
};
var _elm_community$webgl$WebGL$triangles = _elm_community$webgl$WebGL$Triangles;
var _elm_community$webgl$WebGL$Shader = {ctor: 'Shader'};
var _elm_community$webgl$WebGL$Texture = {ctor: 'Texture'};
var _elm_community$webgl$WebGL$Entity = {ctor: 'Entity'};
var _elm_community$webgl$WebGL$ClearColor = F4(
	function (a, b, c, d) {
		return {ctor: 'ClearColor', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_community$webgl$WebGL$clearColor = _elm_community$webgl$WebGL$ClearColor;
var _elm_community$webgl$WebGL$Antialias = {ctor: 'Antialias'};
var _elm_community$webgl$WebGL$antialias = _elm_community$webgl$WebGL$Antialias;
var _elm_community$webgl$WebGL$Stencil = function (a) {
	return {ctor: 'Stencil', _0: a};
};
var _elm_community$webgl$WebGL$stencil = _elm_community$webgl$WebGL$Stencil;
var _elm_community$webgl$WebGL$Depth = function (a) {
	return {ctor: 'Depth', _0: a};
};
var _elm_community$webgl$WebGL$depth = _elm_community$webgl$WebGL$Depth;
var _elm_community$webgl$WebGL$Alpha = function (a) {
	return {ctor: 'Alpha', _0: a};
};
var _elm_community$webgl$WebGL$alpha = _elm_community$webgl$WebGL$Alpha;
var _elm_community$webgl$WebGL$toHtml = _elm_community$webgl$WebGL$toHtmlWith(
	{
		ctor: '::',
		_0: _elm_community$webgl$WebGL$alpha(true),
		_1: {
			ctor: '::',
			_0: _elm_community$webgl$WebGL$antialias,
			_1: {
				ctor: '::',
				_0: _elm_community$webgl$WebGL$depth(1),
				_1: {ctor: '[]'}
			}
		}
	});

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_community$webgl$WebGL_Texture$size = _elm_community$webgl$Native_Texture.size;
var _elm_community$webgl$WebGL_Texture$loadWith = F2(
	function (_p0, url) {
		var _p1 = _p0;
		var expand = F4(
			function (_p5, _p4, _p3, _p2) {
				var _p6 = _p5;
				var _p7 = _p4;
				var _p8 = _p3;
				var _p9 = _p2;
				return A6(_elm_community$webgl$Native_Texture.load, _p6._0, _p7._0, _p8._0, _p9._0, _p1.flipY, url);
			});
		return A4(expand, _p1.magnify, _p1.minify, _p1.horizontalWrap, _p1.verticalWrap);
	});
var _elm_community$webgl$WebGL_Texture$Options = F5(
	function (a, b, c, d, e) {
		return {magnify: a, minify: b, horizontalWrap: c, verticalWrap: d, flipY: e};
	});
var _elm_community$webgl$WebGL_Texture$SizeError = F2(
	function (a, b) {
		return {ctor: 'SizeError', _0: a, _1: b};
	});
var _elm_community$webgl$WebGL_Texture$LoadError = {ctor: 'LoadError'};
var _elm_community$webgl$WebGL_Texture$Resize = function (a) {
	return {ctor: 'Resize', _0: a};
};
var _elm_community$webgl$WebGL_Texture$linear = _elm_community$webgl$WebGL_Texture$Resize(9729);
var _elm_community$webgl$WebGL_Texture$nearest = _elm_community$webgl$WebGL_Texture$Resize(9728);
var _elm_community$webgl$WebGL_Texture$nearestMipmapNearest = _elm_community$webgl$WebGL_Texture$Resize(9984);
var _elm_community$webgl$WebGL_Texture$linearMipmapNearest = _elm_community$webgl$WebGL_Texture$Resize(9985);
var _elm_community$webgl$WebGL_Texture$nearestMipmapLinear = _elm_community$webgl$WebGL_Texture$Resize(9986);
var _elm_community$webgl$WebGL_Texture$linearMipmapLinear = _elm_community$webgl$WebGL_Texture$Resize(9987);
var _elm_community$webgl$WebGL_Texture$Bigger = {ctor: 'Bigger'};
var _elm_community$webgl$WebGL_Texture$Smaller = {ctor: 'Smaller'};
var _elm_community$webgl$WebGL_Texture$Wrap = function (a) {
	return {ctor: 'Wrap', _0: a};
};
var _elm_community$webgl$WebGL_Texture$repeat = _elm_community$webgl$WebGL_Texture$Wrap(10497);
var _elm_community$webgl$WebGL_Texture$defaultOptions = {magnify: _elm_community$webgl$WebGL_Texture$linear, minify: _elm_community$webgl$WebGL_Texture$nearestMipmapLinear, horizontalWrap: _elm_community$webgl$WebGL_Texture$repeat, verticalWrap: _elm_community$webgl$WebGL_Texture$repeat, flipY: true};
var _elm_community$webgl$WebGL_Texture$load = _elm_community$webgl$WebGL_Texture$loadWith(_elm_community$webgl$WebGL_Texture$defaultOptions);
var _elm_community$webgl$WebGL_Texture$clampToEdge = _elm_community$webgl$WebGL_Texture$Wrap(33071);
var _elm_community$webgl$WebGL_Texture$nonPowerOfTwoOptions = {magnify: _elm_community$webgl$WebGL_Texture$linear, minify: _elm_community$webgl$WebGL_Texture$nearest, horizontalWrap: _elm_community$webgl$WebGL_Texture$clampToEdge, verticalWrap: _elm_community$webgl$WebGL_Texture$clampToEdge, flipY: true};
var _elm_community$webgl$WebGL_Texture$mirroredRepeat = _elm_community$webgl$WebGL_Texture$Wrap(33648);

var _elm_lang$animation_frame$Native_AnimationFrame = function()
{

function create()
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}

return {
	create: create
};

}();

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$animation_frame$AnimationFrame$rAF = _elm_lang$animation_frame$Native_AnimationFrame.create(
	{ctor: '_Tuple0'});
var _elm_lang$animation_frame$AnimationFrame$subscription = _elm_lang$core$Native_Platform.leaf('AnimationFrame');
var _elm_lang$animation_frame$AnimationFrame$State = F3(
	function (a, b, c) {
		return {subs: a, request: b, oldTime: c};
	});
var _elm_lang$animation_frame$AnimationFrame$init = _elm_lang$core$Task$succeed(
	A3(
		_elm_lang$animation_frame$AnimationFrame$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing,
		0));
var _elm_lang$animation_frame$AnimationFrame$onEffects = F3(
	function (router, subs, _p0) {
		var _p1 = _p0;
		var _p5 = _p1.request;
		var _p4 = _p1.oldTime;
		var _p2 = {ctor: '_Tuple2', _0: _p5, _1: subs};
		if (_p2._0.ctor === 'Nothing') {
			if (_p2._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(
					A3(
						_elm_lang$animation_frame$AnimationFrame$State,
						{ctor: '[]'},
						_elm_lang$core$Maybe$Nothing,
						_p4));
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (time) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$animation_frame$AnimationFrame$State,
										subs,
										_elm_lang$core$Maybe$Just(pid),
										time));
							},
							_elm_lang$core$Time$now);
					},
					_elm_lang$core$Process$spawn(
						A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$core$Platform$sendToSelf(router),
							_elm_lang$animation_frame$AnimationFrame$rAF)));
			}
		} else {
			if (_p2._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p3) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$animation_frame$AnimationFrame$State,
								{ctor: '[]'},
								_elm_lang$core$Maybe$Nothing,
								_p4));
					},
					_elm_lang$core$Process$kill(_p2._0._0));
			} else {
				return _elm_lang$core$Task$succeed(
					A3(_elm_lang$animation_frame$AnimationFrame$State, subs, _p5, _p4));
			}
		}
	});
var _elm_lang$animation_frame$AnimationFrame$onSelfMsg = F3(
	function (router, newTime, _p6) {
		var _p7 = _p6;
		var _p10 = _p7.subs;
		var diff = newTime - _p7.oldTime;
		var send = function (sub) {
			var _p8 = sub;
			if (_p8.ctor === 'Time') {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p8._0(newTime));
			} else {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p8._0(diff));
			}
		};
		return A2(
			_elm_lang$core$Task$andThen,
			function (pid) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p9) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$animation_frame$AnimationFrame$State,
								_p10,
								_elm_lang$core$Maybe$Just(pid),
								newTime));
					},
					_elm_lang$core$Task$sequence(
						A2(_elm_lang$core$List$map, send, _p10)));
			},
			_elm_lang$core$Process$spawn(
				A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$core$Platform$sendToSelf(router),
					_elm_lang$animation_frame$AnimationFrame$rAF)));
	});
var _elm_lang$animation_frame$AnimationFrame$Diff = function (a) {
	return {ctor: 'Diff', _0: a};
};
var _elm_lang$animation_frame$AnimationFrame$diffs = function (tagger) {
	return _elm_lang$animation_frame$AnimationFrame$subscription(
		_elm_lang$animation_frame$AnimationFrame$Diff(tagger));
};
var _elm_lang$animation_frame$AnimationFrame$Time = function (a) {
	return {ctor: 'Time', _0: a};
};
var _elm_lang$animation_frame$AnimationFrame$times = function (tagger) {
	return _elm_lang$animation_frame$AnimationFrame$subscription(
		_elm_lang$animation_frame$AnimationFrame$Time(tagger));
};
var _elm_lang$animation_frame$AnimationFrame$subMap = F2(
	function (func, sub) {
		var _p11 = sub;
		if (_p11.ctor === 'Time') {
			return _elm_lang$animation_frame$AnimationFrame$Time(
				function (_p12) {
					return func(
						_p11._0(_p12));
				});
		} else {
			return _elm_lang$animation_frame$AnimationFrame$Diff(
				function (_p13) {
					return func(
						_p11._0(_p13));
				});
		}
	});
_elm_lang$core$Native_Platform.effectManagers['AnimationFrame'] = {pkg: 'elm-lang/animation-frame', init: _elm_lang$animation_frame$AnimationFrame$init, onEffects: _elm_lang$animation_frame$AnimationFrame$onEffects, onSelfMsg: _elm_lang$animation_frame$AnimationFrame$onSelfMsg, tag: 'sub', subMap: _elm_lang$animation_frame$AnimationFrame$subMap};

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2147483399;
var _elm_lang$core$Random$magicNum6 = 2147483563;
var _elm_lang$core$Random$magicNum5 = 3791;
var _elm_lang$core$Random$magicNum4 = 40692;
var _elm_lang$core$Random$magicNum3 = 52774;
var _elm_lang$core$Random$magicNum2 = 12211;
var _elm_lang$core$Random$magicNum1 = 53668;
var _elm_lang$core$Random$magicNum0 = 40014;
var _elm_lang$core$Random$step = F2(
	function (_p3, seed) {
		var _p4 = _p3;
		return _p4._0(seed);
	});
var _elm_lang$core$Random$onEffects = F3(
	function (router, commands, seed) {
		var _p5 = commands;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Task$succeed(seed);
		} else {
			var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
			var value = _p6._0;
			var newSeed = _p6._1;
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				},
				A2(_elm_lang$core$Platform$sendToApp, router, value));
		}
	});
var _elm_lang$core$Random$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$reverse(list),
					_1: seed
				};
			} else {
				var _p8 = generate(seed);
				var value = _p8._0;
				var newSeed = _p8._1;
				var _v2 = {ctor: '::', _0: value, _1: list},
					_v3 = n - 1,
					_v4 = generate,
					_v5 = newSeed;
				list = _v2;
				n = _v3;
				generate = _v4;
				seed = _v5;
				continue listHelp;
			}
		}
	});
var _elm_lang$core$Random$minInt = -2147483648;
var _elm_lang$core$Random$maxInt = 2147483647;
var _elm_lang$core$Random$iLogBase = F2(
	function (b, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
	});
var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
var _elm_lang$core$Random$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _elm_lang$core$Random$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				return A4(
					_elm_lang$core$Random$listHelp,
					{ctor: '[]'},
					n,
					_p10._0,
					seed);
			});
	});
var _elm_lang$core$Random$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p13 = _p12._0(seed0);
				var a = _p13._0;
				var seed1 = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: func(a),
					_1: seed1
				};
			});
	});
var _elm_lang$core$Random$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p18 = _p16._0(seed0);
				var a = _p18._0;
				var seed1 = _p18._1;
				var _p19 = _p17._0(seed1);
				var b = _p19._0;
				var seed2 = _p19._1;
				return {
					ctor: '_Tuple2',
					_0: A2(func, a, b),
					_1: seed2
				};
			});
	});
var _elm_lang$core$Random$pair = F2(
	function (genA, genB) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _elm_lang$core$Random$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p26 = _p23._0(seed0);
				var a = _p26._0;
				var seed1 = _p26._1;
				var _p27 = _p24._0(seed1);
				var b = _p27._0;
				var seed2 = _p27._1;
				var _p28 = _p25._0(seed2);
				var c = _p28._0;
				var seed3 = _p28._1;
				return {
					ctor: '_Tuple2',
					_0: A3(func, a, b, c),
					_1: seed3
				};
			});
	});
var _elm_lang$core$Random$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p37 = _p33._0(seed0);
				var a = _p37._0;
				var seed1 = _p37._1;
				var _p38 = _p34._0(seed1);
				var b = _p38._0;
				var seed2 = _p38._1;
				var _p39 = _p35._0(seed2);
				var c = _p39._0;
				var seed3 = _p39._1;
				var _p40 = _p36._0(seed3);
				var d = _p40._0;
				var seed4 = _p40._1;
				return {
					ctor: '_Tuple2',
					_0: A4(func, a, b, c, d),
					_1: seed4
				};
			});
	});
var _elm_lang$core$Random$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p51 = _p46._0(seed0);
				var a = _p51._0;
				var seed1 = _p51._1;
				var _p52 = _p47._0(seed1);
				var b = _p52._0;
				var seed2 = _p52._1;
				var _p53 = _p48._0(seed2);
				var c = _p53._0;
				var seed3 = _p53._1;
				var _p54 = _p49._0(seed3);
				var d = _p54._0;
				var seed4 = _p54._1;
				var _p55 = _p50._0(seed4);
				var e = _p55._0;
				var seed5 = _p55._1;
				return {
					ctor: '_Tuple2',
					_0: A5(func, a, b, c, d, e),
					_1: seed5
				};
			});
	});
var _elm_lang$core$Random$andThen = F2(
	function (callback, _p56) {
		var _p57 = _p56;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var genB = _p59._0;
				return genB(newSeed);
			});
	});
var _elm_lang$core$Random$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _elm_lang$core$Random$initState = function (seed) {
	var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
	var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
	var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
	var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
	var z = newState1 - newState2;
	var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: newZ,
		_1: A2(_elm_lang$core$Random$State, newState1, newState2)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Tuple$second(
		_elm_lang$core$Random$next(_p65));
	var t1 = _p66._0;
	var t2 = _p66._1;
	var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
	var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Random$State, new_s1, t2),
		_1: A2(_elm_lang$core$Random$State, t1, new_s2)
	};
};
var _elm_lang$core$Random$Seed = function (a) {
	return {ctor: 'Seed', _0: a};
};
var _elm_lang$core$Random$int = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (_p69) {
				var _p70 = _p69;
				var _p75 = _p70._0;
				var base = 2147483561;
				var f = F3(
					function (n, acc, state) {
						f:
						while (true) {
							var _p71 = n;
							if (_p71 === 0) {
								return {ctor: '_Tuple2', _0: acc, _1: state};
							} else {
								var _p72 = _p75.next(state);
								var x = _p72._0;
								var nextState = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = nextState;
								n = _v27;
								acc = _v28;
								state = _v29;
								continue f;
							}
						}
					});
				var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p73._0;
				var hi = _p73._1;
				var k = (hi - lo) + 1;
				var n = A2(_elm_lang$core$Random$iLogBase, base, k);
				var _p74 = A3(f, n, 1, _p75.state);
				var v = _p74._0;
				var nextState = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: nextState}))
				};
			});
	});
var _elm_lang$core$Random$bool = A2(
	_elm_lang$core$Random$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_elm_lang$core$Random$int, 0, 1));
var _elm_lang$core$Random$float = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p76 = A2(
					_elm_lang$core$Random$step,
					A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
					seed);
				var number = _p76._0;
				var newSeed = _p76._1;
				var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
				var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p77._0;
				var hi = _p77._1;
				var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
				return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
			});
	});
var _elm_lang$core$Random$initialSeed = function (n) {
	return _elm_lang$core$Random$Seed(
		{
			state: _elm_lang$core$Random$initState(n),
			next: _elm_lang$core$Random$next,
			split: _elm_lang$core$Random$split,
			range: _elm_lang$core$Random$range
		});
};
var _elm_lang$core$Random$init = A2(
	_elm_lang$core$Task$andThen,
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	},
	_elm_lang$core$Time$now);
var _elm_lang$core$Random$Generate = function (a) {
	return {ctor: 'Generate', _0: a};
};
var _elm_lang$core$Random$generate = F2(
	function (tagger, generator) {
		return _elm_lang$core$Random$command(
			_elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, tagger, generator)));
	});
var _elm_lang$core$Random$cmdMap = F2(
	function (func, _p78) {
		var _p79 = _p78;
		return _elm_lang$core$Random$Generate(
			A2(_elm_lang$core$Random$map, func, _p79._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$keyboard$Keyboard$onSelfMsg = F3(
	function (router, _p0, state) {
		var _p1 = _p0;
		var _p2 = A2(_elm_lang$core$Dict$get, _p1.category, state);
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p1.keyCode));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p3) {
					return _elm_lang$core$Task$succeed(state);
				},
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.taggers)));
		}
	});
var _elm_lang$keyboard$Keyboard_ops = _elm_lang$keyboard$Keyboard_ops || {};
_elm_lang$keyboard$Keyboard_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p4) {
				return task2;
			},
			task1);
	});
var _elm_lang$keyboard$Keyboard$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$keyboard$Keyboard$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p5 = maybeValues;
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: value,
					_1: {ctor: '[]'}
				});
		} else {
			return _elm_lang$core$Maybe$Just(
				{ctor: '::', _0: value, _1: _p5._0});
		}
	});
var _elm_lang$keyboard$Keyboard$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p6 = subs;
			if (_p6.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p6._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p6._0._0,
					_elm_lang$keyboard$Keyboard$categorizeHelpHelp(_p6._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$keyboard$Keyboard$categorize = function (subs) {
	return A2(_elm_lang$keyboard$Keyboard$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$keyboard$Keyboard$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$keyboard$Keyboard$subscription = _elm_lang$core$Native_Platform.leaf('Keyboard');
var _elm_lang$keyboard$Keyboard$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$keyboard$Keyboard$Msg = F2(
	function (a, b) {
		return {category: a, keyCode: b};
	});
var _elm_lang$keyboard$Keyboard$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, pid),
										state));
							},
							_elm_lang$core$Process$spawn(
								A3(
									_elm_lang$dom$Dom_LowLevel$onDocument,
									category,
									_elm_lang$keyboard$Keyboard$keyCode,
									function (_p7) {
										return A2(
											_elm_lang$core$Platform$sendToSelf,
											router,
											A2(_elm_lang$keyboard$Keyboard$Msg, category, _p7));
									})));
					},
					task);
			});
		var bothStep = F4(
			function (category, _p8, taggers, task) {
				var _p9 = _p8;
				return A2(
					_elm_lang$core$Task$map,
					A2(
						_elm_lang$core$Dict$insert,
						category,
						A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, _p9.pid)),
					task);
			});
		var leftStep = F3(
			function (category, _p10, task) {
				var _p11 = _p10;
				return A2(
					_elm_lang$keyboard$Keyboard_ops['&>'],
					_elm_lang$core$Process$kill(_p11.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$keyboard$Keyboard$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$keyboard$Keyboard$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$keyboard$Keyboard$presses = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keypress', tagger));
};
var _elm_lang$keyboard$Keyboard$downs = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keydown', tagger));
};
var _elm_lang$keyboard$Keyboard$ups = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keyup', tagger));
};
var _elm_lang$keyboard$Keyboard$subMap = F2(
	function (func, _p12) {
		var _p13 = _p12;
		return A2(
			_elm_lang$keyboard$Keyboard$MySub,
			_p13._0,
			function (_p14) {
				return func(
					_p13._1(_p14));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Keyboard'] = {pkg: 'elm-lang/keyboard', init: _elm_lang$keyboard$Keyboard$init, onEffects: _elm_lang$keyboard$Keyboard$onEffects, onSelfMsg: _elm_lang$keyboard$Keyboard$onSelfMsg, tag: 'sub', subMap: _elm_lang$keyboard$Keyboard$subMap};

// import Native.Scheduler, Utils //

var _elm_lang$page_visibility$Native_PageVisibility = function() {


// sort out the prefixes

var hidden, change;
if (typeof document.hidden !== 'undefined')
{
	hidden = 'hidden';
	change = 'visibilitychange';
}
else if (typeof document.mozHidden !== 'undefined')
{
	hidden = 'mozHidden';
	change = 'mozvisibilitychange';
}
else if (typeof document.msHidden !== 'undefined')
{
	hidden = 'msHidden';
	change = 'msvisibilitychange';
}
else if (typeof document.webkitHidden !== 'undefined')
{
	hidden = 'webkitHidden';
	change = 'webkitvisibilitychange';
}


// actually provide functionality

function visibilityChange(toTask)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

		function performTask()
		{
			_elm_lang$core$Native_Scheduler.rawSpawn(toTask(document[hidden]));
		}

		document.addEventListener(change, performTask);

		return function()
		{
			document.removeEventListener(change, performTask);
		};
	});
}

var isHidden = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
	callback(_elm_lang$core$Native_Scheduler.succeed(document[hidden]));
});


return {
	visibilityChange: visibilityChange,
	isHidden: isHidden
};

}();

var _elm_lang$page_visibility$PageVisibility$onVisibilityChange = _elm_lang$page_visibility$Native_PageVisibility.visibilityChange;
var _elm_lang$page_visibility$PageVisibility$onEffects = F3(
	function (router, newSubs, state) {
		var _p0 = {ctor: '_Tuple2', _0: state, _1: newSubs};
		if (_p0._0.ctor === 'Nothing') {
			if (_p0._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(state);
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					},
					_elm_lang$core$Process$spawn(
						_elm_lang$page_visibility$PageVisibility$onVisibilityChange(
							_elm_lang$core$Platform$sendToSelf(router))));
			}
		} else {
			if (_p0._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p1) {
						return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
					},
					_elm_lang$core$Process$kill(_p0._0._0.pid));
			} else {
				return _elm_lang$core$Task$succeed(
					_elm_lang$core$Maybe$Just(
						{subs: newSubs, pid: _p0._0._0.pid}));
			}
		}
	});
var _elm_lang$page_visibility$PageVisibility$init = _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
var _elm_lang$page_visibility$PageVisibility$isHidden = _elm_lang$page_visibility$Native_PageVisibility.isHidden;
var _elm_lang$page_visibility$PageVisibility$isVisible = A2(_elm_lang$core$Task$map, _elm_lang$core$Basics$not, _elm_lang$page_visibility$PageVisibility$isHidden);
var _elm_lang$page_visibility$PageVisibility$subscription = _elm_lang$core$Native_Platform.leaf('PageVisibility');
var _elm_lang$page_visibility$PageVisibility$Hidden = {ctor: 'Hidden'};
var _elm_lang$page_visibility$PageVisibility$Visible = {ctor: 'Visible'};
var _elm_lang$page_visibility$PageVisibility$hiddenToVisibility = function (hidden) {
	return hidden ? _elm_lang$page_visibility$PageVisibility$Hidden : _elm_lang$page_visibility$PageVisibility$Visible;
};
var _elm_lang$page_visibility$PageVisibility$visibility = A2(_elm_lang$core$Task$map, _elm_lang$page_visibility$PageVisibility$hiddenToVisibility, _elm_lang$page_visibility$PageVisibility$isHidden);
var _elm_lang$page_visibility$PageVisibility$onSelfMsg = F3(
	function (router, hidden, state) {
		var _p2 = state;
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (_p3) {
				var _p4 = _p3;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p4._0(
						_elm_lang$page_visibility$PageVisibility$hiddenToVisibility(hidden)));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p5) {
					return _elm_lang$core$Task$succeed(state);
				},
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.subs)));
		}
	});
var _elm_lang$page_visibility$PageVisibility$Tagger = function (a) {
	return {ctor: 'Tagger', _0: a};
};
var _elm_lang$page_visibility$PageVisibility$visibilityChanges = function (tagger) {
	return _elm_lang$page_visibility$PageVisibility$subscription(
		_elm_lang$page_visibility$PageVisibility$Tagger(tagger));
};
var _elm_lang$page_visibility$PageVisibility$subMap = F2(
	function (func, _p6) {
		var _p7 = _p6;
		return _elm_lang$page_visibility$PageVisibility$Tagger(
			function (_p8) {
				return func(
					_p7._0(_p8));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['PageVisibility'] = {pkg: 'elm-lang/page-visibility', init: _elm_lang$page_visibility$PageVisibility$init, onEffects: _elm_lang$page_visibility$PageVisibility$onEffects, onSelfMsg: _elm_lang$page_visibility$PageVisibility$onSelfMsg, tag: 'sub', subMap: _elm_lang$page_visibility$PageVisibility$subMap};

var _elm_lang$window$Native_Window = function()
{

var size = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)	{
	callback(_elm_lang$core$Native_Scheduler.succeed({
		width: window.innerWidth,
		height: window.innerHeight
	}));
});

return {
	size: size
};

}();
var _elm_lang$window$Window_ops = _elm_lang$window$Window_ops || {};
_elm_lang$window$Window_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$window$Window$onSelfMsg = F3(
	function (router, dimensions, state) {
		var _p1 = state;
		if (_p1.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (_p2) {
				var _p3 = _p2;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p3._0(dimensions));
			};
			return A2(
				_elm_lang$window$Window_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p1._0.subs)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$window$Window$init = _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
var _elm_lang$window$Window$size = _elm_lang$window$Native_Window.size;
var _elm_lang$window$Window$width = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.width;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$height = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.height;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$onEffects = F3(
	function (router, newSubs, oldState) {
		var _p4 = {ctor: '_Tuple2', _0: oldState, _1: newSubs};
		if (_p4._0.ctor === 'Nothing') {
			if (_p4._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					},
					_elm_lang$core$Process$spawn(
						A3(
							_elm_lang$dom$Dom_LowLevel$onWindow,
							'resize',
							_elm_lang$core$Json_Decode$succeed(
								{ctor: '_Tuple0'}),
							function (_p5) {
								return A2(
									_elm_lang$core$Task$andThen,
									_elm_lang$core$Platform$sendToSelf(router),
									_elm_lang$window$Window$size);
							})));
			}
		} else {
			if (_p4._1.ctor === '[]') {
				return A2(
					_elm_lang$window$Window_ops['&>'],
					_elm_lang$core$Process$kill(_p4._0._0.pid),
					_elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing));
			} else {
				return _elm_lang$core$Task$succeed(
					_elm_lang$core$Maybe$Just(
						{subs: newSubs, pid: _p4._0._0.pid}));
			}
		}
	});
var _elm_lang$window$Window$subscription = _elm_lang$core$Native_Platform.leaf('Window');
var _elm_lang$window$Window$Size = F2(
	function (a, b) {
		return {width: a, height: b};
	});
var _elm_lang$window$Window$MySub = function (a) {
	return {ctor: 'MySub', _0: a};
};
var _elm_lang$window$Window$resizes = function (tagger) {
	return _elm_lang$window$Window$subscription(
		_elm_lang$window$Window$MySub(tagger));
};
var _elm_lang$window$Window$subMap = F2(
	function (func, _p6) {
		var _p7 = _p6;
		return _elm_lang$window$Window$MySub(
			function (_p8) {
				return func(
					_p7._0(_p8));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Window'] = {pkg: 'elm-lang/window', init: _elm_lang$window$Window$init, onEffects: _elm_lang$window$Window$onEffects, onSelfMsg: _elm_lang$window$Window$onSelfMsg, tag: 'sub', subMap: _elm_lang$window$Window$subMap};

var _mgold$elm_animation$Animation$isStatic = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$core$Native_Utils.eq(_p1._0.from, _p1._0.to);
};
var _mgold$elm_animation$Animation$isScheduled = F2(
	function (t, _p2) {
		var _p3 = _p2;
		return (_elm_lang$core$Native_Utils.cmp(t, _p3._0.start + _p3._0.delay) < 1) && (!_mgold$elm_animation$Animation$isStatic(_p3));
	});
var _mgold$elm_animation$Animation$getTo = function (_p4) {
	var _p5 = _p4;
	return _p5._0.to;
};
var _mgold$elm_animation$Animation$getFrom = function (_p6) {
	var _p7 = _p6;
	return _p7._0.from;
};
var _mgold$elm_animation$Animation$getEase = function (_p8) {
	var _p9 = _p8;
	return _p9._0.ease;
};
var _mgold$elm_animation$Animation$getDelay = function (_p10) {
	var _p11 = _p10;
	return _p11._0.delay;
};
var _mgold$elm_animation$Animation$getStart = function (_p12) {
	var _p13 = _p12;
	return _p13._0.start;
};
var _mgold$elm_animation$Animation$timeElapsed = F2(
	function (t, _p14) {
		var _p15 = _p14;
		return A2(_elm_lang$core$Basics$max, 0, t - (_p15._0.start + _p15._0.delay));
	});
var _mgold$elm_animation$Animation$defaultEase = function (x) {
	return (1 - _elm_lang$core$Basics$cos(_elm_lang$core$Basics$pi * x)) / 2;
};
var _mgold$elm_animation$Animation$spd = F3(
	function (dos, from, to) {
		var _p16 = dos;
		if (_p16.ctor === 'Duration') {
			return _elm_lang$core$Basics$abs(to - from) / _p16._0;
		} else {
			return _p16._0;
		}
	});
var _mgold$elm_animation$Animation$getSpeed = function (_p17) {
	var _p18 = _p17;
	return A3(_mgold$elm_animation$Animation$spd, _p18._0.dos, _p18._0.from, _p18._0.to);
};
var _mgold$elm_animation$Animation$dur = F3(
	function (dos, from, to) {
		var _p19 = dos;
		if (_p19.ctor === 'Duration') {
			return _p19._0;
		} else {
			return _elm_lang$core$Basics$abs(to - from) / _p19._0;
		}
	});
var _mgold$elm_animation$Animation$animate = F2(
	function (t, _p20) {
		var _p21 = _p20;
		var _p25 = _p21._0.to;
		var _p24 = _p21._0.start;
		var _p23 = _p21._0.from;
		var duration = A3(_mgold$elm_animation$Animation$dur, _p21._0.dos, _p23, _p25);
		var fr = A3(_elm_lang$core$Basics$clamp, 0, 1, ((t - _p24) - _p21._0.delay) / duration);
		var eased = _p21._0.ease(fr);
		var correction = function () {
			var _p22 = _p21._0.ramp;
			if (_p22.ctor === 'Nothing') {
				return 0;
			} else {
				var from_ = _p22._0 * (t - _p24);
				var eased_ = _mgold$elm_animation$Animation$defaultEase(fr);
				return from_ - (from_ * eased_);
			}
		}();
		return (_p23 + ((_p25 - _p23) * eased)) + correction;
	});
var _mgold$elm_animation$Animation$velocity = F2(
	function (t, u) {
		var forwDiff = A2(_mgold$elm_animation$Animation$animate, t + 10, u);
		var backDiff = A2(_mgold$elm_animation$Animation$animate, t - 10, u);
		return (forwDiff - backDiff) / 20;
	});
var _mgold$elm_animation$Animation$timeRemaining = F2(
	function (t, _p26) {
		var _p27 = _p26;
		var duration = A3(_mgold$elm_animation$Animation$dur, _p27._0.dos, _p27._0.from, _p27._0.to);
		return A2(_elm_lang$core$Basics$max, 0, ((_p27._0.start + _p27._0.delay) + duration) - t);
	});
var _mgold$elm_animation$Animation$getDuration = function (_p28) {
	var _p29 = _p28;
	return A3(_mgold$elm_animation$Animation$dur, _p29._0.dos, _p29._0.from, _p29._0.to);
};
var _mgold$elm_animation$Animation$equals = F2(
	function (_p31, _p30) {
		var _p32 = _p31;
		var _p35 = _p32._0;
		var _p33 = _p30;
		var _p34 = _p33._0;
		return _elm_lang$core$Native_Utils.eq(_p35.start + _p35.delay, _p34.start + _p34.delay) && (_elm_lang$core$Native_Utils.eq(_p35.from, _p34.from) && (_elm_lang$core$Native_Utils.eq(_p35.to, _p34.to) && (_elm_lang$core$Native_Utils.eq(_p35.ramp, _p34.ramp) && ((_elm_lang$core$Native_Utils.eq(_p35.dos, _p34.dos) || (_elm_lang$core$Native_Utils.cmp(
			1.0e-3,
			_elm_lang$core$Basics$abs(
				A3(_mgold$elm_animation$Animation$dur, _p35.dos, _p35.from, _p35.to) - A3(_mgold$elm_animation$Animation$dur, _p34.dos, _p34.from, _p34.to))) > -1)) && A2(
			_elm_lang$core$List$all,
			function (t) {
				return _elm_lang$core$Native_Utils.eq(
					_p35.ease(t),
					_p34.ease(t));
			},
			{
				ctor: '::',
				_0: 0.1,
				_1: {
					ctor: '::',
					_0: 0.3,
					_1: {
						ctor: '::',
						_0: 0.7,
						_1: {
							ctor: '::',
							_0: 0.9,
							_1: {ctor: '[]'}
						}
					}
				}
			})))));
	});
var _mgold$elm_animation$Animation$isRunning = F2(
	function (t, _p36) {
		var _p37 = _p36;
		var _p39 = _p37._0.start;
		var _p38 = _p37._0.delay;
		var duration = A3(_mgold$elm_animation$Animation$dur, _p37._0.dos, _p37._0.from, _p37._0.to);
		return (_elm_lang$core$Native_Utils.cmp(t, _p39 + _p38) > 0) && ((_elm_lang$core$Native_Utils.cmp(t, (_p39 + _p38) + duration) < 0) && (!_mgold$elm_animation$Animation$isStatic(_p37)));
	});
var _mgold$elm_animation$Animation$isDone = F2(
	function (t, _p40) {
		var _p41 = _p40;
		var duration = A3(_mgold$elm_animation$Animation$dur, _p41._0.dos, _p41._0.from, _p41._0.to);
		return _mgold$elm_animation$Animation$isStatic(_p41) || (_elm_lang$core$Native_Utils.cmp(t, (_p41._0.start + _p41._0.delay) + duration) > -1);
	});
var _mgold$elm_animation$Animation$AnimRecord = F7(
	function (a, b, c, d, e, f, g) {
		return {start: a, delay: b, dos: c, ramp: d, ease: e, from: f, to: g};
	});
var _mgold$elm_animation$Animation$Speed = function (a) {
	return {ctor: 'Speed', _0: a};
};
var _mgold$elm_animation$Animation$Duration = function (a) {
	return {ctor: 'Duration', _0: a};
};
var _mgold$elm_animation$Animation$defaultDuration = _mgold$elm_animation$Animation$Duration(750 * _elm_lang$core$Time$millisecond);
var _mgold$elm_animation$Animation$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mgold$elm_animation$Animation$animation = function (t) {
	return _mgold$elm_animation$Animation$A(
		A7(_mgold$elm_animation$Animation$AnimRecord, t, 0, _mgold$elm_animation$Animation$defaultDuration, _elm_lang$core$Maybe$Nothing, _mgold$elm_animation$Animation$defaultEase, 0, 1));
};
var _mgold$elm_animation$Animation$static = function (x) {
	return _mgold$elm_animation$Animation$A(
		A7(_mgold$elm_animation$Animation$AnimRecord, 0, 0, _mgold$elm_animation$Animation$defaultDuration, _elm_lang$core$Maybe$Nothing, _mgold$elm_animation$Animation$defaultEase, x, x));
};
var _mgold$elm_animation$Animation$undo = F2(
	function (t, _p42) {
		var _p43 = _p42;
		var _p44 = _p43._0;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p44,
				{
					from: _p44.to,
					to: _p44.from,
					start: t,
					delay: 0 - A2(_mgold$elm_animation$Animation$timeRemaining, t, _p43),
					ramp: _elm_lang$core$Maybe$Nothing,
					ease: function (t) {
						return 1 - _p44.ease(1 - t);
					}
				}));
	});
var _mgold$elm_animation$Animation$retarget = F3(
	function (t, newTo, _p45) {
		var _p46 = _p45;
		var _p49 = _p46;
		var _p48 = _p46._0;
		if (_elm_lang$core$Native_Utils.eq(newTo, _p48.to)) {
			return _p49;
		} else {
			if (_mgold$elm_animation$Animation$isStatic(_p49)) {
				return _mgold$elm_animation$Animation$A(
					_elm_lang$core$Native_Utils.update(
						_p48,
						{start: t, to: newTo, ramp: _elm_lang$core$Maybe$Nothing}));
			} else {
				if (A2(_mgold$elm_animation$Animation$isScheduled, t, _p49)) {
					return _mgold$elm_animation$Animation$A(
						_elm_lang$core$Native_Utils.update(
							_p48,
							{to: newTo, ramp: _elm_lang$core$Maybe$Nothing}));
				} else {
					if (A2(_mgold$elm_animation$Animation$isDone, t, _p49)) {
						return _mgold$elm_animation$Animation$A(
							_elm_lang$core$Native_Utils.update(
								_p48,
								{start: t, delay: 0, from: _p48.to, to: newTo, ramp: _elm_lang$core$Maybe$Nothing}));
					} else {
						var newSpeed = function () {
							var _p47 = _p48.dos;
							if (_p47.ctor === 'Speed') {
								return _p48.dos;
							} else {
								return _mgold$elm_animation$Animation$Speed(
									A3(_mgold$elm_animation$Animation$spd, _p48.dos, _p48.from, _p48.to));
							}
						}();
						var pos = A2(_mgold$elm_animation$Animation$animate, t, _p49);
						var vel = A2(_mgold$elm_animation$Animation$velocity, t, _p49);
						return _mgold$elm_animation$Animation$A(
							A7(
								_mgold$elm_animation$Animation$AnimRecord,
								t,
								0,
								newSpeed,
								_elm_lang$core$Maybe$Just(vel),
								_p48.ease,
								pos,
								newTo));
					}
				}
			}
		}
	});
var _mgold$elm_animation$Animation$duration = F2(
	function (x, _p50) {
		var _p51 = _p50;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p51._0,
				{
					dos: _mgold$elm_animation$Animation$Duration(x)
				}));
	});
var _mgold$elm_animation$Animation$speed = F2(
	function (x, _p52) {
		var _p53 = _p52;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p53._0,
				{
					dos: _mgold$elm_animation$Animation$Speed(
						_elm_lang$core$Basics$abs(x))
				}));
	});
var _mgold$elm_animation$Animation$delay = F2(
	function (x, _p54) {
		var _p55 = _p54;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p55._0,
				{delay: x}));
	});
var _mgold$elm_animation$Animation$ease = F2(
	function (x, _p56) {
		var _p57 = _p56;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p57._0,
				{ease: x}));
	});
var _mgold$elm_animation$Animation$from = F2(
	function (x, _p58) {
		var _p59 = _p58;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p59._0,
				{from: x, ramp: _elm_lang$core$Maybe$Nothing}));
	});
var _mgold$elm_animation$Animation$to = F2(
	function (x, _p60) {
		var _p61 = _p60;
		return _mgold$elm_animation$Animation$A(
			_elm_lang$core$Native_Utils.update(
				_p61._0,
				{to: x, ramp: _elm_lang$core$Maybe$Nothing}));
	});

var _w0rm$elm_mogee$Components_Mogee$rotate = function (list) {
	var _p0 = list;
	if (_p0.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_p0._1,
			{
				ctor: '::',
				_0: _p0._0,
				_1: {ctor: '[]'}
			});
	}
};
var _w0rm$elm_mogee$Components_Mogee$standing = {
	ctor: '::',
	_0: 2,
	_1: {
		ctor: '::',
		_0: 1,
		_1: {
			ctor: '::',
			_0: 0,
			_1: {
				ctor: '::',
				_0: 1,
				_1: {ctor: '[]'}
			}
		}
	}
};
var _w0rm$elm_mogee$Components_Mogee$walking = {
	ctor: '::',
	_0: 4,
	_1: {
		ctor: '::',
		_0: 5,
		_1: {
			ctor: '::',
			_0: 5,
			_1: {
				ctor: '::',
				_0: 6,
				_1: {ctor: '[]'}
			}
		}
	}
};
var _w0rm$elm_mogee$Components_Mogee$height = 10;
var _w0rm$elm_mogee$Components_Mogee$width = 7;
var _w0rm$elm_mogee$Components_Mogee$Mogee = F3(
	function (a, b, c) {
		return {elapsed: a, frames: b, state: c};
	});
var _w0rm$elm_mogee$Components_Mogee$Dead = {ctor: 'Dead'};
var _w0rm$elm_mogee$Components_Mogee$isDead = function (_p1) {
	var _p2 = _p1;
	return _elm_lang$core$Native_Utils.eq(_p2.state, _w0rm$elm_mogee$Components_Mogee$Dead);
};
var _w0rm$elm_mogee$Components_Mogee$die = function (mogee) {
	return _elm_lang$core$Native_Utils.update(
		mogee,
		{
			state: _w0rm$elm_mogee$Components_Mogee$Dead,
			frames: {
				ctor: '::',
				_0: 7,
				_1: {ctor: '[]'}
			}
		});
};
var _w0rm$elm_mogee$Components_Mogee$Standing = {ctor: 'Standing'};
var _w0rm$elm_mogee$Components_Mogee$mogee = {elapsed: 0, frames: _w0rm$elm_mogee$Components_Mogee$standing, state: _w0rm$elm_mogee$Components_Mogee$Standing};
var _w0rm$elm_mogee$Components_Mogee$Walking = {ctor: 'Walking'};
var _w0rm$elm_mogee$Components_Mogee$updateState = F2(
	function (directionX, mogee) {
		var _p3 = mogee.state;
		switch (_p3.ctor) {
			case 'Standing':
				return (!_elm_lang$core$Native_Utils.eq(directionX, 0)) ? _elm_lang$core$Native_Utils.update(
					mogee,
					{state: _w0rm$elm_mogee$Components_Mogee$Walking, frames: _w0rm$elm_mogee$Components_Mogee$walking}) : mogee;
			case 'Walking':
				return _elm_lang$core$Native_Utils.eq(directionX, 0) ? _elm_lang$core$Native_Utils.update(
					mogee,
					{state: _w0rm$elm_mogee$Components_Mogee$Standing, frames: _w0rm$elm_mogee$Components_Mogee$standing}) : mogee;
			default:
				return mogee;
		}
	});
var _w0rm$elm_mogee$Components_Mogee$update = F3(
	function (dt, directionX, mogee) {
		var newMogee = A2(_w0rm$elm_mogee$Components_Mogee$updateState, directionX, mogee);
		var timeout = _elm_lang$core$Native_Utils.eq(newMogee.state, _w0rm$elm_mogee$Components_Mogee$Standing) ? 1000 : 200;
		var newElapsed = newMogee.elapsed + dt;
		return (_elm_lang$core$Native_Utils.cmp(newElapsed, timeout) > 0) ? _elm_lang$core$Native_Utils.update(
			newMogee,
			{
				elapsed: newElapsed - timeout,
				frames: _w0rm$elm_mogee$Components_Mogee$rotate(newMogee.frames)
			}) : _elm_lang$core$Native_Utils.update(
			newMogee,
			{elapsed: newElapsed});
	});

var _w0rm$elm_mogee$Components_Direction$pickRandom = F2(
	function (list, $default) {
		return A2(
			_elm_lang$core$Random$map,
			function (index) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					$default,
					_elm_lang$core$List$head(
						A2(_elm_lang$core$List$drop, index, list)));
			},
			A2(
				_elm_lang$core$Random$int,
				0,
				_elm_lang$core$List$length(list) - 1));
	});
var _w0rm$elm_mogee$Components_Direction$Bottom = {ctor: 'Bottom'};
var _w0rm$elm_mogee$Components_Direction$Top = {ctor: 'Top'};
var _w0rm$elm_mogee$Components_Direction$Right = {ctor: 'Right'};
var _w0rm$elm_mogee$Components_Direction$possibleDirections = {
	ctor: '::',
	_0: _w0rm$elm_mogee$Components_Direction$Right,
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Components_Direction$Top,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Components_Direction$Bottom,
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Components_Direction$Left = {ctor: 'Left'};
var _w0rm$elm_mogee$Components_Direction$opposite = function (dir) {
	var _p0 = dir;
	switch (_p0.ctor) {
		case 'Left':
			return _w0rm$elm_mogee$Components_Direction$Right;
		case 'Right':
			return _w0rm$elm_mogee$Components_Direction$Left;
		case 'Top':
			return _w0rm$elm_mogee$Components_Direction$Bottom;
		default:
			return _w0rm$elm_mogee$Components_Direction$Top;
	}
};
var _w0rm$elm_mogee$Components_Direction$next = function (direction) {
	return A2(
		_w0rm$elm_mogee$Components_Direction$pickRandom,
		A2(
			_elm_lang$core$List$filter,
			F2(
				function (x, y) {
					return !_elm_lang$core$Native_Utils.eq(x, y);
				})(
				_w0rm$elm_mogee$Components_Direction$opposite(direction)),
			_w0rm$elm_mogee$Components_Direction$possibleDirections),
		direction);
};

var _w0rm$elm_mogee$Components_Screen$velocityIncrement = 1.5e-3;
var _w0rm$elm_mogee$Components_Screen$velocity = 1.5e-2;
var _w0rm$elm_mogee$Components_Screen$size = 64;
var _w0rm$elm_mogee$Components_Screen$Screen = F6(
	function (a, b, c, d, e, f) {
		return {from: a, to: b, number: c, frame: d, state: e, velocity: f};
	});
var _w0rm$elm_mogee$Components_Screen$Moving = {ctor: 'Moving'};
var _w0rm$elm_mogee$Components_Screen$Rotating = {ctor: 'Rotating'};
var _w0rm$elm_mogee$Components_Screen$Initial = {ctor: 'Initial'};
var _w0rm$elm_mogee$Components_Screen$screen = F3(
	function (from, to, number) {
		return {
			from: from,
			to: to,
			number: number,
			frame: 0,
			state: _w0rm$elm_mogee$Components_Screen$Initial,
			velocity: _w0rm$elm_mogee$Components_Screen$velocity + (_w0rm$elm_mogee$Components_Screen$velocityIncrement * _elm_lang$core$Basics$toFloat(number))
		};
	});
var _w0rm$elm_mogee$Components_Screen$update = F2(
	function (dt, screen) {
		if (_elm_lang$core$Native_Utils.eq(screen.state, _w0rm$elm_mogee$Components_Screen$Initial)) {
			return screen;
		} else {
			var frame = screen.frame + ((screen.velocity * dt) / 2);
			return (_elm_lang$core$Native_Utils.cmp(frame, 8) > -1) ? _elm_lang$core$Native_Utils.update(
				screen,
				{frame: 8 - frame, state: _w0rm$elm_mogee$Components_Screen$Moving}) : _elm_lang$core$Native_Utils.update(
				screen,
				{frame: frame});
		}
	});
var _w0rm$elm_mogee$Components_Screen$activate = function (screen) {
	return _elm_lang$core$Native_Utils.eq(screen.state, _w0rm$elm_mogee$Components_Screen$Initial) ? (_elm_lang$core$Native_Utils.eq(screen.to, screen.from) ? _elm_lang$core$Native_Utils.update(
		screen,
		{state: _w0rm$elm_mogee$Components_Screen$Moving, frame: 0}) : _elm_lang$core$Native_Utils.update(
		screen,
		{state: _w0rm$elm_mogee$Components_Screen$Rotating, frame: 0})) : screen;
};

var _w0rm$elm_mogee$Components_Transform$collide = F2(
	function (t1, t2) {
		return (_elm_lang$core$Native_Utils.cmp(t1.x, t2.x + t2.width) < 0) && ((_elm_lang$core$Native_Utils.cmp(t1.x + t1.width, t2.x) > 0) && ((_elm_lang$core$Native_Utils.cmp(t1.y, t2.y + t2.height) < 0) && (_elm_lang$core$Native_Utils.cmp(t1.y + t1.height, t2.y) > 0)));
	});
var _w0rm$elm_mogee$Components_Transform$invertScreen = F2(
	function (direction, transform) {
		var _p0 = direction;
		switch (_p0.ctor) {
			case 'Left':
				return _elm_lang$core$Native_Utils.update(
					transform,
					{width: _w0rm$elm_mogee$Components_Screen$size - transform.width, x: transform.x + transform.width});
			case 'Right':
				return _elm_lang$core$Native_Utils.update(
					transform,
					{width: _w0rm$elm_mogee$Components_Screen$size - transform.width, x: transform.x - (_w0rm$elm_mogee$Components_Screen$size - transform.width)});
			case 'Top':
				return _elm_lang$core$Native_Utils.update(
					transform,
					{height: _w0rm$elm_mogee$Components_Screen$size - transform.height, y: transform.y + transform.height});
			default:
				return _elm_lang$core$Native_Utils.update(
					transform,
					{height: _w0rm$elm_mogee$Components_Screen$size - transform.height, y: transform.y - (_w0rm$elm_mogee$Components_Screen$size - transform.height)});
		}
	});
var _w0rm$elm_mogee$Components_Transform$offset = F3(
	function (_p1, direction, transform) {
		var _p2 = _p1;
		var _p5 = _p2._1;
		var _p4 = _p2._0;
		var _p3 = direction;
		switch (_p3.ctor) {
			case 'Left':
				return _elm_lang$core$Native_Utils.update(
					transform,
					{x: transform.x - _p4});
			case 'Right':
				return _elm_lang$core$Native_Utils.update(
					transform,
					{x: transform.x + _p4});
			case 'Top':
				return _elm_lang$core$Native_Utils.update(
					transform,
					{y: transform.y - _p5});
			default:
				return _elm_lang$core$Native_Utils.update(
					transform,
					{y: transform.y + _p5});
		}
	});
var _w0rm$elm_mogee$Components_Transform$offsetBy = F2(
	function (_p6, transform) {
		var _p7 = _p6;
		return _elm_lang$core$Native_Utils.update(
			transform,
			{x: transform.x - _p7._0, y: transform.y - _p7._1});
	});
var _w0rm$elm_mogee$Components_Transform$Transform = F4(
	function (a, b, c, d) {
		return {width: a, height: b, x: c, y: d};
	});

var _w0rm$elm_mogee$Components_Velocity$Velocity = F2(
	function (a, b) {
		return {vx: a, vy: b};
	});

var _w0rm$elm_mogee$Components_Wall$Wall = {ctor: 'Wall'};
var _w0rm$elm_mogee$Components_Wall$wall = _w0rm$elm_mogee$Components_Wall$Wall;

var _w0rm$elm_mogee$Components_Components$addWall = F2(
	function (transform, components) {
		return _elm_lang$core$Native_Utils.update(
			components,
			{
				uid: components.uid + 1,
				walls: A3(_elm_lang$core$Dict$insert, components.uid, _w0rm$elm_mogee$Components_Wall$wall, components.walls),
				transforms: A3(_elm_lang$core$Dict$insert, components.uid, transform, components.transforms)
			});
	});
var _w0rm$elm_mogee$Components_Components$addMogee = F3(
	function (x, y, components) {
		return _elm_lang$core$Native_Utils.update(
			components,
			{
				uid: components.uid + 1,
				mogees: A3(_elm_lang$core$Dict$insert, components.uid, _w0rm$elm_mogee$Components_Mogee$mogee, components.mogees),
				transforms: A3(
					_elm_lang$core$Dict$insert,
					components.uid,
					{x: x, y: y, width: _w0rm$elm_mogee$Components_Mogee$width, height: _w0rm$elm_mogee$Components_Mogee$height},
					components.transforms),
				velocities: A3(
					_elm_lang$core$Dict$insert,
					components.uid,
					{vx: 0, vy: 0},
					components.velocities)
			});
	});
var _w0rm$elm_mogee$Components_Components$addWalls = F3(
	function (from, to, components) {
		return A3(
			_elm_lang$core$List$foldl,
			function (d) {
				if (_elm_lang$core$Native_Utils.eq(
					d,
					_w0rm$elm_mogee$Components_Direction$opposite(from)) || _elm_lang$core$Native_Utils.eq(d, to)) {
					return _elm_lang$core$Basics$identity;
				} else {
					var _p0 = d;
					switch (_p0.ctor) {
						case 'Left':
							return _w0rm$elm_mogee$Components_Components$addWall(
								{width: 1, height: _w0rm$elm_mogee$Components_Screen$size, x: 0, y: 0});
						case 'Right':
							return _w0rm$elm_mogee$Components_Components$addWall(
								{width: 1, height: _w0rm$elm_mogee$Components_Screen$size, x: _w0rm$elm_mogee$Components_Screen$size - 1, y: 0});
						case 'Top':
							return _w0rm$elm_mogee$Components_Components$addWall(
								{width: _w0rm$elm_mogee$Components_Screen$size, height: 1, x: 0, y: 0});
						default:
							return _w0rm$elm_mogee$Components_Components$addWall(
								{width: _w0rm$elm_mogee$Components_Screen$size, height: 1, x: 0, y: _w0rm$elm_mogee$Components_Screen$size - 1});
					}
				}
			},
			components,
			{
				ctor: '::',
				_0: _w0rm$elm_mogee$Components_Direction$Left,
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Components_Direction$Right,
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Components_Direction$Top,
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Components_Direction$Bottom,
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _w0rm$elm_mogee$Components_Components$addScreen = F4(
	function (from, to, number, components) {
		return A3(
			_w0rm$elm_mogee$Components_Components$addWalls,
			from,
			to,
			A2(
				_w0rm$elm_mogee$Components_Components$addWall,
				{width: 19, height: 2, x: 17, y: 58},
				A2(
					_w0rm$elm_mogee$Components_Components$addWall,
					{width: 33, height: 2, x: 31, y: 43},
					A2(
						_w0rm$elm_mogee$Components_Components$addWall,
						{width: 11, height: 2, x: 0, y: 43},
						A2(
							_w0rm$elm_mogee$Components_Components$addWall,
							{width: 13, height: 2, x: 51, y: 27},
							A2(
								_w0rm$elm_mogee$Components_Components$addWall,
								{width: 11, height: 2, x: 6, y: 27},
								A2(
									_w0rm$elm_mogee$Components_Components$addWall,
									{width: 16, height: 2, x: 24, y: 11},
									A2(
										_w0rm$elm_mogee$Components_Components$addWall,
										{width: 7, height: 2, x: 0, y: 11},
										_elm_lang$core$Native_Utils.update(
											components,
											{
												uid: components.uid + 1,
												screens: A3(
													_elm_lang$core$Dict$insert,
													components.uid,
													A3(_w0rm$elm_mogee$Components_Screen$screen, from, to, number),
													components.screens),
												transforms: A3(
													_elm_lang$core$Dict$insert,
													components.uid,
													{x: 0, y: 0, width: _w0rm$elm_mogee$Components_Screen$size, height: _w0rm$elm_mogee$Components_Screen$size},
													components.transforms)
											})))))))));
	});
var _w0rm$elm_mogee$Components_Components$delete = F2(
	function (uid, components) {
		return _elm_lang$core$Native_Utils.update(
			components,
			{
				mogees: A2(_elm_lang$core$Dict$remove, uid, components.mogees),
				screens: A2(_elm_lang$core$Dict$remove, uid, components.screens),
				transforms: A2(_elm_lang$core$Dict$remove, uid, components.transforms),
				velocities: A2(_elm_lang$core$Dict$remove, uid, components.velocities),
				walls: A2(_elm_lang$core$Dict$remove, uid, components.walls)
			});
	});
var _w0rm$elm_mogee$Components_Components$initial = A4(
	_w0rm$elm_mogee$Components_Components$addScreen,
	_w0rm$elm_mogee$Components_Direction$Left,
	_w0rm$elm_mogee$Components_Direction$Right,
	0,
	A3(
		_w0rm$elm_mogee$Components_Components$addMogee,
		28,
		27,
		{uid: 0, mogees: _elm_lang$core$Dict$empty, screens: _elm_lang$core$Dict$empty, transforms: _elm_lang$core$Dict$empty, velocities: _elm_lang$core$Dict$empty, walls: _elm_lang$core$Dict$empty}));
var _w0rm$elm_mogee$Components_Components$foldl3 = F5(
	function (fn, initial, component1, component2, component3) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F2(
				function (uid, a) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Basics$identity,
						A3(
							_elm_lang$core$Maybe$map2,
							A2(fn, uid, a),
							A2(_elm_lang$core$Dict$get, uid, component2),
							A2(_elm_lang$core$Dict$get, uid, component3)));
				}),
			initial,
			component1);
	});
var _w0rm$elm_mogee$Components_Components$foldl2 = F4(
	function (fn, initial, component1, component2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F2(
				function (uid, a) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Basics$identity,
						A2(
							_elm_lang$core$Maybe$map,
							A2(fn, uid, a),
							A2(_elm_lang$core$Dict$get, uid, component2)));
				}),
			initial,
			component1);
	});
var _w0rm$elm_mogee$Components_Components$foldl = _elm_lang$core$Dict$foldl;
var _w0rm$elm_mogee$Components_Components$mogeeOffset = function (_p1) {
	var _p2 = _p1;
	return A2(
		_elm_lang$core$Maybe$withDefault,
		{x: 32, y: 32, width: _w0rm$elm_mogee$Components_Mogee$width, height: _w0rm$elm_mogee$Components_Mogee$height},
		A2(
			_elm_lang$core$Maybe$andThen,
			function (uid) {
				return A2(_elm_lang$core$Dict$get, uid, _p2.transforms);
			},
			_elm_lang$core$List$head(
				_elm_lang$core$Dict$keys(_p2.mogees))));
};
var _w0rm$elm_mogee$Components_Components$isDead = function (_p3) {
	return A2(
		_elm_lang$core$List$any,
		_w0rm$elm_mogee$Components_Mogee$isDead,
		_elm_lang$core$Dict$values(
			function (_) {
				return _.mogees;
			}(_p3)));
};
var _w0rm$elm_mogee$Components_Components$Components = F6(
	function (a, b, c, d, e, f) {
		return {uid: a, mogees: b, screens: c, transforms: d, velocities: e, walls: f};
	});

var _w0rm$elm_mogee$Components_Keys$anykey = function (_p0) {
	return A2(
		_elm_lang$core$List$member,
		0,
		_elm_lang$core$Dict$values(_p0));
};
var _w0rm$elm_mogee$Components_Keys$down = _elm_lang$core$Dict$member;
var _w0rm$elm_mogee$Components_Keys$pressed = F2(
	function (code, keys) {
		return _elm_lang$core$Native_Utils.eq(
			A2(_elm_lang$core$Dict$get, code, keys),
			_elm_lang$core$Maybe$Just(0));
	});
var _w0rm$elm_mogee$Components_Keys$animate = function (elapsed) {
	return _elm_lang$core$Dict$map(
		function (_p1) {
			return F2(
				function (x, y) {
					return x + y;
				})(elapsed);
		});
};
var _w0rm$elm_mogee$Components_Keys$keyChange = F3(
	function (on, code, keys) {
		return on ? (A2(_elm_lang$core$Dict$member, code, keys) ? keys : A3(_elm_lang$core$Dict$insert, code, 0, keys)) : A2(_elm_lang$core$Dict$remove, code, keys);
	});
var _w0rm$elm_mogee$Components_Keys$codes = {enter: 13, space: 32, escape: 27, left: 37, right: 39, up: 38, down: 40};
var _w0rm$elm_mogee$Components_Keys$directions = function (keys) {
	var direction = F2(
		function (a, b) {
			var _p2 = {ctor: '_Tuple2', _0: a, _1: b};
			_v0_2:
			do {
				if (_p2.ctor === '_Tuple2') {
					if (_p2._0 === true) {
						if (_p2._1 === false) {
							return -1;
						} else {
							break _v0_2;
						}
					} else {
						if (_p2._1 === true) {
							return 1;
						} else {
							break _v0_2;
						}
					}
				} else {
					break _v0_2;
				}
			} while(false);
			return 0;
		});
	return {
		x: A2(
			direction,
			A2(_w0rm$elm_mogee$Components_Keys$down, _w0rm$elm_mogee$Components_Keys$codes.left, keys),
			A2(_w0rm$elm_mogee$Components_Keys$down, _w0rm$elm_mogee$Components_Keys$codes.right, keys)),
		y: A2(
			direction,
			A2(_w0rm$elm_mogee$Components_Keys$down, _w0rm$elm_mogee$Components_Keys$codes.down, keys),
			A2(_w0rm$elm_mogee$Components_Keys$down, _w0rm$elm_mogee$Components_Keys$codes.up, keys))
	};
};
var _w0rm$elm_mogee$Components_Keys$initial = _elm_lang$core$Dict$empty;

var _w0rm$elm_mogee$Components_Menu$tick = F2(
	function (elapsed, menu) {
		return _elm_lang$core$Native_Utils.update(
			menu,
			{time: menu.time + elapsed});
	});
var _w0rm$elm_mogee$Components_Menu$choose = F2(
	function (section, menu) {
		return _elm_lang$core$Native_Utils.update(
			menu,
			{section: section});
	});
var _w0rm$elm_mogee$Components_Menu$goTo = F2(
	function (section, menu) {
		return _elm_lang$core$Native_Utils.update(
			menu,
			{time: 0, section: section});
	});
var _w0rm$elm_mogee$Components_Menu$Menu = F2(
	function (a, b) {
		return {time: a, section: b};
	});
var _w0rm$elm_mogee$Components_Menu$End = {ctor: 'End'};
var _w0rm$elm_mogee$Components_Menu$Resume = {ctor: 'Resume'};
var _w0rm$elm_mogee$Components_Menu$Action = {ctor: 'Action'};
var _w0rm$elm_mogee$Components_Menu$Start = {ctor: 'Start'};
var _w0rm$elm_mogee$Components_Menu$ToggleSound = function (a) {
	return {ctor: 'ToggleSound', _0: a};
};
var _w0rm$elm_mogee$Components_Menu$Noop = {ctor: 'Noop'};
var _w0rm$elm_mogee$Components_Menu$SlidesSection = {ctor: 'SlidesSection'};
var _w0rm$elm_mogee$Components_Menu$CreditsSection = {ctor: 'CreditsSection'};
var _w0rm$elm_mogee$Components_Menu$PauseSection = function (a) {
	return {ctor: 'PauseSection', _0: a};
};
var _w0rm$elm_mogee$Components_Menu$MenuSection = function (a) {
	return {ctor: 'MenuSection', _0: a};
};
var _w0rm$elm_mogee$Components_Menu$HomeSection = function (a) {
	return {ctor: 'HomeSection', _0: a};
};
var _w0rm$elm_mogee$Components_Menu$GoToMenu = {ctor: 'GoToMenu'};
var _w0rm$elm_mogee$Components_Menu$StartTheGame = {ctor: 'StartTheGame'};
var _w0rm$elm_mogee$Components_Menu$start = {
	time: 0,
	section: _w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$StartTheGame)
};
var _w0rm$elm_mogee$Components_Menu$GoToSlides = {ctor: 'GoToSlides'};
var _w0rm$elm_mogee$Components_Menu$GoToCredits = {ctor: 'GoToCredits'};
var _w0rm$elm_mogee$Components_Menu$SoundOnOff = {ctor: 'SoundOnOff'};
var _w0rm$elm_mogee$Components_Menu$ResumeGame = {ctor: 'ResumeGame'};
var _w0rm$elm_mogee$Components_Menu$paused = {
	time: 0,
	section: _w0rm$elm_mogee$Components_Menu$PauseSection(_w0rm$elm_mogee$Components_Menu$ResumeGame)
};
var _w0rm$elm_mogee$Components_Menu$EndGame = {ctor: 'EndGame'};
var _w0rm$elm_mogee$Components_Menu$update = F4(
	function (elapsed, sound, keys, menu) {
		var _p0 = menu.section;
		switch (_p0.ctor) {
			case 'HomeSection':
				if (_p0._0.ctor === 'StartTheGame') {
					return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) ? {ctor: '_Tuple2', _0: menu, _1: _w0rm$elm_mogee$Components_Menu$Start} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.down, keys) ? {
						ctor: '_Tuple2',
						_0: A2(
							_w0rm$elm_mogee$Components_Menu$choose,
							_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$GoToMenu),
							menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					} : {
						ctor: '_Tuple2',
						_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					});
				} else {
					return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) ? {
						ctor: '_Tuple2',
						_0: A2(
							_w0rm$elm_mogee$Components_Menu$goTo,
							_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$SoundOnOff),
							menu),
						_1: _w0rm$elm_mogee$Components_Menu$Action
					} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.up, keys) ? {
						ctor: '_Tuple2',
						_0: A2(
							_w0rm$elm_mogee$Components_Menu$choose,
							_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$StartTheGame),
							menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					} : {
						ctor: '_Tuple2',
						_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					});
				}
			case 'MenuSection':
				switch (_p0._0.ctor) {
					case 'SoundOnOff':
						return (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) || (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.left, keys) || A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.right, keys))) ? {
							ctor: '_Tuple2',
							_0: menu,
							_1: _w0rm$elm_mogee$Components_Menu$ToggleSound(!sound)
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.down, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$choose,
								_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$GoToCredits),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$goTo,
								_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$StartTheGame),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Action
						} : {
							ctor: '_Tuple2',
							_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						}));
					case 'GoToCredits':
						return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) ? {
							ctor: '_Tuple2',
							_0: A2(_w0rm$elm_mogee$Components_Menu$goTo, _w0rm$elm_mogee$Components_Menu$CreditsSection, menu),
							_1: _w0rm$elm_mogee$Components_Menu$Action
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.up, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$choose,
								_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$SoundOnOff),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.down, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$choose,
								_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$GoToSlides),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$goTo,
								_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$StartTheGame),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Action
						} : {
							ctor: '_Tuple2',
							_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						})));
					default:
						return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) ? {
							ctor: '_Tuple2',
							_0: A2(_w0rm$elm_mogee$Components_Menu$goTo, _w0rm$elm_mogee$Components_Menu$SlidesSection, menu),
							_1: _w0rm$elm_mogee$Components_Menu$Action
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.up, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$choose,
								_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$GoToCredits),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {
							ctor: '_Tuple2',
							_0: A2(
								_w0rm$elm_mogee$Components_Menu$goTo,
								_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$StartTheGame),
								menu),
							_1: _w0rm$elm_mogee$Components_Menu$Action
						} : {
							ctor: '_Tuple2',
							_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
							_1: _w0rm$elm_mogee$Components_Menu$Noop
						}));
				}
			case 'CreditsSection':
				return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {
					ctor: '_Tuple2',
					_0: A2(
						_w0rm$elm_mogee$Components_Menu$goTo,
						_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$GoToCredits),
						menu),
					_1: _w0rm$elm_mogee$Components_Menu$Action
				} : {
					ctor: '_Tuple2',
					_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
					_1: _w0rm$elm_mogee$Components_Menu$Noop
				};
			case 'SlidesSection':
				return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {
					ctor: '_Tuple2',
					_0: A2(
						_w0rm$elm_mogee$Components_Menu$goTo,
						_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$GoToSlides),
						menu),
					_1: _w0rm$elm_mogee$Components_Menu$Action
				} : {
					ctor: '_Tuple2',
					_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
					_1: _w0rm$elm_mogee$Components_Menu$Noop
				};
			default:
				if (_p0._0.ctor === 'ResumeGame') {
					return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) ? {ctor: '_Tuple2', _0: menu, _1: _w0rm$elm_mogee$Components_Menu$Resume} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.down, keys) ? {
						ctor: '_Tuple2',
						_0: A2(
							_w0rm$elm_mogee$Components_Menu$choose,
							_w0rm$elm_mogee$Components_Menu$PauseSection(_w0rm$elm_mogee$Components_Menu$EndGame),
							menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {ctor: '_Tuple2', _0: menu, _1: _w0rm$elm_mogee$Components_Menu$Resume} : {
						ctor: '_Tuple2',
						_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					}));
				} else {
					return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, keys) ? {ctor: '_Tuple2', _0: menu, _1: _w0rm$elm_mogee$Components_Menu$End} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.up, keys) ? {
						ctor: '_Tuple2',
						_0: A2(
							_w0rm$elm_mogee$Components_Menu$choose,
							_w0rm$elm_mogee$Components_Menu$PauseSection(_w0rm$elm_mogee$Components_Menu$ResumeGame),
							menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					} : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, keys) ? {ctor: '_Tuple2', _0: menu, _1: _w0rm$elm_mogee$Components_Menu$Resume} : {
						ctor: '_Tuple2',
						_0: A2(_w0rm$elm_mogee$Components_Menu$tick, elapsed, menu),
						_1: _w0rm$elm_mogee$Components_Menu$Noop
					}));
				}
		}
	});

var _w0rm$elm_mogee$Messages$FontLoaded = function (a) {
	return {ctor: 'FontLoaded', _0: a};
};
var _w0rm$elm_mogee$Messages$SpriteLoaded = function (a) {
	return {ctor: 'SpriteLoaded', _0: a};
};
var _w0rm$elm_mogee$Messages$TextureLoaded = function (a) {
	return {ctor: 'TextureLoaded', _0: a};
};
var _w0rm$elm_mogee$Messages$VisibilityChange = function (a) {
	return {ctor: 'VisibilityChange', _0: a};
};
var _w0rm$elm_mogee$Messages$KeyChange = F2(
	function (a, b) {
		return {ctor: 'KeyChange', _0: a, _1: b};
	});
var _w0rm$elm_mogee$Messages$Animate = function (a) {
	return {ctor: 'Animate', _0: a};
};
var _w0rm$elm_mogee$Messages$Resize = function (a) {
	return {ctor: 'Resize', _0: a};
};

var _w0rm$elm_mogee$Systems_Screens$activate = F2(
	function (screens, screen) {
		return A2(
			_elm_lang$core$List$all,
			function (_p0) {
				var _p1 = _p0;
				return !_elm_lang$core$Native_Utils.eq(_p1.number, screen.number - 1);
			},
			screens) ? _w0rm$elm_mogee$Components_Screen$activate(screen) : screen;
	});
var _w0rm$elm_mogee$Systems_Screens$shrink = F3(
	function (dt, _p2, transform) {
		var _p3 = _p2;
		var _p6 = _p3.velocity;
		var _p4 = transform;
		var x = _p4.x;
		var y = _p4.y;
		var width = _p4.width;
		var height = _p4.height;
		var newW = A2(_elm_lang$core$Basics$max, 0, width - (dt * _p6));
		var newH = A2(_elm_lang$core$Basics$max, 0, height - (dt * _p6));
		if ((!_elm_lang$core$Native_Utils.eq(_p3.state, _w0rm$elm_mogee$Components_Screen$Moving)) || (_elm_lang$core$Native_Utils.eq(width, 0) || _elm_lang$core$Native_Utils.eq(height, 0))) {
			return transform;
		} else {
			var _p5 = _p3.to;
			switch (_p5.ctor) {
				case 'Left':
					return _elm_lang$core$Native_Utils.update(
						transform,
						{width: newW});
				case 'Right':
					return _elm_lang$core$Native_Utils.update(
						transform,
						{width: newW, x: (x - newW) + width});
				case 'Top':
					return _elm_lang$core$Native_Utils.update(
						transform,
						{height: newH});
				default:
					return _elm_lang$core$Native_Utils.update(
						transform,
						{height: newH, y: (y - newH) + height});
			}
		}
	});
var _w0rm$elm_mogee$Systems_Screens$update = F2(
	function (elapsed, components) {
		return A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F4(
				function (uid, screen, transform, components) {
					if (_elm_lang$core$Native_Utils.eq(transform.width, 0) || _elm_lang$core$Native_Utils.eq(transform.height, 0)) {
						return A2(_w0rm$elm_mogee$Components_Components$delete, uid, components);
					} else {
						var newScreen = A2(
							_w0rm$elm_mogee$Systems_Screens$activate,
							_elm_lang$core$Dict$values(components.screens),
							A2(_w0rm$elm_mogee$Components_Screen$update, elapsed, screen));
						var newTransform = A3(_w0rm$elm_mogee$Systems_Screens$shrink, elapsed, newScreen, transform);
						return _elm_lang$core$Native_Utils.update(
							components,
							{
								screens: A3(_elm_lang$core$Dict$insert, uid, newScreen, components.screens),
								transforms: A3(_elm_lang$core$Dict$insert, uid, newTransform, components.transforms)
							});
					}
				}),
			components,
			components.screens,
			components.transforms);
	});
var _w0rm$elm_mogee$Systems_Screens$offsetScreens = F2(
	function (direction, components) {
		return _elm_lang$core$Native_Utils.update(
			components,
			{
				transforms: A2(
					_elm_lang$core$Dict$map,
					_elm_lang$core$Basics$always(
						A2(
							_w0rm$elm_mogee$Components_Transform$offset,
							{ctor: '_Tuple2', _0: _w0rm$elm_mogee$Components_Screen$size, _1: _w0rm$elm_mogee$Components_Screen$size},
							direction)),
					components.transforms)
			});
	});
var _w0rm$elm_mogee$Systems_Screens$run = F3(
	function (elapsed, components, screens) {
		var _p7 = A2(
			_elm_lang$core$Random$step,
			_w0rm$elm_mogee$Components_Direction$next(screens.direction),
			screens.seed);
		var direction = _p7._0;
		var seed = _p7._1;
		var newComponents = A2(_w0rm$elm_mogee$Systems_Screens$update, elapsed, components);
		var _p8 = _w0rm$elm_mogee$Components_Components$mogeeOffset(newComponents);
		var x = _p8.x;
		var y = _p8.y;
		var screenX = (x - 32) + (_w0rm$elm_mogee$Components_Mogee$width / 2);
		var screenY = (y - 32) + (_w0rm$elm_mogee$Components_Mogee$height / 2);
		return ((_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$Basics$abs(screenX),
			64) < 0) && (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$Basics$abs(screenY),
			64) < 0)) ? {
			ctor: '_Tuple2',
			_0: A4(
				_w0rm$elm_mogee$Components_Components$addScreen,
				screens.direction,
				direction,
				screens.number + 1,
				A2(
					_w0rm$elm_mogee$Systems_Screens$offsetScreens,
					_w0rm$elm_mogee$Components_Direction$opposite(screens.direction),
					newComponents)),
			_1: _elm_lang$core$Native_Utils.update(
				screens,
				{direction: direction, seed: seed, number: screens.number + 1})
		} : {ctor: '_Tuple2', _0: newComponents, _1: screens};
	});
var _w0rm$elm_mogee$Systems_Screens$screens = {
	number: 0,
	direction: _w0rm$elm_mogee$Components_Direction$Right,
	seed: _elm_lang$core$Random$initialSeed(0)
};
var _w0rm$elm_mogee$Systems_Screens$Screens = F3(
	function (a, b, c) {
		return {number: a, direction: b, seed: c};
	});

var _w0rm$elm_mogee$Systems_CurrentScore$run = F2(
	function (components, currentScore) {
		var collidesWithMogee = A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F4(
				function (_p2, _p1, transform, _p0) {
					return _w0rm$elm_mogee$Components_Transform$collide(transform);
				}),
			_elm_lang$core$Basics$always(false),
			components.mogees,
			components.transforms);
		return A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F4(
				function (_p4, _p3, transform, score) {
					var _p5 = _p3;
					return collidesWithMogee(transform) ? A2(_elm_lang$core$Basics$max, score, _p5.number) : score;
				}),
			currentScore,
			components.screens,
			components.transforms);
	});
var _w0rm$elm_mogee$Systems_CurrentScore$currentScore = 0;

var _w0rm$elm_mogee$Systems_Mogee$walkVelocity = 4.5e-2;
var _w0rm$elm_mogee$Systems_Mogee$jumpVelocity = 9.0e-2;
var _w0rm$elm_mogee$Systems_Mogee$friction = 2.25e-3;
var _w0rm$elm_mogee$Systems_Mogee$moveX = F5(
	function (dt, dx, wallsTransforms, originalTransform, originalVelocity) {
		var _p0 = originalVelocity;
		var vx = _p0.vx;
		var newVelocity = _elm_lang$core$Native_Utils.eq(dx, 0) ? ((!_elm_lang$core$Native_Utils.eq(vx, 0)) ? ((vx / _elm_lang$core$Basics$abs(vx)) * A2(
			_elm_lang$core$Basics$max,
			_elm_lang$core$Basics$abs(vx) - (_w0rm$elm_mogee$Systems_Mogee$friction * dt),
			0)) : 0) : (dx * _w0rm$elm_mogee$Systems_Mogee$walkVelocity);
		var deltaX = (dt * (vx + newVelocity)) * 0.5;
		var x = (_elm_lang$core$Native_Utils.eq(dx, 0) && _elm_lang$core$Native_Utils.eq(deltaX, 0)) ? _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Basics$round(originalTransform.x)) : originalTransform.x;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (wall, _p1) {
					var _p2 = _p1;
					var _p4 = _p2._1;
					var _p3 = _p2._0;
					return A2(_w0rm$elm_mogee$Components_Transform$collide, _p3, wall) ? ((_elm_lang$core$Native_Utils.cmp(_p3.x - originalTransform.x, 0) < 0) ? {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							_p3,
							{x: wall.x + wall.width}),
						_1: _elm_lang$core$Native_Utils.update(
							_p4,
							{vx: 0})
					} : {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							_p3,
							{x: wall.x - _p3.width}),
						_1: _elm_lang$core$Native_Utils.update(
							_p4,
							{vx: 0})
					}) : {ctor: '_Tuple2', _0: _p3, _1: _p4};
				}),
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					originalTransform,
					{x: x + deltaX}),
				_1: _elm_lang$core$Native_Utils.update(
					originalVelocity,
					{vx: newVelocity})
			},
			wallsTransforms);
	});
var _w0rm$elm_mogee$Systems_Mogee$gravity = 2.25e-4;
var _w0rm$elm_mogee$Systems_Mogee$moveY = F5(
	function (dt, dy, wallsTransforms, originalTransform, originalVelocity) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (wall, _p5) {
					var _p6 = _p5;
					var _p9 = _p6._1;
					var _p8 = _p6._0;
					var _p7 = _p6._2;
					return A2(_w0rm$elm_mogee$Components_Transform$collide, _p8, wall) ? ((_elm_lang$core$Native_Utils.cmp(_p8.y - originalTransform.y, 0) < 0) ? {
						ctor: '_Tuple3',
						_0: _elm_lang$core$Native_Utils.update(
							_p8,
							{y: wall.y + wall.height}),
						_1: _elm_lang$core$Native_Utils.update(
							_p9,
							{vy: 0}),
						_2: (_elm_lang$core$Native_Utils.cmp(_p9.vy, -5.0e-2) < 0) ? _elm_lang$core$Maybe$Just('wall') : _p7
					} : {
						ctor: '_Tuple3',
						_0: _elm_lang$core$Native_Utils.update(
							_p8,
							{y: wall.y - _p8.height}),
						_1: _elm_lang$core$Native_Utils.update(
							_p9,
							{
								vy: _elm_lang$core$Native_Utils.eq(dy, 1) ? (0 - _w0rm$elm_mogee$Systems_Mogee$jumpVelocity) : 0
							}),
						_2: _elm_lang$core$Native_Utils.eq(dy, 1) ? _elm_lang$core$Maybe$Just('jump') : ((_elm_lang$core$Native_Utils.cmp(_p9.vy, 5.0e-2) > 0) ? _elm_lang$core$Maybe$Just('wall') : _elm_lang$core$Maybe$Nothing)
					}) : {ctor: '_Tuple3', _0: _p8, _1: _p9, _2: _p7};
				}),
			{
				ctor: '_Tuple3',
				_0: _elm_lang$core$Native_Utils.update(
					originalTransform,
					{y: (originalTransform.y + (originalVelocity.vy * dt)) + (((_w0rm$elm_mogee$Systems_Mogee$gravity * dt) * dt) * 0.5)}),
				_1: _elm_lang$core$Native_Utils.update(
					originalVelocity,
					{vy: originalVelocity.vy + (_w0rm$elm_mogee$Systems_Mogee$gravity * dt)}),
				_2: _elm_lang$core$Maybe$Nothing
			},
			wallsTransforms);
	});
var _w0rm$elm_mogee$Systems_Mogee$run = F3(
	function (elapsed, _p10, components) {
		var _p11 = _p10;
		var _p21 = _p11.x;
		var screensTransforms = A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F4(
				function (_p13, _p12, x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			{ctor: '[]'},
			components.screens,
			components.transforms);
		var wallsTransforms = A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F4(
				function (_p15, _p14, x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			{ctor: '[]'},
			components.walls,
			components.transforms);
		return A5(
			_w0rm$elm_mogee$Components_Components$foldl3,
			F5(
				function (uid, mogee, transform, velocity, _p16) {
					var _p17 = _p16;
					var _p20 = _p17._0;
					var newMogee = A2(
						_elm_lang$core$List$any,
						_w0rm$elm_mogee$Components_Transform$collide(transform),
						screensTransforms) ? A3(_w0rm$elm_mogee$Components_Mogee$update, elapsed, _p21, mogee) : _w0rm$elm_mogee$Components_Mogee$die(mogee);
					var _p18 = A5(_w0rm$elm_mogee$Systems_Mogee$moveY, elapsed, _p11.y, wallsTransforms, transform, velocity);
					var newYTransform = _p18._0;
					var newYVelocity = _p18._1;
					var newSound = _p18._2;
					var _p19 = A5(_w0rm$elm_mogee$Systems_Mogee$moveX, elapsed, _p21, wallsTransforms, newYTransform, newYVelocity);
					var newTransform = _p19._0;
					var newVelocity = _p19._1;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							_p20,
							{
								transforms: A3(_elm_lang$core$Dict$insert, uid, newTransform, _p20.transforms),
								velocities: A3(_elm_lang$core$Dict$insert, uid, newVelocity, _p20.velocities),
								mogees: A3(_elm_lang$core$Dict$insert, uid, newMogee, _p20.mogees)
							}),
						_1: _elm_lang$core$Native_Utils.eq(newSound, _elm_lang$core$Maybe$Nothing) ? _p17._1 : newSound
					};
				}),
			{ctor: '_Tuple2', _0: components, _1: _elm_lang$core$Maybe$Nothing},
			components.mogees,
			components.transforms,
			components.velocities);
	});

var _w0rm$elm_mogee$Systems_Walls$run = function (components) {
	var screensTransforms = A4(
		_w0rm$elm_mogee$Components_Components$foldl2,
		F4(
			function (_p1, _p0, x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		components.screens,
		components.transforms);
	return A4(
		_w0rm$elm_mogee$Components_Components$foldl2,
		F4(
			function (uid, _p2, transform, components) {
				return A2(
					_elm_lang$core$List$any,
					_w0rm$elm_mogee$Components_Transform$collide(transform),
					screensTransforms) ? components : A2(_w0rm$elm_mogee$Components_Components$delete, uid, components);
			}),
		components,
		components.walls,
		components.transforms);
};

var _w0rm$elm_mogee$Systems_Systems$run = F4(
	function (elapsed, keys, components, _p0) {
		var _p1 = _p0;
		var _p2 = A3(_w0rm$elm_mogee$Systems_Screens$run, elapsed, components, _p1.screens);
		var components1 = _p2._0;
		var newScreens = _p2._1;
		var _p3 = A3(
			_w0rm$elm_mogee$Systems_Mogee$run,
			elapsed,
			keys,
			_w0rm$elm_mogee$Systems_Walls$run(components1));
		var components2 = _p3._0;
		var sound = _p3._1;
		return {
			ctor: '_Tuple3',
			_0: components2,
			_1: {
				screens: newScreens,
				currentScore: A2(_w0rm$elm_mogee$Systems_CurrentScore$run, components2, _p1.currentScore)
			},
			_2: sound
		};
	});
var _w0rm$elm_mogee$Systems_Systems$initial = {screens: _w0rm$elm_mogee$Systems_Screens$screens, currentScore: _w0rm$elm_mogee$Systems_CurrentScore$currentScore};
var _w0rm$elm_mogee$Systems_Systems$Systems = F2(
	function (a, b) {
		return {screens: a, currentScore: b};
	});

var _w0rm$elm_mogee$View_FontData$fontSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABAAQAAAAD6rULSAAAB2ElEQVR4nO2Rz0vTcRzGX5/PRnyRLdYvWKC0qEmHqMSihH7YyWQQkpGHICIKDxUdNggi2yiiQwSyTrLoYAdhxZxFDYpypIFB9AMlNoKpJCxbNhk2v1t99+4wFAZBf0C9bs9zej08DOZlMi8/ZQm2v0qn74sZaLPRJnIgq31zVkM9VlNnpHQU6Qvo4s1pZkIUNmRh4YO02uvCUXPUZXoedPbkhrKlC/biwMm0s+97++2DgZX2/ee/qPKzwpiLE6nGF2vr1nUnhgjeSj2Ri3fZ1L/N6X937jgyKUVZrDoEZVEQkZLkRUSkImKKEmrRNSkJuF0bbzT7D40l10daki3BYfth/B8hd9aWfEn9vc9ohR0zBgY0ZNS+CR0vN4fmm7B6wW26bGHdseJ1yKWsq1tgdhRLa4FfhsemWkmcNg1V0Y+ijnQPbnfKGaGA2rwkZhqAiF4WMwC4DEgNI3/YMrVrYmc5caea5nshk4vlLfkkInkR6RL98NiRNb7EY+/ImXCjt5+MfhqNDkyHlPfU7m/gkLfarGrA6r3ssK690Q5QcQxo9/DeuhLQMyBToBbGu+euX6JAJRf76isOy3MRsQa7RAOrPMtae9DA7NbxJAA/4h385Yb/xb9V/AaUFO7xBr5E0AAAAABJRU5ErkJggg==';
var _w0rm$elm_mogee$View_FontData$CharInfo = F3(
	function (a, b, c) {
		return {x: a, y: b, w: c};
	});
var _w0rm$elm_mogee$View_FontData$font = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: '!',
			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 0, 0, 1)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '\"',
				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 1, 0, 3)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: '#',
					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 4, 0, 5)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: '$',
						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 9, 0, 4)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: '%',
							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 13, 0, 7)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: '&',
								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 20, 0, 6)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: '\'',
									_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 26, 0, 1)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: '(',
										_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 27, 0, 3)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: ')',
											_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 30, 0, 3)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: '*',
												_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 33, 0, 5)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: '+',
													_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 38, 0, 5)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: ',',
														_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 43, 0, 2)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: '-',
															_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 45, 0, 4)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: '.',
																_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 49, 0, 1)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: '/',
																	_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 50, 0, 4)
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: '0',
																		_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 54, 0, 4)
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: '1',
																			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 58, 0, 4)
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: '2',
																				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 62, 0, 4)
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: '3',
																					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 66, 0, 4)
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: '4',
																						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 70, 0, 4)
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: '5',
																							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 74, 0, 4)
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: '6',
																								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 78, 0, 4)
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: '7',
																									_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 82, 0, 4)
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: '8',
																										_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 86, 0, 4)
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: '9',
																											_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 90, 0, 4)
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: ':',
																												_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 94, 0, 1)
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: ';',
																													_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 95, 0, 2)
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: '<',
																														_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 97, 0, 5)
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: '=',
																															_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 102, 0, 4)
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: '>',
																																_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 106, 0, 5)
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: '?',
																																	_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 111, 0, 4)
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: '@',
																																		_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 115, 0, 7)
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: 'A',
																																			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 122, 0, 4)
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				ctor: '_Tuple2',
																																				_0: 'B',
																																				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 0, 11, 4)
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					ctor: '_Tuple2',
																																					_0: 'C',
																																					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 4, 11, 4)
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						ctor: '_Tuple2',
																																						_0: 'D',
																																						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 8, 11, 4)
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							ctor: '_Tuple2',
																																							_0: 'E',
																																							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 12, 11, 3)
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								ctor: '_Tuple2',
																																								_0: 'F',
																																								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 15, 11, 3)
																																							},
																																							_1: {
																																								ctor: '::',
																																								_0: {
																																									ctor: '_Tuple2',
																																									_0: 'G',
																																									_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 18, 11, 4)
																																								},
																																								_1: {
																																									ctor: '::',
																																									_0: {
																																										ctor: '_Tuple2',
																																										_0: 'H',
																																										_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 22, 11, 4)
																																									},
																																									_1: {
																																										ctor: '::',
																																										_0: {
																																											ctor: '_Tuple2',
																																											_0: 'I',
																																											_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 26, 11, 3)
																																										},
																																										_1: {
																																											ctor: '::',
																																											_0: {
																																												ctor: '_Tuple2',
																																												_0: 'J',
																																												_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 29, 11, 4)
																																											},
																																											_1: {
																																												ctor: '::',
																																												_0: {
																																													ctor: '_Tuple2',
																																													_0: 'K',
																																													_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 33, 11, 4)
																																												},
																																												_1: {
																																													ctor: '::',
																																													_0: {
																																														ctor: '_Tuple2',
																																														_0: 'L',
																																														_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 37, 11, 3)
																																													},
																																													_1: {
																																														ctor: '::',
																																														_0: {
																																															ctor: '_Tuple2',
																																															_0: 'M',
																																															_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 40, 11, 5)
																																														},
																																														_1: {
																																															ctor: '::',
																																															_0: {
																																																ctor: '_Tuple2',
																																																_0: 'N',
																																																_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 45, 11, 4)
																																															},
																																															_1: {
																																																ctor: '::',
																																																_0: {
																																																	ctor: '_Tuple2',
																																																	_0: 'O',
																																																	_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 49, 11, 4)
																																																},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {
																																																		ctor: '_Tuple2',
																																																		_0: 'P',
																																																		_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 53, 11, 4)
																																																	},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {
																																																			ctor: '_Tuple2',
																																																			_0: 'Q',
																																																			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 57, 11, 4)
																																																		},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {
																																																				ctor: '_Tuple2',
																																																				_0: 'R',
																																																				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 61, 11, 4)
																																																			},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {
																																																					ctor: '_Tuple2',
																																																					_0: 'S',
																																																					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 65, 11, 4)
																																																				},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {
																																																						ctor: '_Tuple2',
																																																						_0: 'T',
																																																						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 69, 11, 5)
																																																					},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {
																																																							ctor: '_Tuple2',
																																																							_0: 'U',
																																																							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 74, 11, 4)
																																																						},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {
																																																								ctor: '_Tuple2',
																																																								_0: 'V',
																																																								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 78, 11, 4)
																																																							},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {
																																																									ctor: '_Tuple2',
																																																									_0: 'W',
																																																									_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 82, 11, 7)
																																																								},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {
																																																										ctor: '_Tuple2',
																																																										_0: 'X',
																																																										_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 89, 11, 5)
																																																									},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {
																																																											ctor: '_Tuple2',
																																																											_0: 'Y',
																																																											_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 94, 11, 5)
																																																										},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {
																																																												ctor: '_Tuple2',
																																																												_0: 'Z',
																																																												_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 99, 11, 4)
																																																											},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {
																																																													ctor: '_Tuple2',
																																																													_0: '[',
																																																													_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 103, 11, 2)
																																																												},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {
																																																														ctor: '_Tuple2',
																																																														_0: '\\',
																																																														_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 105, 11, 4)
																																																													},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {
																																																															ctor: '_Tuple2',
																																																															_0: ']',
																																																															_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 109, 11, 2)
																																																														},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {
																																																																ctor: '_Tuple2',
																																																																_0: '^',
																																																																_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 111, 11, 3)
																																																															},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {
																																																																	ctor: '_Tuple2',
																																																																	_0: '_',
																																																																	_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 114, 11, 4)
																																																																},
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: {
																																																																		ctor: '_Tuple2',
																																																																		_0: 'a',
																																																																		_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 118, 11, 3)
																																																																	},
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: {
																																																																			ctor: '_Tuple2',
																																																																			_0: 'b',
																																																																			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 121, 11, 3)
																																																																		},
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: {
																																																																				ctor: '_Tuple2',
																																																																				_0: 'c',
																																																																				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 124, 11, 3)
																																																																			},
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: {
																																																																					ctor: '_Tuple2',
																																																																					_0: 'd',
																																																																					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 0, 22, 3)
																																																																				},
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: {
																																																																						ctor: '_Tuple2',
																																																																						_0: 'e',
																																																																						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 3, 22, 3)
																																																																					},
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: {
																																																																							ctor: '_Tuple2',
																																																																							_0: 'f',
																																																																							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 6, 22, 4)
																																																																						},
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: {
																																																																								ctor: '_Tuple2',
																																																																								_0: 'ff',
																																																																								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 10, 22, 6)
																																																																							},
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: {
																																																																									ctor: '_Tuple2',
																																																																									_0: 'ffi',
																																																																									_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 16, 22, 6)
																																																																								},
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: {
																																																																										ctor: '_Tuple2',
																																																																										_0: 'fi',
																																																																										_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 22, 22, 4)
																																																																									},
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: {
																																																																											ctor: '_Tuple2',
																																																																											_0: 'fj',
																																																																											_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 26, 22, 4)
																																																																										},
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: {
																																																																												ctor: '_Tuple2',
																																																																												_0: 'g',
																																																																												_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 30, 22, 3)
																																																																											},
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: {
																																																																													ctor: '_Tuple2',
																																																																													_0: 'gj',
																																																																													_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 33, 22, 5)
																																																																												},
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: {
																																																																														ctor: '_Tuple2',
																																																																														_0: 'h',
																																																																														_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 38, 22, 3)
																																																																													},
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: {
																																																																															ctor: '_Tuple2',
																																																																															_0: 'i',
																																																																															_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 41, 22, 1)
																																																																														},
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: {
																																																																																ctor: '_Tuple2',
																																																																																_0: 'j',
																																																																																_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 42, 22, 3)
																																																																															},
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: {
																																																																																	ctor: '_Tuple2',
																																																																																	_0: 'jj',
																																																																																	_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 45, 22, 5)
																																																																																},
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: {
																																																																																		ctor: '_Tuple2',
																																																																																		_0: 'k',
																																																																																		_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 50, 22, 3)
																																																																																	},
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: {
																																																																																			ctor: '_Tuple2',
																																																																																			_0: 'l',
																																																																																			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 53, 22, 1)
																																																																																		},
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: {
																																																																																				ctor: '_Tuple2',
																																																																																				_0: 'm',
																																																																																				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 54, 22, 5)
																																																																																			},
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: {
																																																																																					ctor: '_Tuple2',
																																																																																					_0: 'n',
																																																																																					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 59, 22, 3)
																																																																																				},
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: {
																																																																																						ctor: '_Tuple2',
																																																																																						_0: 'o',
																																																																																						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 62, 22, 3)
																																																																																					},
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: {
																																																																																							ctor: '_Tuple2',
																																																																																							_0: 'p',
																																																																																							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 65, 22, 3)
																																																																																						},
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: {
																																																																																								ctor: '_Tuple2',
																																																																																								_0: 'q',
																																																																																								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 68, 22, 3)
																																																																																							},
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: {
																																																																																									ctor: '_Tuple2',
																																																																																									_0: 'r',
																																																																																									_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 71, 22, 3)
																																																																																								},
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: {
																																																																																										ctor: '_Tuple2',
																																																																																										_0: 's',
																																																																																										_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 74, 22, 3)
																																																																																									},
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: {
																																																																																											ctor: '_Tuple2',
																																																																																											_0: 'ss',
																																																																																											_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 77, 22, 6)
																																																																																										},
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: {
																																																																																												ctor: '_Tuple2',
																																																																																												_0: 't',
																																																																																												_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 83, 22, 3)
																																																																																											},
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: {
																																																																																													ctor: '_Tuple2',
																																																																																													_0: 'u',
																																																																																													_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 86, 22, 3)
																																																																																												},
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: {
																																																																																														ctor: '_Tuple2',
																																																																																														_0: 'v',
																																																																																														_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 89, 22, 3)
																																																																																													},
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: {
																																																																																															ctor: '_Tuple2',
																																																																																															_0: 'w',
																																																																																															_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 92, 22, 5)
																																																																																														},
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: {
																																																																																																ctor: '_Tuple2',
																																																																																																_0: 'x',
																																																																																																_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 97, 22, 3)
																																																																																															},
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: {
																																																																																																	ctor: '_Tuple2',
																																																																																																	_0: 'y',
																																																																																																	_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 100, 22, 3)
																																																																																																},
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: {
																																																																																																		ctor: '_Tuple2',
																																																																																																		_0: 'yj',
																																																																																																		_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 103, 22, 5)
																																																																																																	},
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: {
																																																																																																			ctor: '_Tuple2',
																																																																																																			_0: 'z',
																																																																																																			_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 108, 22, 3)
																																																																																																		},
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: {
																																																																																																				ctor: '_Tuple2',
																																																																																																				_0: '{',
																																																																																																				_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 111, 22, 3)
																																																																																																			},
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: {
																																																																																																					ctor: '_Tuple2',
																																																																																																					_0: '|',
																																																																																																					_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 114, 22, 1)
																																																																																																				},
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: {
																																																																																																						ctor: '_Tuple2',
																																																																																																						_0: '}',
																																																																																																						_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 115, 22, 3)
																																																																																																					},
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: {
																																																																																																							ctor: '_Tuple2',
																																																																																																							_0: '~',
																																																																																																							_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 118, 22, 4)
																																																																																																						},
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: {
																																																																																																								ctor: '_Tuple2',
																																																																																																								_0: '×',
																																																																																																								_1: A3(_w0rm$elm_mogee$View_FontData$CharInfo, 122, 22, 5)
																																																																																																							},
																																																																																																							_1: {ctor: '[]'}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});

var _w0rm$elm_mogee$View_Font$texturedFragmentShader = {'src': '\n\n        precision mediump float;\n        uniform sampler2D texture;\n        uniform vec3 color;\n        varying vec2 texturePos;\n\n        void main () {\n            vec4 textureColor = texture2D(texture, texturePos);\n            gl_FragColor = vec4(color, 1.0);\n            if (dot(textureColor, textureColor) == 4.0) discard;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Font$texturedVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        attribute vec2 texPosition;\n        uniform vec2 textureSize;\n        uniform vec3 offset;\n        varying vec2 texturePos;\n\n        void main () {\n            vec2 clipSpace = position + offset.xy - 32.0;\n            gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n            texturePos = texPosition / textureSize;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Font$takeLigature = F2(
	function (n, st) {
		var ligature = A2(_elm_lang$core$String$left, n, st);
		return (_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(ligature),
			n) && A2(_elm_lang$core$Dict$member, ligature, _w0rm$elm_mogee$View_FontData$font)) ? _elm_lang$core$Maybe$Just(
			{
				ctor: '_Tuple2',
				_0: ligature,
				_1: A2(_elm_lang$core$String$dropLeft, n, st)
			}) : _elm_lang$core$Maybe$Nothing;
	});
var _w0rm$elm_mogee$View_Font$replaceLigatures = F2(
	function (st, result) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			result,
			A2(
				_elm_lang$core$Maybe$map,
				function (_p0) {
					var _p1 = _p0;
					return A2(
						_w0rm$elm_mogee$View_Font$replaceLigatures,
						_p1._1,
						{ctor: '::', _0: _p1._0, _1: result});
				},
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						{
							ctor: '::',
							_0: A2(_w0rm$elm_mogee$View_Font$takeLigature, 3, st),
							_1: {
								ctor: '::',
								_0: A2(_w0rm$elm_mogee$View_Font$takeLigature, 2, st),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$core$Maybe$map,
										function (_p2) {
											var _p3 = _p2;
											return {
												ctor: '_Tuple2',
												_0: _elm_lang$core$String$fromChar(_p3._0),
												_1: _p3._1
											};
										},
										_elm_lang$core$String$uncons(st)),
									_1: {ctor: '[]'}
								}
							}
						}))));
	});
var _w0rm$elm_mogee$View_Font$render = F4(
	function (color, _p4, texture, offset) {
		var _p5 = _p4;
		return A4(
			_elm_community$webgl$WebGL$entity,
			_w0rm$elm_mogee$View_Font$texturedVertexShader,
			_w0rm$elm_mogee$View_Font$texturedFragmentShader,
			_p5._1,
			{
				offset: _elm_community$linear_algebra$Math_Vector3$fromTuple(offset),
				texture: texture,
				color: color,
				textureSize: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$first(
							_elm_community$webgl$WebGL_Texture$size(texture))),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$second(
							_elm_community$webgl$WebGL_Texture$size(texture))))
			});
	});
var _w0rm$elm_mogee$View_Font$load = function (msg) {
	return A2(
		_elm_lang$core$Task$attempt,
		msg,
		A2(
			_elm_community$webgl$WebGL_Texture$loadWith,
			_elm_lang$core$Native_Utils.update(
				_elm_community$webgl$WebGL_Texture$defaultOptions,
				{magnify: _elm_community$webgl$WebGL_Texture$nearest, minify: _elm_community$webgl$WebGL_Texture$nearest, flipY: false}),
			_w0rm$elm_mogee$View_FontData$fontSrc));
};
var _w0rm$elm_mogee$View_Font$defaultBearings = {ctor: '_Tuple2', _0: 0, _1: 1};
var _w0rm$elm_mogee$View_Font$bearingsDict = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'j',
			_1: {ctor: '_Tuple2', _0: -2, _1: 1}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'jj',
				_1: {ctor: '_Tuple2', _0: -2, _1: 1}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: ',',
					_1: {ctor: '_Tuple2', _0: 0, _1: 1}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: ';',
						_1: {ctor: '_Tuple2', _0: 0, _1: 1}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: ' ',
							_1: {ctor: '_Tuple2', _0: 0, _1: 0}
						},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	});
var _w0rm$elm_mogee$View_Font$rightBearing = function ($char) {
	return _elm_lang$core$Tuple$second(
		A2(
			_elm_lang$core$Maybe$withDefault,
			_w0rm$elm_mogee$View_Font$defaultBearings,
			A2(_elm_lang$core$Dict$get, $char, _w0rm$elm_mogee$View_Font$bearingsDict)));
};
var _w0rm$elm_mogee$View_Font$leftBearing = function ($char) {
	return _elm_lang$core$Tuple$first(
		A2(
			_elm_lang$core$Maybe$withDefault,
			_w0rm$elm_mogee$View_Font$defaultBearings,
			A2(_elm_lang$core$Dict$get, $char, _w0rm$elm_mogee$View_Font$bearingsDict)));
};
var _w0rm$elm_mogee$View_Font$kerningOverrides = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: '/', _1: '/'},
			_1: -2
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: '\\', _1: '\\'},
				_1: -2
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 'C', _1: 'f'},
					_1: -1
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 'I', _1: 'f'},
						_1: -1
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 'f', _1: 'T'},
							_1: -2
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 'q', _1: 'f'},
								_1: -1
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 'q', _1: 'fi'},
									_1: -1
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: 'q', _1: 'ffi'},
										_1: -1
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: {ctor: '_Tuple2', _0: 'q', _1: 'ff'},
											_1: -1
										},
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _w0rm$elm_mogee$View_Font$kerningDict = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 1, _1: 14},
			_1: -1
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 2, _1: 2},
				_1: -1
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 2, _1: 6},
					_1: 0
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: 2, _1: 14},
						_1: -1
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 14, _1: 2},
							_1: -1
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: 14, _1: 6},
								_1: -1
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 2, _1: 10},
									_1: -1
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: 2, _1: 13},
										_1: -1
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: {ctor: '_Tuple2', _0: 3, _1: 3},
											_1: -1
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: {ctor: '_Tuple2', _0: 3, _1: 7},
												_1: -1
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: {ctor: '_Tuple2', _0: 3, _1: 14},
													_1: -1
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: {ctor: '_Tuple2', _0: 4, _1: 2},
														_1: -2
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: {ctor: '_Tuple2', _0: 4, _1: 4},
															_1: -1
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: {ctor: '_Tuple2', _0: 4, _1: 6},
																_1: -1
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: {ctor: '_Tuple2', _0: 4, _1: 7},
																	_1: -1
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: {ctor: '_Tuple2', _0: 4, _1: 10},
																		_1: -1
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: {ctor: '_Tuple2', _0: 4, _1: 13},
																			_1: -2
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: {ctor: '_Tuple2', _0: 4, _1: 14},
																				_1: -2
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: {ctor: '_Tuple2', _0: 5, _1: 3},
																					_1: -1
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: {ctor: '_Tuple2', _0: 5, _1: 14},
																						_1: -1
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: {ctor: '_Tuple2', _0: 16, _1: 3},
																							_1: -1
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: {ctor: '_Tuple2', _0: 16, _1: 7},
																								_1: -1
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: {ctor: '_Tuple2', _0: 16, _1: 9},
																									_1: -1
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: {ctor: '_Tuple2', _0: 16, _1: 14},
																										_1: -1
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: {ctor: '_Tuple2', _0: 6, _1: 2},
																											_1: -2
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: {ctor: '_Tuple2', _0: 6, _1: 3},
																												_1: -1
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: {ctor: '_Tuple2', _0: 6, _1: 4},
																													_1: -1
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: {ctor: '_Tuple2', _0: 6, _1: 5},
																														_1: -1
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: {ctor: '_Tuple2', _0: 6, _1: 6},
																															_1: -1
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: {ctor: '_Tuple2', _0: 6, _1: 7},
																																_1: -2
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: {ctor: '_Tuple2', _0: 6, _1: 13},
																																	_1: -2
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: {ctor: '_Tuple2', _0: 6, _1: 14},
																																		_1: -2
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: {ctor: '_Tuple2', _0: 7, _1: 3},
																																			_1: -1
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				ctor: '_Tuple2',
																																				_0: {ctor: '_Tuple2', _0: 7, _1: 7},
																																				_1: 0
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					ctor: '_Tuple2',
																																					_0: {ctor: '_Tuple2', _0: 8, _1: 7},
																																					_1: 0
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						ctor: '_Tuple2',
																																						_0: {ctor: '_Tuple2', _0: 13, _1: 2},
																																						_1: -1
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							ctor: '_Tuple2',
																																							_0: {ctor: '_Tuple2', _0: 13, _1: 14},
																																							_1: -1
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								ctor: '_Tuple2',
																																								_0: {ctor: '_Tuple2', _0: 14, _1: 10},
																																								_1: -1
																																							},
																																							_1: {
																																								ctor: '::',
																																								_0: {
																																									ctor: '_Tuple2',
																																									_0: {ctor: '_Tuple2', _0: 14, _1: 14},
																																									_1: -1
																																								},
																																								_1: {
																																									ctor: '::',
																																									_0: {
																																										ctor: '_Tuple2',
																																										_0: {ctor: '_Tuple2', _0: 15, _1: 2},
																																										_1: -1
																																									},
																																									_1: {
																																										ctor: '::',
																																										_0: {
																																											ctor: '_Tuple2',
																																											_0: {ctor: '_Tuple2', _0: 15, _1: 13},
																																											_1: -1
																																										},
																																										_1: {
																																											ctor: '::',
																																											_0: {
																																												ctor: '_Tuple2',
																																												_0: {ctor: '_Tuple2', _0: 17, _1: 14},
																																												_1: -1
																																											},
																																											_1: {ctor: '[]'}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _w0rm$elm_mogee$View_Font$invertDict = A2(
	_elm_lang$core$List$foldl,
	F2(
		function (_p6, dict) {
			var _p7 = _p6;
			return A3(
				_elm_lang$core$List$foldl,
				function ($char) {
					return A2(_elm_lang$core$Dict$insert, $char, _p7._0);
				},
				dict,
				_p7._1);
		}),
	_elm_lang$core$Dict$empty);
var _w0rm$elm_mogee$View_Font$leftKerningClass = _w0rm$elm_mogee$View_Font$invertDict(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 1,
			_1: {
				ctor: '::',
				_0: 'A',
				_1: {
					ctor: '::',
					_0: 'B',
					_1: {
						ctor: '::',
						_0: 'C',
						_1: {
							ctor: '::',
							_0: 'D',
							_1: {
								ctor: '::',
								_0: 'E',
								_1: {
									ctor: '::',
									_0: 'G',
									_1: {
										ctor: '::',
										_0: 'H',
										_1: {
											ctor: '::',
											_0: 'I',
											_1: {
												ctor: '::',
												_0: 'J',
												_1: {
													ctor: '::',
													_0: 'K',
													_1: {
														ctor: '::',
														_0: 'M',
														_1: {
															ctor: '::',
															_0: 'N',
															_1: {
																ctor: '::',
																_0: 'O',
																_1: {
																	ctor: '::',
																	_0: 'Q',
																	_1: {
																		ctor: '::',
																		_0: 'R',
																		_1: {
																			ctor: '::',
																			_0: 'S',
																			_1: {
																				ctor: '::',
																				_0: 'U',
																				_1: {
																					ctor: '::',
																					_0: 'V',
																					_1: {
																						ctor: '::',
																						_0: 'W',
																						_1: {
																							ctor: '::',
																							_0: 'X',
																							_1: {
																								ctor: '::',
																								_0: 'Z',
																								_1: {
																									ctor: '::',
																									_0: 'l',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 2,
				_1: {
					ctor: '::',
					_0: 'F',
					_1: {
						ctor: '::',
						_0: 'P',
						_1: {ctor: '[]'}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 3,
					_1: {
						ctor: '::',
						_0: 'L',
						_1: {ctor: '[]'}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 4,
						_1: {
							ctor: '::',
							_0: 'T',
							_1: {ctor: '[]'}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 5,
							_1: {
								ctor: '::',
								_0: 'b',
								_1: {
									ctor: '::',
									_0: 'k',
									_1: {
										ctor: '::',
										_0: 'p',
										_1: {
											ctor: '::',
											_0: 's',
											_1: {
												ctor: '::',
												_0: 't',
												_1: {
													ctor: '::',
													_0: 'u',
													_1: {
														ctor: '::',
														_0: 'v',
														_1: {
															ctor: '::',
															_0: 'w',
															_1: {
																ctor: '::',
																_0: 'x',
																_1: {
																	ctor: '::',
																	_0: 'z',
																	_1: {
																		ctor: '::',
																		_0: 'e',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 6,
								_1: {
									ctor: '::',
									_0: 'f',
									_1: {
										ctor: '::',
										_0: 'ff',
										_1: {ctor: '[]'}
									}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 7,
									_1: {
										ctor: '::',
										_0: 'g',
										_1: {
											ctor: '::',
											_0: 'q',
											_1: {
												ctor: '::',
												_0: 'y',
												_1: {ctor: '[]'}
											}
										}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 8,
										_1: {
											ctor: '::',
											_0: 'i',
											_1: {
												ctor: '::',
												_0: 'fi',
												_1: {
													ctor: '::',
													_0: 'ffi',
													_1: {ctor: '[]'}
												}
											}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 9,
											_1: {
												ctor: '::',
												_0: 'j',
												_1: {
													ctor: '::',
													_0: 'fj',
													_1: {
														ctor: '::',
														_0: 'jj',
														_1: {ctor: '[]'}
													}
												}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 10,
												_1: {
													ctor: '::',
													_0: '.',
													_1: {
														ctor: '::',
														_0: ',',
														_1: {ctor: '[]'}
													}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 11,
													_1: {
														ctor: '::',
														_0: '\'',
														_1: {
															ctor: '::',
															_0: '\"',
															_1: {ctor: '[]'}
														}
													}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 12,
														_1: {
															ctor: '::',
															_0: '!',
															_1: {
																ctor: '::',
																_0: '?',
																_1: {ctor: '[]'}
															}
														}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 13,
															_1: {
																ctor: '::',
																_0: '/',
																_1: {ctor: '[]'}
															}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 14,
																_1: {
																	ctor: '::',
																	_0: 'Y',
																	_1: {
																		ctor: '::',
																		_0: '7',
																		_1: {ctor: '[]'}
																	}
																}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 15,
																	_1: {
																		ctor: '::',
																		_0: '(',
																		_1: {
																			ctor: '::',
																			_0: '[',
																			_1: {ctor: '[]'}
																		}
																	}
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 16,
																		_1: {
																			ctor: '::',
																			_0: 'a',
																			_1: {
																				ctor: '::',
																				_0: 'c',
																				_1: {
																					ctor: '::',
																					_0: 'h',
																					_1: {
																						ctor: '::',
																						_0: 'm',
																						_1: {
																							ctor: '::',
																							_0: 'n',
																							_1: {
																								ctor: '::',
																								_0: 'o',
																								_1: {
																									ctor: '::',
																									_0: 'r',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 17,
																			_1: {
																				ctor: '::',
																				_0: '1',
																				_1: {
																					ctor: '::',
																					_0: '2',
																					_1: {
																						ctor: '::',
																						_0: '3',
																						_1: {
																							ctor: '::',
																							_0: '4',
																							_1: {
																								ctor: '::',
																								_0: '5',
																								_1: {
																									ctor: '::',
																									_0: '6',
																									_1: {
																										ctor: '::',
																										_0: '8',
																										_1: {
																											ctor: '::',
																											_0: '9',
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		},
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _w0rm$elm_mogee$View_Font$rightKerningClass = _w0rm$elm_mogee$View_Font$invertDict(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 1,
			_1: {
				ctor: '::',
				_0: 'A',
				_1: {
					ctor: '::',
					_0: 'B',
					_1: {
						ctor: '::',
						_0: 'C',
						_1: {
							ctor: '::',
							_0: 'D',
							_1: {
								ctor: '::',
								_0: 'E',
								_1: {
									ctor: '::',
									_0: 'F',
									_1: {
										ctor: '::',
										_0: 'G',
										_1: {
											ctor: '::',
											_0: 'H',
											_1: {
												ctor: '::',
												_0: 'I',
												_1: {
													ctor: '::',
													_0: 'K',
													_1: {
														ctor: '::',
														_0: 'L',
														_1: {
															ctor: '::',
															_0: 'M',
															_1: {
																ctor: '::',
																_0: 'N',
																_1: {
																	ctor: '::',
																	_0: 'O',
																	_1: {
																		ctor: '::',
																		_0: 'P',
																		_1: {
																			ctor: '::',
																			_0: 'Q',
																			_1: {
																				ctor: '::',
																				_0: 'R',
																				_1: {
																					ctor: '::',
																					_0: 'S',
																					_1: {
																						ctor: '::',
																						_0: 'U',
																						_1: {
																							ctor: '::',
																							_0: 'V',
																							_1: {
																								ctor: '::',
																								_0: 'W',
																								_1: {
																									ctor: '::',
																									_0: 'X',
																									_1: {
																										ctor: '::',
																										_0: 'Z',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 2,
				_1: {
					ctor: '::',
					_0: 'J',
					_1: {ctor: '[]'}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 3,
					_1: {
						ctor: '::',
						_0: 'T',
						_1: {
							ctor: '::',
							_0: 'Y',
							_1: {ctor: '[]'}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 4,
						_1: {
							ctor: '::',
							_0: 'a',
							_1: {
								ctor: '::',
								_0: 'c',
								_1: {
									ctor: '::',
									_0: 'm',
									_1: {
										ctor: '::',
										_0: 'n',
										_1: {
											ctor: '::',
											_0: 'o',
											_1: {
												ctor: '::',
												_0: 'q',
												_1: {
													ctor: '::',
													_0: 'r',
													_1: {
														ctor: '::',
														_0: 't',
														_1: {
															ctor: '::',
															_0: 'u',
															_1: {
																ctor: '::',
																_0: 'v',
																_1: {
																	ctor: '::',
																	_0: 'w',
																	_1: {
																		ctor: '::',
																		_0: 'x',
																		_1: {
																			ctor: '::',
																			_0: 'y',
																			_1: {
																				ctor: '::',
																				_0: 'z',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 5,
							_1: {
								ctor: '::',
								_0: 'b',
								_1: {
									ctor: '::',
									_0: 'h',
									_1: {
										ctor: '::',
										_0: 'i',
										_1: {
											ctor: '::',
											_0: 'k',
											_1: {
												ctor: '::',
												_0: 'l',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 6,
								_1: {
									ctor: '::',
									_0: 'e',
									_1: {
										ctor: '::',
										_0: 'd',
										_1: {
											ctor: '::',
											_0: 'g',
											_1: {
												ctor: '::',
												_0: 'p',
												_1: {
													ctor: '::',
													_0: 's',
													_1: {
														ctor: '::',
														_0: 'ss',
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 7,
									_1: {
										ctor: '::',
										_0: 'f',
										_1: {
											ctor: '::',
											_0: 'ff',
											_1: {
												ctor: '::',
												_0: 'fi',
												_1: {
													ctor: '::',
													_0: 'ffi',
													_1: {
														ctor: '::',
														_0: 'fj',
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 8,
										_1: {
											ctor: '::',
											_0: 'j',
											_1: {
												ctor: '::',
												_0: 'jj',
												_1: {ctor: '[]'}
											}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 9,
											_1: {
												ctor: '::',
												_0: '7',
												_1: {ctor: '[]'}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 10,
												_1: {
													ctor: '::',
													_0: '.',
													_1: {ctor: '[]'}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 11,
													_1: {
														ctor: '::',
														_0: '\'',
														_1: {
															ctor: '::',
															_0: '\"',
															_1: {ctor: '[]'}
														}
													}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 12,
														_1: {
															ctor: '::',
															_0: '!',
															_1: {
																ctor: '::',
																_0: '?',
																_1: {
																	ctor: '::',
																	_0: ':',
																	_1: {ctor: '[]'}
																}
															}
														}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 13,
															_1: {
																ctor: '::',
																_0: '/',
																_1: {ctor: '[]'}
															}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 14,
																_1: {
																	ctor: '::',
																	_0: ',',
																	_1: {
																		ctor: '::',
																		_0: ';',
																		_1: {ctor: '[]'}
																	}
																}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 15,
																	_1: {
																		ctor: '::',
																		_0: '$',
																		_1: {ctor: '[]'}
																	}
																},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _w0rm$elm_mogee$View_Font$kerning = F2(
	function (prevChar, nextChar) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			0,
			_elm_lang$core$List$head(
				A2(
					_elm_lang$core$List$filterMap,
					_elm_lang$core$Basics$identity,
					{
						ctor: '::',
						_0: A2(
							_elm_lang$core$Dict$get,
							{ctor: '_Tuple2', _0: prevChar, _1: nextChar},
							_w0rm$elm_mogee$View_Font$kerningOverrides),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$core$Maybe$andThen,
								_elm_lang$core$Basics$identity,
								A3(
									_elm_lang$core$Maybe$map2,
									_elm_lang$core$Basics$curry(
										A2(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, _w0rm$elm_mogee$View_Font$kerningDict)),
									A2(_elm_lang$core$Dict$get, prevChar, _w0rm$elm_mogee$View_Font$leftKerningClass),
									A2(_elm_lang$core$Dict$get, nextChar, _w0rm$elm_mogee$View_Font$rightKerningClass))),
							_1: {ctor: '[]'}
						}
					})));
	});
var _w0rm$elm_mogee$View_Font$letterSpacing = F2(
	function (prevChar, nextChar) {
		var _p8 = prevChar;
		if (_p8.ctor === 'Nothing') {
			return _w0rm$elm_mogee$View_Font$leftBearing(nextChar);
		} else {
			switch (_p8._0) {
				case ' ':
					return _w0rm$elm_mogee$View_Font$leftBearing(nextChar);
				case '\n':
					return _w0rm$elm_mogee$View_Font$leftBearing(nextChar);
				default:
					var _p9 = _p8._0;
					return _elm_lang$core$List$sum(
						{
							ctor: '::',
							_0: _w0rm$elm_mogee$View_Font$rightBearing(_p9),
							_1: {
								ctor: '::',
								_0: A2(_w0rm$elm_mogee$View_Font$kerning, _p9, nextChar),
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$View_Font$leftBearing(nextChar),
									_1: {ctor: '[]'}
								}
							}
						});
			}
		}
	});
var _w0rm$elm_mogee$View_Font$name = function (_p10) {
	var _p11 = _p10;
	return _p11._0;
};
var _w0rm$elm_mogee$View_Font$tracking = 1;
var _w0rm$elm_mogee$View_Font$spaceWidth = 3;
var _w0rm$elm_mogee$View_Font$emHeight = 11;
var _w0rm$elm_mogee$View_Font$Vertex = F2(
	function (a, b) {
		return {position: a, texPosition: b};
	});
var _w0rm$elm_mogee$View_Font$addLetter = F2(
	function ($char, _p12) {
		var _p13 = _p12;
		var _p15 = _p13._1;
		var _p14 = _p13._0;
		return F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			})(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple3',
					_0: A2(
						_w0rm$elm_mogee$View_Font$Vertex,
						A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p14, _p15),
						A2(_elm_community$linear_algebra$Math_Vector2$vec2, $char.x, $char.y)),
					_1: A2(
						_w0rm$elm_mogee$View_Font$Vertex,
						A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p14 + $char.w, _p15 + _w0rm$elm_mogee$View_Font$emHeight),
						A2(_elm_community$linear_algebra$Math_Vector2$vec2, $char.x + $char.w, $char.y + _w0rm$elm_mogee$View_Font$emHeight)),
					_2: A2(
						_w0rm$elm_mogee$View_Font$Vertex,
						A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p14 + $char.w, _p15),
						A2(_elm_community$linear_algebra$Math_Vector2$vec2, $char.x + $char.w, $char.y))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple3',
						_0: A2(
							_w0rm$elm_mogee$View_Font$Vertex,
							A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p14, _p15),
							A2(_elm_community$linear_algebra$Math_Vector2$vec2, $char.x, $char.y)),
						_1: A2(
							_w0rm$elm_mogee$View_Font$Vertex,
							A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p14, _p15 + _w0rm$elm_mogee$View_Font$emHeight),
							A2(_elm_community$linear_algebra$Math_Vector2$vec2, $char.x, $char.y + _w0rm$elm_mogee$View_Font$emHeight)),
						_2: A2(
							_w0rm$elm_mogee$View_Font$Vertex,
							A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p14 + $char.w, _p15 + _w0rm$elm_mogee$View_Font$emHeight),
							A2(_elm_community$linear_algebra$Math_Vector2$vec2, $char.x + $char.w, $char.y + _w0rm$elm_mogee$View_Font$emHeight))
					},
					_1: {ctor: '[]'}
				}
			});
	});
var _w0rm$elm_mogee$View_Font$textMeshHelper = F5(
	function (prevChar, text, currentX, currentY, list) {
		textMeshHelper:
		while (true) {
			var _p16 = text;
			if (_p16.ctor === '::') {
				switch (_p16._0) {
					case ' ':
						var _v8 = _elm_lang$core$Maybe$Just(' '),
							_v9 = _p16._1,
							_v10 = currentX + _w0rm$elm_mogee$View_Font$spaceWidth,
							_v11 = currentY,
							_v12 = list;
						prevChar = _v8;
						text = _v9;
						currentX = _v10;
						currentY = _v11;
						list = _v12;
						continue textMeshHelper;
					case '\n':
						var _v13 = _elm_lang$core$Maybe$Just('\n'),
							_v14 = _p16._1,
							_v15 = 0,
							_v16 = currentY + _w0rm$elm_mogee$View_Font$emHeight,
							_v17 = list;
						prevChar = _v13;
						text = _v14;
						currentX = _v15;
						currentY = _v16;
						list = _v17;
						continue textMeshHelper;
					default:
						var _p20 = _p16._1;
						var _p19 = _p16._0;
						var _p17 = A2(_elm_lang$core$Dict$get, _p19, _w0rm$elm_mogee$View_FontData$font);
						if (_p17.ctor === 'Just') {
							var _p18 = _p17._0;
							return A3(
								_w0rm$elm_mogee$View_Font$addLetter,
								_p18,
								{
									ctor: '_Tuple2',
									_0: currentX + A2(_w0rm$elm_mogee$View_Font$letterSpacing, prevChar, _p19),
									_1: currentY
								},
								A5(
									_w0rm$elm_mogee$View_Font$textMeshHelper,
									_elm_lang$core$Maybe$Just(_p19),
									_p20,
									(currentX + _p18.w) + A2(_w0rm$elm_mogee$View_Font$letterSpacing, prevChar, _p19),
									currentY,
									list));
						} else {
							var _v19 = prevChar,
								_v20 = _p20,
								_v21 = currentX,
								_v22 = currentY,
								_v23 = list;
							prevChar = _v19;
							text = _v20;
							currentX = _v21;
							currentY = _v22;
							list = _v23;
							continue textMeshHelper;
						}
				}
			} else {
				return list;
			}
		}
	});
var _w0rm$elm_mogee$View_Font$Uniform = F4(
	function (a, b, c, d) {
		return {offset: a, color: b, texture: c, textureSize: d};
	});
var _w0rm$elm_mogee$View_Font$Varying = function (a) {
	return {texturePos: a};
};
var _w0rm$elm_mogee$View_Font$Text = F2(
	function (a, b) {
		return {ctor: 'Text', _0: a, _1: b};
	});
var _w0rm$elm_mogee$View_Font$text = function (text) {
	var chars = _elm_lang$core$List$reverse(
		A2(
			_w0rm$elm_mogee$View_Font$replaceLigatures,
			text,
			{ctor: '[]'}));
	return A2(
		_w0rm$elm_mogee$View_Font$Text,
		text,
		_elm_community$webgl$WebGL$triangles(
			A5(
				_w0rm$elm_mogee$View_Font$textMeshHelper,
				_elm_lang$core$Maybe$Nothing,
				chars,
				0,
				0,
				{ctor: '[]'})));
};

var _w0rm$elm_mogee$View_SpriteData$textureSrc = 'data:image/png;base64,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';
var _w0rm$elm_mogee$View_SpriteData$spriteSrc = 'data:image/png;base64,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';
var _w0rm$elm_mogee$View_SpriteData$SpriteInfo = F4(
	function (a, b, c, d) {
		return {x: a, y: b, w: c, h: d};
	});
var _w0rm$elm_mogee$View_SpriteData$sprite = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'arrow',
			_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 0, 0, 3, 5)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'background',
				_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 3, 0, 128, 256)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'bug',
					_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 131, 0, 64, 64)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'carmack',
						_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 195, 0, 20, 26)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'codewords',
							_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 215, 0, 14, 17)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'elm-big',
								_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 229, 0, 18, 18)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'elm-street-404',
									_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 0, 256, 16, 22)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'elm',
										_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 16, 256, 11, 11)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'life',
											_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 27, 256, 5, 4)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'logo',
												_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 32, 256, 58, 24)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'mario-jump',
													_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 90, 256, 17, 25)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'mario',
														_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 107, 256, 15, 27)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'mogee',
															_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 122, 256, 17, 15)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'schema',
																_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 139, 256, 60, 52)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'selection',
																	_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 0, 308, 58, 24)
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'soundcloud',
																		_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 58, 308, 12, 6)
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'texture',
																			_1: A4(_w0rm$elm_mogee$View_SpriteData$SpriteInfo, 70, 308, 164, 64)
																		},
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});

var _w0rm$elm_mogee$View_Sprite$texturedFragmentShader = {'src': '\n\n        precision mediump float;\n        uniform sampler2D texture;\n        varying vec2 texturePos;\n\n        void main () {\n            gl_FragColor = texture2D(texture, texturePos);\n            if (gl_FragColor.a == 0.0) discard;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Sprite$texturedVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        attribute vec2 texPosition;\n        uniform vec2 textureSize;\n        uniform vec3 offset;\n        varying vec2 texturePos;\n\n        void main () {\n            vec2 clipSpace = position + offset.xy - 32.0;\n            gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n            texturePos = texPosition / textureSize;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Sprite$loadSprite = function (msg) {
	return A2(
		_elm_lang$core$Task$attempt,
		msg,
		A2(
			_elm_community$webgl$WebGL_Texture$loadWith,
			_elm_lang$core$Native_Utils.update(
				_elm_community$webgl$WebGL_Texture$defaultOptions,
				{magnify: _elm_community$webgl$WebGL_Texture$nearest, minify: _elm_community$webgl$WebGL_Texture$nearest, flipY: false}),
			_w0rm$elm_mogee$View_SpriteData$spriteSrc));
};
var _w0rm$elm_mogee$View_Sprite$loadTexture = function (msg) {
	return A2(
		_elm_lang$core$Task$attempt,
		msg,
		A2(
			_elm_community$webgl$WebGL_Texture$loadWith,
			_elm_lang$core$Native_Utils.update(
				_elm_community$webgl$WebGL_Texture$defaultOptions,
				{magnify: _elm_community$webgl$WebGL_Texture$nearest, minify: _elm_community$webgl$WebGL_Texture$nearest, flipY: false}),
			_w0rm$elm_mogee$View_SpriteData$textureSrc));
};
var _w0rm$elm_mogee$View_Sprite$render = F3(
	function (_p0, texture, offset) {
		var _p1 = _p0;
		return A4(
			_elm_community$webgl$WebGL$entity,
			_w0rm$elm_mogee$View_Sprite$texturedVertexShader,
			_w0rm$elm_mogee$View_Sprite$texturedFragmentShader,
			_p1._1,
			{
				offset: _elm_community$linear_algebra$Math_Vector3$fromTuple(offset),
				texture: texture,
				textureSize: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$first(
							_elm_community$webgl$WebGL_Texture$size(texture))),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$second(
							_elm_community$webgl$WebGL_Texture$size(texture))))
			});
	});
var _w0rm$elm_mogee$View_Sprite$name = function (_p2) {
	var _p3 = _p2;
	return _p3._0;
};
var _w0rm$elm_mogee$View_Sprite$Vertex = F2(
	function (a, b) {
		return {position: a, texPosition: b};
	});
var _w0rm$elm_mogee$View_Sprite$mesh = function (_p4) {
	var _p5 = _p4;
	var _p9 = _p5.y;
	var _p8 = _p5.x;
	var _p7 = _p5.w;
	var _p6 = _p5.h;
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple3',
			_0: A2(
				_w0rm$elm_mogee$View_Sprite$Vertex,
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, 0),
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p8, _p9)),
			_1: A2(
				_w0rm$elm_mogee$View_Sprite$Vertex,
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p7, _p6),
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p8 + _p7, _p9 + _p6)),
			_2: A2(
				_w0rm$elm_mogee$View_Sprite$Vertex,
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p7, 0),
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p8 + _p7, _p9))
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: A2(
					_w0rm$elm_mogee$View_Sprite$Vertex,
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, 0),
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p8, _p9)),
				_1: A2(
					_w0rm$elm_mogee$View_Sprite$Vertex,
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, _p6),
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p8, _p9 + _p6)),
				_2: A2(
					_w0rm$elm_mogee$View_Sprite$Vertex,
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p7, _p6),
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, _p8 + _p7, _p9 + _p6))
			},
			_1: {ctor: '[]'}
		}
	};
};
var _w0rm$elm_mogee$View_Sprite$Uniform = F3(
	function (a, b, c) {
		return {offset: a, texture: b, textureSize: c};
	});
var _w0rm$elm_mogee$View_Sprite$Varying = function (a) {
	return {texturePos: a};
};
var _w0rm$elm_mogee$View_Sprite$Sprite = F2(
	function (a, b) {
		return {ctor: 'Sprite', _0: a, _1: b};
	});
var _w0rm$elm_mogee$View_Sprite$sprite = function (name) {
	return A2(
		_w0rm$elm_mogee$View_Sprite$Sprite,
		name,
		_elm_community$webgl$WebGL$triangles(
			A2(
				_elm_lang$core$Maybe$withDefault,
				{ctor: '[]'},
				A2(
					_elm_lang$core$Maybe$map,
					_w0rm$elm_mogee$View_Sprite$mesh,
					A2(_elm_lang$core$Dict$get, name, _w0rm$elm_mogee$View_SpriteData$sprite)))));
};

var _w0rm$elm_mogee$Slides_Engine$addElementEvent = F2(
	function (elementId, elementEvent) {
		return A2(
			_elm_lang$core$Dict$update,
			elementId,
			function (val) {
				var _p0 = val;
				if (_p0.ctor === 'Just') {
					var _p1 = _p0._0;
					return _elm_lang$core$Maybe$Just(
						_elm_lang$core$Native_Utils.update(
							_p1,
							{
								events: A2(
									_elm_lang$core$Basics_ops['++'],
									_p1.events,
									{
										ctor: '::',
										_0: elementEvent,
										_1: {ctor: '[]'}
									})
							}));
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			});
	});
var _w0rm$elm_mogee$Slides_Engine$noAnimations = function (_p2) {
	return _elm_lang$core$Dict$isEmpty(
		function (_) {
			return _.animations;
		}(_p2));
};
var _w0rm$elm_mogee$Slides_Engine$scheduleElementEvent = F3(
	function (elementId, data, engine) {
		var _p3 = data.events;
		if (_p3.ctor === '::') {
			if (_p3._0.ctor === 'MoveElement') {
				var _p6 = _p3._0._0.y;
				var _p5 = _p3._0._0.x;
				var _p4 = _p3._0._0.duration;
				return _elm_lang$core$Native_Utils.update(
					engine,
					{
						animations: A3(
							_elm_lang$core$Dict$insert,
							elementId,
							{
								x: A2(
									_mgold$elm_animation$Animation$duration,
									_p4,
									A2(
										_mgold$elm_animation$Animation$to,
										_p5,
										A2(
											_mgold$elm_animation$Animation$from,
											data.position.x,
											_mgold$elm_animation$Animation$animation(engine.time)))),
								y: A2(
									_mgold$elm_animation$Animation$duration,
									_p4,
									A2(
										_mgold$elm_animation$Animation$to,
										_p6,
										A2(
											_mgold$elm_animation$Animation$from,
											data.position.y,
											_mgold$elm_animation$Animation$animation(engine.time))))
							},
							engine.animations),
						elements: A3(
							_elm_lang$core$Dict$insert,
							elementId,
							_elm_lang$core$Native_Utils.update(
								data,
								{
									events: _p3._1,
									position: {x: _p5, y: _p6}
								}),
							engine.elements)
					});
			} else {
				return _elm_lang$core$Native_Utils.update(
					engine,
					{
						elements: A2(_elm_lang$core$Dict$remove, elementId, engine.elements)
					});
			}
		} else {
			return engine;
		}
	});
var _w0rm$elm_mogee$Slides_Engine$animateElement = F3(
	function (elementId, data, engine) {
		var _p7 = A2(_elm_lang$core$Dict$get, elementId, engine.animations);
		if (_p7.ctor === 'Just') {
			return (A2(_mgold$elm_animation$Animation$isDone, engine.time, _p7._0.x) && A2(_mgold$elm_animation$Animation$isDone, engine.time, _p7._0.y)) ? _elm_lang$core$Native_Utils.update(
				engine,
				{
					animations: A2(_elm_lang$core$Dict$remove, elementId, engine.animations)
				}) : engine;
		} else {
			return A3(_w0rm$elm_mogee$Slides_Engine$scheduleElementEvent, elementId, data, engine);
		}
	});
var _w0rm$elm_mogee$Slides_Engine$animate = F2(
	function (elapsed, engine) {
		return A3(
			_elm_lang$core$Dict$foldl,
			_w0rm$elm_mogee$Slides_Engine$animateElement,
			_elm_lang$core$Native_Utils.update(
				engine,
				{time: engine.time + elapsed}),
			engine.elements);
	});
var _w0rm$elm_mogee$Slides_Engine$elementData = F2(
	function (element, position) {
		return {
			element: element,
			position: position,
			events: {ctor: '[]'}
		};
	});
var _w0rm$elm_mogee$Slides_Engine$initial = function (events) {
	return {
		time: 0,
		elements: _elm_lang$core$Dict$empty,
		animations: _elm_lang$core$Dict$empty,
		nextEvents: events,
		prevEvents: {ctor: '[]'}
	};
};
var _w0rm$elm_mogee$Slides_Engine$ElementData = F3(
	function (a, b, c) {
		return {element: a, position: b, events: c};
	});
var _w0rm$elm_mogee$Slides_Engine$Transition = F3(
	function (a, b, c) {
		return {x: a, y: b, duration: c};
	});
var _w0rm$elm_mogee$Slides_Engine$Engine = F5(
	function (a, b, c, d, e) {
		return {time: a, elements: b, animations: c, nextEvents: d, prevEvents: e};
	});
var _w0rm$elm_mogee$Slides_Engine$KeyPress = {ctor: 'KeyPress'};
var _w0rm$elm_mogee$Slides_Engine$Del = function (a) {
	return {ctor: 'Del', _0: a};
};
var _w0rm$elm_mogee$Slides_Engine$Move = F2(
	function (a, b) {
		return {ctor: 'Move', _0: a, _1: b};
	});
var _w0rm$elm_mogee$Slides_Engine$AddSprite = F3(
	function (a, b, c) {
		return {ctor: 'AddSprite', _0: a, _1: b, _2: c};
	});
var _w0rm$elm_mogee$Slides_Engine$AddText = F3(
	function (a, b, c) {
		return {ctor: 'AddText', _0: a, _1: b, _2: c};
	});
var _w0rm$elm_mogee$Slides_Engine$DelElement = {ctor: 'DelElement'};
var _w0rm$elm_mogee$Slides_Engine$MoveElement = function (a) {
	return {ctor: 'MoveElement', _0: a};
};
var _w0rm$elm_mogee$Slides_Engine$TextElement = function (a) {
	return {ctor: 'TextElement', _0: a};
};
var _w0rm$elm_mogee$Slides_Engine$SpriteElement = function (a) {
	return {ctor: 'SpriteElement', _0: a};
};
var _w0rm$elm_mogee$Slides_Engine$runEvents = F2(
	function (events, engine) {
		runEvents:
		while (true) {
			var _p8 = events;
			if (_p8.ctor === '::') {
				switch (_p8._0.ctor) {
					case 'AddSprite':
						var _v4 = _p8._1,
							_v5 = _elm_lang$core$Native_Utils.update(
							engine,
							{
								elements: A3(
									_elm_lang$core$Dict$insert,
									_p8._0._0,
									A2(
										_w0rm$elm_mogee$Slides_Engine$elementData,
										_w0rm$elm_mogee$Slides_Engine$SpriteElement(
											_w0rm$elm_mogee$View_Sprite$sprite(_p8._0._1)),
										_p8._0._2),
									engine.elements)
							});
						events = _v4;
						engine = _v5;
						continue runEvents;
					case 'AddText':
						var _v6 = _p8._1,
							_v7 = _elm_lang$core$Native_Utils.update(
							engine,
							{
								elements: A3(
									_elm_lang$core$Dict$insert,
									_p8._0._0,
									A2(
										_w0rm$elm_mogee$Slides_Engine$elementData,
										_w0rm$elm_mogee$Slides_Engine$TextElement(
											_w0rm$elm_mogee$View_Font$text(_p8._0._1)),
										_p8._0._2),
									engine.elements)
							});
						events = _v6;
						engine = _v7;
						continue runEvents;
					case 'Move':
						var _v9 = _p8._1,
							_v10 = _elm_lang$core$Native_Utils.update(
							engine,
							{
								elements: A3(
									_elm_lang$core$Dict$update,
									_p8._0._0,
									function (maybeData) {
										var _p9 = maybeData;
										if (_p9.ctor === 'Just') {
											var position = {x: _p8._0._1.x, y: _p8._0._1.y};
											return _elm_lang$core$Maybe$Just(
												_elm_lang$core$Native_Utils.update(
													_p9._0,
													{position: position}));
										} else {
											return _elm_lang$core$Maybe$Nothing;
										}
									},
									engine.elements)
							});
						events = _v9;
						engine = _v10;
						continue runEvents;
					case 'Del':
						var _v11 = _p8._1,
							_v12 = _elm_lang$core$Native_Utils.update(
							engine,
							{
								elements: A2(_elm_lang$core$Dict$remove, _p8._0._0, engine.elements)
							});
						events = _v11;
						engine = _v12;
						continue runEvents;
					default:
						var _v13 = _p8._1,
							_v14 = engine;
						events = _v13;
						engine = _v14;
						continue runEvents;
				}
			} else {
				return engine;
			}
		}
	});
var _w0rm$elm_mogee$Slides_Engine$updatePrev = function (engine) {
	updatePrev:
	while (true) {
		var _p10 = engine.prevEvents;
		if (_p10.ctor === '::') {
			if (_p10._0.ctor === 'KeyPress') {
				var _p11 = _p10._1;
				return A2(
					_w0rm$elm_mogee$Slides_Engine$runEvents,
					_elm_lang$core$List$reverse(_p11),
					_elm_lang$core$Native_Utils.update(
						engine,
						{
							elements: _elm_lang$core$Dict$empty,
							animations: _elm_lang$core$Dict$empty,
							prevEvents: _p11,
							nextEvents: {ctor: '::', _0: _w0rm$elm_mogee$Slides_Engine$KeyPress, _1: engine.nextEvents}
						}));
			} else {
				var _v16 = _elm_lang$core$Native_Utils.update(
					engine,
					{
						prevEvents: _p10._1,
						nextEvents: {ctor: '::', _0: _p10._0, _1: engine.nextEvents}
					});
				engine = _v16;
				continue updatePrev;
			}
		} else {
			return _elm_lang$core$Native_Utils.update(
				engine,
				{elements: _elm_lang$core$Dict$empty, animations: _elm_lang$core$Dict$empty});
		}
	}
};
var _w0rm$elm_mogee$Slides_Engine$updateNext = F2(
	function (keys, engine) {
		var _p12 = engine.nextEvents;
		if (_p12.ctor === '::') {
			switch (_p12._0.ctor) {
				case 'AddSprite':
					return _elm_lang$core$Native_Utils.update(
						engine,
						{
							nextEvents: _p12._1,
							prevEvents: {ctor: '::', _0: _p12._0, _1: engine.prevEvents},
							elements: A3(
								_elm_lang$core$Dict$insert,
								_p12._0._0,
								A2(
									_w0rm$elm_mogee$Slides_Engine$elementData,
									_w0rm$elm_mogee$Slides_Engine$SpriteElement(
										_w0rm$elm_mogee$View_Sprite$sprite(_p12._0._1)),
									_p12._0._2),
								engine.elements)
						});
				case 'AddText':
					return _elm_lang$core$Native_Utils.update(
						engine,
						{
							nextEvents: _p12._1,
							prevEvents: {ctor: '::', _0: _p12._0, _1: engine.prevEvents},
							elements: A3(
								_elm_lang$core$Dict$insert,
								_p12._0._0,
								A2(
									_w0rm$elm_mogee$Slides_Engine$elementData,
									_w0rm$elm_mogee$Slides_Engine$TextElement(
										_w0rm$elm_mogee$View_Font$text(_p12._0._1)),
									_p12._0._2),
								engine.elements)
						});
				case 'Move':
					return _elm_lang$core$Native_Utils.update(
						engine,
						{
							nextEvents: _p12._1,
							prevEvents: {ctor: '::', _0: _p12._0, _1: engine.prevEvents},
							elements: A3(
								_w0rm$elm_mogee$Slides_Engine$addElementEvent,
								_p12._0._0,
								_w0rm$elm_mogee$Slides_Engine$MoveElement(_p12._0._1),
								engine.elements)
						});
				case 'Del':
					return _elm_lang$core$Native_Utils.update(
						engine,
						{
							nextEvents: _p12._1,
							prevEvents: {ctor: '::', _0: _p12._0, _1: engine.prevEvents},
							elements: A3(_w0rm$elm_mogee$Slides_Engine$addElementEvent, _p12._0._0, _w0rm$elm_mogee$Slides_Engine$DelElement, engine.elements)
						});
				default:
					return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.right, keys) ? (_w0rm$elm_mogee$Slides_Engine$noAnimations(engine) ? _elm_lang$core$Native_Utils.update(
						engine,
						{
							nextEvents: _p12._1,
							prevEvents: {ctor: '::', _0: _p12._0, _1: engine.prevEvents}
						}) : A2(
						_w0rm$elm_mogee$Slides_Engine$runEvents,
						_elm_lang$core$List$reverse(engine.prevEvents),
						_elm_lang$core$Native_Utils.update(
							engine,
							{elements: _elm_lang$core$Dict$empty, animations: _elm_lang$core$Dict$empty}))) : (A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.left, keys) ? _w0rm$elm_mogee$Slides_Engine$updatePrev(engine) : engine);
			}
		} else {
			return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.left, keys) ? _w0rm$elm_mogee$Slides_Engine$updatePrev(engine) : engine;
		}
	});
var _w0rm$elm_mogee$Slides_Engine$update = F3(
	function (elapsed, keys, engine) {
		return A2(
			_w0rm$elm_mogee$Slides_Engine$updateNext,
			keys,
			A2(_w0rm$elm_mogee$Slides_Engine$animate, elapsed, engine));
	});

var _w0rm$elm_mogee$Slides_Slides$wisdomSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'recapElmBig',
		'elm-big',
		{x: 24, y: 5}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'recap1',
			'Slack:',
			{x: 23, y: 27}),
		_1: {
			ctor: '::',
			_0: A3(
				_w0rm$elm_mogee$Slides_Engine$AddText,
				'recap2',
				'#gamedev\n #webgl',
				{x: 16, y: 38}),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$textureSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'textureTexture',
		'texture',
		{x: 0, y: 0}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: A3(
				_w0rm$elm_mogee$Slides_Engine$AddSprite,
				'textureSelection',
				'selection',
				{x: 0, y: 15}),
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('textureSelection'),
					_1: {
						ctor: '::',
						_0: A2(
							_w0rm$elm_mogee$Slides_Engine$Move,
							'textureTexture',
							{x: -100, y: 0, duration: 2750}),
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
							_1: {
								ctor: '::',
								_0: _w0rm$elm_mogee$Slides_Engine$Del('textureTexture'),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$renderingSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'rendering1',
		'3. Rendering',
		{x: 10, y: 21}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('rendering1'),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$immutabilitySlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'immutability1',
		'\"Immutability',
		{x: 5, y: 29}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'immutability2',
			'is not enough\"',
			{x: 9, y: 40}),
		_1: {
			ctor: '::',
			_0: A3(
				_w0rm$elm_mogee$Slides_Engine$AddText,
				'immutability3',
				'Patrick Dubroy',
				{x: 5, y: 51}),
			_1: {
				ctor: '::',
				_0: A3(
					_w0rm$elm_mogee$Slides_Engine$AddSprite,
					'immutabilityCodewords',
					'codewords',
					{x: 25, y: 6}),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Engine$Del('immutability1'),
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Slides_Engine$Del('immutability2'),
							_1: {
								ctor: '::',
								_0: _w0rm$elm_mogee$Slides_Engine$Del('immutability3'),
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$Slides_Engine$Del('immutabilityCodewords'),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$bugSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'bugBug',
		'bug',
		{x: 0, y: 0}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('bugBug'),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$schemaSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'schemaSchema',
		'schema',
		{x: 2, y: 12}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('schemaSchema'),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$interactionsSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'interactions1',
		'2. Interactions',
		{x: 5, y: 21}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('interactions1'),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$ecsSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'ecs1',
		'Entity-\nComponent-\nSystem',
		{x: 2, y: 7}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('ecs1'),
			_1: {
				ctor: '::',
				_0: A3(
					_w0rm$elm_mogee$Slides_Engine$AddText,
					'ecs2',
					'type alias\nComponents =\n{ id: Int,\n  a: Dict Int A,\n  b: Dict Int B }',
					{x: 2, y: 2}),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Engine$Del('ecs2'),
						_1: {
							ctor: '::',
							_0: A3(
								_w0rm$elm_mogee$Slides_Engine$AddSprite,
								'escMogee',
								'mogee',
								{x: 48, y: 46}),
							_1: {
								ctor: '::',
								_0: A3(
									_w0rm$elm_mogee$Slides_Engine$AddText,
									'ecs3',
									'Components:\n Mogee, Screen,\n Wall, Velocity,\n Transform',
									{x: 2, y: 2}),
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
									_1: {
										ctor: '::',
										_0: _w0rm$elm_mogee$Slides_Engine$Del('ecs3'),
										_1: {
											ctor: '::',
											_0: _w0rm$elm_mogee$Slides_Engine$Del('escMogee'),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$mogeeModelSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'mogeeMogee',
		'mogee',
		{x: 45, y: 8}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'mogee1',
			'type \nCategory \n= Wall\n | Mogee Data1\n | Screen Data2',
			{x: 2, y: 7}),
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$Del('mogeeMogee'),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('mogee1'),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$elmStreet404ModelSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'elmStreet404',
		'elm-street-404',
		{x: 43, y: 3}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'elmStreet4041',
			'{ w: List\n     Warehouse,\n o: List Obstacle,\n h: List House }',
			{x: 2, y: 18}),
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$Del('elmStreet4041'),
				_1: {
					ctor: '::',
					_0: A3(
						_w0rm$elm_mogee$Slides_Engine$AddText,
						'elmStreet4042',
						'type alias\nEntity =\n{ s: Size,\n  p: Position,\n  cat: Category }',
						{x: 2, y: 7}),
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Slides_Engine$Del('elmStreet4042'),
							_1: {
								ctor: '::',
								_0: A3(
									_w0rm$elm_mogee$Slides_Engine$AddText,
									'elmStreet4043',
									'type \nCategory \n= House Int\n | Warehouse Int\n | Obstacle Data',
									{x: 2, y: 7}),
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
									_1: {
										ctor: '::',
										_0: _w0rm$elm_mogee$Slides_Engine$Del('elmStreet4043'),
										_1: {
											ctor: '::',
											_0: _w0rm$elm_mogee$Slides_Engine$Del('elmStreet404'),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$marioModelSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'marioJump',
		'mario-jump',
		{x: 44, y: 38}),
	_1: {
		ctor: '::',
		_0: A2(
			_w0rm$elm_mogee$Slides_Engine$Move,
			'marioJump',
			{x: 44, y: 0, duration: 1000}),
		_1: {
			ctor: '::',
			_0: A2(
				_w0rm$elm_mogee$Slides_Engine$Move,
				'marioJump',
				{x: 44, y: 38, duration: 1000}),
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('marioJump'),
					_1: {
						ctor: '::',
						_0: A3(
							_w0rm$elm_mogee$Slides_Engine$AddSprite,
							'marioStay',
							'mario',
							{x: 45, y: 38}),
						_1: {
							ctor: '::',
							_0: A3(
								_w0rm$elm_mogee$Slides_Engine$AddText,
								'mario1',
								'{ dir: Direction,\n  vx: Float,\n  vy: Float,\n  x: Float,\n  y: Float }',
								{x: 2, y: 2}),
							_1: {
								ctor: '::',
								_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$Slides_Engine$Del('marioStay'),
									_1: {
										ctor: '::',
										_0: _w0rm$elm_mogee$Slides_Engine$Del('mario1'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$gameStateSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'gameState1',
		'1. Game State',
		{x: 6, y: 21}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('gameState1'),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$challengesSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'challenges1',
		'Challenges:\n1. Game State\n2. Interactions\n3. Rendering',
		{x: 2, y: 2}),
	_1: {
		ctor: '::',
		_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$Del('challenges1'),
			_1: {ctor: '[]'}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$myGamesInElmSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'myGames1',
		'elm-flatris',
		{x: 2, y: 2}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'myGames2',
			'elm-street-\n404',
			{x: 2, y: 22}),
		_1: {
			ctor: '::',
			_0: A3(
				_w0rm$elm_mogee$Slides_Engine$AddSprite,
				'myGamesElmStreet404',
				'elm-street-404',
				{x: 40, y: 39}),
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('myGames1'),
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Engine$Del('myGames2'),
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Slides_Engine$Del('myGamesElmStreet404'),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$whyGamesInElmSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'why1',
		'Why games',
		{x: 10, y: 17}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'why2',
			'in      ?',
			{x: 25, y: 32}),
		_1: {
			ctor: '::',
			_0: A3(
				_w0rm$elm_mogee$Slides_Engine$AddSprite,
				'whyElm',
				'elm',
				{x: 34, y: 30}),
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('why1'),
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Engine$Del('why2'),
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Slides_Engine$Del('whyElm'),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$aboutSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'about1',
		'Andrey Kuzmin\n@unsoundscapes\n     SoundCloud',
		{x: 2, y: 23}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddSprite,
			'aboutSoundcloud',
			'soundcloud',
			{x: 2, y: 47}),
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$Del('about1'),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('aboutSoundcloud'),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$carmackSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddSprite,
		'carmackCarmack',
		'carmack',
		{x: 21, y: 10}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'carmack1',
			'John D. Carmack',
			{x: 3, y: 42}),
		_1: {
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$Del('carmackCarmack'),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Engine$Del('carmack1'),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$titleSlide = {
	ctor: '::',
	_0: A3(
		_w0rm$elm_mogee$Slides_Engine$AddText,
		'title1',
		'Mogee or how',
		{x: 7, y: 13}),
	_1: {
		ctor: '::',
		_0: A3(
			_w0rm$elm_mogee$Slides_Engine$AddText,
			'title2',
			'we fit Elm',
			{x: 13, y: 24}),
		_1: {
			ctor: '::',
			_0: A3(
				_w0rm$elm_mogee$Slides_Engine$AddText,
				'title3',
				'in a 64×64 grid',
				{x: 4, y: 35}),
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
				_1: {
					ctor: '::',
					_0: A2(
						_w0rm$elm_mogee$Slides_Engine$Move,
						'title2',
						{x: -41, y: 24, duration: 1000}),
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Engine$Del('title2'),
						_1: {
							ctor: '::',
							_0: A3(
								_w0rm$elm_mogee$Slides_Engine$AddText,
								'title4',
								'we fit slides',
								{x: 64, y: 24}),
							_1: {
								ctor: '::',
								_0: A2(
									_w0rm$elm_mogee$Slides_Engine$Move,
									'title4',
									{x: 10, y: 24, duration: 1000}),
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$Slides_Engine$KeyPress,
									_1: {
										ctor: '::',
										_0: _w0rm$elm_mogee$Slides_Engine$Del('title1'),
										_1: {
											ctor: '::',
											_0: _w0rm$elm_mogee$Slides_Engine$Del('title3'),
											_1: {
												ctor: '::',
												_0: _w0rm$elm_mogee$Slides_Engine$Del('title4'),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$Slides_Slides$initial = _w0rm$elm_mogee$Slides_Engine$initial(
	_elm_lang$core$List$concat(
		{
			ctor: '::',
			_0: _w0rm$elm_mogee$Slides_Slides$titleSlide,
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$Slides_Slides$aboutSlide,
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Slides_Slides$carmackSlide,
					_1: {
						ctor: '::',
						_0: _w0rm$elm_mogee$Slides_Slides$whyGamesInElmSlide,
						_1: {
							ctor: '::',
							_0: _w0rm$elm_mogee$Slides_Slides$myGamesInElmSlide,
							_1: {
								ctor: '::',
								_0: _w0rm$elm_mogee$Slides_Slides$challengesSlide,
								_1: {
									ctor: '::',
									_0: _w0rm$elm_mogee$Slides_Slides$gameStateSlide,
									_1: {
										ctor: '::',
										_0: _w0rm$elm_mogee$Slides_Slides$marioModelSlide,
										_1: {
											ctor: '::',
											_0: _w0rm$elm_mogee$Slides_Slides$elmStreet404ModelSlide,
											_1: {
												ctor: '::',
												_0: _w0rm$elm_mogee$Slides_Slides$mogeeModelSlide,
												_1: {
													ctor: '::',
													_0: _w0rm$elm_mogee$Slides_Slides$ecsSlide,
													_1: {
														ctor: '::',
														_0: _w0rm$elm_mogee$Slides_Slides$interactionsSlide,
														_1: {
															ctor: '::',
															_0: _w0rm$elm_mogee$Slides_Slides$schemaSlide,
															_1: {
																ctor: '::',
																_0: _w0rm$elm_mogee$Slides_Slides$bugSlide,
																_1: {
																	ctor: '::',
																	_0: _w0rm$elm_mogee$Slides_Slides$immutabilitySlide,
																	_1: {
																		ctor: '::',
																		_0: _w0rm$elm_mogee$Slides_Slides$renderingSlide,
																		_1: {
																			ctor: '::',
																			_0: _w0rm$elm_mogee$Slides_Slides$textureSlide,
																			_1: {
																				ctor: '::',
																				_0: _w0rm$elm_mogee$Slides_Slides$wisdomSlide,
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}));

var _w0rm$elm_mogee$Model$animateKeys = F2(
	function (elapsed, _p0) {
		var _p1 = _p0;
		var _p2 = _p1._0;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				_p2,
				{
					keys: A2(_w0rm$elm_mogee$Components_Keys$animate, elapsed, _p2.keys)
				}),
			_1: _p1._1
		};
	});
var _w0rm$elm_mogee$Model$sound = _elm_lang$core$Native_Platform.outgoingPort(
	'sound',
	function (v) {
		return v;
	});
var _w0rm$elm_mogee$Model$play = _elm_lang$core$Native_Platform.outgoingPort(
	'play',
	function (v) {
		return v;
	});
var _w0rm$elm_mogee$Model$stop = _elm_lang$core$Native_Platform.outgoingPort(
	'stop',
	function (v) {
		return v;
	});
var _w0rm$elm_mogee$Model$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return {systems: a, components: b, state: c, lives: d, score: e, size: f, sound: g, texture: h, sprite: i, font: j, keys: k, slides: l};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _w0rm$elm_mogee$Model$Initial = function (a) {
	return {ctor: 'Initial', _0: a};
};
var _w0rm$elm_mogee$Model$initial = {
	components: _w0rm$elm_mogee$Components_Components$initial,
	systems: _w0rm$elm_mogee$Systems_Systems$initial,
	lives: 0,
	score: 0,
	state: _w0rm$elm_mogee$Model$Initial(_w0rm$elm_mogee$Components_Menu$start),
	size: 0,
	sound: true,
	texture: _elm_lang$core$Maybe$Nothing,
	font: _elm_lang$core$Maybe$Nothing,
	sprite: _elm_lang$core$Maybe$Nothing,
	keys: _w0rm$elm_mogee$Components_Keys$initial,
	slides: _w0rm$elm_mogee$Slides_Slides$initial
};
var _w0rm$elm_mogee$Model$Dead = {ctor: 'Dead'};
var _w0rm$elm_mogee$Model$checkLives = function (model) {
	return _w0rm$elm_mogee$Components_Components$isDead(model.components) ? {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.update(
			model,
			{lives: model.lives - 1, state: _w0rm$elm_mogee$Model$Dead}),
		_1: _elm_lang$core$Platform_Cmd$batch(
			{
				ctor: '::',
				_0: _w0rm$elm_mogee$Model$play('death'),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Model$stop('theme'),
					_1: {ctor: '[]'}
				}
			})
	} : {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
};
var _w0rm$elm_mogee$Model$Playing = {ctor: 'Playing'};
var _w0rm$elm_mogee$Model$continue = function (model) {
	return {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.update(
			model,
			{state: _w0rm$elm_mogee$Model$Playing, components: _w0rm$elm_mogee$Components_Components$initial, systems: _w0rm$elm_mogee$Systems_Systems$initial, score: model.score + model.systems.currentScore}),
		_1: _elm_lang$core$Platform_Cmd$batch(
			{
				ctor: '::',
				_0: _w0rm$elm_mogee$Model$play('action'),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Model$play('theme'),
					_1: {ctor: '[]'}
				}
			})
	};
};
var _w0rm$elm_mogee$Model$start = function (model) {
	return {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.update(
			model,
			{state: _w0rm$elm_mogee$Model$Playing, components: _w0rm$elm_mogee$Components_Components$initial, systems: _w0rm$elm_mogee$Systems_Systems$initial, lives: 3, score: 0}),
		_1: _elm_lang$core$Platform_Cmd$batch(
			{
				ctor: '::',
				_0: _w0rm$elm_mogee$Model$play('action'),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$Model$play('theme'),
					_1: {ctor: '[]'}
				}
			})
	};
};
var _w0rm$elm_mogee$Model$updateMenu = F4(
	function (elapsed, menuState, menu, model) {
		var newModel = _elm_lang$core$Native_Utils.eq(menu.section, _w0rm$elm_mogee$Components_Menu$SlidesSection) ? _elm_lang$core$Native_Utils.update(
			model,
			{
				slides: A3(_w0rm$elm_mogee$Slides_Engine$update, elapsed, model.keys, model.slides)
			}) : model;
		var _p3 = A4(_w0rm$elm_mogee$Components_Menu$update, elapsed, model.sound, model.keys, menu);
		var newMenu = _p3._0;
		var cmd = _p3._1;
		var _p4 = cmd;
		switch (_p4.ctor) {
			case 'Start':
				return _w0rm$elm_mogee$Model$start(
					_elm_lang$core$Native_Utils.update(
						newModel,
						{
							state: _w0rm$elm_mogee$Model$Initial(newMenu)
						}));
			case 'ToggleSound':
				var _p5 = _p4._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						newModel,
						{
							sound: _p5,
							state: _w0rm$elm_mogee$Model$Initial(newMenu)
						}),
					_1: _p5 ? _elm_lang$core$Platform_Cmd$batch(
						{
							ctor: '::',
							_0: _w0rm$elm_mogee$Model$sound(_p5),
							_1: {
								ctor: '::',
								_0: _w0rm$elm_mogee$Model$play('action'),
								_1: {ctor: '[]'}
							}
						}) : _w0rm$elm_mogee$Model$sound(_p5)
				};
			case 'Resume':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						newModel,
						{state: _w0rm$elm_mogee$Model$Playing}),
					_1: _w0rm$elm_mogee$Model$play('action')
				};
			case 'End':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						newModel,
						{
							state: _w0rm$elm_mogee$Model$Initial(_w0rm$elm_mogee$Components_Menu$start)
						}),
					_1: _elm_lang$core$Platform_Cmd$batch(
						{
							ctor: '::',
							_0: _w0rm$elm_mogee$Model$stop('theme'),
							_1: {
								ctor: '::',
								_0: _w0rm$elm_mogee$Model$play('action'),
								_1: {ctor: '[]'}
							}
						})
				};
			case 'Action':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						newModel,
						{
							state: menuState(newMenu)
						}),
					_1: _w0rm$elm_mogee$Model$play('action')
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						newModel,
						{
							state: menuState(newMenu)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _w0rm$elm_mogee$Model$Paused = function (a) {
	return {ctor: 'Paused', _0: a};
};
var _w0rm$elm_mogee$Model$animate = F2(
	function (elapsed, model) {
		var _p6 = model.state;
		switch (_p6.ctor) {
			case 'Initial':
				return A4(_w0rm$elm_mogee$Model$updateMenu, elapsed, _w0rm$elm_mogee$Model$Initial, _p6._0, model);
			case 'Paused':
				return A4(_w0rm$elm_mogee$Model$updateMenu, elapsed, _w0rm$elm_mogee$Model$Paused, _p6._0, model);
			case 'Playing':
				var state = A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.escape, model.keys) ? _w0rm$elm_mogee$Model$Paused(_w0rm$elm_mogee$Components_Menu$paused) : model.state;
				var limitElapsed = A2(_elm_lang$core$Basics$min, elapsed, 60);
				var _p7 = A4(
					_w0rm$elm_mogee$Systems_Systems$run,
					limitElapsed,
					_w0rm$elm_mogee$Components_Keys$directions(model.keys),
					model.components,
					model.systems);
				var newComponents = _p7._0;
				var newSystems = _p7._1;
				var sound = _p7._2;
				var _p8 = _w0rm$elm_mogee$Model$checkLives(
					_elm_lang$core$Native_Utils.update(
						model,
						{components: newComponents, systems: newSystems, state: state}));
				var newState = _p8._0;
				var cmd = _p8._1;
				return {
					ctor: '_Tuple2',
					_0: newState,
					_1: function () {
						var _p9 = sound;
						if (_p9.ctor === 'Just') {
							return _elm_lang$core$Platform_Cmd$batch(
								{
									ctor: '::',
									_0: cmd,
									_1: {
										ctor: '::',
										_0: _w0rm$elm_mogee$Model$play(_p9._0),
										_1: {ctor: '[]'}
									}
								});
						} else {
							return cmd;
						}
					}()
				};
			default:
				return A2(_w0rm$elm_mogee$Components_Keys$pressed, _w0rm$elm_mogee$Components_Keys$codes.enter, model.keys) ? (_elm_lang$core$Native_Utils.eq(model.lives, 0) ? {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							state: _w0rm$elm_mogee$Model$Initial(_w0rm$elm_mogee$Components_Menu$start)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				} : _w0rm$elm_mogee$Model$continue(model)) : {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _w0rm$elm_mogee$Model$update = F2(
	function (action, model) {
		var _p10 = action;
		switch (_p10.ctor) {
			case 'Resize':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							size: ((A2(_elm_lang$core$Basics$min, _p10._0.width, _p10._0.height) / 64) | 0) * 64
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Animate':
				var _p11 = _p10._0;
				return A2(
					_w0rm$elm_mogee$Model$animateKeys,
					_p11,
					A2(_w0rm$elm_mogee$Model$animate, _p11, model));
			case 'KeyChange':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							keys: A3(_w0rm$elm_mogee$Components_Keys$keyChange, _p10._0, _p10._1, model.keys)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'TextureLoaded':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							texture: _elm_lang$core$Result$toMaybe(_p10._0)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'SpriteLoaded':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							sprite: _elm_lang$core$Result$toMaybe(_p10._0)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'FontLoaded':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							font: _elm_lang$core$Result$toMaybe(_p10._0)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				if (_p10._0.ctor === 'Visible') {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								state: _elm_lang$core$Native_Utils.eq(model.state, _w0rm$elm_mogee$Model$Playing) ? _w0rm$elm_mogee$Model$Paused(_w0rm$elm_mogee$Components_Menu$paused) : model.state
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
		}
	});

var _w0rm$elm_mogee$View_Common$texturedFragmentShader = {'src': '\n\n        precision mediump float;\n        uniform sampler2D texture;\n        uniform vec2 textureSize;\n        uniform vec2 textureOffset;\n        uniform vec2 frameSize;\n        varying vec2 texturePos;\n\n        void main () {\n          vec2 pos = vec2(\n            float(int(texturePos.x) - int(texturePos.x) / int(frameSize.x) * int(frameSize.x)),\n            float(int(texturePos.y) - int(texturePos.y) / int(frameSize.y) * int(frameSize.y))\n          );\n          vec2 offset = (pos + textureOffset) / textureSize;\n          gl_FragColor = texture2D(texture, offset);\n          if (gl_FragColor.a == 0.0) discard;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Common$coloredFragmentShader = {'src': '\n\n        precision mediump float;\n        uniform vec3 color;\n\n        void main () {\n          gl_FragColor = vec4(color, 1);\n        }\n\n    '};
var _w0rm$elm_mogee$View_Common$coloredVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        uniform vec3 offset;\n        uniform vec2 size;\n\n        void main () {\n          vec2 clipSpace = position * size + offset.xy - 32.0;\n          gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n        }\n\n    '};
var _w0rm$elm_mogee$View_Common$Vertex = function (a) {
	return {position: a};
};
var _w0rm$elm_mogee$View_Common$box = _elm_community$webgl$WebGL$triangles(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple3',
			_0: _w0rm$elm_mogee$View_Common$Vertex(
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, 0)),
			_1: _w0rm$elm_mogee$View_Common$Vertex(
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, 1, 1)),
			_2: _w0rm$elm_mogee$View_Common$Vertex(
				A2(_elm_community$linear_algebra$Math_Vector2$vec2, 1, 0))
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: _w0rm$elm_mogee$View_Common$Vertex(
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, 0)),
				_1: _w0rm$elm_mogee$View_Common$Vertex(
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, 1)),
				_2: _w0rm$elm_mogee$View_Common$Vertex(
					A2(_elm_community$linear_algebra$Math_Vector2$vec2, 1, 1))
			},
			_1: {ctor: '[]'}
		}
	});
var _w0rm$elm_mogee$View_Common$rectangle = F3(
	function (_p0, l, color) {
		var _p1 = _p0;
		return A4(
			_elm_community$webgl$WebGL$entity,
			_w0rm$elm_mogee$View_Common$coloredVertexShader,
			_w0rm$elm_mogee$View_Common$coloredFragmentShader,
			_w0rm$elm_mogee$View_Common$box,
			{
				offset: A3(
					_elm_community$linear_algebra$Math_Vector3$vec3,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Basics$round(_p1.x)),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Basics$round(_p1.y)),
					l),
				color: color,
				size: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Basics$round(_p1.width)),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Basics$round(_p1.height)))
			});
	});
var _w0rm$elm_mogee$View_Common$UniformColored = F3(
	function (a, b, c) {
		return {offset: a, size: b, color: c};
	});
var _w0rm$elm_mogee$View_Common$Varying = function (a) {
	return {texturePos: a};
};

var _w0rm$elm_mogee$View_Color$toColor = F3(
	function (r, g, b) {
		return _elm_community$linear_algebra$Math_Vector3$fromTuple(
			{
				ctor: '_Tuple3',
				_0: _elm_lang$core$Basics$toFloat(r) / 255,
				_1: _elm_lang$core$Basics$toFloat(g) / 255,
				_2: _elm_lang$core$Basics$toFloat(b) / 255
			});
	});
var _w0rm$elm_mogee$View_Color$white = A3(_w0rm$elm_mogee$View_Color$toColor, 255, 255, 255);
var _w0rm$elm_mogee$View_Color$darkGreen = A3(_w0rm$elm_mogee$View_Color$toColor, 25, 30, 28);
var _w0rm$elm_mogee$View_Color$darkBlue = A3(_w0rm$elm_mogee$View_Color$toColor, 22, 17, 22);
var _w0rm$elm_mogee$View_Color$yellow = A3(_w0rm$elm_mogee$View_Color$toColor, 255, 255, 0);
var _w0rm$elm_mogee$View_Color$gray = A3(_w0rm$elm_mogee$View_Color$toColor, 100, 100, 100);

var _w0rm$elm_mogee$View_Lives$texturedVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        uniform vec3 offset;\n        uniform vec2 frameSize;\n        varying vec2 texturePos;\n\n        void main () {\n            vec2 clipSpace = position * frameSize + offset.xy - 32.0;\n            gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n            texturePos = position * frameSize;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Lives$renderDigit = F4(
	function (texture, _p0, index, number) {
		var _p1 = _p0;
		return A4(
			_elm_community$webgl$WebGL$entity,
			_w0rm$elm_mogee$View_Lives$texturedVertexShader,
			_w0rm$elm_mogee$View_Common$texturedFragmentShader,
			_w0rm$elm_mogee$View_Common$box,
			{
				offset: _elm_community$linear_algebra$Math_Vector3$fromTuple(
					{
						ctor: '_Tuple3',
						_0: _p1._0 + (_elm_lang$core$Basics$toFloat(index) * 4),
						_1: _p1._1,
						_2: _p1._2
					}),
				texture: texture,
				textureOffset: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(number) * 3,
					15),
				textureSize: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$first(
							_elm_community$webgl$WebGL_Texture$size(texture))),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$second(
							_elm_community$webgl$WebGL_Texture$size(texture)))),
				frameSize: A2(_elm_community$linear_algebra$Math_Vector2$vec2, 3, 4)
			});
	});
var _w0rm$elm_mogee$View_Lives$digitsList = function (n) {
	var r = A2(_elm_lang$core$Basics_ops['%'], n, 10);
	var nn = (n / 10) | 0;
	return (_elm_lang$core$Native_Utils.eq(nn, 0) && _elm_lang$core$Native_Utils.eq(r, 0)) ? {ctor: '[]'} : {
		ctor: '::',
		_0: r,
		_1: _w0rm$elm_mogee$View_Lives$digitsList(nn)
	};
};
var _w0rm$elm_mogee$View_Lives$renderScore = F3(
	function (texture, _p2, value) {
		var _p3 = _p2;
		var digits = _elm_lang$core$List$reverse(
			_w0rm$elm_mogee$View_Lives$digitsList(value));
		var position = {
			ctor: '_Tuple3',
			_0: _p3._0 - (_elm_lang$core$Basics$toFloat(
				_elm_lang$core$List$length(digits)) * 2),
			_1: _p3._1,
			_2: _p3._2
		};
		return _elm_lang$core$Native_Utils.eq(value, 0) ? {ctor: '[]'} : A2(
			_elm_lang$core$List$indexedMap,
			A2(_w0rm$elm_mogee$View_Lives$renderDigit, texture, position),
			digits);
	});
var _w0rm$elm_mogee$View_Lives$liveSprite = _w0rm$elm_mogee$View_Sprite$sprite('life');
var _w0rm$elm_mogee$View_Lives$renderLives = F3(
	function (sprite, _p4, lives) {
		var _p5 = _p4;
		return A2(
			_elm_lang$core$List$map,
			function (i) {
				return A3(
					_w0rm$elm_mogee$View_Sprite$render,
					_w0rm$elm_mogee$View_Lives$liveSprite,
					sprite,
					{
						ctor: '_Tuple3',
						_0: _p5._0 + (_elm_lang$core$Basics$toFloat(i) * 6),
						_1: _p5._1,
						_2: _p5._2
					});
			},
			A2(_elm_lang$core$List$range, 0, lives - 1));
	});
var _w0rm$elm_mogee$View_Lives$UniformTextured = F5(
	function (a, b, c, d, e) {
		return {offset: a, frameSize: b, textureOffset: c, texture: d, textureSize: e};
	});
var _w0rm$elm_mogee$View_Lives$Varying = function (a) {
	return {texturePos: a};
};

var _w0rm$elm_mogee$View_Mogee$texturedVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        uniform vec3 offset;\n        uniform float mirror;\n        uniform vec2 frameSize;\n        varying vec2 texturePos;\n\n        void main () {\n          vec2 clipSpace = position * frameSize + offset.xy - 32.0;\n          gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n          texturePos = vec2((position.x - 0.5) * mirror + 0.5, position.y) * frameSize;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Mogee$getFrame = function (frames) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		_elm_lang$core$List$head(frames));
};
var _w0rm$elm_mogee$View_Mogee$render = F4(
	function (texture, _p0, directionX, mogee) {
		var _p1 = _p0;
		var mirror = (_elm_lang$core$Native_Utils.cmp(directionX, 0) < 0) ? -1 : 1;
		var layer = _elm_lang$core$Native_Utils.eq(mogee.state, _w0rm$elm_mogee$Components_Mogee$Dead) ? 1 : 4;
		return A4(
			_elm_community$webgl$WebGL$entity,
			_w0rm$elm_mogee$View_Mogee$texturedVertexShader,
			_w0rm$elm_mogee$View_Common$texturedFragmentShader,
			_w0rm$elm_mogee$View_Common$box,
			{
				offset: _elm_community$linear_algebra$Math_Vector3$fromTuple(
					{
						ctor: '_Tuple3',
						_0: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p1._0)),
						_1: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p1._1)),
						_2: layer
					}),
				texture: texture,
				mirror: mirror,
				textureSize: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$first(
							_elm_community$webgl$WebGL_Texture$size(texture))),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$second(
							_elm_community$webgl$WebGL_Texture$size(texture)))),
				frameSize: A2(_elm_community$linear_algebra$Math_Vector2$vec2, _w0rm$elm_mogee$Components_Mogee$width, _w0rm$elm_mogee$Components_Mogee$height),
				textureOffset: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_w0rm$elm_mogee$Components_Mogee$width * _w0rm$elm_mogee$View_Mogee$getFrame(mogee.frames),
					0)
			});
	});
var _w0rm$elm_mogee$View_Mogee$UniformTextured = F6(
	function (a, b, c, d, e, f) {
		return {frameSize: a, offset: b, mirror: c, texture: d, textureSize: e, textureOffset: f};
	});
var _w0rm$elm_mogee$View_Mogee$Varying = function (a) {
	return {texturePos: a};
};

var _w0rm$elm_mogee$View_Wall$texturedVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        uniform vec3 offset;\n        uniform vec2 size;\n        varying vec2 texturePos;\n\n        void main () {\n          vec2 clipSpace = position * size + offset.xy - 32.0;\n          gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n          texturePos = position * size;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Wall$render = F2(
	function (texture, _p0) {
		var _p1 = _p0;
		var _p3 = _p1.width;
		var _p2 = _p1.height;
		return A4(
			_elm_community$webgl$WebGL$entity,
			_w0rm$elm_mogee$View_Wall$texturedVertexShader,
			_w0rm$elm_mogee$View_Common$texturedFragmentShader,
			_w0rm$elm_mogee$View_Common$box,
			{
				offset: _elm_community$linear_algebra$Math_Vector3$fromTuple(
					{ctor: '_Tuple3', _0: _p1.x, _1: _p1.y, _2: 3}),
				texture: texture,
				textureSize: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$first(
							_elm_community$webgl$WebGL_Texture$size(texture))),
					_elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$second(
							_elm_community$webgl$WebGL_Texture$size(texture)))),
				textureOffset: A2(_elm_community$linear_algebra$Math_Vector2$vec2, 0, 10),
				frameSize: A2(_elm_community$linear_algebra$Math_Vector2$vec2, 64, 5),
				size: A2(
					_elm_community$linear_algebra$Math_Vector2$vec2,
					_p3,
					(_elm_lang$core$Native_Utils.eq(_p3, 1) || _elm_lang$core$Native_Utils.eq(_p2, 1)) ? _p2 : (_p2 + 3))
			});
	});
var _w0rm$elm_mogee$View_Wall$UniformTextured = F6(
	function (a, b, c, d, e, f) {
		return {size: a, offset: b, texture: c, textureSize: d, frameSize: e, textureOffset: f};
	});
var _w0rm$elm_mogee$View_Wall$Varying = function (a) {
	return {texturePos: a};
};

var _w0rm$elm_mogee$View_Screen$texturedVertexShader = {'src': '\n\n        precision mediump float;\n        attribute vec2 position;\n        uniform vec3 offset;\n        uniform vec2 frameSize;\n        uniform mat4 transform;\n        varying vec2 texturePos;\n\n        void main () {\n          vec2 clipSpace = vec2(transform * vec4(position * frameSize, 0, 1)) + offset.xy - 32.0;\n          gl_Position = vec4(clipSpace.x, -clipSpace.y, offset.z, 32.0);\n          texturePos = position * frameSize;\n        }\n\n    '};
var _w0rm$elm_mogee$View_Screen$fadeOffset = function (_p0) {
	var _p1 = _p0;
	return _elm_community$linear_algebra$Math_Vector3$fromTuple(
		{
			ctor: '_Tuple3',
			_0: _elm_lang$core$Basics$toFloat(
				_elm_lang$core$Basics$round(_p1._0)),
			_1: _elm_lang$core$Basics$toFloat(
				_elm_lang$core$Basics$round(_p1._1)),
			_2: 2
		});
};
var _w0rm$elm_mogee$View_Screen$screenOffset = F3(
	function (_p3, _p2, direction) {
		var _p4 = _p3;
		var _p8 = _p4._1;
		var _p7 = _p4._0;
		var _p5 = _p2;
		var _p6 = direction;
		switch (_p6.ctor) {
			case 'Right':
				return _elm_community$linear_algebra$Math_Vector3$fromTuple(
					{
						ctor: '_Tuple3',
						_0: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p7 - _p5._0)),
						_1: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p8)),
						_2: 2
					});
			case 'Bottom':
				return _elm_community$linear_algebra$Math_Vector3$fromTuple(
					{
						ctor: '_Tuple3',
						_0: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p7)),
						_1: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p8 - _p5._1)),
						_2: 2
					});
			default:
				return _elm_community$linear_algebra$Math_Vector3$fromTuple(
					{
						ctor: '_Tuple3',
						_0: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p7)),
						_1: _elm_lang$core$Basics$toFloat(
							_elm_lang$core$Basics$round(_p8)),
						_2: 2
					});
		}
	});
var _w0rm$elm_mogee$View_Screen$fadeOutTransform = F2(
	function (from, to) {
		var _p9 = {ctor: '_Tuple2', _0: from, _1: to};
		_v4_4:
		do {
			if (_p9.ctor === '_Tuple2') {
				switch (_p9._0.ctor) {
					case 'Bottom':
						if (_p9._1.ctor === 'Right') {
							return A2(
								_elm_community$linear_algebra$Math_Matrix4$mul,
								A2(
									_elm_community$linear_algebra$Math_Matrix4$makeRotate,
									_elm_lang$core$Basics$pi,
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 1, 0)),
								A2(
									_elm_community$linear_algebra$Math_Matrix4$makeRotate,
									_elm_lang$core$Basics$pi / 2,
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 1)));
						} else {
							break _v4_4;
						}
					case 'Right':
						switch (_p9._1.ctor) {
							case 'Bottom':
								return _elm_community$linear_algebra$Math_Matrix4$makeTranslate(
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 0));
							case 'Top':
								return A2(
									_elm_community$linear_algebra$Math_Matrix4$mul,
									_elm_community$linear_algebra$Math_Matrix4$makeTranslate(
										A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 0)),
									A2(
										_elm_community$linear_algebra$Math_Matrix4$makeRotate,
										_elm_lang$core$Basics$pi,
										A3(_elm_community$linear_algebra$Math_Vector3$vec3, 1, 0, 0)));
							default:
								break _v4_4;
						}
					case 'Top':
						if (_p9._1.ctor === 'Right') {
							return A2(
								_elm_community$linear_algebra$Math_Matrix4$mul,
								_elm_community$linear_algebra$Math_Matrix4$makeTranslate(
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 64, 0)),
								A2(
									_elm_community$linear_algebra$Math_Matrix4$makeRotate,
									(0 - _elm_lang$core$Basics$pi) / 2,
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 1)));
						} else {
							break _v4_4;
						}
					default:
						break _v4_4;
				}
			} else {
				break _v4_4;
			}
		} while(false);
		return _elm_community$linear_algebra$Math_Matrix4$makeTranslate(
			A3(_elm_community$linear_algebra$Math_Vector3$vec3, -64, -64, 0));
	});
var _w0rm$elm_mogee$View_Screen$fadeInTransform = F2(
	function (from, to) {
		var _p10 = {ctor: '_Tuple2', _0: from, _1: to};
		_v5_4:
		do {
			if (_p10.ctor === '_Tuple2') {
				switch (_p10._0.ctor) {
					case 'Bottom':
						if (_p10._1.ctor === 'Right') {
							return _elm_community$linear_algebra$Math_Matrix4$identity;
						} else {
							break _v5_4;
						}
					case 'Right':
						switch (_p10._1.ctor) {
							case 'Bottom':
								return A2(
									_elm_community$linear_algebra$Math_Matrix4$mul,
									_elm_community$linear_algebra$Math_Matrix4$makeTranslate(
										A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 0)),
									A2(
										_elm_community$linear_algebra$Math_Matrix4$mul,
										A2(
											_elm_community$linear_algebra$Math_Matrix4$makeRotate,
											_elm_lang$core$Basics$pi,
											A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 1, 0)),
										A2(
											_elm_community$linear_algebra$Math_Matrix4$makeRotate,
											_elm_lang$core$Basics$pi / 2,
											A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 1))));
							case 'Top':
								return A2(
									_elm_community$linear_algebra$Math_Matrix4$makeRotate,
									(0 - _elm_lang$core$Basics$pi) / 2,
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 1));
							default:
								break _v5_4;
						}
					case 'Top':
						if (_p10._1.ctor === 'Right') {
							return A2(
								_elm_community$linear_algebra$Math_Matrix4$mul,
								_elm_community$linear_algebra$Math_Matrix4$makeTranslate(
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 64, 0)),
								A2(
									_elm_community$linear_algebra$Math_Matrix4$makeRotate,
									_elm_lang$core$Basics$pi,
									A3(_elm_community$linear_algebra$Math_Vector3$vec3, 1, 0, 0)));
						} else {
							break _v5_4;
						}
					default:
						break _v5_4;
				}
			} else {
				break _v5_4;
			}
		} while(false);
		return _elm_community$linear_algebra$Math_Matrix4$makeTranslate(
			A3(_elm_community$linear_algebra$Math_Vector3$vec3, -64, -64, 0));
	});
var _w0rm$elm_mogee$View_Screen$movingTransform = function (direction) {
	var _p11 = direction;
	switch (_p11.ctor) {
		case 'Left':
			return _elm_community$linear_algebra$Math_Matrix4$identity;
		case 'Right':
			return _elm_community$linear_algebra$Math_Matrix4$makeTranslate(
				A3(_elm_community$linear_algebra$Math_Vector3$vec3, 64, 0, 0));
		case 'Top':
			return A2(
				_elm_community$linear_algebra$Math_Matrix4$makeRotate,
				(0 - _elm_lang$core$Basics$pi) / 2,
				A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 1));
		default:
			return A2(
				_elm_community$linear_algebra$Math_Matrix4$mul,
				_elm_community$linear_algebra$Math_Matrix4$makeTranslate(
					A3(_elm_community$linear_algebra$Math_Vector3$vec3, 64, 64, 0)),
				A2(
					_elm_community$linear_algebra$Math_Matrix4$makeRotate,
					_elm_lang$core$Basics$pi / 2,
					A3(_elm_community$linear_algebra$Math_Vector3$vec3, 0, 0, 1)));
	}
};
var _w0rm$elm_mogee$View_Screen$frameOffset = F2(
	function (list, frame) {
		return _elm_lang$core$Basics$toFloat(
			A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$drop,
						_elm_lang$core$Basics$truncate(frame),
						list))));
	});
var _w0rm$elm_mogee$View_Screen$fadeIn = {
	ctor: '::',
	_0: 12,
	_1: {
		ctor: '::',
		_0: 12,
		_1: {
			ctor: '::',
			_0: 7,
			_1: {
				ctor: '::',
				_0: 8,
				_1: {
					ctor: '::',
					_0: 9,
					_1: {
						ctor: '::',
						_0: 10,
						_1: {
							ctor: '::',
							_0: 11,
							_1: {
								ctor: '::',
								_0: 0,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$View_Screen$fadeOut = _elm_lang$core$List$reverse(_w0rm$elm_mogee$View_Screen$fadeIn);
var _w0rm$elm_mogee$View_Screen$move = {
	ctor: '::',
	_0: 0,
	_1: {
		ctor: '::',
		_0: 1,
		_1: {
			ctor: '::',
			_0: 2,
			_1: {
				ctor: '::',
				_0: 3,
				_1: {
					ctor: '::',
					_0: 0,
					_1: {
						ctor: '::',
						_0: 4,
						_1: {
							ctor: '::',
							_0: 5,
							_1: {
								ctor: '::',
								_0: 6,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _w0rm$elm_mogee$View_Screen$render = F4(
	function (texture, position, size, _p12) {
		var _p13 = _p12;
		var _p18 = _p13.to;
		var _p17 = _p13.from;
		var _p16 = _p13.frame;
		var _p14 = _p13.state;
		switch (_p14.ctor) {
			case 'Initial':
				return _elm_lang$core$Basics$identity;
			case 'Rotating':
				return function (_p15) {
					return A2(
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							}),
						A4(
							_elm_community$webgl$WebGL$entity,
							_w0rm$elm_mogee$View_Screen$texturedVertexShader,
							_w0rm$elm_mogee$View_Common$texturedFragmentShader,
							_w0rm$elm_mogee$View_Common$box,
							{
								offset: _w0rm$elm_mogee$View_Screen$fadeOffset(position),
								texture: texture,
								textureSize: A2(
									_elm_community$linear_algebra$Math_Vector2$vec2,
									_elm_lang$core$Basics$toFloat(
										_elm_lang$core$Tuple$first(
											_elm_community$webgl$WebGL_Texture$size(texture))),
									_elm_lang$core$Basics$toFloat(
										_elm_lang$core$Tuple$second(
											_elm_community$webgl$WebGL_Texture$size(texture)))),
								textureOffset: A2(
									_elm_community$linear_algebra$Math_Vector2$vec2,
									64 + (10 * A2(_w0rm$elm_mogee$View_Screen$frameOffset, _w0rm$elm_mogee$View_Screen$fadeOut, _p16)),
									0),
								frameSize: A2(_elm_community$linear_algebra$Math_Vector2$vec2, 10, 64),
								transform: A2(_w0rm$elm_mogee$View_Screen$fadeOutTransform, _p17, _p18)
							}),
						A2(
							F2(
								function (x, y) {
									return {ctor: '::', _0: x, _1: y};
								}),
							A4(
								_elm_community$webgl$WebGL$entity,
								_w0rm$elm_mogee$View_Screen$texturedVertexShader,
								_w0rm$elm_mogee$View_Common$texturedFragmentShader,
								_w0rm$elm_mogee$View_Common$box,
								{
									offset: _w0rm$elm_mogee$View_Screen$fadeOffset(position),
									texture: texture,
									textureSize: A2(
										_elm_community$linear_algebra$Math_Vector2$vec2,
										_elm_lang$core$Basics$toFloat(
											_elm_lang$core$Tuple$first(
												_elm_community$webgl$WebGL_Texture$size(texture))),
										_elm_lang$core$Basics$toFloat(
											_elm_lang$core$Tuple$second(
												_elm_community$webgl$WebGL_Texture$size(texture)))),
									textureOffset: A2(
										_elm_community$linear_algebra$Math_Vector2$vec2,
										64 + (10 * A2(_w0rm$elm_mogee$View_Screen$frameOffset, _w0rm$elm_mogee$View_Screen$fadeIn, _p16)),
										0),
									frameSize: A2(_elm_community$linear_algebra$Math_Vector2$vec2, 10, 64),
									transform: A2(_w0rm$elm_mogee$View_Screen$fadeInTransform, _p17, _p18)
								}),
							_p15));
				};
			default:
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A4(
						_elm_community$webgl$WebGL$entity,
						_w0rm$elm_mogee$View_Screen$texturedVertexShader,
						_w0rm$elm_mogee$View_Common$texturedFragmentShader,
						_w0rm$elm_mogee$View_Common$box,
						{
							offset: A3(_w0rm$elm_mogee$View_Screen$screenOffset, position, size, _p18),
							texture: texture,
							textureSize: A2(
								_elm_community$linear_algebra$Math_Vector2$vec2,
								_elm_lang$core$Basics$toFloat(
									_elm_lang$core$Tuple$first(
										_elm_community$webgl$WebGL_Texture$size(texture))),
								_elm_lang$core$Basics$toFloat(
									_elm_lang$core$Tuple$second(
										_elm_community$webgl$WebGL_Texture$size(texture)))),
							textureOffset: A2(
								_elm_community$linear_algebra$Math_Vector2$vec2,
								64 + (10 * A2(_w0rm$elm_mogee$View_Screen$frameOffset, _w0rm$elm_mogee$View_Screen$move, _p16)),
								0),
							frameSize: A2(_elm_community$linear_algebra$Math_Vector2$vec2, 10, 64),
							transform: _w0rm$elm_mogee$View_Screen$movingTransform(_p18)
						}));
		}
	});
var _w0rm$elm_mogee$View_Screen$UniformTextured = F6(
	function (a, b, c, d, e, f) {
		return {offset: a, transform: b, texture: c, textureSize: d, textureOffset: e, frameSize: f};
	});
var _w0rm$elm_mogee$View_Screen$Varying = function (a) {
	return {texturePos: a};
};

var _w0rm$elm_mogee$View_Components$renderScreens = F4(
	function (texture, offset, _p0, entities) {
		var _p1 = _p0;
		return A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F3(
				function (_p2, screen, transform) {
					var monster = A2(
						_w0rm$elm_mogee$Components_Transform$offsetBy,
						offset,
						A2(_w0rm$elm_mogee$Components_Transform$invertScreen, screen.to, transform));
					var screenTransform = A2(_w0rm$elm_mogee$Components_Transform$offsetBy, offset, transform);
					return function (_p3) {
						return A5(
							_w0rm$elm_mogee$View_Screen$render,
							texture,
							{ctor: '_Tuple2', _0: monster.x, _1: monster.y},
							{ctor: '_Tuple2', _0: transform.width, _1: transform.height},
							screen,
							A2(
								F2(
									function (x, y) {
										return {ctor: '::', _0: x, _1: y};
									}),
								A3(_w0rm$elm_mogee$View_Common$rectangle, monster, 2, _w0rm$elm_mogee$View_Color$darkBlue),
								A2(
									F2(
										function (x, y) {
											return {ctor: '::', _0: x, _1: y};
										}),
									A3(_w0rm$elm_mogee$View_Common$rectangle, screenTransform, 5, _w0rm$elm_mogee$View_Color$darkGreen),
									_p3)));
					};
				}),
			entities,
			_p1.screens,
			_p1.transforms);
	});
var _w0rm$elm_mogee$View_Components$renderMogee = F4(
	function (texture, directionX, _p4, entities) {
		var _p5 = _p4;
		return A3(
			_w0rm$elm_mogee$Components_Components$foldl,
			F2(
				function (_p6, mogee) {
					return F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(
						A4(
							_w0rm$elm_mogee$View_Mogee$render,
							texture,
							{ctor: '_Tuple2', _0: 28, _1: 27},
							directionX,
							mogee));
				}),
			entities,
			_p5.mogees);
	});
var _w0rm$elm_mogee$View_Components$renderWalls = F4(
	function (texture, offset, _p7, entities) {
		var _p8 = _p7;
		return A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F3(
				function (_p10, _p9, transform) {
					return F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(
						A2(
							_w0rm$elm_mogee$View_Wall$render,
							texture,
							A2(_w0rm$elm_mogee$Components_Transform$offsetBy, offset, transform)));
				}),
			entities,
			_p8.walls,
			_p8.transforms);
	});
var _w0rm$elm_mogee$View_Components$render = F4(
	function (texture, directionX, offset, components) {
		return function (_p11) {
			return A4(
				_w0rm$elm_mogee$View_Components$renderScreens,
				texture,
				offset,
				components,
				A4(
					_w0rm$elm_mogee$View_Components$renderMogee,
					texture,
					directionX,
					components,
					A4(_w0rm$elm_mogee$View_Components$renderWalls, texture, offset, components, _p11)));
		};
	});

var _w0rm$elm_mogee$View_Menu$selectionSprite = _w0rm$elm_mogee$View_Sprite$sprite('arrow');
var _w0rm$elm_mogee$View_Menu$creditsScreenText = _w0rm$elm_mogee$View_Font$text('Art, code, sound:\n@gmnabl,\n@unsoundscapes,\n@carlospazuzu.');
var _w0rm$elm_mogee$View_Menu$logoSprite = _w0rm$elm_mogee$View_Sprite$sprite('logo');
var _w0rm$elm_mogee$View_Menu$slidesText = _w0rm$elm_mogee$View_Font$text('slides');
var _w0rm$elm_mogee$View_Menu$creditsText = _w0rm$elm_mogee$View_Font$text('credits');
var _w0rm$elm_mogee$View_Menu$soundOffText = _w0rm$elm_mogee$View_Font$text('sound: off');
var _w0rm$elm_mogee$View_Menu$soundOnText = _w0rm$elm_mogee$View_Font$text('sound: on');
var _w0rm$elm_mogee$View_Menu$soundText = function (on) {
	return on ? _w0rm$elm_mogee$View_Menu$soundOnText : _w0rm$elm_mogee$View_Menu$soundOffText;
};
var _w0rm$elm_mogee$View_Menu$endText = _w0rm$elm_mogee$View_Font$text('end game');
var _w0rm$elm_mogee$View_Menu$resumeText = _w0rm$elm_mogee$View_Font$text('resume');
var _w0rm$elm_mogee$View_Menu$menuText = _w0rm$elm_mogee$View_Font$text('menu');
var _w0rm$elm_mogee$View_Menu$newGameText = _w0rm$elm_mogee$View_Font$text('new game');
var _w0rm$elm_mogee$View_Menu$roundFloat = function (_p0) {
	return _elm_lang$core$Basics$toFloat(
		_elm_lang$core$Basics$round(_p0));
};
var _w0rm$elm_mogee$View_Menu$menuTop = 20;
var _w0rm$elm_mogee$View_Menu$homeTop = 40;
var _w0rm$elm_mogee$View_Menu$cursorPosition = F2(
	function (_p1, yOffset) {
		var _p2 = _p1;
		var _p3 = _p2.section;
		return (_elm_lang$core$Native_Utils.eq(
			_p3,
			_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$StartTheGame)) || (_elm_lang$core$Native_Utils.eq(
			_p3,
			_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$SoundOnOff)) || _elm_lang$core$Native_Utils.eq(
			_p3,
			_w0rm$elm_mogee$Components_Menu$PauseSection(_w0rm$elm_mogee$Components_Menu$ResumeGame)))) ? {ctor: '_Tuple3', _0: 9, _1: 3 + yOffset, _2: 0} : ((_elm_lang$core$Native_Utils.eq(
			_p3,
			_w0rm$elm_mogee$Components_Menu$HomeSection(_w0rm$elm_mogee$Components_Menu$GoToMenu)) || (_elm_lang$core$Native_Utils.eq(
			_p3,
			_w0rm$elm_mogee$Components_Menu$MenuSection(_w0rm$elm_mogee$Components_Menu$GoToCredits)) || _elm_lang$core$Native_Utils.eq(
			_p3,
			_w0rm$elm_mogee$Components_Menu$PauseSection(_w0rm$elm_mogee$Components_Menu$EndGame)))) ? {ctor: '_Tuple3', _0: 9, _1: 14 + yOffset, _2: 0} : {ctor: '_Tuple3', _0: 9, _1: 25 + yOffset, _2: 0});
	});
var _w0rm$elm_mogee$View_Menu$titleAnimation = A2(
	_mgold$elm_animation$Animation$delay,
	0.5 * _elm_lang$core$Time$second,
	A2(
		_mgold$elm_animation$Animation$duration,
		1 * _elm_lang$core$Time$second,
		A2(
			_mgold$elm_animation$Animation$ease,
			_elm_community$easing_functions$Ease$outBounce,
			A2(
				_mgold$elm_animation$Animation$to,
				14,
				A2(
					_mgold$elm_animation$Animation$from,
					-24,
					_mgold$elm_animation$Animation$animation(0))))));
var _w0rm$elm_mogee$View_Menu$render = F4(
	function (sound, font, sprite, menu) {
		var _p4 = menu.section;
		switch (_p4.ctor) {
			case 'HomeSection':
				return {
					ctor: '::',
					_0: A4(
						_w0rm$elm_mogee$View_Font$render,
						_w0rm$elm_mogee$View_Color$white,
						_w0rm$elm_mogee$View_Menu$newGameText,
						font,
						{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$homeTop, _2: 0}),
					_1: {
						ctor: '::',
						_0: A4(
							_w0rm$elm_mogee$View_Font$render,
							_w0rm$elm_mogee$View_Color$white,
							_w0rm$elm_mogee$View_Menu$menuText,
							font,
							{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$homeTop + 11, _2: 0}),
						_1: {
							ctor: '::',
							_0: A3(
								_w0rm$elm_mogee$View_Sprite$render,
								_w0rm$elm_mogee$View_Menu$selectionSprite,
								sprite,
								A2(_w0rm$elm_mogee$View_Menu$cursorPosition, menu, _w0rm$elm_mogee$View_Menu$homeTop)),
							_1: {
								ctor: '::',
								_0: A3(
									_w0rm$elm_mogee$View_Sprite$render,
									_w0rm$elm_mogee$View_Menu$logoSprite,
									sprite,
									{
										ctor: '_Tuple3',
										_0: 3,
										_1: _w0rm$elm_mogee$View_Menu$roundFloat(
											A2(_mgold$elm_animation$Animation$animate, menu.time, _w0rm$elm_mogee$View_Menu$titleAnimation)),
										_2: 0
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				};
			case 'PauseSection':
				return {
					ctor: '::',
					_0: A4(
						_w0rm$elm_mogee$View_Font$render,
						_w0rm$elm_mogee$View_Color$white,
						_w0rm$elm_mogee$View_Menu$resumeText,
						font,
						{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$homeTop, _2: 0}),
					_1: {
						ctor: '::',
						_0: A4(
							_w0rm$elm_mogee$View_Font$render,
							_w0rm$elm_mogee$View_Color$white,
							_w0rm$elm_mogee$View_Menu$endText,
							font,
							{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$homeTop + 11, _2: 0}),
						_1: {
							ctor: '::',
							_0: A3(
								_w0rm$elm_mogee$View_Sprite$render,
								_w0rm$elm_mogee$View_Menu$selectionSprite,
								sprite,
								A2(_w0rm$elm_mogee$View_Menu$cursorPosition, menu, _w0rm$elm_mogee$View_Menu$homeTop)),
							_1: {ctor: '[]'}
						}
					}
				};
			case 'MenuSection':
				return {
					ctor: '::',
					_0: A4(
						_w0rm$elm_mogee$View_Font$render,
						_w0rm$elm_mogee$View_Color$white,
						_w0rm$elm_mogee$View_Menu$soundText(sound),
						font,
						{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$menuTop, _2: 0}),
					_1: {
						ctor: '::',
						_0: A4(
							_w0rm$elm_mogee$View_Font$render,
							_w0rm$elm_mogee$View_Color$white,
							_w0rm$elm_mogee$View_Menu$creditsText,
							font,
							{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$menuTop + 11, _2: 0}),
						_1: {
							ctor: '::',
							_0: A4(
								_w0rm$elm_mogee$View_Font$render,
								_w0rm$elm_mogee$View_Color$white,
								_w0rm$elm_mogee$View_Menu$slidesText,
								font,
								{ctor: '_Tuple3', _0: 15, _1: _w0rm$elm_mogee$View_Menu$menuTop + 22, _2: 0}),
							_1: {
								ctor: '::',
								_0: A3(
									_w0rm$elm_mogee$View_Sprite$render,
									_w0rm$elm_mogee$View_Menu$selectionSprite,
									sprite,
									A2(_w0rm$elm_mogee$View_Menu$cursorPosition, menu, _w0rm$elm_mogee$View_Menu$menuTop)),
								_1: {ctor: '[]'}
							}
						}
					}
				};
			case 'CreditsSection':
				return {
					ctor: '::',
					_0: A4(
						_w0rm$elm_mogee$View_Font$render,
						_w0rm$elm_mogee$View_Color$white,
						_w0rm$elm_mogee$View_Menu$creditsScreenText,
						font,
						{ctor: '_Tuple3', _0: 2, _1: 10, _2: 0}),
					_1: {ctor: '[]'}
				};
			default:
				return {ctor: '[]'};
		}
	});

var _w0rm$elm_mogee$Slides_View$roundFloat = function (_p0) {
	return _elm_lang$core$Basics$toFloat(
		_elm_lang$core$Basics$round(_p0));
};
var _w0rm$elm_mogee$Slides_View$renderElement = F5(
	function (sprite, font, element, x, y) {
		var _p1 = element;
		if (_p1.ctor === 'SpriteElement') {
			return A3(
				_w0rm$elm_mogee$View_Sprite$render,
				_p1._0,
				sprite,
				{
					ctor: '_Tuple3',
					_0: _w0rm$elm_mogee$Slides_View$roundFloat(x),
					_1: _w0rm$elm_mogee$Slides_View$roundFloat(y),
					_2: 0
				});
		} else {
			return A4(
				_w0rm$elm_mogee$View_Font$render,
				_w0rm$elm_mogee$View_Color$white,
				_p1._0,
				font,
				{
					ctor: '_Tuple3',
					_0: _w0rm$elm_mogee$Slides_View$roundFloat(x),
					_1: _w0rm$elm_mogee$Slides_View$roundFloat(y),
					_2: 0
				});
		}
	});
var _w0rm$elm_mogee$Slides_View$render = F3(
	function (sprite, font, _p2) {
		var _p3 = _p2;
		var _p9 = _p3.time;
		return A3(
			_elm_lang$core$Dict$foldr,
			F2(
				function (elementId, _p4) {
					var _p5 = _p4;
					var _p8 = _p5.position;
					var _p7 = _p5.element;
					var _p6 = A2(_elm_lang$core$Dict$get, elementId, _p3.animations);
					if (_p6.ctor === 'Just') {
						return F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(
							A5(
								_w0rm$elm_mogee$Slides_View$renderElement,
								sprite,
								font,
								_p7,
								A2(_mgold$elm_animation$Animation$animate, _p9, _p6._0.x),
								A2(_mgold$elm_animation$Animation$animate, _p9, _p6._0.y)));
					} else {
						return F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(
							A5(_w0rm$elm_mogee$Slides_View$renderElement, sprite, font, _p7, _p8.x, _p8.y));
					}
				}),
			{ctor: '[]'},
			_p3.elements);
	});

var _w0rm$elm_mogee$View$continueText = _w0rm$elm_mogee$View_Font$text('press enter\nto continue');
var _w0rm$elm_mogee$View$toMinimap = function (_p0) {
	var _p1 = _p0;
	return {
		x: _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Basics$floor(_p1.x / 64)),
		y: _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Basics$floor(_p1.y / 64)),
		width: 1,
		height: 1
	};
};
var _w0rm$elm_mogee$View$renderGame = F4(
	function (model, texture, font, sprite) {
		var allScr = A4(
			_w0rm$elm_mogee$Components_Components$foldl2,
			F4(
				function (_p3, _p2, position, positions) {
					return {
						ctor: '::',
						_0: _w0rm$elm_mogee$View$toMinimap(position),
						_1: positions
					};
				}),
			{ctor: '[]'},
			model.components.screens,
			model.components.transforms);
		var maxX = A2(
			_elm_lang$core$Maybe$withDefault,
			0,
			_elm_lang$core$List$maximum(
				A2(
					_elm_lang$core$List$map,
					function (_) {
						return _.x;
					},
					allScr)));
		var minY = A2(
			_elm_lang$core$Maybe$withDefault,
			0,
			_elm_lang$core$List$minimum(
				A2(
					_elm_lang$core$List$map,
					function (_) {
						return _.y;
					},
					allScr)));
		var mogeeTransform = _w0rm$elm_mogee$Components_Components$mogeeOffset(model.components);
		var offset = {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$toFloat(
				_elm_lang$core$Basics$round(mogeeTransform.x) - 28),
			_1: _elm_lang$core$Basics$toFloat(
				_elm_lang$core$Basics$round(mogeeTransform.y) - 27)
		};
		var mogeeMinimap = _w0rm$elm_mogee$View$toMinimap(mogeeTransform);
		var dot = function (transform) {
			return A3(
				_w0rm$elm_mogee$View_Common$rectangle,
				A2(
					_w0rm$elm_mogee$Components_Transform$offsetBy,
					{ctor: '_Tuple2', _0: maxX - 62, _1: minY - 1},
					transform),
				0,
				_elm_lang$core$Native_Utils.eq(transform, mogeeMinimap) ? _w0rm$elm_mogee$View_Color$yellow : _w0rm$elm_mogee$View_Color$gray);
		};
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A3(
				_w0rm$elm_mogee$View_Lives$renderLives,
				sprite,
				{ctor: '_Tuple3', _0: 1, _1: 1, _2: 0},
				model.lives),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A3(
					_w0rm$elm_mogee$View_Lives$renderScore,
					texture,
					{ctor: '_Tuple3', _0: 32, _1: 1, _2: 0},
					model.systems.currentScore + model.score),
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_elm_lang$core$List$map, dot, allScr),
					A5(
						_w0rm$elm_mogee$View_Components$render,
						texture,
						_w0rm$elm_mogee$Components_Keys$directions(model.keys).x,
						offset,
						model.components,
						{ctor: '[]'}))));
	});
var _w0rm$elm_mogee$View$render = F4(
	function (model, texture, font, sprite) {
		var _p4 = model.state;
		switch (_p4.ctor) {
			case 'Initial':
				var _p5 = _p4._0;
				return _elm_lang$core$Native_Utils.eq(_p5.section, _w0rm$elm_mogee$Components_Menu$SlidesSection) ? A3(_w0rm$elm_mogee$Slides_View$render, sprite, font, model.slides) : A4(_w0rm$elm_mogee$View_Menu$render, model.sound, font, sprite, _p5);
			case 'Paused':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					A4(_w0rm$elm_mogee$View_Menu$render, model.sound, font, sprite, _p4._0),
					A4(_w0rm$elm_mogee$View$renderGame, model, texture, font, sprite));
			case 'Dead':
				return {
					ctor: '::',
					_0: A4(
						_w0rm$elm_mogee$View_Font$render,
						_w0rm$elm_mogee$View_Color$white,
						_w0rm$elm_mogee$View$continueText,
						font,
						{ctor: '_Tuple3', _0: 12, _1: 40, _2: 0}),
					_1: A4(_w0rm$elm_mogee$View$renderGame, model, texture, font, sprite)
				};
			default:
				return A4(_w0rm$elm_mogee$View$renderGame, model, texture, font, sprite);
		}
	});
var _w0rm$elm_mogee$View$view = function (model) {
	return A3(
		_elm_community$webgl$WebGL$toHtmlWith,
		{
			ctor: '::',
			_0: _elm_community$webgl$WebGL$depth(1),
			_1: {
				ctor: '::',
				_0: A4(_elm_community$webgl$WebGL$clearColor, 22 / 255, 17 / 255, 22 / 255, 0),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$width(model.size),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$height(model.size),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'display', _1: 'block'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'top', _1: '50%'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'left', _1: '50%'},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'margin-top',
												_1: A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Basics$toString(((0 - model.size) / 2) | 0),
													'px')
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'margin-left',
													_1: A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$Basics$toString(((0 - model.size) / 2) | 0),
														'px')
												},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'image-rendering', _1: 'optimizeSpeed'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'image-rendering', _1: '-moz-crisp-edges'},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'image-rendering', _1: '-webkit-optimize-contrast'},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'image-rendering', _1: 'crisp-edges'},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'image-rendering', _1: 'pixelated'},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: '-ms-interpolation-mode', _1: 'nearest-neighbor'},
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		},
		A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A4(
				_elm_lang$core$Maybe$map3,
				_w0rm$elm_mogee$View$render(model),
				model.texture,
				model.font,
				model.sprite)));
};

var _w0rm$elm_mogee$Mogee$init = {
	ctor: '_Tuple2',
	_0: _w0rm$elm_mogee$Model$initial,
	_1: _elm_lang$core$Platform_Cmd$batch(
		{
			ctor: '::',
			_0: _w0rm$elm_mogee$View_Sprite$loadTexture(_w0rm$elm_mogee$Messages$TextureLoaded),
			_1: {
				ctor: '::',
				_0: _w0rm$elm_mogee$View_Sprite$loadSprite(_w0rm$elm_mogee$Messages$SpriteLoaded),
				_1: {
					ctor: '::',
					_0: _w0rm$elm_mogee$View_Font$load(_w0rm$elm_mogee$Messages$FontLoaded),
					_1: {
						ctor: '::',
						_0: A2(_elm_lang$core$Task$perform, _w0rm$elm_mogee$Messages$Resize, _elm_lang$window$Window$size),
						_1: {ctor: '[]'}
					}
				}
			}
		})
};
var _w0rm$elm_mogee$Mogee$subscriptions = function (_p0) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _elm_lang$animation_frame$AnimationFrame$diffs(_w0rm$elm_mogee$Messages$Animate),
			_1: {
				ctor: '::',
				_0: _elm_lang$keyboard$Keyboard$downs(
					_w0rm$elm_mogee$Messages$KeyChange(true)),
				_1: {
					ctor: '::',
					_0: _elm_lang$keyboard$Keyboard$ups(
						_w0rm$elm_mogee$Messages$KeyChange(false)),
					_1: {
						ctor: '::',
						_0: _elm_lang$window$Window$resizes(_w0rm$elm_mogee$Messages$Resize),
						_1: {
							ctor: '::',
							_0: _elm_lang$page_visibility$PageVisibility$visibilityChanges(_w0rm$elm_mogee$Messages$VisibilityChange),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _w0rm$elm_mogee$Mogee$main = _elm_lang$html$Html$program(
	{init: _w0rm$elm_mogee$Mogee$init, view: _w0rm$elm_mogee$View$view, subscriptions: _w0rm$elm_mogee$Mogee$subscriptions, update: _w0rm$elm_mogee$Model$update})();

var Elm = {};
Elm['Mogee'] = Elm['Mogee'] || {};
if (typeof _w0rm$elm_mogee$Mogee$main !== 'undefined') {
    _w0rm$elm_mogee$Mogee$main(Elm['Mogee'], 'Mogee', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

