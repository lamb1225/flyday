package web.tkt.tktc.dao;

import java.util.List;
import web.tkt.tktc.entity.*;

public interface TktOrdDao {

	public void insert(TktOrd tktord);
	
	public void update(Integer tktOrdNo, Integer ordStat);
	
	public TktOrd findByPrimaryKey(Integer tktOrdNo);
	
	public List<TktOrd> getAll(Integer memNo);
	
	public List<TktOrd> getAll();
	
}