import { Compile } from './Compile'
import { Observer } from './Observer'

export class Mvvm {
    compile: Compile;
    options: OptionsAble;
    _data: any;

    constructor(options: OptionsAble) {
        this.options = options;
        let data = this._data = this.options.data;
        let me = this;
        Object.keys(data).forEach((key) => {//代理
            me._proxyData(key);
        });

        let observer = new Observer();
        observer.createObserve(options.data);//创建绑定的监听
        this.compile = new Compile(options, this);//初始化视图
    }

    _proxyData(key: string) {
        let me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get() {
                return me._data[key];
            },
            set(newVal) {
                me._data[key] = newVal;
            }
        });
    }
}

export interface OptionsAble {//配置可选项的接口
    el: string | object,
    data?: any,
    template?: string
}