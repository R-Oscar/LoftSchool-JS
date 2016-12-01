"use strict";

new Promise((resolve) => {
	if (document.readyState === 'complete') {
		resolve();
	} else {
		window.onload = resolve;
	}
}).then(() => {
	return new Promise((resolve, reject) => {
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
	})
}).then((response) => {
	let data = {
		names: []
	};
	response.map((currentValue, index, array) => {
		data.names.push(currentValue.name);
	});
	
	let source = document.getElementById('nameListTemplate').innerHTML;

	let templateFn = Handlebars.compile(source);
	let template = templateFn({
		names: data.names.sort()
	});

	document.getElementById("result").innerHTML = template;

	// for (let element of data.sort()) {
	// 	let li = document.createElement("li");
	// 	li.textContent = element;
	// 	document.getElementById("result").appendChild(li);
	// }
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