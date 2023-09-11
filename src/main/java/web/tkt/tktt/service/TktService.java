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
	
	Tkt findTktDetial(Integer tktno);
	
	List<TktImg> findTktImgDetial(Integer tktno);

	List<Tkt> findAll();
	
	List<TktImg> findAllImg();
	
	List<PlanType> findAllPlayType(Integer tktno);
	
	List<TktJoinPrice> findAllTktLowPrice();
	

}
