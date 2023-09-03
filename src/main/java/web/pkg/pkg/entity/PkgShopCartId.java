package web.pkg.pkg.entity;

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

public class PkgShopCartId implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1335043682525619215L;
	@Column(name="MEM_NO")
	private Integer memNo;
	@Column(name="PKG_DETAILS_NO")
	private Integer pkgDetailsNo;
}
