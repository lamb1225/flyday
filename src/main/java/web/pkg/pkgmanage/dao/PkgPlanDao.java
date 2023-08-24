package web.pkg.pkgmanage.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkgmanage.entity.PkgPlan;

public interface PkgPlanDao extends CoreDao<PkgPlan, Integer>{
	List<PkgPlan> selectByPkgNo(String pkgNo);
}
