package web.mem.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.mem.dao.MemDao;
import web.mem.entity.Mem;

@Repository
public class MemDaoImpl implements MemDao {

	@PersistenceContext
	private Session session;
	
	
	@Override
	public int insert(Mem mem) {
		session.persist(mem);
		return 1;
	}

	@Override
	public int delectByMemNo(Integer memNo) {
		Mem mem = session.get(Mem.class, memNo);
		session.remove(mem);
		return 1;
	}

	@Override
	public int update(Mem mem) {
		final String hql = "UPDATE Mem SET memLevelNo = :memLevelNo, memAcc = :memAcc ,"
				+ " memPwd = :memPwd, memAccStatus = :memAccStatus, memName = :memName, memGender = :memGender,"
				+ " memBday = :memBday, memEmail = :memEmail, memMobile = :memMobile, memCity = :memCity, memDist = :memDist,"
				+ " memAddr = :memAddr, memActStatus = :memActStatus WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memLevelNo", mem.getMemLevelNo())
				.setParameter("memAcc", mem.getMemAcc())
				.setParameter("memPwd", mem.getMemPwd())
				.setParameter("memAccStatus", mem.getMemAccStatus())
				.setParameter("memName", mem.getMemName())
				.setParameter("memGender", mem.getMemGender())
				.setParameter("memBday", mem.getMemBday())
				.setParameter("memEmail", mem.getMemEmail())
				.setParameter("memMobile", mem.getMemMobile())
				.setParameter("memCity", mem.getMemCity())
				.setParameter("memDist", mem.getMemDist())
				.setParameter("memAddr", mem.getMemAddr())
				.setParameter("memActStatus", mem.getMemActStatus())
				.setParameter("memNo", mem.getMemNo())
				.executeUpdate();	
	}

	@Override
	public Mem selectByMemNo(Integer memNo) {
		return session.get(Mem.class, memNo);
	}
	
	@Override
	public Mem selectByMemAcc(String memAcc) {
		final String hql = "FROM Mem WHERE memAcc = :memAcc";	
		return session.createQuery(hql, Mem.class).setParameter("memAcc", memAcc).uniqueResult();
	}
	
	@Override
	public Mem selectByMemEmail(String memEmail) {
		final String hql = "FROM Mem WHERE memEmail = :memEmail";	
		return session.createQuery(hql, Mem.class).setParameter("memEmail", memEmail).uniqueResult();
	}
	
	@Override
	public Mem selectByMemMobile(String memMobile) {
		final String hql = "FROM Mem WHERE memMobile = :memMobile";	
		return session.createQuery(hql, Mem.class).setParameter("memMobile", memMobile).uniqueResult();
	}
	

	@Override
	public Mem selectAccAndPwd(String memAcc, String memPwd) {
		final String hql = "FROM Mem WHERE memAcc = :memAcc AND memPwd = :memPwd";		
		return session.createQuery(hql, Mem.class)
				.setParameter("memAcc", memAcc)
				.setParameter("memPwd", memPwd)
				.uniqueResult();
	}

	@Override
	public List<Mem> selectAll() {
		final String hql = "FROM mem ORDER BY id";
		return session.createQuery(hql, Mem.class).getResultList();
	}
}
