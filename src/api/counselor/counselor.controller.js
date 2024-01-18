import CounselorService from './counselor.serivce';
import { Container } from 'typedi';

export default [

  /**
   * 상담사 회원가입(POST)
   * --
   */
  {
    path: '/counselor/signup',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[SignUp Controller Enter]');
        const counselorInfo = req.body;
        const CounselorServiceInstance = Container.get(CounselorService);
        const data = await CounselorServiceInstance.SignUp(counselorInfo);

        //res data format
        const resData = {
          status: 200,
          data: '',
          msg: 'success signup',
        }

        // failed response process
        console.log(typeof (data) === "number")
        if (typeof (data) === "number") {
          resData.status = 409
          if (data === 4091) {
            resData.data = data
            resData.msg = 'This email is already exist'

          }
          if (data === 4092) {
            resData.data = data
            resData.msg = 'This nickname is already exist'
          }
          if (data === 4093) {
            resData.data = data
            resData.msg = 'This phone is already exist'
          }
          return res.status(409).json(resData)
        }

        //success response data set
        resData.data = data
        return res.status(200).json(
          resData
        )
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'SignIn Error',
          data: err.message,
        });
      }

    },
  },

  /**
   * 상담사 로그인 (POST)
   * --
   */
  // jwt 발급
  {
    path: '/counselor/signin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[SignIn Controller Enter]');
        const counselorInfo = req.body;
        const CounselorServiceInstance = Container.get(CounselorService);
        const data = await CounselorServiceInstance.SignIn(counselorInfo);

        // return data value is false or nickname 
        return data ?
          res.status(200).json({
            msg: '로그인 완료',
            status: 200,
            data: data
          }) :
          res.status(401).json({
            msg: '로그인 실패',
            status: 401,
            data: data
          })
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'SignIn Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 단일 조회(GET)
   */
  {
    path: '/counselor/:counselor_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log("조회")
        const { counselor_id } = req.params
        console.log(counselor_id);
        const CounselorServiceInstance = Container.get(CounselorService);
        const resultData = await CounselorServiceInstance.findOne(counselor_id);

        console.log(resultData)

        return res.status(200).json({
          resultMessage: 'success',
          resultData,
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          message: 'Counselor FindOne Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 전체 조회(GET)
   * 
   */
  {
    path: '/counselor',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      console.log("전체조회")
      const CounselorServiceInstance = Container.get(CounselorService);
      const resultData = await CounselorServiceInstance.findAll();

      console.log(resultData)

      return res.status(200).json({
        resultMessage: 'success',
        resultData,
      });
    },
  },

];
