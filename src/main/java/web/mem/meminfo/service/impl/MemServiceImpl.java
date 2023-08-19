package web.mem.meminfo.service.impl;


import javax.transaction.Transactional;

import org.apache.regexp.recompile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.mem.meminfo.dao.MemDao;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;

@Service
@Transactional
public class MemServiceImpl implements MemService {
	
	@Autowired
	private MemDao dao;
	
	@Override
	public Mem login(Mem mem) {

		final String memAcc = mem.getMemAcc();
		final String memPwd = mem.getMemPwd();
		
		if(memAcc == null || memAcc.trim().isEmpty()) {
			mem.setMessage("帳號未輸入");
			mem.setSuccessful(false);
			return mem;
		}
		
		if(memPwd == null || memPwd.trim().isEmpty()) {
			mem.setMessage("密碼未輸入");
			mem.setSuccessful(false);
			return mem;
		}
		
		mem = dao.selectAccAndPwd(memAcc, memPwd);
		if(mem == null) {
			mem = new Mem();
			mem.setMessage("使用者名稱或密碼錯誤");
			mem.setSuccessful(false);
			return mem;
		}
		
		mem.setMessage("登入成功");
		mem.setSuccessful(true);
		return mem;
	}

	@Override
	public Mem register(Mem mem) {
		
		if(dao.selectByMemAcc(mem.getMemAcc()) != null) {
			mem.setMessage("帳號重複");
			mem.setSuccessful(false);
			return mem;
		}
		
		if(dao.selectByMemEmail(mem.getMemEmail()) != null) {
			mem.setMessage("電子信箱重複");
			mem.setSuccessful(false);
			return mem;
		}
		
		if(dao.selectByMemMobile(mem.getMemMobile()) != null) {
			mem.setMessage("手機號碼重複");
			mem.setSuccessful(false);
			return mem;
		}
		
		mem.setMemAccStatus(0);
		mem.setMemLevelNo(1);
		mem.setMemActStatus(0);
		
		if(dao.insert(mem) < 1) {
			mem.setMessage("註冊失敗，請聯絡管理員");
			mem.setSuccessful(false);
			return mem;
		};
		mem.setMessage("註冊成功");
		mem.setSuccessful(true);
		return mem;
	}

}
