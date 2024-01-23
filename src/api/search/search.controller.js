import SearchService from './search.serivce';
import { Container } from 'typedi';

export default [
  /** 
   * 검색 (POST)
  */
  {
    path: '/search/:searchWord',
    method: 'post',
    middleware: [],
    controller: async(req, res, next) => {
      try {
        const searchInfo = req.params;
        const SearchServiceInstance = Container.get(SearchService);
        const data = await SearchServiceInstance.Search(searchInfo);

        return data ? res.status(200).json({
          status: 200,
          data: data,
          message: '검색 성공',
        }) :
        res.status(200).json({
            status: 409,
            data: data,
            message: '검색 실패',
          })
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: 'Search Error',
          data: e.message,
        })
        // next(e);
      }
    }
   },
];
