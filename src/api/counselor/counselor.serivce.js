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

      const counselorData = {
        name: body.name,
        nickname: body.nickname,
        pw: body.pw,
        salt,
        email: body.email,
        phone: body.phone,
      }

      console.log(typeof (counselorData.name))

      // 1. DB에 전송받은 ID 조회
      const counselor = await models.counselor.findOne({
        attributes: ['email', 'nickname', 'phone'],
        where: {
          [Op.or]: [
            { email: body.email },
            { nickname: body.nickname },
            { phone: body.phone }
          ]
        },
        raw: true
      })

      console.log(counselor)

      // 2-2. (존재 경우) 거부 코드 리턴
      if (counselor !== null) {

        if (counselor.email !== null) {
          return 4091
        }
        if (counselor.nickname !== null) {
          return 4092
        }
        if (counselor.phone !== body.phone) {
          return 4093
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

      counselorData.pw = hashedPw;
      counselorData.salt = salt;


      const resCounselor = await models.counselor.create(counselorData)

      console.log('서비스' + typeof (resCounselor.dataValues.nickname))
      return resCounselor.dataValues.nickname


    } catch (e) {
      console.log('[counselor] SignUp ERROR !! : ' + e)
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 상담사 로그인(POST)
   * @param {*} body 
   * @returns 
   */

  async SignIn(body) {
    try {
      //1. 아이디 조회
      const is_Counselor = await models.counselor.findOne({
        where: {
          email: body.email
        },
        raw: true
      })

      console.log(is_Counselor === null);

      //존재하지 않는 아이디
      if (is_Counselor === null) {
        return false
      }

      // 2. (존재 시) salt값과 body.pw를 합쳐서 hash암호화 
      const reqHashedPw = crypto
        .createHash('sha256')
        .update(body.pw + is_Counselor.salt)
        .digest('base64')

      //3. 암호화 된 비밀번호와 db 비밀번호 비교
      if (reqHashedPw !== is_Counselor.pw) {
        return false
      }

      // 4. 통과
      return is_Counselor.nickname

    } catch (error) {
      console.log('[counselor] SignUp ERROR !! : ' + e)
      logger.error(`[AuthService][SignIn] Error: ${error.message}`);
      throw e;
    }
  }

  /**
   * 단일 조회(GET)
   * --
   */
  async findOne(params) {
    try {
      const counselor = await models.counselor.findOne({
        attributes: { exclude: ['pw', 'salt', 'updatedAt'] },
        where: {
          counselor_id: params
        }
      })

      console.log(counselor.dataValues);

      return counselor.dataValues


    } catch (error) {
      logger.error(`[CounselorService][FindOne] Error: ${error.message}`);
    }
  }

  /**
   * 전체 조회(GET)
   * --
   */
  async findAll() {
    try {
      return await models.counselor.findAll({ raw: true })

    } catch (error) {
      logger.error(`[CounselorService][FindAll] Error: ${error.message}`);
    }
  }


}
