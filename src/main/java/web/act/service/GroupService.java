package web.act.service;

import web.act.entity.Rp_Group;

import java.util.List;

public interface GroupService {
    Rp_Group addGroup(Rp_Group group);
    List<Rp_Group> fillAll();
    boolean Processing(Rp_Group group);
}
