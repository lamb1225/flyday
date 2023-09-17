package web.pkg.pkg.service;

import java.util.List;

import web.pkg.pkg.entity.PkgOrdDetails;

public interface PkgOrdDetailsService {

		PkgOrdDetails addDetails(PkgOrdDetails pkgOrdDetails);
		
		PkgOrdDetails updateDetails(PkgOrdDetails pkgOrdDetails);
		
		PkgOrdDetails findDetailsById(Integer pkgOrdDetailsNo);
		
		List<PkgOrdDetails> findAll();
}
