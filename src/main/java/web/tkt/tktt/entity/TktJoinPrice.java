package web.tkt.tktt.entity;

public class TktJoinPrice extends TktCore{
	
	private Integer tktno;
	private String tktname;
	private String tktstartdate;
	private String tktenddate;
	private String tktinstruction;
	private String city;	
	private Integer tktstat;
	private Integer tktsort;	
	private Integer ratetotal;
	private Integer rateqty;	
	
	private Integer price;

		
	
	public TktJoinPrice(Integer tktno, String tktname, String tktstartdate, String tktenddate, String tktinstruction,
			String city, Integer tktstat, Integer tktsort, Integer ratetotal, Integer rateqty, Integer price) {
		super();
		this.tktno = tktno;
		this.tktname = tktname;
		this.tktstartdate = tktstartdate;
		this.tktenddate = tktenddate;
		this.tktinstruction = tktinstruction;
		this.city = city;
		this.tktstat = tktstat;
		this.tktsort = tktsort;
		this.ratetotal = ratetotal;
		this.rateqty = rateqty;
		this.price = price;
	}

	@Override
	public String toString() {
		return "TktJoinPrice [tktno=" + tktno + ", tktname=" + tktname + ", tktstartdate=" + tktstartdate
				+ ", tktenddate=" + tktenddate + ", tktinstruction=" + tktinstruction + ", city=" + city + ", tktstat="
				+ tktstat + ", tktsort=" + tktsort + ", ratetotal=" + ratetotal + ", rateqty=" + rateqty + ", price="
				+ price + "]";
	}
	
	public TktJoinPrice() {
		super();
	}

	public Integer getTktno() {
		return tktno;
	}

	public void setTktno(Integer tktno) {
		this.tktno = tktno;
	}

	public String getTktname() {
		return tktname;
	}

	public void setTktname(String tktname) {
		this.tktname = tktname;
	}

	public String getTktstartdate() {
		return tktstartdate;
	}

	public void setTktstartdate(String tktstartdate) {
		this.tktstartdate = tktstartdate;
	}

	public String getTktenddate() {
		return tktenddate;
	}

	public void setTktenddate(String tktenddate) {
		this.tktenddate = tktenddate;
	}

	public String getTktinstruction() {
		return tktinstruction;
	}

	public void setTktinstruction(String tktinstruction) {
		this.tktinstruction = tktinstruction;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getTktstat() {
		return tktstat;
	}

	public void setTktstat(Integer tktstat) {
		this.tktstat = tktstat;
	}

	public Integer getTktsort() {
		return tktsort;
	}

	public void setTktsort(Integer tktsort) {
		this.tktsort = tktsort;
	}

	public Integer getRatetotal() {
		return ratetotal;
	}

	public void setRatetotal(Integer ratetotal) {
		this.ratetotal = ratetotal;
	}

	public Integer getRateqty() {
		return rateqty;
	}

	public void setRateqty(Integer rateqty) {
		this.rateqty = rateqty;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}	

}
