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
     * 문의사항 수정(PUT)
     * body : {ask_id, title or content}
     */
    {
        path: '/ask/:ask_id',
        method: 'put',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[Ask Update Controller]');
                const updateBody = req.body;
                const { ask_id } = req.params
                const AskServiceInstance = Container.get(AskService);
                const data = await AskServiceInstance.Update(ask_id, updateBody);

                return data ? res.status(200).json({
                    msg: '문의 수정 성공',
                    status: 200,
                    data: data
                }) :
                    res.status(200).json({
                        msg: '문의 수정 실패',
                        status: 404,
                        data: data
                    })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Ask Update Error',
                    data: err.message,
                });
            }

        },
    },

    /**
     *  문의사항 삭제
     */
    {
        path: '/ask/:ask_id',
        method: 'delete',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[Ask Delete Controller]');
                const deleteBody = req.body; // 사용자 아이디값 있다고 가정
                const { ask_id } = req.params
                const AskServiceInstance = Container.get(AskService);
                const data = await AskServiceInstance.Delete(ask_id, deleteBody);

                return data ? res.status(200).json({
                    msg: '문의 삭제 성공',
                    status: 200,
                    data: data
                }) :
                    res.status(200).json({
                        msg: '문의 삭제 실패',
                        status: 404,
                        data: data
                    })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Ask Delete Error',
                    data: err.message,
                });
            }

        },
    },

    /**
     * 문의사항 단일 조회(GET) 특정회원 작성 문의 조회
     */
    {
        path: '/ask/:user_id',
        method: 'delete',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[Ask FindOne Controller]');
                const { ask_id } = req.params
                const AskServiceInstance = Container.get(AskService);
                const data = await AskServiceInstance.Delete(ask_id, deleteBody);

                return data ? res.status(200).json({
                    msg: '문의 조회 성공',
                    status: 200,
                    data: data
                }) :
                    res.status(200).json({
                        msg: '문의 조회 실패',
                        status: 404,
                        data: data
                    })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Ask FindOne Error',
                    data: err.message,
                });
            }

        },
    },

    /**
     * 문의사항 전체 조회
     */
    {
        path: '/ask',
        method: 'get',
        middleware: [],
        controller: async (req, res, next) => {
            try {
                console.log('[Ask FindAll Controller]');
                const AskServiceInstance = Container.get(AskService);
                const data = await AskServiceInstance.FindAll();

                return data ? res.status(200).json({
                    msg: '문의 조회 성공',
                    status: 200,
                    data: data
                }) :
                    res.status(200).json({
                        msg: '문의 조회 실패',
                        status: 404,
                        data: data
                    })
            } catch (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'Ask FindAll Error',
                    data: err.message,
                });
            }

        },
    },



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
