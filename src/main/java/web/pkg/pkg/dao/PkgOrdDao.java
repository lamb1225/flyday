package web.pkg.pkg.dao;
import java.util.*;

import core.dao.CoreDao;
import web.pkg.pkg.entity.PkgOrd;

public interface PkgOrdDao extends CoreDao<PkgOrd, Integer> {
	int insert(PkgOrd pkgOrd);
//	
//	int deleteByPkgOrdNo(Integer PkgOrdNo);
//	
//	int update(PkgOrd pkgOrd);
//	
//	PkgOrd selectByPkgOrdNo(Integer pkgOrdNo);
//	PkgOrd selectByPkgMemNo(Integer pkgMemNo);
//
//	
//	List<PkgOrd> selectAll();

}
