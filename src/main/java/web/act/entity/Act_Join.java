package web.act.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import web.act.entity.ComKey.Act_JoinID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
@IdClass(Act_JoinID.class)
public class Act_Join implements Serializable {
    @Id
    @Column(name="ACT_NO")
    private	Integer actno;
    @Id
    @Column(name="MEM_NO")
    private	Integer	memno;
    @Column(name="JOIN_TIME")
    private Timestamp jointime;
    @Column(name="JOIN_STATUS")
    private	Integer	joinstatus;

}
