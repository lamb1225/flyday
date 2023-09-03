package web.pkg.pkg.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="pkg_ord")
public class PkgOrd extends Core{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PKG_ORD_NO")
	private Integer pkgOrdNo;
	@Column(name = "MEM_NO")
	private Integer memNo;
	@Column(name = "MEM_PKG_COUP_NO")
	private Integer memPkgCoupNo;
	@Column(name = "PKG_ORG_PRICE")
	private Integer pkgOrgPrice;
	@Column(name = "PKG_DISC_PRICE")
	private Integer pkgDiscPrice;
	@Column(name = "PKG_PAY_PRICE")
	private Integer pkgPayPrice;
	@Column(name = "CON_NAME")
	private String conName;
	@Column(name = "CON_PHONE")
	private String conPhone;
	@Column(name = "CON_EMAIL")
	private String conEmail;
	@Column(name = "PKG_ORDER_DATE")
	private Timestamp pkgOrderDate;
	@Column(name = "PKG_REFUND_DATE")
	private Timestamp pkgRefundDate;
	@Column(name = "ORDER_STATE")
	private Integer orderState;
	
	@Override
	public String toString() {
		return "PkgOrd [pkgOrdNo=" + pkgOrdNo + ", memNo=" + memNo + ", memPkgCoupNo=" + memPkgCoupNo + ", pkgOrgPrice="
				+ pkgOrgPrice + ", pkgDiscPrice=" + pkgDiscPrice + ", pkgPayPrice=" + pkgPayPrice + ", conName="
				+ conName + ", conPhone=" + conPhone + ", conEmail=" + conEmail + ", pkgOrderDate=" + pkgOrderDate
				+ ", pkgRefundDate=" + pkgRefundDate + ", orderState=" + orderState + "]";
	}
	
	
}
