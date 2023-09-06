package web.pkg.pkgmanage.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.pkg.pkgmanage.dao.PkgPlanDao;
import web.pkg.pkgmanage.entity.PkgPlan;
import web.pkg.pkgmanage.service.PkgPlanService;

@Service
@Transactional
public class PkgPlanServiceImpl implements PkgPlanService{
	
	@Autowired
	private PkgPlanDao dao;

	@Override
	public PkgPlan register(PkgPlan pkgPlan) {
		dao.insert(pkgPlan);
		pkgPlan.setMessage("新增成功");
		pkgPlan.setSuccessful(true);
		return pkgPlan;
	}

	@Override
	public PkgPlan edit(PkgPlan pkgPlan) {
		final int result = dao.update(pkgPlan);
		pkgPlan.setSuccessful(result > 0);
		pkgPlan.setMessage(result > 0 ? "修改成功" : "修改失敗");
		return pkgPlan;
	}

	@Override
	public List<PkgPlan> findall(Integer pkgNo) {
		return dao.selectByPkgNo(pkgNo);
	}

	@Override
	public PkgPlan select(Integer pkgPlanNo) {
		return dao.selectById(pkgPlanNo);
	}
	

	
}
