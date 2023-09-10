package web.mem.meminfo.test;		//把資料庫密碼取出加密後放回去

import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;

import web.mem.meminfo.entity.Mem;

public class Sha256Encoded {
	
	public static void main(String[] args) {
		
		MemDaoImplJDBC dao = new MemDaoImplJDBC();
		
		List<Mem> memList = dao.selectAll();
		
		for(Mem mem : memList) {
			String memPwd = mem.getMemPwd();
			String memPwdSha256 = DigestUtils.sha256Hex(memPwd);
			mem.setMemPwd(memPwdSha256);
			dao.updateMemPassword(memPwdSha256, mem.getMemNo());
		}
		
	}

}
