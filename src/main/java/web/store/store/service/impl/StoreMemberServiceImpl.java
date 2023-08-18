package web.store.store.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.store.store.dao.StoreMemberDao;
import web.store.store.entity.StoreMember;
import web.store.store.service.StoreMemberService;

@Service
@Transactional
public class StoreMemberServiceImpl implements StoreMemberService{
	
	@Autowired
	private StoreMemberDao dao;

	@Override
	public StoreMember register(StoreMember storeMember) {
		if (storeMember.getStoreAcc() == null) {
			storeMember.setMessage("帳號未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}

		if (storeMember.getStorePwd() == null) {
			storeMember.setMessage("密碼未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}

		if (storeMember.getStoreName() == null) {
			storeMember.setMessage("廠商名稱未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}
		
		if (storeMember.getStoreTel() == null) {
			storeMember.setMessage("公司電話未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}
		
		if (storeMember.getStoreAdd() == null) {
			storeMember.setMessage("公司地址未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}
		
		if (storeMember.getStoreEmail() == null) {
			storeMember.setMessage("公司信箱未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}		

		if (dao.selectByStoreAcc(storeMember.getStoreAcc()) != null) {
			storeMember.setMessage("帳號重複");
			storeMember.setSuccessful(false);
			return storeMember;
		}		

		storeMember.setMessage("註冊成功");
		storeMember.setSuccessful(true);

		return storeMember;
	}

	@Override
	public StoreMember login(StoreMember storeMember) {
		final String storeacc = storeMember.getStoreAcc();
		final String storepwd = storeMember.getStorePwd();

		if (storeacc == null) {
			storeMember.setMessage("使用者名稱未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}

		if (storepwd == null) {
			storeMember.setMessage("密碼未輸入");
			storeMember.setSuccessful(false);
			return storeMember;
		}

		storeMember = dao.selectForLogin(storeacc, storepwd);
		if (storeMember == null) {
			storeMember = new StoreMember();
			storeMember.setMessage("使用者名稱或密碼錯誤");
			storeMember.setSuccessful(false);
			return storeMember;
		}

		storeMember.setMessage("登入成功");
		storeMember.setSuccessful(true);
		return storeMember;
	}

	@Override
	public StoreMember edit(StoreMember storeMember) {
		final StoreMember oMember = dao.selectByStoreAcc(storeMember.getStoreAcc());
		storeMember.setAccStatus(oMember.getAccStatus());
		storeMember.setStoreReply(oMember.getStoreReply());
		storeMember.setStoreReview(oMember.getStoreReview());
		storeMember.setStoreNote(oMember.getStoreNote());
		storeMember.setStoreAcc(storeMember.getStoreAcc());
		final int resultCount = dao.update(storeMember);
		storeMember.setSuccessful(resultCount > 0);
		storeMember.setMessage(resultCount > 0 ? "修改成功" : "修改失敗");
		return storeMember;
	}

	@Override
	public List<StoreMember> findAll() {
		return dao.selectAll();
	}

	@Override
	public boolean remove(Integer storeNo) {
		return dao.deleteById(storeNo) > 0;
	}

	@Override
	public boolean save(StoreMember storeMember) {
		return dao.update(storeMember) > 0;
	}

	

	
}


