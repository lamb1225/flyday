package web.mem.pkg.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="mem_pkg_coup")
public class MemPkgCoup extends Core{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="MEM_PKG_COUP_NO")
	private Integer memPkgCoupNo;
	@Column(name="PKG_COUP_NO")
	private Integer pkgCoupNo;
	@Column(name="MEM_NO")
	private Integer memNo;
	@Column(name="MEM_PKG_COUP_STATE")
	private Integer memPkgCoupState;
	
	@Override
	public String toString() {
		return "MemPkgCoup [memPkgCoupNo=" + memPkgCoupNo + ", pkgCoupNo=" + pkgCoupNo + ", memNo=" + memNo
				+ ", memPkgCoupState=" + memPkgCoupState + "]";
	}
	
	
}
