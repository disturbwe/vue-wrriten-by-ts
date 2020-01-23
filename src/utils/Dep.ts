import Watcher, { target } from './Watcher'

let uid: number = 0

export default class Dep {
    id: number = uid++;
    subs: Array<Watcher> = [];
    depend(): void {
        target.addDep(this)
    }
    addSub(sub: Watcher): void {//添加订阅者
        //console.log("添加订阅者成功")
        this.subs.push(sub);
    }
    removeSub(sub: any): void {//删除订阅者
        let index: number = this.subs.indexOf(sub);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    }
    notify() {//通知订阅者
        /**数据变动通知订阅者，再调用订阅者的update方法 */
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
