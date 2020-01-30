/**/
import { Mvvm } from './utils/Mvvm'
import './style.scss'

let template: string =
    `
    <div class="try">
        <div>{{message}}</div>
        <input type="text" v-model="message"/>
        <ul>
            <li v-for="(item, index) in list">{{item}}</li>
        </ul
    </div>
    `

const vm: Mvvm = new Mvvm({
    el: "#app",
    template,
    data: {
        message: '你好啊',
        list: ['1', '2', '3']
    }
})

vm['message'] = '我很好'
vm['list'] = ['1', '2', '6']