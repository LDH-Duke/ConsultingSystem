import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import { group, log } from 'console';
const { Op } = require('sequelize')
const crypto = require('crypto')

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
     * 문의사항 등록(POST)
     * --
     */
    async AddAsk(askInfo) {
        try {
            const askData = {
                category: '',
                writer: askInfo.writer,
                title: askInfo.title,
                content: askInfo.content,
                user_id: askInfo.user_id,
                counselor_id: askInfo.counselor_id
            }
            //둘다 값이없으면 오류
            if (askInfo.user_id === null && askInfo.counselor_id === null) {
                console.log('문의자 없음 에러')
                return 0
            }
            //req.body에 user or counselor id 값이 없다면 관리자에게 문의
            if (askInfo.user_id === null) {
                console.log('상담사가 관리자에게 문의');
                // 판매자가 존재하는 지
                const is_counselor = await this.findCounselor(askInfo.counselor_id);
                if (is_counselor === null) {
                    console.log('존재하지 않는 상담사');
                    return 0
                }
                askData.category = 'CounselorAdmin'
                return await models.ask.create(askData)

            }
            if (askInfo.counselor_id === null) {
                console.log('고객이 관리자에게 문의');
                const is_user = await this.findUser(askInfo.user_id);
                if (is_user === null) {
                    console.log('존재하지 않는 고객');
                    return 0
                }
                askData.category = 'UserAdmin'
                return await models.ask.create(askData)
            }


            //고객이 상담사에게 문의

            // 회원이 존재하는 지
            const is_user = await this.findUser(askInfo.user_id);

            // 판매자가 존재하는 지
            const is_counselor = await this.findCounselor(askInfo.counselor_id);

            if (is_user === null || is_counselor === null) {
                console.log('존재하지 않는 고객 또는 상담사');
                return 0
            }

            console.log('===================')
            console.log('     문의 등록')
            console.log('===================')
            askData.category = 'UserCounselor'
            console.log(askData.category)
            return await models.ask.create(askData)

        } catch (err) {
            console.log('[Ask] AddAsk ERROR !! : ' + err)
            logger.error(`[AskService][Add Ask] Error: ${err.message}`);
            throw err;
        }
    }

    /**
     * 문의사항 답변 등록(POST)
     */
    async AddAnswer(answerInfo) {
        try {
            const answerData = {
                writer: answerInfo.writer,
                content: answerInfo.content,
                user_id: answerInfo.user_id,
                counselor_id: answerInfo.counselor_id,
            }

            //질문 조회
            const is_ask = await models.ask.findOne({
                where: { id: answerInfo.ask_id },
                raw: true
            })
            if (is_ask === null) {
                console.log('삭제되었거나 존재하지 않는 게시물 입니다.')
                return 0
            }

            //여기선 사용자 확인 안함 이거 질문사항임 => token 인증

            // 답변 생성(누가)
            answerData.category = is_ask.category
            answerData.group_id = answerInfo.ask_id
            return await models.ask.create(answerData)

        } catch (err) {
            console.log('[Ask] AddAnswer ERROR !! : ' + err)
            logger.error(`[AskService][Add Answer] Error: ${err.message}`);
            throw err;
        }
    }


    /**
     * 문의사항 수정(PUT)
     */
    async Update(ask_id, updateBody) {
        try {
            //질문 조회
            const is_ask = await models.ask.findOne({
                where: { id: ask_id },
                raw: true
            })
            // 작성자 조회 추가해서 권한 있는지 없는지 확인 필요함
            if (is_ask === null) {
                console.log('존재하지 않는 문의');
                return 0
            }

            const result = await models.ask.update(
                updateBody,
                {
                    where: {
                        id: ask_id
                    }
                })

            // result에 업데이트 내용있으면 1, 없으면 0 일딴 업데이트 한것으로 처리
            return result

        } catch (err) {
            console.log('[Ask] Update ERROR !! : ' + err)
            logger.error(`[AskService][Update] Error: ${err.message}`);
            throw err;
        }
    }


    /**
     * 문의 삭제(DELETE)
     */
    async Delete(ask_id, deleteBody) {
        try {
            //문의 조회
            const is_ask = await models.ask.findOne({
                where: { id: ask_id },
                raw: true
            })
            if (is_ask === null) {
                console.log('존재하지 않는 게시물')
                return 0
            }
            //권한 확인(상담사인지, 사용자인지 확인)
            if (deleteBody.writer !== is_ask.writer) {
                console.log('삭제 권한 없음');
                return 0
            }

            //존재 시 삭제
            return await models.ask.destroy({
                where: { id: ask_id }
            })
        } catch (err) {
            console.log('[Ask] Delete ERROR !! : ' + err)
            logger.error(`[AskService][Delete] Error: ${err.message}`);
            throw err;
        }
    }

    /**
     * 문의 전체 조회 (GET)
     */
    async FindAll() {
        try {
            return await models.ask.findAll({ raw: true })

        } catch (err) {
            console.log('[Ask] FindAll ERROR !! : ' + err)
            logger.error(`[AskService][FindAll] Error: ${err.message}`);
            throw err;
        }
    }




    //고객 조회
    async findUser(id) {
        try {
            return await models.user.findOne({ where: id, raw: true })


        } catch (err) {
            console.log('[Utill] findUser ERROR !! : ' + err)
            logger.error(`[Utill][findUser] Error: ${err.message}`);
            throw err;
        }
    }

    //상담사 조회
    async findCounselor(id) {
        try {
            return await models.counselor.findOne({ where: id, raw: true })

        } catch (err) {
            console.log('[Utill] findCounselor ERROR !! : ' + err)
            logger.error(`[Utill][findCounselor] Error: ${err.message}`);
            throw err;
        }
    }

}
