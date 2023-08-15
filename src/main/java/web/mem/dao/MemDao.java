package web.mem.dao;

import java.util.List;

import web.mem.entity.Mem;

public interface MemDao {
	
	int insert(Mem mem);

	int delectByMemNo(Integer memNo);
	
	int update(Mem mem);
	
	Mem selectByMemNo(Integer memNo);
	
	Mem selectByMemAcc(String memAcc);
	
	Mem selectByMemEmail(String memEmail);
	
	Mem selectByMemMobile(String memMobile);
	
	Mem selectAccAndPwd(String memAcc, String memPwd);
	
	List<Mem> selectAll();
	
}
