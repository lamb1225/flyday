package web.pkg.pkgmanage.service;

import java.util.List;

import web.pkg.pkgmanage.entity.PkgPlanPic;

public interface PkgPlanPicService {
	PkgPlanPic register(PkgPlanPic pkgPlanPic);

	PkgPlanPic edit(PkgPlanPic pkgPlanPic);

	List<PkgPlanPic> findall(Integer pkgPlanNo); //單一方案的所有圖片
	
	boolean remove(Integer pkgPlanPicNo);
}
