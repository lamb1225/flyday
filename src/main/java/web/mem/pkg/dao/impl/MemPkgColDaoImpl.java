package web.mem.pkg.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import web.mem.pkg.dao.MemPkgColDao;
import web.mem.pkg.entity.MemPkgCol;
import web.mem.pkg.entity.MemPkgColId;
@Repository
public class MemPkgColDaoImpl implements MemPkgColDao {
	@PersistenceContext
	private Session session;

	@Override
	public int insert(MemPkgCol memPkgCol) {
		session.persist(memPkgCol);
		return 1;
	}

	@Override
	public int deleteById(MemPkgColId memPkgColId) {
		MemPkgCol memPkgCol = session.get(MemPkgCol.class, memPkgColId);
		session.remove(memPkgCol);
		return 0;
	}

	@Override
	public int update(MemPkgCol memPkgCol) {
//		final String hql="UPDATE MemPkgCol SET memNo=:memNo"
//				+"pkgNo=:pkgNo";
//		final String hql="";
//		
//		Query<?> query = session.createQuery(hql);
//		
//		return query.setParameter("memNo", memPkgCol.getMemPkgColId().getMemNo())
//				.setParameter("pkgNo", memPkgCol.getMemPkgColId().getPkgNo())
//				.executeUpdate();
		return 0;
	}

	@Override
	public MemPkgCol selectById(MemPkgColId memPkgColId) {
		return session.get(MemPkgCol.class, memPkgColId);
	}

	@Override
	public List<MemPkgCol> selectAll() {
		final String hql = "FROM MemPkgCol";
		return session.createQuery(hql, MemPkgCol.class).getResultList();
	}


}
