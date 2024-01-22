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
      try {
        console.log('[Favorite Add Controller]');
        const favoriteInfo = req.body;
        const FavoriteServiceInstance = Container.get(FavoriteService);
        const data = await FavoriteServiceInstance.Favorite(favoriteInfo);

        return res.status(200).json({
          msg: '좋아요',
          status: data,
          data: ''
        })
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Favorite Add Error',
          data: err.message,
        });
      }

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
      try {
        console.log('[Favorite Cancle Controller]');
        const favoriteInfo = req.body;
        const FavoriteServiceInstance = Container.get(FavoriteService);
        const data = await FavoriteServiceInstance.FavoriteDelete(favoriteInfo);

        return res.status(200).json({
          msg: '좋아요 해제',
          status: data,
          data: ''
        })
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Favorite Delete Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 좋아요 단일 조회(GET)
   */
  {
    path: '/favorite/:user_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[Favorite FindOne Controller]');
        const { user_id } = req.params;
        const FavoriteServiceInstance = Container.get(FavoriteService);
        const data = await FavoriteServiceInstance.FindOne(user_id);

        return data.length ?
          res.status(200).json({
            msg: '조회 성공',
            status: 200,
            data: data
          }) :
          res.status(200).json({
            msg: '조회 내역 없음',
            status: 409,
            data: data
          })
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Favorite FindOne Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 좋아요 전체 조회(GET)
   */
  {
    path: '/favorite',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[Favorite FindAll Controller]');
        const FavoriteServiceInstance = Container.get(FavoriteService);
        const data = await FavoriteServiceInstance.FindAll();

        return data.length ?
          res.status(200).json({
            msg: '조회 성공',
            status: 200,
            data: data
          }) :
          res.status(200).json({
            msg: '조회 내역 없음',
            status: 409,
            data: data
          })
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Favorite FindAll Error',
          data: err.message,
        });
      }

    },
  },





];
