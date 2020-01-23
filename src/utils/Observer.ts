import Dep from './Dep';
import { target } from './Watcher'
/*实现Oberser类：当某个对象属性值变动的时候能通知订阅者*/
export class Observer {
    createObserve(ob: object): void {
        if (!ob || typeof ob !== 'object') {
            return;
        }
        Object.keys(ob).forEach((key) => {
            this.defineReactive(ob, key, ob[key]);
        })
    }
    defineReactive(ob: object, key: string, val: any): void {
        let dep = new Dep();
        let that = this;
        let child: void = that.createObserve(val);
        Object.defineProperty(ob, key, {
            enumerable: true,//可枚举
            configurable: false,//不能再define
            get(): any /**在订阅者首次订阅的时候将其添加至订阅者列表 */ {
                target && dep.depend()
                return val
            },
            set(newval: string) {
                if (newval === val) {
                    return;
                }
                //console.log('监听到变化了', `${val} -> ${newval}`)
                val = newval
                child = that.createObserve(val)
                dep.notify()//变化时通知
            }
        })
    }
}
