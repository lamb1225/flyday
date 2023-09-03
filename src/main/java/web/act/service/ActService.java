package web.act.service;


import web.act.entity.Act;

import java.util.List;

public interface ActService {
    Act createAct(Act act);
    Act selectAct(Integer id);
    boolean deleteAct(Integer id);
    List<Act> selectAll();
    boolean revise(Act act);
    List<Act> memAct(Integer memid);

}
