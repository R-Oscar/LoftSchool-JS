"use strict";

const ACCESS_FRIENDS = 2;

Handlebars.registerHelper('age', (bdate) => bdate === "" ? "Not specified" : new Date(new Date().getTime() - bdate).getFullYear() - 1970);

Handlebars.registerHelper('birthday', (bdate) => bdate === "" ? "Not specified" : new Date(bdate).toLocaleString("ru", {
	year: "numeric",
	month: "long",
	day: "numeric"
}));

new Promise((resolve) => {
	if (document.readyState === 'complete') {
		resolve();
	} else {
		window.onload = resolve;
	}
}).then(() => {
	return new Promise((resolve, reject) => {
		VK.init({
			apiId: 5756362
		});

		VK.Auth.login(function(response) {
			if (response.session) {
				resolve(response);
			} else {
				reject(new Error('Не удалось авторизоваться'));
			}
		}, ACCESS_FRIENDS);
	});
}).then(() => {
	return new Promise((resolve, reject) => {
		VK.api('friends.get', {
			'uid': '43317791',
			'fields': 'photo,first_name,last_name,bdate'
		}, (response) => {
			if (response.error) {
				reject(new Error(response.error.error_msg))
			} else {
				let result = response.response;
				result.forEach((currentValue) => {
					if (currentValue.bdate && currentValue.bdate.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
						let from = currentValue.bdate.split(".");
						currentValue.bdate = new Date(from[2], from[1] - 1, from[0]).getTime();
					} else {
						currentValue.bdate = '';
					}
				});
				console.log(result);
				result.sort((a, b) => b.bdate - a.bdate);

				let source = document.getElementById('friendsListTemplate').innerHTML;
				let templateFn = Handlebars.compile(source);
				let template = templateFn({friends: result});

				document.getElementById('result').innerHTML = template;
			}
		});
	});
});