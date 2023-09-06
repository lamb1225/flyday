package web.pkg.pkg.entity;
import java.sql.Date;
import java.util.Arrays;

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
@Table(name="pkg_comment")
public class PkgComment extends Core{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="PKG_COMMENT_NO")
	private Integer pkgCommentNo;
	@Column(name="PKG_NO")
	private Integer pkgNo;
	@Column(name="MEM_NO")
	private Integer memNo;
	@Column(name="PKG_COMMENTS")
	private String pkgComments;
	@Column(name="PKG_COMMENT_IMG")
	private byte[] pkgCommentImg;
	@Column(name="PKG_COMMENT_RATE")
	private Integer pkgCommentRate;
	@Column(name="PKG_COMMENT_DATE")
	private Date pkgCommentDate;
	
	
	@Override
	public String toString() {
		return "PkgComment [pkgCommentNo=" + pkgCommentNo + ", pkgNo=" + pkgNo + ", memNo=" + memNo + ", pkgComments="
				+ pkgComments + ", pkgCommentImg=" + Arrays.toString(pkgCommentImg) + ", pkgCommentRate="
				+ pkgCommentRate + "]";
	}




}
