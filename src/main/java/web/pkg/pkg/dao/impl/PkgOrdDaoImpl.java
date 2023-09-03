package web.pkg.pkg.dao.impl;
import java.util.List;

import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import org.hibernate.Session;

import web.pkg.pkg.dao.PkgOrdDao;
import web.pkg.pkg.entity.PkgOrd;

import org.hibernate.query.Query;

@Repository
public class PkgOrdDaoImpl implements PkgOrdDao {
	
	@PersistenceContext
	private Session session;

	@Override
	public int insert(PkgOrd pkgOrd) {
		session.persist(pkgOrd);
		return 1;
	}




//	訂單不用刪除，純粹練習用
	@Override
	public int deleteById(Integer pkgOrdNo) {
		PkgOrd pkgOrd= session.get(PkgOrd.class, pkgOrdNo);
		session.remove(pkgOrd);
		return 1;
	}

	@Override
	public int update(PkgOrd pkgOrd) {
		final String hql ="UPDATE PkgOrd SET memNo=:memNo, "
				+"memPkgCoupNo=:memPkgCoupNo, pkgOrgPrice=:pkgOrgPrice, pkgDiscPrice=:pkgDiscPrice, "
				+"pkgPayPrice=:pkgPayPrice, conName=:conName, conPhone=:conPhone, "
				+"conEmail=:conEmail, pkgOrderDate=:pkgOrderDate, pkgRefundDate=:pkgRefundDate, "
				+"orderState=:orderState "
				+"WHERE pkgOrdNo=:pkgOrdNo";
		
		Query<?> query = session.createQuery(hql);

		return query
				.setParameter("pkgOrdNo", pkgOrd.getPkgOrdNo())
				.setParameter("memNo", pkgOrd.getMemNo())
				.setParameter("memPkgCoupNo", pkgOrd.getMemPkgCoupNo())
				.setParameter("pkgOrgPrice", pkgOrd.getPkgOrgPrice())
				.setParameter("pkgDiscPrice", pkgOrd.getPkgDiscPrice())
				.setParameter("pkgPayPrice", pkgOrd.getPkgPayPrice())
				.setParameter("conName", pkgOrd.getConName())
				.setParameter("conPhone", pkgOrd.getConPhone())
				.setParameter("conEmail", pkgOrd.getConEmail())
				.setParameter("pkgOrderDate", pkgOrd.getPkgOrderDate())
				.setParameter("pkgRefundDate", pkgOrd.getPkgRefundDate())
				.setParameter("orderState", pkgOrd.getOrderState())
				.executeUpdate();
				
	}

	@Override
	public PkgOrd selectById(Integer pkgOrdNo) {
		return session.get(PkgOrd.class, pkgOrdNo);
	}

	@Override
	public List<PkgOrd> selectAll() {
		final String hql = "FROM PkgOrd";
		return session.createQuery(hql, PkgOrd.class).getResultList();
	}
	
	
	
	
}
