import MainSlider from "./modules/slider/slider-main";
import VideoPlayer from "./modules/playVideo";

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	const slider = new MainSlider({btns: '.next', page: '.page'});
	slider.render();

	const player = new VideoPlayer('.showup .play', '.overlay');
	player.init();

});