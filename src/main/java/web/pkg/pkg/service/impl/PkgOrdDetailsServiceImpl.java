package web.pkg.pkg.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.pkg.pkg.dao.PkgOrdDetailsDao;
import web.pkg.pkg.entity.PkgOrdDetails;
import web.pkg.pkg.service.PkgOrdDetailsService;

@Service
@Transactional
public class PkgOrdDetailsServiceImpl implements PkgOrdDetailsService{
	@Autowired
	private PkgOrdDetailsDao dao;
	
	//新增訂單
	@Override
	public PkgOrdDetails addDetails(PkgOrdDetails pkgOrdDetails) {
		PkgOrdDetails ordDetails = new PkgOrdDetails();
		
		// 嘗試新增訂單明細到資料庫，如果新增失敗，設定失敗訊息
				if (dao.insert(ordDetails) < 1) { // 新增
					ordDetails.setMessage("訂單成立失敗");
					ordDetails.setSuccessful(false);
					return ordDetails;
				}
				
				// 新增訂單明細到資料庫成功，設定成功訊息
				dao.insert(ordDetails);
				ordDetails.setMessage("訂單成立成功");
				ordDetails.setSuccessful(true);
				return ordDetails;
	}

	@Override
	public PkgOrdDetails updateDetails(PkgOrdDetails pkgOrdDetails) {
		final PkgOrdDetails ordDetails =dao.selectByPkgOrdDetailsId(pkgOrdDetails.getPkgOrdDetailsid().getPkgDetailsNo());

		if(ordDetails.getPkgOrdQty()!= null) {
			ordDetails.setPkgOrdQty(pkgOrdDetails.getPkgOrdQty());
		}
		
		if(ordDetails.getOrderNote()!=null) {
			ordDetails.setOrderNote(pkgOrdDetails.getOrderNote());
		}
		ordDetails.setSuccessful(dao.update(pkgOrdDetails)>0);
		return ordDetails;
	}

	@Override
	public PkgOrdDetails findDetailsById(Integer pkgOrdDetailsNo) {
		PkgOrdDetails resultDetails = dao.selectByPkgOrdDetailsId(pkgOrdDetailsNo);
		
		// 查詢失敗，設定訊息
		if (resultDetails == null || resultDetails.getPkgOrdDetailsid().getPkgDetailsNo() == null) {
			PkgOrdDetails notFoundResult = new PkgOrdDetails();
			notFoundResult.setMessage("查無此訂單明細");
			notFoundResult.setSuccessful(false);
			return notFoundResult;

		} // 查詢成功，回傳結果
		else {
			resultDetails.setSuccessful(true);
			return resultDetails;
		}
	}

	@Override
	public List<PkgOrdDetails> findAll() {
		return dao.selectAll();
	}
	
}	
