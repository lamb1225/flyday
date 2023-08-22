package web.act.dao.impl;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import web.act.dao.Act_JoinDAO;
import web.act.entity.Act_Join;

import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
public class Act_joinDaoImpl implements Act_JoinDAO {
    @PersistenceContext
    private Session session;
    @Override
    public int insert(Act_Join actJoin) {
        session.persist(actJoin);
        return 1;
    }

    @Override
    public int deleteById(Integer id) {
        Act_Join actJoin = session.get(Act_Join.class, id);
        session.remove(actJoin);
        return 1;
    }

    @Override
    public int update(Act_Join actJoin) {
        return 0;
    }

    @Override
    public Act_Join selectById(Integer id) {
        return session.get(Act_Join.class,id);
    }

    @Override
    public List<Act_Join> selectAll() {
        final String hql = "FROM act ORDER BY act_no";
        return session
                .createQuery(hql, Act_Join.class)
                .getResultList();
    }
}
