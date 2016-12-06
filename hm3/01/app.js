"use strict";

function forEach(array, fn) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] != null)
			fn(array[i], i, array);
	}
}

function filter(array, fn) {
	let res = [];

	for (let i = 0; i < array.length; i++) {
		if (fn(array[i], i, array))
			res[res.length] = array[i];
	}

	return res;
}

function map(array, fn) {
	let res = [];

	for (let i = 0; i < array.length; i++) {
		res[i] = fn(array[i], i, array);
	}

	return res;
}

function slice(array, begin = 0, end) {
	// debugger;
	// if (end < begin) throw new Error("'End' should not be less than 'begin'");

	end = end || array.length;

	if (begin < 0 && begin * -1 > array.length) {
		begin = 0;
	} else if (begin < 0) {
		begin = array.length + begin;
	}

	if (end < 0) {
		end = array.length + end;
	}

	let res = [];

	for (let i = begin; i < end; i++) {
		res[res.length] = array[i];
	}

	return res;
}

function reduce(array, fn, initialValue) {
	// debugger;
	let res = 0;
	if (initialValue) {
		res = fn(initialValue, array[0]);
		for (let i = 2; i < array.length; i+=2) {
			res = fn(fn(array[i], array[i - 1]), res);
		}
	} else {
		res = fn(array[0], array[1]);

		for (let i = 3; i < array.length; i+=2) {
			res = fn(fn(array[i], array[i - 1]), res);
		}
	}

	if (array.length % 2 != 0 && initialValue === undefined) {
		res = fn(res, array[array.length - 1]);
	}

	return res;
}

function splice(array, start, deleteCount) {
	debugger;
	if (deleteCount > array.length) deleteCount = array.length;
	if (deleteCount === undefined) deleteCount = array.length - start;
	let removed = [],
		result = [];

	if (start < 0)
		start = array.length + start;

	for (let i = 0; i < start; i++) {
		result[i] = array[i];
	}

	for (let i = 3; i < arguments.length; i++) {
		result[result.length] = arguments[i];
	}

	for (let i = start; i < start + deleteCount; i++) {
		removed[removed.length] = array[i];
	}

	for (let i = start + deleteCount; i < array.length; i++) {
		result[result.length] = array[i];
	}

	array.length = 0;
	for (let i = result.length - 1; i >= 0; i--) {
		array[i] = result[i]
	}

	return removed;
}