import User from './user';
import Counselor from './counselor'
import Coin from './coin'
import Favorite from './favorite'
//리뷰
import Reivew from './review'
//스케줄
//캐쉬
//검색
import Search from './search'
//문의사항
import Ask from './ask'

export const routes = [...User, ...Counselor, ...Coin, ...Favorite, ...Ask, ...Reivew, ...Search];
