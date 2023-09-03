package web.tkt.tktt.entity;

import java.util.List;

public class TktPlan extends TktCore{
	
	private Integer tktplanno;  
	private Integer tktno;	    
//	private String planname;
//	private String plancontent;
	private Integer soldamount;
	private Integer planstat;
	private List<String> planname;
	private List<String> plancontent;

    public List<String> getPlanname() {
        return planname;
    }

    public void setPlanname(List<String> planname) {
        this.planname = planname;
    }
    
	public List<String> getPlancontent() {
		return plancontent;
	}

	public void setPlancontent(List<String> plancontent) {
		this.plancontent = plancontent;
	}
	

	@Override
	public String toString() {
		return "TktPlan [tktplanno=" + tktplanno + ", tktno=" + tktno + ", planname=" + planname + ", plancontent="
				+ plancontent + ", soldamount=" + soldamount + ", planstat=" + planstat + "]";
	}
	
	public TktPlan() {
		super();
	}

	public TktPlan(Integer tktplanno, Integer tktno, List<String> planname, List<String> plancontent, Integer soldamount,
			Integer planstat) {
		super();
		this.tktplanno = tktplanno;
		this.tktno = tktno;
		this.planname = planname;
		this.plancontent = plancontent;
		this.soldamount = soldamount;
		this.planstat = planstat;
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

//	public String getPlanname() {
//		return planname;
//	}
//
//	public void setPlanname(String planname) {
//		this.planname = planname;
//	}

//	public String getPlancontent() {
//		return plancontent;
//	}
//
//	public void setPlancontent(String plancontent) {
//		this.plancontent = plancontent;
//	}

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
	

}
