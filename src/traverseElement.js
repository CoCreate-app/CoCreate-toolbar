/*globals CustomEvent*/
import action from '@cocreate/actions';

export function nextElement(btn) {
    let element = btn.closest('toolbar, .toolbar');
    let targetElement = element.toolbar.target;
    let target;
    if (targetElement.firstElementChild) {
        target = targetElement.firstElementChild;
    } else {
        target = targetElement.nextElementSibling;
    }
    if (!target) {
        do {
            targetElement = targetElement.parentElement;
            if (targetElement.nextElementSibling) {
                target = targetElement.nextElementSibling;
            }
        } while (!target);

    }
    if (!target) return;

    let clickEvent = new CustomEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
    targetElement.ownerDocument.dispatchEvent(clickEvent);
}

export function previousElement(btn) {
    let element = btn.closest('toolbar, .toolbar');
    let targetElement = element.toolbar.target;
    let target;
    if (targetElement.previousElementSibling) {
        target = targetElement.previousElementSibling;
    } else {
        target = targetElement.parentElement;
    }
    if (!target) return;
    let clickEvent = new CustomEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
    targetElement.ownerDocument.dispatchEvent(clickEvent);
}

action.init({
    name: "nextElement",
    endEvent: "nextElement",
    callback: (data) => {
        nextElement(data.element);
    }
});

action.init({
    name: "previousElement",
    endEvent: "previousElement",
    callback: (data) => {
        previousElement(data.element);
    }
});
