beforeEach(function() {
  this.sinon = sinon.sandbox.create();
  sinon.sandbox.stub(window.console, "log");
});

afterEach(function(){
  this.sinon.restore();
});


describe("forEach", function() {

  let source1 = [2, 5, , 9]
  it("выводит в консоли a[0] = 2, a[1] = 5, a[3] = 9 при source = " + JSON.stringify(source1), () => {
  	forEach(source1, (element, index, array) => console.log('a[' + index + '] = ' + element));
  	sinon.assert.callCount(console.log, 3);
  	sinon.assert.calledWithExactly(console.log, "a[0] = 2");
  	sinon.assert.calledWithExactly(console.log, "a[1] = 5");
  	sinon.assert.calledWithExactly(console.log, "a[3] = 9");
  });

  let source2 = [1, 2, 3, 4, 5, 6];
  it("выводит в консоли 1...6 последовательно при source = " + JSON.stringify(source2), () => {
  	forEach(source2, (item) => console.log(item));
  	sinon.assert.callCount(console.log, 6);
  	sinon.assert.calledWithExactly(console.log, 1);
  	sinon.assert.calledWithExactly(console.log, 2);
  	sinon.assert.calledWithExactly(console.log, 3);
  	sinon.assert.calledWithExactly(console.log, 4);
  	sinon.assert.calledWithExactly(console.log, 5);
  	sinon.assert.calledWithExactly(console.log, 6);
  });
});

describe("filter", () => {
	let source1 = [12, 5, 8, 130, 44],
		result1 = [12, 130, 44];
	it("Фильтрует " + JSON.stringify(source1) + ", результат: " + JSON.stringify(result1), () => {
		assert.deepEqual(filter(source1, (value) => value >= 10), result1);
	});

	let source2 = [1, 2, 3, 4, 5, 6],
		result2 = [5, 6];
	it("Фильтрует " + JSON.stringify(source2) + ", результат: " + JSON.stringify(result2), () => {
		assert.deepEqual(filter(source2, (item) => item > 4), result2);
	});
});

describe("map", () => {
	let testData = [
		{
			source: [1, 4, 9],
			result: [1, 2, 3]
		},
		{
			source: [1, 4, 9],
			result: [2, 8, 18]
		}
	]

	it("Применяет кв. корень к " + JSON.stringify(testData[0].source) + ", результат: " + JSON.stringify(testData[0].result), () => {
		assert.deepEqual(map(testData[0].source, Math.sqrt), testData[0].result);
	});

	it("Умножает на 2 " + JSON.stringify(testData[1].source) + ", результат: " + JSON.stringify(testData[1].result), () => {
		assert.deepEqual(map(testData[1].source, (num) => num * 2), testData[1].result);
	});
});

describe("slice", () => {
	let testData = [
		{
			source: ['Банан', 'Апельсин', 'Лимон', 'Яблоко', 'Манго'],
			result: ['Апельсин', 'Лимон']
		},
		{
			source: [1, 2, 3, 4, 5],
			result: [2, 3]
		},
		{
			source: [1, 2, 3, 4, 5],
			result: [1, 2, 3, 4, 5]
		}
	]

	it("Выполняет срез с " + JSON.stringify(testData[0].source) + ", результат: " + JSON.stringify(testData[0].result), () => {
		assert.deepEqual(slice(testData[0].source, 1, 3), testData[0].result);
	});

	it("Выполняет срез с " + JSON.stringify(testData[1].source) + ", результат: " + JSON.stringify(testData[1].result), () => {
		assert.deepEqual(slice(testData[1].source, -4, -2), testData[1].result);
	});

	it("Выполняет срез с " + JSON.stringify(testData[2].source) + ", результат: " + JSON.stringify(testData[2].result), () => {
		assert.deepEqual(slice(testData[2].source, -1000), testData[2].result);
	});


});

describe("reduce", () => {
	let testData = [
		{
			source: [0, 1, 2, 3],
			result: 6
		},
		{
			source: [[0, 1], [2, 3], [4]],
			result: [0, 1, 2, 3, 4]
		},
		{
			source: [0, 1, 2, 3, 4],
			result: 20
		}
	]

	it("Суммирует элементы массива " + JSON.stringify(testData[0].source) + ", результат: " + JSON.stringify(testData[0].result), () => {
		assert.equal(reduce(testData[0].source, (a, b) => a + b), testData[0].result);
	});

	it("Собирает массив " + JSON.stringify(testData[1].source) + " в единый, результат: " + JSON.stringify(testData[1].result), () => {
		assert.deepEqual(reduce(testData[1].source, (a, b) => a.concat(b)), testData[1].result);
	})

	it("Суммирует элементы массива " + JSON.stringify(testData[2].source) + ", результат: " + JSON.stringify(testData[2].result), () => {
		assert.equal(reduce(testData[2].source, (a, b) => a + b, 10), testData[2].result);
	})
});

describe("splice", () => {
	let testData = [
		{
			source: ['ангел', 'клоун', 'мандарин', 'хирург'],
			result: ['ангел', 'клоун', 'барабанщик', 'мандарин', 'хирург']
		},
		{
			source: ["angel", "clown", "drum", "mandarin", "surgeon"],
			result: ["angel", "clown", "drum", "surgeon"],
			removed: ["mandarin"]
		},
		{
			source: ["angel", "clown", "drum", "surgeon"],
			result: ["angel", "clown", "trumpet", "surgeon"],
			removed: ["drum"]
		},
		{
			source: ["angel", "clown", "trumpet", "surgeon"],
			result: ["parrot", "anemone", "blue", "trumpet", "surgeon"],
			removed: ["angel", "clown"]
		},
		{
			source: ["parrot", "anemone", "blue", "trumpet", "surgeon"],
			result: ["parrot", "anemone", "surgeon"],
			removed: ["blue", "trumpet"]
		},
		{
			source: ["angel", "clown", "mandarin", "surgeon"],
			result: ["angel", "clown", "surgeon"],
			removed: ["mandarin"]
		},
		{
			source: [1, 2, 3, 4, 5],
			result: [1, 2],
			removed: [3, 4, 5]
		}
	]

	it("Добавляет 'drum' в массив: " + JSON.stringify(testData[0].source), () => {
		splice(testData[0].source, 2, 0, "барабанщик");
		assert.deepEqual(testData[0].source, testData[0].result);
	});

	it("Удаляет элемент с индексом 3: " + JSON.stringify(testData[1].source), () => {
		let removed = splice(testData[1].source, 3, 1);
		assert.deepEqual(testData[1].source, testData[1].result);
		assert.deepEqual(removed, testData[1].removed);
	});

	it("Удаляет элемент с индексом 2 и вставляет 'trumpet'" + JSON.stringify(testData[2].source), () => {
		let removed = splice(testData[2].source, 2, 1, "trumpet");
		assert.deepEqual(testData[2].source, testData[2].result);
		assert.deepEqual(removed, testData[2].removed);
	});

	it("Удаляет два элемента, начиная с индекса 0 и вставляет 'parrot', 'anemone' и 'blue'" + JSON.stringify(testData[3].source), () => {
		let removed = splice(testData[3].source, 0, 2, "parrot", "anemone", "blue");
		assert.deepEqual(testData[3].source, testData[3].result);
		assert.deepEqual(removed, testData[3].removed);
	});

	it("Удаляет два элемента, начиная с индекса 2 " + JSON.stringify(testData[4].source), () => {
		let removed = splice(testData[4].source, testData[4].source.length - 3, 2);
		assert.deepEqual(testData[4].source, testData[4].result);
		assert.deepEqual(removed, testData[4].removed);
	});

	it("Удаляет элемент с индекса -2 " + JSON.stringify(testData[5].source), () => {
		let removed = splice(testData[5].source, -2, 1);
		assert.deepEqual(testData[5].source, testData[5].result);
		assert.deepEqual(removed, testData[5].removed);
	});

	it("Удаляет все элементы, начиная с индекса 1 " + JSON.stringify(testData[6].source), () => {
		let removed = splice(testData[6].source, 2);
		assert.deepEqual(testData[6].source, testData[6].result);
		assert.deepEqual(removed, testData[6].removed);
	});
});