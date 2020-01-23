import Dep from './Dep'
import { Mvvm } from './Mvvm'
import { _getVMVal, _setVMVal } from './directives'

export let target: Watcher | null = null

export default class Watcher /*订阅者*/ {
    depIds: depIdsAble;
    callback: Function;
    $vm: Mvvm;
    $exp: any;
    value: any;
    constructor(vm: Mvvm, exp: any, callback: Function) {
        this.$vm = vm;
        this.$exp = exp;
        this.callback = callback
        this.depIds = {}
        this.value = this.get()
    }
    get(): any {
        target = this;//将自己设置为当前订阅者
        let value = _getVMVal(this.$vm, this.$exp);
        target = null;
        return value
    }
    addDep(dep: any) {//添加订阅
        // 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已 
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
    update() {//更新视图数据
        let value = this.get();
        let oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.callback.call(this.$vm, value, oldValue);
        }
    }
}

export interface depIdsAble { }