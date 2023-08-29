package web.tkt.tktt.entity;

import java.sql.Date;
import java.sql.Timestamp;

public class Tkt extends TktCore{

	private Integer tktno;
	private String tktname;
	private Timestamp tktstartdate;
	private Timestamp tktenddate;
	private String tktinstruction;
	private String proddesc;
	private String notice;
	private String howuse;
	private String location;
	private String countycity;
	private String address;	
	
	private Double sclatitude;
	private Double sclongitude;
	
	private String schowarrival;
	private String scservicehr;
	
	private Integer tktstat;
	private Integer tktsort;
	
	private Integer ratetotal;
	private Integer rateqty;	
	
	
	@Override
	public String toString() {
		return "Tkt [tktno=" + tktno + ", tktname=" + tktname + ", tktstartdate=" + tktstartdate + ", tktenddate="
				+ tktenddate + ", tktinstruction=" + tktinstruction + ", proddesc=" + proddesc + ", notice=" + notice
				+ ", howuse=" + howuse + ", location=" + location + ", countycity=" + countycity + ", address="
				+ address + ", sclatitude=" + sclatitude + ", sclongitude=" + sclongitude + ", schowarrival="
				+ schowarrival + ", scservicehr=" + scservicehr + ", tktstat=" + tktstat + ", tktsort=" + tktsort + "]";
	}

	public Tkt(){
		super();
	}
		
	public Tkt(Integer tktno, String tktname, Timestamp tktstartdate, Timestamp tktenddate, String tktinstruction,
			String proddesc, String notice, String howuse, String location, String countycity, String address,
			Double sclatitude, Double sclongitude, String schowarrival, String scservicehr, Integer tktstat,
			Integer tktsort, Integer ratetotal, Integer rateqty) {
		super();
		this.tktno = tktno;
		this.tktname = tktname;
		this.tktstartdate = tktstartdate;
		this.tktenddate = tktenddate;
		this.tktinstruction = tktinstruction;
		this.proddesc = proddesc;
		this.notice = notice;
		this.howuse = howuse;
		this.location = location;
		this.countycity = countycity;
		this.address = address;
		this.sclatitude = sclatitude;
		this.sclongitude = sclongitude;
		this.schowarrival = schowarrival;
		this.scservicehr = scservicehr;
		this.tktstat = tktstat;
		this.tktsort = tktsort;
		this.ratetotal = ratetotal;
		this.rateqty = rateqty;
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
	
	
	public Timestamp getTktstartdate() {
		return tktstartdate;
	}

	public void setTktstartdate(Timestamp tktstartdate) {
		this.tktstartdate = tktstartdate;
	}

	public Timestamp getTktenddate() {
		return tktenddate;
	}

	public void setTktenddate(Timestamp tktenddate) {
		this.tktenddate = tktenddate;
	}

	public String getTktinstruction() {
		return tktinstruction;
	}
	public void setTktinstruction(String tktinstruction) {
		this.tktinstruction = tktinstruction;
	}
	
	public String getProddesc() {
		return proddesc;
	}
	public void setProddesc(String proddesc) {
		this.proddesc = proddesc;
	}
	
	public String getNotice() {
		return notice;
	}
	public void setNotice(String notice) {
		this.notice = notice;
	}
	
	public String getHowuse() {
		return howuse;
	}
	public void setHowuse(String howuse) {
		this.howuse = howuse;
	}
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getCountycity() {
		return countycity;
	}

	public void setCountycity(String countycity) {
		this.countycity = countycity;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public Double getSclatitude() {
		return sclatitude;
	}
	public void setSclatitude(Double sclatitude) {
		this.sclatitude = sclatitude;
	}
	
	public Double getSclongitude() {
		return sclongitude;
	}
	public void setSclongitude(Double sclongitude) {
		this.sclongitude = sclongitude;
	}
	
	public String getSchowarrival() {
		return schowarrival;
	}
	public void setSchowarrival(String schowarrival) {
		this.schowarrival = schowarrival;
	}
	
	public String getScservicehr() {
		return scservicehr;
	}
	public void setScservicehr(String scservicehr) {
		this.scservicehr = scservicehr;
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
	
	
}
