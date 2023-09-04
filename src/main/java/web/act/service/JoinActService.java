package web.act.service;

import web.act.entity.Act_Join;

import java.util.List;

public interface JoinActService {
    Act_Join JoinAct(Act_Join actjoin);
    List<Act_Join> selectJoin(Integer id);
    boolean exit(Integer id1, Integer id2);
    List<Act_Join> selectAll();
    boolean updatestatus(Act_Join actJoin);

}
