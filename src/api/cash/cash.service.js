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
     * 토스페이먼츠 결제 승인 요청 API(POST)
     * --
     */
    async ConfirmPayment(paymentInfo) {
        try {
            console.log('[payments 승인 요청 Service]');
            const secretKey = 'test_sk_d46qopOB89PyXpplnGwLrZmM75y0';

            const { paymentKey, orderId, totalAmount } = paymentInfo;
            console.log(paymentKey + '  $$$$$$$$  ' + orderId + '  $$$$$$$$  ' + totalAmount)

            // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
            // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
            // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
            const encryptedSecretKey =
                'Basic ' + Buffer.from(secretKey + ':').toString('base64');

            console.log(encryptedSecretKey);
            // ------ 결제 승인 API 호출 ------
            // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기

            const response = await fetch(
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
            const data = await response.json();
            console.log(data);

            // return data;
        } catch (e) {
            logger.error(`[PaymentService][Confrim] Error: ${e.message}`);
            throw e;
        }
    }

    /**
     * 토스페이먼츠 결제 조회 요청(GET)
     */

    /**
     * 토스페이먼츠 결제 취소 요청(POST)
     */

    /**
     * 코인 결제 요청(POST) // 이건 현금
     * 
     */
    async Charge(payData) {
        try {

            // 15 todo : 존재하는 지 체크, 

            // 1. 사용자 잔여 코인 조회
            const userCoin = await models.user.findOne({
                attributes: ['coin'],
                where: {
                    user_id: payData.user_id
                },
                raw: true
            })
            // 2. 결제금액 + 잔여 코인 user DB수정 (success or failed) 
            const amount = userCoin.coin + payData.amount


            const updateResult = await models.user.update({
                coin: amount,

            }, {
                where: {
                    user_id: payData.user_id
                }
            })
            console.log(updateResult);
            // 3. payments db 저장
            const resultData = await models.coin_history.create(payData, { raw: true })
            console.log(resultData);
            // 4. return
            return resultData
        } catch (error) {

        }
    }

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
            logger.error(`[CoinService][FindAll] Error: ${e.message}`);
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
