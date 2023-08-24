package web.mem.meminfo.service;

import web.mem.meminfo.entity.Mem;

public interface MemService {

	Mem login(Mem mem);
	
	Mem register(Mem mem);
	
	Mem updatePersonalInfo(Mem mem);
	
}
