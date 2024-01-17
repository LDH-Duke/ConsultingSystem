import CoinService from './cash.service'
import { Container } from 'typedi';

export default [
    /**
     * 토스 페이먼츠 결제 승인 요청 (POST)
     */
    {
        path: '/payments/req_toss_accept',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[payments 토스페이먼츠 결제 승인 요청 Controller]");
            console.log(`controller data 확인 : ` + JSON.stringify(req.body))
            const PaymentServiceInstance = Container.get(PaymentService);
            const resultData = await PaymentServiceInstance.ConfirmPayment(req.body);
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },

    /**
     * 코인 충전 (POST)
     */
    {
        path: '/coin/charge',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[Coin 코인결제 요청 Controller]");
            console.log(`controller data 확인 : ` + JSON.stringify(req.body))
            const CoinServiceInstance = Container.get(CoinService);
            const resultData = await CoinServiceInstance.Charge(req.body);
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },

];
