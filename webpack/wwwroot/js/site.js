var $ = require('jquery');
window.Vue = require('vue');
import "../scss/main.scss";
import 'bootstrap';
import Hello from "./vue/Hello";

console.log('hello there');

$(document).ready(() => {
	if ($('#app')) {
		var app = new Vue({
			el: '#app',
			components: {
				Hello
			}
		});
	}
});