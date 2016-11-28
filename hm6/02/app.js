"use strict";

let p = new Promise((resolve, reject) => {
	// Инициализация
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

	// Отправка
	xhr.send();

	xhr.addEventListener('load', () => {
		resolve(JSON.parse(xhr.response));
	});

	xhr.addEventListener('error', () => {
		reject();
	});
});

p.then((response) => {
	let data = [];
	response.map((currentValue, index, array) => {
		data.push(currentValue.name);
	})
	
	for (let element of data.sort()) {
		let li = document.createElement("li");
		li.textContent = element;
		document.getElementById("result").appendChild(li);
	}
}, 
() => {
	console.log("Произошла ошибка");
});