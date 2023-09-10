package web.act.service;

import web.act.entity.Act;
import web.act.entity.Act_Join;

import java.util.List;

public interface JoinActService {
    Act_Join JoinAct(Act_Join actjoin);

    List<Act_Join> selectJoin(Integer id);

    boolean exit(Integer id1, Integer id2);

    List<Act_Join> selectAll();

    boolean updatestatus(Act_Join actJoin);

    List<Act_Join> memJoin(Integer memid);

    Act_Join selectone(Integer actno, Integer memid);
    Act ManyJoin(Integer id);

}
