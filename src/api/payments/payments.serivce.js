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
      const data = {
        test: 'test',
        status: 200,
      }
      let {paymentKey, orderId, totalAmount} = info;

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
      const resultData = await result.json();

      console.log(resultData);

      // 결제 취소
      

      return data;
    } catch (e) {
      logger.error(`[PaymentsService][Confirm] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 코인 결제
   */
  async PayCoin(paymentInfo) {
    const transaction = await models.sequelize.transaction();
    const resultData = {
      status: 400,
      message: '',
      data: {},
    };

    try {
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
      
      // 1. 정보 가져오기
      const {amount, user_id} = paymentInfo;
      const order_date = new Date();

      // 2. 회원 정보 가져오기
      const userData = await models.user.findOne({
        attribute: ['name', 'coin'],
        where: {
            id: user_id,
          },
        },
        {transaction}
      );

      // userData가 없을 때 예외처리
      if (!userData) {
        throw new Error('회원 데이터가 존재하지 않습니다.');
      }
      
      // 3. 회원이 가진 코인 정보와 결제할 코인의 정보 비교 후
      //   만약 회원이 보유한 코인이 더 작을 경우 에러처리
      if (userData.coin < amount) {
        throw new Error('코인이 부족합니다.');
      }

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
      const history = await models.payment_history.create(
        {
          category: 'COIN',
          amount,
          order_date,
          payment_date: new Date(),
          status: 'DONE',
          method: 'COIN',
          product: 'COIN',
          user_name: userData.name,
          user_id: userData.id,
        },
        { transaction }
      );

      // 5. 회원이 가진 코인에서 결제할 만큼의 코인을 차감한다(transaction설정)
      userData.coin -= amount;
      await models.user.update(
        {
          coin: userData.coin
        },
        {
          where: {
            id: user_id
          },
          transaction
        },
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
      resultData.status = 402;
      resultData.message = e.message;
      // throw e;
      return resultData;
    }
  }
}
