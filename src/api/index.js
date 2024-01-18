import User from './user';
import Payments from './payments';
import Favorite from './favorite';
import Review from './review';
import Schedule from './schedule';

export const routes = [...User, ...Payments, ...Favorite, ...Review, ...Schedule];
