package web.pkg.pkg.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class PkgCoup extends Core {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name = "PKG_COUP_NO")
	private Integer pkgCoupNo;
	@Column(name = "PKG_COUP_NAME")
	private String pkgCoupName;
	@Column(name = "PKG_COUP_INTRODUCE")
	private String pkgCoupIntroduce;
	@Column(name = "PKG_COUP_DISCOUNT")
	private Integer pkgCoupDiscount;
	@Column(name = "PKG_COUP_STARTDATE")
	private Date pkgCoupStartDate;
	@Column(name = "PKG_COUP_ENDDATE")
	private Date pkgCoupEndDate;
	@Column(name = "PKG_COUP_USE_STARTDATE")
	private Date pkgCoupUseStartDate;
	@Column(name = "PKG_COUP_USE_ENDDATE")
	private Date pkgCoupUseEndDate;
	@Column(name = "PKG_COUP_MINICHARGE")
	private Integer pkgCoupMinicharge;
	@Column(name = "PKG_COUP_STATE")
	private Integer pkgCoupState;
	
	@Override
	public String toString() {
		return "PkgCoup [pkgCoupNo=" + pkgCoupNo + ", pkgCoupName=" + pkgCoupName + ", pkgCoupIntroduce="
				+ pkgCoupIntroduce + ", pkgCoupDiscount=" + pkgCoupDiscount + ", pkgCoupStartDate=" + pkgCoupStartDate
				+ ", pkgCoupEndDate=" + pkgCoupEndDate + ", pkgCoupUseStartDate=" + pkgCoupUseStartDate
				+ ", pkgCoupUseEndDate=" + pkgCoupUseEndDate + ", pkgCoupMinicharge=" + pkgCoupMinicharge
				+ ", pkgCoupState=" + pkgCoupState + "]";
	}
	
	
	
}
