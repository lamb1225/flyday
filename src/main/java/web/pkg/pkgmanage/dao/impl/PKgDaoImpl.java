package web.pkg.pkgmanage.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.query.Query;

import web.pkg.pkgmanage.dao.PkgDao;
import web.pkg.pkgmanage.entity.Pkg;

public class PKgDaoImpl implements PkgDao{
	
	@PersistenceContext
	private Session session;

	@Override
	public int insert(Pkg pkg) {
		session.persist(pkg);
		return 1;
	}

	@Override
	public int deleteById(Integer pkgNo) {
		Pkg pkg = session.get(Pkg.class, pkgNo);
		session.remove(pkg);
		return 1;
	}

	@Override
	public int update(Pkg pkg) {
		final String hql = "UPDATE Pkg SET pkgName = :pkgName, pkgGroup = :pkgGroup, pkgGather = :pkgGather, "
						+ "pkgPlace = :pkgPlace, pkgAddress = :pkgAddress, pkgLatitude = :pkgLatitude, "
						+ "pkgLongitude = :pkgLongitude, pkgSort = :pkgSort, pkgContent = :pkgContent, "
						+ "pkgNote = :pkgNote, pkgReview = :pkgReview, pkgStartdate = :pkgStartdate, "
						+ "pkgNotReason = :pkgNotReason, pkgRatetotal = :pkgRatetotal, pkgCommentNum = :pkgCommentNum, "
						+ "pkgRefpolicy = :pkgRefpolicy, pkgOnePic = :pkgOnePic WHERE pkgNo = :pkgNo";
		Query<?> query = session.createQuery(hql);
		
		return query.setParameter("pkgName", pkg.getPkgName())
				.setParameter("pkgGroup", pkg.getPkgGroup()).setParameter("pkgGather",pkg.getPkgGather())
				.setParameter("pkgPlace",pkg.getPkgPlace())
				.setParameter("pkgAddress", pkg.getPkgAddress()).setParameter("pkgLatitude", pkg.getPkgLatitude())
				.setParameter("pkgLongitude", pkg.getPkgLongitude()).setParameter("pkgSort", pkg.getPkgSort())
				.setParameter("pkgContent", pkg.getPkgContent()).setParameter("pkgNote", pkg.getPkgNote())
				.setParameter("pkgReview", pkg.getPkgReview()).setParameter("pkgStartdate", pkg.getPkgStartdate())
				.setParameter("pkgNotReason", pkg.getPkgNotReason()).setParameter("pkgRatetotal", pkg.getPkgRatetotal())
				.setParameter("pkgCommentNum", pkg.getPkgCommentNum()).setParameter("pkgRefpolicy", pkg.getPkgRefpolicy())
				.setParameter("pkgOnePic", pkg.getPkgOnePic()).setParameter("pkgNo", pkg.getPkgNo())
				.executeUpdate();
	}

	@Override
	public Pkg selectById(Integer pkgNo) {
		return session.get(Pkg.class, pkgNo);
	}

	@Override
	public List<Pkg> selectAll() {
		final String hql = "FROM Pkg ORDER BY pkgNo";
		return session.createQuery(hql, Pkg.class).getResultList();
	}

	@Override
	public Pkg selectByPkgNo(String pkgNo) {
		return session.get(Pkg.class, pkgNo);
	}

	
	@Override
	public List<Pkg> selectByStoreNo(String storeNo) {
		final String hql = "FROM Pkg WHERE storeNo = :storeNo";
		return session.createQuery(hql).setParameter("storeNo", storeNo).getResultList();
	}

}
