package web.act.dao;


import core.dao.CoreDao;
import web.act.entity.Act;
import web.act.entity.Act_Reply;

import java.util.List;

public interface ActReplyDAO extends CoreDao<Act_Reply, Integer> {
    List<Act_Reply> selectByactno(Integer actno);
}
