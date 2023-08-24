package web.pkg.pkgmanage.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import web.pkg.pkgmanage.dao.PkgPlanDetailsDao;
import web.pkg.pkgmanage.entity.PkgPlanDetails;

public class PkgPlanDetailsDaoImpl implements PkgPlanDetailsDao{

	@PersistenceContext
	private Session session;
	
	@Override
	public int insert(PkgPlanDetails pkgPlanDetails) {
		session.persist(pkgPlanDetails);
		return 1;
	}

	@Override
	public int deleteById(Integer pkgPlanDetailsNo) {
		PkgPlanDetails pkgPlanDetails = session.get(PkgPlanDetails.class, pkgPlanDetailsNo);
		session.remove(pkgPlanDetails);
		return 1;
	}

	@Override
	public int update(PkgPlanDetails pkgPlanDetails) {
		final String hql = "UPDATE PkgPlanDetails Set pkgDayStart = :pkgDayStart, pkgDayEnd = :pkgDayEnd, "
						+ "pkgPeopleMax = :pkgPeopleMax, pkgPeople = :pkgPeople, pkgPrice = :pkgPrice WHERE pkgDetailsNo = :pkgDetailsNo";
		return session.createQuery(hql).setParameter("pkgDayStart", pkgPlanDetails.getPkgDayStart()).setParameter("pkgDayEnd", pkgPlanDetails.getPkgDayEnd())
				.setParameter("pkgPeopleMax", pkgPlanDetails.getPkgPeopleMax()).setParameter("pkgPeople", pkgPlanDetails.getPkgPeople())
				.setParameter("pkgPrice", pkgPlanDetails.getPkgPrice()).setParameter("pkgDetailsNo", pkgPlanDetails.getPkgDetailsNo()).executeUpdate();
	}

	@Override
	public PkgPlanDetails selectById(Integer pkgPlanDetailsNo) {
		return session.get(PkgPlanDetails.class, pkgPlanDetailsNo);
	}

	@Override
	public List<PkgPlanDetails> selectAll() {
		final String hql = "From PkgPlanDetails ORDER BY pkgPlanDetailsNo";
		return session.createQuery(hql, PkgPlanDetails.class).getResultList();
	}

	@Override
	public List<PkgPlanDetails> selectByPkgPlanNo(String pkgPlanNo) {
		final String hql = "FROM PkgPlanDetails WHERE pkgPlanNo = :pkgPlanNo";
		return session.createQuery(hql).setParameter("pkgPlanNo", pkgPlanNo).getResultList();
	}

}
