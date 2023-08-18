package web.store.store.entity;

import java.sql.Timestamp;

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
public class StoreMember extends Core{
	private static final long serialVersionUID = 1062017833925367218L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "STORE_NO")
	private Integer storeNo;
	@Column(name = "STORE_ACC")
	private String storeAcc;
	@Column(name = "STORE_PWD")
	private String storePwd;
	@Column(name = "ACC_STATUS")
	private Integer accStatus;
	@Column(name = "STORE_NAME")
	private String storeName;
	@Column(name = "STORE_TEL")
	private String storeTel;
	@Column(name = "STORE_ADD")
	private String storeAdd;
	@Column(name = "STORE_EMAIL")
	private String storeEmail;
	@Column(name = "STORE_REG_DATE", insertable = false)
	private Timestamp storeRegDate;
	@Column(name = "STORE_REPLY")
	private String storeReply;
	@Column(name = "STORE_REVIEW")
	private Integer storeReview;
	@Column(name = "STORE_NOTE")
	private String storeNote;
}
