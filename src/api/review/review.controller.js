import ReviewService from './review.serivce';
import { Container } from 'typedi';

export default [
  /** 
   * 리뷰 작성 (POST)
  */
 {
   path: '/review/write',
   method: 'post',
   middleware: [],
   controller: async (req, res, next) => {
      /** req.body
       * user_id, counselor_id, content, score
      */
      const reviewInfo = req.body;
      const ReviewServiceInstance = Container.get(ReviewService);

      try {
        const resultData = await ReviewServiceInstance.Write(reviewInfo);
        
        return res.status(200).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    },
  },

  /**
   * 리뷰 조회 (GET) => 상담사 아이디에 해당하는 리뷰들만 조회
   */
  {
    path: '/review/:counselor_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const {counselor_id} = req.params;
      const ReviewServiceInstance = Container.get(ReviewService);

      try {
        const resultData = ReviewServiceInstance.GetReviews(counselor_id);

        return res.status(resultData.status).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    }
  },

  /**
   * 리뷰 조회 (GET) => 전체 리뷰 조회
   */
  {
    path: '/review/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      const ReviewServiceInstance = Container.get(ReviewService);

      try {
        const resultData = ReviewServiceInstance.GetAllReviews();

        return res.status(resultData.status).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    }
  },

  /**
   * 리뷰 삭제 (POST)
   */
  {
    path: '/review/delete',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      const ReviewServiceInstance = Container.get(ReviewService);

      try {
        const resultData = ReviewServiceInstance.DeleteReview(req.body);

        return res.status(resultData.status).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    }
  }
];
