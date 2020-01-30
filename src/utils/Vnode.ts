export class Vnode {
    tagName: string;
    props: any;
    key: string;
    childrens: Array<Vnode | string>;
    count: number;
    constructor(tagName: string, props: any, childrens?: Array<Vnode | string>) {
        this.tagName = tagName;
        this.props = props;
        this.key = props ? props.key : undefined;
        childrens && (this.childrens = childrens);
        let count = 0
        this.childrens.forEach(child => {
            if (child instanceof Vnode) {
                count += child.count
            } else {
                child = '' + child
            }
            count++
        })
        // 给每一个节点设置一个count
        this.count = count
    }
    render(): HTMLElement {
        let rNode: HTMLElement = document.createElement(this.tagName);
        for (let key in this.props) {
            let value = this.props[key];
            rNode.setAttribute(key, value);
        }
        if (!this.childrens) return rNode;
        this.childrens.forEach(children => {
            let rChildNode = children.hasOwnProperty('tagName')
                ? new Vnode((<Vnode>children).tagName, (<Vnode>children).props, (<Vnode>children).childrens).render()
                : document.createTextNode(<string>children)
            rNode.appendChild(rChildNode);
        })
        return rNode
    }

}

let REPLACE = 0, //替换
    REORDER = 1, //父节点中子节点的操作
    PROPS = 2,//props属性改变
    TEXT = 3//文本改变

export function dfsWalk(node: Vnode, walker: walkerAble, patches: Array<patchesAble>) {
    let index: number = 0;
    let petches = {};//记录差异

}

export function patch(node: Vnode, patches: Array<patchesAble>): void {
    let walker: walkerAble = { index: 0 }
    dfsWalk(node, walker, patches)

}

interface walkerAble {
    index: number
}

interface patchesAble {
    type: number,
    node: Vnode
}

