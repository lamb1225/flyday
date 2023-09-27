package web.pkg.pkg.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkg.entity.PkgOrd;
import web.pkg.pkg.entity.PkgOrdDetails;
import web.pkg.pkg.entity.PkgOrdDetailsId;
import web.pkg.pkg.entity.PkgShopCart;
import web.pkg.pkg.entity.PkgShopCartId;
import web.pkg.pkgmanage.entity.PkgShopCartToPlanDto;

public interface PkgShopCartDao extends CoreDao<PkgShopCart, PkgShopCartId>{
	
	List<PkgShopCart> selectAll(Integer memNo);

	int deleteAll(Integer memNo);

	List<PkgShopCartToPlanDto> selectAllPkg(Integer memNo);

}	
