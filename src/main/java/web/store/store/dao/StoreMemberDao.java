package web.store.store.dao;

import core.dao.CoreDao;
import web.store.store.entity.Store;

public interface StoreMemberDao extends CoreDao<Store, Integer> {
	Store selectByStoreAcc(String storeacc);
	
	Store selectForLogin(String storeacc, String storepwd);
}
