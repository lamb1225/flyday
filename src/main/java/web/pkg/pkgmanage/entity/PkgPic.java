package web.pkg.pkgmanage.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class PkgPic extends Core{
	private static final long serialVersionUID = 1062017833925367218L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PKG_PIC_NO")
	private Integer pkgPicNo;
	@Column(name = "PKG_NO")
	private Integer pkgNo;
	@Column(name = "PKG_IMG")
	private byte[] pkgImg;
}
