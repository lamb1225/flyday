package web.tkt.tktt.dao;

import java.util.List;

import web.tkt.tktt.entity.Tkt;

public interface TktDAO {
	
	public int insert(Tkt tkt);
	
	public Tkt findByPK(Integer tktno);
	
	public List<Tkt> getAll();


}
