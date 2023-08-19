package web.act.dao;


import core.dao.CoreDao;
import web.act.entity.Act;
/**
 * 建立DAO介面並繼承Coredao，使用范型制定宣告型態
 * */
public interface ActDAO extends CoreDao<Act, Integer> {

}
