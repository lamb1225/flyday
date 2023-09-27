package web.pkg.pkgmanage.entity;


import javax.persistence.Column;


import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import web.pkg.pkg.entity.PkgShopCart;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PkgShopCartToPlanDto extends Core{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -139290694365174428L;
	
	private PkgPlan pkgPlan;
	private PkgShopCart pkgShopCart;

}
