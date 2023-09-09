package web.tkt.tktc.dao;

import java.util.List;

import web.tkt.tktc.entity.TktPass;

public interface TktPassDao {

	public void insert(TktPass tktPass);
	
	//查詢該會員單筆訂單的持有票券
	public List selectOrdNo(Integer memNo, Integer tktOrdNo);
	
}
