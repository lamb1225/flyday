package web.pkg.pkgmanage.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.pkg.pkgmanage.dao.PkgPlanDao;
import web.pkg.pkgmanage.entity.PkgPlan;

@Repository
public class PkgPlanDaoImpl implements PkgPlanDao{

	@PersistenceContext
	private Session session;
	
	@Override
	public int insert(PkgPlan pkgPlan) {
		session.persist(pkgPlan);
		return 1;
	}

	@Override
	public int deleteById(Integer pkgPlanNo) {
		PkgPlan pkgPlan = session.get(PkgPlan.class, pkgPlanNo);
		session.remove(pkgPlan);
		return 1;
	}

	@Override
	public int update(PkgPlan pkgPlan) {
		final String hql = "UPDATE PkgPlan SET pkgPlanTitle = :pkgPlanTitle, pkgPlanNum = :pkgPlanNum, "
						+ "pkgGroupMoney = :pkgGroupMoney, pkgPlanContent = :pkgPlanContent "
						+ "WHERE pkgPlanNo = :pkgPlanNo";
		return session.createQuery(hql).setParameter("pkgPlanTitle", pkgPlan.getPkgPlanTitle())
				.setParameter("pkgPlanContent", pkgPlan.getPkgPlanContent())
				.setParameter("pkgPlanNum", pkgPlan.getPkgPlanNum()).setParameter("pkgGroupMoney", pkgPlan.getPkgGroupMoney())
				.setParameter("pkgPlanNo", pkgPlan.getPkgPlanNo())
				.executeUpdate();
	}

	@Override
	public PkgPlan selectById(Integer pkgPlanNo) {
		return session.get(PkgPlan.class, pkgPlanNo);
	}

	@Override
	public List<PkgPlan> selectAll() {
		final String hql = "FROM PkgPlan ORDER BY pkgPlanNo";
		return session.createQuery(hql, PkgPlan.class).getResultList();
	}

	@Override
	public List<PkgPlan> selectByPkgNo(Integer pkgNo) {
		final String hql = "FROM PkgPlan WHERE pkgNo = :pkgNo";
		return session.createQuery(hql, PkgPlan.class).setParameter("pkgNo", pkgNo).getResultList();
	}

	@Override
	public int updatePlanReview(PkgPlan pkgPlan) {
		final String hql = "UPDATE PkgPlan SET pkgPlanReview = :pkgPlanReview "+ "WHERE pkgPlanNo = :pkgPlanNo";
		return session.createQuery(hql).setParameter("pkgPlanReview", pkgPlan.getPkgPlanReview())
				.setParameter("pkgPlanNo", pkgPlan.getPkgPlanNo()).executeUpdate();
	}

}
