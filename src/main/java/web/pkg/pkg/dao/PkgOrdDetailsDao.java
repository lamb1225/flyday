package web.pkg.pkg.dao;

import java.util.List;

import web.pkg.pkg.entity.PkgOrdDetails;
import web.pkg.pkg.entity.PkgOrdDetailsId;


public interface PkgOrdDetailsDao{
	
	int insert(PkgOrdDetails pkgOrdDetails);	
	int update(PkgOrdDetails pkgOrdDetails);
	
	PkgOrdDetails selectByPkgOrdDetailsId(Integer pkgOrdDetailsNo);
	
	List<PkgOrdDetails> selectAll();
	
	
}
