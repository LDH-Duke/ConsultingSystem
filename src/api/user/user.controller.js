import UserService from './user.serivce';
import { Container } from 'typedi';
import JWTManager from '../../utils/JWTManager'
import dotenv from 'dotenv'

export default [
  /**
   * 회원가입(POST)
   * 
   */
  {
    path: '/user/signup',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[User SignUp Controller Enter]');
        const userInfo = req.body
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.SignUp(userInfo);

        //res data format
        const resData = {
          status: 200,
          data: '',
          msg: 'success signup',
        }

        // failed response process
        if (typeof (data) === "number") {
          resData.status = 409
          if (data === 4091) {
            resData.data = data
            resData.msg = 'This email is already exist'

          }
          if (data === 4093) {
            resData.data = data
            resData.msg = 'This phone is already exist'
          }
          return res.status(409).json(resData)
        }
        //success response data set
        resData.data = data
        return res.status(200).json(resData);
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'User SignUp Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 고객 로그인 (POST)
   * --
   */
  // jwt 발급
  {
    path: '/user/signin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[User SignIn Controller Enter]');
        const userInfo = req.body;
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.SignIn(userInfo);

        // return data value is false or nickname 
        if (data === false) {
          return res.status(401).json({
            msg: '로그인 실패',
            status: 401,
            data: data
          })
        }
        const jwt = new JWTManager();
        const token = await jwt.createToken(data, `${process.env.EXPIRESIN}h`)
        console.log(token);
        return res.status(200).json({
          msg: '로그인 완료',
          status: 200,
          data: {
            data,
            token
          }
        })

      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'User SignIn Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 단일 조회(GET)
   */
  {
    path: '/user/:user_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[User FindOne Controller Enter]');
        const { user_id } = req.params;
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.FindOne(user_id);

        return data ?
          res.status(200).json({
            msg: `${data.name} 조회 완료`,
            status: 200,
            data: data
          }) :
          res.status(404).json({
            msg: `조회 실패`,
            status: 404,
            data: data
          })
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'User FindOne Error',
          data: err.message,
        });
      }
    }
  },

  /**
   * 고객 전체 조회(GET)
   */
  {
    path: '/user',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[User FindAll Controller Enter]');
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.FindAll();

        return res.status(200).json({
          status: 200,
          msg: '전체 조회 완료',
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'User Findall Error',
          data: err.message,
        });
      }
    }
  },

  /**
  * 정보 수정(PUT)
  * 
  */
  {
    path: '/user/:user_id',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log("[User Update Controller Enter]")
        const { user_id } = req.params
        const updateBody = req.body
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.UpdateUser(user_id, updateBody);

        return data ?
          res.status(200).json({
            status: 200,
            msg: '정보 수정 완료',
            data: data
          }) :
          res.status(409).json({
            status: 409,
            msg: '수정 불가',
            data: data
          })

      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Counselor Update Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 고객 삭제(DELETE)
   */
  {
    path: '/user/:user_id',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log("[User Delete Controller Enter]")
        const { user_id } = req.params
        const UserServiceInstance = Container.get(UserService);
        const data = await UserServiceInstance.DeleteCounselor(user_id);

        console.log(data);
        return data ?
          res.status(200).json({
            status: 200,
            msg: 'Delete Success',
            data: data
          }) :
          res.status(404).json({
            status: 404,
            msg: 'Not Exist',
            data: data
          })

      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Counselor Delete Error',
          data: err.message,
        });
      }
    },
  },


];
