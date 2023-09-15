package web.tkt.tktc.entity;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

public class TktOrd implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer tktOrdNo;
	private Integer memNo;
	private Integer memTktCoupNo;
	private Integer orgPrice;
	private Integer discPrice;
	private Integer payPrice;
	private String conTitle;
	private String conName;
	private String conPhone;
	private String conEmail;
	private Timestamp ordDate;
	private Timestamp ordRefDate;
	private Integer ordStat;
	private String memName;
	private byte[] memPic;
	private String showPic;
	private Date expDate;
	
	public TktOrd() {
		super();
	}

	public TktOrd(Integer tktOrdNo, Integer memNo, Integer memTktCoupNo, Integer orgPrice, Integer discPrice,
			Integer payPrice, String conTitle, String conName, String conPhone, String conEmail, Timestamp ordDate,
			Timestamp ordRefDate, Integer ordStat) {
		super();
		this.tktOrdNo = tktOrdNo;
		this.memNo = memNo;
		this.memTktCoupNo = memTktCoupNo;
		this.orgPrice = orgPrice;
		this.discPrice = discPrice;
		this.payPrice = payPrice;
		this.conTitle = conTitle;
		this.conName = conName;
		this.conPhone = conPhone;
		this.conEmail = conEmail;
		this.ordDate = ordDate;
		this.ordRefDate = ordRefDate;
		this.ordStat = ordStat;
	}
	
	public TktOrd(Integer memNo, Integer memTktCoupNo, Integer orgPrice, Integer discPrice,
			Integer payPrice, String conTitle, String conName, String conPhone, String conEmail, Timestamp ordDate,
			Timestamp ordRefDate, Integer ordStat) {
		super();
		this.memNo = memNo;
		this.memTktCoupNo = memTktCoupNo;
		this.orgPrice = orgPrice;
		this.discPrice = discPrice;
		this.payPrice = payPrice;
		this.conTitle = conTitle;
		this.conName = conName;
		this.conPhone = conPhone;
		this.conEmail = conEmail;
		this.ordDate = ordDate;
		this.ordRefDate = ordRefDate;
		this.ordStat = ordStat;
	}

	public Integer getTktOrdNo() {
		return tktOrdNo;
	}

	public void setTktOrdNo(Integer tktOrdNo) {
		this.tktOrdNo = tktOrdNo;
	}

	public Integer getMemNo() {
		return memNo;
	}

	public void setMemNo(Integer memNo) {
		this.memNo = memNo;
	}

	public Integer getMemTktCoupNo() {
		return memTktCoupNo;
	}

	public void setMemTktCoupNo(Integer memTktCoupNo) {
		this.memTktCoupNo = memTktCoupNo;
	}

	public Integer getOrgPrice() {
		return orgPrice;
	}

	public void setOrgPrice(Integer orgPrice) {
		this.orgPrice = orgPrice;
	}

	public Integer getDiscPrice() {
		return discPrice;
	}

	public void setDiscPrice(Integer discPrice) {
		this.discPrice = discPrice;
	}

	public Integer getPayPrice() {
		return payPrice;
	}

	public void setPayPrice(Integer payPrice) {
		this.payPrice = payPrice;
	}

	public String getConTitle() {
		return conTitle;
	}

	public void setConTitle(String conTitle) {
		this.conTitle = conTitle;
	}

	public String getConName() {
		return conName;
	}

	public void setConName(String conName) {
		this.conName = conName;
	}

	public String getConPhone() {
		return conPhone;
	}

	public void setConPhone(String conPhone) {
		this.conPhone = conPhone;
	}

	public String getConEmail() {
		return conEmail;
	}

	public void setConEmail(String conEmail) {
		this.conEmail = conEmail;
	}

	public Timestamp getOrdDate() {
		return ordDate;
	}

	public void setOrdDate(Timestamp ordDate) {
		this.ordDate = ordDate;
	}

	public Timestamp getOrdRefDate() {
		return ordRefDate;
	}

	public void setOrdRefDate(Timestamp ordRefDate) {
		this.ordRefDate = ordRefDate;
	}

	public Integer getOrdStat() {
		return ordStat;
	}

	public void setOrdStat(Integer ordStat) {
		this.ordStat = ordStat;
	}

	public String getMemName() {
		return memName;
	}

	public void setMemName(String memName) {
		this.memName = memName;
	}

	public byte[] getMemPic() {
		return memPic;
	}

	public void setMemPic(byte[] memPic) {
		this.memPic = memPic;
	}
	
	public String getShowPic() {
		return showPic;
	}

	public void setShowPic(String showPic) {
		this.showPic = showPic;
	}

	public Date getExpDate() {
		return expDate;
	}

	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}

	@Override
	public String toString() {
		return "TktOrd [tktOrdNo=" + tktOrdNo + ", memNo=" + memNo + ", memTktCoupNo=" + memTktCoupNo + ", orgPrice="
				+ orgPrice + ", discPrice=" + discPrice + ", payPrice=" + payPrice + ", conTitle=" + conTitle
				+ ", conName=" + conName + ", conPhone=" + conPhone + ", conEmail=" + conEmail + ", ordDate=" + ordDate
				+ ", ordRefDate=" + ordRefDate + ", ordStat=" + ordStat + "]";
	}
}
