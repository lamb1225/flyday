package web.tkt.tktc.entity;

import java.util.Arrays;

public class TktJoin implements java.io.Serializable {

	
	private static final long serialVersionUID = -7772747771065479503L;
	private Integer memNo;
	private Integer tktNo;
	private String tktName;
	private String planName;
	private String tktType;
	private Integer tktTypeNo;
	private Integer price;
	private Integer tktQty;
	private String location;
	private Integer rateTotal;
	private byte[] tktImg;
	private String showPic;
	
	public TktJoin() {
		super();
	}
	
	//會刪除
	public TktJoin(Integer memNo, Integer tktNo, String tktName, String planName, String tktType, Integer tktTypeNo,
			Integer price, Integer tktQty, String location, Integer rateTotal) {
		super();
		this.memNo = memNo;
		this.tktNo = tktNo;
		this.tktName = tktName;
		this.planName = planName;
		this.tktType = tktType;
		this.tktTypeNo = tktTypeNo;
		this.price = price;
		this.tktQty = tktQty;
		this.location = location;
		this.rateTotal = rateTotal;
	}

	public TktJoin(Integer memNo, Integer tktNo, String tktName, String planName, String tktType, Integer tktTypeNo,
			Integer price, Integer tktQty, String location, Integer rateTotal, byte[] tktImg) {
		super();
		this.memNo = memNo;
		this.tktNo = tktNo;
		this.tktName = tktName;
		this.planName = planName;
		this.tktType = tktType;
		this.tktTypeNo = tktTypeNo;
		this.price = price;
		this.tktQty = tktQty;
		this.location = location;
		this.rateTotal = rateTotal;
		this.tktImg = tktImg;
	}

	public Integer getMemNo() {
		return memNo;
	}

	public void setMemNo(Integer memNo) {
		this.memNo = memNo;
	}

	public Integer getTktNo() {
		return tktNo;
	}

	public void setTktNo(Integer tktNo) {
		this.tktNo = tktNo;
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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Integer getTktQty() {
		return tktQty;
	}

	public void setTktQty(Integer tktQty) {
		this.tktQty = tktQty;
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
		return "TktJoin [memNo=" + memNo + ", tktNo=" + tktNo + ", tktName=" + tktName + ", planName=" + planName
				+ ", tktType=" + tktType + ", tktTypeNo=" + tktTypeNo + ", price=" + price + ", tktQty=" + tktQty
				+ ", location=" + location + ", rateTotal=" + rateTotal + ", tktImg=" + Arrays.toString(tktImg) + "]";
	}
}
