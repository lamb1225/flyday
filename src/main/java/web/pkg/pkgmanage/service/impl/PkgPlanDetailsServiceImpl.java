package web.pkg.pkgmanage.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.pkg.pkgmanage.dao.PkgPlanDetailsDao;
import web.pkg.pkgmanage.entity.PkgPlanDetails;
import web.pkg.pkgmanage.service.PkgPlanDetailsService;

@Service
@Transactional
public class PkgPlanDetailsServiceImpl implements PkgPlanDetailsService{
	
	@Autowired
	private PkgPlanDetailsDao dao;

	@Override
	public PkgPlanDetails register(PkgPlanDetails pkgPlanDetails) {
		dao.insert(pkgPlanDetails);
		pkgPlanDetails.setMessage("新增成功");
		pkgPlanDetails.setSuccessful(true);
		return pkgPlanDetails;
	}

	@Override
	public PkgPlanDetails edit(PkgPlanDetails pkgPlanDetails) {
		final int result = dao.update(pkgPlanDetails);
		pkgPlanDetails.setSuccessful(result > 0);
		pkgPlanDetails.setMessage(result > 0 ? "修改成功" : "修改失敗");
		return pkgPlanDetails;
	}

	@Override
	public List<PkgPlanDetails> findall(Integer pkgPlanNo) {
		return dao.selectByPkgPlanNo(pkgPlanNo);
	}

	@Override
	public PkgPlanDetails select(Integer pkgPlanDetailsNo) {
		return dao.selectById(pkgPlanDetailsNo);
	}

}
