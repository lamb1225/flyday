package web.pkg.pkgmanage.entity;

import java.sql.Date;

import javax.persistence.*;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import web.act.entity.Act;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Pkg extends Core{
	private static final long serialVersionUID = 1062017833925367218L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PKG_NO")
	private Integer pkgNo;
	@Column(name = "STORE_NO")
	private Integer storeNo;
	@Column(name = "PKG_NAME")
	private String pkgName;
	@Column(name = "PKG_GROUP")
	private Integer pkgGroup;
	@Column(name = "PKG_GATHER")
	private String pkgGather;
	@Column(name = "PKG_PLACE")
	private String pkgPlace;
	@Column(name = "PKG_ADDRESS")
	private String pkgAddress;
	@Column(name = "PKG_LATITUDE")
	private double pkgLatitude;
	@Column(name = "PKG_LONGITUDE")
	private double pkgLongitude;
	@Column(name = "PKG_SORT")
	private Integer pkgSort;
	@Column(name = "PKG_CONTENT")
	private String pkgContent;
	@Column(name = "PKG_NOTICE")
	private String pkgNotice;
	@Column(name = "PKG_REVIEW")
	private Integer pkgReview;
	@Column(name = "PKG_STARTDATE")
	private Date pkgStartdate;
	@Column(name = "PKG_NOT_REASON")
	private String pkgNotReason;
	@Column(name = "PKG_RATETOTAL", insertable = false)
	private Integer pkgRatetotal;
	@Column(name = "PKG_COMMENT_NUM", insertable = false)
	private Integer pkgCommentNum;
	@Column(name = "PKG_REFPOLICY")
	private String pkgRefpolicy;
	@Column(name = "PKG_ONE_PIC")
	private byte[] pkgOnePic;
	
	@Transient
	private String pkgPicBase64;

}
