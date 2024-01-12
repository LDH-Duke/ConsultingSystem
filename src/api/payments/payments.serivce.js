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
   * 회원가입 SignUp
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

      return data;
    } catch (e) {
      logger.error(`[PaymentsService][Confirm] Error: ${e.message}`);
      throw e;
    }
  }
}
