     /**
      * returns the absolute position of an element regardless of position/float issues
      * @param {HTMLElement} el - element to return position for 
      * @returns {object} { x: num, y: num }
      */
/*global ResizeObserver*/
     import { configExecuter } from '@cocreate/utils'

     function getPosition(el) {
        //  let { x, y } = el.getBoundingClientRect()
        //  return { left: x, top: y };
        // finding el possition in scroll
          let x = 0,
              y = 0;

          while (el != null && el.tagName) {
              x += el.offsetLeft || 0; 
              y += el.offsetTop || 0;
              el = el.offsetParent;
          }

          return { left: parseInt(x, 10), top: parseInt(y, 10) };
     }

     let toolbars = {};

     function CoCreateToolbar({ selector, eventType, document: sDoc, config, configKey }) {


         let Window, Document, frameElement, frame = sDoc.defaultView ? sDoc.defaultView.frameElement : sDoc.ccdefaultView.frameElement;

         if (!frame) {
             frameElement = frame.contentWindow.document.body;
             Document = document;
             Window = window;
         }
         else {
             frameElement = frame;
             Window = frame.contentWindow;
             Document = Window.document || Window.contentDocument;
         }
         let box = document.querySelector(selector);
         if (box) {

             toolbars[selector] = box;



             let toolbar = box.querySelector(":scope .toolbar");
             let tagName = box.querySelector(":scope [tagName]");
             if (!toolbar) toolbar = { offsetHeight: 0 };
             let initiated = false;
             let continer = {};
             let watch;
                        console.log('cocreateToolbar Document')
            window.cocreateToolbar = Document;
             Document.addEventListener(eventType, (e) => {
                 continer.lastElement = continer.element;
                 continer.element = e.target;
                 update();

             });
 
             Window.addEventListener("scroll",
                 () =>
                 continer.element && update(continer.element)
             );

             function update(dontWatch) {
                 //  if (!initiated) {
                 //      initiated = true;
                 //      Window.addEventListener("scroll",
                 //          () =>
                 //          continer.element && update(continer.element)
                 //      );

                 //  }
                 if (!dontWatch) {
                     if (watch)
                         watch.unobserve(continer.lastElement)
                     watch = new ResizeObserver(() => continer.element && update( true));
                     watch.observe(continer.element);
                 }

                
                 configExecuter(
                     continer.element,
                     configKey,
                     (element, config, isSelector) => {

                         if (isSelector) {
                             let selector = config[configKey];
                             if (!toolbars[selector]) {
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

                         if (element.offsetTop - toolbar.offsetHeight < 0)
                             box.setAttribute("toolbar-overflow", "");
                         else box.removeAttribute("toolbar-overflow");

                         if (tagName && tagName.innerHTML !== element.tagName) {
                             tagName.innerHTML = element.tagName;

                             // for (let config of elementConfig) {
                             //   if (config.tagName && element.matches(config.selector)) {
                             //     if (tagName.innerHTML !== config.tagName)
                             //       tagName.innerHTML = config.tagName;
                             //     break;
                             //   }
                             // }


                             if (config.tagName && config.tagName !== tagName.innerHTML) {
                                 tagName.innerHTML = config.tagName;
                             }
                         }
                     },
                     config
                 );

             }
         }
     }


     export default { init: CoCreateToolbar };
     