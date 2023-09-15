package web.tkt.tktt.entity;

import java.util.List;

public class TktType extends TktCore{
	
	private Integer tkttypeno;
    private Integer tktplanno;
//    private String tkttype;
//    private Integer price;
    private List<String> tkttype;
    private List<String> price;
    
    
	public List<String> getTkttype() {
		return tkttype;
	}

	public void setTkttype(List<String> tkttype) {
		this.tkttype = tkttype;
	}

	public List<String> getPrice() {
		return price;
	}

	public void setPrice(List<String> price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "TktType [tkttypeno=" + tkttypeno + ", tktplanno=" + tktplanno + ", tkttype=" + tkttype + ", price="
				+ price + "]";
	}

	public TktType(Integer tkttypeno, Integer tktplanno, List<String> tkttype, List<String> price) {
		super();
		this.tkttypeno = tkttypeno;
		this.tktplanno = tktplanno;
		this.tkttype = tkttype;
		this.price = price;
	}


	public TktType() {
		super();
	}
	
	public Integer getTkttypeno() {
		return tkttypeno;
	}
	public void setTkttypeno(Integer tkttypeno) {
		this.tkttypeno = tkttypeno;
	}
	public Integer getTktplanno() {
		return tktplanno;
	}
	public void setTktplanno(Integer tktplanno) {
		this.tktplanno = tktplanno;
	}
//	public String getTkttype() {
//		return tkttype;
//	}
//	public void setTkttype(String tkttype) {
//		this.tkttype = tkttype;
//	}
//	public Integer getPrice() {
//		return price;
//	}
//	public void setPrice(Integer price) {
//		this.price = price;
//	}
    
    

}
