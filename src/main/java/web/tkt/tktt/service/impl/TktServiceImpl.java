package web.tkt.tktt.service.impl;

import java.util.List;

import web.tkt.tktt.dao.TktDAO;
import web.tkt.tktt.dao.impl.TktDAOImpl;
import web.tkt.tktt.entity.PlanType;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktImg;
import web.tkt.tktt.entity.TktJoinPrice;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;
import web.tkt.tktt.service.TktService;

public class TktServiceImpl implements TktService{
	
	private TktDAO dao = new TktDAOImpl();
	
	// 新增商品
	@Override
	public Tkt addtkt(Tkt tkt) {
		dao.insertTkt(tkt);
		return tkt;		
	}
	
	// 新增圖片
	@Override
	public TktImg addtktimg(TktImg tktimg) {
		dao.insertImg(tktimg);
		return tktimg;
	}

	// 新增方案
	@Override
	public TktPlan addtktplan(TktPlan tktplan) {
		dao.insertPlan(tktplan);
		return tktplan;	
	}
	
	// 新增票種
	@Override
	public TktType addtkttype(TktType tkttype) {
		dao.insertType(tkttype);
		return tkttype;
	}
	
	// 修改商品
	@Override
	public Tkt editTkt(Tkt tkt) {
		dao.updateTkt(tkt);
		return tkt;
	}

	// 修改方案
	@Override
	public PlanType editTktPlan(PlanType planType) {
		System.out.println("有來到editTktPlan()");
		dao.updateTktPlan(planType);;
		return planType;
	}
	
	// 查詢該票券編號的商品內容
	@Override
	public Tkt findTktDetial(Integer tktno) {
		return dao.findByPK(tktno);
	}
	
	// 查詢該方案編號的方案內容
	@Override
	public PlanType findTktPlanDetial(Integer tktplanno) {
		System.out.println("有來到findTktPlanDetial()");		
		return dao.findPlanByPK(tktplanno);
	}

	// 查詢該票券編號的所有圖片
	@Override
	public List<TktImg> findTktImgDetial(Integer tktno) {
		return dao.getTktImg(tktno);
	}
	
	// 查詢全部Tkt
	@Override
	public List<Tkt> findAll() {
		System.out.println("有來到findAll()");
		return dao.getAll();
	}

	// 查詢全部TktImg
	@Override
	public List<TktImg> findAllImg() {
		System.out.println("有來到findAllImg()");
		return dao.getAllImg();
	}

	// 查詢該票券編號的方案&票種
	@Override
	public List<PlanType> findAllPlayType(Integer tktno) {
		System.out.println("有來到findAllPlayType()");
		return dao.getAllPlanType(tktno);
	}

	// 查詢全部Tkt和最低票價
	@Override
	public List<TktJoinPrice> findAllTktLowPrice() {
		System.out.println("有來到findAllTktLowPrice()");
		return dao.getAllTktLowPrice();
	}






}
