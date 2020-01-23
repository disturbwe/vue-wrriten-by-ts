/**/
import { Mvvm } from './utils/Mvvm'

let template: string =
    `
    <div class="try">
        <div>{{message}}</div>
        <input type="text" v-model="message"/>
    </div>
    `

const vm = new Mvvm({
    el: "#app",
    template,
    data: {
        message: '你好啊'
    }
})

vm['message'] = '我很好'