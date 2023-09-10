package web.tkt.tktc.entity;

import java.io.Serializable;

public class TktOrdDetails implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer tktOrdNo;
	private Integer tktTypeNo;
	private Integer tktOrdQty;
	private Integer unitPrice;
	private Integer commentStat;
	
	public TktOrdDetails() {
		super();
	}

	public TktOrdDetails(Integer tktOrdNo, Integer tktTypeNo, Integer tktOrdQty, Integer unitPrice,
			Integer commentStat) {
		super();
		this.tktOrdNo = tktOrdNo;
		this.tktTypeNo = tktTypeNo;
		this.tktOrdQty = tktOrdQty;
		this.unitPrice = unitPrice;
		this.commentStat = commentStat;
	}

	public Integer getTktOrdNo() {
		return tktOrdNo;
	}

	public void setTktOrdNo(Integer tktOrdNo) {
		this.tktOrdNo = tktOrdNo;
	}

	public Integer getTktTypeNo() {
		return tktTypeNo;
	}

	public void setTktTypeNo(Integer tktTypeNo) {
		this.tktTypeNo = tktTypeNo;
	}

	public Integer getTktOrdQty() {
		return tktOrdQty;
	}

	public void setTktOrdQty(Integer tktOrdQty) {
		this.tktOrdQty = tktOrdQty;
	}

	public Integer getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Integer getCommentStat() {
		return commentStat;
	}

	public void setCommentStat(Integer commentStat) {
		this.commentStat = commentStat;
	}

	@Override
	public String toString() {
		return "TktOrdDetails [tktOrdNo=" + tktOrdNo + ", tktTypeNo=" + tktTypeNo + ", tktOrdQty=" + tktOrdQty
				+ ", unitPrice=" + unitPrice + ", commentStat=" + commentStat + "]";
	}
}
