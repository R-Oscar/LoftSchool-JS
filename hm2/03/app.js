function calculator(firstNumber) {
	return {
		sum: function() {
			var result = firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				result += arguments[i];
			}
			return result;
		},

		dif: function() {
			var result = firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				result -= arguments[i];
			}
			return result;
		},

		div: function() {
			var result = firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] === 0) throw new Error("Can't divide by zero");
				result /= arguments[i];
			}
			return result;
		},

		mul: function() {
			var result = firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				result *= arguments[i];
			}
			return result;
		}
	}
}

var myCalc = calculator(100);

console.log(myCalc.sum(1, 2, 3));
console.log(myCalc.dif(10, 20));
console.log(myCalc.div(2, 2));
console.log(myCalc.mul(2, 2));