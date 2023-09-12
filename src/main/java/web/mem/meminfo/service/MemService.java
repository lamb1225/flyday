package web.mem.meminfo.service;

import java.util.List;

import javax.servlet.http.Part;

import web.mem.meminfo.entity.Mem;

public interface MemService {

	Mem login(String memAcc, String memPwd);
	
	Mem register(Mem mem);
	
	Mem updatePersonalInfo(Mem mem);
	
	Mem changePersonalImage(byte[] memPic, Integer memNo);
	
	Mem isEmailDuplicated(Mem mem);
	
	Mem checkEmailExists(String memEmail);
	
	Mem renewEmail(String verificationInput, String myNewEmail, Integer memNo);
	
	int renewPwd(String newMemPwd, Integer memNo);
	
	Mem checkMemInfoByMemNo(Integer memNo);
	
	int activateAccStatus(Integer memNo);
	
	List<Mem> listAllMems();
	
	List<Mem> listByAccStatus(Integer AccStatus);
	
	List<Mem> listBySearch(String searchContent);
	
	int updateAllStatus(Integer memAccStatus, Integer memActStatus, Integer memNo);
	 
	
}
