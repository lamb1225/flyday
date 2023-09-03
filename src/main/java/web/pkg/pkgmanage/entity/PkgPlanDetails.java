package web.pkg.pkgmanage.entity;

import java.sql.Date;

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

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PKG_PLAN_DETAILS")
public class PkgPlanDetails extends Core{
	private static final long serialVersionUID = 1062017833925367218L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PKG_DETAILS_NO")
	private Integer pkgDetailsNo;
	@Column(name = "PKG_PLAN_NO")
	private Integer pkgPlanNo;
	@Column(name = "PKG_DAY_START")
	private Date pkgDayStart;
	@Column(name = "PKG_DAY_END")
	private Date pkgDayEnd;
	@Column(name = "PKG_PEOPLE_MAX")
	private Integer pkgPeopleMax;
	@Column(name = "PKG_PEOPLE")
	private Integer pkgPeople;
	@Column(name = "PKG_PRICE")
	private Integer pkgPrice;
}
