package web.pkg.pkg.service.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.lang3.concurrent.TimedSemaphore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import web.pkg.pkg.dao.PkgOrdDao;
import web.pkg.pkg.entity.PkgOrd;
import web.pkg.pkg.service.PkgOrdService;

@Service
@Transactional
public class PkgOrdServiceImpl implements PkgOrdService{
	@Autowired
	private PkgOrdDao dao;

	//新增訂單
	@Override
	public PkgOrd addPkgOrd(PkgOrd pkgOrd) {
		
		Date nowDate = new Date();
		Timestamp timestamp  = new Timestamp(nowDate.getTime());
		pkgOrd.setPkgOrderDate(timestamp);
		try {
			int suc = dao.insert(pkgOrd);
			// 嘗試新增訂單到資料庫，如果新增失敗，設定失敗訊息
			if (suc < 1) { // 新增
				pkgOrd.setMessage("訂單成立失敗");
				pkgOrd.setSuccessful(false);
			}else {
				pkgOrd.setMessage("訂單成立成功");
				pkgOrd.setSuccessful(true);
			}
		}catch (Exception e) {
			e.printStackTrace();
			pkgOrd.setMessage("訂單成立失敗");
			pkgOrd.setSuccessful(false);
		}
		return pkgOrd;
	}

	@Override
	public PkgOrd updatePkgOrd(PkgOrd pkgOrd) {
		final PkgOrd pkgOrder = dao.selectById(pkgOrd.getPkgOrdNo());
		
		if (pkgOrd.getConName() != null) {
			pkgOrder.setConName(pkgOrd.getConName());
		}
		if (pkgOrd.getConPhone() != null) {
			pkgOrder.setConPhone(pkgOrd.getConPhone());
		}
		if (pkgOrd.getConEmail() != null) {
			pkgOrder.setConEmail(pkgOrd.getConEmail());
		}
		if (pkgOrd.getOrderState() != null) {
			pkgOrder.setOrderState(pkgOrd.getOrderState());
		}
		
		pkgOrder.setSuccessful(dao.update(pkgOrder) > 0);
		return pkgOrder;
	}

	@Override
	public PkgOrd findPkgOrdById(Integer pkgOrdNo) {
		PkgOrd resultOrd = dao.selectById(pkgOrdNo);
		
		// 查詢失敗，設定訊息
				if (resultOrd == null || resultOrd.getPkgOrdNo() == null) {
					PkgOrd notFoundResult = new PkgOrd();
					notFoundResult.setMessage("查無此訂單");
					notFoundResult.setSuccessful(false);
					return notFoundResult;

				} // 查詢成功，回傳結果
				else {
					resultOrd.setSuccessful(true);
					return resultOrd;
				}
	}

	@Override
	public List<PkgOrd> findallPkgOrd() {
		return dao.selectAll();
	}

}
