import HelloWorld from '../components/HelloWorld.vue'
import PlayList from '../components/PlayList.vue'

const routes =[
    { name: 'HelloWorld', path: '/counter', component: HelloWorld, display: 'Счетчик' },
    { name: 'HelloWorld', path: '/fetch-data', component: PlayList, display: 'Получение данных' }
]

export default routes