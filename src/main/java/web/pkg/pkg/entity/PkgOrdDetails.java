package web.pkg.pkg.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pkg_ord_details")
public class PkgOrdDetails extends Core {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6560645046281551018L;
	//JPA的註解，表示這個實體使用了複合主鍵，並宣告了複合主鍵類別
	@EmbeddedId
	PkgOrdDetailsId pkgOrdDetailsid;

	@Column(name = "PKG_ORD_QTY")
	private Integer pkgOrdQty;
	@Column(name = "PKG_UNITPRICE")
	private Integer pkgUnitPrice;
	@Column(name = "ORDER_NOTE")
	private String orderNote;

	@Override
	public String toString() {
		return "PkgOrdDetails [pkgOrdDetailsid=" + pkgOrdDetailsid + ", pkgOrdQty=" + pkgOrdQty + ", pkgUnitPrice="
				+ pkgUnitPrice + ", orderNote=" + orderNote + "]";
	}



}
