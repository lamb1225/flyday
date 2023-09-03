package web.mem.pkg.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import org.hibernate.query.Query;

import web.mem.pkg.dao.MemPkgCoupDao;
import web.mem.pkg.entity.MemPkgCoup;

public class MemPkgCoupDaoImpl implements MemPkgCoupDao{
	@PersistenceContext
	private Session session;

	@Override
	public int insert(MemPkgCoup memPkgCoup) {
		session.persist(memPkgCoup);
		return 1;
	}

	@Override
	public int deleteById(Integer id) {
		MemPkgCoup	memPkgCoup = session.get(MemPkgCoup.class, id);
		session.remove(memPkgCoup);
		return id;
	}

	@Override
	public int update(MemPkgCoup memPkgCoup) {
		final String hql = "UPDATE MemPkgCoup SET "
				+"pkgCoupNo=:pkgCoupNo, memNo=:memNo, "
				+"memPkgCoupState=:memPkgCoupState "
				+"WHERE memPkgCoupNo=:memPkgCoupNo";
		
		Query<?> query = session.createQuery(hql);
		
		return query.setParameter("memPkgCoupNo", memPkgCoup.getMemPkgCoupNo())
				.setParameter("pkgCoupNo", memPkgCoup.getMemPkgCoupNo())
				.setParameter("memNo", memPkgCoup.getMemNo())
				.setParameter("memPkgCoupState", memPkgCoup.getMemPkgCoupNo())
				.executeUpdate();
	};

	@Override
	public MemPkgCoup selectById(Integer id) {
		return session.get(MemPkgCoup.class, id);
	}

	@Override
	public List<MemPkgCoup> selectAll() {
		final String hql= "FROM MemPkgCoup";
		return session.createQuery(hql, MemPkgCoup.class).getResultList();
	}

	
	
}
