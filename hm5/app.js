let button = document.getElementById("button");
let dnd = {};

button.addEventListener("click", () => {
	let div = document.createElement("DIV");

	// Установка размеров
	div.style.width = Math.floor(Math.random() * 500) + "px";
	div.style.height = Math.floor(Math.random() * 500) + "px";

	// Позиционирование
	div.style.position = "absolute";
	div.style.top = Math.floor(Math.random() * document.documentElement.clientHeight) + "px";
	div.style.left = Math.floor(Math.random() * document.documentElement.clientWidth) + "px";

	// Установка цвета
	let R = Math.floor(Math.random() * 255);
	let G = Math.floor(Math.random() * 255);
	let B = Math.floor(Math.random() * 255);
	div.style.backgroundColor = `RGB(${R}, ${G}, ${B})`;

	div.className = "js-dnd";
	div.style.cursor = "move";

	// Элемент готов
	document.body.appendChild(div);
});

document.body.addEventListener("mousedown", (event) => {
	if (event.target.className === "js-dnd") {
		dnd.div = event.target;
		dnd.dX = event.clientX - parseInt(dnd.div.style.left);
		dnd.dY = event.clientY - parseInt(dnd.div.style.top);

		document.body.addEventListener("mousemove", dragAndDropHandler);
	}
});

document.body.addEventListener("mouseup", (event) => {
	if (event.target.className === "js-dnd") {
		document.body.removeEventListener("mousemove", dragAndDropHandler);
		dnd = {};
	}
});

function dragAndDropHandler(event) {
	dnd.div.style.top = (event.clientY - dnd.dY) + "px";
	dnd.div.style.left = (event.clientX - dnd.dX) + "px";
}