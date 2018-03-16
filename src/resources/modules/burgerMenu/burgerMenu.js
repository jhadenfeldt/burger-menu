class burgerMenu {

	constructor(selector) {
		this.$element = document.querySelector(selector);
		this.baseClass = selector.split('.')[1];

		this.menuIsVisible = false;
		this.$body = document.querySelector('body');


		this.$button = document.querySelector(selector + '__button');
		this.toggleMenu = this.toggleMenu.bind(this);
		this.$button.addEventListener('click', this.toggleMenu);

		this.$content = document.querySelector(selector + '__content');
		this.updateTransitionClass = this.updateTransitionClass.bind(this);
		this.$content.addEventListener("transitionend", this.updateTransitionClass);

		this.hideSubmenu = this.hideSubmenu.bind(this);
		this.$content.addEventListener("click", this.hideSubmenu);

		this.showSubmenu = this.showSubmenu.bind(this);
		document.querySelectorAll(selector + '__submenuTrigger').forEach((el) => {
			el.addEventListener('click', this.showSubmenu);
		});

		this.toggleDropdown = this.toggleDropdown.bind(this);
		document.querySelectorAll(selector + '__dropdownTrigger').forEach((el) => {
			el.addEventListener('click', this.toggleDropdown);
		});

		this._init();
	}

	toggleMenu() {
		this.menuIsVisible = !this.menuIsVisible;

		/**
		 * We need an additional transitioning class that enables the CSS transitions only when the menu is visible,
		 * otherwise the hidden menu would become visible when resizing the browser.
		 */
		if (this.menuIsVisible) {
			this.$content.classList.add(this.baseClass + '__content--transitioning');
		}

		this.$body.classList.toggle('prevent-scroll');
		this.$element.classList.toggle(this.baseClass + '--visible');
	}

	updateTransitionClass() {
		if (!this.menuIsVisible) {
			this.$content.classList.remove(this.baseClass + '__content--transitioning');
		}
	}

	showSubmenu(e) {
		e.target.parentNode.classList.add(this.baseClass + '__listItem--active');
		this.$currentSubmenu = e.target.parentNode;
	}

	hideSubmenu(e) {
		// Close on clicks outside of the submenu or in case the close button was clicked
		if (!this.$currentSubmenu.contains(e.target) || e.target.classList.contains(this.baseClass + '__submenuClose')) {
			e.preventDefault();
			this.$currentSubmenu.classList.remove(this.baseClass + '__listItem--active');
			this.$currentSubmenu = '';
		}
	}

	toggleDropdown(e) {
		e.target.parentNode.classList.toggle(this.baseClass + '__listItem--dropdown-visible');

		if (!e.target.nextElementSibling.style.height || e.target.nextElementSibling.style.height === '0px') {

			// Get the set height of the element and use it for calculating the target dropdown height
			let elementHeight = e.target.nextElementSibling.children[0].clientHeight;

			e.target.nextElementSibling.style.height = elementHeight * e.target.nextElementSibling.children.length + 'px';

		} else {
			e.target.nextElementSibling.style.height = '0px';
		}
	}

	_init() {

	}
}

export default burgerMenu;
