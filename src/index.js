/*global CoCreate, ResizeObserver*/
import observer from '@cocreate/observer';
import { checkElementConfig } from '@cocreate/element-config';
import { hasSelection } from '@cocreate/selection';
import './traverseElement';

let windows = new Map();
let toolbars = [];

function initToolbar() {
    let elements = document.querySelectorAll('[toolbar-selector]');
    initElements(elements);
}

function initElements(elements) {
    for (let element of elements)
        initElement(element);
}

async function initElement(element) {
    let targetSelector = element.getAttribute('toolbar-selector');
    let targetDocument = document;

    if (targetSelector.indexOf(';') !== -1) {
        let documentSelector;
        [documentSelector, targetSelector] = targetSelector.split(';');
        let frame = document.querySelector(documentSelector);
        if (frame)
            targetDocument = frame.contentDocument;
    }

    let event = element.getAttribute('toolbar-event');
    if (!event)
        event = 'mouseover';

    init({
        element: element,
        selector: '[toolbar-selector]',
        eventType: event,
        targetSelector: targetSelector.trim(),
        targetDocument: targetDocument,
    });

}

function init({ element, selector, eventType, targetSelector, targetDocument, onEvent }) {
    if (!element)
        element = document.querySelector(selector);

    let Window, frame = targetDocument.defaultView.frameElement;

    if (!frame) {
        targetDocument = document;
        Window = window;
    } else {
        Window = frame.contentWindow;
        targetDocument = Window.document || Window.contentDocument;
    }

    let eventListeners = windows.get(Window);
    if (!eventListeners) eventListeners = [];

    if (eventListeners.indexOf(eventType) == -1) {
        eventListeners.push(eventType);
        initEvents(Window, targetDocument, eventType);
        windows.set(Window, eventListeners);
    }

    toolbars.push({ element, selector, eventType, targetSelector, targetDocument, onEvent });
}

function initEvents(Window, targetDocument, eventType) {
    let container = [];
    let watch;

    targetDocument.addEventListener(eventType, (e) => {

        // if (e.type == 'selectionchange')
        // 	if (!hasSelection(e.target.parentElement)) return;
        if ((e.target.nodeName != '#text') && (e.target.nodeName != '#document'))
            if (e.target.closest('[toolbar-selector]')) return;
        if (e.type == 'selectstart' || e.type == 'selectionchange') {
            if (e.target.closest && !e.target.closest('[contenteditable]')) return;
            if (e.target.parentElement && CoCreate.text && !hasSelection(e.target.parentElement)) return;
            const selection = window.getSelection();
            e = copyEvent(e);
            e.selection = selection
            e.target = selection.anchorNode.parentElement
        }

        // if (container.lastElement.type == 'selectstart' || container.lastElement.type == 'selectchange')
        // 	if (e.target.ownerDocument == container.lastElement.target.ownerDocument)
        // 	hide(container.lastElement.target.ownerDocument, container.lastElement.type)
        container.lastElement = container.element;
        container.element = e;
        findToolbar(e);
        // resizeOb()
        if (container.element) {
            if (watch)
                watch.unobserve(container.lastElement.target);
            watch = new ResizeObserver(() => container.element && findToolbar(container.element));
            watch.observe(container.element.target);
        }
    });

    function copyEvent(event) {
        const propertiesToCopy = ['type', 'target', 'timeStamp'];
        const newObject = {};

        // Copy the specified properties from the event to the new object
        propertiesToCopy.forEach(prop => {
            newObject[prop] = event[prop];
        });

        return newObject
    }


    Window.addEventListener("scroll", scroll, { passive: false });

    Window.observer = observer.init({
        name: 'CoCreateToolbar',
        observe: ['addedNodes'],
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
    if (e.target.nodeName == '#text')
        target = e.target.parentElement;
    if (!target) return;
    for (let toolbar of toolbars) {
        let closestToolbar = target.closest('toolbar, .toolbar')
        if (closestToolbar)
            continue
        if (toolbar.targetDocument == target.ownerDocument && toolbar.eventType == e.type) {
            if (toolbar.onEvent) {
                if (toolbar.onEvent(target, e.type)) {
                    toolbar.target = target;
                    toolbar.element.toolbar = { target: target };
                    show(toolbar.element);
                } else
                    hide(toolbar.element);
            } else if (toolbar.element.hasAttribute('config-key')) {
                let ctarget = target;
                let option = toolbar.element.getAttribute('config-key');
                if (!option)
                    option = e.type;
                let config;
                do {
                    config = checkElementConfig(ctarget, [option]);
                    if (!config)
                        ctarget = ctarget.parentElement
                } while (!config && ctarget);

                if (config) {
                    toolbar.target = target;
                    toolbar.element.toolbar = { target: target, label: config.label };
                    show(toolbar.element);
                } else
                    hide(toolbar.element);
            } else if (e.selection) {
                if (!e.selection.isCollapsed) {
                    const range = e.selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();

                    toolbar.element.style.left = `${rect.left + window.scrollX + rect.width / 2 - toolbar.element.offsetWidth / 2}px`;
                    toolbar.element.style.top = `${rect.top + window.scrollY - toolbar.element.offsetHeight - 10}px`;

                    toolbar.element.style.position = 'absolute';
                    toolbar.element.style.display = 'block';
                } else {
                    toolbar.element.style.display = 'none';
                }
                toolbar.element.toolbar = { target: target };
            } else {
                toolbar.target = target.closest(toolbar.targetSelector);
                if (!toolbar.target) {
                    hide(toolbar.element);
                    continue;
                }
                toolbar.element.toolbar = { target: target };
                show(toolbar.element);
            }
        }
    }
}

function show(toolbar) {
    let target = toolbar.toolbar.target;
    let tagName = target.tagName;
    let targetWindow = target.ownerDocument.defaultView;

    let frameElement = targetWindow.frameElement;
    if (!frameElement)
        frameElement = { offsetTop: 0, offsetLeft: 0 };

    let bar = toolbar.querySelector(":scope .tools, :scope tools");
    if (!bar) bar = { offsetHeight: 0 };
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

    if (!target.offsetWidth && target.offsetWidth !== 0)
        toolbar.style.width = target.clientWidth + "px";
    else
        toolbar.style.width = target.offsetWidth + "px";

    if (!target.offsetHeight && target.offsetHeight !== 0)
        toolbar.style.height = target.clientHeight + "px";
    else
        toolbar.style.height = target.offsetHeight + "px";

    if (target.offsetTop - bar.offsetHeight < 0)
        toolbar.setAttribute("toolbar-overflow", "");
    else toolbar.removeAttribute("toolbar-overflow");

    if (tagName && tagNameEl) {
        let label = toolbar.toolbar.label;
        if (label)
            label = label.replace('{{tagName}}', tagName);
        tagNameEl.innerHTML = label || tagName;
    }

}

function hide(toolbar) {
    toolbar.style.display = "none";
    toolbar.toolbar = { target: '' };
}

function getPosition(el) {
    //  let { x, y } = el.getBoundingClientRect()
    //  return { left: x, top: y };
    // finding el possition in scroll
    let x = 0,
        y = 0;

    while (el != null && el.tagName) {
        if (!el.offsetLeft && el.offsetLeft !== 0)
            x += el.clientLeft || 0;
        else
            x += el.offsetLeft || 0;

        if (!el.offsetTop && el.offsetTop !== 0)
            y += el.clientTop || 0;
        else
            y += el.offsetTop || 0;

        el = el.offsetParent || el.parentElement;
    }

    return { left: parseInt(x, 10), top: parseInt(y, 10) };
}

initToolbar();

export default { init, show, hide };
