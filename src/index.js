import observer from '@cocreate/observer';

let windows = new Map();
let toolbars = [];
let watch;
	
function initToolbar() {
	let elements = document.querySelectorAll('[toolbar-target]');
	initElements(elements);
}

function initElements(elements) {
	for(let element of elements)
		initElement(element);
}

async function initElement(element) {
	let targetSelector = element.getAttribute('toolbar-target');
	let Document = document;

	if(targetSelector.indexOf(';') !== -1) {
		let documentSelector;
		[documentSelector, targetSelector] = targetSelector.split(';');
		let frame = document.querySelector(documentSelector)
		Document = frame.contentDocument;
	}

	// let targetDocument = element.ownerDocument;
	let event = element.getAttribute('toolbar-event');
	if(!event)
		event = 'mouseover';

	init({
		element: element,
		selector: '[toolbar-target]',
		eventType: event,
		targetSelector: targetSelector,
		targetDocument: Document,
	});

}

function init({ element, selector, eventType, targetSelector, targetDocument, onEvent }) {
	if (!element)
		element = document.querySelector(selector);
		
	let Window, Document, frame = targetDocument.defaultView.frameElement;

	if(!frame) {
		Document = document;
		Window = window;
	}
	else {
		Window = frame.contentWindow;
		Document = Window.document || Window.contentDocument;
	}
	
	let eventListeners = windows.get(Window);
	if(!eventListeners) eventListeners = [];
		
	if( eventListeners.indexOf(eventType) == -1) {
		eventListeners.push(eventType);
		initEvents(Window, Document, eventType);
    	windows.set(Window, eventListeners);
	}

	toolbars.push({ element, selector, eventType, targetSelector, Document, onEvent });
}

function initEvents(Window, Document, eventType){
	let continer = [];
	// let watch;

	Document.addEventListener(eventType, (e) => {
		// if (e.type == 'selectionchange')
		// 	if (!hasSelection(e.target.parentElement)) return;
		if ((e.target.nodeName != '#text') || (e.target.nodeName != '#document'))
			if (e.target.hasAttribute('toolbar-target')) return;
		if (e.type == 'selectstart' || e.type == 'selectionchange')
			if (!CoCreate.text.hasSelection(e.target.parentElement)) return;
	
		// if (continer.lastElement.type == 'selectstart' || continer.lastElement.type == 'selectchange')
		// 	if (e.target.ownerDocument == continer.lastElement.target.ownerDocument)
		// 	hideToolbar(continer.lastElement.target.ownerDocument, continer.lastElement.type)
		continer.lastElement = continer.element;
		continer.element = e;
		findToolbar(e);
		// resizeOb()
	});

	Window.addEventListener("scroll",
		() =>
		continer.element && findToolbar(continer.element)
	);
	
		Window.observer = observer.init({
		// Window.observer = observer;
		// Window.observer.init({
		    name: 'CoCreateToolbar',
		    observe: ['addedNodes'],
		    callback (mutation) {
				if (!continer.element) return;
		        // if (mutation.target == continer.element.target)
		        if (mutation.target.getAttribute('element_id') == continer.element.target.getAttribute('element_id'))
		        	findToolbar(continer.element);
		    }
		});
	// }
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
	if (e.target.nodeName == '#text')
		target = e.target.parentElement
	for(let toolbar of toolbars) {
		// let target = e.target;
		
		if (toolbar.Document == target.ownerDocument && toolbar.eventType == e.type) {
			if (toolbar.onEvent) {
				let r = toolbar.onEvent(target, e.type);
				if (Array.isArray(r)) {
					toolbar.target = target;
					showToolbar(toolbar);
				} 
				else
					hideToolbar(toolbar.Document, e.type)
			}
			else {
				toolbar.target = target.closest(toolbar.targetSelector);
				if(!toolbar.target) {
					hideToolbar(toolbar.Document, e.type)
					continue;
				}
				showToolbar(toolbar);
			}
		}
	}
}

function showToolbar(toolbar){
	let target = toolbar.target;
	let tagName = target.tagName;
	let box = toolbar.element;
	box.toolbar = {target: target};
	
	let frameElement = toolbar.Document.defaultView.frameElement;
	if(!frameElement)
		frameElement = { offsetTop: 0, offsetLeft: 0 };

	let Window = toolbar.Document.defaultView;
	let bar = box.querySelector(":scope .tools, :scope tools");
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

function hideToolbar(Document, type) {
	for(let toolbar of toolbars) {
		if(toolbar.eventType == type && toolbar.Document == Document)
			toolbar.element.style.display = "none";
			toolbar.toolbar = {target: ''};

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


export default { init, showToolbar };
