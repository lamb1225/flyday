package web.tkt.tktt.entity;

import java.sql.Date;
import java.sql.Timestamp;

public class Tkt extends TktCore{

	private Integer tktno;
	private String tktname;
	private String tktstartdate;
	private String tktenddate;
	private String tktinstruction;
	private String proddesc;
	private String notice;
	private String howuse;
	private String location;
	private String city;
	private String districts;
	private String address;	
	
	private Double sclatitude;
	private Double sclongitude;
	
	private String schowarrival;
	private String scservicehr;
	
	private Integer tktstat;
	private Integer tktsort;
	
	private Integer ratetotal;
	private Integer rateqty;	
	
	


	public Tkt(Integer tktno, String tktname, String tktstartdate, String tktenddate, String tktinstruction,
			String proddesc, String notice, String howuse, String location, String city, String districts,
			String address, Double sclatitude, Double sclongitude, String schowarrival, String scservicehr,
			Integer tktstat, Integer tktsort, Integer ratetotal, Integer rateqty) {
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
		this.city = city;
		this.districts = districts;
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



	@Override
	public String toString() {
		return "Tkt [tktno=" + tktno + ", tktname=" + tktname + ", tktstartdate=" + tktstartdate + ", tktenddate="
				+ tktenddate + ", tktinstruction=" + tktinstruction + ", proddesc=" + proddesc + ", notice=" + notice
				+ ", howuse=" + howuse + ", location=" + location + ", city=" + city + ", districts=" + districts
				+ ", address=" + address + ", sclatitude=" + sclatitude + ", sclongitude=" + sclongitude
				+ ", schowarrival=" + schowarrival + ", scservicehr=" + scservicehr + ", tktstat=" + tktstat
				+ ", tktsort=" + tktsort + ", ratetotal=" + ratetotal + ", rateqty=" + rateqty + "]";
	}



	public Tkt(){
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
	
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistricts() {
		return districts;
	}

	public void setDistricts(String districts) {
		this.districts = districts;
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
