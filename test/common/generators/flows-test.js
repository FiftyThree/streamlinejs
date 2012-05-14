/*** Generated by streamline generators 0.1.0 - DO NOT EDIT ***/var fstreamline__ = require("streamline/lib/generators/runtime"); (fstreamline__.create(function(_) {var delay_ = fstreamline__.create(delay, 0), delayFail_ = fstreamline__.create(delayFail, 0); var module = QUnit.module;
var flows = require("streamline/lib/util/flows");

function delay(_, val) {
	(yield fstreamline__.invoke(flows, "nextTick", [_], 0));
	yield ( val);
}

function delayFail(_, err) {
	(yield fstreamline__.invoke(flows, "nextTick", [_], 0));
	throw err;
}

module("flows");

asyncTest("each", 5, fstreamline__.create(function(_) {
	var result = 1;
	(yield fstreamline__.invoke(flows, "each", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		result = result * (yield delay(_, val));
	;yield;}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield fstreamline__.invoke([1, 2, 3, 4], "forEach_", [_, fstreamline__.create(function(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	;yield;}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield fstreamline__.invoke([1, 2, 3, 4], "forEach_", [_, 2, fstreamline__.create(function(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	;yield;}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield fstreamline__.invoke([1, 2, 3, 4], "forEach_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	;yield;}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield fstreamline__.invoke([1, 2, 3, 4], "forEach_", [_, -1, fstreamline__.create(function(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	;yield;}, 0)], 0));
	strictEqual(result, 24);

	start();
;yield;}, 0));
asyncTest("map", 5, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "map", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		yield ( 2 * (yield delay(_, val)));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "map_", [_, fstreamline__.create(function(_, val) {
		yield ( 2 * (yield delay(_, val)));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "map_", [_, 2, fstreamline__.create(function(_, val) {
		yield ( 2 * (yield delay(_, val)));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "map_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		yield ( 2 * (yield delay(_, val)));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "map_", [_, -1, fstreamline__.create(function(_, val) {
		yield ( 2 * (yield delay(_, val)));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	start();
;yield;}, 0));
asyncTest("filter", 5, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "filter", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) % 2);
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "filter_", [_, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) % 2);
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "filter_", [_, 2, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) % 2);
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "filter_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) % 2);
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "filter_", [_, -1, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) % 2);
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	start();
;yield;}, 0));
asyncTest("every", 5, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "every", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 5);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 5);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, 2, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 5);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 5);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, -1, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 5);
	}, 0)], 0));
	strictEqual(result, true);
	start();
;yield;}, 0));
asyncTest("every", 5, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "every", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, 2, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "every_", [_, -1, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, false);
	start();
;yield;}, 0));
asyncTest("some", 5, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "some", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, 2, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, -1, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 3);
	}, 0)], 0));
	strictEqual(result, true);
	start();
;yield;}, 0));
asyncTest("some", 5, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "some", [_, [1, 2, 3, 4], fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 0);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 0);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, 2, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 0);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, {
		parallel: 2
	}, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 0);
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "some_", [_, -1, fstreamline__.create(function(_, val) {
		yield ( (yield delay(_, val)) < 0);
	}, 0)], 0));
	strictEqual(result, false);
	start();
;yield;}, 0));
asyncTest("reduce", 2, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "reduce", [_, [1, 2, 3, 4], fstreamline__.create(function(_, v, val) {
		yield ( v * (yield delay(_, val)));
	}, 0), 1], 0));
	strictEqual(result, 24);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "reduce_", [_, fstreamline__.create(function(_, v, val) {
		yield ( v * (yield delay(_, val)));
	}, 0), 1], 0));
	strictEqual(result, 24);
	start();
;yield;}, 0));
asyncTest("reduceRight", 2, fstreamline__.create(function(_) {
	var result = (yield fstreamline__.invoke(flows, "reduceRight", [_, [1, 2, 3, 4], fstreamline__.create(function(_, v, val) {
		yield ( v * (yield delay(_, val)));
	}, 0), 1], 0));
	strictEqual(result, 24);
	var result = (yield fstreamline__.invoke([1, 2, 3, 4], "reduceRight_", [_, fstreamline__.create(function(_, v, val) {
		yield ( v * (yield delay(_, val)));
	}, 0), 1], 0));
	strictEqual(result, 24);
	start();
;yield;}, 0));
asyncTest("sort", 4, fstreamline__.create(function(_) {
	var array = [1, 2, 3, 4];
	(yield fstreamline__.invoke(flows, "sort", [_, array, fstreamline__.create(function(_, a, b) {
		yield ( (yield delay(_, a - b)));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "In order array sort ok");
	(yield fstreamline__.invoke(array, "sort_", [_, fstreamline__.create(function(_, a, b) {
		yield ( (yield delay(_, a - b)));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "In order array sort ok");
	array = [4, 3, 2, 1];
	(yield fstreamline__.invoke(array, "sort_", [_, fstreamline__.create(function(_, a, b) {
		yield ( (yield delay(_, a - b)));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "Reverse array sort ok");
	array = [3, 1, 2, 4];
	(yield fstreamline__.invoke(array, "sort_", [_, fstreamline__.create(function(_, a, b) {
		yield ( (yield delay(_, a - b)));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "Random array sort ok");
	start();
;yield;}, 0));
asyncTest("collectAll", 4, fstreamline__.create(function(_) {
	var total = 0;
	var peak = 0;
	var count = 0;

	function doIt(i) {
		return fstreamline__.create(function(_) {
			count++;
			peak = Math.max(count, peak);
			total = (yield delay(_, i)) + total;
			count--;
			yield ( 2 * i);
		}, 0)
	}

	var results = (yield fstreamline__.invoke(flows.spray([doIt(1), doIt(2), doIt(3)]), "collectAll", [_], 0));
	equal(total, 6);
	ok(peak >= 2);
	equal(count, 0);
	deepEqual(results, [2, 4, 6]);
	start();
;yield;}, 0));
asyncTest("collectOne", 4, fstreamline__.create(function(_) {
	var total = 0;
	var peak = 0;
	var count = 0;

	function doIt(i) {
		return fstreamline__.create(function(_) {
			count++;
			peak = Math.max(count, peak);
			total = (yield delay(_, i)) + total;
			count--;
			yield ( 2 * i);
		}, 0)
	}

	var result = (yield fstreamline__.invoke(flows.spray([doIt(1), doIt(2), doIt(3)]), "collectOne", [_], 0));
	ok(total == 1 || total == 2);
	ok(peak >= 2);
	ok(count > 0);
	ok(result == 2 || result == 4);
	start();
;yield;}, 0));
asyncTest("collectAll with limit", 1, fstreamline__.create(function(_) {
	var total = 0;
	var peak = 0;
	var count = 0;

	function doIt(i) {
		return fstreamline__.create(function(_) {
			count++;
			peak = Math.max(count, peak);
			total = (yield delay(_, i)) + total;
			count--;
			yield ( 2 * i);
		}, 0)
	}

	var results = (yield fstreamline__.invoke(flows.spray([doIt(1), doIt(2), doIt(3)], 2), "collectAll", [_], 0));
	deepEqual([total, peak, count, results], [6, 2, 0, [2, 4, 6]]);
	start();
;yield;}, 0));
asyncTest("contexts", 3, fstreamline__.create(function(_) {var testContext_ = fstreamline__.create(testContext, 0);
	function testContext(_, x) {
		flows.setContext({
			val: x
		});
		var y = (yield delay(_, 2 * x));
		strictEqual(y, 2 * flows.getContext().val);
		yield ( y + 1);
	}

	var result = (yield fstreamline__.invoke(flows.spray([

	fstreamline__.create(function(_) {
		yield ( (yield testContext(_, 3)));
	}, 0),

	fstreamline__.create(function(_) {
		yield ( (yield testContext(_, 5)));
	}, 0)

	]), "collectAll", [_], 0));
	deepEqual(result, [7, 11]);
	start();
;yield;}, 0));

asyncTest("futures multiplex", 3, fstreamline__.create(function(_) {var doIt_ = fstreamline__.create(doIt, 1);
	var result1 = 0;
	var result2 = 0;
	var result3 = 0;

	function doIt(future, _) {
		result1 = (yield fstreamline__.invoke(null, future, [_], 0)) + result1;
		result2 = (yield fstreamline__.invoke(null, future, [_], 0)) + result2;
		(yield delay(_));
		result3 = (yield fstreamline__.invoke(null, future, [_], 0)) + result3;
	;yield;}

	var f1 = delay_(null, 1);
	var f10 = delay_(null, 10);

	(yield fstreamline__.invoke(flows, "collect", [_, [doIt_(f1), doIt_(f10), doIt_(f1)]], 0));

	deepEqual(result1, 12);
	deepEqual(result2, 12);
	deepEqual(result3, 12);
	start();
;yield;}, 0));
;yield;}, 0).call(this, function(err) {
  if (err) throw err;
}));