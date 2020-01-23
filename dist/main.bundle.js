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
var template = "\n    <div class=\"try\">\n        <div>{{message}}</div>\n        <input type=\"text\" v-model=\"message\"/>\n        <ul>\n            <li v-for=\"(item, index) in list\">{{item}}</li>\n        </ul\n    </div>\n    ";
var vm = new Mvvm_1.Mvvm({
    el: "#app",
    template: template,
    data: {
        message: '你好啊',
        list: ['1', '2', '3']
    }
});
vm['message'] = '我很好';
vm['list'] = ['1', '2', '6'];


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
        var observer = new Observer_1.Observer();
        observer.createObserve(options.data, this); //创建绑定的监听
        var data = this._data;
        var me = this;
        Object.keys(data).forEach(function (key) {
            me._proxyData(key);
        });
        this.compile = new Compile_1.Compile(options, this); //初始化视图
    }
    Mvvm.prototype._proxyData = function (key) {
        var me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                return Reflect.get(me._data, key);
            },
            set: function (newVal) {
                Reflect.set(me._data, key, newVal);
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
    Observer.prototype.createObserve = function (ob, vm) {
        if (!ob || typeof ob !== 'object') {
            return;
        }
        this.$vm = vm;
        this.$vm._data = this.defineReactive(ob);
        // Object.keys(ob).forEach((key) => {
        //     this.defineReactive(ob, key, ob[key]);
        // })
    };
    Observer.prototype.defineReactive = function (ob, key, val) {
        var dep = new Dep_1.default();
        var that = this;
        // let child: void = that.createObserve(val);
        return new Proxy(ob, {
            get: function (targetob, key, receiver) {
                Watcher_1.target && dep.depend();
                return Reflect.get(targetob, key, receiver);
            },
            set: function (targetob, key, newVal, receiver) {
                //console.log(targetob, key, newVal, receiver);
                if (newVal === val) {
                    return;
                }
                //console.log('监听到变化了', `${val} -> ${newval}`)
                val = newVal;
                // child = that.createObserve(val)
                Reflect.set(targetob, key, newVal, receiver);
                dep.notify(); //变化时通知
                return true;
            }
        });
        // Object.defineProperty(ob, key, {
        //     enumerable: true,//可枚举
        //     configurable: false,//不能再define
        //     get(): any /**在订阅者首次订阅的时候将其添加至订阅者列表 */ {
        //         target && dep.depend()
        //         return val
        //     },
        //     set(newval: string) {
        //         if (newval === val) {
        //             return;
        //         }
        //         //console.log('监听到变化了', `${val} -> ${newval}`)
        //         val = newval
        //         child = that.createObserve(val)
        //         dep.notify()//变化时通知
        //     }
        // })
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
var directives_1 = __webpack_require__(/*! ./directives */ "./src/utils/directives.ts");
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
        var value = directives_1._getVMVal(this.$vm, this.$exp);
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
        updaterFn && updaterFn(node, exports._getVMVal(vm, exp));
        new Watcher_1.default(vm, exp, function (value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    model: function (node, vm, exp) {
        var val = exports._getVMVal(vm, exp), me = _this;
        exports.directives.bind(node, vm, exp, 'model');
        node.addEventListener('input', function (e) {
            var newVal = e.target.value;
            if (newVal !== val) {
                exports._setVMVal(vm, exp, newVal);
            }
        });
    },
    for: function (node, vm, exp) {
        var parentNode = node.parentNode;
        var temp = exp.split(' in ');
        var list = vm[temp[1]];
        var tagName = node.tagName;
        var fragment = document.createDocumentFragment();
        for (var key in list) {
            var newNode = document.createElement(tagName);
            exports.directives.bind(newNode, vm, temp[1] + "." + key, 'text');
            fragment.appendChild(newNode);
        }
        parentNode.removeChild(node);
        parentNode.appendChild(fragment);
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
exports._getVMVal = function (vm, exp) {
    var val = vm;
    if (exp = exp.split('.')) {
        exp.forEach(function (k) {
            val = val[k];
        });
    }
    return val;
};
exports._setVMVal = function (vm, exp, value) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21waWxlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9EZXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL012dm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL09ic2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJO0FBQ0osNEVBQW1DO0FBRW5DLElBQUksUUFBUSxHQUNSLDROQVFDO0FBRUwsSUFBTSxFQUFFLEdBQUcsSUFBSSxXQUFJLENBQUM7SUFD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QkFBTTtnQkFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTjtBQUVMLENBQUMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8qKi9cbmltcG9ydCB7IE12dm0gfSBmcm9tICcuL3V0aWxzL012dm0nXG5cbmxldCB0ZW1wbGF0ZTogc3RyaW5nID1cbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cInRyeVwiPlxuICAgICAgICA8ZGl2Pnt7bWVzc2FnZX19PC9kaXY+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJtZXNzYWdlXCIvPlxuICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGxpc3RcIj57e2l0ZW19fTwvbGk+XG4gICAgICAgIDwvdWxcbiAgICA8L2Rpdj5cbiAgICBgXG5cbmNvbnN0IHZtID0gbmV3IE12dm0oe1xuICAgIGVsOiBcIiNhcHBcIixcbiAgICB0ZW1wbGF0ZSxcbiAgICBkYXRhOiB7XG4gICAgICAgIG1lc3NhZ2U6ICfkvaDlpb3llYonLFxuICAgICAgICBsaXN0OiBbJzEnLCAnMicsICczJ11cbiAgICB9XG59KVxuXG52bVsnbWVzc2FnZSddID0gJ+aIkeW+iOWlvSdcbnZtWydsaXN0J10gPSBbJzEnLCAnMicsICc2J10iLCIvKirnvJbor5Hnsbss5Yid5aeL5YyW6KeG5Zu+ICovXG5pbXBvcnQgeyBPcHRpb25zQWJsZSwgTXZ2bSB9IGZyb20gJy4vTXZ2bSdcbmltcG9ydCB7IGRpcmVjdGl2ZXMgfSBmcm9tICcuL2RpcmVjdGl2ZXMnXG5cbmV4cG9ydCBjbGFzcyBDb21waWxlIHtcbiAgICAkZWw6IGFueSA9IG51bGw7XG4gICAgJGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50O1xuICAgIGNvbXBpbGVVdGlsOiBhbnkgPSBkaXJlY3RpdmVzO1xuICAgICR2bTogTXZ2bTtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPcHRpb25zQWJsZSwgdm06IE12dm0pIHtcbiAgICAgICAgdGhpcy4kdm0gPSB2bTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVsID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRoaXMuJGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmVsKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLiRlbCA9IG9wdGlvbnMuZWw7XG5cbiAgICAgICAgaWYgKHRoaXMuJGVsKSB7XG4gICAgICAgICAgICB0aGlzLiRmcmFnbWVudCA9IG9wdGlvbnMudGVtcGxhdGUgPyB0aGlzLm5vZGUyRnJhbWVudCh0aGlzLnBhcnNlRG9tKG9wdGlvbnMudGVtcGxhdGUudHJpbSgpKSkgOiB0aGlzLiRlbC8v5pSv5oyB5ZyoaHRtbOmHjOebtOaOpeWGmVxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZCh0aGlzLiRmcmFnbWVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vZGUyRnJhbWVudChlbDogYW55KTogRG9jdW1lbnRGcmFnbWVudCB7XG4gICAgICAgIC8qKuWboOS4uumBjeWOhuino+aekOeahOi/h+eoi+acieWkmuasoeaTjeS9nGRvbeiKgueCue+8jOS4uuaPkOmrmOaAp+iDveWSjOaViOeOh++8jFxuICAgICAgICAgKiDkvJrlhYjlsIZ2dWXlrp7kvovmoLnoioLngrnnmoRlbOi9rOaNouaIkOaWh+aho+eijueJh2ZyYWdtZW506L+b6KGM6Kej5p6Q57yW6K+R5pON5L2c77yM6Kej5p6Q5a6M5oiQ77yMXG4gICAgICAgICAqIOWGjeWwhmZyYWdtZW505re75Yqg5Zue5Y6f5p2l55qE55yf5a6eZG9t6IqC54K55LitKi9cblxuICAgICAgICAvLyDlsIbljp/nlJ/oioLngrnmi7fotJ3liLBmcmFnbWVudFxuICAgICAgICBsZXQgZnJhZ21lbnQ6IERvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIGNoaWxkO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGVsKVxuICAgICAgICB3aGlsZSAoY2hpbGQgPSBlbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvKiphcHBlbmRDaGlsZOaWueazleWunumZheS4iuS8muaKiuiKgueCuea3u+WKoOWIsOebruagh05vZGXnmoTlrZDoioLngrnph4zpnaLvvIjlnKjov5nph4zmmK9Eb2N1bWVudEZyYWdtZW5077yJLFxuICAgICAgICAgICAgICog5aaC5p6c5L2g55qE6IqC54K55ZyoSFRNTOmhtemdouW3sue7j+a4suafk+S6huWFtuWunuWug+S8muenu+mZpOW5tua3u+WKoOWIsOebruagh05vZGXvvIzlm6DmraTkvaDov5nph4zmiY3lj6/ku6Xlvpfku6Xlvqrnjq/igKbigKYgKi9cbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFnbWVudFxuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNvbXBpbGVFbGVtZW50KHRoaXMuJGZyYWdtZW50KVxuICAgIH1cbiAgICBjb21waWxlRWxlbWVudChmcmFnbWVudDogRG9jdW1lbnRGcmFnbWVudCkgey8v6YCS5b2S5aSE55CGXG4gICAgICAgIGxldCBjaGlsZE5vZGVzOiBhbnkgPSBmcmFnbWVudC5jaGlsZE5vZGVzLCBtZTogQ29tcGlsZSA9IHRoaXM7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwoY2hpbGROb2RlcykuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICAgICAgbGV0IHRleHQgPSBjaGlsZE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBsZXQgcmVnOiBSZWdFeHAgPSAvXFx7XFx7KC4qKVxcfVxcfS87Ly/lj4zlkJHlpKfmi6zlj7fnmoTmraPliJnooajovr7lvI9cbiAgICAgICAgICAgIGlmIChtZS5pc0VsZW1lbnROb2RlKGNoaWxkTm9kZSkpIHtcbiAgICAgICAgICAgICAgICBtZS5jb21waWxlTm9kZShjaGlsZE5vZGUpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lLmlzVGV4dE5vZGUoY2hpbGROb2RlKSAmJiByZWcudGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIG1lLmNvbXBpbGVUZXh0KGNoaWxkTm9kZSwgUmVnRXhwLiQxKVxuICAgICAgICAgICAgfSBpZiAoY2hpbGROb2RlLmNoaWxkTm9kZXMgJiYgY2hpbGROb2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbWUuY29tcGlsZUVsZW1lbnQoY2hpbGROb2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBwYXJzZURvbShhcmcpIHtcbiAgICAgICAgdmFyIG9iakUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBvYmpFLmlubmVySFRNTCA9IGFyZztcbiAgICAgICAgcmV0dXJuIG9iakUuY2hpbGROb2Rlc1swXTtcbiAgICB9XG4gICAgaXNFbGVtZW50Tm9kZShub2RlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09IDE7XG4gICAgfVxuICAgIGlzVGV4dE5vZGUobm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PSAzO1xuICAgIH1cbiAgICBpc0RpcmVjdGl2ZShhdHRyTmFtZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gYXR0ck5hbWUuaW5kZXhPZigndi0nKSA9PSAwO1xuICAgIH1cbiAgICBjb21waWxlTm9kZShub2RlOiBhbnkpIHtcbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVzOiBhbnkgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICAgIGxldCBtZTogQ29tcGlsZSA9IHRoaXM7XG4gICAgICAgIFtdLnNsaWNlLmNhbGwobm9kZUF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlcyA9PiB7XG4gICAgICAgICAgICBsZXQgYXR0ck5hbWUgPSBhdHRyaWJ1dGVzLm5hbWU7XG4gICAgICAgICAgICBpZiAobWUuaXNEaXJlY3RpdmUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV4cCA9IGF0dHJpYnV0ZXMudmFsdWU7XG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IGF0dHJOYW1lLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGVVdGlsW2Rpcl0gJiYgdGhpcy5jb21waWxlVXRpbFtkaXJdKG5vZGUsIG1lLiR2bSwgZXhwKTtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGNvbXBpbGVUZXh0KG5vZGU6IGFueSwgZXhwOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb21waWxlVXRpbC50ZXh0KG5vZGUsIHRoaXMuJHZtLCBleHApO1xuICAgIH1cbn0iLCJpbXBvcnQgV2F0Y2hlciwgeyB0YXJnZXQgfSBmcm9tICcuL1dhdGNoZXInXG5cbmxldCB1aWQ6IG51bWJlciA9IDBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwIHtcbiAgICBpZDogbnVtYmVyID0gdWlkKys7XG4gICAgc3ViczogQXJyYXk8V2F0Y2hlcj4gPSBbXTtcbiAgICBkZXBlbmQoKTogdm9pZCB7XG4gICAgICAgIHRhcmdldC5hZGREZXAodGhpcylcbiAgICB9XG4gICAgYWRkU3ViKHN1YjogV2F0Y2hlcik6IHZvaWQgey8v5re75Yqg6K6i6ZiF6ICFXG4gICAgICAgIC8vY29uc29sZS5sb2coXCLmt7vliqDorqLpmIXogIXmiJDlip9cIilcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goc3ViKTtcbiAgICB9XG4gICAgcmVtb3ZlU3ViKHN1YjogYW55KTogdm9pZCB7Ly/liKDpmaTorqLpmIXogIVcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLnN1YnMuaW5kZXhPZihzdWIpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub3RpZnkoKSB7Ly/pgJrnn6XorqLpmIXogIVcbiAgICAgICAgLyoq5pWw5o2u5Y+Y5Yqo6YCa55+l6K6i6ZiF6ICF77yM5YaN6LCD55So6K6i6ZiF6ICF55qEdXBkYXRl5pa55rOVICovXG4gICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgICBzdWIudXBkYXRlKClcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21waWxlIH0gZnJvbSAnLi9Db21waWxlJ1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJ1xuXG5leHBvcnQgY2xhc3MgTXZ2bSB7XG4gICAgY29tcGlsZTogQ29tcGlsZTtcbiAgICBvcHRpb25zOiBPcHRpb25zQWJsZTtcbiAgICBfZGF0YTogYW55O1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogT3B0aW9uc0FibGUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyKCk7XG4gICAgICAgIG9ic2VydmVyLmNyZWF0ZU9ic2VydmUob3B0aW9ucy5kYXRhLCB0aGlzKTsvL+WIm+W7uue7keWumueahOebkeWQrFxuXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YTtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4gey8v5Luj55CGXG4gICAgICAgICAgICBtZS5fcHJveHlEYXRhKGtleSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBpbGUgPSBuZXcgQ29tcGlsZShvcHRpb25zLCB0aGlzKTsvL+WIneWni+WMluinhuWbvlxuICAgIH1cblxuICAgIF9wcm94eURhdGEoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCBrZXksIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldChtZS5fZGF0YSwga2V5KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICBSZWZsZWN0LnNldChtZS5fZGF0YSwga2V5LCBuZXdWYWwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zQWJsZSB7Ly/phY3nva7lj6/pgInpobnnmoTmjqXlj6NcbiAgICBlbDogc3RyaW5nIHwgb2JqZWN0LFxuICAgIGRhdGE/OiBhbnksXG4gICAgdGVtcGxhdGU/OiBzdHJpbmdcbn0iLCJpbXBvcnQgRGVwIGZyb20gJy4vRGVwJztcbmltcG9ydCB7IE12dm0gfSBmcm9tICcuL012dm0nO1xuaW1wb3J0IHsgdGFyZ2V0IH0gZnJvbSAnLi9XYXRjaGVyJ1xuLyrlrp7njrBPYmVyc2Vy57G777ya5b2T5p+Q5Liq5a+56LGh5bGe5oCn5YC85Y+Y5Yqo55qE5pe25YCZ6IO96YCa55+l6K6i6ZiF6ICFKi9cbmV4cG9ydCBjbGFzcyBPYnNlcnZlciB7XG4gICAgJHZtOiBNdnZtO1xuICAgIGNyZWF0ZU9ic2VydmUob2I6IG9iamVjdCwgdm06IE12dm0pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFvYiB8fCB0eXBlb2Ygb2IgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kdm0gPSB2bTtcbiAgICAgICAgdGhpcy4kdm0uX2RhdGEgPSB0aGlzLmRlZmluZVJlYWN0aXZlKG9iKVxuICAgICAgICAvLyBPYmplY3Qua2V5cyhvYikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmRlZmluZVJlYWN0aXZlKG9iLCBrZXksIG9iW2tleV0pO1xuICAgICAgICAvLyB9KVxuICAgIH1cbiAgICBkZWZpbmVSZWFjdGl2ZShvYjogb2JqZWN0LCBrZXk/OiBzdHJpbmcsIHZhbD86IGFueSkge1xuICAgICAgICBsZXQgZGVwID0gbmV3IERlcCgpO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIGxldCBjaGlsZDogdm9pZCA9IHRoYXQuY3JlYXRlT2JzZXJ2ZSh2YWwpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG9iLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXRvYiwga2V5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgIHRhcmdldCAmJiBkZXAuZGVwZW5kKClcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0b2IsIGtleSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHRhcmdldG9iLCBrZXksIG5ld1ZhbCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldG9iLCBrZXksIG5ld1ZhbCwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+ebkeWQrOWIsOWPmOWMluS6hicsIGAke3ZhbH0gLT4gJHtuZXd2YWx9YClcbiAgICAgICAgICAgICAgICB2YWwgPSBuZXdWYWxcbiAgICAgICAgICAgICAgICAvLyBjaGlsZCA9IHRoYXQuY3JlYXRlT2JzZXJ2ZSh2YWwpXG4gICAgICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0b2IsIGtleSwgbmV3VmFsLCByZWNlaXZlcilcbiAgICAgICAgICAgICAgICBkZXAubm90aWZ5KCkvL+WPmOWMluaXtumAmuefpVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iLCBrZXksIHtcbiAgICAgICAgLy8gICAgIGVudW1lcmFibGU6IHRydWUsLy/lj6/mnprkuL5cbiAgICAgICAgLy8gICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsLy/kuI3og73lho1kZWZpbmVcbiAgICAgICAgLy8gICAgIGdldCgpOiBhbnkgLyoq5Zyo6K6i6ZiF6ICF6aaW5qyh6K6i6ZiF55qE5pe25YCZ5bCG5YW25re75Yqg6Iez6K6i6ZiF6ICF5YiX6KGoICovIHtcbiAgICAgICAgLy8gICAgICAgICB0YXJnZXQgJiYgZGVwLmRlcGVuZCgpXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldChuZXd2YWw6IHN0cmluZykge1xuICAgICAgICAvLyAgICAgICAgIGlmIChuZXd2YWwgPT09IHZhbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIC8vY29uc29sZS5sb2coJ+ebkeWQrOWIsOWPmOWMluS6hicsIGAke3ZhbH0gLT4gJHtuZXd2YWx9YClcbiAgICAgICAgLy8gICAgICAgICB2YWwgPSBuZXd2YWxcbiAgICAgICAgLy8gICAgICAgICBjaGlsZCA9IHRoYXQuY3JlYXRlT2JzZXJ2ZSh2YWwpXG4gICAgICAgIC8vICAgICAgICAgZGVwLm5vdGlmeSgpLy/lj5jljJbml7bpgJrnn6VcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcbiAgICB9XG59XG4iLCJpbXBvcnQgRGVwIGZyb20gJy4vRGVwJ1xuaW1wb3J0IHsgTXZ2bSB9IGZyb20gJy4vTXZ2bSdcbmltcG9ydCB7IF9nZXRWTVZhbCwgX3NldFZNVmFsIH0gZnJvbSAnLi9kaXJlY3RpdmVzJ1xuXG5leHBvcnQgbGV0IHRhcmdldDogV2F0Y2hlciB8IG51bGwgPSBudWxsXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGNoZXIgLyrorqLpmIXogIUqLyB7XG4gICAgZGVwSWRzOiBkZXBJZHNBYmxlO1xuICAgIGNhbGxiYWNrOiBGdW5jdGlvbjtcbiAgICAkdm06IE12dm07XG4gICAgJGV4cDogYW55O1xuICAgIHZhbHVlOiBhbnk7XG4gICAgY29uc3RydWN0b3Iodm06IE12dm0sIGV4cDogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy4kdm0gPSB2bTtcbiAgICAgICAgdGhpcy4kZXhwID0gZXhwO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICAgICAgdGhpcy5kZXBJZHMgPSB7fVxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKVxuICAgIH1cbiAgICBnZXQoKTogYW55IHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpczsvL+WwhuiHquW3seiuvue9ruS4uuW9k+WJjeiuoumYheiAhVxuICAgICAgICBsZXQgdmFsdWUgPSBfZ2V0Vk1WYWwodGhpcy4kdm0sIHRoaXMuJGV4cCk7XG4gICAgICAgIHRhcmdldCA9IG51bGw7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBhZGREZXAoZGVwOiBhbnkpIHsvL+a3u+WKoOiuoumYhVxuICAgICAgICAvLyDlgYflpoLnm7jlupTlsZ7mgKfnmoRkZXAuaWTlt7Lnu4/lnKjlvZPliY13YXRjaGVy55qEZGVwSWRz6YeM77yM6K+05piO5LiN5piv5LiA5Liq5paw55qE5bGe5oCn77yM5LuF5LuF5piv5pS55Y+Y5LqG5YW25YC86ICM5beyIFxuICAgICAgICBpZiAoIXRoaXMuZGVwSWRzLmhhc093blByb3BlcnR5KGRlcC5pZCkpIHtcbiAgICAgICAgICAgIGRlcC5hZGRTdWIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmRlcElkc1tkZXAuaWRdID0gZGVwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZSgpIHsvL+abtOaWsOinhuWbvuaVsOaNrlxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldCgpO1xuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy4kdm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgZGVwSWRzQWJsZSB7IH0iLCIvKirmjIfku6Tpm4YgKi9cbmltcG9ydCB7IE12dm0gfSBmcm9tICcuL012dm0nXG5pbXBvcnQgV2F0Y2hlciBmcm9tICcuL1dhdGNoZXInXG5cbmV4cG9ydCBjb25zdCBkaXJlY3RpdmVzOiBhbnkgPSB7XG4gICAgdGV4dDogKG5vZGU6IGFueSwgdm06IE12dm0sIGV4cDogc3RyaW5nKSA9PiB7Ly/op6PmnpDlj4zlkJHlpKfmi6zlj7dcbiAgICAgICAgZGlyZWN0aXZlcy5iaW5kKG5vZGUsIHZtLCBleHAsICd0ZXh0Jyk7XG4gICAgfSxcbiAgICBiaW5kOiAobm9kZTogYW55LCB2bTogTXZ2bSwgZXhwPzogYW55LCBkaXI/OiBzdHJpbmcpID0+IHsvL+e7keWumlxuICAgICAgICBsZXQgdXBkYXRlckZuID0gdXBkYXRlcltkaXIgKyAnVXBkYXRlciddO1xuICAgICAgICB1cGRhdGVyRm4gJiYgdXBkYXRlckZuKG5vZGUsIF9nZXRWTVZhbCh2bSwgZXhwKSk7XG4gICAgICAgIG5ldyBXYXRjaGVyKHZtLCBleHAsICh2YWx1ZSwgb2xkVmFsdWUpID0+IHtcbiAgICAgICAgICAgIC8vIOS4gOaXpuWxnuaAp+WAvOacieWPmOWMlu+8jOS8muaUtuWIsOmAmuefpeaJp+ihjOatpOabtOaWsOWHveaVsO+8jOabtOaWsOinhuWbvlxuICAgICAgICAgICAgdXBkYXRlckZuICYmIHVwZGF0ZXJGbihub2RlLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG1vZGVsOiAobm9kZTogYW55LCB2bTogTXZ2bSwgZXhwOiBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IHZhbCA9IF9nZXRWTVZhbCh2bSwgZXhwKSwgbWUgPSB0aGlzO1xuICAgICAgICBkaXJlY3RpdmVzLmJpbmQobm9kZSwgdm0sIGV4cCwgJ21vZGVsJyk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgX3NldFZNVmFsKHZtLCBleHAsIG5ld1ZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBmb3Iobm9kZTogYW55LCB2bTogTXZ2bSwgZXhwOiBhbnkpIHtcbiAgICAgICAgbGV0IHBhcmVudE5vZGU6IGFueSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgbGV0IHRlbXA6IEFycmF5PHN0cmluZz4gPSBleHAuc3BsaXQoJyBpbiAnKTtcbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PGFueT4gPSB2bVt0ZW1wWzFdXVxuICAgICAgICBsZXQgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcbiAgICAgICAgbGV0IGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsaXN0KSB7XG4gICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgICAgICBkaXJlY3RpdmVzLmJpbmQobmV3Tm9kZSwgdm0sIGAke3RlbXBbMV19LiR7a2V5fWAsICd0ZXh0JylcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5ld05vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgfVxufVxuXG5jb25zdCB1cGRhdGVyOiBhbnkgPSB7XG4gICAgdGV4dFVwZGF0ZXI6IGZ1bmN0aW9uIChub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyA/ICcnIDogdmFsdWU7XG4gICAgfSxcbiAgICBtb2RlbFVwZGF0ZXI6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbm9kZS52YWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyA/ICcnIDogdmFsdWU7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IF9nZXRWTVZhbDogRnVuY3Rpb24gPSAodm06IE12dm0sIGV4cDogYW55KTogYW55ID0+IHtcbiAgICB2YXIgdmFsID0gdm07XG5cbiAgICBpZiAoZXhwID0gZXhwLnNwbGl0KCcuJykpIHtcbiAgICAgICAgZXhwLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbFtrXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbn1cblxuZXhwb3J0IGNvbnN0IF9zZXRWTVZhbDogRnVuY3Rpb24gPSAodm06IE12dm0sIGV4cDogYW55LCB2YWx1ZTogYW55KTogdm9pZCA9PiB7XG4gICAgbGV0IHZhbCA9IHZtO1xuXG4gICAgaWYgKGV4cCA9IGV4cC5zcGxpdCgnLicpKSB7XG4gICAgICAgIGV4cC5mb3JFYWNoKGZ1bmN0aW9uIChrLCBpKSB7XG4gICAgICAgICAgICBpZiAoaSA8IGV4cC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsW2tdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWxba10gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==