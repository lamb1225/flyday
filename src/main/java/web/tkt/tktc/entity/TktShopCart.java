package web.tkt.tktc.entity;

public class TktShopCart implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	private Integer memNo;
	private Integer tktTypeNo;
	private Integer tktQty;
	
	public TktShopCart() {
		super();
	}

	public TktShopCart(Integer memNo, Integer tktTypeNo, Integer tktQty) {
		super();
		this.memNo = memNo;
		this.tktTypeNo = tktTypeNo;
		this.tktQty = tktQty;
	}

	public Integer getMemNo() {
		return memNo;
	}

	public void setMemNo(Integer memNo) {
		this.memNo = memNo;
	}

	public Integer getTktTypeNo() {
		return tktTypeNo;
	}

	public void setTktTypeNo(Integer tktTypeNo) {
		this.tktTypeNo = tktTypeNo;
	}

	public Integer getTktQty() {
		return tktQty;
	}

	public void setTktQty(Integer tktQty) {
		this.tktQty = tktQty;
	}

	@Override
	public String toString() {
		return "TktShopCart [memNo=" + memNo + ", tktTypeNo=" + tktTypeNo + ", tktQty=" + tktQty + "]";
	}
	
}
