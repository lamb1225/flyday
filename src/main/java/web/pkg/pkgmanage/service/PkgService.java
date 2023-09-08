package web.pkg.pkgmanage.service;

import java.util.List;

import web.pkg.pkgmanage.entity.Pkg;

public interface PkgService {
	Pkg register(Pkg pkg);
	
	Pkg edit(Pkg pkg);
	
	List<Pkg> findAll();
	
	List<Pkg> findmyPkg(Integer storeNo);
	
	Pkg select(Integer pkgNo);
	
	Pkg editReview(Pkg pkg);
	
	Pkg editComment(Pkg pkg);
}
