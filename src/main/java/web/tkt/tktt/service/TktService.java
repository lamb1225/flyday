package web.tkt.tktt.service;

import java.util.List;

import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;

public interface TktService {

	Tkt addtkt(Tkt tkt);
	
	TktPlan addtktplan(TktPlan tktplan);
	
	TktType addtkttype(TktType tkttype);

	List<Tkt> findAll();

}
