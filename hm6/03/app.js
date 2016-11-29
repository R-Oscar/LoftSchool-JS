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

document.getElementById("search").addEventListener("input", (event) => {
	let items = document.querySelectorAll("ul#result > li");

	for (let item of items) {
		let itemText = item.innerText.toLowerCase();
		let searchText = event.target.value.toLowerCase();

		if (itemText.indexOf(searchText) !== -1) {
			item.style.display = "list-item";
		} else {
			item.style.display = "none";
		}
	}
});