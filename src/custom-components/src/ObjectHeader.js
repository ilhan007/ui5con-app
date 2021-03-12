import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";

// Template
import ObjectHeaderTemplate from "./generated/templates/ObjectHeaderTemplate.lit.js";

// Styles
import ObjectHeaderCss from "./generated/themes/ObjectHeader.css.js";

const NAV_BREAKPOINT = 1024;

const metadata = {
	tag: "ui5-mdk-object-header",
	properties: {

		_pageWidth: {
			type: Float,
		},

		_descPage: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: {
		"default": {
			type: Node,
			propertyName: "description",
		},
		heading: {
			type: HTMLElement,
		},
		subheading: {
			type: HTMLElement,
		},
		image: {
			type: HTMLElement,
		},
		bodyText: {
			type: HTMLElement,
		},
		footnote: {
			type: HTMLElement,
		},
		status: {
			type: HTMLElement,
		},
		statusDescription: {
			type: HTMLElement,
		},
		tags: {
			type: HTMLElement,
			individualSlots: true,
		},
	},
	events: {},
};

class ObjectHeader extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ObjectHeaderTemplate;
	}

	static get styles() {
		return ObjectHeaderCss;
	}

	constructor() {
		super();
		this._handleResize = this._updateWidth.bind(this);
		if (!isDesktop()) {
			this._scrollEnablement = new ScrollEnablement(this);
			this._scrollEnablement.attachEvent("touchend", event => {
				this._navigate(event);
			});
		}
	}

	onAfterRendering() {
		if (!isDesktop()) {
			this._scrollEnablement.scrollContainer = this.getDomRef().querySelector(".pages");
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this.getDomRef(), this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.getDomRef(), this._handleResize);
	}


	togglePage() {
		this._descPage = !this._descPage;
	}

	get classes() {
		return {
			firstDot: {
				"dot": true,
				"dot-first": true,
				"dot-passive": this._descPage,
				"dot-active": !this._descPage,
			},
			secondDot: {
				"dot": true,
				"dot-second": true,
				"dot-passive": !this._descPage,
				"dot-active": this._descPage,
			},
			viewport: {
				"pages-viewport": true,
				"shifted": this._descPage,
			},
			content: {
				"content": true,
				"no-image": !this.hasImage,
			},
		};
	}

	get styles() {
		const w = this._pageWidth;

		return {
			pages: {
				width: `${w * 2}px`,
			},
			main: {
				width: `${w}px`,
			},
			desc: {
				width: `${w}px`,
			},
		};
	}

	get hasImage() {
		return !!this.image.length;
	}

	get hasDescription() {
		const onlyTextNodes = this.description.every(node => node instanceof Text);
		return !onlyTextNodes || this.description.map(node => node.nodeValue.trim()).join("") !== "";
	}

	get needsNavigation() {
		return this.hasDescription && this._pageWidth < NAV_BREAKPOINT;
	}

	_updateWidth() {
		const clientRect = this.getDomRef().getBoundingClientRect();
		this._pageWidth = clientRect.width;
		if (this._pageWidth >= NAV_BREAKPOINT) {
			this._descPage = false;
		}
	}

	_onkeydown(event) {
		if (this._pageWidth >= NAV_BREAKPOINT) {
			return;
		}

		if ((isLeft(event) && this._descPage) || (isRight(event) && !this._descPage)) {
			this.togglePage();
		}
	}

	_navigate(event) {
		if (!event) {
			return;
		}

		if (this._pageWidth >= NAV_BREAKPOINT) {
			return;
		}

		if ((event.isLeft && this._descPage) || (event.isRight && !this._descPage)) {
			this.togglePage();
		}
	}
}

ObjectHeader.define();

export default ObjectHeader;
