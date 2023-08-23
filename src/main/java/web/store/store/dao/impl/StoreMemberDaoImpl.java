package web.store.store.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;
//import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import web.store.store.dao.StoreMemberDao;
import web.store.store.entity.Store;

@Repository
public class StoreMemberDaoImpl implements StoreMemberDao {
	
	@PersistenceContext
	private Session session;

	@Override
	public int insert(Store store) {
		session.persist(store);
		return 1;
	}

	@Override
	public int deleteById(Integer storeNo) {
		Store store = session.get(Store.class, storeNo);
		session.remove(store);
		return 1;
	}

	@Override
	public int update(Store store) {
		final StringBuilder hql = new StringBuilder()
				.append("UPDATE Store SET ");
		final String storePwd = store.getStorePwd();
		if (storePwd != null && !storePwd.isEmpty()) {
			hql.append("storePwd = :storePwd,");
		}
		hql.append("accStatus = :accStatus,")
			.append("storeName = :storeName,")
			.append("storeTel = :storeTel,")
			.append("storeAdd = :storeAdd,")
			.append("storeEmail = :storeEmail,")
			.append("storeReply = :storeReply,")
			.append("storeReview = :storeReview,")
			.append("storeNote = :storeNote,")
			.append("storePic = :storePic ")			
			.append("WHERE storeAcc = :storeAcc");
		Query<?> query = session.createQuery(hql.toString());
		if (storePwd != null && !storePwd.isEmpty()) {
			query.setParameter("storePwd", store.getStorePwd());
		}
		return query.setParameter("accStatus", store.getAccStatus())
				.setParameter("storeName", store.getStoreName())
				.setParameter("storeTel", store.getStoreTel())
				.setParameter("storeAdd", store.getStoreAdd())
				.setParameter("storeEmail", store.getStoreEmail())
				.setParameter("storeReply", store.getStoreReply())
				.setParameter("storeReview", store.getStoreReview())
				.setParameter("storeNote", store.getStoreNote())
				.setParameter("storePic", store.getStorePic())
				.setParameter("storeAcc", store.getStoreAcc())
				.executeUpdate();
	}

	@Override
	public Store selectById(Integer storeNo) {
		return session.get(Store.class, storeNo);
	}

	@Override
	public List<Store> selectAll() {
		final String hql = "FROM Store ORDER BY storeno";
		return session.createQuery(hql, Store.class).getResultList();
	}

	@Override
	public Store selectByStoreAcc(String storeAcc) {
		final String sql = "select * from STORE " + "where STORE_ACC = :storeAcc";
		return session.createNativeQuery(sql, Store.class).setParameter("storeAcc", storeAcc).uniqueResult();
	}

	@Override
	public Store selectForLogin(String storeAcc, String storePwd) {
		final String sql = "select * from STORE " + "where STORE_ACC = :storeAcc and STORE_PWD = :storePwd";
		return session.createNativeQuery(sql, Store.class)
				.setParameter("storeAcc", storeAcc)
				.setParameter("storePwd", storePwd)
				.uniqueResult();
	}

}
