package web.pkg.pkgmanage.service;

import java.util.List;

import web.pkg.pkgmanage.entity.PkgPlanDetails;

public interface PkgPlanDetailsService {
	PkgPlanDetails register(PkgPlanDetails pkgPlanDetails);
	
	PkgPlanDetails edit(PkgPlanDetails pkgPlanDetails);
	
	List<PkgPlanDetails> findall(String pkgPlanNo); //單筆方案的所有時間
}
