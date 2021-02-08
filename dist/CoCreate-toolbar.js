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
/******/ 	return __webpack_require__(__webpack_require__.s = "../CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js":
/*!***********************************************************************!*\
  !*** ../CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n* returns the absolute position of an element regardless of position/float issues\n* @param {HTMLElement} el - element to return position for \n* @returns {object} { x: num, y: num }\n*/\nfunction getPosition(el) {\n  var x = 0,\n      y = 0;\n\n  while (el != null && (el.tagName || '').toLowerCase() != 'html') {\n    x += el.offsetLeft || 0;\n    y += el.offsetTop || 0;\n    el = el.offsetParent;\n  }\n\n  return {\n    left: parseInt(x, 10),\n    top: parseInt(y, 10)\n  };\n}\n\nvar toolbars = {};\n\nfunction CoCreateToolbar(_ref) {\n  var selector = _ref.selector,\n      event = _ref.event,\n      frame = _ref.frame,\n      elementConfig = _ref.elementConfig,\n      configKey = _ref.configKey;\n  var Window, Document, frameElement;\n\n  if (!frame) {\n    frameElement = frame.body;\n    Document = document;\n    Window = window;\n  } else {\n    frameElement = frame;\n    Window = frame.contentWindow;\n    Document = Window.document || Window.contentDocument;\n  }\n\n  var box = document.querySelector(selector);\n\n  if (box) {\n    var update = function update(element) {\n      CoCreate.utils.configExecuter(element, configKey, function (element, config, isSelector) {\n        if (isSelector) {\n          var _selector = config[configKey];\n\n          if (!toolbars[_selector]) {\n            box = document.querySelector(_selector);\n            toolbars[_selector] = box;\n            toolbar = box.querySelector(\":scope .toolbar\");\n            tagName = box.querySelector(\":scope [tagName]\");\n          }\n        }\n\n        var elPosition = getPosition(element);\n        box.style.display = \"block\";\n        box.style.top = frameElement.offsetTop + elPosition.top - Window.scrollY - toolbar.offsetHeight + \"px\";\n        box.style.left = frameElement.offsetLeft + elPosition.left + Window.scrollX + \"px\";\n        box.style.width = element.offsetWidth + \"px\";\n        box.style.height = element.offsetHeight + \"px\";\n        if (element.offsetTop - toolbar.offsetHeight < 0) box.setAttribute(\"toolbar-overflow\", \"\");else box.removeAttribute(\"toolbar-overflow\");\n\n        if (tagName && tagName.innerHTML !== element.tagName) {\n          tagName.innerHTML = element.tagName; // for (let config of elementConfig) {\n          //   if (config.tagName && element.matches(config.selector)) {\n          //     if (tagName.innerHTML !== config.tagName)\n          //       tagName.innerHTML = config.tagName;\n          //     break;\n          //   }\n          // }\n\n          if (config.tagName && config.tagName !== tagName.innerHTML) {\n            tagName.innerHTML = config.tagName;\n          }\n        }\n      });\n    };\n\n    toolbars[selector] = box;\n    var watch = new ResizeObserver(function () {\n      return element && update(element);\n    });\n    watch.observe(Document.body);\n    var toolbar = box.querySelector(\":scope .toolbar\");\n    var tagName = box.querySelector(\":scope [tagName]\");\n    if (!toolbar) toolbar = {\n      offsetHeight: 0\n    };\n    var element = document.createElement('div'); // any component\n\n    Document.addEventListener(event, function (e) {\n      update(e.target);\n      element = e.target;\n    });\n    Window.addEventListener(\"scroll\", function () {\n      return element && update(element);\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: CoCreateToolbar\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZS50b29sYmFyLy4uL0NvQ3JlYXRlLWNvbXBvbmVudHMvQ29DcmVhdGUtdG9vbGJhci9zcmMvQ29DcmVhdGUtdG9vbGJhci5qcz8xMWMyIl0sIm5hbWVzIjpbImdldFBvc2l0aW9uIiwiZWwiLCJ4IiwieSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJvZmZzZXRQYXJlbnQiLCJsZWZ0IiwicGFyc2VJbnQiLCJ0b3AiLCJ0b29sYmFycyIsIkNvQ3JlYXRlVG9vbGJhciIsInNlbGVjdG9yIiwiZXZlbnQiLCJmcmFtZSIsImVsZW1lbnRDb25maWciLCJjb25maWdLZXkiLCJXaW5kb3ciLCJEb2N1bWVudCIsImZyYW1lRWxlbWVudCIsImJvZHkiLCJkb2N1bWVudCIsIndpbmRvdyIsImNvbnRlbnRXaW5kb3ciLCJjb250ZW50RG9jdW1lbnQiLCJib3giLCJxdWVyeVNlbGVjdG9yIiwidXBkYXRlIiwiZWxlbWVudCIsIkNvQ3JlYXRlIiwidXRpbHMiLCJjb25maWdFeGVjdXRlciIsImNvbmZpZyIsImlzU2VsZWN0b3IiLCJ0b29sYmFyIiwiZWxQb3NpdGlvbiIsInN0eWxlIiwiZGlzcGxheSIsInNjcm9sbFkiLCJvZmZzZXRIZWlnaHQiLCJzY3JvbGxYIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImlubmVySFRNTCIsIndhdGNoIiwiUmVzaXplT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY3JlYXRlRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiaW5pdCJdLCJtYXBwaW5ncyI6IkFBQUs7QUFBQTtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsU0FBU0EsV0FBVCxDQUFxQkMsRUFBckIsRUFBeUI7QUFFdkIsTUFBSUMsQ0FBQyxHQUFHLENBQVI7QUFBQSxNQUNJQyxDQUFDLEdBQUcsQ0FEUjs7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QUU7QUFBaEIsS0FBVjtBQUNkLFFBQUlYLE9BQU8sR0FBR1AsUUFBUSxDQUFDNkIsYUFBVCxDQUF1QixLQUF2QixDQUFkLENBUk8sQ0FRc0M7O0FBQzdDaEMsWUFBUSxDQUFDaUMsZ0JBQVQsQ0FBMEJ0QyxLQUExQixFQUFpQyxVQUFDdUMsQ0FBRCxFQUFPO0FBQ3RDekIsWUFBTSxDQUFDeUIsQ0FBQyxDQUFDQyxNQUFILENBQU47QUFDQXpCLGFBQU8sR0FBR3dCLENBQUMsQ0FBQ0MsTUFBWjtBQUNELEtBSEQ7QUFNQXBDLFVBQU0sQ0FBQ2tDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0FBQUEsYUFBTXZCLE9BQU8sSUFBSUQsTUFBTSxDQUFDQyxPQUFELENBQXZCO0FBQUEsS0FBbEM7QUErREQ7QUFDRjs7QUFHYztBQUFFMEIsTUFBSSxFQUFFM0M7QUFBUixDQUFmIiwiZmlsZSI6Ii4uL0NvQ3JlYXRlLWNvbXBvbmVudHMvQ29DcmVhdGUtdG9vbGJhci9zcmMvQ29DcmVhdGUtdG9vbGJhci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAgICAgLyoqXG4gICAqIHJldHVybnMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgcmVnYXJkbGVzcyBvZiBwb3NpdGlvbi9mbG9hdCBpc3N1ZXNcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBlbGVtZW50IHRvIHJldHVybiBwb3NpdGlvbiBmb3IgXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHsgeDogbnVtLCB5OiBudW0gfVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcblxuICAgIHZhciB4ID0gMCxcbiAgICAgICAgeSA9IDA7XG5cbiAgICB3aGlsZSAoZWwgIT0gbnVsbCAmJiAoZWwudGFnTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSAhPSAnaHRtbCcpIHtcbiAgICAgICAgeCArPSBlbC5vZmZzZXRMZWZ0IHx8IDA7IFxuICAgICAgICB5ICs9IGVsLm9mZnNldFRvcCB8fCAwO1xuICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4geyBsZWZ0OiBwYXJzZUludCh4LCAxMCksIHRvcDogcGFyc2VJbnQoeSwgMTApIH07XG4gIH1cbiAgXG5sZXQgdG9vbGJhcnMgPSB7fTtcbmZ1bmN0aW9uIENvQ3JlYXRlVG9vbGJhcih7c2VsZWN0b3IsIGV2ZW50LCBmcmFtZSwgZWxlbWVudENvbmZpZywgY29uZmlnS2V5fSkge1xuICBcblxuICBcbiAgbGV0IFdpbmRvdywgRG9jdW1lbnQsIGZyYW1lRWxlbWVudDtcbiAgaWYgKCFmcmFtZSkge1xuICAgIGZyYW1lRWxlbWVudCA9IGZyYW1lLmJvZHk7XG4gICAgRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICBXaW5kb3cgPSB3aW5kb3c7XG4gIH0gZWxzZSB7XG4gICAgZnJhbWVFbGVtZW50ID0gZnJhbWU7XG4gICAgV2luZG93ID0gZnJhbWUuY29udGVudFdpbmRvdztcbiAgICBEb2N1bWVudCA9IFdpbmRvdy5kb2N1bWVudCB8fCBXaW5kb3cuY29udGVudERvY3VtZW50O1xuICB9XG4gIGxldCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgaWYgKGJveCkge1xuICAgIHRvb2xiYXJzW3NlbGVjdG9yXSA9IGJveDtcbiAgICBsZXQgd2F0Y2ggPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gZWxlbWVudCAmJiB1cGRhdGUoZWxlbWVudCkpO1xuICAgIHdhdGNoLm9ic2VydmUoRG9jdW1lbnQuYm9keSk7XG5cbiAgICBsZXQgdG9vbGJhciA9IGJveC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlIC50b29sYmFyXCIpO1xuICAgIGxldCB0YWdOYW1lID0gYm94LnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgW3RhZ05hbWVdXCIpO1xuICAgIGlmICghdG9vbGJhcikgdG9vbGJhciA9IHsgb2Zmc2V0SGVpZ2h0OiAwIH07XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgLy8gYW55IGNvbXBvbmVudFxuICAgIERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIChlKSA9PiB7XG4gICAgICB1cGRhdGUoZS50YXJnZXQpO1xuICAgICAgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAgIH0pO1xuXG5cbiAgICBXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiBlbGVtZW50ICYmIHVwZGF0ZShlbGVtZW50KSk7XG4gICAgZnVuY3Rpb24gdXBkYXRlKGVsZW1lbnQpIHtcblxuXG4gICAgICBDb0NyZWF0ZS51dGlscy5jb25maWdFeGVjdXRlcihcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgY29uZmlnS2V5LFxuICAgICAgICAoZWxlbWVudCwgY29uZmlnLCBpc1NlbGVjdG9yKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoaXNTZWxlY3RvciApXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gY29uZmlnW2NvbmZpZ0tleV07XG4gICAgICAgICAgICBpZighdG9vbGJhcnNbc2VsZWN0b3JdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICAgICAgICB0b29sYmFyc1tzZWxlY3Rvcl0gPSBib3g7XG4gICAgICAgICAgICAgIHRvb2xiYXIgPSBib3gucXVlcnlTZWxlY3RvcihcIjpzY29wZSAudG9vbGJhclwiKTtcbiAgICAgICAgICAgICAgdGFnTmFtZSA9IGJveC5xdWVyeVNlbGVjdG9yKFwiOnNjb3BlIFt0YWdOYW1lXVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgIFxuXG4gICAgICAgICAgbGV0IGVsUG9zaXRpb24gPSBnZXRQb3NpdGlvbihlbGVtZW50KVxuICAgICAgICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIGJveC5zdHlsZS50b3AgPVxuICAgICAgICAgICAgZnJhbWVFbGVtZW50Lm9mZnNldFRvcCArXG4gICAgICAgICAgICBlbFBvc2l0aW9uLnRvcCAtXG4gICAgICAgICAgICBXaW5kb3cuc2Nyb2xsWSAtXG4gICAgICAgICAgICB0b29sYmFyLm9mZnNldEhlaWdodCArXG4gICAgICAgICAgICBcInB4XCI7XG4gICAgICAgICAgYm94LnN0eWxlLmxlZnQgPVxuICAgICAgICAgICAgZnJhbWVFbGVtZW50Lm9mZnNldExlZnQgK1xuICAgICAgICAgICAgZWxQb3NpdGlvbi5sZWZ0ICtcbiAgICAgICAgICAgIFdpbmRvdy5zY3JvbGxYICtcbiAgICAgICAgICAgIFwicHhcIjtcbiAgICAgICAgICBib3guc3R5bGUud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuICAgICAgICAgIGJveC5zdHlsZS5oZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodCArIFwicHhcIjtcblxuICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFRvcCAtIHRvb2xiYXIub2Zmc2V0SGVpZ2h0IDwgMClcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJ0b29sYmFyLW92ZXJmbG93XCIsIFwiXCIpO1xuICAgICAgICAgIGVsc2UgYm94LnJlbW92ZUF0dHJpYnV0ZShcInRvb2xiYXItb3ZlcmZsb3dcIik7XG5cbiAgICAgICAgICBpZiAodGFnTmFtZSAmJiB0YWdOYW1lLmlubmVySFRNTCAhPT0gZWxlbWVudC50YWdOYW1lKSB7XG4gICAgICAgICAgICB0YWdOYW1lLmlubmVySFRNTCA9IGVsZW1lbnQudGFnTmFtZTtcblxuICAgICAgICAgICAgLy8gZm9yIChsZXQgY29uZmlnIG9mIGVsZW1lbnRDb25maWcpIHtcbiAgICAgICAgICAgIC8vICAgaWYgKGNvbmZpZy50YWdOYW1lICYmIGVsZW1lbnQubWF0Y2hlcyhjb25maWcuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHRhZ05hbWUuaW5uZXJIVE1MICE9PSBjb25maWcudGFnTmFtZSlcbiAgICAgICAgICAgIC8vICAgICAgIHRhZ05hbWUuaW5uZXJIVE1MID0gY29uZmlnLnRhZ05hbWU7XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgICAgICAgIGlmIChjb25maWcudGFnTmFtZSAmJiBjb25maWcudGFnTmFtZSAhPT0gdGFnTmFtZS5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lLmlubmVySFRNTCA9IGNvbmZpZy50YWdOYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0OiBDb0NyZWF0ZVRvb2xiYXIgfTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js\n");

/***/ })

/******/ })["default"];
});