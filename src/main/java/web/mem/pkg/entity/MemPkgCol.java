package web.mem.pkg.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import core.entity.Core;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mem_pkg_col")
public class MemPkgCol extends Core {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2107024726796136346L;
	@EmbeddedId
	MemPkgColId memPkgColId;

	@Override
	public String toString() {
		return "MemPkgCol [memPkgColId=" + memPkgColId + "]";
	}
	

}
