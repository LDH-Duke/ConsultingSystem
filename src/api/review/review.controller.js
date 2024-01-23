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
     try {
       /** req.body
        * user_id, counselor_id, content, score
       */
        console.log('[Review Write Controller]');
        const reviewInfo = req.body;
        const ReviewServiceInstance = Container.get(ReviewService);
        const data = await ReviewServiceInstance.Write(reviewInfo);
        
        return data ? res.status(200).json({
          message: '리뷰 작성 성공',
          status: 200,
          data: data
        }) : 
          res.status(200).json({
            message: '리뷰 작성 실패',
            status: 409,
            data: data
          });
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: `Review Write Error`,
          data: e.message
        });
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
      try {
        console.log('[Counselor Review Controller]');
        const {counselor_id} = req.params;
        const ReviewServiceInstance = Container.get(ReviewService);
        const data = ReviewServiceInstance.GetReviews(counselor_id);

        return data ? res.status(200).json({
          message: '리뷰 조회 성공',
          status: 200,
          data: data
        }) : 
          res.status(200).json({
            message: '리뷰 조회 실패',
            status: 409,
            data: data
          });
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: `Review FindOne Error`,
          data: e.message
        });
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
      try {
        console.log('[All Counselor Review Controller]');
        const ReviewServiceInstance = Container.get(ReviewService);
        const data = ReviewServiceInstance.GetAllReviews();

        return data ? res.status(200).json({
          message: '리뷰 전체 조회 성공',
          status: 200,
          data: data
        }) : 
          res.status(200).json({
            message: '리뷰 전체 조회 실패',
            status: 409,
            data: data
          });
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: `Review FindAll Error`,
          data: e.message
        });
      }
    }
  },

  /**
   * 리뷰 수정 (POST)
   */
  {
    path: '/review/:review_item_id',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[Review Update Controller]');
        const { review_item_id } = req.params;
        const ReviewServiceInstance = Container.get(ReviewService);
        const data = ReviewServiceInstance.UpdateReview(review_item_id, req.body);

        return data ? res.status(200).json({
          message: '리뷰 갱신 성공',
          status: 200,
          data: data
        }) : 
          res.status(200).json({
            message: '리뷰 갱신 실패',
            status: 409,
            data: data
          });
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: `Review Update Error`,
          data: e.message
        });
      }
    }
  },

  /**
   * 리뷰 삭제 (POST)
   */
  {
    path: '/review/:review_item_id',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log('[Review Delete Controller]');
        const { review_item_id } = req.params;
        const ReviewServiceInstance = Container.get(ReviewService);
        const data = ReviewServiceInstance.DeleteReview(review_item_id);

        return data ? res.status(200).json({
          message: '리뷰 삭제 성공',
          status: 200,
          data: data
        }) : 
          res.status(200).json({
            message: '리뷰 삭제 실패',
            status: 409,
            data: data
          });
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: `Review Delete Error`,
          data: e.message
        });
      }
    }
  },
];
