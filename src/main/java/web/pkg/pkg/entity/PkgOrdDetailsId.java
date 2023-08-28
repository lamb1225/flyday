package web.pkg.pkg.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable //JPA的註解，表示這個類別是可嵌入的，用於表示複合主鍵(宣告實體變數)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PkgOrdDetailsId implements Serializable{
	
	private static final long serialVersionUID = 3610827431482331406L;
	
	@Column(name="PKG_ORD_NO")
	private Integer pkgOrdNo;
	@Column(name="PKG_DETAILS_NO")
	private Integer pkgDetailsNo;
	
	
	
}


