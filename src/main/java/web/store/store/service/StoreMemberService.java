package web.store.store.service;

import java.util.List;

import web.store.store.entity.StoreMember;

public interface StoreMemberService {
	StoreMember register(StoreMember storeMember);

	StoreMember login(StoreMember storeMember);
	
	StoreMember edit(StoreMember storeMember);
	
	List<StoreMember> findAll();
	
	boolean remove(Integer storeNo);
	
	boolean save(StoreMember storeMember);
}
