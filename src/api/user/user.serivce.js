import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';

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
        }
      });

      // 3. 회원이 존재하지 않을 경우 로직 종료
      if (user === null) {
        resultData.msg = 'fail'
        return {...resultData};
      }

      // 4. 회원이 존재할 경우 비밀번호 확인
      if (user.pw === body.pw) {
        // 4-1. 비밀번호가 맞다면 반환 데이터 수정
        resultData.isLogin = true;
        resultData.status = 200;
        resultData.userData = user;
        resultData.msg = 'success';
      }

      // 데이터 반환
      return {...resultData};
    } catch (e) {
      logger.error(`[AuthService][SignIn] Error: ${e.message}`);
      throw e;
    }
  }


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

      if (hasUser) {
        resultData.msg = 'fail';
        return {...resultData};
      }

      // 1. 전달받은 데이터 객체로 저장
      const newUser = {
        pw: body.pw,
        name: body.name,
        phone: body.phone,
        email: body.email,
      };

      // 2. 회원가입 회원 데이터 DB에 저장
      await models.user.create(newUser);

      // 저장한 회원 데이터 반환
      resultData.status = 200;
      resultData.msg = 'success';
      resultData.userData = newUser;

      return {...resultData};
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.msg}`);
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
        return {...resultData};
      }


      // 값이 있다면 회원가입 불가능
      if (userCheck.email === email) {
        // 이메일이 같을 경우
        resultData.msg = '입력하신 이메일은 이미 사용중인 이메일입니다.';
        resultData.status = 400;
        return {...resultData};
      }

      if (userCheck.name === name) {
        // 닉네임이 같을 경우
        resultData.msg = '입력하신 닉네임은 이미 사용중인 닉네임입니다.';
        resultData.status = 400;
        return {...resultData};
      }
    } catch (e) {
      logger.error(`[AuthService][SignIn] Error: ${e.message}`);
      throw e;
    }
  }
}
