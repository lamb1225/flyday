package web.pkg.pkg.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import org.hibernate.query.Query;

import web.pkg.pkg.dao.PkgCoupDao;
import web.pkg.pkg.entity.PkgCoup;

public class PkgCoupDaoImpl implements PkgCoupDao {

	@PersistenceContext
	private Session session;

	@Override
	public int insert(PkgCoup pkgCoup) {
		session.persist(pkgCoup);// persist 新增
		return 1;
	}

//	行程優惠券不用刪除，純粹練習用
	@Override
	public int deleteById(Integer pkgCoupNo) {
		PkgCoup pkgCoup = session.get(PkgCoup.class, pkgCoupNo);
		session.remove(pkgCoup);
		return pkgCoupNo;

	}

	@Override
	public int update(PkgCoup pkgCoup) {
		final String hql = "UPDATE PkgCoup SET pkgCoupNo=:pkgCoupNo"
				+ "pkgCoupName=:pkgCoupName, pkgCoupIntroduce=:pkgCoupIntroduce"
				+ "pkgCoupDiscount=:pkgCoupDiscount, pkgCoupStartDate=:pkgCoupStartDate"
				+ "pkgCoupEndDate=:pkgCoupEndDate, pkgCoupUseStartDate=:pkgCoupUseStartDate"
				+ "pkgCoupUseEndDate=:pkgCoupUseEndDate, pkgCoupMiniCharge=:pkgCoupMiniCharge"
				+ "pkgCoupState=:pkgCoupState";

		Query<?> query = session.createQuery(hql);

		return query.setParameter("pkgCoupNo", pkgCoup.getPkgCoupNo())
				.setParameter("pkgCoupName", pkgCoup.getPkgCoupName())
				.setParameter("pkgCoupIntroduce", pkgCoup.getPkgCoupIntroduce())
				.setParameter("pkgCoupDiscount", pkgCoup.getPkgCoupDiscount())
				.setParameter("pkgCoupStartDate", pkgCoup.getPkgCoupStartDate())
				.setParameter("pkgCoupEndDate", pkgCoup.getPkgCoupEndDate())
				.setParameter("pkgCoupUseStartDate", pkgCoup.getPkgCoupUseStartDate())
				.setParameter("pkgCoupUseEndDate", pkgCoup.getPkgCoupUseEndDate())
				.setParameter("pkgCoupMiniCharge", pkgCoup.getPkgCoupMinicharge())
				.setParameter("pkgCoupState", pkgCoup.getPkgCoupState())
				.executeUpdate();

	}

	@Override
	public PkgCoup selectById(Integer id) {
		return session.get(PkgCoup.class, id); // id這個名稱可以隨意取 因為是傳入的值;會自動對應到PK
												// PkgCoup.class 是實體類entity的類型
	}

	@Override
	public List<PkgCoup> selectAll() {
		final String hql = "FROM pkgCoup ORDER BY pkgCoupNO";
		return session.createQuery(hql, PkgCoup.class).getResultList();
	}
}
