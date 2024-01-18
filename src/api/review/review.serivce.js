import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto';

export default class ReviewService {
  /**
   * constructor
   * --
   */
  constructor() {}
  // @Inject('userModel') private userModel : Models.UserModel,
  // private mailer: MailerService,
  // @Inject('logger') private logger,
  // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,


  /**
   * 리뷰 작성 (POST)
   */
  async Write(review_info) {
    /** req.body
     * user_id, counselor_id, content, score
    */
    
    try {
      const {user_id, counselor_id, content, score} = review_info;
      const resultData = {
        status: 400,
        message: '',
        reviewData: {},
      };

      /**
       * 1. review테이블에서 counselor_id에 해당하는 속성값이 있는지 찾는다.
       * 1-1. 만약 해당 속성 값이 없을 경우 insert
       * 2. review_item에 insert
       * 3. review의 count를 하나 올리고 total_score계산
       * 4. reivew 테이블 update
       */

      // 1. review테이블에서 counselor_id에 해당하는 속성값이 있는지 찾는다.
      const review = await models.review.findOne({
        include: [{
          model: models.counselor,
          where: {
            id: counselor_id
          }
        }],
        raw: true
      });

      // 1-1. 만약 해당 속성 값이 없을 경우 insert
      if (review === null) {
        await models.review.create({
          counselor_id
        });
      }

      // 2. review_item에 insert
      await models.review_item.create({
        score,
        content
      });

      // 3. review의 count를 하나 올리고 total_score계산
      review.count += 1;
      const review_items = await models.review_item.findAll({
        include: [{
          model: models.counselor,
          where: {
            id: counselor_id
          }
        }]
      });

      let total_review_score = 0;

      review_items.forEach(review_item => {
        total_review_score += review_item.score;
      });

      const total_score = total_review_score / review_items;

      // 4. reivew 테이블 update
      await models.review.update(
        {
          total_score,
          count: review_count
        },
        {
          include: [{
            model: models.counselor,
            where: {
              id: counselor_id
            }
          }]
        }
      );

      resultData.status = 200;
      resultData.message = '리뷰 작성을 완료했습니다.';
      resultData.reviewData = review;

      return resultData;
    } catch (e) {
      logger.error(`[ReviewService][Write] Error : ${e.message}`);
      throw e;
    }
  }

  async GetReviews(params) {
    try {
      const resultData = {
        status: 400,
        message: '',
        data: [],
      }

      const review = await models.review.findOne({
        include: [{
          model: models.counselor,
          where: {
            id: counselor_id
          }
        }]
      });

      const review_items = await models.review_item.findAll({
        include: [{
          model: models.review,
          where: {
            id: review.id
          }
        }],
        raw: true
      });

      if (review_items === null) {
        resultData.status = 404;
        resultData.message = '리뷰를 찾지못했습니다.';
      } else {
        resultData.status = 200;
        resultData.message = '리뷰를 찾았습니다.';
        resultData.data = review_items;
      }

      return data;
    } catch (e) {
      logger.error(`[ReviewService]][GetReviews] Error : ${e.message}`);
      throw e;
    }
  }
  
  /**
   * 리뷰 조회 (GET) => 전체 리뷰 조회
   */
  async GetAllReviews() {
    try {
      const resultData = {
        status: 200,
        message: '',
        data: {}
      };
      
      const reviews = await models.review.findAll();
      
      resultData.message = '모든 리뷰를 찾았습니다.';
      resultData.data = reviews;
      
      return resultData;
    } catch (e) {
      logger.error(`[ReviewService]][GetReviews] Error : ${e.message}`);
      throw e;
    }
  }
  
  /**
   * 리뷰 삭제 (POST)
  */
 async DeleteReview(reviewInfo) {
   try {
      const {review_id} = reviewInfo;
      const resultData = {
        status: 200,
        message: '',
        data: {}
      };

      const deleteReviewData = await models.review.destroy({
        where: {
          id: review_id
        }
      });

      resultData.message = '리뷰를 삭제했습니다.';
      resultData.data = deleteReviewData;

      return resultData;
    } catch (e) {
      logger.error(`[ReviewService]][GetReviews] Error : ${e.message}`);
      throw e;
    }
  }
}