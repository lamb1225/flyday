package web.emp.empinfo.entity;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import core.entity.Core;

@Entity
public class Emp extends Core {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EMP_NO")
	private Integer empNo;
	@Column(name = "EMP_ACC")
	private String empAcc;
	@Column(name = "EMP_PWD")
	private String empPwd;
	@Column(name = "EMP_NAME")
	private String empName;
	@Column(name = "EMP_STATUS")
	private Integer empStatus;
	
	public Emp() {
	}
	
	
	
	public Integer getEmpNo() {
		return empNo;
	}



	public void setEmpNo(Integer empNo) {
		this.empNo = empNo;
	}



	public String getEmpAcc() {
		return empAcc;
	}



	public void setEmpAcc(String empAcc) {
		this.empAcc = empAcc;
	}



	public String getEmpPwd() {
		return empPwd;
	}



	public void setEmpPwd(String empPwd) {
		this.empPwd = empPwd;
	}



	public String getEmpName() {
		return empName;
	}



	public void setEmpName(String empName) {
		this.empName = empName;
	}



	public Integer getEmpStatus() {
		return empStatus;
	}



	public void setEmpStatus(Integer empStatus) {
		this.empStatus = empStatus;
	}



	



	
	
	
	
}
