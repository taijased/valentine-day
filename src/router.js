import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Landing = () => import('./views/Landing.vue')
const CreateValentine = () => import('./views/CreateValentine.vue')
const Valentine = () => import('./views/Valentine.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Landing,
        },
        {
          path: '/create-valentine',
          component: CreateValentine,
        }
      ]
    },
    {
      path: '/valentine/:id',
      name: 'valentine',
      component: Valentine
    },
    { 
      path: "*", 
      component: () => import('./views/Error404.vue') 
    }
  ]
})
