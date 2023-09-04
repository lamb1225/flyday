package web.tkt.tktt.service.impl;

import java.util.List;

import web.tkt.tktt.dao.TktDAO;
import web.tkt.tktt.dao.impl.TktDAOImpl;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.entity.TktType;
import web.tkt.tktt.service.TktService;

public class TktServiceImpl implements TktService{
	
	private TktDAO dao = new TktDAOImpl();
	
	// 新增商品
	@Override
	public Tkt addtkt(Tkt tkt) {
		System.out.println("有來到addtkt()");
		dao.insertTkt(tkt);
		return tkt;		
	}

	// 新增方案
	@Override
	public TktPlan addtktplan(TktPlan tktplan) {
		System.out.println("有來到addtktplan()");
		dao.insertPlan(tktplan);
		return tktplan;	
	}
	
	// 新增票種
	@Override
	public TktType addtkttype(TktType tkttype) {
		System.out.println("有來到addtkttype()");
		dao.insertType(tkttype);
		return tkttype;
	}
	
	// 查詢全部Tkt
	@Override
	public List<Tkt> findAll() {
		System.out.println("有來到findAll()");
		return dao.getAll();
	}



	


	


}
