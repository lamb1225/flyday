package web.act.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.act.dao.ActJoinDAO;
import web.act.entity.Act;
import web.act.entity.Act_Join;
import web.act.service.JoinActService;

import java.util.List;

@Service //Spring 設定為Service層Bean元件
@Transactional
public class JoinActServiceImpl implements JoinActService {
    // 設定注⼊(依型態)
    // Spring會依型態尋找符合的Bean元件
    // 若型態符合的Bean元件數量不是1，則會拋出例外
    @Autowired
    private ActJoinDAO dao;


    @Override
    public Act_Join JoinAct(Act_Join actjoin) {
        Integer actno = actjoin.getActno();
        Integer memno = actjoin.getMemno();

        if (dao.selectForJoin(actno, memno) != null) {
            actjoin = new Act_Join();
            actjoin.setMessage("已經加入過");
            actjoin.setSuccessful(false);
            return actjoin;
        }
        if (memno == null) {
            actjoin = new Act_Join();
            actjoin.setMessage("請先登入");
            actjoin.setSuccessful(false);
            return actjoin;
        }
        if (actno == null) {
            actjoin = new Act_Join();
            actjoin.setMessage("找不到揪團");
            actjoin.setSuccessful(false);
            return actjoin;
        }

        final int result = dao.insert(actjoin);
        if (result < 0) {
            actjoin = new Act_Join();
            actjoin.setMessage("加入失敗");
            actjoin.setSuccessful(false);
            return actjoin;
        }

        actjoin.setMessage("加入成功");
        actjoin.setSuccessful(true);
        return actjoin;
    }

    @Override
    public List<Act_Join> selectJoin(Integer id) {
        return dao.selectByactno(id);
    }

    @Override
    public boolean exit(Integer id1, Integer id2) {
        return dao.deleteById(id1, id2) > 0;
    }

    @Override
    public List<Act_Join> selectAll() {
        return null;
    }

    @Override
    public boolean updatestatus(Act_Join actJoin) {
        return dao.update(actJoin) > 0;
    }

    @Override
    public List<Act_Join> memJoin(Integer memid) {
        return dao.selectBymember(memid);
    }

    @Override
    public Act_Join selectone(Integer actno, Integer memid) {
        return dao.selectForJoin(actno, memid);
    }

    @Override
    public Act ManyJoin(Integer id) {
        return dao.selectByactid(id).getAct();
    }


}
