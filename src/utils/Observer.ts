import Dep from './Dep';
import { Mvvm } from './Mvvm';
import { target } from './Watcher'
/*实现Oberser类：当某个对象属性值变动的时候能通知订阅者*/
export class Observer {
    $vm: Mvvm;
    createObserve(ob: object, vm: Mvvm): void {
        if (!ob || typeof ob !== 'object') {
            return;
        }
        this.$vm = vm;
        this.$vm._data = this.defineReactive(ob)
        // Object.keys(ob).forEach((key) => {
        //     this.defineReactive(ob, key, ob[key]);
        // })
    }
    defineReactive(ob: object, key?: string, val?: any) {
        let dep = new Dep();
        let that = this;
        // let child: void = that.createObserve(val);
        return new Proxy(ob, {
            get: function (targetob, key, receiver) {
                target && dep.depend()
                return Reflect.get(targetob, key, receiver);
            },
            set: function (targetob, key, newVal, receiver) {
                //console.log(targetob, key, newVal, receiver);
                if (newVal === val) {
                    return;
                }
                //console.log('监听到变化了', `${val} -> ${newval}`)
                val = newVal
                // child = that.createObserve(val)
                Reflect.set(targetob, key, newVal, receiver)
                dep.notify()//变化时通知
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
    }
}
