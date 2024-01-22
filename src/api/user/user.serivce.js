import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
const { Op } = require('sequelize')
import crypto from 'crypto'

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
   * 회원가입 SignUp(POST)
   * --
   */
  async SignUp(userInfo) {
    try {
      const userData = {
        email: userInfo.email,
        name: userInfo.name,
        phone: userInfo.phone,
      }

      // 전송 받은 사용자 정보 조회
      const is_user = await models.user.findOne({
        attributes: ['email', 'phone'],
        where: {
          [Op.or]: [
            { email: userInfo.email },
            { phone: userInfo.phone }
          ]
        },
        raw: true
      });
      console.log('회원 여부 : ' + is_user);

      // 1. 이메일 또는 휴대폰 존재 시 회원가입 거부
      if (is_user !== null) {
        if (userInfo.email === is_user.email) {
          return 4091
        }
        if (userInfo.phone === is_user.phone) {
          return 4093
        }
      }

      // 2. 입력한 비밀번호 암호화
      const salt = await crypto.randomBytes(64).toString('base64');

      const hashedPw = crypto
        .createHash('sha256')
        .update(userInfo.pw + salt)
        .digest('base64');

      userData.pw = hashedPw;
      userData.salt = salt;

      console.log(userData);

      // 3. 회원가입 회원 데이터 DB에 저장
      const resUser = await models.user.create(userData);
      console.log(resUser.dataValues.email)
      return resUser.dataValues.email;
    } catch (err) {
      console.log('[User] SignUp ERROR !! : ' + err)
      logger.error(`[UserService][AuthService][SignUp] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 고객 로그인(POST)
   */
  async SignIn(userInfo) {
    try {
      //아이디 조회
      const is_User = await models.user.findOne({
        where: { email: userInfo.email },
        raw: true
      })

      //존재하지 않는 아이디
      if (is_User === null) {
        return false
      }

      console.log(userInfo)
      //존재하는 아이디
      const reqHashedPw = crypto
        .createHash('sha256')
        .update(userInfo.pw + is_User.salt)
        .digest('base64')

      console.log(reqHashedPw);

      //3. 암호화 된 비밀번호와 db 비밀번호 비교
      if (reqHashedPw !== is_User.pw) {
        return false
      }

      //리턴
      return is_User.name
    } catch (err) {
      console.log('[User] SignIn ERROR !! : ' + err)
      logger.error(`[UserService][AuthService][SignIn] Error: ${err.message}`);
      throw err;
    }
  }


  /**
   * 고객 단일 조회(GET)
   *
   */
  async FindOne(user_id) {
    try {
      // 본인 조회인지 확인 필요

      // 2. 회원 찾기
      return await models.user.findOne({
        attributes: { exclude: ['pw', 'salt'] },
        where: {
          id: user_id
        },
        raw: true
      });

    } catch (err) {
      console.log('[User] FindOne ERROR !! : ' + err)
      logger.error(`[UserService][AuthService][FindOne] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 고객 전체 조회(GET)
   */
  async FindAll() {
    try {
      return await models.user.findAll({
        attributes: { exclude: ['pw', 'salt'] }
      },
        { raw: true })
    } catch (err) {
      console.log('[User] FindAll ERROR !! : ' + err)
      logger.error(`[UserService][FindAll] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 정보 수정(PUT)
   */
  async UpdateUser(user_id, body) {
    try {
      //수정 내용 중 pw가 있는 경우
      if (body.pw) {
        // 비밀번호 암호화
        const salt = await crypto.randomBytes(64).toString('base64')

        const hashedPw = crypto
          .createHash('sha256')
          .update(body.pw + salt)
          .digest('base64')

        body.pw = hashedPw;
        body.salt = salt;
      }

      //update 반환 값은 수정 내용있으면 1 없으면 0
      const is_update = await models.user.update(body, {
        where: { id: user_id },
        // individualHooks: true,
      })

      return is_update[0]
    } catch (err) {
      console.log('[User] Update ERROR !! : ' + err)
      logger.error(`[UserService][Update User] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 고객 삭제(DELETE)
   */
  async DeleteCounselor(user_id) {
    try {
      return await models.user.destroy({ where: { id: user_id } })
    } catch (err) {
      console.log('[User] Delete ERROR !! : ' + err)
      logger.error(`[UserService][Delete User] Error: ${err.message}`);
      throw err;
    }
  }

}
