package web.tkt.tktt.dao;

import java.util.List;

import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;

public interface TktDAO {
	
	public void insertTkt(Tkt tkt);
	
	public void insertPlan(TktPlan tktplan);
	
	public void insertType(TktType tkttype);	
	
	public Tkt findByPK(Integer tktno);
	
	public List<Tkt> getAll();
	
	
}
