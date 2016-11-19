function deleteTextNodes(element) {
	let children = element.childNodes;

	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		
		if (child.nodeType === Node.TEXT_NODE) {
			element.removeChild(child);
			i--;
		} else if (child.nodeType === Node.ELEMENT_NODE) {
			deleteTextNodes(child);
		}
	}
}

let element = document.getElementsByClassName("container")[0];
deleteTextNodes(element);