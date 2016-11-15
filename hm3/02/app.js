"use strict";

let objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5],
            subSubProp3: [1, 2, 3, 4]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10)
};

let objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5],
            subSubProp3: [1, 2, 3, 4]
        },
        subProp1: 'sub value1'
    }
};

console.log(deepEqual(objA, objB)); //объекты идентичны, вернет true

function deepEqual(obj1, obj2) {
	let props = Object.getOwnPropertyNames(obj1);

	for (let i = 0; i < props.length; i++) {
		let prop = props[i];
		if (!obj2.hasOwnProperty(prop)) return false;
		if (obj1[prop] !== obj2[prop]) {
			if (typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object') {
				if (!deepEqual(obj1[prop], obj2[prop])) return false;
			} else {
				return false;
			}
		}
	}

	return true;
}