import PaymentService from './payments.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (POST) 유저 조회
   *  ----------------------------------------
   *
   * @swagger /users:
   *   post:
   *     summary: 포스트 조회
   *     tags: [POST]
   *     responses:
   *       200:
   *         description: 성공
   *       403:
   *         $ref: '#/components/res/Forbidden'
   *       500:
   *         $ref: '#/components/res/BadRequest'
   */
  {
    path: '/payments/confirm',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const paymentInfo = req.body;
      const PaymentsServiceInstance = Container.get(PaymentService);
      const resultData = await PaymentsServiceInstance.Confirm(paymentInfo);

      return res.status(200).json({
        resultData
      });
    },
  },
];
