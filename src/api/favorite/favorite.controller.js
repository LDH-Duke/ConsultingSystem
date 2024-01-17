import FavoriteService from './favorite.serivce';
import { Container } from 'typedi';

export default [
  /** 
   * 구독 추가 (POST)
  */
 {
   path: '/favorite/add',
   method: 'post',
   middleware: [],
   controller: async (req, res, next) => {
      const favoriteInfo = req.body;
      const FavoriteServiceInstance = Container.get(FavoriteService);

      try {
        const resultData = await FavoriteServiceInstance.Favorite(favoriteInfo);
        
        return res.status(200).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    },
  },
];
