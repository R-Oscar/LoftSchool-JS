"use strict";

let array = [1, 2, 3, 4, 5, 6];

forEach(array, item => console.log(item));
let greaterThan4 = filter(array, item => item > 4);
console.log(greaterThan4);
let square = map(array, item => item*item);
console.log(square);

let fruits = ['Банан', 'Апельсин', 'Лимон', 'Яблоко', 'Манго'];
console.log(slice(fruits, 1, 3));
console.log(reduce([0, 1, 2, 3, 4], (a, b) => a + b))

let myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
let removed = splice(myFish, 2, 0, 'барабанщик');

console.log(myFish);
console.log(removed);


function forEach(array, fn) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] != undefined)
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
	if (end < begin) throw new Error("'End' should not be less than 'begin'");

	if (begin < 0) {
		begin = array.length + begin;
	}

	if (end < 0) {
		end = array.length + end;
	}

	end = end || array.length;
	let res = [];

	for (let i = begin; i < end; i++) {
		res[res.length] = array[i];
	}

	return res;
}

function reduce(array, fn) {
	let res = fn(array[0], array[1]);

	for (let i = 3; i < array.length; i+=2) {
		res = fn(fn(array[i], array[i - 1]), res);
	}

	if (array.length % 2 != 0) {
		res = fn(res, array[array.length - 1]);
	}

	return res;
}

function splice(array, start, deleteCount) {
	// if (deleteCount > array.length) deleteCount = array.length;
	// let removed = [],
	// 	result = [];

	// for (let i = 0; i < start; i++) {
	// 	result[i] = array[i];
	// }

	// for (let i = 3; i < arguments.length; i++) {
	// 	result[result.length] = arguments[i];
	// }

	// for (let i = start; i < start + deleteCount; i++) {
	// 	removed[removed.length] = array[i];
	// }

	// for (let i = start + deleteCount; i < array.length; i++) {
	// 	result[result.length] = array[i];
	// }

	// array = result;
	// console.log(array);
	array = [1, 2, 3];
	let removed = [];
	return removed;
}