package web.act.dao.impl;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import web.act.dao.Act_ReplyDAO;
import web.act.entity.Act_Reply;

import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
public class Act_ReplyDaoImpl implements Act_ReplyDAO {
    @PersistenceContext
    private Session session;
    @Override
    public int insert(Act_Reply actReply) {
        session.persist(actReply);
        return 1;
    }

    @Override
    public int deleteById(Integer id) {

        Act_Reply actReply = session.get(Act_Reply.class, id);
        session.remove(actReply);
        return 1;
    }

    @Override
    public int update(Act_Reply actReply) {
        return 0;
    }

    @Override
    public Act_Reply selectById(Integer id) {
        return session.get(Act_Reply.class,id);
    }

    @Override
    public List<Act_Reply> selectAll() {
        final String hql = "FROM act ORDER BY act_reply_no";
        return session
                .createQuery(hql, Act_Reply.class)
                .getResultList();
    }
}
