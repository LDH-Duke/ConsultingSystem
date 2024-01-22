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
  async Favorite(favoriteInfo) {
    try {

      // 회원이 존재하는 지
      const is_user = await models.user.findOne({
        where: {
          id: favoriteInfo.user_id
        },
        raw: true
      })
      // 판매자가 존재하는 지

      const is_counselor = await models.counselor.findOne({
        where: {
          id: favoriteInfo.counselor_id
        },
        raw: true
      })

      if (!is_user || !is_counselor) {
        console.log('존재하지 않는 정보')
        return 404
      }

      // 현재 구독중인지 조회
      const is_favorite = await models.favorite.findOne({
        where: {
          user_id: favoriteInfo.user_id,
          counselor_id: favoriteInfo.counselor_id
        },
        raw: true
      })

      //이미 되어있다면 해제 [수정]
      if (is_favorite !== null) {
        console.log('이미 좋아요 눌림');
        return 0
      }

      await models.favorite.create(favoriteInfo)
      console.log('===================')
      console.log('       좋아요       ')
      console.log('===================')

      return 200
    } catch (err) {
      console.log('[Favorite] Add ERROR !! : ' + err)
      logger.error(`[FavoriteService][Add Favorite] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 좋아요 취소(DELETE)
   * --
   */
  async FavoriteDelete(favoriteInfo) {
    try {

      // 회원이 존재하는 지
      const is_user = await models.user.findOne({
        where: {
          id: favoriteInfo.user_id
        },
        raw: true
      })
      // 판매자가 존재하는 지
      const is_counselor = await models.counselor.findOne({
        where: {
          id: favoriteInfo.counselor_id
        },
        raw: true
      })

      if (!is_user || !is_counselor) {
        console.log('존재하지 않는 정보')
        return 404
      }

      // 현재 구독중인지 조회
      const is_favorite = await models.favorite.findOne({
        where: {
          user_id: favoriteInfo.user_id,
          counselor_id: favoriteInfo.counselor_id
        }
      })

      if (is_favorite === null) {
        console.log('좋아요 눌러져있지않음');
        return 0
      }

      //좋아요 해제
      await models.favorite.destroy({
        where: {
          user_id: is_favorite.user_id,
          counselor_id: is_favorite.counselor_id
        }
      })

      console.log('===================')
      console.log('    좋아요 해제     ')
      console.log('===================')

      return 200
    } catch (err) {
      console.log('[Favorite] Delete ERROR !! : ' + err)
      logger.error(`[FavoriteService][Delete Favorite] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 좋아요 단일 조회(GET) // 회원 1명이 누른 것 전체 조회
   * @param {*} user_id 
   */
  async FindOne(user_id) {
    try {
      // 본인 조회인지 확인 필요

      // 1. 회원 조회
      const is_user = await models.user.findOne({
        where: {
          id: user_id
        },
        raw: true
      });
      console.log('좋아요 조회 유저 : ' + is_user)

      console.log('===================')
      console.log('   단일 조회 성공')
      console.log('===================')
      // 2.조회
      return await models.favorite.findAll({
        where: {
          user_id: user_id // 조회하고자 하는 사용자의 ID
        },
        include: [
          {
            model: models.counselor,
            attributes: ['name'] // 조회할 상담사의 속성을 선택적으로 지정
          }, {
            model: models.user,
            attributes: ['name'] // 조회할 고객의 속성을 선택적으로 지정
          }
        ],
        raw: true,
      })
    } catch (err) {
      console.log('[Favorite] FindOne ERROR !! : ' + err)
      logger.error(`[FavoriteService][FindOne] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   *  좋아요 전체 조회(GET)
   */
  async FindAll() {
    try {
      // 관리자 인증 확인 필요

      // 1. 관리자 조회
      // const is_user = await models.user.findOne({
      //   where: {
      //     id: user_id
      //   },
      //   raw: true
      // });

      console.log('===================')
      console.log('   전체 조회 성공')
      console.log('===================')
      // 2.조회
      return await models.favorite.findAll({
        include: [
          {
            model: models.counselor,
            attributes: ['name'] // 조회할 상담사의 속성을 선택적으로 지정
          }, {
            model: models.user,
            attributes: ['name'] // 조회할 고객의 속성을 선택적으로 지정
          }
        ],
        raw: true,
      })


    } catch (err) {
      console.log('[Favorite] FindAll ERROR !! : ' + err)
      logger.error(`[FavoriteService][FindAll] Error: ${err.message}`);
      throw err;
    }
  }
}
