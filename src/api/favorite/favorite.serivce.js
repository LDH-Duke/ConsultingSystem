import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto';

export default class FavoriteService {
  /**
   * constructor
   * --
   */
  constructor() {}
  // @Inject('userModel') private userModel : Models.UserModel,
  // private mailer: MailerService,
  // @Inject('logger') private logger,
  // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,


  /**
   * 구독 추가 (POST)
   */
  async Favorite(favoriteInfo) {
    try {
      const {user_id, counselor_id} = favoriteInfo;
      const resultData = {
        status: 400,
        message: '',
      };

      const favoriteData = await models.favorite.findOne({
        include: [
          {
            model: models.user,
            where: {
              id: user_id
            }
          },
          {
            model: models.counselor,
            where: {
              id: counselor_id
            }
          }
        ],
        raw: true,
      });

      
      if (favoriteData) {
        const favorite_count = favoriteData.count + 1;
        // update
        await models.favorite.update({
          favorite_count
        }, {
          include: [
            {
              model: models.user,
              where: {
                id: user_id
              }
            },
            {
              model: models.counselor,
              where: {
                id: counselor_id
              }
            }
          ],
        });
      } else {
        await models.favorite.create({
          favorite_count: 0,
          user_id,
          counselor_id
        });
      }

      resultData.status = 200;
      resultData.message = '구독하였습니다.';

      return resultData;
    } catch (e) {
      logger.error(`[FavoriteService][Favorite] Error : ${e.message}`);
      throw e;
    }
  }
}
