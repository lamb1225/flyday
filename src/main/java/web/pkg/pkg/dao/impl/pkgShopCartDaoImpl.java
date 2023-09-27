package web.pkg.pkg.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;

import web.pkg.pkg.dao.PkgShopCartDao;
import web.pkg.pkg.entity.PkgCoup;
import web.pkg.pkg.entity.PkgShopCart;
import web.pkg.pkg.entity.PkgShopCartId;
import web.pkg.pkgmanage.entity.PkgPlan;
import web.pkg.pkgmanage.entity.PkgShopCartToPlanDto;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
@Repository
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
		return pkgShopCart.getPkgShopCartid().getPkgPlanNo();
	}

	@Override
	public int update(PkgShopCart pkgShopCart) {
		final String hql= "UPDATE PkgShopCart SET pkgQty=:pkgQty "
				+"WHERE memNo=:memNo AND pkgPlanNo=:pkgPlanNo";
		
		Query<?> query = session.createQuery(hql);
		return query.setParameter("memNo", pkgShopCart.getPkgShopCartid().getMemNo())
				.setParameter("pkgPlanNo", pkgShopCart.getPkgShopCartid().getPkgPlanNo())
				.setParameter("pkgQty", pkgShopCart.getPkgQty())
				.executeUpdate();

	}
	
	@Override
	public PkgShopCart selectById(PkgShopCartId pkgShopCartId) {
		return session.get(PkgShopCart.class, pkgShopCartId);
	}

	@Override
	public List<PkgShopCart> selectAll(Integer memNo) {
		final String hql="FROM PkgShopCart WHERE pkgShopCartid.memNo=:memNo";
		return session.createQuery(hql, PkgShopCart.class).setParameter("memNo", memNo).getResultList();
	}
	
	@Override
	public List<PkgShopCartToPlanDto> selectAllPkg(Integer memNo) {
		final String hql="FROM PkgShopCart ps JOIN PkgPlan pp ON ps.pkgShopCartid.pkgPlanNo = pp.pkgPlanNo WHERE ps.pkgShopCartid.memNo=:memNo";
		Query<Object[]> query = session.createQuery(hql, Object[].class).setParameter("memNo", memNo);
		List<Object[]>results = query.getResultList();
		List<PkgShopCartToPlanDto> pkgResultList = new ArrayList<PkgShopCartToPlanDto>();
		for(Object[] obj:results) {
			PkgShopCart pkgShopCart = (PkgShopCart)obj[0];
			PkgPlan pkgPlan = (PkgPlan)obj[1];
			PkgShopCartToPlanDto result = new PkgShopCartToPlanDto();
			result.setPkgPlan(pkgPlan);
			result.setPkgShopCart(pkgShopCart);
			pkgResultList.add(result);
		}
		
		return pkgResultList;
	}

	//查所有會員購物車
	@Override
	public List<PkgShopCart> selectAll() {
		final String hql = "FROM PkgShopCart";
		return session.createQuery(hql, PkgShopCart.class).getResultList();

	}
	
	//清空購物車
	@Override
	public int deleteAll(Integer memNo) {
		PkgShopCart pkgShopCart=session.get(PkgShopCart.class, memNo);
		session.remove(pkgShopCart);
		return 1;
	}
	
}
