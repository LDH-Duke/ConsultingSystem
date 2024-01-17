import PaymentService from './payments.serivce';
import { Container } from 'typedi';

export default [
  /** 
   * 결제 승인 (POST)
  */
 {
   path: '/payments/confirm',
   method: 'post',
   middleware: [],
   controller: async (req, res, next) => {
      const paymentInfo = req.body;
      const PaymentServiceInstance = Container.get(PaymentService);

      try {
        const resultData = await PaymentServiceInstance.Confirm(paymentInfo);
        
        return res.status(200).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    },
  },

  /** 
   * 결제 내역 조회 (GET)
  */
 {
   path: '/payments/cash_history/:user_id',
   method: 'get',
   middleware: [],
   controller: async (req, res, next) => {
      const {user_id} = req.params;
      const PaymentServiceInstance = Container.get(PaymentService);

      try {
        const resultData = await PaymentServiceInstance.GetCashHistory(user_id);
        
        return res.status(resultData.status).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    },
  },
  
  /**
   * 코인 결제 (POST)
   */
  {
    path: '/payments/coin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const coinPaymentInfo = req.body;
      const PaymentServiceInstance = Container.get(PaymentService);

      try {
        const resultData = await PaymentServiceInstance.PayCoin(coinPaymentInfo);

        return res.status(resultData.status).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    }
  },

  /**
   * 코인 결제 내역 조회 (GET) => 유저 검색
   */
  {
    path: '/payments/coin_history/:user_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const {user_id} = req.params;
      const PaymentServiceInstance = Container.get(PaymentService);

      try {
        const resultData = await PaymentServiceInstance.GetCoinHistory(user_id);

        return res.status(resultData.status).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    }
  },
];
