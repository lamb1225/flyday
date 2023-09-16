package web.tkt.tktc.entity;

public class TktOrdDetailsJoin implements java.io.Serializable {

	private static final long serialVersionUID = -3620615144473125033L;
	private Integer tktOrdNo;
	private String tktName;
	private String planName;
	private String tktType;
	private Integer tktTypeNo;
	private Integer unitPrice;
	private Integer tktOrdQty;
	private String location;
	private Integer rateTotal;
	private byte[] tktImg;
	private String showPic;
	
	public TktOrdDetailsJoin() {
		super();
	}

	public TktOrdDetailsJoin(Integer tktOrdNo, String tktName, String planName, String tktType, Integer tktTypeNo,
			Integer unitPrice, Integer tktOrdQty, String location, Integer rateTotal) {
		super();
		this.tktOrdNo = tktOrdNo;
		this.tktName = tktName;
		this.planName = planName;
		this.tktType = tktType;
		this.tktTypeNo = tktTypeNo;
		this.unitPrice = unitPrice;
		this.tktOrdQty = tktOrdQty;
		this.location = location;
		this.rateTotal = rateTotal;
	}
	
	public TktOrdDetailsJoin(Integer tktOrdNo, String tktName, String planName, String tktType, Integer tktTypeNo,
			Integer unitPrice, Integer tktOrdQty, String location, Integer rateTotal, byte[] tktImg) {
		super();
		this.tktOrdNo = tktOrdNo;
		this.tktName = tktName;
		this.planName = planName;
		this.tktType = tktType;
		this.tktTypeNo = tktTypeNo;
		this.unitPrice = unitPrice;
		this.tktOrdQty = tktOrdQty;
		this.location = location;
		this.rateTotal = rateTotal;
		this.tktImg = tktImg;
	}

	public Integer getTktOrdNo() {
		return tktOrdNo;
	}

	public void setTktOrdNo(Integer tktOrdNo) {
		this.tktOrdNo = tktOrdNo;
	}

	public String getTktName() {
		return tktName;
	}

	public void setTktName(String tktName) {
		this.tktName = tktName;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public String getTktType() {
		return tktType;
	}

	public void setTktType(String tktType) {
		this.tktType = tktType;
	}

	public Integer getTktTypeNo() {
		return tktTypeNo;
	}

	public void setTktTypeNo(Integer tktTypeNo) {
		this.tktTypeNo = tktTypeNo;
	}

	public Integer getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Integer getTktOrdQty() {
		return tktOrdQty;
	}

	public void setTktOrdQty(Integer tktOrdQty) {
		this.tktOrdQty = tktOrdQty;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getRateTotal() {
		return rateTotal;
	}

	public void setRateTotal(Integer rateTotal) {
		this.rateTotal = rateTotal;
	}
	
	public byte[] getTktImg() {
		return tktImg;
	}

	public void setTktImg(byte[] tktImg) {
		this.tktImg = tktImg;
	}

	public String getShowPic() {
		return showPic;
	}

	public void setShowPic(String showPic) {
		this.showPic = showPic;
	}

	@Override
	public String toString() {
		return "TktOrdDetailsJoin [tktOrdNo=" + tktOrdNo + ", tktName=" + tktName + ", planName=" + planName
				+ ", tktType=" + tktType + ", tktTypeNo=" + tktTypeNo + ", unitPrice=" + unitPrice + ", tktOrdQty="
				+ tktOrdQty + ", location=" + location + ", rateTotal=" + rateTotal + "]";
	}
}
