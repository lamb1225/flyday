package web.tkt.tktt.dao;

import java.util.List;

import web.tkt.tktt.entity.PlanType;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktImg;
import web.tkt.tktt.entity.TktJoinPrice;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;

public interface TktDAO {
	
	public void insertTkt(Tkt tkt);
	
	public void insertPlan(TktPlan tktplan);
	
	public void insertType(TktType tkttype);
	
	public void insertImg(TktImg tktimg);	
	
	public void updateTkt(Tkt tkt);
	
	public void updateTktPlan(PlanType planType);
	
	public Tkt findByPK(Integer tktno);
	
	public PlanType findPlanByPK(Integer tktplanno);
	
	public List<TktImg> getTktImg(Integer tktno);
	
	public List<Tkt> getAll();
	
	public List<TktImg> getAllImg();
	
	public List<PlanType> getAllPlanType(Integer tktno);
	
	public List<TktJoinPrice> getAllTktLowPrice();		

}
