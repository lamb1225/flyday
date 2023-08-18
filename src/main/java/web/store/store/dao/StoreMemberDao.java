package web.store.store.dao;

import core.dao.CoreDao;
import web.store.store.entity.StoreMember;

public interface StoreMemberDao extends CoreDao<StoreMember, Integer> {
	StoreMember selectByStoreAcc(String storeacc);
	
	StoreMember selectForLogin(String storeacc, String storepwd);
}
