import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto';

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
  async SignUp(body) {
    try {
      const resultData = {
        status: 400,
        msg: '',
        userData: null,
      };

      const hasUser = await models.user.findOne({
        where: {
          email: body.email,
        }
      });

      // 1. 이미 해당 이메일이 존재할 경우 회원가입 거부
      if (hasUser) {
        resultData.msg = 'fail';
        return resultData;
      }

      // 2. 입력한 비밀번호 암호화
      const salt = crypto.randomBytes(64).toString('base64');

      const hashedPw = crypto
        .createHash('sha256')
        .update(body.pw + salt)
        .digest('base64');

      body.pw = hashedPw;
      body.salt = salt;

      console.log(body);

      // 3. 회원가입 회원 데이터 DB에 저장
      const user = await models.user.create(body);

      // 4. 저장한 회원 데이터 반환
      resultData.status = 200;
      resultData.msg = 'success';
      resultData.userData = user;

      return resultData;
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.msg}`);
      throw e;
    }
  }

  async SignIn(body) {
    try {
      // 1. 반환 데이터 변수
      const resultData = {
        isLogin: false,
        status: 400,
        userData: null,
        msg: '',
      };

      // 2. 이메일에 해당하는 회원 데이터 가져오기
      const user = await models.user.findOne({
        where: {
          email: body.email,
        },
        raw: true,
      });
      console.log(user);
      // 3. 회원이 존재하지 않을 경우 로직 종료
      if (user === null) {
        resultData.msg = 'fail'
        return resultData;
      }

      // 4. 회원이 존재할 경우 비밀번호 확인
      // 4-1. 회원에 저장된 salt가져와 비밀번호 암호화 진행
      const salt = user.salt;

      const hashedPw = crypto
          .createHash('sha256')
          .update(body.pw + salt)
          .digest('base64');

      // 4-2. 암호화 진행한 비밀번호가 일치한지 확인
      if (user.pw === hashedPw) {
        // 4-3. 비밀번호가 일치하면 반환 데이터 수정
        resultData.isLogin = true;
        resultData.status = 200;
        resultData.userData = user;
        resultData.msg = 'success';
      }

      // 데이터 반환
      return resultData;
    } catch (e) {
      logger.error(`[AuthService][SignIn] Error: ${e.message}`);
      throw e;
    }
  }

  async Check(body) {
    try {
      // 반환 데이터 및 비교 데이터 변수
      const resultData = {
        msg: '',
        status: 400,
      };
      const email = body.email;
      const name = body.name;


      // DB에 저장되어 있는지 확인
      const userCheck = await models.user.findOne({
        where: {
          [Op.or]: [
            { email },
            { name }
          ]
        }
      });

      // 값이 없다면 회원가입 가능
      if (userCheck === null) {
        resultData.msg = '회원가입 가능';
        resultData.status = 200;
        return resultData;
      }


      // 값이 있다면 회원가입 불가능
      if (userCheck.email === email) {
        // 이메일이 같을 경우
        resultData.msg = '입력하신 이메일은 이미 사용중인 이메일입니다.';
        resultData.status = 400;
        return resultData;
      }

      if (userCheck.name === name) {
        // 닉네임이 같을 경우
        resultData.msg = '입력하신 닉네임은 이미 사용중인 닉네임입니다.';
        resultData.status = 400;
        return resultData;
      }
    } catch (e) {
      logger.error(`[AuthService][SignIn] Error: ${e.message}`);
      throw e;
    }
  }

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
  
  async findAll() {
    try {
      // 1. 반환 데이터 변수
      const resultData = {
        status: 400,
        userData: null,
        msg: '',
      };

      // 2. 회원 정보 가져오기
      const users = await models.user.findAll({raw: true});

      // 3. 회원 정보가 있다면 결과값 수정
      if (users) {
        resultData.status = 200;
        resultData.userData = users;
        resultData.msg = '회원 정보가 존재합니다.';
      }

      return resultData;
    } catch (e) {
      logger.error(`[UserService][FindAll] Eoor: ${e.message}`);
      throw e;
    }
  }
}
