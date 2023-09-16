package web.pkg.pkg.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.mem.pkg.dao.MemPkgCoupDao;
import web.mem.pkg.entity.MemPkgCoup;
import web.pkg.pkg.dao.PkgShopCartDao;
import web.pkg.pkg.entity.PkgShopCart;
import web.pkg.pkg.entity.PkgShopCartId;
import web.pkg.pkg.service.PkgShopCartService;

@Service
@Transactional
public class PkgShopCartServiceImpl implements PkgShopCartService {
	@Autowired
	private PkgShopCartDao dao;

	@Autowired
	private MemPkgCoupDao coupdao;
	
	@Override
	public PkgShopCart addPkgCart(PkgShopCartId pkgShopCartid, Integer pkgQty) {
		PkgShopCart pkgShopCart = new PkgShopCart();
		pkgShopCart.setPkgShopCartid(pkgShopCartid);
		pkgShopCart.setPkgQty(pkgQty);
		dao.insert(pkgShopCart);
		pkgShopCart.setSuccessful(true);
		return pkgShopCart;
	}

	// 修改購物車商品
	@Override
	public PkgShopCart UpdatePkgCart(Integer memNo, Integer pkgPlanNo, Integer pkgQty) {
		PkgShopCart pkgShopCart = new PkgShopCart();
		PkgShopCartId pkgShopCartId = new PkgShopCartId();
		pkgShopCartId.setMemNo(memNo);
		pkgShopCartId.setPkgPlanNo(pkgPlanNo);
		pkgShopCart.setPkgQty(pkgQty);
		Integer currentAmount = pkgShopCart.getPkgQty();

		// 判斷行程商品數量為0，如為0則刪除該商品
		if (currentAmount == 0) {
			dao.deleteById(pkgShopCartId);
		} else {
			dao.update(pkgShopCart);
		}
		return pkgShopCart;
	}
	
	// 刪除購物車單筆商品
	@Override
	public int deleteOnePkgCart(Integer memNo, Integer pkgPlanNo) {
		PkgShopCartId pkgShopCartId = new PkgShopCartId();
		pkgShopCartId.setMemNo(memNo);
		pkgShopCartId.setPkgPlanNo(pkgPlanNo);
		dao.deleteById(pkgShopCartId);
		return 1;
	}

	// 清空購物車
	@Override
	public int deleteAll(Integer memNo) {
		dao.deleteAll(memNo);
		return 1;
	}
	
	// 查詢會員購物車清單
	@Override
	public List<PkgShopCart> findAllPkgCart(Integer memNo) {
		return dao.selectAll(memNo);
	}
	
	// 查詢所有會員購物車清單
	
	public List<PkgShopCart> findAllPkgCart() {
		return dao.selectAll();
	}
	
	//查詢單一行程商品
	@Override
	public PkgShopCart findByPkgPlanNo(Integer memNo, Integer pkgPlanNo) {
		PkgShopCartId pkgShopCartId = new PkgShopCartId();
		pkgShopCartId.setMemNo(memNo);
		pkgShopCartId.setPkgPlanNo(pkgPlanNo);
		return dao.selectById(pkgShopCartId);
	}

	// 查詢會員優惠券
	@Override
	public List<MemPkgCoup> getCouponsByMemberNo(Integer memNo) {
		return coupdao.selectAll();
	}



}
