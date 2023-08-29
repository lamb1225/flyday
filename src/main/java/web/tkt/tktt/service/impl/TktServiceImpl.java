package web.tkt.tktt.service.impl;

import java.util.List;

import web.tkt.tktt.dao.TktDAO;
import web.tkt.tktt.dao.impl.TktDAOImpl;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.service.TktService;

public class TktServiceImpl implements TktService{
	
	private TktDAO dao = new TktDAOImpl();

	@Override
	public Tkt addtkt(Tkt tkt) {

		if(tkt.getTktname() == null) {
			tkt.setMessage("標題名稱未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getTktstartdate() == null) {
			tkt.setMessage("未選擇商品開始日期");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getTktenddate() == null) {
			tkt.setMessage("未選擇商品結束日期");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getTktinstruction() == null) {
			tkt.setMessage("商品簡介未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getProddesc() == null) {
			tkt.setMessage("景點簡介未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getNotice() == null) {
			tkt.setMessage("購買須知未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getHowuse() == null) {
			tkt.setMessage("如何使用未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}		
		if(tkt.getLocation() == null) {
			tkt.setMessage("景點名稱未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getCountycity() == null) {
			tkt.setMessage("縣市未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}
		if(tkt.getAddress() == null) {
			tkt.setMessage("地址未輸入");
			tkt.setSuccessful(false);
			return tkt;			
		}		
		if(tkt.getTktsort() == null) {
			tkt.setMessage("票券類型未選擇");
			tkt.setSuccessful(false);
			return tkt;			
		}
		
		if(dao.insert(tkt) < 1) {
			tkt.setMessage("新增失敗");
			tkt.setSuccessful(false);
			return tkt;
		}
				
		tkt.setMessage("新增成功");
		tkt.setSuccessful(true);		
		return tkt;		
	}

	@Override
	public List<Tkt> findAll() {
		System.out.println("有來到findAll()");
		return dao.getAll();
	}


	


}
