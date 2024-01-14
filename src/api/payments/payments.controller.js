import PaymentService from './payments.service'
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
     * 코인 결제 (POST)
     */
    {
        path: '/payments/pay_coin',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[payments 코인결제 요청 Controller]");
            console.log(`controller data 확인 : ` + JSON.stringify(req.body))
            const PaymentServiceInstance = Container.get(PaymentService);
            const resultData = await PaymentServiceInstance.PayCoin(req.body);
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },

    

    {
        path: '/ws',
        method: 'get',
        middleware: [],
        controller: async (req, res, next) => res.render('index', { title: 'aaa' }),
    },
    {
        path: '/ws/namespace',
        method: 'get',
        middleware: [],
        controller: async (_, res, ___) => res.render('socket_namespace'),
    },
    {
        path: '/ws/room',
        method: 'get',
        middleware: [],
        controller: async (_, res, ___) => res.render('socket_room'),
    },
];
