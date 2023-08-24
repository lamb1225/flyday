package web.pkg.pkgmanage.service;

import java.util.List;

import web.pkg.pkgmanage.entity.PkgPlan;

public interface PkgPlanService {
	PkgPlan register(PkgPlan pkgPlan);
	
	PkgPlan edit(PkgPlan pkgPlan);
	
	List<PkgPlan> findall(String pkgNo); //單一行程的全部方案

}
