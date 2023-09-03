package web.pkg.pkgmanage.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.pkg.pkgmanage.dao.PkgPlanPicDao;
import web.pkg.pkgmanage.entity.PkgPlanPic;
import web.pkg.pkgmanage.service.PkgPlanPicService;

@Service
@Transactional
public class PkgPlanPicServiceImpl implements PkgPlanPicService{
	
	@Autowired
	private PkgPlanPicDao dao;
	
	@Override
	public PkgPlanPic register(PkgPlanPic pkgPlanPic) {
		dao.insert(pkgPlanPic);
		pkgPlanPic.setMessage("新增成功");
		pkgPlanPic.setSuccessful(true);
		return pkgPlanPic;
	}

	@Override
	public PkgPlanPic edit(PkgPlanPic pkgPlanPic) {
		final int result = dao.update(pkgPlanPic);
		pkgPlanPic.setSuccessful(result > 0);
		pkgPlanPic.setMessage(result > 0 ? "新增成功" : "新增失敗");
		return pkgPlanPic;
	}

	@Override
	public List<PkgPlanPic> findall(Integer pkgPlanNo) {
		return dao.selectByPkgPlanNo(pkgPlanNo);
	}

	@Override
	public boolean remove(Integer pkgPlanPicNo) {
		return dao.deleteById(pkgPlanPicNo) > 0;
	}

}
