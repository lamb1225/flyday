package web.pkg.pkgmanage.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkgmanage.entity.PkgPlanDetails;

public interface PkgPlanDetailsDao extends CoreDao<PkgPlanDetails, Integer>{
	List<PkgPlanDetails> selectByPkgPlanNo(Integer pkgPlanNo);
}
