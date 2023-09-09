package web.tkt.tktc.entity;

import java.io.Serializable;
import java.sql.Date;

public class TktPass implements Serializable {

	private static final long serialVersionUID = -5241701780609791314L;
	private Integer tktPassNo;
	private Integer tktTypeNo;
	private Integer memNo;
	private String qrCode;
	private Date exeDate;
	
	public TktPass() {
		super();
	}

	public TktPass(Integer tktPassNo, Integer tktTypeNo, Integer memNo, String qrCode, Date exeDate) {
		super();
		this.tktPassNo = tktPassNo;
		this.tktTypeNo = tktTypeNo;
		this.memNo = memNo;
		this.qrCode = qrCode;
		this.exeDate = exeDate;
	}

	public Integer getTktPassNo() {
		return tktPassNo;
	}

	public void setTktPassNo(Integer tktPassNo) {
		this.tktPassNo = tktPassNo;
	}

	public Integer getTktTypeNo() {
		return tktTypeNo;
	}

	public void setTktTypeNo(Integer tktTypeNo) {
		this.tktTypeNo = tktTypeNo;
	}

	public Integer getMemNo() {
		return memNo;
	}

	public void setMemNo(Integer memNo) {
		this.memNo = memNo;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}

	public Date getExeDate() {
		return exeDate;
	}

	public void setExeDate(Date exeDate) {
		this.exeDate = exeDate;
	}

	@Override
	public String toString() {
		return "TktPass [tktPassNo=" + tktPassNo + ", tktTypeNo=" + tktTypeNo + ", memNo=" + memNo + ", qrCode="
				+ qrCode + ", exeDate=" + exeDate + "]";
	}
}
