package web.store.store.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.store.store.dao.StoreMemberDao;
import web.store.store.entity.Store;
import web.store.store.service.StoreMemberService;

@Service
@Transactional
public class StoreMemberServiceImpl implements StoreMemberService{
	
	@Autowired
	private StoreMemberDao dao;

	@Override
	public Store register(Store store) {
		

		if (dao.selectByStoreAcc(store.getStoreAcc()) != null) {
			store.setMessage("帳號重複");
			store.setSuccessful(false);
			return store;
		}		
		
		store.setAccStatus(0);
		store.setStoreReply(null);
		store.setStoreReview(0);
		store.setStoreNote(null);
		dao.insert(store);
		

		store.setMessage("註冊成功");
		store.setSuccessful(true);

		return store;
	}

	@Override
	public Store login(Store store) {
		final String storeAcc = store.getStoreAcc();
		final String storePwd = store.getStorePwd();

		if (storeAcc == null || storeAcc.trim().isEmpty()) {
			store.setMessage("帳號未輸入");
			store.setSuccessful(false);
			return store;
		}

		if (storePwd == null || storePwd.trim().isEmpty()) {
			store.setMessage("密碼未輸入");
			store.setSuccessful(false);
			return store;
		}

		store = dao.selectForLogin(storeAcc, storePwd);
		if (store == null) {
			store = new Store();
			store.setMessage("使用者名稱或密碼錯誤");
			store.setSuccessful(false);
			return store;
		}

		store.setMessage("登入成功");
		store.setSuccessful(true);
		return store;
	}

	@Override
	public Store edit(Store store) {
		final Store oStore = dao.selectByStoreAcc(store.getStoreAcc());
		store.setAccStatus(oStore.getAccStatus());
		store.setStoreReview(oStore.getStoreReview());
		store.setStoreNote(oStore.getStoreNote());
		store.setStoreAcc(store.getStoreAcc());
		final int resultCount = dao.update(store);
		store.setSuccessful(resultCount > 0);
		store.setMessage(resultCount > 0 ? "修改成功" : "修改失敗");
		return store;
	}

	@Override
	public List<Store> findAll() {
		return dao.selectAll();
	}

	@Override
	public boolean remove(Integer storeNo) {
		return dao.deleteById(storeNo) > 0;
	}

	@Override
	public boolean save(Store store) {
		return dao.update(store) > 0;
	}

	

	
}


