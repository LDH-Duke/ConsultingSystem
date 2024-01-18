import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import crypto from 'crypto';

export default class ScheduleService {
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
   * 스케쥴 추가 (POST)
   */
  async AddSchedule(schedule_info) {
    try {
      // schedule_start, schedule_end, counselor_id    
      const {schedule_start, schedule_end, counselor_id} = schedule_info;
      const resultData = {
        status: 400,
        message: '',
        data: {}
      };
      
      const scheduleData = await models.schedule.findAll({
        include: [{
          model: models.counselor,
          where: {
            id: counselor_id
          }
        }]
      });

      // if (scheduleData) {
      //   // 이미 스케쥴 데이터가 있다면 update
      //   await models.schedule.update(
      //     {
      //       start: schedule_start,
      //       end: schedule_end,
      //     },
      //     {
      //       include: [{
      //         model: models.counselor,
      //         where: {
      //           id: counselor_id
      //         }
      //       }]
      //     }
      //   );
      // } else {
      //   // 없다면 insert
      //   await models.schedule.create({
      //     start: schedule_start,
      //     end: schedule_end,
      //     counselor_id
      //   });
      // }

      await models.schedule.create({
        start: schedule_start,
        end: schedule_end,
        counselor_id
      });

      resultData.status = 200;
      resultData.message = '스케쥴을 저장했습니다.';
      resultData.data = scheduleData;

      return resultData;
    } catch (e) {
      logger.error(`[ScheduleService][SetSchedule] Error : ${e.message}`);
      throw e;
    }
  }

  /**
   * 스케쥴 조회 (GET)
   */
  async ShowSchedule(scheduleInfo) {
    try {
      const {counselor_id} = scheduleInfo;
      const resultData = {
        status: 200,
        message: '',
        data: {}
      };
      
      const scheduleData = await models.schedule.findAll({
        include: [{
          model: models.conuselor,
          where: {
            id: counselor_id
          }
        }]
      });
      
      if (scheduleData) {
        resultData.message = '스케쥴을 찾았습니다.';
        resultData.data = scheduleData;
      } else {        
        resultData.message = '스케쥴을 못 찾았습니다.';
      }
      
      return resultData;
    } catch (e) {
      logger.error(`[ScheduleService][SetSchedule] Error : ${e.message}`);
      throw e;
    }
  }
  
  /**
   * 스케쥴 삭제 (POST)
  */
 async DeleteSchedule(scheduleInfo) {
   try {
     const {counselor_id} = scheduleInfo;
     const resultData = {
        status: 200,
        message: '',
        data: {}
      };

      await models.schedule.destroy({
        include: [{
          model: models.counselor,
          where: {
            id: counselor_id
          }
        }]
      });

      resultData.message = '스케쥴을 삭제했습니다.';

      return resultData;
    } catch (e) {
      logger.error(`[ScheduleService][SetSchedule] Error : ${e.message}`);
      throw e;      
    }
  }
}