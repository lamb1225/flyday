package web.mem.pkg.service;

import java.util.List;

import web.mem.pkg.entity.MemPkgCoup;

public interface MemPkgCoupService {
	MemPkgCoup add(MemPkgCoup memPkgCoup);
	MemPkgCoup update(MemPkgCoup memPkgCoup);
	List<MemPkgCoup> findAll();
	MemPkgCoup findById(Integer memPkgCoupNo);
	boolean remove (Integer memPkgCoupNo);
}
