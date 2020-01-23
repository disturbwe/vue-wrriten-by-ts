import { Compile } from './Compile'
import { Observer } from './Observer'

export class Mvvm {
    compile: Compile;
    options: OptionsAble;
    _data: any;

    constructor(options: OptionsAble) {
        this.options = options;
        let observer = new Observer();
        observer.createObserve(options.data, this);//创建绑定的监听
        let data;
        if (!isIE()) {
            data = this._data;
        } else {
            data = this._data = options.data
        }

        let me = this;

        Object.keys(data).forEach((key) => {//代理
            me._proxyData(key);
        });


        this.compile = new Compile(options, this);//初始化视图
    }

    _proxyData(key: string) {
        let me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get() {
                if (!isIE()) {
                    return Reflect.get(me._data, key)
                } else {
                    return me._data[key]
                }

            },
            set(newVal) {
                if (!isIE()) {
                    Reflect.set(me._data, key, newVal)
                } else {
                    me._data[key] = newVal
                }

            }
        });
    }
}

export interface OptionsAble {//配置可选项的接口
    el: string | object,
    data?: any,
    template?: string
}

export function isIE() {
    if ("ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}