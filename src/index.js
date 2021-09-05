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
	let targetDocument = document;

	if(targetSelector.indexOf(';') !== -1) {
		let documentSelector;
		[documentSelector, targetSelector] = targetSelector.split(';');
		let frame = document.querySelector(documentSelector)
		targetDocument = frame.contentDocument;
	}

	let event = element.getAttribute('toolbar-event');
	if(!event)
		event = 'mouseover';

	init({
		element: element,
		selector: '[toolbar-target]',
		eventType: event,
		targetSelector: targetSelector,
		targetDocument: targetDocument,
	});

}

function init({ element, selector, eventType, targetSelector, targetDocument, onEvent }) {
	if (!element)
		element = document.querySelector(selector);
		
	let Window, frame = targetDocument.defaultView.frameElement;

	if(!frame) {
		targetDocument = document;
		Window = window;
	}
	else {
		Window = frame.contentWindow;
		targetDocument = Window.document || Window.contentDocument;
	}
	
	let eventListeners = windows.get(Window);
	if(!eventListeners) eventListeners = [];
		
	if( eventListeners.indexOf(eventType) == -1) {
		eventListeners.push(eventType);
		initEvents(Window, targetDocument, eventType);
    	windows.set(Window, eventListeners);
	}

	toolbars.push({ element, selector, eventType, targetSelector, targetDocument, onEvent });
}

function initEvents(Window, targetDocument, eventType){
	let continer = [];
	let watch;

	targetDocument.addEventListener(eventType, (e) => {
		// if (e.type == 'selectionchange')
		// 	if (!hasSelection(e.target.parentElement)) return;
		if ((e.target.nodeName != '#text') || (e.target.nodeName != '#document'))
			if (e.target.hasAttribute('toolbar-target')) return;
		if (e.type == 'selectstart' || e.type == 'selectionchange')
			if (!CoCreate.text.hasSelection(e.target.parentElement)) return;
	
		// if (continer.lastElement.type == 'selectstart' || continer.lastElement.type == 'selectchange')
		// 	if (e.target.ownerDocument == continer.lastElement.target.ownerDocument)
		// 	hide(continer.lastElement.target.ownerDocument, continer.lastElement.type)
		continer.lastElement = continer.element;
		continer.element = e;
		findToolbar(e);
		// resizeOb()
		if (continer.element){
			if(watch)
				watch.unobserve(continer.lastElement.target)
			watch = new ResizeObserver(() => continer.element && findToolbar(continer.element));
			watch.observe(continer.element.target);
		}
	});

	Window.addEventListener("scroll",
		() =>
		continer.element && findToolbar(continer.element)
	);
	
	Window.observer = observer.init({
	    name: 'CoCreateToolbar',
	    observe: ['addedNodes'],
	    callback (mutation) {
			if (!continer.element) return;
	        // if (mutation.target == continer.element.target)
	        if (mutation.target.getAttribute('element_id') == continer.element.target.getAttribute('element_id'))
	        	findToolbar(continer.element);
	    }
	});
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
		
		if (toolbar.targetDocument == target.ownerDocument && toolbar.eventType == e.type) {
			if (toolbar.onEvent) {
				// let r = toolbar.onEvent(target, e.type);
				// if (Array.isArray(r)) {
				if (toolbar.onEvent(target, e.type)) {
					toolbar.target = target;
					toolbar.element.toolbar = {target: target};
					show(toolbar.element);
				} 
				else
					hide(toolbar.element)
			}
			else {
				toolbar.target = target.closest(toolbar.targetSelector);
				if(!toolbar.target) {
					hide(toolbar.element)
					continue;
				}
				toolbar.element.toolbar = {target: target};
				show(toolbar.element);
			}
		}
	}
}

function show(toolbar){
	// let box = toolbar;
	let target = toolbar.toolbar.target;
	let tagName = target.tagName;
	let targetWindow = target.ownerDocument.defaultView;

	let frameElement = targetWindow.frameElement;
	if(!frameElement)
		frameElement = { offsetTop: 0, offsetLeft: 0 };

	let bar = toolbar.querySelector(":scope .tools, :scope tools");
	if(!bar) bar = { offsetHeight: 0 };
	let tagNameEl = toolbar.querySelector(":scope [tagName]");

	let elPosition = getPosition(target);
	toolbar.style.display = "block";
	toolbar.style.top =
		frameElement.offsetTop +
		elPosition.top -
		targetWindow.scrollY -
		bar.offsetHeight +
		"px";
	toolbar.style.left =
		frameElement.offsetLeft +
		elPosition.left +
		targetWindow.scrollX +
		"px";
	toolbar.style.width = target.offsetWidth + "px";
	toolbar.style.height = target.offsetHeight + "px";

	if(target.offsetTop - bar.offsetHeight < 0)
		toolbar.setAttribute("toolbar-overflow", "");
	else toolbar.removeAttribute("toolbar-overflow");

	if(tagName && tagNameEl) {
	    if(toolbar.toolbar.tagName) {
	        tagNameEl.innerHTML = toolbar.toolbar.tagName;
	    } 
	    else
	    	tagNameEl.innerHTML = tagName;
	}

}

function hide(toolbar) {
	toolbar.style.display = "none";
	toolbar.toolbar = {target: ''};
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


export default { init, show, hide };
