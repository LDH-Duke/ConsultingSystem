import UserService from './user.serivce';
import { Container } from 'typedi';

export default [
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
    path: '/users/signup',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const userInfo = req.body;
      const UserServiceInstance = Container.get(UserService);
      const resultData = await UserServiceInstance.SignUp(userInfo);

      return res.status(resultData.status).json({
        resultData
      });
    },
  },

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
  {
    path: '/users/signin',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const userInfo = req.body;
      const UserServiceInstance = Container.get(UserService);
      const resultData = await UserServiceInstance.SignIn(userInfo);

      return res.status(resultData.status).json({
        resultData
      });
    },
  },

  {
    path: '/users/check',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const checkInfo = req.body;
      const UserServiceInstance = Container.get(UserService);
      const resultData = await UserServiceInstance.Check(checkInfo);

      return res.status(resultData.status).json({
        resultData
      });
    }
  },

  /**
   * 단일 조회(GET)
   */
  {
    path: '/user/:user_email',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      console.log("조회");
      const { user_email } = req.params;
      console.log(user_email);
      const UserServiceInstance = Container.get(UserService);
      const resultData = await UserServiceInstance.findOne(user_email);

      return res.status(resultData.status).json({
        resultData,
      });
    }
  },

  /**
   * 전체 조회(GET)
   */
  {
    path: '/users',
    method: 'get',
    middleware: [],
    controller: async(req, res, next) => {
      console.log('전체 조회');
      const UserServiceInstance = Container.get(UserService);
      const resultData = await UserServiceInstance.findAll();

      console.log(resultData);

      return res.status(resultData.status).json({
        resultData,
      });
    }
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
