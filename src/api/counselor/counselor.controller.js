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
        console.log('[Counselor SignUp Controller Enter]');
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
        return res.status(200).json(resData)
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
        console.log('[Counselor SignIn Controller Enter]');
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
        console.log("[Counselor FindOne Controller Enter]")
        const { counselor_id } = req.params
        const CounselorServiceInstance = Container.get(CounselorService);
        const data = await CounselorServiceInstance.FindOne(counselor_id);

        return data ?
          res.status(200).json({
            msg: `${data.nickname} 조회완료`,
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
      try {
        console.log("[Counselor FindAll Controller Enter]")
        const CounselorServiceInstance = Container.get(CounselorService);
        const data = await CounselorServiceInstance.FindAll();

        return res.status(200).json({
          status: 200,
          msg: '전체 조회 완료',
          data: data
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'Counselor FindAll Error',
          data: err.message,
        });
      }
    },
  },

  /**
   * 정보 수정(PUT)
   * 
   */
  {
    path: '/counselor/:counselor_id',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log("[Counselor Update Controller Enter]")
        const { counselor_id } = req.params
        const CounselorServiceInstance = Container.get(CounselorService);
        const data = await CounselorServiceInstance.UpdateCounselor(counselor_id, req.body);

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
   * 상담사 삭제(DELETE)
   */
  {
    path: '/counselor/:counselor_id',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log("[Counselor Delete Controller Enter]")
        const { counselor_id } = req.params
        const CounselorServiceInstance = Container.get(CounselorService);
        const data = await CounselorServiceInstance.DeleteCounselor(counselor_id);

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
