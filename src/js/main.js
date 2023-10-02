import Slider from "./modules/slider";

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	const slider = new Slider('.page', '.next');
	slider.render();

});