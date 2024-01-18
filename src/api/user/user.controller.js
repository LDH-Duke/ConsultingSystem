import UserService from './user.serivce';
import { Container } from 'typedi';

export default [
  /**
   * 회원가입(POST)
   * 
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

];
