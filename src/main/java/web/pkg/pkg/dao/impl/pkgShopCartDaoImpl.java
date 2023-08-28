package web.pkg.pkg.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import web.pkg.pkg.dao.PkgShopCartDao;
import web.pkg.pkg.entity.PkgShopCart;
import web.pkg.pkg.entity.PkgShopCartId;

import org.hibernate.query.Query;

public class pkgShopCartDaoImpl implements PkgShopCartDao{
	
	@PersistenceContext
	private Session session;

	@Override
	public int insert(PkgShopCart pkgShopCart) {
		session.persist(pkgShopCart);
		return 1;
	}

	@Override
	public int deleteById(PkgShopCartId pkgShopCartId) {
		PkgShopCart pkgShopCart=session.get(PkgShopCart.class, pkgShopCartId);
		session.remove(pkgShopCart);
		return pkgShopCart.getPkgShopCartid().getPkgDetailsNo();
	}

	@Override
	public int update(PkgShopCart pkgShopCart) {
		final String hql= "UPDATE PkgShopCart SET memNo=:memNo"
				+"pkgDetailsNo=:pkgDetailsNo, pkgQty=:pkgQty";
		
		Query<?> query = session.createQuery(hql);
		return query.setParameter("memNo", pkgShopCart.getPkgShopCartid().getMemNo())
				.setParameter("pkgDetailsNo", pkgShopCart.getPkgShopCartid().getPkgDetailsNo())
				.setParameter("pkgQty", pkgShopCart.getPkgQty())
				.executeUpdate();

	}
	
	@Override
	public PkgShopCart selectById(PkgShopCartId pkgShopCartId) {
		return session.get(PkgShopCart.class, pkgShopCartId);
	}

	@Override
	public List<PkgShopCart> selectAll() {
		final String hql="FROM PkgShopCart WHERE memNo AND pkgDetailsNo ORDER BY memNo, pkgDetailsNo";
		return session.createQuery(hql, PkgShopCart.class).getResultList();
	}
	
}
