package web.mem.meminfo.service;

import javax.servlet.http.Part;

import web.mem.meminfo.entity.Mem;

public interface MemService {

	Mem login(Mem mem);
	
	Mem register(Mem mem);
	
	Mem updatePersonalInfo(Mem mem);
	
	Mem changePersonalImage(byte[] memPic, Integer memNo);
	
	Mem checkEmail(Mem mem);
	
	Mem renewEmail(String verificationInput, String myNewEmail, Integer memNo);
	
}
