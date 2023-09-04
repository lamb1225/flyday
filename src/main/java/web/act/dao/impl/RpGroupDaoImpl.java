package web.act.dao.impl;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import web.act.dao.RpGroupDAO;
import web.act.entity.Rp_Group;

import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
public class RpGroupDaoImpl implements RpGroupDAO {
    @PersistenceContext
    private Session session;
    @Override
    public int insert(Rp_Group rpGroup) {
        session.persist(rpGroup);
        return 1;
    }

    @Override
    public int deleteById(Integer id) {
        Rp_Group rpGroup = session.get(Rp_Group.class, id);
        session.remove(rpGroup);
        return 1;
    }

    @Override
    public int update(Rp_Group rpGroup) {
        return 0;
    }

    @Override
    public Rp_Group selectById(Integer id) {
        return session.get(Rp_Group.class,id);
    }

    @Override
    public List<Rp_Group> selectAll() {
        final String hql = "FROM act ORDER BY rp_group_no";
        return session
                .createQuery(hql, Rp_Group.class)
                .getResultList();
    }
}
