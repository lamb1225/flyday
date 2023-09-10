package web.tkt.tktt.entity;

import java.util.List;

public class PlanType extends TktCore{
	private Integer tktplanno;  
	private Integer tktno;	    
	private String planname;
	private Integer soldamount;
	private Integer planstat;
	
	private Integer tkttypeno;
    private String tkttype;
    private Integer price;
  
    
    
    @Override
	public String toString() {
		return "PlanType [tktplanno=" + tktplanno + ", tktno=" + tktno + ", planname=" + planname + ", soldamount="
				+ soldamount + ", planstat=" + planstat + ", tkttypeno=" + tkttypeno + ", tkttype=" + tkttype
				+ ", price=" + price + "]";
	}
    
	public PlanType(Integer tktplanno, Integer tktno, String planname, Integer soldamount, Integer planstat,
			Integer tkttypeno, String tkttype, Integer price) {
		super();
		this.tktplanno = tktplanno;
		this.tktno = tktno;
		this.planname = planname;
		this.soldamount = soldamount;
		this.planstat = planstat;
		this.tkttypeno = tkttypeno;
		this.tkttype = tkttype;
		this.price = price;
	}
	
	public PlanType() {
		super();
	}

	public Integer getTktplanno() {
		return tktplanno;
	}
	
	public void setTktplanno(Integer tktplanno) {
		this.tktplanno = tktplanno;
	}
	public Integer getTktno() {
		return tktno;
	}
	public void setTktno(Integer tktno) {
		this.tktno = tktno;
	}
	public String getPlanname() {
		return planname;
	}
	public void setPlanname(String planname) {
		this.planname = planname;
	}
	public Integer getSoldamount() {
		return soldamount;
	}
	public void setSoldamount(Integer soldamount) {
		this.soldamount = soldamount;
	}
	public Integer getPlanstat() {
		return planstat;
	}
	public void setPlanstat(Integer planstat) {
		this.planstat = planstat;
	}
	public Integer getTkttypeno() {
		return tkttypeno;
	}
	public void setTkttypeno(Integer tkttypeno) {
		this.tkttypeno = tkttypeno;
	}
	public String getTkttype() {
		return tkttype;
	}
	public void setTkttype(String tkttype) {
		this.tkttype = tkttype;
	}
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
	}
    
    
    
}
