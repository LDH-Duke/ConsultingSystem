import CounselorService from './counselor.serivce';
import { Container } from 'typedi';

export default [
  /** ----------------------------------------
   *  (GET) 유저 조회
   *  ----------------------------------------
   *
   * @swagger /users:
   *   get:
   *     summary: 포스트 조회
   *     tags: [GET]
   *     responses:
   *       200:
   *         description: 성공
   *       403:
   *         $ref: '#/components/res/Forbidden'
   *       500:
   *         $ref: '#/components/res/BadRequest'
   */


  /**
   * 상담사 회원가입(POST)
   * --
   */
  {
    path: '/counselor/signup',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const counselorInfo = req.body;
      const CounselorServiceInstance = Container.get(CounselorService);
      const resultData = await CounselorServiceInstance.SignUp(counselorInfo);


      // if (resultData === 4091) {
      //   return res.status(409).json({
      //     msg: '이미 사용중인 이메일 존재',
      //     status: resultData,
      //     data: req.body.email
      //   })
      // }
      // if (resultData === 4092) {
      //   return res.status(409).json({
      //     msg: '이미 사용중인 닉네임 존재',
      //     status: resultData,
      //     data: req.body.nickname
      //   })
      // }
      // if (resultData === 4093) {
      //   return res.status(409).json({
      //     msg: '이미 사용중인 휴대폰 번호 존재',
      //     status: resultData,
      //     data: req.body.phone
      //   })
      // }

      console.log(resultData)
      if ([4091, 4092, 4093].includes(resultData.status)) {
        return res.status(resultData.res.status).json(resultData.res)
      }

      return res.status(200).json({
        msg: '회원가입 완료',
        status: resultData,
        data: req.body.name
      })
    },
  },

  /**
   * 상담사 로그인 (POST)
   * --
   */
  {
    path: '/counselor/signin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const counselorInfo = req.body;
      const CounselorServiceInstance = Container.get(CounselorService);
      const resultData = await CounselorServiceInstance.SignIn(counselorInfo);


      console.log(resultData)
      // if ([4091, 4092, 4093].includes(resultData.status)) {
      //   return res.status(resultData.res.status).json(resultData.res)
      // }

      return res.status(200).json({
        msg: '로그인 완료',
        status: resultData,
        data: req.body.email
      })
    },
  },

  /**
   * 조회
   */
  {
    path: '/counselor',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      console.log("조회")
      const CounselorServiceInstance = Container.get(CounselorService);
      const resultData = await CounselorServiceInstance.SignUp();
      return res.status(200).json({
        resultMessage: 'success',
        resultData,
      });
    },
  },

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
    path: '/users',
    method: 'post',
    middleware: [],
    controller: () => 'post user',
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
