function timer(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

timer(3000).then(() => console.log('я вывелась через 3 секунды'));