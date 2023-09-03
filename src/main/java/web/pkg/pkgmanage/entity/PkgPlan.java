package web.pkg.pkgmanage.entity;

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
@Table(name = "PKG_PLAN")
public class PkgPlan extends Core{
	private static final long serialVersionUID = 1062017833925367218L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PKG_PLAN_NO")
	private Integer pkgPlanNo;
	@Column(name = "PKG_NO")
	private Integer pkgNo;
	@Column(name = "PKG_PLAN_TITLE")
	private String pkgPlanTitle;
	@Column(name = "PKG_PLAN_NUM")
	private Integer pkgPlanNum;
	@Column(name = "PKG_GROUP_MONEY")
	private Integer pkgGroupMoney;
	@Column(name = "PKG_PLAN_REVIEW")
	private Integer pkgPlanReview;
	@Column(name = "PKG_PLAN_CONTENT")
	private String pkgPlanContent;
}
