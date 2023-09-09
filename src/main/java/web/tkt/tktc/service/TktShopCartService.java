package web.tkt.tktc.service;

import java.util.ArrayList;
import java.util.List;

import com.oracle.wls.shaded.org.apache.bcel.generic.RETURN;

import web.tkt.tktc.dao.TktShopCartDao;
import web.tkt.tktc.dao.impl.TktShopCartDaoImpl;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktShopCart;

public class TktShopCartService {
	
	TktShopCartDaoImpl dao = new TktShopCartDaoImpl();
	TktShopCart tktShopCart = null;

	public TktShopCartService() {
		TktShopCartDaoImpl dao = new TktShopCartDaoImpl();
	}
	
	//新增票券
	public TktShopCart addTktShopCart(Integer memNo, Integer tktTypeNo, Integer tktQty) {
		TktShopCart tktShopCart = new TktShopCart();
		TktShopCart existTkt = dao.findByPrimaryKey(memNo, tktTypeNo);
		tktShopCart.setMemNo(memNo);
		tktShopCart.setTktTypeNo(tktTypeNo);
		tktShopCart.setTktQty(tktQty);
		
		//先查詢購物車是否有一樣的票種，沒有的話新增一筆，有的話增加數量
		if(existTkt == null) {
			dao.insert(tktShopCart);
		}else {
			Integer currentAmount = existTkt.getTktQty();
			tktShopCart.setTktQty(currentAmount + tktQty);
			dao.update(tktShopCart);
		}
		return tktShopCart;
	}
	
	//刪除票券(還未測試)
	public void delete(Integer memNo, Integer tktTypeNo) {
		dao.delete(memNo, tktTypeNo);
	}
	
	//給結帳用的，清空購物車
	public void delete(Integer memNo) {
		dao.delete(memNo);
	}
	
	//修改票券(還未測試)
	public TktShopCart update(Integer memNo, Integer tktTypeNo, Integer tktQty) {
		TktShopCart tktShopCart = new TktShopCart();
		
		tktShopCart.setMemNo(memNo);
		tktShopCart.setTktTypeNo(tktTypeNo);
		tktShopCart.setTktQty(tktQty);
		Integer currentAmount = tktShopCart.getTktQty();
		
		//判斷票種數量為0，如為0則刪除該票種
		if(currentAmount == 0) {
			dao.delete(memNo, tktTypeNo);
		}else {
			dao.update(tktShopCart);
		}
		return tktShopCart;
	}
	
	//查詢單一票種
	public TktShopCart findByPrimaryKey(Integer memNo, Integer tktTypeNo) {
		return dao.findByPrimaryKey(memNo, tktTypeNo);
	}
	
	//查詢會員購物車清單(可以刪除，被join後的list取代)
	public List<TktShopCart> getAll(Integer memNo){
		return dao.getAll(memNo);
	}
	
	// 取得所有購物車裡票種流水號，可以拿去比對票種資訊(可以刪除，被join後的list取代)但join圖片也許可以參考
//	public static List<Integer> getTktTypeNoList(List<TktShopCart> tktShopCartList){
//		List<Integer> tktTypeNoList = new ArrayList<>();
//		for (TktShopCart tktShopCart : tktShopCartList) {
//			tktTypeNoList.add(tktShopCart.getTktTypeNo());
//		}
//		return tktTypeNoList;
//	}
	
	//查詢會員購物車清單
	public List<TktJoin> selectByMemNo(Integer memNo){
		return dao.selectByMemNo(memNo);
	}
	
	// 取得購物車總價(測試有成功，但還是有點問題 ，目前沒用到)
	public int getTotalPrice(List<TktJoin> tktJoinList) {
		int totalPrice = 0;
		for(TktJoin cartItem : tktJoinList) {
			totalPrice += (cartItem.getTktQty() * cartItem.getPrice());
		}
		return totalPrice;
	}
	
}
