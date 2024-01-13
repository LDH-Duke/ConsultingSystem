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
      const resultData = await PaymentServiceInstance.Confirm(paymentInfo);
      
      return res.status(200).json({
        resultData
      });
    },
  },
  
  // TODO: 코인이 있다고 가정하고 결제 내역 남기기
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
      const resultData = await PaymentServiceInstance.PayCoin(coinPaymentInfo);

      return res.status(resultData.status).json({
        resultData
      });
    }
  },
];
