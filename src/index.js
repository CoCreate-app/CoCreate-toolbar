/*global CoCreate, ResizeObserver*/
import observer from "@cocreate/observer";
import { checkElementConfig } from "@cocreate/element-config";
import { hasSelection } from "@cocreate/selection";
import "./traverseElement";

let windows = new Map();
let toolbars = [];

function initToolbar() {
	let elements = document.querySelectorAll("[toolbar-selector]");
	initElements(elements);
}

function initElements(elements) {
	for (let element of elements) initElement(element);
}

async function initElement(element) {
	let targetSelector = element.getAttribute("toolbar-selector");
	let targetDocument = document;

	if (targetSelector.indexOf(";") !== -1) {
		let documentSelector;
		[documentSelector, targetSelector] = targetSelector.split(";");
		let frame = document.querySelector(documentSelector);
		if (frame) targetDocument = frame.contentDocument;
	}

	let event = (element.getAttribute("toolbar-event") || "mouseover").split(
		/\s*,\s*/
	);

	init({
		element: element,
		selector: "[toolbar-selector]",
		eventType: event,
		targetSelector: targetSelector.trim(),
		targetDocument: targetDocument
	});
}

function init({
	element,
	selector,
	eventType,
	targetSelector,
	targetDocument,
	onEvent
}) {
	if (!element) element = document.querySelector(selector);

	let Window,
		frame = targetDocument.defaultView.frameElement;

	if (!frame) {
		targetDocument = document;
		Window = window;
	} else {
		Window = frame.contentWindow;
		targetDocument = Window.document || Window.contentDocument;
	}

	let eventListeners = windows.get(Window);
	if (!eventListeners) windows.set(Window, (eventListeners = []));

	if (!Array.isArray(eventType)) eventType = [eventType];

	for (let i = 0; i < eventType.length; i++) {
		if (eventListeners.indexOf(eventType[i]) == -1) {
			eventListeners.push(eventType[i]);
			initEvents(Window, targetDocument, eventType[i]);
		}
	}

	toolbars.push({
		element,
		selector,
		eventType,
		targetSelector,
		targetDocument,
		onEvent
	});
}

function initEvents(Window, targetDocument, eventType) {
	let container = [];
	let watch;

	targetDocument.addEventListener(eventType, (e) => {
		// if (e.type == 'selectionchange')
		// 	if (!hasSelection(e.target.parentElement)) return;
		if (e.target.nodeName != "#text" && e.target.nodeName != "#document")
			if (e.target.closest("[toolbar-selector]")) return;
		if (e.type == "selectstart" || e.type == "selectionchange") {
			if (e.target.closest && !e.target.closest("[contenteditable]"))
				return;
			if (
				e.target.parentElement &&
				CoCreate.text &&
				!hasSelection(e.target.parentElement)
			)
				return;
			const selection = Window.getSelection();
			e = copyEvent(e);
			e.selection = selection;
			if (selection.anchorNode && selection.anchorNode.parentElement)
				e.target = selection.anchorNode.parentElement;
			else
				console.log("Selection does not exists:", selection.toString());
			// if (selection && selection.rangeCount > 0 && !selection.isCollapsed)
			//     e.target = selection.anchorNode.parentElement
		}

		if (e.target.nodeName === "#document") {
			e = copyEvent(e);
			e.target = e.target.documentElement;
		}
		// if (container.lastElement.type == 'selectstart' || container.lastElement.type == 'selectchange')
		// 	if (e.target.ownerDocument == container.lastElement.target.ownerDocument)
		// 	hide(container.lastElement.target.ownerDocument, container.lastElement.type)
		container.lastElement = container.element;
		container.element = e;
		findToolbar(e);
		// resizeOb()
		if (container.element) {
			if (watch) watch.unobserve(container.lastElement.target);
			watch = new ResizeObserver(
				() => container.element && findToolbar(container.element)
			);
			watch.observe(container.element.target);
		}
	});

	function copyEvent(event) {
		const propertiesToCopy = ["type", "target", "timeStamp"];
		const newObject = {};

		// Copy the specified properties from the event to the new object
		propertiesToCopy.forEach((prop) => {
			newObject[prop] = event[prop];
		});

		return newObject;
	}

	Window.addEventListener("scroll", scroll, { passive: false });

	Window.observer = observer.init({
		name: "CoCreateToolbar",
		observe: ["addedNodes"],
		callback(mutation) {
			if (!container.element) return;
			if (mutation.target == container.element.target)
				findToolbar(container.element);
		}
	});

	// TODO: observer needs to support targeting another document
	// targetDocument.observer = observer.init({
	//     name: 'CoCreateToolbar',
	//     observe: ['removedNodes'],
	//     callback (mutation) {
	//         if (mutation.target.toolbar)
	// 			hide(mutation.target.toolbar.element)
	//     }
	// });

	function scroll() {
		container.element && findToolbar(container.element);
	}
}

function findToolbar(e) {
	let target = e.target;
	if (e.target.nodeName == "#text") target = e.target.parentElement;
	if (!target) return;
	if (target.closest && target.closest("toolbar, .toolbar")) {
		return;
	}

	for (let toolbar of toolbars) {
		// let closestToolbar = target.closest('toolbar, .toolbar')
		// if (closestToolbar)
		//     continue

		if (
			toolbar.targetDocument == target.ownerDocument &&
			toolbar.eventType.includes(e.type)
		) {
			if (target && target.isConnected === false) {
				hide(toolbar);
			} else if (toolbar.onEvent) {
				if (toolbar.onEvent(target, e.type)) {
					toolbar.target = target;
					toolbar.element.toolbar = { target: target };
					show(toolbar.element);
				} else hide(toolbar);
			} else if (toolbar.element.hasAttribute("config-key")) {
				let ctarget = target;
				let option = toolbar.element.getAttribute("config-key");
				if (!option) option = e.type;
				let config;
				do {
					config = checkElementConfig(ctarget, [option]);
					if (!config) ctarget = ctarget.parentElement;
				} while (!config && ctarget);

				if (config) {
					toolbar.target = target;
					toolbar.element.toolbar = {
						target: target,
						label: config.label,
						selection: e.selection
					};
					show(toolbar.element);
				} else hide(toolbar);
			} else {
				toolbar.target = target.closest(toolbar.targetSelector);
				if (!toolbar.target) {
					hide(toolbar);
					continue;
				}
				toolbar.element.toolbar = {
					target: target,
					selection: e.selection
				};
				show(toolbar.element);
			}
		}
	}
}

function show(toolbar) {
	let target = toolbar.toolbar.target;
	let selection = toolbar.toolbar.selection;
	let tagName = target.tagName;
	let targetDocument = target.ownerDocument;
	let targetWindow = targetDocument.defaultView;

	// Get computed styles of the target element
	const computedStyles = targetWindow.getComputedStyle(target);
	const marginLeft = parseFloat(computedStyles.marginLeft) || 0;
	const marginRight = parseFloat(computedStyles.marginRight) || 0;
	const marginTop = parseFloat(computedStyles.marginTop) || 0;
	const marginBottom = parseFloat(computedStyles.marginBottom) || 0;

	let frameElement = targetWindow.frameElement; // The iframe element if inside an iframe

	let bar = toolbar.querySelector(":scope .tools, :scope tools");
	if (!bar) bar = { offsetHeight: 0 };
	let tagNameEl = toolbar.querySelector(":scope [tagName]");

	// Get the position of the target relative to the viewport
	let rect = target.getBoundingClientRect();

	// Initialize total offsets
	let totalLeft = rect.left - marginLeft;
	let totalTop = rect.top - marginTop - bar.offsetHeight;

	// If inside an iframe, accumulate offsets
	let currentWindow = targetWindow;
	while (currentWindow !== window) {
		let frameRect = currentWindow.frameElement.getBoundingClientRect();
		totalLeft += frameRect.left;
		totalTop += frameRect.top;

		currentWindow = currentWindow.parent;
	}

	// Add window scroll offsets if position absolute
	// totalLeft += window.scrollX;
	// totalTop += window.scrollY;

	if (selection && !selection.isCollapsed) {
		const range = selection.getRangeAt(0);
		const selRect = range.getBoundingClientRect();

		// Recalculate totalLeft and totalTop based on the selection
		totalLeft = selRect.left + selRect.width / 2 - bar.offsetWidth / 2;
		totalTop = selRect.top - bar.offsetHeight - 10;

		// If inside an iframe, accumulate iframe offsets
		currentWindow = targetWindow;
		while (currentWindow !== window) {
			let frameRect = currentWindow.frameElement.getBoundingClientRect();
			totalLeft += frameRect.left;
			totalTop += frameRect.top;

			currentWindow = currentWindow.parent;
		}

		// Add window scroll offsets if position absolute
		// totalLeft += window.scrollX;
		// totalTop += window.scrollY;
	} else if (selection && selection.isCollapsed) {
		// Collapsed selection (no text selected)
		toolbar.style.display = "none";
		return;
	}

	toolbar.style.left = `${totalLeft}px`;
	toolbar.style.top = `${totalTop}px`;

	toolbar.style.position = "fixed";

	// Adjust toolbar dimensions to include margins
	let totalWidth, totalHeight;

	if (target instanceof SVGElement) {
		// Margins may not apply to SVG elements
		totalWidth = rect.width;
		totalHeight = rect.height;
	} else {
		// Include margins for HTML elements
		totalWidth = rect.width + marginLeft + marginRight;
		totalHeight = rect.height + marginTop + marginBottom;
	}

	toolbar.style.width = `${totalWidth}px`;
	toolbar.style.height = `${totalHeight}px`;

	// Handle toolbar overflow
	if (rect.top - bar.offsetHeight - marginTop < 0)
		toolbar.setAttribute("toolbar-overflow", "");
	else toolbar.removeAttribute("toolbar-overflow");

	// Update tagName if applicable
	if (tagName && tagNameEl) {
		let label = toolbar.toolbar.label;
		if (label) label = label.replace("{{tagName}}", tagName);
		tagNameEl.innerHTML = label || tagName;
	}
	toolbar.style.display = "block";
}

function hide(toolbar) {
	toolbar.target = "";
	toolbar.element.style.display = "none";
	toolbar.element.toolbar = { target: "" };
}

initToolbar();

export default { init, show, hide };
