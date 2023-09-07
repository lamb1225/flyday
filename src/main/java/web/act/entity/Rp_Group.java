package web.act.entity;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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
public class Rp_Group extends Core {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RP_GROUP_NO")
    private Integer rpgroupno;
    @Column(name = "MEM_NO")
    private Integer memno;
    @Column(name = "ACT_NO")
    private Integer actno;
    @Column(name = "RP_GROUP_REASON",insertable = false)
    private Integer rpgroupreason;
    @Column(name = "RP_GROUP_CONTENT")
    private String rpgroupcontent;
    @Column(name = "RP_GROUP_TIMESTAMP",insertable = false,updatable = false)
    private Timestamp rpgrouptimestamp;
    @Column(name = "EMP_NO",insertable = false)
    private Integer empno;
    @Column(name = "RP_GROUP_DONE_TIME",insertable = false)
    private Timestamp rpgroupdonetime;
    @Column(name = "RP_GROUP_STATUS",insertable = false)
    private Integer rpgroupstatus;
    @Column(name = "RP_GROUP_NOTE")
    private String rpgroupnote;

}
