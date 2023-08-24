package web.mem.meminfo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class Mem extends MemSuper {
	
	private static final long serialVersionUID = 3675030587216693949L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEM_NO")
	private Integer memNo;
	@Column(name = "MEM_LEVEL_NO")
	private Integer memLevelNo;
	@Column(name = "MEM_ACC")
	private String memAcc;
	@Column(name = "MEM_PWD")
	private String memPwd;
	@Column(name = "MEM_ACC_STATUS")
	private Integer memAccStatus;
	@Column(name = "MEM_NAME")
	private String memName;
	@Column(name = "MEM_GENDER")
	private Integer memGender;
	@Column(name = "MEM_BDAY")
	private String memBday;
	@Column(name = "MEM_EMAIL")
	private String memEmail;
	@Column(name = "MEM_MOBILE")
	private String memMobile;
	@Column(name = "MEM_CITY")
	private String memCity;
	@Column(name = "MEM_DIST")
	private String memDist;
	@Column(name = "MEM_ADDR")
	private String memAddr;
	@Column(name = "MEM_REG_DATE")
	private Date memRegDate;
	@Column(name = "MEM_PIC")
	private byte[] memPic;
	@Column(name = "MEM_ACT_STATUS")
	private Integer memActStatus;
	
	@ManyToOne
	@JoinColumn(name = "MEM_LEVEL_NO", insertable = false, updatable = false)
	private MemLevel memLevel;

	
	
	public Mem() {
	}
	
	public MemLevel getMemLevel() {
		return memLevel;
	}

	public void setMemLevel(MemLevel memLevel) {
		this.memLevel = memLevel;
	}

	public Integer getMemNo() {
		return memNo;
	}

	public void setMemNo(Integer memNo) {
		this.memNo = memNo;
	}

	public Integer getMemLevelNo() {
		return memLevelNo;
	}

	public void setMemLevelNo(Integer memLevelNo) {
		this.memLevelNo = memLevelNo;
	}

	public String getMemAcc() {
		return memAcc;
	}

	public void setMemAcc(String memAcc) {
		this.memAcc = memAcc;
	}

	public String getMemPwd() {
		return memPwd;
	}

	public void setMemPwd(String memPwd) {
		this.memPwd = memPwd;
	}

	public Integer getMemAccStatus() {
		return memAccStatus;
	}

	public void setMemAccStatus(Integer memAccStatus) {
		this.memAccStatus = memAccStatus;
	}

	public String getMemName() {
		return memName;
	}

	public void setMemName(String memName) {
		this.memName = memName;
	}

	public Integer getMemGender() {
		return memGender;
	}

	public void setMemGender(Integer memGender) {
		this.memGender = memGender;
	}

	public String getMemBday() {
		return memBday;
	}

	public void setMemBday(String memBday) {
		this.memBday = memBday;
	}

	public String getMemEmail() {
		return memEmail;
	}

	public void setMemEmail(String memEmail) {
		this.memEmail = memEmail;
	}

	public String getMemMobile() {
		return memMobile;
	}

	public void setMemMobile(String memMobile) {
		this.memMobile = memMobile;
	}

	public String getMemCity() {
		return memCity;
	}

	public void setMemCity(String memCity) {
		this.memCity = memCity;
	}

	public String getMemDist() {
		return memDist;
	}

	public void setMemDist(String memDist) {
		this.memDist = memDist;
	}

	public String getMemAddr() {
		return memAddr;
	}

	public void setMemAddr(String memAddr) {
		this.memAddr = memAddr;
	}

	public Date getMemRegDate() {
		return memRegDate;
	}

	public void setMemRegDate(Date memRegDate) {
		this.memRegDate = memRegDate;
	}

	public byte[] getMemPic() {
		return memPic;
	}

	public void setMemPic(byte[] memPic) {
		this.memPic = memPic;
	}

	public Integer getMemActStatus() {
		return memActStatus;
	}

	public void setMemActStatus(Integer memActStatus) {
		this.memActStatus = memActStatus;
	}

	public Mem(Integer memNo, Integer memLevelNo, String memAcc, Integer memAccStatus, String memName,
			Integer memGender, String memBday, String memEmail, String memMobile, String memCity, String memDist,
			String memAddr, Date memRegDate, byte[] memPic, Integer memActStatus) {
		super();
		this.memNo = memNo;
		this.memLevelNo = memLevelNo;
		this.memAcc = memAcc;
		this.memAccStatus = memAccStatus;
		this.memName = memName;
		this.memGender = memGender;
		this.memBday = memBday;
		this.memEmail = memEmail;
		this.memMobile = memMobile;
		this.memCity = memCity;
		this.memDist = memDist;
		this.memAddr = memAddr;
		this.memRegDate = memRegDate;
		this.memPic = memPic;
		this.memActStatus = memActStatus;
	}

	

	
	
	
	
}
