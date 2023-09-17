package web.pkg.pkg.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import web.pkg.pkgmanage.entity.PkgPlan;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="pkg_shop_cart")
public class PkgShopCart extends Core {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5311990021144133245L;

	
	@EmbeddedId
	PkgShopCartId pkgShopCartid;
	
	@Column(name="PKG_QTY")
	private Integer pkgQty;
	

	@ManyToOne
	@JoinColumn(name="PKG_PLAN_NO" ,insertable = false, updatable = false)
	private PkgPlan pkgPlan; 
	
	@Override
	public String toString() {
		return "PkgShopCart [pkgShopCartid=" + pkgShopCartid + ", pkgQty=" + pkgQty + "]";
	}
	
	
	
}
