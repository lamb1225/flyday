package web.pkg.pkg.dao;

import java.util.List;

import core.dao.CoreDao;
import web.pkg.pkg.entity.PkgComment;
import web.pkg.pkg.entity.PkgOrdDetails;

public interface PkgCommentDao{
	
	int insert(PkgComment pkgComment);	
	int update(PkgComment pkgComment);
	
	PkgComment selectByPkgCommentNo(Integer pkgCommentNo);
	
	List<PkgComment> selectAll();
	
}
