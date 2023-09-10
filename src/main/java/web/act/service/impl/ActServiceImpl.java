package web.act.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.act.dao.ActDAO;
import web.act.entity.Act;
import web.act.service.ActService;

import java.sql.Timestamp;
import java.util.List;

@Service //Spring 設定為Service層Bean元件
@Transactional
public class ActServiceImpl implements ActService {
    // 設定注⼊(依型態)
    // Spring會依型態尋找符合的Bean元件
    // 若型態符合的Bean元件數量不是1，則會拋出例外
    @Autowired
    private ActDAO dao;

//    public ActServiceImpl() {
//        dao = new ActDaoImpl();
//    }

    @Override
    public Act createAct(Act act) { //商業邏輯判斷是否為
        Timestamp time = new Timestamp(System.currentTimeMillis());

        if (act.getActtitle() == null) {
            act.setMessage("請輸入標題");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActcontent() == null) {
            act.setMessage("請輸入活動內容");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActmaxcount() == null || act.getActmaxcount() < 2) {
            act.setMessage("請輸入可參加最高人數");
            act.setSuccessful(false);
        }
        if (act.getActmincount() == null || act.getActmincount() < 2) {
            act.setMessage("請輸入可參加最低人數");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActmincount() > act.getActmaxcount()) {
            act.setMessage("最低人數不可大於最高人數");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActjoinbegin() == null) {
            act.setMessage("請輸入開始日期");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActjoinend() == null) {
            act.setMessage("請輸入結束日期");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActjoinend().before(act.getActjoinbegin())) {
            act.setMessage("結束時間不譨早於開始時間");
            act.setSuccessful(false);
            return act;
        }
        if (act.getActjoinbegin().before(time)) {
            act.setMessage("開始時間不譨早於現在時間");
            act.setSuccessful(false);
            return act;
        }

//        act.setMemno(2);
//        act.setPkgno(2);
        final int result = dao.insert(act);
        if (result < 1) {
            act.setMessage("建立失敗");
            act.setSuccessful(false);
            return act;
        }
        act.setMessage("建立成功");
        act.setSuccessful(true);
        return act;
    }

    @Override
    public Act selectAct(Integer id) {
        return dao.selectById(id);
    }

    @Override
    public boolean deleteAct(Integer id) {
        return dao.deleteById(id) > 0;
    }

    @Override
    public List<Act> selectAll() {
        return dao.selectAll();
    }

    @Override
    public boolean revise(Act act) {
//        Integer count = act.getActcurrentcount();
//        Integer max = act.getActmaxcount();
//        int differ = max - count;
//        if (differ == 0) {
//            act.setMessage("揪團已滿");
//            act.setSuccessful(false);
//            return false;
//        }

        return dao.update(act) > 0;
    }

    @Override
    public List<Act> memAct(Integer memid) {

        return dao.selectBymember(memid);
    }

    @Override
    public List<Act> selectActno(Integer actno) {
        return dao.selectByactno(actno);
    }
}
