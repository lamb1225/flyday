package web.pkg.pkgmanage.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkgmanage.entity.PkgPic;

public interface PkgPicDao extends CoreDao<PkgPic, Integer>{
	List<PkgPic> selectByPkgNo(Integer pkgNo);
}
