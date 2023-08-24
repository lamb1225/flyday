package web.pkg.pkgmanage.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkgmanage.entity.PkgPlanPic;

public interface PkgPlanPicDao extends CoreDao<PkgPlanPic, Integer>{
	List<PkgPlanPic> selectByPkgPlanNo(String pkgPlanNo);
}
