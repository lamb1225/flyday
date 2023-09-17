package web.tkt.tktt.service;

import java.util.List;

import web.tkt.tktt.entity.PlanType;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktImg;
import web.tkt.tktt.entity.TktJoinPrice;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;

public interface TktService {

	Tkt addtkt(Tkt tkt);
	
	TktPlan addtktplan(TktPlan tktplan);
	
	TktType addtkttype(TktType tkttype);
	
	TktImg addtktimg(TktImg tktimg);
	
	Tkt editTkt(Tkt tkt);
	
	Tkt editTktStat(Tkt tkt);
	
	PlanType editTktPlan(PlanType planType);
	
	PlanType editTktPlanStat(PlanType planType);
	
	PlanType editTktType(PlanType planType);
	
	Tkt findTktDetial(Integer tktno);
	
	PlanType findTktPlanDetial(Integer tktplanno);
	
	List<TktImg> findTktImgDetial(Integer tktno);

	List<Tkt> findAll();
	
	List<TktImg> findAllImg();
	
	List<PlanType> findAllPlayType(Integer tktno);
	
	List<TktJoinPrice> findAllTktLowPrice();
	

}
