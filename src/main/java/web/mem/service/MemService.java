package web.mem.service;

import web.mem.entity.Mem;

public interface MemService {

	Mem login(Mem mem);
	
	Mem register(Mem mem);
	
}
