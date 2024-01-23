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
        const t = await models.sequelize.transaction()
        try {

            //err msg : 결제 실패 시 잔액부족, 사유 적는 컬럼
            const coin_history_data = {
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

            // 구매자 코인, 이름 조회
            const currentUserInfo = await models.user.findOne({
                attributes: ['total_coin', 'name'],
                where: {
                    'id': body.user_id
                },
                raw: true
            })

            //판매자 코인, 이름 조회
            const currentCounselorInfo = await models.counselor.findOne({
                attributes: ['name', 'total_coin'],
                where: {
                    id: body.counselor_id
                },
                raw: true
            })

            //판매자, 구매자 이름 데이터 추가
            coin_history_data.user_name = currentUserInfo.name
            coin_history_data.counselor_name = currentCounselorInfo.name

            //사용자 보유 코인 체크
            const userCoinCheck = currentUserInfo.total_coin - body.amount

            if (userCoinCheck <= 0) {
                // failed
                //상태 추가
                coin_history_data.status = 'FAIL'
                const resultData = await models.coin_history.create(data,
                    { transaction: t })
                console.log(resultData)
                await t.commit()
                return data
            }

            // success
            ////사용자 코인 업데이트
            await models.user.update({
                total_coin: userCoinCheck
            }, {
                where: {
                    id: body.user_id
                },
                transaction: t
            })

            ////상담사 보유 코인 업데이트
            const counselorCoinResult = currentCounselorInfo.total_coin + body.amount

            await models.counselor.update({
                total_coin: counselorCoinResult
            }, {
                where: {
                    id: body.counselor_id
                },
                transaction: t
            })

            //// coin_history INSERT
            /////상태 값
            data.status = 'SUCCESS'
            const resultData = await models.coin_history.create(coin_history_data,
                { transaction: t }
            )


            await t.commit()
            return resultData
        } catch (e) {
            await t.rollback()
            logger.error(`[CoinService][BuyProduct] Error: ${e.message}`);
            throw e;
        }
    }

    // /**
    //  * 코인 후원 (POST)
    //  */
    // async Donation(body) {
    //     try {
    //         // DB 저장 데이터
    //         const data = {
    //             category: body.category,
    //             amount: body.amount,
    //             status: '',//enum
    //             method: "coin",
    //             product: body.product,
    //             user_id: body.user_id,
    //             user_name: '',
    //             counselor_id: body.counselor_id,
    //             counselor_name: '',
    //         }

    //         // 구매자 금액,이름 조회
    //         const currentUserCoin = await models.user.findOne({
    //             attributes: ['total_coin', 'name'],
    //             where: {
    //                 'id': body.user_id
    //             },
    //             raw: true
    //         })
    //         // db저장 데이터에 구매자명 저장
    //         data.user_name = currentUserCoin.name

    //          //판매자명 조회
    //         const counselorCheck = await models.counselor.findOne({
    //             attributes: ['name'],
    //             where: {
    //                 id: body.counselor_id
    //             }
    //         })

    //         // db저장 데이터에 판매자명 저장
    //         data.counselor_name = counselorCheck.name

    //         //코인 체크
    //         const coinCheck = currentUserCoin.total_coin - body.amount
    //         console.log(coinCheck);

    //         if (coinCheck < 0) {
    //             // failed
    //             //상태 추가
    //             data.status = 'FAIL'
    //             const resultData = await models.coin_history.create(data)
    //             console.log(resultData)
    //             return data
    //         }

    //         // success
    //         ////사용자 코인 업데이트
    //         await models.user.update({
    //             total_coin: coinCheck
    //         }, {
    //             where: {
    //                 id: body.user_id
    //             }
    //         })

    //     } catch (error) {
    //         logger.error(`[CoinService][Dotaion] Error: ${e.message}`);
    //         throw e;
    //     }
    // }

    /**
     * 코인 결제 내역 단일 검색(GET)
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
