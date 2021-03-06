// WARNING: DO NOT INSERT COMMENTS OR REFORMAT OR ANYTHING
// Line numbers matter to this test!

QUnit.module(module.id);

var nextTick = function(cb) {
	setTimeout(function(){
		cb();
	}, 0);
};



function failAsync(_, code){
	throw new Error(code);
}

function failSync(_, code){
	 // dummy to defeat CoffeeScript compat rule
	function fail(dummy){ throw new Error(code); }
	fail(0);
}

var _fail;

function A(_, code){
	if (code == 1) 
		_fail(_, code);
	if (code == 2) 
		_fail(_, code);
	nextTick(_);
	if (code == 3) 
		_fail(_, code);
	for (var i = 0; i < 6; i++) {
		if (code == i) 
			_fail(_, code);
		nextTick(_);
	}
	if (code == 6) 
		_fail(_, code);
	nextTick(_);
	B(_, code);
	nextTick(_);
	return "END";
}

function B(_, code){
	if (code == 7) 
		_fail(_, code);
	C(_, code);
	nextTick(_);
	C(_, code);
	D(_, code);
}

function C(_, code){
	if (code == 8) 
		_fail(_, code);
}

function D(_, code){
	if (code == 9) 
		_fail(_, code);
}

function E(_, code){
	try {
		_fail(_, code);
	} 
	catch (ex) {
		if (code % 3 == 1) 
			_fail(_, code);
		else if (code % 3 == 2) 
			A(_, code);
		else 
			return "OK " + code;
	}
}

function F(_, code){
	var f1 = A(!_, code);
	var f2 = A(!_, code + 1);
	return f1(_) + " & " + f2(_);
}

function G(_, code){
	if (code == 5) 
		_fail(_, code);
	return "" + code;
}

function H(_, code){
	if (code % 2 == 0) 
		nextTick(_);
	return G(_, code);
}

function I(_, code){
	var s = "";
	for (var i = 0; i < code; i++) 
		s += H(_, i);
	return s;
}

function issue233(_, code) {
  function customThrow() {
    throw new Error("foo");
  }
  try {
    throw new Error("bar");
  } catch(e) {
    customThrow();
  }
}

// You can insert lines and/or comments after this point.

function T(_, fn, code, failFn){
	_fail = failFn;
	var s = "{";
	try {
		return fn(_, code);
	} 
	catch (ex) {
		var s = ex.stack;
		s = s.split('\n').filter(function(l) {
			return l.indexOf('<<<') < 0 && !/\bstreamline-runtime.lib/.test(l);
		}).map(function(l){
			l = l.replace(/\bFunction\.(\w+) \[as fiberized-\d+\]/, '$1');
			// We get Object.A in futures test because of a bind call. Ignore this difference.
			var m = /^\s+at (?:(?:Function|Object)\.)?(\w+)[^(]+\((?:[A-Z]:)?[^:]*:(\d+)/.exec(l);
			if (m) 
				return m[1] + ":" + m[2];
			return l;
		}).join('/');
		var end = s.indexOf('/T:');
		return end < 0 ? s + "-- end frame missing" : s.substring(0, end);
	}
}

var browser = typeof process === 'undefined' || process.browser;

Error.stackTraceLimit = 20;

function stackEqual(got, expect) {
	if (browser) {
		got = got.replace(/(Error: \d+)\/.*?\/([A-Z]:)/, "$1/**ignored**/$2");
		expect = expect.replace(/(Error: \d+)\/.*?\/([A-Z]:)/, "$1/**ignored**/$2");
	}
	strictEqual(got, expect, expect);
}
// safari hack
var rawStack = new Error().stack ? function(raw) {
	return raw;
} : function() {
	return "raw stack unavailable";
}

asyncTest("stacks", 20, function(_) {
	stackEqual(T(_, A, 1, failAsync), rawStack("Error: 1/failAsync:15") + "/A:28");
	stackEqual(T(_, A, 1, failSync), rawStack("Error: 1/fail:20/failSync:21") + "/A:28");
	stackEqual(T(_, A, 2, failAsync), rawStack("Error: 2/failAsync:15") + "/A:30");
	stackEqual(T(_, A, 2, failSync), rawStack("Error: 2/fail:20/failSync:21") + "/A:30");
	stackEqual(T(_, A, 3, failAsync), rawStack("Error: 3/failAsync:15") + "/A:33");
	stackEqual(T(_, A, 3, failSync), rawStack("Error: 3/fail:20/failSync:21") + "/A:33");
	stackEqual(T(_, A, 4, failAsync), rawStack("Error: 4/failAsync:15") + "/A:36");
	stackEqual(T(_, A, 4, failSync), rawStack("Error: 4/fail:20/failSync:21") + "/A:36");
	stackEqual(T(_, A, 5, failAsync), rawStack("Error: 5/failAsync:15") + "/A:36");
	stackEqual(T(_, A, 5, failSync), rawStack("Error: 5/fail:20/failSync:21") + "/A:36");
	stackEqual(T(_, A, 6, failAsync), rawStack("Error: 6/failAsync:15") + "/A:40");
	stackEqual(T(_, A, 6, failSync), rawStack("Error: 6/fail:20/failSync:21") + "/A:40");
	stackEqual(T(_, A, 7, failAsync), rawStack("Error: 7/failAsync:15") + "/B:49/A:42");
	stackEqual(T(_, A, 7, failSync), rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42");
	stackEqual(T(_, A, 8, failAsync), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42");
	stackEqual(T(_, A, 8, failSync), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42");
	stackEqual(T(_, A, 9, failAsync), rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42");
	stackEqual(T(_, A, 9, failSync), rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42");
	stackEqual(T(_, A, 10, failAsync), "END");
	stackEqual(T(_, A, 10, failSync), "END");
	start();
})

asyncTest("catch", 20, function(_) {
	stackEqual(T(_, E, 1, failAsync), rawStack("Error: 1/failAsync:15") + "/E:72");
	stackEqual(T(_, E, 1, failSync), rawStack("Error: 1/fail:20/failSync:21") + "/E:72");
	stackEqual(T(_, E, 2, failAsync), rawStack("Error: 2/failAsync:15") + "/A:30/E:74");
	stackEqual(T(_, E, 2, failSync), rawStack("Error: 2/fail:20/failSync:21") + "/A:30/E:74");
	stackEqual(T(_, E, 3, failAsync), "OK 3");
	stackEqual(T(_, E, 3, failSync), "OK 3");
	stackEqual(T(_, E, 4, failAsync), rawStack("Error: 4/failAsync:15") + "/E:72");
	stackEqual(T(_, E, 4, failSync), rawStack("Error: 4/fail:20/failSync:21") + "/E:72");
	stackEqual(T(_, E, 5, failAsync), rawStack("Error: 5/failAsync:15") + "/A:36/E:74");
	stackEqual(T(_, E, 5, failSync), rawStack("Error: 5/fail:20/failSync:21") + "/A:36/E:74");
	stackEqual(T(_, E, 6, failAsync), "OK 6");
	stackEqual(T(_, E, 6, failSync), "OK 6");
	stackEqual(T(_, E, 7, failAsync), rawStack("Error: 7/failAsync:15") + "/E:72");
	stackEqual(T(_, E, 7, failSync), rawStack("Error: 7/fail:20/failSync:21") + "/E:72");
	stackEqual(T(_, E, 8, failAsync), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/E:74");
	stackEqual(T(_, E, 8, failSync), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/E:74");
	stackEqual(T(_, E, 9, failAsync), "OK 9");
	stackEqual(T(_, E, 9, failSync), "OK 9");
	stackEqual(T(_, E, 10, failAsync), rawStack("Error: 10/failAsync:15") + "/E:72");
	stackEqual(T(_, E, 10, failSync), rawStack("Error: 10/fail:20/failSync:21") + "/E:72");
	start();
})

asyncTest("futures", 20, function(_) {
	stackEqual(T(_, F, 1, failAsync), rawStack("Error: 1/failAsync:15") + "/A:28/F:83");
	stackEqual(T(_, F, 1, failSync), rawStack("Error: 1/fail:20/failSync:21") + "/A:28/F:83");
	stackEqual(T(_, F, 2, failAsync), rawStack("Error: 2/failAsync:15") + "/A:30/F:83");
	stackEqual(T(_, F, 2, failSync), rawStack("Error: 2/fail:20/failSync:21") + "/A:30/F:83");
	stackEqual(T(_, F, 3, failAsync), rawStack("Error: 3/failAsync:15") + "/A:33/F:83");
	stackEqual(T(_, F, 3, failSync), rawStack("Error: 3/fail:20/failSync:21") + "/A:33/F:83");
	stackEqual(T(_, F, 4, failAsync), rawStack("Error: 4/failAsync:15") + "/A:36/F:83");
	stackEqual(T(_, F, 4, failSync), rawStack("Error: 4/fail:20/failSync:21") + "/A:36/F:83");
	stackEqual(T(_, F, 5, failAsync), rawStack("Error: 5/failAsync:15") + "/A:36/F:83");
	stackEqual(T(_, F, 5, failSync), rawStack("Error: 5/fail:20/failSync:21") + "/A:36/F:83");
	stackEqual(T(_, F, 6, failAsync), rawStack("Error: 6/failAsync:15") + "/A:40/F:83");
	stackEqual(T(_, F, 6, failSync), rawStack("Error: 6/fail:20/failSync:21") + "/A:40/F:83");
	stackEqual(T(_, F, 7, failAsync), rawStack("Error: 7/failAsync:15") + "/B:49/A:42/F:83");
	stackEqual(T(_, F, 7, failSync), rawStack("Error: 7/fail:20/failSync:21") + "/B:49/A:42/F:83");
	stackEqual(T(_, F, 8, failAsync), rawStack("Error: 8/failAsync:15") + "/C:58/B:50/A:42/F:83");
	stackEqual(T(_, F, 8, failSync), rawStack("Error: 8/fail:20/failSync:21") + "/C:58/B:50/A:42/F:83");
	stackEqual(T(_, F, 9, failAsync), rawStack("Error: 9/failAsync:15") + "/D:63/B:53/A:42/F:83");
	stackEqual(T(_, F, 9, failSync), rawStack("Error: 9/fail:20/failSync:21") + "/D:63/B:53/A:42/F:83");
	stackEqual(T(_, F, 10, failAsync), "END & END");
	stackEqual(T(_, F, 10, failSync), "END & END");
	start();
})

asyncTest("loop", 8, function(_) {
	stackEqual(T(_, I, 4, failAsync), "0123");
	stackEqual(T(_, I, 4, failSync), "0123");
	stackEqual(T(_, I, 5, failAsync), "01234");
	stackEqual(T(_, I, 5, failSync), "01234");
	stackEqual(T(_, I, 6, failAsync), rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101");
	stackEqual(T(_, I, 6, failSync), rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101");
	stackEqual(T(_, I, 7, failAsync), rawStack("Error: 5/failAsync:15") + "/G:88/H:95/I:101");
	stackEqual(T(_, I, 7, failSync), rawStack("Error: 5/fail:20/failSync:21") + "/G:88/H:95/I:101");
	start();
})

if (!browser) asyncTest("issue233", 1, function(_) {
	stackEqual(T(_, issue233, 0, failSync), "Error: foo/customThrow:107/issue233:112");
	start();
});
