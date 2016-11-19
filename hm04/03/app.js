function scanDOM(element = document) {
	let result = {
		textNodes: 0,
		classes: {}
	}

	for (let child of element.childNodes) {
		// debugger;
		if (child.nodeType === Node.TEXT_NODE) {
			result.textNodes++;
		} else if (child.nodeType === Node.ELEMENT_NODE) {
			let tagName = child.tagName;

			// Название тега
			if (tagName in result) {
				result[tagName]++;
			} else {
				result[tagName] = 1;
			}
			// Классы
			let classList = Array.from(child.classList)
			classList.map((item) => {
				if (item in result.classes) {
					result.classes[item]++;
				} else {
					result.classes[item] = 1;
				}
			});

			let temp = scanDOM(child);
			result = mergeObjects(result, temp);
		}
	}
	return result;
}

function mergeObjects(obj1, obj2) {
	let result = {};
	for (let prop in obj1) {
		if (obj2.hasOwnProperty(prop)) {
			switch (typeof obj2[prop]) {
				case 'boolean':
					if (obj1[prop] !== obj2[prop]) throw new Error(`Can't merge property ${prop}: ${obj1[prop]} and ${obj2[prop]}`);
					break;

				case 'number':
					obj1[prop] = obj1[prop] + obj2[prop];
					break;

				case 'string':
					if (obj1[prop] !== obj2[prop])
						obj1[prop] = obj1[prop] + obj2[prop];
					break;

				case 'object':
					try {
						let result = mergeObjects(obj1[prop], obj2[prop]);
						obj1[prop] = result;
					}
					catch(e) {
						console.log(e.message);
					}
					break;
					
			}
		}
	}

	result = obj1;

	for (let prop in obj2) {
		if (!obj1.hasOwnProperty(prop)) {
			result[prop] = obj2[prop];
		}
	}

	return result;
}

let a = scanDOM();
console.log(a);	