package web.act.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author CHA102_10
 * 建立資料庫欄位及對應實體變數
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Rp_Group implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RP_GROUP_NO")
    private Integer rpgroupno;
    @Column(name = "MEM_NO")
    private Integer memno;
    @Column(name = "ACT_NO")
    private Integer actno;
    @Column(name = "RP_GROUP_REASON")
    private Integer rpgroupreason;
    @Column(name = "RP_GROUP_CONTENT")
    private String rpgroupcontent;
    @Column(name = "RP_GROUP_TIMESTAMP")
    private Timestamp rpgrouptimestamp;
    @Column(name = "EMP_NO")
    private Integer empno;
    @Column(name = "RP_GROUP_DONE_TIME")
    private Timestamp rpgroupdonetime;
    @Column(name = "RP_GROUP_STATUS")
    private Integer rpgroupstatus;
    @Column(name = "RP_GROUP_NOTE")
    private String rpgroupnote;

}
