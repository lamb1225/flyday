package web.mem.meminfo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MEM_LEVEL")
public class MemLevel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEM_LEVEL_NO")
	private Integer memLevelNo;
	@Column(name = "MEM_LEVEL_NAME")
	private String memLevelName;
	@Column(name = "MEM_LEVEL_DISC")
	private Double memLevelDisc;
	
	public MemLevel() {
	}

	public Integer getMemLevelNo() {
		return memLevelNo;
	}

	public void setMemLevelNo(Integer memLevelNo) {
		this.memLevelNo = memLevelNo;
	}

	public String getMemLevelName() {
		return memLevelName;
	}

	public void setMemLevelName(String memLevelName) {
		this.memLevelName = memLevelName;
	}

	public Double getMemLevelDisc() {
		return memLevelDisc;
	}

	public void setMemLevelDisc(Double memLevelDisc) {
		this.memLevelDisc = memLevelDisc;
	}
	
	
	
	
}
