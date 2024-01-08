import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
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

  /**
   * 회원가입 SignUp
   * --
   */
  async SignUp() {
    try {
      // const salt = randomBytes(32);
      // return models.Post.findAll();
      return [
        { name: 'david', age: 20 },
        { name: 'kelly', age: 22 },
      ];
    } catch (e) {
      logger.error(`[AuthService][SignUp] Error: ${e.message}`);
      throw e;
    }
  }
}
