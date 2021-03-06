/**指令集 */
import { Mvvm } from './Mvvm'
import Watcher from './Watcher'

export const directives: any = {
    text: (node: any, vm: Mvvm, exp: string) => {//解析双向大括号
        directives.bind(node, vm, exp, 'text');
    },
    bind: (node: any, vm: Mvvm, exp?: any, dir?: string) => {//绑定
        let updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, _getVMVal(vm, exp));
        new Watcher(vm, exp, (value, oldValue) => {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    model: (node: any, vm: Mvvm, exp: string) => {
        let val = _getVMVal(vm, exp), me = this;
        directives.bind(node, vm, exp, 'model');
        node.addEventListener('input', (e) => {
            let newVal = e.target.value;
            if (newVal !== val) {
                _setVMVal(vm, exp, newVal);
            }
        })
    },
    for(node: any, vm: Mvvm, exp: any) {
        let parentNode: any = node.parentNode;
        let temp: Array<string> = exp.split(' in ');
        let list: Array<any> = vm[temp[1]]
        let tagName = node.tagName;
        let fragment: DocumentFragment = document.createDocumentFragment()
        for (let key in list) {
            let newNode = document.createElement(tagName);
            directives.bind(newNode, vm, `${temp[1]}.${key}`, 'text')
            fragment.appendChild(newNode)
        }
        parentNode.removeChild(node);
        parentNode.appendChild(fragment);
    }
}

const updater: any = {
    textUpdater: function (node: any, value: string | undefined) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};

export const _getVMVal: Function = (vm: Mvvm, exp: any): any => {
    var val = vm;

    if (exp = exp.split('.')) {
        exp.forEach(function (k) {
            val = val[k];
        });
    }

    return val;
}

export const _setVMVal: Function = (vm: Mvvm, exp: any, value: any): void => {
    let val = vm;

    if (exp = exp.split('.')) {
        exp.forEach(function (k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }

}