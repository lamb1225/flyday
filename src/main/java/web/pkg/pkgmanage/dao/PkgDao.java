package web.pkg.pkgmanage.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkgmanage.entity.Pkg;

public interface PkgDao extends CoreDao<Pkg, Integer>{
	Pkg selectByPkgNo(String pkgNo);
	
	List<Pkg> selectByStoreNo(String storeNo); 
}
