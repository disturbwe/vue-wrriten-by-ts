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
var Mvvm_1 = __webpack_require__(/*! ./utils/Mvvm */ "./src/utils/Mvvm.ts");
var template = "\n    <div class=\"try\">\n        <div>{{message}}</div>\n        <input type=\"text\" v-model=\"message\"/>\n    </div>\n    ";
var vm = new Mvvm_1.Mvvm({
    el: "#app",
    template: template,
    data: {
        message: '你好啊'
    }
});
vm['message'] = '我很好';


/***/ }),

/***/ "./src/utils/Compile.ts":
/*!******************************!*\
  !*** ./src/utils/Compile.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var directives_1 = __webpack_require__(/*! ./directives */ "./src/utils/directives.ts");
var Compile = /** @class */ (function () {
    function Compile(options, vm) {
        this.$el = null;
        this.compileUtil = directives_1.directives;
        this.$vm = vm;
        if (typeof options.el === 'string')
            this.$el = document.querySelector(options.el);
        else
            this.$el = options.el;
        if (this.$el) {
            this.$fragment = options.template ? this.node2Frament(this.parseDom(options.template.trim())) : this.$el; //支持在html里直接写
            this.init();
            this.$el.appendChild(this.$fragment);
        }
    }
    Compile.prototype.node2Frament = function (el) {
        /**因为遍历解析的过程有多次操作dom节点，为提高性能和效率，
         * 会先将vue实例根节点的el转换成文档碎片fragment进行解析编译操作，解析完成，
         * 再将fragment添加回原来的真实dom节点中*/
        // 将原生节点拷贝到fragment
        var fragment = document.createDocumentFragment(), child;
        //console.log(el)
        while (child = el.firstChild) {
            /**appendChild方法实际上会把节点添加到目标Node的子节点里面（在这里是DocumentFragment）,
             * 如果你的节点在HTML页面已经渲染了其实它会移除并添加到目标Node，因此你这里才可以得以循环…… */
            fragment.appendChild(child);
        }
        return fragment;
    };
    Compile.prototype.init = function () {
        this.compileElement(this.$fragment);
    };
    Compile.prototype.compileElement = function (fragment) {
        var childNodes = fragment.childNodes, me = this;
        [].slice.call(childNodes).forEach(function (childNode) {
            var text = childNode.textContent;
            var reg = /\{\{(.*)\}\}/; //双向大括号的正则表达式
            if (me.isElementNode(childNode)) {
                me.compileNode(childNode);
            }
            else if (me.isTextNode(childNode) && reg.test(text)) {
                me.compileText(childNode, RegExp.$1);
            }
            if (childNode.childNodes && childNode.childNodes.length) {
                me.compileElement(childNode);
            }
        });
    };
    Compile.prototype.parseDom = function (arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes[0];
    };
    Compile.prototype.isElementNode = function (node) {
        return node.nodeType == 1;
    };
    Compile.prototype.isTextNode = function (node) {
        return node.nodeType == 3;
    };
    Compile.prototype.isDirective = function (attrName) {
        return attrName.indexOf('v-') == 0;
    };
    Compile.prototype.compileNode = function (node) {
        var _this = this;
        var nodeAttributes = node.attributes;
        var me = this;
        [].slice.call(nodeAttributes).forEach(function (attributes) {
            var attrName = attributes.name;
            if (me.isDirective(attrName)) {
                var exp = attributes.value;
                var dir = attrName.substring(2);
                _this.compileUtil[dir] && _this.compileUtil[dir](node, me.$vm, exp);
                node.removeAttribute(attrName);
            }
        });
    };
    Compile.prototype.compileText = function (node, exp) {
        this.compileUtil.text(node, this.$vm, exp);
    };
    return Compile;
}());
exports.Compile = Compile;


/***/ }),

/***/ "./src/utils/Dep.ts":
/*!**************************!*\
  !*** ./src/utils/Dep.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Watcher_1 = __webpack_require__(/*! ./Watcher */ "./src/utils/Watcher.ts");
var uid = 0;
var Dep = /** @class */ (function () {
    function Dep() {
        this.id = uid++;
        this.subs = [];
    }
    Dep.prototype.depend = function () {
        Watcher_1.target.addDep(this);
    };
    Dep.prototype.addSub = function (sub) {
        //console.log("添加订阅者成功")
        this.subs.push(sub);
    };
    Dep.prototype.removeSub = function (sub) {
        var index = this.subs.indexOf(sub);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    };
    Dep.prototype.notify = function () {
        /**数据变动通知订阅者，再调用订阅者的update方法 */
        this.subs.forEach(function (sub) {
            sub.update();
        });
    };
    return Dep;
}());
exports.default = Dep;


/***/ }),

/***/ "./src/utils/Mvvm.ts":
/*!***************************!*\
  !*** ./src/utils/Mvvm.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Compile_1 = __webpack_require__(/*! ./Compile */ "./src/utils/Compile.ts");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./src/utils/Observer.ts");
var Mvvm = /** @class */ (function () {
    function Mvvm(options) {
        this.options = options;
        var data = this._data = this.options.data;
        var me = this;
        Object.keys(data).forEach(function (key) {
            me._proxyData(key);
        });
        var observer = new Observer_1.Observer();
        observer.createObserve(options.data); //创建绑定的监听
        this.compile = new Compile_1.Compile(options, this); //初始化视图
    }
    Mvvm.prototype._proxyData = function (key) {
        var me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                return me._data[key];
            },
            set: function (newVal) {
                me._data[key] = newVal;
            }
        });
    };
    return Mvvm;
}());
exports.Mvvm = Mvvm;


/***/ }),

/***/ "./src/utils/Observer.ts":
/*!*******************************!*\
  !*** ./src/utils/Observer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dep_1 = __webpack_require__(/*! ./Dep */ "./src/utils/Dep.ts");
var Watcher_1 = __webpack_require__(/*! ./Watcher */ "./src/utils/Watcher.ts");
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
        var dep = new Dep_1.default();
        var that = this;
        var child = that.createObserve(val);
        Object.defineProperty(ob, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                Watcher_1.target && dep.depend();
                return val;
            },
            set: function (newval) {
                if (newval === val) {
                    return;
                }
                //console.log('监听到变化了', `${val} -> ${newval}`)
                val = newval;
                child = that.createObserve(val);
                dep.notify(); //变化时通知
            }
        });
    };
    return Observer;
}());
exports.Observer = Observer;


/***/ }),

/***/ "./src/utils/Watcher.ts":
/*!******************************!*\
  !*** ./src/utils/Watcher.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.target = null;
var Watcher /*订阅者*/ = /** @class */ (function () {
    function Watcher(vm, exp, callback) {
        this.$vm = vm;
        this.$exp = exp;
        this.callback = callback;
        this.depIds = {};
        this.value = this.get();
    }
    Watcher.prototype.get = function () {
        exports.target = this; //将自己设置为当前订阅者
        var value = this.$vm[this.$exp];
        exports.target = null;
        return value;
    };
    Watcher.prototype.addDep = function (dep) {
        // 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已 
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    };
    Watcher.prototype.update = function () {
        var value = this.get();
        var oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.callback.call(this.$vm, value, oldValue);
        }
    };
    return Watcher;
}());
exports.default = Watcher;


/***/ }),

/***/ "./src/utils/directives.ts":
/*!*********************************!*\
  !*** ./src/utils/directives.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Watcher_1 = __webpack_require__(/*! ./Watcher */ "./src/utils/Watcher.ts");
exports.directives = {
    text: function (node, vm, exp) {
        exports.directives.bind(node, vm, exp, 'text');
    },
    bind: function (node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, _getVMVal(vm, exp));
        new Watcher_1.default(vm, exp, function (value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    model: function (node, vm, exp) {
        var val = _getVMVal(vm, exp), me = _this;
        exports.directives.bind(node, vm, exp, 'model');
        node.addEventListener('input', function (e) {
            var newVal = e.target.value;
            if (newVal !== val) {
                _setVMVal(vm, exp, newVal);
            }
        });
    }
};
var updater = {
    textUpdater: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};
var _getVMVal = function (vm, exp) {
    var val = vm;
    if (exp = exp.split('.')) {
        exp.forEach(function (k) {
            val = val[k];
        });
    }
    return val;
};
var _setVMVal = function (vm, exp, value) {
    var val = vm;
    if (exp = exp.split('.')) {
        exp.forEach(function (k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            }
            else {
                val[k] = value;
            }
        });
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21waWxlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9EZXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL012dm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL09ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJO0FBQ0osNEVBQW1DO0FBRW5DLElBQUksUUFBUSxHQUNSLGlJQUtDO0FBRUwsSUFBTSxFQUFFLEdBQUcsSUFBSSxXQUFJLENBQUM7SUFD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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqL1xuaW1wb3J0IHsgTXZ2bSB9IGZyb20gJy4vdXRpbHMvTXZ2bSdcblxubGV0IHRlbXBsYXRlOiBzdHJpbmcgPVxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwidHJ5XCI+XG4gICAgICAgIDxkaXY+e3ttZXNzYWdlfX08L2Rpdj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdi1tb2RlbD1cIm1lc3NhZ2VcIi8+XG4gICAgPC9kaXY+XG4gICAgYFxuXG5jb25zdCB2bSA9IG5ldyBNdnZtKHtcbiAgICBlbDogXCIjYXBwXCIsXG4gICAgdGVtcGxhdGUsXG4gICAgZGF0YToge1xuICAgICAgICBtZXNzYWdlOiAn5L2g5aW95ZWKJ1xuICAgIH1cbn0pXG5cbnZtWydtZXNzYWdlJ10gPSAn5oiR5b6I5aW9JyIsIi8qKue8luivkeexuyzliJ3lp4vljJbop4blm74gKi9cbmltcG9ydCB7IE9wdGlvbnNBYmxlLCBNdnZtIH0gZnJvbSAnLi9NdnZtJ1xuaW1wb3J0IHsgZGlyZWN0aXZlcyB9IGZyb20gJy4vZGlyZWN0aXZlcydcblxuZXhwb3J0IGNsYXNzIENvbXBpbGUge1xuICAgICRlbDogYW55ID0gbnVsbDtcbiAgICAkZnJhZ21lbnQ6IERvY3VtZW50RnJhZ21lbnQ7XG4gICAgY29tcGlsZVV0aWw6IGFueSA9IGRpcmVjdGl2ZXM7XG4gICAgJHZtOiBNdnZtO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9wdGlvbnNBYmxlLCB2bTogTXZ2bSkge1xuICAgICAgICB0aGlzLiR2bSA9IHZtO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZWwgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgdGhpcy4kZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuZWwpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuJGVsID0gb3B0aW9ucy5lbDtcblxuICAgICAgICBpZiAodGhpcy4kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuJGZyYWdtZW50ID0gb3B0aW9ucy50ZW1wbGF0ZSA/IHRoaXMubm9kZTJGcmFtZW50KHRoaXMucGFyc2VEb20ob3B0aW9ucy50ZW1wbGF0ZS50cmltKCkpKSA6IHRoaXMuJGVsLy/mlK/mjIHlnKhodG1s6YeM55u05o6l5YaZXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKHRoaXMuJGZyYWdtZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm9kZTJGcmFtZW50KGVsOiBhbnkpOiBEb2N1bWVudEZyYWdtZW50IHtcbiAgICAgICAgLyoq5Zug5Li66YGN5Y6G6Kej5p6Q55qE6L+H56iL5pyJ5aSa5qyh5pON5L2cZG9t6IqC54K577yM5Li65o+Q6auY5oCn6IO95ZKM5pWI546H77yMXG4gICAgICAgICAqIOS8muWFiOWwhnZ1ZeWunuS+i+agueiKgueCueeahGVs6L2s5o2i5oiQ5paH5qGj56KO54mHZnJhZ21lbnTov5vooYzop6PmnpDnvJbor5Hmk43kvZzvvIzop6PmnpDlrozmiJDvvIxcbiAgICAgICAgICog5YaN5bCGZnJhZ21lbnTmt7vliqDlm57ljp/mnaXnmoTnnJ/lrp5kb23oioLngrnkuK0qL1xuXG4gICAgICAgIC8vIOWwhuWOn+eUn+iKgueCueaLt+i0neWIsGZyYWdtZW50XG4gICAgICAgIGxldCBmcmFnbWVudDogRG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSwgY2hpbGQ7XG4gICAgICAgIC8vY29uc29sZS5sb2coZWwpXG4gICAgICAgIHdoaWxlIChjaGlsZCA9IGVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8qKmFwcGVuZENoaWxk5pa55rOV5a6e6ZmF5LiK5Lya5oqK6IqC54K55re75Yqg5Yiw55uu5qCHTm9kZeeahOWtkOiKgueCuemHjOmdou+8iOWcqOi/memHjOaYr0RvY3VtZW50RnJhZ21lbnTvvIksXG4gICAgICAgICAgICAgKiDlpoLmnpzkvaDnmoToioLngrnlnKhIVE1M6aG16Z2i5bey57uP5riy5p+T5LqG5YW25a6e5a6D5Lya56e76Zmk5bm25re75Yqg5Yiw55uu5qCHTm9kZe+8jOWboOatpOS9oOi/memHjOaJjeWPr+S7peW+l+S7peW+queOr+KApuKApiAqL1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY29tcGlsZUVsZW1lbnQodGhpcy4kZnJhZ21lbnQpXG4gICAgfVxuICAgIGNvbXBpbGVFbGVtZW50KGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50KSB7Ly/pgJLlvZLlpITnkIZcbiAgICAgICAgbGV0IGNoaWxkTm9kZXM6IGFueSA9IGZyYWdtZW50LmNoaWxkTm9kZXMsIG1lOiBDb21waWxlID0gdGhpcztcbiAgICAgICAgW10uc2xpY2UuY2FsbChjaGlsZE5vZGVzKS5mb3JFYWNoKGNoaWxkTm9kZSA9PiB7XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGNoaWxkTm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGxldCByZWc6IFJlZ0V4cCA9IC9cXHtcXHsoLiopXFx9XFx9LzsvL+WPjOWQkeWkp+aLrOWPt+eahOato+WImeihqOi+vuW8j1xuICAgICAgICAgICAgaWYgKG1lLmlzRWxlbWVudE5vZGUoY2hpbGROb2RlKSkge1xuICAgICAgICAgICAgICAgIG1lLmNvbXBpbGVOb2RlKGNoaWxkTm9kZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWUuaXNUZXh0Tm9kZShjaGlsZE5vZGUpICYmIHJlZy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgbWUuY29tcGlsZVRleHQoY2hpbGROb2RlLCBSZWdFeHAuJDEpXG4gICAgICAgICAgICB9IGlmIChjaGlsZE5vZGUuY2hpbGROb2RlcyAmJiBjaGlsZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtZS5jb21waWxlRWxlbWVudChjaGlsZE5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHBhcnNlRG9tKGFyZykge1xuICAgICAgICB2YXIgb2JqRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG9iakUuaW5uZXJIVE1MID0gYXJnO1xuICAgICAgICByZXR1cm4gb2JqRS5jaGlsZE5vZGVzWzBdO1xuICAgIH1cbiAgICBpc0VsZW1lbnROb2RlKG5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT0gMTtcbiAgICB9XG4gICAgaXNUZXh0Tm9kZShub2RlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09IDM7XG4gICAgfVxuICAgIGlzRGlyZWN0aXZlKGF0dHJOYW1lKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBhdHRyTmFtZS5pbmRleE9mKCd2LScpID09IDA7XG4gICAgfVxuICAgIGNvbXBpbGVOb2RlKG5vZGU6IGFueSkge1xuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZXM6IGFueSA9IG5vZGUuYXR0cmlidXRlcztcbiAgICAgICAgbGV0IG1lOiBDb21waWxlID0gdGhpcztcbiAgICAgICAgW10uc2xpY2UuY2FsbChub2RlQXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVzID0+IHtcbiAgICAgICAgICAgIGxldCBhdHRyTmFtZSA9IGF0dHJpYnV0ZXMubmFtZTtcbiAgICAgICAgICAgIGlmIChtZS5pc0RpcmVjdGl2ZShhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXhwID0gYXR0cmlidXRlcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBsZXQgZGlyID0gYXR0ck5hbWUuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZVV0aWxbZGlyXSAmJiB0aGlzLmNvbXBpbGVVdGlsW2Rpcl0obm9kZSwgbWUuJHZtLCBleHApO1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgY29tcGlsZVRleHQobm9kZTogYW55LCBleHA6IGFueSkge1xuICAgICAgICB0aGlzLmNvbXBpbGVVdGlsLnRleHQobm9kZSwgdGhpcy4kdm0sIGV4cCk7XG4gICAgfVxufSIsImltcG9ydCBXYXRjaGVyLCB7IHRhcmdldCB9IGZyb20gJy4vV2F0Y2hlcidcblxubGV0IHVpZDogbnVtYmVyID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXAge1xuICAgIGlkOiBudW1iZXIgPSB1aWQrKztcbiAgICBzdWJzOiBBcnJheTxXYXRjaGVyPiA9IFtdO1xuICAgIGRlcGVuZCgpOiB2b2lkIHtcbiAgICAgICAgdGFyZ2V0LmFkZERlcCh0aGlzKVxuICAgIH1cbiAgICBhZGRTdWIoc3ViOiBXYXRjaGVyKTogdm9pZCB7Ly/mt7vliqDorqLpmIXogIVcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIua3u+WKoOiuoumYheiAheaIkOWKn1wiKVxuICAgICAgICB0aGlzLnN1YnMucHVzaChzdWIpO1xuICAgIH1cbiAgICByZW1vdmVTdWIoc3ViOiBhbnkpOiB2b2lkIHsvL+WIoOmZpOiuoumYheiAhVxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuc3Vicy5pbmRleE9mKHN1Yik7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vdGlmeSgpIHsvL+mAmuefpeiuoumYheiAhVxuICAgICAgICAvKirmlbDmja7lj5jliqjpgJrnn6XorqLpmIXogIXvvIzlho3osIPnlKjorqLpmIXogIXnmoR1cGRhdGXmlrnms5UgKi9cbiAgICAgICAgdGhpcy5zdWJzLmZvckVhY2goc3ViID0+IHtcbiAgICAgICAgICAgIHN1Yi51cGRhdGUoKVxuICAgICAgICB9KVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBpbGUgfSBmcm9tICcuL0NvbXBpbGUnXG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4vT2JzZXJ2ZXInXG5cbmV4cG9ydCBjbGFzcyBNdnZtIHtcbiAgICBjb21waWxlOiBDb21waWxlO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNBYmxlO1xuICAgIF9kYXRhOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPcHRpb25zQWJsZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGEgPSB0aGlzLm9wdGlvbnMuZGF0YTtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7Ly/ku6PnkIZcbiAgICAgICAgICAgIG1lLl9wcm94eURhdGEoa2V5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyKCk7XG4gICAgICAgIG9ic2VydmVyLmNyZWF0ZU9ic2VydmUob3B0aW9ucy5kYXRhKTsvL+WIm+W7uue7keWumueahOebkeWQrFxuICAgICAgICB0aGlzLmNvbXBpbGUgPSBuZXcgQ29tcGlsZShvcHRpb25zLCB0aGlzKTsvL+WIneWni+WMluinhuWbvlxuICAgIH1cblxuICAgIF9wcm94eURhdGEoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCBrZXksIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZS5fZGF0YVtrZXldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICBtZS5fZGF0YVtrZXldID0gbmV3VmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0FibGUgey8v6YWN572u5Y+v6YCJ6aG555qE5o6l5Y+jXG4gICAgZWw6IHN0cmluZyB8IG9iamVjdCxcbiAgICBkYXRhPzogYW55LFxuICAgIHRlbXBsYXRlPzogc3RyaW5nXG59IiwiaW1wb3J0IERlcCBmcm9tICcuL0RlcCc7XG5pbXBvcnQgeyB0YXJnZXQgfSBmcm9tICcuL1dhdGNoZXInXG4vKuWunueOsE9iZXJzZXLnsbvvvJrlvZPmn5DkuKrlr7nosaHlsZ7mgKflgLzlj5jliqjnmoTml7blgJnog73pgJrnn6XorqLpmIXogIUqL1xuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAgICBjcmVhdGVPYnNlcnZlKG9iOiBvYmplY3QpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFvYiB8fCB0eXBlb2Ygb2IgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMob2IpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVSZWFjdGl2ZShvYiwga2V5LCBvYltrZXldKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZGVmaW5lUmVhY3RpdmUob2I6IG9iamVjdCwga2V5OiBzdHJpbmcsIHZhbDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBkZXAgPSBuZXcgRGVwKCk7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGNoaWxkOiB2b2lkID0gdGhhdC5jcmVhdGVPYnNlcnZlKHZhbCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYiwga2V5LCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLC8v5Y+v5p6a5Li+XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLC8v5LiN6IO95YaNZGVmaW5lXG4gICAgICAgICAgICBnZXQoKTogYW55IC8qKuWcqOiuoumYheiAhemmluasoeiuoumYheeahOaXtuWAmeWwhuWFtua3u+WKoOiHs+iuoumYheiAheWIl+ihqCAqLyB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ICYmIGRlcC5kZXBlbmQoKVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQobmV3dmFsOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3dmFsID09PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCfnm5HlkKzliLDlj5jljJbkuoYnLCBgJHt2YWx9IC0+ICR7bmV3dmFsfWApXG4gICAgICAgICAgICAgICAgdmFsID0gbmV3dmFsXG4gICAgICAgICAgICAgICAgY2hpbGQgPSB0aGF0LmNyZWF0ZU9ic2VydmUodmFsKVxuICAgICAgICAgICAgICAgIGRlcC5ub3RpZnkoKS8v5Y+Y5YyW5pe26YCa55+lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiaW1wb3J0IERlcCBmcm9tICcuL0RlcCdcbmltcG9ydCB7IE12dm0gfSBmcm9tICcuL012dm0nXG5cbmV4cG9ydCBsZXQgdGFyZ2V0OiBXYXRjaGVyIHwgbnVsbCA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0Y2hlciAvKuiuoumYheiAhSovIHtcbiAgICBkZXBJZHM6IGRlcElkc0FibGU7XG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uO1xuICAgICR2bTogTXZ2bTtcbiAgICAkZXhwOiBhbnk7XG4gICAgdmFsdWU6IGFueTtcbiAgICBjb25zdHJ1Y3Rvcih2bTogTXZ2bSwgZXhwOiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLiR2bSA9IHZtO1xuICAgICAgICB0aGlzLiRleHAgPSBleHA7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgICAgICB0aGlzLmRlcElkcyA9IHt9XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpXG4gICAgfVxuICAgIGdldCgpOiBhbnkge1xuICAgICAgICB0YXJnZXQgPSB0aGlzOy8v5bCG6Ieq5bex6K6+572u5Li65b2T5YmN6K6i6ZiF6ICFXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJHZtW3RoaXMuJGV4cF1cbiAgICAgICAgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGFkZERlcChkZXA6IGFueSkgey8v5re75Yqg6K6i6ZiFXG4gICAgICAgIC8vIOWBh+WmguebuOW6lOWxnuaAp+eahGRlcC5pZOW3sue7j+WcqOW9k+WJjXdhdGNoZXLnmoRkZXBJZHPph4zvvIzor7TmmI7kuI3mmK/kuIDkuKrmlrDnmoTlsZ7mgKfvvIzku4Xku4XmmK/mlLnlj5jkuoblhbblgLzogIzlt7IgXG4gICAgICAgIGlmICghdGhpcy5kZXBJZHMuaGFzT3duUHJvcGVydHkoZGVwLmlkKSkge1xuICAgICAgICAgICAgZGVwLmFkZFN1Yih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZGVwSWRzW2RlcC5pZF0gPSBkZXA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKCkgey8v5pu05paw6KeG5Zu+5pWw5o2uXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLiR2bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBkZXBJZHNBYmxlIHt9IiwiLyoq5oyH5Luk6ZuGICovXG5pbXBvcnQgeyBNdnZtIH0gZnJvbSAnLi9NdnZtJ1xuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi9XYXRjaGVyJ1xuXG5leHBvcnQgY29uc3QgZGlyZWN0aXZlczogYW55ID0ge1xuICAgIHRleHQ6IChub2RlOiBhbnksIHZtOiBNdnZtLCBleHA6IHN0cmluZykgPT4gey8v6Kej5p6Q5Y+M5ZCR5aSn5ous5Y+3XG4gICAgICAgIGRpcmVjdGl2ZXMuYmluZChub2RlLCB2bSwgZXhwLCAndGV4dCcpO1xuICAgIH0sXG4gICAgYmluZDogKG5vZGU6IGFueSwgdm06IE12dm0sIGV4cD86IGFueSwgZGlyPzogc3RyaW5nKSA9PiB7Ly/nu5HlrppcbiAgICAgICAgbGV0IHVwZGF0ZXJGbiA9IHVwZGF0ZXJbZGlyICsgJ1VwZGF0ZXInXTtcbiAgICAgICAgdXBkYXRlckZuICYmIHVwZGF0ZXJGbihub2RlLCBfZ2V0Vk1WYWwodm0sIGV4cCkpO1xuICAgICAgICBuZXcgV2F0Y2hlcih2bSwgZXhwLCAodmFsdWUsIG9sZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyDkuIDml6blsZ7mgKflgLzmnInlj5jljJbvvIzkvJrmlLbliLDpgJrnn6XmiafooYzmraTmm7TmlrDlh73mlbDvvIzmm7TmlrDop4blm75cbiAgICAgICAgICAgIHVwZGF0ZXJGbiAmJiB1cGRhdGVyRm4obm9kZSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBtb2RlbDogKG5vZGU6IGFueSwgdm06IE12dm0sIGV4cDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCB2YWwgPSBfZ2V0Vk1WYWwodm0sIGV4cCksIG1lID0gdGhpcztcbiAgICAgICAgZGlyZWN0aXZlcy5iaW5kKG5vZGUsIHZtLCBleHAsICdtb2RlbCcpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdWYWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgIT09IHZhbCkge1xuICAgICAgICAgICAgICAgIF9zZXRWTVZhbCh2bSwgZXhwLCBuZXdWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuY29uc3QgdXBkYXRlcjogYW55ID0ge1xuICAgIHRleHRVcGRhdGVyOiBmdW5jdGlvbiAobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyAnJyA6IHZhbHVlO1xuICAgIH0sXG4gICAgbW9kZWxVcGRhdGVyOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIG5vZGUudmFsdWUgPSB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyAnJyA6IHZhbHVlO1xuICAgIH1cbn07XG5cbmNvbnN0IF9nZXRWTVZhbDogRnVuY3Rpb24gPSAodm06IE12dm0sIGV4cDogYW55KTogYW55ID0+IHtcbiAgICB2YXIgdmFsID0gdm07XG5cbiAgICBpZiAoZXhwID0gZXhwLnNwbGl0KCcuJykpIHtcbiAgICAgICAgZXhwLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbFtrXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbn1cblxuY29uc3QgX3NldFZNVmFsOiBGdW5jdGlvbiA9ICh2bTogTXZ2bSwgZXhwOiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkID0+IHtcbiAgICBsZXQgdmFsID0gdm07XG5cbiAgICBpZiAoZXhwID0gZXhwLnNwbGl0KCcuJykpIHtcbiAgICAgICAgZXhwLmZvckVhY2goZnVuY3Rpb24gKGssIGkpIHtcbiAgICAgICAgICAgIGlmIChpIDwgZXhwLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWxba107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbFtrXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6IiJ9