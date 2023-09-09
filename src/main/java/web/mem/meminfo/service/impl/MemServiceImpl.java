package web.mem.meminfo.service.impl;


import java.util.Base64;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.Part;
import javax.transaction.Transactional;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.regexp.recompile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.util.EmailSender;
import redis.clients.jedis.Jedis;
import web.mem.meminfo.dao.MemDao;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.service.MemService;
import web.mem.meminfo.util.MemComparator;

@Service
@Transactional
public class MemServiceImpl implements MemService {
	
	@Autowired
	private MemDao dao;
	
	@Override
	public Mem login(Mem mem) {

		final String memAcc = mem.getMemAcc();
		final String memPwd = DigestUtils.sha256Hex(mem.getMemPwd());
		
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
		
		if(mem.getMemAccStatus() == 0) {
			mem.setMessage("帳號未啟用，請收驗證信啟用帳號");
			mem.setSuccessful(false);
			return mem;
		}
		
		if(mem.getMemAccStatus() == 2) {
			mem.setMessage("帳號已停權，無法登入");
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
		String memPwdSha256 = DigestUtils.sha256Hex(mem.getMemPwd());
		mem.setMemPwd(memPwdSha256);
		
		if(dao.insert(mem) < 1) {
			mem.setMessage("註冊失敗，請聯絡管理員");
			mem.setSuccessful(false);
			return mem;
		};
		
		mem = dao.selectByMemAcc(mem.getMemAcc());
		mem.setMessage("註冊成功");
		mem.setSuccessful(true);
		return mem;
	}

	
	@Override
	public Mem updatePersonalInfo(Mem mem) {
		
		if(dao.selectByMemMobile(mem.getMemMobile()) != null 
				&& dao.selectByMemMobile(mem.getMemMobile()).getMemNo() !=  mem.getMemNo() ) {
			mem.setMessage("手機號碼重複");
			mem.setSuccessful(false);
			return mem;
		}
		
		if(dao.updateMemInfo(mem) < 1) {
			mem.setMessage("變更失敗，請聯絡管理員");
			mem.setSuccessful(false);
			return mem;
		}
		
		mem.setMessage("修改成功");
		mem.setSuccessful(true);
		return mem;
		
	}

	@Override
	public Mem changePersonalImage(byte[] memPic, Integer memNo) {
		
		Mem mem = new Mem();

		if(dao.updateMemImage(memPic, memNo) < 1) {
			mem.setMessage("圖片變更失敗，請聯絡管理員");
			mem.setSuccessful(false);
			return mem;
		}
		
		mem.setMessage("圖片修改成功");
		mem.setSuccessful(true);
		return mem;
		
	}

	@Override
	public Mem isEmailDuplicated(Mem mem) {
		if(dao.selectByMemEmail(mem.getMemEmail()) != null){
			
			mem.setMessage("此Email信箱已註冊！");
			mem.setSuccessful(false);
			return mem;
		}
		
		mem.setMessage("Email可使用！");
		mem.setSuccessful(true);
		return mem;
	}
	
	@Override
	public Mem checkEmailExists(String memEmail) {
		return dao.selectByMemEmail(memEmail);
	}

	@Override
	public Mem renewEmail(String verificationInput, String myNewEmail, Integer memNo) {
		
		Mem mem = new Mem();
		
		try(Jedis jedis = new Jedis();){
			if(verificationInput.equals(jedis.get(myNewEmail))) {
				int result = dao.updateMemEmail(myNewEmail, memNo);
				if(result < 1) {
					mem.setMessage("信箱更新失敗，請聯絡管理員");
					mem.setSuccessful(false);
					return mem;
				};
			}else {
				mem.setMessage("驗證碼輸入錯誤或驗證碼已失效");
				mem.setSuccessful(false);
				return mem;
			}
		}
		mem.setMessage("信箱變更成功！");
		mem.setSuccessful(true);
		return mem;
		
	}

	@Override
	public int renewPwd(String newMemPwd, Integer memNo) {
		return dao.updateMemPassword(newMemPwd, memNo);
	}

	@Override
	public Mem checkMemInfoByMemNo(Integer memNo) {
		return dao.selectByMemNo(memNo);
	}

	@Override
	public int activateAccStatus(Integer memNo) {
		return dao.updateMemAccStatus(1, memNo);
	}

	@Override
	public List<Mem> listAllMems() {
		return dao.selectAll();
	}
	
	@Override
	public List<Mem> listByAccStatus(Integer AccStatus) {
		return dao.selectByAccStatus(AccStatus);
	}

	@Override
	public List<Mem> listBySearch(String searchContent) {
		List<Mem> memList; //最後要回傳的會員資料 
		
		List<Mem> memAccList = dao.selectByMemAccLike(searchContent);
		memList = memAccList;	//將模糊查詢到的帳號資料加入回傳資料中
		
		List<Mem> memEmailList = dao.selectByMemEmailLike(searchContent);
		x:
		for(Mem memEmail : memEmailList) {	
			for(Mem mem : memList) {	
				if(memEmail.getMemNo() == mem.getMemNo()) {
					continue x;
				}
			}
			memList.add(memEmail);	//將模糊查詢到的手機資料去除重複值加入回傳資料中
		}
		
		List<Mem> memMobileList = dao.selectByMemMobileLike(searchContent);
		y:
		for(Mem memMobile : memMobileList) {	
			for(Mem mem : memList) {	
				if(memMobile.getMemNo() == mem.getMemNo()) {
					continue y;
				}
			}
			memList.add(memMobile);	//將模糊查詢到的手機資料去除重複值加入回傳資料中
		}	
		
		MemComparator memComparator = new MemComparator();
		Collections.sort(memList,memComparator);	//將傳入的陣列資料重新依照會員編號進行排序
		
		return memList;
	}

	@Override
	public int updateAllStatus(Integer memAccStatus, Integer memActStatus, Integer memNo) {
		return dao.updateMemAccAndActStatus(memAccStatus, memActStatus, memNo);
	}
	
}
