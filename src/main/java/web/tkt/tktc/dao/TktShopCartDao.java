package web.tkt.tktc.dao;

import java.util.*;
import web.tkt.tktc.entity.*;

public interface TktShopCartDao {
	
	public void insert(TktShopCart tktShopCart);
	
	public void delete(Integer memNo, Integer tktTypeNo);
	
	public void delete(Integer memNo);

	public void update(TktShopCart tktshopCart);
	
	public TktShopCart findByPrimaryKey(Integer memNo, Integer tktTypeNo);

	public List<TktShopCart> getAll(Integer memNo); //可能會刪除
	
	public List<TktJoin> selectByMemNo(Integer memNo);
}
