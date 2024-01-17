import CoinService from './coin.service'
import { Container } from 'typedi';

export default [

    /**
     * 코인 상품 구매 요청 (POST)
     */
    {
        path: '/coin/buyproduct',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[Coin 상품구매 요청 Controller]");
            console.log(`controller data 확인 : ` + JSON.stringify(req.body))
            const CoinServiceInstance = Container.get(CoinService);
            const resultData = await CoinServiceInstance.BuyProduct(req.body);
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },

    /**
     * 코인 후원 (POST)
     */
    {
        path: '/coin/donation',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[Coin 후원 Controller]");
            console.log(req.body)
            const CoinServiceInstance = Container.get(CoinService);
            const resultData = await CoinServiceInstance.Donation(req.query);
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },

    /**
     * 코인 결제 내역 단일 조회(GET)
     * 관리자 검색
     */
    {
        path: '/coin/history',
        method: 'get',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[Coin 결제 내역 검색기능 Controller]");
            console.log(req.query)
            const CoinServiceInstance = Container.get(CoinService);
            const resultData = await CoinServiceInstance.FindOne(req.query);
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },

    /**
     * 코인 결제 내역 전체 조회 (GET)
     */
    {
        path: '/coin',
        method: 'get',
        middleware: [],
        controller: async (req, res, next) => {
            console.log("[Coin 결제내역 전체 조회 Controller]");
            const CoinServiceInstance = Container.get(CoinService);
            const resultData = await CoinServiceInstance.FindAll();
            return res.status(200).json({
                resultMessage: 'success',
                resultData,
            });
        },
    },




];
