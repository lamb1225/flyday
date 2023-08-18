package web.store.store.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.store.store.dao.StoreMemberDao;
import web.store.store.entity.StoreMember;

@Repository
public class StoreMemberDaoImpl implements StoreMemberDao {
	
	@PersistenceContext
	private Session session;

	@Override
	public int insert(StoreMember storeMember) {
		session.persist(storeMember);
		return 1;
	}

	@Override
	public int deleteById(Integer storeNo) {
		StoreMember storeMember = session.get(StoreMember.class, storeNo);
		session.remove(storeMember);
		return 1;
	}

	@Override
	public int update(StoreMember storeMember) {
		final StringBuilder hql = new StringBuilder()
				.append("UPDATE StoreMember SET ");
		final String storePwd = storeMember.getStorePwd();
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
			.append("WHERE storeAcc = :storeAcc");
		Query query = session.createQuery(hql.toString());
		if (storePwd != null && !storePwd.isEmpty()) {
			query.setParameter("storePwd", storeMember.getStorePwd());
		}
		return query.setParameter("accStatus", storeMember.getAccStatus())
				.setParameter("storeName", storeMember.getStoreName())
				.setParameter("storeTel", storeMember.getStoreTel())
				.setParameter("storeAdd", storeMember.getStoreAdd())
				.setParameter("storeEmail", storeMember.getStoreEmail())
				.setParameter("storeReply", storeMember.getStoreReply())
				.setParameter("storeReview", storeMember.getStoreReview())
				.setParameter("storeNote", storeMember.getStoreNote())
				.executeUpdate();
	}

	@Override
	public StoreMember selectById(Integer storeNo) {
		return session.get(StoreMember.class, storeNo);
	}

	@Override
	public List<StoreMember> selectAll() {
		final String hql = "FROM StoreMember ORDER BY storeno";
		return session.createQuery(hql, StoreMember.class).getResultList();
	}

	@Override
	public StoreMember selectByStoreAcc(String storeacc) {
		CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
		CriteriaQuery<StoreMember> criteriaQuery = criteriaBuilder.createQuery(StoreMember.class);
		Root<StoreMember> root = criteriaQuery.from(StoreMember.class);
		criteriaQuery.where(criteriaBuilder.equal(root.get("storename"), storeacc));
		
		return session.createQuery(criteriaQuery).uniqueResult();
	}

	@Override
	public StoreMember selectForLogin(String username, String password) {
		final String sql = "select * from STOREMEMBER" + "where STORE_ACC = :storeacc and STORE_PWD = :storepwd";
		return session.createNamedQuery(sql, StoreMember.class)
				.setParameter("storeacc", username)
				.setParameter("storepwd", password)
				.uniqueResult();
	}

}
