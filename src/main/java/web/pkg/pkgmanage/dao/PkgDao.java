package web.pkg.pkgmanage.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkgmanage.entity.Pkg;

public interface PkgDao extends CoreDao<Pkg, Integer>{
	Pkg selectByPkgNo(Integer pkgNo);
	
	List<Pkg> selectByStoreNo(Integer storeNo); 
	
	int updateReview(Pkg pkg);
	
	int updateComment(Pkg pkg);
}
