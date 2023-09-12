package web.act.dao.impl;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import web.act.dao.ActJoinDAO;
import web.act.entity.Act_Join;

import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ActJoinDaoImpl implements ActJoinDAO {
    @PersistenceContext
    private Session session;

    @Override
    public int insert(Act_Join actJoin) {
        session.persist(actJoin);
        return 1;
    }

    @Override
    public int deleteById(Integer id1) {

        return 1;
    }

    @Override
    public int update(Act_Join actJoin) {

        final StringBuilder hql = new StringBuilder().append("UPDATE Act_Join SET ");
        final Integer status = actJoin.getJoinstatus();
        final Integer payment = actJoin.getPayment();
        if (status != null) {
            hql.append("joinstatus = :joinstatus ");
        }
        if (payment != null) {
            hql.append("payment = :payment ");
        }
        hql.append("WHERE actno = :actno and memno = :memno");
        Query<?> query = session.createQuery(hql.toString());
        if (status != null) {
            query.setParameter("joinstatus",status);
        }
        if (payment != null) {
            query.setParameter("payment",payment);
        }
        return query
                .setParameter("actno",actJoin.getActno())
                .setParameter("memno",actJoin.getMemno())
                .executeUpdate();
//        final String sql = "update ACT_JOIN set JOIN_STATUS = JOIN_STATUS + :status   where ACT_NO = :actno and MEM_NO = :memno";
//        return session
//                .createNativeQuery(sql, Act_Join.class)
//                .setParameter("status", actJoin.getJoinstatus())
//                .setParameter("actno", actJoin.getActno())
//                .setParameter("memno", actJoin.getMemno())
//                .executeUpdate();

    }

    @Override
    public Act_Join selectById(Integer id) {
        return null;
    }


    @Override
    public Act_Join selectByactid(Integer id) {
        return session.get(Act_Join.class, id);
    }

    @Override
    public List<Act_Join> selectAll() {
        final String hql = "FROM act_join ORDER BY act_no";
        return session
                .createQuery(hql, Act_Join.class)
                .getResultList();
    }


    @Override
    public Act_Join selectForJoin(Integer actno, Integer memno) {
        final String sql = "select * from ACT_JOIN where ACT_NO = :actno and MEM_NO = :memno";
        return session
                .createNativeQuery(sql, Act_Join.class)
                .setParameter("actno", actno)
                .setParameter("memno", memno)
                .uniqueResult();//查詢多筆getResultList();、單筆uniqueResult();
    }

    @Override
    public List<Act_Join> selectByactno(Integer id) {
        final String sql = "select * from ACT_JOIN where ACT_NO= :actno order by MEM_NO"; //sql查詢寫法
        return session
                .createNativeQuery(sql, Act_Join.class)
                .setParameter("actno", id)
                .getResultList();//查詢多筆getResultList();、單筆uniqueResult();
    }

    @Override
    public int deleteById(Integer actno, Integer memno) {
        final String sql = "delete from Act_Join where ACT_NO = :actno and MEM_NO = :memno";
        return session
                .createNativeQuery(sql)
                .setParameter("actno", actno)
                .setParameter("memno", memno)
                .executeUpdate();
    }

    @Override
    public List<Act_Join> selectBymember(Integer memid) {
        final String sql = "select * from ACT_JOIN where MEM_NO= :memno order by ACT_NO"; //sql查詢寫法
        return session
                .createNativeQuery(sql, Act_Join.class)
                .setParameter("memno", memid)
                .getResultList();//查詢多筆getResultList();、單筆uniqueResult();
    }


}

