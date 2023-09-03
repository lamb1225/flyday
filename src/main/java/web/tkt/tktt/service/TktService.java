package web.tkt.tktt.service;

import java.util.List;

import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktPlan;

public interface TktService {

	Tkt addtkt(Tkt tkt);
	
	TktPlan addtktplan(TktPlan tktplan);

	List<Tkt> findAll();

}
