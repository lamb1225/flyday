package web.pkg.pkgmanage.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.pkg.pkgmanage.dao.PkgPicDao;
import web.pkg.pkgmanage.entity.PkgPic;
import web.pkg.pkgmanage.service.PkgPicService;

@Service
@Transactional
public class PkgPicServiceImpl implements PkgPicService{
	
	@Autowired
	private PkgPicDao dao;

	@Override
	public PkgPic register(PkgPic pkgPic) {
		dao.insert(pkgPic);
		pkgPic.setMessage("新增成功");
		pkgPic.setSuccessful(true);
		return pkgPic;
	}

	@Override
	public PkgPic edit(PkgPic pkgPic) {
		final int result = dao.update(pkgPic);
		pkgPic.setSuccessful(result > 0);
		pkgPic.setMessage(result > 0 ? "修改成功" : "修改失敗");
		return pkgPic;
	}

	@Override
	public List<PkgPic> findall(String pkgNo) {
		return dao.selectByPkgNo(pkgNo);
	}

	@Override
	public boolean remove(Integer pkgPicNo) {
		return dao.deleteById(pkgPicNo) > 0;
	}

}
