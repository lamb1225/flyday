package web.tkt.tktc.service;

import java.util.List;

import web.tkt.tktc.dao.impl.TktShopCartDaoImpl;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktShopCart;

public class TktShopCartService {
	
	TktShopCartDaoImpl dao = new TktShopCartDaoImpl();
	TktShopCart tktShopCart = null;
	
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
	
	//刪除票券
	public void delete(Integer memNo, Integer tktTypeNo) {
		dao.delete(memNo, tktTypeNo);
	}
	
	//給結帳用的，清空購物車
	public void delete(Integer memNo) {
		dao.delete(memNo);
	}
	
	//修改票券
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
	
	//查詢會員購物車清單
	public List<TktJoin> selectByMemNo(Integer memNo){
		return dao.selectByMemNo(memNo);
	}
	
	// 取得購物車總價(目前沒用到)
	public int getTotalPrice(List<TktJoin> tktJoinList) {
		int totalPrice = 0;
		for(TktJoin cartItem : tktJoinList) {
			totalPrice += (cartItem.getTktQty() * cartItem.getPrice());
		}
		return totalPrice;
	}
	
}
