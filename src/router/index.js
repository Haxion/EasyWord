import Vue from 'vue'
import Router from 'vue-router'
import AddOneWord from '../components/AddOneWord'
import AddManyWords from '../components/AddManyWords'
import SearchByDate from '@/components/SearchByDate'
import SearchByLetters from '@/components/SearchByLetters'
import ReviewCards from '@/components/ReviewCards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dictionary/addOneWord'
    },
    // 添加一个单词
    {
      path: '/dictionary/addOneWord',
      name: 'addOneWord',
      component: AddOneWord
    },
    // 一次添加多个单词
    {
      path: '/dictionary/addManyWords',
      name: 'addManyWords',
      component: AddManyWords
    },
    // 按日期查询
    {
      path: '/dictionary/searchByDate',
      name: 'searchByDate',
      component: SearchByDate
    },
    // 按字母查询
    {
      path: '/dictionary/searchByLetters',
      name: 'searchByLetters',
      component: SearchByLetters
    },
    // 复习单词卡片
    {
      path: '/dictionary/reviewCards',
      name: 'reviewCards',
      component: ReviewCards
    }
  ]
})
