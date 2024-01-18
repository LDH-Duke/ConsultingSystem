import ScheduleService from './schedule.serivce';
import { Container } from 'typedi';

export default [
  /** 
   * 스케쥴 추가 (POST)
  */
 {
   path: '/schedule/add',
   method: 'post',
   middleware: [],
   controller: async (req, res, next) => {
      /** req.body
       * schedule_start, schedule_end, counselor_id
      */
      const scheduleInfo = req.body;
      const ScheduleServiceInstance = Container.get(ScheduleService);

      try {
        const resultData = await ScheduleServiceInstance.AddSchedule(scheduleInfo);
        
        return res.status(200).json({
          resultData
        });
      } catch (e) {
        next(e);
      }
    },
  },

  /** 
   * 스케쥴 조회 (GET)
  */
  {
    path: '/schedule/show',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
       /** req.body
        * schedule_start, schedule_end, counselor_id
       */
       const ScheduleServiceInstance = Container.get(ScheduleService);
 
       try {
         const resultData = await ScheduleServiceInstance.ShowSchedule(req.body);
         
         return res.status(200).json({
           resultData
         });
       } catch (e) {
         next(e);
       }
     },
   },

  /** 
   * 스케쥴 삭제 (POST)
  */
  {
    path: '/schedule/delete',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
       /** req.body
        * schedule_start, schedule_end, counselor_id
       */
       const ScheduleServiceInstance = Container.get(ScheduleService);
 
       try {
         const resultData = await ScheduleServiceInstance.DeleteSchedule(req.body);
         
         return res.status(200).json({
           resultData
         });
       } catch (e) {
         next(e);
       }
     },
   },
];
