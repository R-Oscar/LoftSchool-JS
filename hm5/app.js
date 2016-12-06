let acco = document.getElementById("accordion");

acco.addEventListener('click', (event) => {
	if (event.target.className === "acco__item") {
		let innerList = event.target.nextElementSibling;
		innerList.style.display = (innerList.style.display === "" || innerList.style.display === "none") ? "block" : "none";
	}
});