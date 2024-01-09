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
   * 상담사 회원가입 SignUp (POST)
   * --
   */
  async SignUp(body) {
    try {

      // 1. DB에 전송받은 ID 조회
      const counselor = await models.counselor.findAll({
        attributes: ['email', 'nickname', 'phone'],
        where: {
          [Op.or]: [
            { email: body.email },
            { nickname: body.nickname },
            { phone: body.phone }
          ]
        }
      })

      if (counselor.length != 0) {

        // 2-2. (존재 경우) 거부 코드 리턴
        if (counselor[0].dataValues.email === body.email) {
          return {
            status: 4091,
            res: {
              msg: '이미 사용중인 이메일 존재',
              status: 409,
              data: counselor[0].dataValues.email
            }
          }
        }
        if (counselor[0].dataValues.nickname === body.nickname) {
          return {
            status: 4092,
            res: {
              msg: '이미 사용중인 닉네임 존재',
              status: 409,
              data: counselor[0].dataValues.nickname
            }
          }
        }
        if (counselor[0].dataValues.phone === body.phone) {
          return {
            status: 4093,
            res: {
              msg: '이미 사용중인 전화번호 존재',
              status: 409,
              data: counselor[0].dataValues.phone
            }
          }
        }
      }

      // 2-1. (없는 경우) 저장 후 승인 코드 리턴
      // 비밀번호 암호화
      // const hashedPw = await crypto.pbkdf2(body.pw, salt, 256, 64, 'sha512')
      const salt = await crypto.randomBytes(64).toString('base64')

      const hashedPw = crypto
        .createHash('sha256')
        .update(body.pw + salt)
        .digest('base64')

      body.pw = hashedPw;
      body.salt = salt;
      console.log(body)

      await models.counselor.create(body)

      return 200

    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  async SignIn(body) {
    try {

      console.log(body);

      //1. 아이디 조회
      // 2. (존재 시) salt값과 body.pw를 합쳐서 hash암호화 
      //3. 암호화 된 비밀번호와 db 비밀번호 비교


    } catch (error) {

    }
  }


}
