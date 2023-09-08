package web.act.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.act.dao.RpGroupDAO;
import web.act.entity.Rp_Group;
import web.act.service.GroupService;

import java.util.List;

@Service //Spring 設定為Service層Bean元件
@Transactional
public class GroupServiceimpl implements GroupService {

    @Autowired
    private RpGroupDAO dao;


    @Override
    public Rp_Group addGroup(Rp_Group group) {
        if (group.getRpgroupcontent() == null) {
            group.setMessage("請輸入內容");
            group.setSuccessful(false);
            return group;
        }
        final int result = dao.insert(group);
        if (result < 1) {
            group.setMessage("建立失敗");
            group.setSuccessful(false);
            return group;
        }
        group.setMessage("建立成功");
        group.setSuccessful(true);
        return group;
    }

    @Override
    public List<Rp_Group> fillAll() {
        return dao.selectAll();
    }

    @Override
    public boolean Processing(Rp_Group group) {
        return dao.update(group) > 0;
    }
}
