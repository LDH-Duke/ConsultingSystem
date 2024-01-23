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
    constructor() { }
    // @Inject('userModel') private userModel : Models.UserModel,
    // private mailer: MailerService,
    // @Inject('logger') private logger,
    // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,


    /**
     * 리뷰 작성 (POST)
     */
    async Write(review_info) {
        try {
            /** req.body
             * user_id, counselor_id, content, score
            */
            const { user_id, counselor_id, content, score } = review_info;
            /**
             * 1. review테이블에서 counselor_id에 해당하는 속성값이 있는지 찾는다.
             * 1-1. 만약 해당 속성 값이 없을 경우 insert
             * 2. review_item에 insert
             * 3. review의 count를 하나 올리고 total_score계산
             * 4. reivew 테이블 update
             */

            // 1. review테이블에서 counselor_id에 해당하는 속성값이 있는지 찾는다.
            const reviewData = await models.review.findOne({
                include: [{
                    model: models.counselor,
                    where: {
                        id: counselor_id
                    }
                }],
                raw: true,
            });

            // 1-1. 만약 해당 속성 값이 없을 경우 insert
            const review = reviewData ? reviewData :
                await models.review.create({
                    counselor_id
                });


            // 2. review_item에 insert
            await models.review_item.create({
                score,
                content,
                user_id,
                review_id: review.id
            });

            // 3. review의 count를 하나 올리고 total_score계산
            const review_items = await models.review_item.findAll({
                include: [{
                    model: models.review,
                    where: {
                        review_id: review.id
                    }
                }],
                raw: true,
            });

            let total_review_score = 0;

            review_items.forEach(review_item => {
                total_review_score += review_item.score;
            });

            const total_score = total_review_score / review_items.length;
            review.count += 1;

            // 4. reivew 테이블 update
            const final_review = await models.review.update(
                {
                    total_score,
                    count: review_count
                },
                {
                    where: {
                        id: review.id
                    }
                }
            );

            return {
                review: final_review,
                review_item: review_items,
            };
        } catch (e) {
            console.log('[Review] Write ERROR !! : ' + e)
            logger.error(`[ReviewService][Write] Error : ${e.message}`);
            throw e;
        }
    }

    async GetReviews(counselor_id) {
        try {
            const review = await models.review.findOne({
                include: [{
                    model: models.counselor,
                    where: {
                        id: counselor_id
                    }
                }],
                raw: true,
            });

            if (review === null) { return null; }

            return await models.review_item.findAll({
                include: [{
                    model: models.review,
                    where: {
                        id: review.id
                    }
                }],
                raw: true
            });
        } catch (e) {
            console.log('[Review] GetReviews ERROR !! : ' + e)
            logger.error(`[ReviewService]][GetReviews] Error : ${e.message}`);
            throw e;
        }
    }

    /**
     * 리뷰 조회 (GET) => 전체 리뷰 조회
     */
    async GetAllReviews() {
        try {
            return await models.review.findAll();
        } catch (e) {
            console.log('[Review] GetAllReviews ERROR !! : ' + e)
            logger.error(`[ReviewService]][GetAllReviews] Error : ${e.message}`);
            throw e;
        }
    }

    /**
     * 리뷰 수정 (PUT)
     */
    async UpdateReview(review_item_id, body) {
        try {
            const { content, score } = body;

            return await models.review_item.update(
                {
                    content,
                    score,
                    updated_at: new Date(),
                },
                {
                    where:
                    {
                        id: review_item_id
                    }
                }
            );
        } catch (e) {
            console.log('[Review] UpdateReview ERROR !! : ' + e)
            logger.error(`[ReviewService][UpdateReview] Error : ${e.message}`);
            throw e;
        }
    }

    /**
     * 리뷰 삭제 (DELETE)
    */
    async DeleteReview(reviewInfo) {
        try {
            const { review_item_id } = reviewInfo;

            return await models.review_item.destroy(
                {
                    where: {
                        id: review_item_id
                    }
                }
            );
        } catch (e) {
            console.log('[Review] GetReviews ERROR !! : ' + e)
            logger.error(`[ReviewService]][GetReviews] Error : ${e.message}`);
            throw e;
        }
    }
}