import HelloWorld from '../components/HelloWorld.vue'

const routes =[
    { name: 'HelloWorld', path: '/counter', component: HelloWorld, display: 'Счетчик' },
    { name: 'HelloWorld', path: '/fetch-data', component: HelloWorld, display: 'Получение данных' }
]

export default routes