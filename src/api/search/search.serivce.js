import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto';

export default class SearchService {
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
   * 검색 (POST)
   */
  async Search(searchInfo) {
    try {
      /* 현재는 상담사 검색 기능만 구현 */
      /**
       * 1. serachInfo에서 검색어를 가져온다. => 검색어는 trim을 이용하여 공백 제거
       * 2. DB에서 검색어에 해당하는 상담사 정보를 가져온다.
       * 3. 해당 데이터를 전달한다.
       */
      let { searchWord } = searchInfo;
      searchWord = searchWord.trim();

      return await models.counselor.findAll({
        where: {
          nickname: {
            [Op.like]: '%' + searchWord + '%'
          }
        },
        raw: true
      });
    } catch (e) {
      logger.error(`[SearchService][Search] Error : ${e.message}`);
      throw e;
    }
  }
}