import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto';

export default class PaymentService {
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
   * 결제 승인 Confirm
   * --
   */
  async Confirm(info) {
    try {
      const resultData = {
        test: 'test',
        data: {},
        status: 200,
      }

      let {paymentKey, orderId, totalAmount, user_id} = info;

      const userData = await models.user.findOne({
        where: {
          id: user_id
        }
      });

      // userData가 없을 때 예외처리
      if (!userData) {
        throw new Error('회원 데이터가 존재하지 않습니다.');
      }


      console.log(paymentKey, orderId, totalAmount);

      // 시크릿 키 설정
      const widgetSecretKey = "test_sk_DnyRpQWGrNzP1gxveJWLrKwv1M9E";
      const encryptedSecretKey =
        "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

      // 결제 진행
      const pay = await fetch(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          method: 'POST',
          body: JSON.stringify({ orderId, amount: totalAmount, paymentKey }),
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
        },
      );


      // 결제 조회
      const result = await fetch(
        `https://api.tosspayments.com/v1/payments/${paymentKey}`,
        {
          method: 'GET',
          headers: {Authorization: 'Basic dGVzdF9za19EbnlScFFXR3JOelAxZ3h2ZUpXTHJLd3YxTTlFOg=='}
        }
      )      
      const pg_data = await result.json();

      const {type, orderName, method, status, requestedAt, approvedAt} = pg_data;
      const payment_key = pg_data.paymentKey;
      const order_id = pg_data.orderId;
      const total_amount = pg_data.totalAmount;
      
      data.data = await models.cash_history.create({
        payment_key,
        type,
        order_id,
        orderName,
        method,
        total_amount,
        status,
        requested_at: requestedAt,
        approved_at: approvedAt,
        pg_data,
        user_name: userData.name,
        user_id: userData.id,
      })
      
      return resultData;
    } catch (e) {
      logger.error(`[PaymentsService][Confirm] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 결제 내역 조회
   */
  async GetCashHistory(params) {
    try {
      const resultData = {
        status: 400,
        history: {},
        message: '',
      }

      const historys = await models.cash_history.findAll({
        where: {
          user_id: params
        }
      });

      resultData.status = 200;
      resultData.history = historys;
      resultData.message = '결제내역 조회를 성공했습니다.';

      return resultData;
    } catch (e) {
      logger.error(`[PaymentService][GetCashHistory] Error : ${e.message}`);
      throw e;
    }
  }

  /**
   * 코인 결제
   */
  async PayCoin(paymentInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const resultData = {
        status: 400,
        message: '',
        data: {},
        payStatus: 'DONE',
      };

      /**
       * 1. info에는 얼마 결제할 것인지 입력된다.
       * 2. 현재 회원의 정보를 가져온다.
       * 3. 회원이 가진 코인 정보와 결제할 코인의 정보를 비교한다.
       * 3-1. 만약 회원이 보유한 코인이 더 작을 경우 에러처리
       * 4. 회원이 가진 코인에서 결제할 만큼의 코인을 차감한다(transaction설정)
       * 5. 결제 내역을 남긴다. (transaction설정)
        * (NOTE) 5. 결제 내역 정보
        * - (category) 분류 (COUNSULTING, COIN) => DONE
        * - (amount) 금액 => info
        * - (order_date) 주문 날짜 => new Date()
        * - (payment_date) 결제 날짜 => new Date()
        * - (status) 상태 (CANCEL, DONE, REFUND)
        * - (method) 방법 (CARD, COIN) => COIN
        * - (product) 상품 이름 => COIN
        * - (user_name) 회원 이름 => user db
        * - (user_id) 회원 아이디 => info
        * - (counselor_name) => null
        * - (counselor_id) => null
       */
      
      // 1. 정보 가져오기 => category, amount, product, user_id, counselor_id, order_date
      const {category, amount, product, user_id, counselor_id, order_date} = paymentInfo;
      // const order_date = new Date();

      // 2. 회원 정보 가져오기
      const userData = await models.user.findOne({
        attribute: ['name', 'total_coin'],
        where: {
            id: user_id,
          },
        },
        {transaction}
      );

      // userData가 없을 때 예외처리
      if (!userData) {
        resultData.payStatus = 'FAILED';
        resultData.message = '회원 데이터가 존재하지 않습니다.';
        // throw new Error('회원 데이터가 존재하지 않습니다.');
      }
      
      // 3. 회원이 가진 코인 정보와 결제할 코인의 정보 비교 후
      //   만약 회원이 보유한 코인이 더 작을 경우 에러처리
      if (userData.total_coin < amount) {
        resultData.payStatus = 'FAILED';
        resultData.message = '코인이 부족합니다.';
        // throw new Error('코인이 부족합니다.');
      }

      const counselorData = await models.counselor.findOne({
        attribute: ['name'],
        where: {
          id: counselor_id,
        }
      })



      // 4. 결제 내역을 남긴다. (transaction설정)
      /*
        * (NOTE) 5. 결제 내역 정보
          * - (category) 분류 (COUNSULTING, COIN) => DONE
          * - (amount) 금액 => info
          * - (order_date) 주문 날짜 => new Date()
          * - (payment_date) 결제 날짜 => new Date()
          * - (status) 상태 (CANCEL, DONE, REFUND) => DONE
          * - (method) 방법 (CARD, COIN) => COIN
          * - (product) 상품 이름 => COIN
          * - (user_name) 회원 이름 => user db
          * - (user_id) 회원 아이디 => info
          * - (counselor_name) => null
          * - (counselor_id) => null
      */
      const history = await models.coin_history.create(
        {
          category,
          amount,
          order_date,
          payment_date: new Date(),
          status: resultData.payStatus,
          method: 'COIN',
          product,
          user_name: userData.name,
          user_id,
          counselor_name: counselorData.name,
          counselor_id,
        },
        { transaction }
      );

      // 5. 결제 내역을 남긴다. (transaction설정)
      userData.total_coin -= amount;
      await models.user.update(
        {
          total_coin: userData.total_coin
        },
        {
          where: {
            id: userData.id
          }
        },
        { transaction }
      );

      await userData.save({transaction});

      
      resultData.status = 200,
      resultData.message = '결제 내역을 저장하였습니다.',
      resultData.data = history;
      
      // await history.json(); // 의도적으로 에러 발생
      await transaction.commit();
      return resultData;
    } catch (e) {
      logger.error(`[PaymentService][PayCoin] Error: ${e.message}`);
      await transaction.rollback();
      throw e;
    }
  }

  /**
   * 코인 결제 내역 조회
   */
  async GetCoinHistory(params) {
    try {
      const resultData = {
        status: 400,
        history: {},
        message: '',
      }

      const historys = await models.coin_history.findAll({
        where: {
          user_id: id
        }
      });

      resultData.status = 200;
      resultData.history = historys;
      resultData.message = '코인 결제내역 조회를 성공했습니다.';

      return resultData;
    } catch (e) {
      logger.error(`[PaymentService][GetCoinHistory] Error: ${e.message}`);
      throw e;
    }
  }
}
