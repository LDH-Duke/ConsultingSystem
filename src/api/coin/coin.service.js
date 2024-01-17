import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';

export default class AuthService {
    /**
     * constructor
     * --
     */
    constructor() { }
    // @Inject('userModel') private userModel : Models.UserModel,
    // private mailer: MailerService,
    // @Inject('logger') private logger,
    // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,


    /**
     * 코인 상품 구매(POST)
     */
    async BuyProduct(body) {
        try {
            //err msg : 결제 실패 시 잔액부족, 사유 적는 컬럼
            const data = {
                category: body.category,
                amount: body.amount,
                status: '',//enum
                method: "coin",
                product: body.product,
                user_id: body.user_id,
                user_name: '',
                counselor_id: body.counselor_id,
                counselor_name: '',
            }

            // user 금액 조회 + 구매자 이름 정보 조회
            const currentUserCoin = await models.user.findOne({
                attributes: ['total_coin', 'name'],
                where: {
                    'id': body.user_id
                },
                raw: true
            })

            //판매자 정보 조회 및 구매자 판매자 정보 입력
            const counselorCheck = await models.counselor.findOne({
                attributes: ['name'],
                where: {
                    id: body.counselor_id
                }
            })

            data.user_name = currentUserCoin.name
            data.counselor_name = counselorCheck.name

            //코인 체크
            const coinCheck = currentUserCoin.total_coin - body.amount
            console.log(coinCheck);

            if (coinCheck < 0) {
                // failed
                //상태 추가
                data.status = false
                const resultData = await models.coin_history.create(data)
                console.log(resultData)
                return data
            }

            // success
            ////사용자 코인 업데이트
            await models.user.update({
                total_coin: coinCheck
            }, {
                where: {
                    id: body.user_id
                }
            })

            //// 코인 내역 insert
            /////상태 값
            data.status = true

            const resultData = await models.coin_history.create(data)

            return resultData
        } catch (e) {
            logger.error(`[CoinService][BuyProduct] Error: ${e.message}`);
            throw e;
        }
    }

    /**
     * 코인 후원 (POST)
     */
    async Donation(body) {
        try {
            const data = {
                category: body.category,
                amount: body.amount,
                status: '',//enum
                method: "coin",
                product: body.product,
                user_id: body.user_id,
                user_name: '',
                counselor_id: body.counselor_id,
                counselor_name: '',
            }


        } catch (error) {
            logger.error(`[CoinService][Dotaion] Error: ${e.message}`);
            throw e;
        }
    }

    /**
     * 코인 결제 내역 단일 조회(GET)
     */

    async FindOne(query) {
        try {
            return await models.coin_history.findAll({
                where: {
                    user_name: query.user_name
                }
            })

        } catch (e) {
            logger.error(`[CoinService][FindOne] Error: ${e.message}`);
            throw e;
        }
    }

    /**
     * 코인 결제 내역 전체 조회(GET)
     */
    async FindAll() {
        try {
            // 1.admin 확인
            // 2.조회 결과 리턴
            return await models.coin_history.findAll({ raw: true })
        } catch (e) {
            logger.error(`[CoinService][FindAll] Error: ${e.message}`);
            throw e;
        }
    }


}
