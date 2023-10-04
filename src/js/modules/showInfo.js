export default class ShowInfo {
	constructor(triggersSelector) {
		this.btns = document.querySelectorAll(triggersSelector);
	}

	init() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				try {
					const sibling = btn.closest('.module__info-show').nextElementSibling;

					sibling.classList.toggle('msg');
					sibling.style.marginTop = '20px';
					sibling.classList.add('animated', 'fadeIn');
				} catch (e){}
			})
		})
	}
}