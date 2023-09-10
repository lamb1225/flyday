package web.emp.empinfo.service.impl;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import web.emp.empinfo.dao.EmpDao;
import web.emp.empinfo.entity.Emp;
import web.emp.empinfo.service.EmpService;

@Service
@Transactional
public class EmpServiceImpl implements EmpService {
	
	@Autowired
	@Qualifier("empDaoImpl")
	private EmpDao dao;
	
	@Override
	public Emp login(Emp emp) {

		final String empAcc = emp.getEmpAcc();
		final String empPwd = emp.getEmpPwd();
//		final Integer empStatus = emp.getEmpStatus();
		
		if(empAcc == null || empAcc.trim().isEmpty()) {
			emp.setMessage("請輸入帳號");
			emp.setSuccessful(false);
			return emp;
		}
		
		if(empPwd == null || empPwd.trim().isEmpty()) {
			emp.setMessage("請輸入密碼");
			emp.setSuccessful(false);
			return emp;
		}
		
		emp = dao.selectAccAndPwd(empAcc, empPwd);
		if(emp == null) {
			emp = new Emp();
			emp.setMessage("使用者名稱或密碼錯誤");
			emp.setSuccessful(false);
			return emp;
		}
		
//		emp = dao.selectByEmpStatus(empStatus);
//		if(emp.equals(1)) {
//			emp.setMessage("您的資料顯示未在職，如有錯誤請聯繫人事負責人");
//			emp.setSuccessful(false);
//			return emp;
//		};
		
		emp.setMessage("登入成功");
		emp.setSuccessful(true);
		return emp;
		
	}

	@Override
	public Emp register(Emp emp) {
		if(dao.selectByEmpAcc(emp.getEmpAcc()) !=null) {
			emp.setMessage("信箱重複");
			emp.setSuccessful(false);
			return emp;
		}
		
		emp.setEmpStatus(0);
		
		
		if(dao.insert(emp) == 1) {
			emp.setMessage("您的資料顯示未在職，如有錯誤請聯繫人事負責人");
			emp.setSuccessful(false);
			return emp;
		};
		
		emp.setMessage("新增成功");
		emp.setSuccessful(false);	
		return emp;
	}

	@Override
	 public int deleteEmp(Integer empno) {
		return dao.deleteByEmpNo(empno);
    }

	//修改
	@Override
	public Emp update(Emp emp) {
		
		if(this.dao == null) {
		    System.out.println("DAO is null!");
		}
		
		if(this.dao != null) {
		    System.out.println(this.dao);
		}
		
		if(this.dao.update(emp) < 1) {
			emp.setMessage("變更失敗，請聯絡管理員");
			emp.setSuccessful(false);
			return emp;
		}
		
		

		emp.setMessage("修改成功");
		emp.setSuccessful(true);
		return emp;
		
	}
	
	
	//新增照片
//	@Override
//	public Mem changePersonalImage(byte[] memPic, Integer memNo) {
//		
//		Mem mem = new Mem();
//
//		if(dao.updateMemImage(memPic, memNo) < 1) {
//			mem.setMessage("圖片變更失敗，請聯絡管理員");
//			mem.setSuccessful(false);
//			return mem;
//		}
//		
//		mem.setMessage("圖片修改成功");
//		mem.setSuccessful(true);
//		return mem;
//		
//	}
	
}
