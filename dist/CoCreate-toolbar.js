(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["toolbar"] = factory();
	else
		root["CoCreate"] = root["CoCreate"] || {}, root["CoCreate"]["toolbar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../CoCreate-components/CoCreate-toolbar/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../CoCreate-components/CoCreate-toolbar/src/index.js":
/*!************************************************************!*\
  !*** ../CoCreate-components/CoCreate-toolbar/src/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n* returns the absolute position of an element regardless of position/float issues\n* @param {HTMLElement} el - element to return position for \n* @returns {object} { x: num, y: num }\n*/\nfunction getPosition(el) {\n  let {\n    x,\n    y\n  } = el.getBoundingClientRect();\n  return {\n    left: x,\n    top: y\n  }; // var x = 0,\n  //     y = 0;\n  // while (el != null && (el.tagName || '').toLowerCase() != 'html') {\n  //     x += el.offsetLeft || 0; \n  //     y += el.offsetTop || 0;\n  //     el = el.offsetParent;\n  // }\n  // return { left: parseInt(x, 10), top: parseInt(y, 10) };\n}\n\nlet toolbars = {};\n\nfunction CoCreateToolbar({\n  selector,\n  eventType,\n  document: sDoc,\n  config,\n  configKey\n}) {\n  let Window,\n      Document,\n      frameElement,\n      frame = sDoc.defaultView.frameElement;\n\n  if (!frame) {\n    frameElement = frame.contentWindow.document.body;\n    Document = document;\n    Window = window;\n  } else {\n    frameElement = frame;\n    Window = frame.contentWindow;\n    Document = Window.document || Window.contentDocument;\n  }\n\n  let box = document.querySelector(selector);\n\n  if (box) {\n    toolbars[selector] = box;\n    let toolbar = box.querySelector(\":scope .toolbar\");\n    let tagName = box.querySelector(\":scope [tagName]\");\n    if (!toolbar) toolbar = {\n      offsetHeight: 0\n    };\n    let initiated = false;\n    let continer = {};\n    Document.addEventListener(eventType, e => {\n      update(e.target);\n      continer.element = e.target;\n    });\n\n    function update(element) {\n      if (!initiated) {\n        initiated = true;\n        Window.addEventListener(\"scroll\", () => continer.element && update(continer.element));\n        let watch = new ResizeObserver(() => continer.element && update(continer.element));\n        watch.observe(Document.body);\n      }\n\n      CoCreate.utils.configExecuter(element, configKey, (element, config, isSelector) => {\n        if (isSelector) {\n          let selector = config[configKey];\n\n          if (!toolbars[selector]) {\n            box = document.querySelector(selector);\n            toolbars[selector] = box;\n            toolbar = box.querySelector(\":scope .toolbar\");\n            tagName = box.querySelector(\":scope [tagName]\");\n          }\n        }\n\n        let elPosition = getPosition(element);\n        box.style.display = \"block\";\n        box.style.top = frameElement.offsetTop + elPosition.top - Window.scrollY - toolbar.offsetHeight + \"px\";\n        box.style.left = frameElement.offsetLeft + elPosition.left + Window.scrollX + \"px\";\n        box.style.width = element.offsetWidth + \"px\";\n        box.style.height = element.offsetHeight + \"px\";\n        if (element.offsetTop - toolbar.offsetHeight < 0) box.setAttribute(\"toolbar-overflow\", \"\");else box.removeAttribute(\"toolbar-overflow\");\n\n        if (tagName && tagName.innerHTML !== element.tagName) {\n          tagName.innerHTML = element.tagName; // for (let config of elementConfig) {\n          //   if (config.tagName && element.matches(config.selector)) {\n          //     if (tagName.innerHTML !== config.tagName)\n          //       tagName.innerHTML = config.tagName;\n          //     break;\n          //   }\n          // }\n\n          if (config.tagName && config.tagName !== tagName.innerHTML) {\n            tagName.innerHTML = config.tagName;\n          }\n        }\n      }, config);\n    }\n  }\n}\n\nvar _default = {\n  init: CoCreateToolbar\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZS50b29sYmFyLy4uL0NvQ3JlYXRlLWNvbXBvbmVudHMvQ29DcmVhdGUtdG9vbGJhci9zcmMvaW5kZXguanM/MTlkMSJdLCJuYW1lcyI6WyJnZXRQb3NpdGlvbiIsImVsIiwieCIsInkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwidG9vbGJhcnMiLCJDb0NyZWF0ZVRvb2xiYXIiLCJzZWxlY3RvciIsImV2ZW50VHlwZSIsImRvY3VtZW50Iiwic0RvYyIsImNvbmZpZyIsImNvbmZpZ0tleSIsIldpbmRvdyIsIkRvY3VtZW50IiwiZnJhbWVFbGVtZW50IiwiZnJhbWUiLCJkZWZhdWx0VmlldyIsImNvbnRlbnRXaW5kb3ciLCJib2R5Iiwid2luZG93IiwiY29udGVudERvY3VtZW50IiwiYm94IiwicXVlcnlTZWxlY3RvciIsInRvb2xiYXIiLCJ0YWdOYW1lIiwib2Zmc2V0SGVpZ2h0IiwiaW5pdGlhdGVkIiwiY29udGluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInVwZGF0ZSIsInRhcmdldCIsImVsZW1lbnQiLCJ3YXRjaCIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZSIsIkNvQ3JlYXRlIiwidXRpbHMiLCJjb25maWdFeGVjdXRlciIsImlzU2VsZWN0b3IiLCJlbFBvc2l0aW9uIiwic3R5bGUiLCJkaXNwbGF5Iiwib2Zmc2V0VG9wIiwic2Nyb2xsWSIsIm9mZnNldExlZnQiLCJzY3JvbGxYIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImlubmVySFRNTCIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsU0FBU0EsV0FBVCxDQUFxQkMsRUFBckIsRUFBeUI7QUFDdkIsTUFBSTtBQUFDQyxLQUFEO0FBQUdDO0FBQUgsTUFBUUYsRUFBRSxDQUFDRyxxQkFBSCxFQUFaO0FB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TSxDQUFDYyxPQUFQLElBQWtCZCxNQUFNLENBQUNjLE9BQVAsS0FBbUJBLE9BQU8sQ0FBQzRCLFNBQWpELEVBQTREO0FBQzFENUIsbUJBQU8sQ0FBQzRCLFNBQVIsR0FBb0IxQyxNQUFNLENBQUNjLE9BQTNCO0FBQ0Q7QUFDSjtBQUNGLE9BdkRILEVBd0RFZCxNQXhERjtBQTJERDtBQUNGO0FBQ0Y7O2VBR2M7QUFBRTJDLE1BQUksRUFBRWhEO0FBQVIsQyIsImZpbGUiOiIuLi9Db0NyZWF0ZS1jb21wb25lbnRzL0NvQ3JlYXRlLXRvb2xiYXIvc3JjL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiICAgICAvKipcbiAgICogcmV0dXJucyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCByZWdhcmRsZXNzIG9mIHBvc2l0aW9uL2Zsb2F0IGlzc3Vlc1xuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIGVsZW1lbnQgdG8gcmV0dXJuIHBvc2l0aW9uIGZvciBcbiAgICogQHJldHVybnMge29iamVjdH0geyB4OiBudW0sIHk6IG51bSB9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRQb3NpdGlvbihlbCkge1xuICAgIGxldCB7eCx5fSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgcmV0dXJuIHtsZWZ0OngsdG9wOnl9O1xuICAgIC8vIHZhciB4ID0gMCxcbiAgICAvLyAgICAgeSA9IDA7XG5cbiAgICAvLyB3aGlsZSAoZWwgIT0gbnVsbCAmJiAoZWwudGFnTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSAhPSAnaHRtbCcpIHtcbiAgICAvLyAgICAgeCArPSBlbC5vZmZzZXRMZWZ0IHx8IDA7IFxuICAgIC8vICAgICB5ICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgIC8vICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4geyBsZWZ0OiBwYXJzZUludCh4LCAxMCksIHRvcDogcGFyc2VJbnQoeSwgMTApIH07XG4gIH1cbiAgXG5sZXQgdG9vbGJhcnMgPSB7fTtcbmZ1bmN0aW9uIENvQ3JlYXRlVG9vbGJhcih7c2VsZWN0b3IsIGV2ZW50VHlwZSwgZG9jdW1lbnQ6IHNEb2MsIGNvbmZpZywgY29uZmlnS2V5fSkge1xuICBcblxuICBcbiAgbGV0IFdpbmRvdywgRG9jdW1lbnQsIGZyYW1lRWxlbWVudCwgZnJhbWUgPSBzRG9jLmRlZmF1bHRWaWV3LmZyYW1lRWxlbWVudDtcbiAgaWYgKCFmcmFtZSkge1xuICAgIGZyYW1lRWxlbWVudCA9IGZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keTtcbiAgICBEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIFdpbmRvdyA9IHdpbmRvdztcbiAgfSBlbHNlIHtcbiAgICBmcmFtZUVsZW1lbnQgPSBmcmFtZTtcbiAgICBXaW5kb3cgPSBmcmFtZS5jb250ZW50V2luZG93O1xuICAgIERvY3VtZW50ID0gV2luZG93LmRvY3VtZW50IHx8IFdpbmRvdy5jb250ZW50RG9jdW1lbnQ7XG4gIH1cbiAgbGV0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICBpZiAoYm94KSB7XG4gIFxuICAgIHRvb2xiYXJzW3NlbGVjdG9yXSA9IGJveDtcblxuXG5cbiAgICBsZXQgdG9vbGJhciA9IGJveC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlIC50b29sYmFyXCIpO1xuICAgIGxldCB0YWdOYW1lID0gYm94LnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgW3RhZ05hbWVdXCIpO1xuICAgIGlmICghdG9vbGJhcikgdG9vbGJhciA9IHsgb2Zmc2V0SGVpZ2h0OiAwIH07XG4gICAgbGV0IGluaXRpYXRlZCA9IGZhbHNlO1xuICAgIGxldCBjb250aW5lciA9IHt9O1xuICAgIERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCAoZSkgPT4ge1xuICAgICAgdXBkYXRlKGUudGFyZ2V0KTtcbiAgICAgIGNvbnRpbmVyLmVsZW1lbnQgPSBlLnRhcmdldDtcblxuICAgIH0pO1xuXG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShlbGVtZW50KSB7XG4gICAgICBpZighaW5pdGlhdGVkKVxuICAgICAge1xuICAgICAgICBpbml0aWF0ZWQgPSB0cnVlOyBcbiAgICAgICAgV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgXG4gICAgICAgICgpID0+IFxuICAgICAgICBjb250aW5lci5lbGVtZW50ICYmIHVwZGF0ZShjb250aW5lci5lbGVtZW50KVxuICAgICAgICApO1xuICAgICAgICBsZXQgd2F0Y2ggPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gY29udGluZXIuZWxlbWVudCAmJiB1cGRhdGUoY29udGluZXIuZWxlbWVudCkpO1xuICAgICAgICB3YXRjaC5vYnNlcnZlKERvY3VtZW50LmJvZHkpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICAgXG4gICAgICBDb0NyZWF0ZS51dGlscy5jb25maWdFeGVjdXRlcihcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgY29uZmlnS2V5LFxuICAgICAgICAoZWxlbWVudCwgY29uZmlnLCBpc1NlbGVjdG9yKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoaXNTZWxlY3RvciApXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gY29uZmlnW2NvbmZpZ0tleV07XG4gICAgICAgICAgICBpZighdG9vbGJhcnNbc2VsZWN0b3JdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICAgICAgICB0b29sYmFyc1tzZWxlY3Rvcl0gPSBib3g7XG4gICAgICAgICAgICAgIHRvb2xiYXIgPSBib3gucXVlcnlTZWxlY3RvcihcIjpzY29wZSAudG9vbGJhclwiKTtcbiAgICAgICAgICAgICAgdGFnTmFtZSA9IGJveC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlIFt0YWdOYW1lXVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgIFxuXG4gICAgICAgICAgbGV0IGVsUG9zaXRpb24gPSBnZXRQb3NpdGlvbihlbGVtZW50KVxuICAgICAgICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIGJveC5zdHlsZS50b3AgPVxuICAgICAgICAgICAgZnJhbWVFbGVtZW50Lm9mZnNldFRvcCArXG4gICAgICAgICAgICBlbFBvc2l0aW9uLnRvcCAtXG4gICAgICAgICAgICBXaW5kb3cuc2Nyb2xsWSAtXG4gICAgICAgICAgICB0b29sYmFyLm9mZnNldEhlaWdodCArXG4gICAgICAgICAgICBcInB4XCI7XG4gICAgICAgICAgYm94LnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgZnJhbWVFbGVtZW50Lm9mZnNldExlZnQgK1xuICAgICAgICAgICAgZWxQb3NpdGlvbi5sZWZ0ICtcbiAgICAgICAgICAgIFdpbmRvdy5zY3JvbGxYICtcbiAgICAgICAgICAgIFwicHhcIjtcbiAgICAgICAgICBib3guc3R5bGUud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuICAgICAgICAgIGJveC5zdHlsZS5oZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodCArIFwicHhcIjtcblxuICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFRvcCAtIHRvb2xiYXIub2Zmc2V0SGVpZ2h0IDwgMClcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJ0b29sYmFyLW92ZXJmbG93XCIsIFwiXCIpO1xuICAgICAgICAgIGVsc2UgYm94LnJlbW92ZUF0dHJpYnV0ZShcInRvb2xiYXItb3ZlcmZsb3dcIik7XG5cbiAgICAgICAgICBpZiAodGFnTmFtZSAmJiB0YWdOYW1lLmlubmVySFRNTCAhPT0gZWxlbWVudC50YWdOYW1lKSB7XG4gICAgICAgICAgICB0YWdOYW1lLmlubmVySFRNTCA9IGVsZW1lbnQudGFnTmFtZTtcblxuICAgICAgICAgICAgLy8gZm9yIChsZXQgY29uZmlnIG9mIGVsZW1lbnRDb25maWcpIHtcbiAgICAgICAgICAgIC8vICAgaWYgKGNvbmZpZy50YWdOYW1lICYmIGVsZW1lbnQubWF0Y2hlcyhjb25maWcuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHRhZ05hbWUuaW5uZXJIVE1MICE9PSBjb25maWcudGFnTmFtZSlcbiAgICAgICAgICAgIC8vICAgICAgIHRhZ05hbWUuaW5uZXJIVE1MID0gY29uZmlnLnRhZ05hbWU7XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgICAgICAgIGlmIChjb25maWcudGFnTmFtZSAmJiBjb25maWcudGFnTmFtZSAhPT0gdGFnTmFtZS5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lLmlubmVySFRNTCA9IGNvbmZpZy50YWdOYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG5cbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQ6IENvQ3JlYXRlVG9vbGJhciB9OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../CoCreate-components/CoCreate-toolbar/src/index.js\n");

/***/ })

/******/ })["default"];
});