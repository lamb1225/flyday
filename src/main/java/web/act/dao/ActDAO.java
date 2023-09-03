package web.act.dao;


import core.dao.Coredao;
import web.act.entity.Act;

import java.util.List;

/**
 * 建立DAO介面並繼承Coredao，使用范型制定宣告型態
 */
public interface ActDAO extends Coredao<Act, Integer> {
    List<Act> selectBymember(Integer memid);
}
