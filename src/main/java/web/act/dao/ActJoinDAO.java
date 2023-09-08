package web.act.dao;


import core.dao.CoreDao;
import web.act.entity.Act_Join;

import java.util.List;

public interface ActJoinDAO extends CoreDao<Act_Join, Integer> {
    Act_Join selectForJoin(Integer actno, Integer memno);

    List<Act_Join> selectByactno(Integer id);

    int deleteById(Integer id1, Integer id2);

    List<Act_Join> selectBymember(Integer memid);
    Act_Join selectByactid(Integer id);

}
