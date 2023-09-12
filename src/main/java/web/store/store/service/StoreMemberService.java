package web.store.store.service;

import java.util.List;

import web.store.store.entity.Store;

public interface StoreMemberService {
	Store register(Store store);

	Store login(Store store);
	
	Store edit(Store store);
	
	List<Store> findAll();
	
	boolean remove(Integer storeNo);
	
	boolean save(Store store);
	
	Store editpic(byte[] storePic, Integer storeNo);
	
	Store editReview(Store store);
}
