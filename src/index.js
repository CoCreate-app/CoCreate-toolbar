/**
 * returns the absolute position of an element regardless of position/float issues
 * @param {HTMLElement} el - element to return position for 
 * @returns {object} { x: num, y: num }
 */
/*global ResizeObserver*/
/*global ResizeObserver*/

import { configExecuter } from '@cocreate/utils'

let toolbars = {};
let ntoolbars = [];

function initToolbar() {
	let elements = document.querySelectorAll('[toolbar-target]');
	initElements(elements);
	// initEvents(window)
}

function initElements(elements) {
	for(let element of elements)
		initElement(element);
}

async function initElement(element) {
	let target = element.getAttribute('toolbar-target');
	let Document = document;

	if(target.indexOf(';') !== -1) {
		[Document, target] = target.split(';');
	}

	// let targetDocument = element.ownerDocument;
	let event = element.getAttribute('toolbar-event');
	if(!event)
		event = 'mouseover';

	createToolbar({
		element: element,
		selector: '[toolbar-target]',
		eventType: event,
		target: target,
		document: Document,
	});

}

function createToolbar({ element, selector, eventType, target, document: sDoc, config, configKey }) {


	let Window, Document, frameElement, frame = sDoc.defaultView.frameElement;

	if(!frame) {
		//  frameElement = frame.contentWindow.document.body;
		Document = document;
		Window = window;
	}
	else {
		frameElement = frame;
		Window = frame.contentWindow;
		Document = Window.document || Window.contentDocument;
	}
	let box = document.querySelector(selector);
	if(box) {

		toolbars[selector] = box;



		let toolbar = box.querySelector(":scope .toolbar");
		let tagName = box.querySelector(":scope [tagName]");
		if(!toolbar) toolbar = { offsetHeight: 0 };
		let initiated = false;
		let continer = {};
		let watch;

		window.cocreateToolbar = Document;
		Document.addEventListener(eventType, (e) => {
			continer.lastElement = continer.element;
			continer.element = e.target;
			// showToolbar(e);
			update();
		});

		Window.addEventListener("scroll",
			() =>
			continer.element && update(continer.element)
		);

		// ntoolbars.set(selector, eventType, target, Document);

		ntoolbars.push({ element, selector, eventType, target, Document });


		function update(dontWatch) {
			//  if (!initiated) {
			//      initiated = true;
			//      Window.addEventListener("scroll",
			//          () =>
			//          continer.element && update(continer.element)
			//      );

			//  }
			if(!dontWatch) {
				if(watch)
					watch.unobserve(continer.lastElement)
				watch = new ResizeObserver(() => continer.element && update(true));
				watch.observe(continer.element);
			}

			if (configExecuter) {
				configExecuter(
					continer.element,
					configKey,
					(element, config, isSelector) => {
	
						if(isSelector) {
							let selector = config[configKey];
							if(!toolbars[selector]) {
								box = document.querySelector(selector)
								toolbars[selector] = box;
								toolbar = box.querySelector(":scope .toolbar");
								tagName = box.querySelector(":scope [tagName]");
							}
	
						}
	
	
						let elPosition = getPosition(element)
						box.style.display = "block";
						box.style.top =
							frameElement.offsetTop +
							elPosition.top -
							Window.scrollY -
							toolbar.offsetHeight +
							"px";
						box.style.left =
							frameElement.offsetLeft +
							elPosition.left +
							Window.scrollX +
							"px";
						box.style.width = element.offsetWidth + "px";
						box.style.height = element.offsetHeight + "px";
	
						if(element.offsetTop - toolbar.offsetHeight < 0)
							box.setAttribute("toolbar-overflow", "");
						else box.removeAttribute("toolbar-overflow");
	
						if(tagName && tagName.innerHTML !== element.tagName) {
							tagName.innerHTML = element.tagName;
	
							// for (let config of elementConfig) {
							//   if (config.tagName && element.matches(config.selector)) {
							//     if (tagName.innerHTML !== config.tagName)
							//       tagName.innerHTML = config.tagName;
							//     break;
							//   }
							// }
	
	
							if(config.tagName && config.tagName !== tagName.innerHTML) {
								tagName.innerHTML = config.tagName;
							}
						}
					},
					config
				);
			}
		}
	}
}

function showToolbar(e) {
	let element = e.target;
	let type = e.type
	for(let toolbar of ntoolbars) {
		if (!toolbar.target) continue; 
		let target = element.closest(toolbar.target);
		if(!target) {
			// hideToolbar(element, type)
			continue;
		}
		let tagName = element.tagName;
		let box = toolbar.element;
		let frameElement = toolbar.Document.defaultView.frameElement;
		if(!frameElement)
			frameElement = { offsetTop: 0, offsetLeft: 0 };

		let Window = toolbar.Document.defaultView;
		let bar = box.querySelector(":scope .toolbar");
		let tagNameEl = box.querySelector(":scope [tagName]");

		let elPosition = getPosition(element)
		box.style.display = "block";
		box.style.top =
			frameElement.offsetTop +
			elPosition.top -
			Window.scrollY -
			bar.offsetHeight +
			"px";
		box.style.left =
			frameElement.offsetLeft +
			elPosition.left +
			Window.scrollX +
			"px";
		box.style.width = element.offsetWidth + "px";
		box.style.height = element.offsetHeight + "px";

		if(element.offsetTop - bar.offsetHeight < 0)
			box.setAttribute("toolbar-overflow", "");
		else box.removeAttribute("toolbar-overflow");

		// if(tagName && tagName.innerHTML !== element.tagName) {
		//     tagName.innerHTML = element.tagName;


		//     if(config.tagName && config.tagName !== tagName.innerHTML) {
		//         tagName.innerHTML = config.tagName;
		//     }
		// }
	}

}

function hideToolbar(element, type) {
	for(let toolbar of ntoolbars) {
		if(toolbar.eventType == type)
			toolbar.element.style.display = "none";
	}
}

function getPosition(el) {
	//  let { x, y } = el.getBoundingClientRect()
	//  return { left: x, top: y };
	// finding el possition in scroll
	let x = 0,
		y = 0;

	while(el != null && el.tagName) {
		x += el.offsetLeft || 0;
		y += el.offsetTop || 0;
		el = el.offsetParent;
	}

	return { left: parseInt(x, 10), top: parseInt(y, 10) };
}

initToolbar();

export default { init: createToolbar };
