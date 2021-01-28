(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoCreateToolbar"] = factory();
	else
		root["cc"] = root["cc"] || {}, root["cc"]["CoCreateToolbar"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js":
/*!**********************************************************************!*\
  !*** ./CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n* returns the absolute position of an element regardless of position/float issues\n* @param {HTMLElement} el - element to return position for \n* @returns {object} { x: num, y: num }\n*/\nfunction getPosition(el) {\n  var x = 0,\n      y = 0;\n\n  while (el != null && (el.tagName || '').toLowerCase() != 'html') {\n    x += el.offsetLeft || 0;\n    y += el.offsetTop || 0;\n    el = el.offsetParent;\n  }\n\n  return {\n    left: parseInt(x, 10),\n    top: parseInt(y, 10)\n  };\n}\n\nvar toolbars = {};\n\nfunction toolbar(_ref) {\n  var selector = _ref.selector,\n      event = _ref.event,\n      frame = _ref.frame,\n      elementConfig = _ref.elementConfig,\n      configKey = _ref.configKey;\n  var Window, Document, frameElement;\n\n  if (!frame) {\n    frameElement = frame.body;\n    Document = document;\n    Window = window;\n  } else {\n    frameElement = frame;\n    Window = frame.contentWindow;\n    Document = Window.document || Window.contentDocument;\n  }\n\n  var box = document.querySelector(selector);\n\n  if (box) {\n    var update = function update(element) {\n      // for (let config of window.cc.configMatch(elementConfig, element))\n      //   if (event === \"click\" && config.hoverable === false) return;\n      //   else if (event === \"mouseover\" && config.selectable === false) return;\n      CoCreateUtils.configExecuter(element, configKey, function (element, config, isSelector) {\n        if (isSelector) {\n          var _selector = config[configKey];\n\n          if (!toolbars[_selector]) {\n            box = document.querySelector(_selector);\n            toolbars[_selector] = box;\n            _toolbar = box.querySelector(\":scope .toolbar\");\n            tagName = box.querySelector(\":scope [tagName]\");\n          }\n        }\n\n        var elPosition = getPosition(element);\n        box.style.display = \"block\";\n        box.style.top = frameElement.offsetTop + elPosition.top - Window.scrollY - _toolbar.offsetHeight + \"px\";\n        box.style.left = frameElement.offsetLeft + elPosition.left + Window.scrollX + \"px\";\n        box.style.width = element.offsetWidth + \"px\";\n        box.style.height = element.offsetHeight + \"px\";\n        if (element.offsetTop - _toolbar.offsetHeight < 0) box.setAttribute(\"toolbar-overflow\", \"\");else box.removeAttribute(\"toolbar-overflow\");\n\n        if (tagName && tagName.innerHTML !== element.tagName) {\n          tagName.innerHTML = element.tagName; // for (let config of elementConfig) {\n          //   if (config.tagName && element.matches(config.selector)) {\n          //     if (tagName.innerHTML !== config.tagName)\n          //       tagName.innerHTML = config.tagName;\n          //     break;\n          //   }\n          // }\n\n          if (config.tagName && config.tagName !== tagName.innerHTML) {\n            tagName.innerHTML = config.tagName;\n          }\n        }\n      });\n    };\n\n    toolbars[selector] = box;\n    var watch = new ResizeObserver(function () {\n      return element && update(element);\n    });\n    watch.observe(Document.body);\n\n    var _toolbar = box.querySelector(\":scope .toolbar\");\n\n    var tagName = box.querySelector(\":scope [tagName]\");\n    if (!_toolbar) _toolbar = {\n      offsetHeight: 0\n    };\n    var element = document.createElement('div'); // any component\n\n    Document.addEventListener(event, function (e) {\n      update(e.target);\n      element = e.target;\n    });\n    Window.addEventListener(\"scroll\", function () {\n      return element && update(element);\n    });\n  }\n}\n\nwindow.CoCreateToolbar = {\n  init: toolbar\n}; // window.addEventListener(\"load\", toolbar);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYy5Db0NyZWF0ZVRvb2xiYXIvLi9Db0NyZWF0ZS1jb21wb25lbnRzL0NvQ3JlYXRlLXRvb2xiYXIvc3JjL0NvQ3JlYXRlLXRvb2xiYXIuanM/NzQzZSJdLCJuYW1lcyI6WyJnZXRQb3NpdGlvbiIsImVsIiwieCIsInkiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwib2Zmc2V0UGFyZW50IiwibGVmdCIsInBhcnNlSW50IiwidG9wIiwidG9vbGJhcnMiLCJ0b29sYmFyIiwic2VsZWN0b3IiLCJldmVudCIsImZyYW1lIiwiZWxlbWVudENvbmZpZyIsImNvbmZpZ0tleSIsIldpbmRvdyIsIkRvY3VtZW50IiwiZnJhbWVFbGVtZW50IiwiYm9keSIsImRvY3VtZW50Iiwid2luZG93IiwiY29udGVudFdpbmRvdyIsImNvbnRlbnREb2N1bWVudCIsImJveCIsInF1ZXJ5U2VsZWN0b3IiLCJ1cGRhdGUiLCJlbGVtZW50IiwiQ29DcmVhdGVVdGlscyIsImNvbmZpZ0V4ZWN1dGVyIiwiY29uZmlnIiwiaXNTZWxlY3RvciIsImVsUG9zaXRpb24iLCJzdHlsZSIsImRpc3BsYXkiLCJzY3JvbGxZIiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsWCIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJ3YXRjaCIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZSIsImNyZWF0ZUVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsIkNvQ3JlYXRlVG9vbGJhciIsImluaXQiXSwibWFwcGluZ3MiOiJBQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDRSxTQUFTQSxXQUFULENBQXFCQyxFQUFyQixFQUF5QjtBQUV2QixNQUFJQyxDQUFDLEdBQUcsQ0FBUjtBQUFBLE1BQ0lDLENBQUMsR0FBRyxDQURSOztBQUdBLFNB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QUFFO0FBQWhCLEtBQVY7QUFDZCxRQUFJVCxPQUFPLEdBQUdQLFFBQVEsQ0FBQzJCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZCxDQVJPLENBUXNDOztBQUM3QzlCLFlBQVEsQ0FBQytCLGdCQUFULENBQTBCcEMsS0FBMUIsRUFBaUMsVUFBQ3FDLENBQUQsRUFBTztBQUN0Q3ZCLFlBQU0sQ0FBQ3VCLENBQUMsQ0FBQ0MsTUFBSCxDQUFOO0FBQ0F2QixhQUFPLEdBQUdzQixDQUFDLENBQUNDLE1BQVo7QUFDRCxLQUhEO0FBTUFsQyxVQUFNLENBQUNnQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQztBQUFBLGFBQU1yQixPQUFPLElBQUlELE1BQU0sQ0FBQ0MsT0FBRCxDQUF2QjtBQUFBLEtBQWxDO0FBaUVEO0FBQ0Y7O0FBRUROLE1BQU0sQ0FBQzhCLGVBQVAsR0FBeUI7QUFBRUMsTUFBSSxFQUFFMUM7QUFBUixDQUF6QixDLENBQ0EiLCJmaWxlIjoiLi9Db0NyZWF0ZS1jb21wb25lbnRzL0NvQ3JlYXRlLXRvb2xiYXIvc3JjL0NvQ3JlYXRlLXRvb2xiYXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgIC8qKlxuICAgKiByZXR1cm5zIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHJlZ2FyZGxlc3Mgb2YgcG9zaXRpb24vZmxvYXQgaXNzdWVzXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gZWxlbWVudCB0byByZXR1cm4gcG9zaXRpb24gZm9yIFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSB7IHg6IG51bSwgeTogbnVtIH1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFBvc2l0aW9uKGVsKSB7XG5cbiAgICB2YXIgeCA9IDAsXG4gICAgICAgIHkgPSAwO1xuXG4gICAgd2hpbGUgKGVsICE9IG51bGwgJiYgKGVsLnRhZ05hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCkgIT0gJ2h0bWwnKSB7XG4gICAgICAgIHggKz0gZWwub2Zmc2V0TGVmdCB8fCAwOyBcbiAgICAgICAgeSArPSBlbC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGVmdDogcGFyc2VJbnQoeCwgMTApLCB0b3A6IHBhcnNlSW50KHksIDEwKSB9O1xuICB9XG4gIFxubGV0IHRvb2xiYXJzID0ge307XG5mdW5jdGlvbiB0b29sYmFyKHtzZWxlY3RvciwgZXZlbnQsIGZyYW1lLCBlbGVtZW50Q29uZmlnLCBjb25maWdLZXl9KSB7XG4gIFxuXG4gIFxuICBsZXQgV2luZG93LCBEb2N1bWVudCwgZnJhbWVFbGVtZW50O1xuICBpZiAoIWZyYW1lKSB7XG4gICAgZnJhbWVFbGVtZW50ID0gZnJhbWUuYm9keTtcbiAgICBEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIFdpbmRvdyA9IHdpbmRvdztcbiAgfSBlbHNlIHtcbiAgICBmcmFtZUVsZW1lbnQgPSBmcmFtZTtcbiAgICBXaW5kb3cgPSBmcmFtZS5jb250ZW50V2luZG93O1xuICAgIERvY3VtZW50ID0gV2luZG93LmRvY3VtZW50IHx8IFdpbmRvdy5jb250ZW50RG9jdW1lbnQ7XG4gIH1cbiAgbGV0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICBpZiAoYm94KSB7XG4gICAgdG9vbGJhcnNbc2VsZWN0b3JdID0gYm94O1xuICAgIGxldCB3YXRjaCA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiBlbGVtZW50ICYmIHVwZGF0ZShlbGVtZW50KSk7XG4gICAgd2F0Y2gub2JzZXJ2ZShEb2N1bWVudC5ib2R5KTtcblxuICAgIGxldCB0b29sYmFyID0gYm94LnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgLnRvb2xiYXJcIik7XG4gICAgbGV0IHRhZ05hbWUgPSBib3gucXVlcnlTZWxlY3RvcihcIjpzY29wZSBbdGFnTmFtZV1cIik7XG4gICAgaWYgKCF0b29sYmFyKSB0b29sYmFyID0geyBvZmZzZXRIZWlnaHQ6IDAgfTtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvLyBhbnkgY29tcG9uZW50XG4gICAgRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKGUpID0+IHtcbiAgICAgIHVwZGF0ZShlLnRhcmdldCk7XG4gICAgICBlbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgfSk7XG5cblxuICAgIFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IGVsZW1lbnQgJiYgdXBkYXRlKGVsZW1lbnQpKTtcbiAgICBmdW5jdGlvbiB1cGRhdGUoZWxlbWVudCkge1xuICAgICAgLy8gZm9yIChsZXQgY29uZmlnIG9mIHdpbmRvdy5jYy5jb25maWdNYXRjaChlbGVtZW50Q29uZmlnLCBlbGVtZW50KSlcbiAgICAgIC8vICAgaWYgKGV2ZW50ID09PSBcImNsaWNrXCIgJiYgY29uZmlnLmhvdmVyYWJsZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgIC8vICAgZWxzZSBpZiAoZXZlbnQgPT09IFwibW91c2VvdmVyXCIgJiYgY29uZmlnLnNlbGVjdGFibGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIENvQ3JlYXRlVXRpbHMuY29uZmlnRXhlY3V0ZXIoXG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIGNvbmZpZ0tleSxcbiAgICAgICAgKGVsZW1lbnQsIGNvbmZpZywgaXNTZWxlY3RvcikgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAgIGlmKGlzU2VsZWN0b3IgKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IGNvbmZpZ1tjb25maWdLZXldO1xuICAgICAgICAgICAgaWYoIXRvb2xiYXJzW3NlbGVjdG9yXSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgICAgICAgdG9vbGJhcnNbc2VsZWN0b3JdID0gYm94O1xuICAgICAgICAgICAgICB0b29sYmFyID0gYm94LnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgLnRvb2xiYXJcIik7XG4gICAgICAgICAgICAgIHRhZ05hbWUgPSBib3gucXVlcnlTZWxlY3RvcihcIjpzY29wZSBbdGFnTmFtZV1cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICBcblxuICAgICAgICAgIGxldCBlbFBvc2l0aW9uID0gZ2V0UG9zaXRpb24oZWxlbWVudClcbiAgICAgICAgICBib3guc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICBib3guc3R5bGUudG9wID1cbiAgICAgICAgICAgIGZyYW1lRWxlbWVudC5vZmZzZXRUb3AgK1xuICAgICAgICAgICAgZWxQb3NpdGlvbi50b3AgLVxuICAgICAgICAgICAgV2luZG93LnNjcm9sbFkgLVxuICAgICAgICAgICAgdG9vbGJhci5vZmZzZXRIZWlnaHQgK1xuICAgICAgICAgICAgXCJweFwiO1xuICAgICAgICAgIGJveC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAgIGZyYW1lRWxlbWVudC5vZmZzZXRMZWZ0ICtcbiAgICAgICAgICAgIGVsUG9zaXRpb24ubGVmdCArXG4gICAgICAgICAgICBXaW5kb3cuc2Nyb2xsWCArXG4gICAgICAgICAgICBcInB4XCI7XG4gICAgICAgICAgYm94LnN0eWxlLndpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCArIFwicHhcIjtcbiAgICAgICAgICBib3guc3R5bGUuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XG5cbiAgICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRUb3AgLSB0b29sYmFyLm9mZnNldEhlaWdodCA8IDApXG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwidG9vbGJhci1vdmVyZmxvd1wiLCBcIlwiKTtcbiAgICAgICAgICBlbHNlIGJveC5yZW1vdmVBdHRyaWJ1dGUoXCJ0b29sYmFyLW92ZXJmbG93XCIpO1xuXG4gICAgICAgICAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5pbm5lckhUTUwgIT09IGVsZW1lbnQudGFnTmFtZSkge1xuICAgICAgICAgICAgdGFnTmFtZS5pbm5lckhUTUwgPSBlbGVtZW50LnRhZ05hbWU7XG5cbiAgICAgICAgICAgIC8vIGZvciAobGV0IGNvbmZpZyBvZiBlbGVtZW50Q29uZmlnKSB7XG4gICAgICAgICAgICAvLyAgIGlmIChjb25maWcudGFnTmFtZSAmJiBlbGVtZW50Lm1hdGNoZXMoY29uZmlnLnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgLy8gICAgIGlmICh0YWdOYW1lLmlubmVySFRNTCAhPT0gY29uZmlnLnRhZ05hbWUpXG4gICAgICAgICAgICAvLyAgICAgICB0YWdOYW1lLmlubmVySFRNTCA9IGNvbmZpZy50YWdOYW1lO1xuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9XG5cblxuICAgICAgICAgICAgICBpZiAoY29uZmlnLnRhZ05hbWUgJiYgY29uZmlnLnRhZ05hbWUgIT09IHRhZ05hbWUuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgdGFnTmFtZS5pbm5lckhUTUwgPSBjb25maWcudGFnTmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH1cbiAgfVxufVxuXG53aW5kb3cuQ29DcmVhdGVUb29sYmFyID0geyBpbml0OiB0b29sYmFyIH07XG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdG9vbGJhcik7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./CoCreate-components/CoCreate-toolbar/src/CoCreate-toolbar.js\n");

/***/ })

/******/ })["default"];
});