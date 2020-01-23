/**编译类,初始化视图 */
import { OptionsAble, Mvvm } from './Mvvm'
import { directives } from './directives'

export class Compile {
    $el: any = null;
    $fragment: DocumentFragment;
    compileUtil: any = directives;
    $vm: Mvvm;
    constructor(options: OptionsAble, vm: Mvvm) {
        this.$vm = vm;
        if (typeof options.el === 'string')
            this.$el = document.querySelector(options.el)
        else
            this.$el = options.el;

        if (this.$el) {
            this.$fragment = options.template ? this.node2Frament(this.parseDom(options.template.trim())) : this.$el//支持在html里直接写
            this.init();
            this.$el.appendChild(this.$fragment)
        }
    }

    node2Frament(el: any): DocumentFragment {
        /**因为遍历解析的过程有多次操作dom节点，为提高性能和效率，
         * 会先将vue实例根节点的el转换成文档碎片fragment进行解析编译操作，解析完成，
         * 再将fragment添加回原来的真实dom节点中*/

        // 将原生节点拷贝到fragment
        let fragment: DocumentFragment = document.createDocumentFragment(), child;
        //console.log(el)
        while (child = el.firstChild) {
            /**appendChild方法实际上会把节点添加到目标Node的子节点里面（在这里是DocumentFragment）,
             * 如果你的节点在HTML页面已经渲染了其实它会移除并添加到目标Node，因此你这里才可以得以循环…… */
            fragment.appendChild(child)
        }
        return fragment
    }
    init() {
        this.compileElement(this.$fragment)
    }
    compileElement(fragment: DocumentFragment) {//递归处理
        let childNodes: any = fragment.childNodes, me: Compile = this;
        [].slice.call(childNodes).forEach(childNode => {
            let text = childNode.textContent;
            let reg: RegExp = /\{\{(.*)\}\}/;//双向大括号的正则表达式
            if (me.isElementNode(childNode)) {
                me.compileNode(childNode)
            } else if (me.isTextNode(childNode) && reg.test(text)) {
                me.compileText(childNode, RegExp.$1)
            } if (childNode.childNodes && childNode.childNodes.length) {
                me.compileElement(childNode)
            }
        })
    }
    parseDom(arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes[0];
    }
    isElementNode(node): boolean {
        return node.nodeType == 1;
    }
    isTextNode(node): boolean {
        return node.nodeType == 3;
    }
    isDirective(attrName): boolean {
        return attrName.indexOf('v-') == 0;
    }
    compileNode(node: any) {
        let nodeAttributes: any = node.attributes;
        let me: Compile = this;
        [].slice.call(nodeAttributes).forEach(attributes => {
            let attrName = attributes.name;
            if (me.isDirective(attrName)) {
                let exp = attributes.value;
                let dir = attrName.substring(2);
                this.compileUtil[dir] && this.compileUtil[dir](node, me.$vm, exp);
                node.removeAttribute(attrName);
            }
        })
    }
    compileText(node: any, exp: any) {
        this.compileUtil.text(node, this.$vm, exp);
    }
}