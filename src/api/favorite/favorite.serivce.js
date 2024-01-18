import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
const { Op } = require('sequelize')
const crypto = require('crypto')

export default class AuthService {
  /**
   * constructor
   * --
   */
  constructor() { }
  // @Inject('userModel') private userModel : Models.UserModel,
  // private mailer: MailerService,
  // @Inject('logger') private logger,
  // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,

  /**
   * 좋아요(POST)
   * --
   */
  async Favorite(body) {
    try {
      const data = {

      }

      // 회원이 존재하는 지
      const userCheck = await models.user.findOne({
        where: {
          id: body.user_id
        }
      })
      // 판매자가 존재하는 지

      const counselorCheck = await models.counselor.findOne({
        where: {
          id: body.counselor_id
        }
      })

      if (!userCheck || !counselorCheck) {
        console.log('존재하지 않는 정보')
        return 404
      }

      // 현재 구독중인지 조회
      const isFavorite = await models.favorite.findOne({
        where: {
          user_id: body.user_id,
          counselor_id: body.counselor_id
        }
      })
      console.log(isFavorite);
      if (isFavorite !== null) {
        console.log('이미 구독중');
        return 0
      }

      const result = await models.favorite.create(body)
      console.log(result);

      return 200
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 좋아요 취소(DELETE)
   * --
   */
  async FavoriteDelete(body) {
    try {
      const data = {

      }

      // 회원이 존재하는 지
      const userCheck = await models.user.findOne({
        where: {
          id: body.user_id
        }
      })
      // 판매자가 존재하는 지

      const counselorCheck = await models.counselor.findOne({
        where: {
          id: body.counselor_id
        }
      })

      if (!userCheck || !counselorCheck) {
        console.log('존재하지 않는 정보')
        return 404
      }

      // 현재 구독중인지 조회
      const isFavorite = await models.favorite.findOne({
        where: {
          user_id: body.user_id,
          counselor_id: body.counselor_id
        }
      })
      console.log(isFavorite);
      if (isFavorite === null) {
        console.log('좋아요 X');
        return 0
      }

      const result = await models.favorite.destroy({
        where: {
          user_id: body.user_id,
          counselor_id: body.counselor_id
        }
      })
      console.log(result);

      return 200
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }


}
