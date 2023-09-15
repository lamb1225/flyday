package web.pkg.pkg.service;

import java.util.List;

import web.mem.pkg.entity.MemPkgCoup;
import web.pkg.pkg.entity.PkgShopCart;
import web.pkg.pkg.entity.PkgShopCartId;

public interface PkgShopCartService {
	PkgShopCart addPkgCart(PkgShopCartId pkgShopCartid, Integer pkgQty);

	PkgShopCart UpdatePkgCart(Integer memNo, Integer pkgPlanNo, Integer pkgQty);

	int deleteOnePkgCart(Integer memNo, Integer pkgPlanNo);

	int deleteAll(Integer memNo);
	
    List<PkgShopCart> findAllPkgCart(Integer memNo);
    
    //查單一行程方案明細
    PkgShopCart findByPkgPlanNo(Integer memNo, Integer pkgPlanNo);

    //查詢會員擁有的所有折價券
    List<MemPkgCoup> getCouponsByMemberNo(Integer memNo);

	List<PkgShopCart> findAllPkgCart();
}
