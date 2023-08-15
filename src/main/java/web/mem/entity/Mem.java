package web.mem.entity;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import core.entity.Core;
import lombok.Data;

@Entity
public class Mem extends Core {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEM_NO")
	private Integer memNo;
	@Column(name = "MEM_LEVEL_NO")
	private Integer memLevelNo;
	@Column(name = "MEM_ACC")
	private String memAcc;
	@Column(name = "MEM_PWD")
	private String memPwd;
	@Column(name = "MEM_ACC_STATUS")
	private Integer memAccStatus;
	@Column(name = "MEM_NAME")
	private String memName;
	@Column(name = "MEM_GENDER")
	private Integer memGender;
	@Column(name = "MEM_BDAY")
	private Date memBday;
	@Column(name = "MEM_EMAIL")
	private String memEmail;
	@Column(name = "MEM_MOBILE")
	private String memMobile;
	@Column(name = "MEM_CITY")
	private String memCity;
	@Column(name = "MEM_DIST")
	private String memDist;
	@Column(name = "MEM_ADDR")
	private String memAddr;
	@Column(name = "MEM_REG_DATE")
	private Timestamp memRegDate;
	@Column(name = "MEM_PIC")
	private byte[] memPic;
	@Column(name = "MEM_ACT_STATUS")
	private Integer memActStatus;
	
	
	public Mem() {
	}

	public Integer getMemNo() {
		return memNo;
	}

	public void setMemNo(Integer memNo) {
		this.memNo = memNo;
	}

	public Integer getMemLevelNo() {
		return memLevelNo;
	}

	public void setMemLevelNo(Integer memLevelNo) {
		this.memLevelNo = memLevelNo;
	}

	public String getMemAcc() {
		return memAcc;
	}

	public void setMemAcc(String memAcc) {
		this.memAcc = memAcc;
	}

	public String getMemPwd() {
		return memPwd;
	}

	public void setMemPwd(String memPwd) {
		this.memPwd = memPwd;
	}

	public Integer getMemAccStatus() {
		return memAccStatus;
	}

	public void setMemAccStatus(Integer memAccStatus) {
		this.memAccStatus = memAccStatus;
	}

	public String getMemName() {
		return memName;
	}

	public void setMemName(String memName) {
		this.memName = memName;
	}

	public Integer getMemGender() {
		return memGender;
	}

	public void setMemGender(Integer memGender) {
		this.memGender = memGender;
	}

	public Date getMemBday() {
		return memBday;
	}

	public void setMemBday(Date memBday) {
		this.memBday = memBday;
	}

	public String getMemEmail() {
		return memEmail;
	}

	public void setMemEmail(String memEmail) {
		this.memEmail = memEmail;
	}

	public String getMemMobile() {
		return memMobile;
	}

	public void setMemMobile(String memMobile) {
		this.memMobile = memMobile;
	}

	public String getMemCity() {
		return memCity;
	}

	public void setMemCity(String memCity) {
		this.memCity = memCity;
	}

	public String getMemDist() {
		return memDist;
	}

	public void setMemDist(String memDist) {
		this.memDist = memDist;
	}

	public String getMemAddr() {
		return memAddr;
	}

	public void setMemAddr(String memAddr) {
		this.memAddr = memAddr;
	}

	public Timestamp getMemRegDate() {
		return memRegDate;
	}

	public void setMemRegDate(Timestamp memRegDate) {
		this.memRegDate = memRegDate;
	}

	public byte[] getMemPic() {
		return memPic;
	}

	public void setMemPic(byte[] memPic) {
		this.memPic = memPic;
	}

	public Integer getMemActStatus() {
		return memActStatus;
	}

	public void setMemActStatus(Integer memActStatus) {
		this.memActStatus = memActStatus;
	}

	
	
	
	
}
