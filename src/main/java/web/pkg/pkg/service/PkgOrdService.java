package web.pkg.pkg.service;

import java.util.List;

import web.pkg.pkg.entity.PkgOrd;

public interface PkgOrdService {

	PkgOrd addPkgOrd(PkgOrd pkgOrd);
	
	PkgOrd updatePkgOrd(PkgOrd pkgOrd);
	
	List<PkgOrd> findPkgOrdById(Integer pkgOrdNo);

	List<PkgOrd> findallPkgOrd();

}
