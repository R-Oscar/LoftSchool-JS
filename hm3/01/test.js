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
		}
	]

	it("Выполняет срез с " + JSON.stringify(testData[0].source) + ", результат: " + JSON.stringify(testData[0].result), () => {
		assert.deepEqual(slice(testData[0].source, 1, 3), testData[0].result);
	});

	it("Выполняет срез с " + JSON.stringify(testData[1].source) + ", результат: " + JSON.stringify(testData[1].result), () => {
		assert.deepEqual(slice(testData[1].source, -4, -2), testData[1].result);
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
		}
	]

	it("Суммирует элементы массива " + JSON.stringify(testData[0].source) + ", результат: " + JSON.stringify(testData[0].result), () => {
		assert.equal(reduce(testData[0].source, (a, b) => a + b), testData[0].result);
	});

	it("Собирает массив " + JSON.stringify(testData[1].source) + " в единый, результат: " + JSON.stringify(testData[1].result), () => {
		assert.deepEqual(reduce(testData[1].source, (a, b) => a.concat(b)), testData[1].result);
	})
});