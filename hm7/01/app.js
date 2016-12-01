let cookies = document.cookie.split("; ");
for (let cookie of cookies) {
	addCookieRecord(cookie.substring(0, cookie.indexOf("=")), cookie.substring(cookie.indexOf("=") + 1, cookie.length));
}

function addCookieRecord(name, value) {
	let table = document.getElementById("cookies");

	let td = document.createElement("tr");
	table.appendChild(td);

	let cookieName = document.createElement("td");
	cookieName.textContent = name;
	td.appendChild(cookieName);

	let cookieValue = document.createElement("td");
	cookieValue.textContent = value;
	td.appendChild(cookieValue);

	let removeCell = document.createElement("td"),
		removeButton = document.createElement("button");
	removeButton.textContent = "Удалить";
	removeButton.classList.add("js-remove");
	removeCell.appendChild(removeButton);
	td.appendChild(removeCell);
}

window.addEventListener("click", (event) => {
	if (event.target.classList.contains("js-remove") && event.target.tagName === "BUTTON") {
		let cookieName = event.target.parentNode.previousElementSibling.previousElementSibling.textContent;
		if (confirm(`Удалить cookie с именем ${cookieName}?`)) {
			let cookieValue = event.target.parentNode.previousElementSibling.textContent;
			document.cookie = cookieName + "=" + cookieValue + "; expires=" + new Date(0).toUTCString();
			document.getElementById("cookies").removeChild(event.target.parentNode.parentNode);
		}
	}
});

document.getElementById("js-cookie-submit").addEventListener("click", (event) => {
	event.preventDefault();

	let name = document.getElementById("js-cookie-name").value.trim(),
		value = document.getElementById("js-cookie-value").value.trim(),
		expires = document.getElementById("js-cookie-expires").value.trim();

	if (name === "" || value === "" || expires === "") {
		alert("Заполните все поля формы");
		return;
	}
	console.log(name + "=" + value + "; expires=" + new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toUTCString());
	document.cookie = name + "=" + value + "; expires=" + new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toUTCString();

	addCookieRecord(name, value);

	// Очистка полей формы
	document.getElementById("js-cookie-name").value = "";
	document.getElementById("js-cookie-value").value = "";
	document.getElementById("js-cookie-expires").value = "";
});