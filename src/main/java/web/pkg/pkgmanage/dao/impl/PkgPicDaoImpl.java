package web.pkg.pkgmanage.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import web.pkg.pkgmanage.dao.PkgPicDao;
import web.pkg.pkgmanage.entity.PkgPic;

public class PkgPicDaoImpl implements PkgPicDao{
	
	@PersistenceContext
	private Session session;

	@Override
	public int insert(PkgPic pkgPic) {
		session.persist(pkgPic);
		return 1;
	}

	@Override
	public int deleteById(Integer pkgPicNo) {
		PkgPic pkgPic =  session.get(PkgPic.class, pkgPicNo);
		session.remove(pkgPic);
		return 1;
	}

	@Override
	public int update(PkgPic pkgPic) {
		final String hql = "UPDATE PkgPic SET pkgImg = :pkgImg WHERE pkgPicNo = :pkgPicNo";
		return session.createQuery(hql).setParameter("pkgImg", pkgPic.getPkgImg())
				.setParameter("pkgPicNo", pkgPic.getPkgPicNo()).executeUpdate();
	}

	@Override
	public PkgPic selectById(Integer pkgPicNo) {
		return session.get(PkgPic.class, pkgPicNo);
	}

	@Override
	public List<PkgPic> selectAll() {
		final String hql = "FROM PkgPic ORDER BY pkgPicNo";
		return session.createQuery(hql, PkgPic.class).getResultList();
	}

	@Override
	public List<PkgPic> selectByPkgNo(String pkgNo) {
		final String hql = "FROM PkgPic WHERE pkgNo = :pkgNo";
		return session.createQuery(hql).setParameter("pkgNo", pkgNo).getResultList();
	}

}
