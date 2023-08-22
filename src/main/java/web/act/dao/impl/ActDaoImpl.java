package web.act.dao.impl;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import web.act.dao.ActDAO;
import web.act.entity.Act;

import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * 實作DAO
 */
@Repository //Spring 設定為DAO層Bean元件
public class ActDaoImpl implements ActDAO {
    // 解決多個執⾏緒共⽤同個Session物件
    // 會⾃動呼叫
    // openSession()/getCurrentSession()，以取得Session物件
    @PersistenceContext // 是由JPA提供的API，⽽⾮Spring
    private Session session;

    @Override
    public int deleteById(Integer id) {
        Act act = session.get(Act.class, id); // 取得Entity ID
        session.remove(act); // 刪除該id 列
        return 1; // 回傳1
    }

    @Override
    public Act selectById(Integer id) { // 查詢該id列表
        return session.get(Act.class, id); // 取得Entity ID
    }

    @Override
    public List<Act> selectAll() { // 查詢全部資料
        final String hql = "FROM Act ORDER BY act_no"; //hql查詢寫法
        return session
                .createQuery(hql, Act.class) // 建立查詢
                .getResultList(); // 執行 HQL 查詢並返回結果
    }

    @Override
    public int insert(Act act) { // 新增揪團資訊
        session.persist(act); // 將實體物件新增⾄對應資料表中
        return 1;
    }

    @Override
    public int update(Act act) { // 更新已存在資料
        Act oldact = session.get(Act.class, act.getActno()); // 取得資料表Act主鍵ID
        final Integer count = act.getActcurrentcount(); // 取得前端網頁的值
        final Integer status = act.getActstatus(); // 取得前端網頁的值
        final String title = act.getActtitle(); // 取得前端網頁的值
        final String content = act.getActcontent(); // 取得前端網頁的值
        if (count != null) { // 判定前端網頁值為空值就不執行該欄位更新
            oldact.setActcurrentcount(count);
        }
        if (status != null) {
            oldact.setActstatus(status);
        }
        if (title != null) {
            oldact.setActtitle(act.getActtitle());
        }
        if (content != null) {
            oldact.setActcontent(act.getActcontent());
        }
        return 1;

    }


}
