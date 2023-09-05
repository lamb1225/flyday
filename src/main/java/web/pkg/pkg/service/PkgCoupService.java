package web.pkg.pkg.service;

import java.util.List;

import web.pkg.pkg.entity.PkgCoup;

public interface PkgCoupService {
	PkgCoup add(PkgCoup pkgcoup);
	PkgCoup edit(PkgCoup pkgcoup);
	List<PkgCoup> findAll();
	PkgCoup findByPkgCoupNo(Integer pkgCoupNo);
	boolean remove (Integer pkgCoupNo);

}
