import observer from '@cocreate/observer';

let toolbars = [];

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
		targetDocument: Document,
	});

}

function init(params) {
	params.element = document.querySelector(params.selector);
	if (params.element)
		createToolbar(params);
}

function createToolbar({ element, selector, eventType, target, targetDocument, onEvent }) {

	let Window, Document, frame = targetDocument.defaultView.frameElement;

	if(!frame) {
		Document = document;
		Window = window;
	}
	else {
		Window = frame.contentWindow;
		Document = Window.document || Window.contentDocument;
	}
	
	let continer = {};
	let watch;

	Document.addEventListener(eventType, (e) => {
		if (e.target.hasAttribute('toolbar-target')) return;
		continer.lastElement = continer.element;
		continer.element = e;
		findToolbar(e);
		// resizeOb()
	});

	Window.addEventListener("scroll",
		() =>
		continer.element && findToolbar(continer.element)
	);
	
	Window.CoCreate.observer.init({
	    name: 'CoCreateToolbar',
	    observe: ['childList'],
	    callback (mutation) {
	        if (mutation.target == continer.element);
	        	findToolbar(continer.element);
	    }
	});

	toolbars.push({ element, selector, eventType, target, Document, onEvent });
}

/*global ResizeObserver*/
function resizeOb() {
	if (continer.element){
		if(watch)
			watch.unobserve(continer.lastElement.target)
		watch = new ResizeObserver(() => continer.element && findToolbar(continer.element));
		watch.observe(continer.element.target);
	}
}


function findToolbar(e) {
	let target = e.target;
	for(let toolbar of toolbars) {
		if (toolbar.Document == target.ownerDocument && toolbar.eventType == e.type) {
			if (toolbar.onEvent) {
				let r = toolbar.onEvent(target, e.type);
				if (Array.isArray(r)) {
					toolbar.target = target;
					showToolbar(toolbar)
				}
			}
			else {
				target = target.closest(toolbar.target);
				if(!target) {
					// hideToolbar(element, type)
					continue;
				}
				if (toolbar.eventType == e.type)
				toolbar.target = target;
				showToolbar(toolbar)
			}
		}
	}
}

function showToolbar(toolbar){
	let target = toolbar.target;
	let tagName = target.tagName;
	let box = toolbar.element;
	
	let frameElement = toolbar.Document.defaultView.frameElement;
	if(!frameElement)
		frameElement = { offsetTop: 0, offsetLeft: 0 };

	let Window = toolbar.Document.defaultView;
	let bar = box.querySelector(":scope .toolbar");
	if(!bar) bar = { offsetHeight: 0 };
	let tagNameEl = box.querySelector(":scope [tagName]");

	let elPosition = getPosition(target);
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
	box.style.width = target.offsetWidth + "px";
	box.style.height = target.offsetHeight + "px";

	if(target.offsetTop - bar.offsetHeight < 0)
		box.setAttribute("toolbar-overflow", "");
	else box.removeAttribute("toolbar-overflow");

	if(tagName && tagNameEl) {
	    if(toolbar.tagName) {
	        tagNameEl.innerHTML = toolbar.tagName;
	    } 
	    else
	    	tagNameEl.innerHTML = tagName;
	}

}

function hideToolbar(element, type) {
	for(let toolbar of toolbars) {
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


export default { init };
