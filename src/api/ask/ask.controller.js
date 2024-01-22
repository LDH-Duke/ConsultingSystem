import AskService from './ask.service';
import { Container } from 'typedi';

export default [

    /**
     * 문의사항 등록(POST)
     * --
     */
    {
        path: '/ask/add',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[Ask Add Controller]');
                const askInfo = req.body;
                const AskServiceInstance = Container.get(AskService);
                const data = await AskServiceInstance.AddAsk(askInfo);

                return data ? res.status(200).json({
                    msg: '문의사항 등록 성공',
                    status: 200,
                    data: data
                }) :
                    res.status(200).json({
                        msg: '문의사항 등록 실패',
                        status: 409,
                        data: data
                    })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Ask Add Error',
                    data: err.message,
                });
            }

        },
    },

    /**
     * 문의사항 답변 등록(POST)
     */
    {
        path: '/ask/answer',
        method: 'post',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[Ask Add Answer Controller]');
                const answerInfo = req.body;
                const AskServiceInstance = Container.get(AskService);
                const data = await AskServiceInstance.AddAnswer(answerInfo);

                return data ? res.status(200).json({
                    msg: '문의 답변 등록 성공',
                    status: 200,
                    data: data
                }) :
                    res.status(200).json({
                        msg: '문의 답변 등록 실패',
                        status: 409,
                        data: data
                    })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Ask Add Answer Error',
                    data: err.message,
                });
            }

        },
    },
    /**
     * 문의사항 수정
     */

    /**
     *  문의사항 삭제
     */

    /**
     * 문의사항 단일 조회
     */

    /**
     * 문의사항 전체 조회
     */
    // {
    //     path: '/ask',
    //     method: 'post',
    //     middleware: [],
    //     controller: async (req, res, next) => {
    //         try {
    //             console.log('[Ask FindALL Controller]');
    //             const answerInfo = req.body;
    //             const AskServiceInstance = Container.get(AskService);
    //             const data = await AskServiceInstance.AddAnswer(answerInfo);

    //             return data ? res.status(200).json({
    //                 msg: '문의 답변 등록 성공',
    //                 status: 200,
    //                 data: data
    //             }) :
    //                 res.status(200).json({
    //                     msg: '문의 답변 등록 실패',
    //                     status: 409,
    //                     data: data
    //                 })
    //         } catch (err) {
    //             return res.status(500).json({
    //                 status: 500,
    //                 message: 'Ask Add Answer Error',
    //                 data: err.message,
    //             });
    //         }

    //     },
    // },


];
