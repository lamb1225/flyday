package web.pkg.pkg.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import web.pkg.pkg.dao.PkgCommentDao;
import web.pkg.pkg.entity.PkgComment;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class PkgCommentDaoImpl implements PkgCommentDao {

	@PersistenceContext
	private Session session;

	@Override
	public int insert(PkgComment pkgComment) {
		session.persist(pkgComment);
		return 1;
	}

	@Override
	public int update(PkgComment pkgComment) {
		final String hql = "UPDATE PkgComment SET "
				+"pkgNo=:pkgNo, memNo=:memNo, "
				+"pkgComments=:pkgComments, pkgCommentImg=:pkgCommentImg, "
				+"pkgCommentRate=:pkgCommentRate, pkgCommentDate=:pkgCommentDate, "
				+"WHERE pkgCommentNo=:pkgCommentNo";

			Query<?> query = session.createQuery(hql);
			
			return query
					.setParameter("pkgCommentNo", pkgComment.getPkgCommentNo())
					.setParameter("pkgNo", pkgComment.getPkgNo())
					.setParameter("memNo", pkgComment.getMemNo())
					.setParameter("pkgComments", pkgComment.getPkgComments())
					.setParameter("pkgCommentImg", pkgComment.getPkgCommentImg())
					.setParameter("pkgCommentRate", pkgComment.getPkgCommentRate())
					.setParameter("pkgCommentDate", pkgComment.getPkgCommentDate())
					.executeUpdate();

	}

	@Override
	public PkgComment selectByPkgCommentNo(Integer pkgCommentNo) {
		return session.get(PkgComment.class, pkgCommentNo);
	}

	@Override
	public List<PkgComment> selectAll() {
		final String hql="FROM PpkgComment";
		return session.createQuery(hql,PkgComment.class).getResultList();
//		使用 Hibernate 的 createQuery 方法執行一個 HQL（Hibernate Query Language）查詢，並返回符合查詢條件的 PkgComment 對象列表。
	}

}
