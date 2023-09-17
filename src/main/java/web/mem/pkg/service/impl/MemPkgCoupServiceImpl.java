package web.mem.pkg.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.mem.pkg.dao.MemPkgCoupDao;
import web.mem.pkg.entity.MemPkgCoup;
import web.mem.pkg.service.MemPkgCoupService;
import web.pkg.pkg.entity.PkgOrd;
@Service
@Transactional
public class MemPkgCoupServiceImpl implements MemPkgCoupService{

	@Autowired
	private MemPkgCoupDao dao;
	
//	新增會員優惠券
	@Override
	public MemPkgCoup add(MemPkgCoup memPkgCoup) {
		
		try {
			int suc = dao.insert(memPkgCoup);
			// 嘗試新增訂單到資料庫，如果新增失敗，設定失敗訊息
			if (suc < 1) { // 新增
				memPkgCoup.setMessage("領取優惠券失敗");
				memPkgCoup.setSuccessful(false);
			}else {
				memPkgCoup.setMessage("領取優惠券成功");
				memPkgCoup.setSuccessful(true);
			}
		}catch (Exception e) {
			e.printStackTrace();
			memPkgCoup.setMessage("領取優惠券失敗");
			memPkgCoup.setSuccessful(false);
		}
		
		
		
		return memPkgCoup;
	}

	@Override
	public MemPkgCoup update(MemPkgCoup memPkgCoup) {
		final MemPkgCoup memcoup =dao.selectById(memPkgCoup.getMemPkgCoupNo());
		memcoup.setMemPkgCoupState(memPkgCoup.getMemPkgCoupState());
		return memcoup;

	}

	@Override
	public List<MemPkgCoup> findAll() {
		return dao.selectAll();
	}

	@Override
	public MemPkgCoup findById(Integer memPkgCoupNo) {
		MemPkgCoup resultCoup = dao.selectById(memPkgCoupNo);
		
		// 查詢失敗，設定訊息
		if (resultCoup == null || resultCoup.getPkgCoupNo() == null) {
			MemPkgCoup notFoundResult = new MemPkgCoup();
			notFoundResult.setMessage("查無此優惠券");
			notFoundResult.setSuccessful(false);
			return notFoundResult;

		} // 查詢成功，回傳結果
		else {
			resultCoup.setSuccessful(true);
			return resultCoup;
		}
	}

	@Override
	public boolean remove(Integer memPkgCoupNo) {
		dao.deleteById(memPkgCoupNo);
		return true;
	}
	
	
}
