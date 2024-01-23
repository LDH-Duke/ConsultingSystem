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

      // 1. DB에 전송받은 ID 조회
      const is_counselor = await models.counselor.findOne({
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

      // 2-2. (존재 경우) 거부 코드 리턴
      if (is_counselor !== null) {

        if (body.email === is_counselor.email) {
          return 4091
        }
        if (body.nickname === is_counselor.nickname) {
          return 4092
        }
        if (body.phone === is_counselor.phone) {
          return 4093
        }
      }

      // 2-1. (없는 경우) 저장 후 승인 코드 리턴
      // 비밀번호 암호화
      const salt = await crypto.randomBytes(64).toString('base64')

      const hashedPw = crypto
        .createHash('sha256')
        .update(body.pw + salt)
        .digest('base64')

      counselorData.pw = hashedPw;
      counselorData.salt = salt;


      const resCounselor = await models.counselor.create(counselorData)

      return { nickname: resCounselor.dataValues.nickname }

    } catch (err) {
      console.log('[counselor] SignUp ERROR !! : ' + err)
      logger.error(`[AuthService][SignUp] Error: ${err.message}`);
      throw err;
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
      const is_counselor = await models.counselor.findOne({
        where: {
          email: body.email
        },
        raw: true
      })

      //존재하지 않는 아이디
      if (is_counselor === null) {
        return false
      }

      // 2. (존재 시) salt값과 body.pw를 합쳐서 hash암호화 
      const reqHashedPw = crypto
        .createHash('sha256')
        .update(body.pw + is_counselor.salt)
        .digest('base64')

      //3. 암호화 된 비밀번호와 db 비밀번호 비교
      if (reqHashedPw !== is_counselor.pw) {
        return false
      }

      // 4. 통과
      return { id: is_counselor.id, nickname: is_counselor.nickname }

    } catch (error) {
      console.log('[counselor] SignUp ERROR !! : ' + error)
      logger.error(`[AuthService][SignIn] Error: ${error.message}`);
      throw error;
    }
  }

  /**
   * 단일 조회(GET)
   * --
   */
  async FindOne(params) {
    try {
      // 본인 조회인지 확인 필요

      // 비밀번호 제외 데이터 조회
      return await models.counselor.findOne({
        attributes: { exclude: ['pw', 'salt'] },
        where: {
          id: params
        },
        raw: true
      })
    } catch (err) {
      console.log('[counselor] FindOne ERROR !! : ' + err)
      logger.error(`[CounselorService][FindOne] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 전체 조회(GET)
   * -- r
   */
  async FindAll() {
    try {
      return await models.counselor.findAll({
        attributes: { exclude: ['pw', 'salt'] }
      },
        { raw: true })
    } catch (err) {
      console.log('[counselor] FindAll ERROR !! : ' + err)
      logger.error(`[CounselorService][FindAll] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 정보 수정(PUT)
   */
  async UpdateCounselor(counselor_id, body) {
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
      const is_update = await models.counselor.update(body, {
        where: { id: counselor_id },
        // individualHooks: true,
      })

      return is_update
    } catch (err) {
      console.log('[counselor] Update ERROR !! : ' + err)
      logger.error(`[CounselorService][Update Counselor] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   * 상담사 삭제(DELETE)
   */
  async DeleteCounselor(counselor_id) {
    try {
      return await models.counselor.destroy({ where: { id: counselor_id } })
    } catch (err) {
      console.log('[counselor] Delete ERROR !! : ' + err)
      logger.error(`[CounselorService][Delete Counselor] Error: ${err.message}`);
      throw err;
    }
  }

  /**
   *  닉네임 중복검사
   */
  async CheckNickName(nickname) {
    try {
      return await models.counselor.findOne({ where: nickname })
    } catch (err) {
      console.log('[counselor] Check Nickname ERROR !! : ' + err)
      logger.error(`[CounselorService][Check Nickname] Error: ${err.message}`);
      throw err;
    }
  }
}
