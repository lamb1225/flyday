package web.mem.pkg.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemPkgColId implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3575637400948568164L;
	@Column(name="MEM_NO")
	private Integer memNo;
	@Column(name="PKG_NO")
	private Integer pkgNo;
}
