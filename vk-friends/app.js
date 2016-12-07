"use strict";

const ACCESS_FRIENDS = 2;
let draggedElement = null;

new Promise((resolve) => {
	if (document.readyState === 'complete') {
		resolve();
	} else {
		window.onload = resolve;
	}
}).then(() => {
	return new Promise((resolve, reject) => {
		VK.init({
			apiId: 5756362
		});

		VK.Auth.login(function(response) {
			if (response.session) {
				resolve(response);
			} else {
				reject(new Error('Не удалось авторизоваться'));
			}
		}, ACCESS_FRIENDS);
	});
}).then(() => {
	return new Promise((resolve, reject) => {
		VK.api('friends.get', {
			'uid': '43317791',
			'fields': 'photo,first_name,last_name'
		}, (response) => {
			if (response.error) {
				reject(new Error(response.error.error_msg))
			} else {
				let source = document.getElementById('friendsListTemplate').innerHTML;
				let templateFn = Handlebars.compile(source);

				let storage = {};
				storage.list = JSON.parse(localStorage.getItem('list'));
				storage.friendsList = JSON.parse(localStorage.getItem('filterList'));

				let template, filteredTemplate;
				let list = document.getElementById('results-list');
				let filterList = document.getElementById("filter-list");
				if (storage.list.length > 0 || storage.list.friendsList > 0) {
					template = templateFn({friends: storage.list});
					filteredTemplate = templateFn({filteredFriends: storage.friendsList});
					filterList.innerHTML = filteredTemplate;
				} else {
					template = templateFn({friends: response.response});
				}

				list.innerHTML = template;

				filterList.addEventListener("dragover", (event) => {
					event.preventDefault()
					event.dataTransfer.dropEffect = 'move';
				});

				filterList.addEventListener("drop", (event) => {
					event.preventDefault();

					let data = event.dataTransfer.getData("text/html");
					let insert = document.createElement("li");
					insert.innerHTML = data;
					insert.classList.add("friends-list__item");
					swapIcon(insert);
					filterList.appendChild(insert);

					// Удаление старого элемента
					draggedElement.parentNode.removeChild(draggedElement);
					draggedElement = null;
				})

				list.addEventListener("dragstart", (event) => {
					let target = event.target;

					while (target.tagName !== "LI") {
						target = target.parentNode;
					}
					draggedElement = target;
					event.dataTransfer.setData("text/html", target.innerHTML);
				});

				list.addEventListener("click", (event) => {
					if (event.target.classList.contains("glyphicon-plus")) {
						moveItem(filterList);
					}
				});

				filterList.addEventListener('click', (event) => {
					if (event.target.classList.contains("glyphicon-remove")) {
						moveItem(list);
					}
				});

				document.getElementById('results-search').addEventListener('input', (event) => {
					filterFriends(list, event.target.value);
				});

				document.getElementById('filter-search').addEventListener('input', (event) => {
					filterFriends(filterList, event.target.value);
				});

				document.getElementById('save').addEventListener('click', (event) => {
					localStorage.setItem('list', saveList(list));
					localStorage.setItem('filterList', saveList(filterList));

					alert("Сохранено!");
				});
			}
		})
	});
});

// Helper functions

function swapIcon(element) {
	// Изменение иконки на крестик/плюсик у элемента element
	let icon = element.getElementsByClassName("glyphicon")[0];

	if (icon.classList.contains('glyphicon-plus')) {
		icon.classList.remove("glyphicon-plus");
		icon.classList.add("glyphicon-remove");
	} else {
		icon.classList.remove("glyphicon-remove");
		icon.classList.add("glyphicon-plus");
	}
}

function moveItem(listElement) {
	let target = event.target;

	while (target.tagName !== "LI") {
		target = target.parentNode;
	}

	let element = target.parentNode.removeChild(target);
	listElement.appendChild(element);
	swapIcon(element);
}

function filterFriends(listElement, filter) {
	let searchText = filter.toLowerCase();
	for (let element of listElement.children) {
		let elementText = element.innerText.toLowerCase()
		if (elementText.indexOf(searchText) === -1) {
			element.classList.add("no-display");
		} else {
			element.classList.remove("no-display");
		}
	}	
}

function saveList(listElement) {
	let result = [];

	for (let element of listElement.children) {
		let photo = element.querySelector('.list-image').src;
		let first_name = element.textContent.trim().split(' ')[0];
		let last_name = element.textContent.trim().split(' ')[1];
		result.push({
			photo,
			first_name,
			last_name
		});
	}

	return JSON.stringify(result);
}