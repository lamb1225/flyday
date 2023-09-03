package web.pkg.pkgmanage.service;

import java.util.List;

import web.pkg.pkgmanage.entity.PkgPic;

public interface PkgPicService {
	PkgPic register(PkgPic pkgPic);
	
	PkgPic edit(PkgPic pkgPic);
	
	List<PkgPic> findall(Integer pkgNo); // 單筆行程的所有圖片
	
	boolean remove(Integer pkgPicNo);
}
