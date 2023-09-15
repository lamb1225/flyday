package web.pkg.pkg.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.query.criteria.internal.expression.function.TrimFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.pkg.pkg.dao.PkgCoupDao;
import web.pkg.pkg.entity.PkgCoup;
import web.pkg.pkg.service.PkgCoupService;

@Service
@Transactional
public class PkgCoupServiceImpl implements PkgCoupService {
	@Autowired
	private PkgCoupDao dao;

	@Override
	public PkgCoup add(PkgCoup pkgCoup) {
		// 先判斷條件，再設定初始值，再新增
		// 檢查優惠券名稱是否輸入
		if (pkgCoup.getPkgCoupName() == null || pkgCoup.getPkgCoupName().trim().isEmpty()) {
			pkgCoup.setMessage("優惠券名稱未輸入");
			pkgCoup.setSuccessful(false);
			return pkgCoup;
		}

		// 檢查優惠券折扣金額是否正確
		if (pkgCoup.getPkgCoupDiscount() == null || pkgCoup.getPkgCoupDiscount() < 0) {
			pkgCoup.setMessage("請輸入優惠券折扣金額，且折扣金額需大於0");
			pkgCoup.setSuccessful(false);
			return pkgCoup;

		}

		// 設置優惠券狀態為0（0代表未上架）
//		pkgCoup.setPkgCoupState(0);

		// 嘗試插入優惠券到資料庫，如果插入失敗，設定相關訊息
		if (dao.insert(pkgCoup) < 1) { // 新增
			pkgCoup.setMessage("新增優惠券失敗");
			pkgCoup.setSuccessful(false);
			return pkgCoup;
		}

		// 插入成功，設定相關訊息
		pkgCoup.setMessage("新增優惠券成功");
		pkgCoup.setSuccessful(true);
		return pkgCoup;
	}

	@Override
	public PkgCoup edit(PkgCoup pkgcoup) {
		final PkgCoup pkgcoupen = dao.selectById(pkgcoup.getPkgCoupNo());
//		if(pkgcoup.getPkgCoupName()!=null) {
//			
//		}
		
		
		if (pkgcoup.getPkgCoupName() != null) {
			pkgcoupen.setPkgCoupName(pkgcoup.getPkgCoupName());
		}
		if (pkgcoup.getPkgCoupIntroduce() != null) {
			pkgcoupen.setPkgCoupIntroduce(pkgcoup.getPkgCoupIntroduce());
		}
		if (pkgcoup.getPkgCoupDiscount() != null) {
			pkgcoupen.setPkgCoupDiscount(pkgcoup.getPkgCoupDiscount());
		}
		if (pkgcoup.getPkgCoupStartDate() != null) {
			pkgcoupen.setPkgCoupStartDate(pkgcoup.getPkgCoupStartDate());
		}
		if (pkgcoup.getPkgCoupEndDate() != null) {
			pkgcoupen.setPkgCoupEndDate(pkgcoup.getPkgCoupEndDate());
		}
		if (pkgcoup.getPkgCoupUseStartDate() != null) {
			pkgcoupen.setPkgCoupUseStartDate(pkgcoup.getPkgCoupUseStartDate());
		}
		if (pkgcoup.getPkgCoupUseEndDate() != null) {
			pkgcoupen.setPkgCoupUseEndDate(pkgcoup.getPkgCoupUseEndDate());
		}
		if (pkgcoup.getPkgCoupMinicharge() != null) {
			pkgcoupen.setPkgCoupMinicharge(pkgcoup.getPkgCoupMinicharge());
		}
		if (pkgcoup.getPkgCoupState() != null) {
			pkgcoupen.setPkgCoupState(pkgcoup.getPkgCoupState());
		}

		pkgcoupen.setSuccessful(dao.update(pkgcoupen) > 0);
		return pkgcoupen;
	}

	@Override
	public List<PkgCoup> findAll() {
		return dao.selectAll();
	}

	@Override
	public PkgCoup findByPkgCoupNo(Integer pkgCoupNo) {
		PkgCoup result = dao.selectById(pkgCoupNo);
		
		// 查詢失敗，設定訊息
		if (result == null || result.getPkgCoupNo() == null) {
			PkgCoup notFoundResult = new PkgCoup();
			notFoundResult.setMessage("查無此優惠券");
			notFoundResult.setSuccessful(false);
			return notFoundResult;

		} // 查詢成功，回傳結果
		else {
			result.setSuccessful(true);
			return result;
		}
	}

	@Override
	public boolean remove(Integer pkgCoupNo) {
		try {
			dao.deleteById(pkgCoupNo);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

}
