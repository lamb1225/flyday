package web.tkt.tktc.service;

import java.sql.Connection;
import java.util.List;

import web.tkt.tktc.dao.impl.TktOrdDaoImpl;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktOrd;

public class TktOrdService {
	
	TktOrdDaoImpl dao = new TktOrdDaoImpl();
	TktOrd tktOrd = null;
	
	public TktOrdService() {
		TktOrdDaoImpl dao = new TktOrdDaoImpl();
	}
	
	//新增訂單(同時新增訂單明細)
	public Integer insert(TktOrd tktOrd, List<TktJoin> tktJoinList) {
		Connection con = null;
		Integer tktOrdNo = null;
		
		try {
			con = dao.getConnectionForTx();
			con.setAutoCommit(false);
			
			//如果購物車為空，則不會commit
			if(!tktJoinList.isEmpty()) {
				tktOrdNo = dao.insert(tktOrd, con);
				dao.insert(tktOrdNo, tktJoinList, con);
			} else {
				throw new IllegalArgumentException("tktJoinList is empty, cannot perform insert.");
			}
			con.commit();
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return tktOrdNo;
	}
	
	public void update(Integer tktOrdNo, Integer ordStat) {
		dao.update(tktOrdNo, ordStat);
	}
	
	public TktOrd findByPrimaryKey(Integer tktOrdNo) {
		return dao.findByPrimaryKey(tktOrdNo);
	}
	
	public List<TktOrd> getAll(Integer memNo){
		return dao.getAll(memNo);
	}
	
	public List<TktOrd> getAll(){
		return dao.getAll();
	}
	
	//結帳的時候，要拿購物車裡所有清單
//	public List<TktJoin> selectByMemNo(Integer memNo){
//		TktShopCartService tktShopCartService = new TktShopCartService();
//		List<TktJoin> tktJoinList = tktShopCartService.selectByMemNo(memNo);
//		return tktJoinList;
//	}
	
}
