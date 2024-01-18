import FavoriteService from './favorite.serivce';
import { Container } from 'typedi';

export default [

  /**
   * 좋아요(POST) 
   * --
   */
  {
    path: '/favorite/add',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      console.log('[좋아요 Controller]');
      const favoriteInfo = req.body;
      const FavoriteServiceInstance = Container.get(FavoriteService);
      const resultData = await FavoriteServiceInstance.Favorite(favoriteInfo);

      return res.status(200).json({
        msg: '좋아요',
        status: resultData,
        data: req.body.name
      })
    },
  },

  /**
   * 좋아요 취소(DELETE)
   */
  {
    path: '/favorite/delete',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      console.log('[좋아요 취소 Controller]');
      const favoriteInfo = req.body;
      const FavoriteServiceInstance = Container.get(FavoriteService);
      const resultData = await FavoriteServiceInstance.FavoriteDelete(favoriteInfo);

      return res.status(200).json({
        msg: '좋아요',
        status: resultData,
        data: req.body.name
      })
    },
  },



];
