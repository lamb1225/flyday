package web.tkt.tktc.service;

import java.util.List;

import web.tkt.tktc.dao.impl.TktOrdDetailsDaoImpl;
import web.tkt.tktc.entity.TktOrdDetails;
import web.tkt.tktc.entity.TktOrdDetailsJoin;

public class TktOrdDetailsService {

	TktOrdDetailsDaoImpl dao = new TktOrdDetailsDaoImpl();
	TktOrdDetails tktOrdDetails = null;
	
	public void update(Integer tktOrdNo, Integer tktTypeNo) {
		dao.update(tktOrdNo, tktTypeNo);
	}
	
	public TktOrdDetails findByPrimarkeyDetails(Integer tktOrdNo, Integer tktTypeNo) {
		return dao.findByPrimarkeyDetails(tktOrdNo, tktTypeNo);
	}
	
	public List<TktOrdDetails> getAll(Integer tktOrdNo){
		return dao.getAll(tktOrdNo);
	}
	
	//可以取得多筆明細的所有資訊
	public List<TktOrdDetailsJoin> selectByTktOrdNo(Integer tktOrdNo){
		return dao.selectByTktOrdNo(tktOrdNo);
	}
}
