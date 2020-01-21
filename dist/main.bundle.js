/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**/
var Observer_1 = __webpack_require__(/*! ./utils/Observer */ "./src/utils/Observer.ts");
var data = { user: { name: "123" } };
Observer_1.default.createObserve(data);
data.user.name = "456";


/***/ }),

/***/ "./src/utils/Observer.ts":
/*!*******************************!*\
  !*** ./src/utils/Observer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*实现Oberser类：当某个对象属性值变动的时候能通知订阅者*/
var Observer = /** @class */ (function () {
    function Observer() {
    }
    Observer.prototype.createObserve = function (ob) {
        var _this = this;
        if (!ob || typeof ob !== 'object') {
            return;
        }
        Object.keys(ob).forEach(function (key) {
            _this.defineReactive(ob, key, ob[key]);
        });
    };
    Observer.prototype.defineReactive = function (ob, key, val) {
        var that = this;
        var child = that.createObserve(val);
        Object.defineProperty(ob, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                /**在订阅者首次订阅的时候将其添加至订阅者列表 */
                return val;
            },
            set: function (newval) {
                console.log('监听到变化了', val + " -> " + newval);
                val = newval;
                child = that.createObserve(val);
            }
        });
    };
    return Observer;
}());
var observer = new Observer();
exports.default = observer;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9PYnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSTtBQUNKLHdGQUF1QztBQUV2QyxJQUFJLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsRUFBRSxDQUFDO0FBQ25DLGtCQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztBQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7QUNMdEIsa0NBQWtDO0FBQ2xDO0lBQUE7SUEwQkEsQ0FBQztJQXpCVSxnQ0FBYSxHQUFwQixVQUFxQixFQUFVO1FBQS9CLGlCQU9DO1FBTkcsSUFBSSxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDL0IsT0FBTztTQUNWO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ3hCLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ00saUNBQWMsR0FBckIsVUFBc0IsRUFBVSxFQUFFLEdBQVcsRUFBRSxHQUFRO1FBQ25ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLEtBQUssR0FBUyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTtZQUMzQixVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsS0FBSztZQUNuQixHQUFHLEVBQUg7Z0JBQ0ksMkJBQTJCO2dCQUMzQixPQUFPLEdBQUc7WUFDZCxDQUFDO1lBQ0QsR0FBRyxFQUFILFVBQUksTUFBYztnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBSyxHQUFHLFlBQU8sTUFBUSxDQUFDO2dCQUM1QyxHQUFHLEdBQUcsTUFBTTtnQkFDWixLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDbkMsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUU3QixrQkFBZSxRQUFRIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKiovXG5pbXBvcnQgb2JzZXJ2ZXIgZnJvbSBcIi4vdXRpbHMvT2JzZXJ2ZXJcIlxuXG5sZXQgZGF0YSA9IHsgdXNlcjoge25hbWU6IFwiMTIzXCJ9IH07XG5vYnNlcnZlci5jcmVhdGVPYnNlcnZlKGRhdGEpXG5kYXRhLnVzZXIubmFtZSA9IFwiNDU2XCIiLCIvKuWunueOsE9iZXJzZXLnsbvvvJrlvZPmn5DkuKrlr7nosaHlsZ7mgKflgLzlj5jliqjnmoTml7blgJnog73pgJrnn6XorqLpmIXogIUqL1xuY2xhc3MgT2JzZXJ2ZXIge1xuICAgIHB1YmxpYyBjcmVhdGVPYnNlcnZlKG9iOiBvYmplY3QpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFvYiB8fCB0eXBlb2Ygb2IgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMob2IpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVSZWFjdGl2ZShvYiwga2V5LCBvYltrZXldKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHVibGljIGRlZmluZVJlYWN0aXZlKG9iOiBvYmplY3QsIGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCBjaGlsZDogdm9pZCA9IHRoYXQuY3JlYXRlT2JzZXJ2ZSh2YWwpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2IsIGtleSwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwvL+WPr+aemuS4vlxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwvL+S4jeiDveWGjWRlZmluZVxuICAgICAgICAgICAgZ2V0KCk6IGFueSB7XG4gICAgICAgICAgICAgICAgLyoq5Zyo6K6i6ZiF6ICF6aaW5qyh6K6i6ZiF55qE5pe25YCZ5bCG5YW25re75Yqg6Iez6K6i6ZiF6ICF5YiX6KGoICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldChuZXd2YWw6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnm5HlkKzliLDlj5jljJbkuoYnLCBgJHt2YWx9IC0+ICR7bmV3dmFsfWApXG4gICAgICAgICAgICAgICAgdmFsID0gbmV3dmFsXG4gICAgICAgICAgICAgICAgY2hpbGQgPSB0aGF0LmNyZWF0ZU9ic2VydmUodmFsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxubGV0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyKClcblxuZXhwb3J0IGRlZmF1bHQgb2JzZXJ2ZXIiXSwic291cmNlUm9vdCI6IiJ9