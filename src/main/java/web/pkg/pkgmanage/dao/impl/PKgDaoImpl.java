package web.pkg.pkgmanage.dao.impl;

import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import web.pkg.pkgmanage.dao.PkgDao;
import web.pkg.pkgmanage.entity.Pkg;

@Repository
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
						+ "pkgNotice = :pkgNotice, "
						+ "pkgRefpolicy = :pkgRefpolicy, pkgOnePic = :pkgOnePic WHERE pkgNo = :pkgNo";
		Query<?> query = session.createQuery(hql);
		
		return query.setParameter("pkgName", pkg.getPkgName())
				.setParameter("pkgGroup", pkg.getPkgGroup()).setParameter("pkgGather",pkg.getPkgGather())
				.setParameter("pkgPlace",pkg.getPkgPlace())
				.setParameter("pkgAddress", pkg.getPkgAddress()).setParameter("pkgLatitude", pkg.getPkgLatitude())
				.setParameter("pkgLongitude", pkg.getPkgLongitude()).setParameter("pkgSort", pkg.getPkgSort())
				.setParameter("pkgContent", pkg.getPkgContent()).setParameter("pkgNotice", pkg.getPkgNotice())
				.setParameter("pkgRefpolicy", pkg.getPkgRefpolicy())
				.setParameter("pkgOnePic", pkg.getPkgOnePic()).setParameter("pkgNo", pkg.getPkgNo())
				.executeUpdate();
	}

	@Override
	public Pkg selectById(Integer pkgNo) {
		Pkg pkg = session.get(Pkg.class, pkgNo);
		if (pkg == null) {
			return pkg;
		}else {
			if (pkg.getPkgOnePic() != null) {
				byte[] pkgOnePic = pkg.getPkgOnePic();
				String pkgPicBase64 = Base64.getEncoder().encodeToString(pkgOnePic);
				pkg.setPkgPicBase64(pkgPicBase64);
			}
			return pkg;
		}
	}

	@Override
	public List<Pkg> selectAll() {
		final String hql = "FROM Pkg ORDER BY pkgNo";
		List<Pkg> pkgs = session.createQuery(hql, Pkg.class).getResultList();
		for(Pkg pkgone : pkgs) {
			if (pkgone.getPkgOnePic() != null) {
				byte[] pkgOnePic = pkgone.getPkgOnePic();
				String pkgPicBase64 = Base64.getEncoder().encodeToString(pkgOnePic);
				pkgone.setPkgPicBase64(pkgPicBase64);
			}
		}
		return pkgs ;
	}

	@Override
	public Pkg selectByPkgNo(Integer pkgNo) {
		Pkg pkg = session.get(Pkg.class, pkgNo);
		if (pkg == null) {
			return pkg;
		}else {
			if (pkg.getPkgOnePic() != null) {
				byte[] pkgOnePic = pkg.getPkgOnePic();
				String pkgPicBase64 = Base64.getEncoder().encodeToString(pkgOnePic);
				pkg.setPkgPicBase64(pkgPicBase64);
			}
			return pkg;
		}
	}

	
	@Override
	public List<Pkg> selectByStoreNo(Integer storeNo) {
		final String hql = "FROM Pkg WHERE storeNo = :storeNo";
		List<Pkg> pkgs = session.createQuery(hql, Pkg.class).setParameter("storeNo", storeNo).getResultList(); 
		for(Pkg pkgone : pkgs) {
			if (pkgone.getPkgOnePic() != null) {
				byte[] pkgOnePic = pkgone.getPkgOnePic();
				String pkgPicBase64 = Base64.getEncoder().encodeToString(pkgOnePic);
				pkgone.setPkgPicBase64(pkgPicBase64);
			}
		}
		return pkgs ;
	}

	@Override
	public int updateReview(Pkg pkg) {
		final String hql = "UPDATE Pkg SET pkgReview = :pkgReview WHERE pkgNo = :pkgNo";
		return session.createQuery(hql).setParameter("pkgReview", pkg.getPkgReview())
				.setParameter("pkgNo", pkg.getPkgNo()).executeUpdate();
	}

	@Override
	public int updateComment(Pkg pkg) {
		final String hql = "UPDATE Pkg SET pkgRatetotal = :pkgRatetotal, pkgCommentNum = :pkgCommentNum WHERE pkgNo = :pkgNo";
		return session.createQuery(hql).setParameter("pkgRatetotal", pkg.getPkgRatetotal())
				.setParameter("pkgCommentNum", pkg.getPkgCommentNum()).executeUpdate();
	}

}
