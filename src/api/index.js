import User from './user';
import Counselor from './counselor'
import Coin from './coin'
import Favorite from './favorite'
//리뷰
//스케줄
//캐쉬
//문의사항
import Ask from './ask'

export const routes = [...User, ...Counselor, ...Coin, ...Favorite, ...Ask];
