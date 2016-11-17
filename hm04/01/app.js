function prepend(container, element) {
	container.insertBefore(element, container.firstElementChild);
}

let container = document.getElementsByClassName("container")[0];
let element = document.getElementsByClassName("box2")[0];
console.log(container.firstElementChild, element);
prepend(container, element);