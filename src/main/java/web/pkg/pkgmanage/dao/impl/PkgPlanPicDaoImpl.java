package web.pkg.pkgmanage.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.pkg.pkgmanage.dao.PkgPlanPicDao;
import web.pkg.pkgmanage.entity.PkgPlanPic;

@Repository
public class PkgPlanPicDaoImpl implements PkgPlanPicDao{

	@PersistenceContext
	private Session session;
	
	@Override
	public int insert(PkgPlanPic pkgPlanPic) {
		session.persist(pkgPlanPic);
		return 1;
	}

	@Override
	public int deleteById(Integer pkgPlanPicNo) {
		PkgPlanPic pkgPlanPic = session.get(PkgPlanPic.class, pkgPlanPicNo);
		session.remove(pkgPlanPic);
		return 1;
	}

	@Override
	public int update(PkgPlanPic pkgPlanPic) {
		final String hql = "UPDATE PkgPlanPic Set pkgPlanImg = :PkgPlanImg WHERE pkgPlanPicNo = :pkgPlanPicNo"; 
		return session.createQuery(hql).setParameter("PkgPlanImg", pkgPlanPic.getPkgPlanImg()).setParameter("pkgPlanPicNo", pkgPlanPic.getPkgPlanPicNo()).executeUpdate();
	}

	@Override
	public PkgPlanPic selectById(Integer pkgPlanPicNo) {
		return session.get(PkgPlanPic.class, pkgPlanPicNo);
	}

	@Override
	public List<PkgPlanPic> selectAll() {
		final String hql = "FROM PkgPlanPic ORDER BY pkgPlanPicNo";
		return session.createQuery(hql, PkgPlanPic.class).getResultList();
	}

	@Override
	public List<PkgPlanPic> selectByPkgPlanNo(Integer pkgPlanNo) {
		final String hql = "FROM PkgPlanPic WHERE pkgPlanNo = :pkgPlanNo";
		return session.createQuery(hql).setParameter("pkgPlanNo", pkgPlanNo).getResultList();
	}

}
