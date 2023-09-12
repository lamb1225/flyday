package web.tkt.tktc.dao;

import java.util.List;
import web.tkt.tktc.entity.*;

public interface TktOrdDetailsDao {

	public void insert(Integer tktOrdNo, List<TktJoin> tktJoinList, Integer commentStat);
	
	public void update(Integer tktOrdNo, Integer tktTypeNo);
	
	public TktOrdDetails findByPrimarkeyDetails (Integer tktOrdNo, Integer tktTypeNo);
	
	public List<TktOrdDetails> getAll(Integer tktOrdNo); //可能會刪除
	
	public List<TktOrdDetailsJoin> selectByTktOrdNo (Integer tktOrdNo);
	
	public List<TktOrdDetailsJoin> getAll();
}
