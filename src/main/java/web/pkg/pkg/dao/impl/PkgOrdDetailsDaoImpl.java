package web.pkg.pkg.dao.impl;
import web.pkg.pkg.dao.PkgOrdDetailsDao;
import web.pkg.pkg.entity.PkgOrdDetails;
import web.pkg.pkg.entity.PkgOrdDetailsId;

import java.util.List;

import javax.persistence.PersistenceContext;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mysql.cj.xdevapi.SessionFactory;


@Repository
public class PkgOrdDetailsDaoImpl implements PkgOrdDetailsDao{

	@PersistenceContext
	private Session session;

	
	@Override
	public int insert(PkgOrdDetails pkgOrdDetails) {
		session.persist(pkgOrdDetails);
		return 1;
	}

	@Override
	public int update(PkgOrdDetails pkgOrdDetails) {
		final String hql="UPDATE PkgOrdDetails SET "
				+"pkgOrdQty=:pkgOrdQty, pkgUnitPrice=:pkgUnitPrice, orderNote=:orderNote "
				+"WHERE pkgOrdNo=:pkgOrdNo AND pkgOrdDetailsNo=:pkgOrdDetailsNo";
		
		Query<?> query = session.createQuery(hql);

		return query
				.setParameter("pkgOrdNo", pkgOrdDetails.getPkgOrdDetailsid().getPkgOrdNo())
				.setParameter("pkgDetailsNo", pkgOrdDetails.getPkgOrdDetailsid().getPkgDetailsNo())
				.setParameter("pkgOrdQty", pkgOrdDetails.getPkgOrdQty())
				.setParameter("pkgUnitPrice", pkgOrdDetails.getPkgUnitPrice())
				.setParameter("orderNote", pkgOrdDetails.getOrderNote())
				.executeUpdate();
	}

//	使用 session 從資料庫中根據指定的 PkgOrdDetailsId 查詢 PkgOrdDetails 對象。PkgOrdDetails.class 是實體類的類型，pkgOrdDetailsId 是要查詢的對象的複合主鍵。
	@Override
	public PkgOrdDetails selectByPkgOrdDetailsId(Integer pkgOrdDetailsId) {
		return session.get(PkgOrdDetails.class, pkgOrdDetailsId);

	}
	
	@Override
	public List<PkgOrdDetails> selectAll() {
//		session =  HibernateUtil.getSessionFactory().openSession();
		final String hql = "FROM PkgOrdDetails";
		return session.createQuery(hql, PkgOrdDetails.class).getResultList();
	}
	
//	public PkgOrdDetailsDaoImpl(Session session) {
//		this.session=session;
//	}
	
}
