import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto'

export default class AuthService {
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
   * 회원가입 SignUp
   * --
   */
  async SignUp(userInfo) {
    try {
      const resultData = {
        status: 400,
        msg: '',
        userData: null,
      };

      const hasUser = await models.user.findOne({
        where: {
          email: userInfo.email,
        }
      });

      // 1. 이미 해당 이메일이 존재할 경우 회원가입 거부
      if (hasUser) {
        resultData.msg = 'fail';
        return {...resultData};
      }

      // 2. 입력한 비밀번호 암호화
      const salt = await crypto.randomBytes(64).toString('base64');

      const hashedPw = crypto
        .createHash('sha256')
        .update(userInfo.pw + salt)
        .digest('base64');

      userInfo.pw = hashedPw;
      userInfo.salt = salt;

      console.log(userInfo);

      // 3. 회원가입 회원 데이터 DB에 저장
      const user = await models.user.create(userInfo);

      // 4. 저장한 회원 데이터 반환
      resultData.status = 200;
      resultData.msg = 'success';
      resultData.userData = user;

      return {...resultData};
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }


  /**
   * 
   *
   */
  async findOne(params) {
    try {
      // 1. 반환 데이터 변수
      const resultData = {
        status: 400,
        userData: null,
        msg: '',
      };

      // 2. 회원 찾기
      const user = await models.user.findOne({
        attribute: {exclude: ['pw', 'salt', 'update_at']},
        where: {
          email: params
        }
      });

      // 3. 해당 회원이 존재한다면 반환데이터 수정
      if (user) {
        resultData.status = 200;
        resultData.userData = user;
        resultData.msg = '회원을 찾았습니다.';
      }

      // 4. 결과값 반환
      return resultData;
    } catch (e) {
      logger.error(`[UserService][FindOne] Eoor: ${e.message}`);
      throw e;
    }
  }


}
