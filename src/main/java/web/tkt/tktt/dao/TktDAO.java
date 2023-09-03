package web.tkt.tktt.dao;

import java.util.List;

import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktPlan;

public interface TktDAO {
	
	public void insertTkt(Tkt tkt);
	
//	public void findMaxTktno(Integer tktno);
	
	public void insertPlan(TktPlan tktplan);
	
	public Tkt findByPK(Integer tktno);
	
	public List<Tkt> getAll();
	
	
}
