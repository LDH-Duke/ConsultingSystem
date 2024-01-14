import UserService from './user.serivce';
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
  {
    path: '/users/signup',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const userInfo = req.body
      const UserServiceInstance = Container.get(UserService);
      const resultData = await UserServiceInstance.SignUp(userInfo);
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
