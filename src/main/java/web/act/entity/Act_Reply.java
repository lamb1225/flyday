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
public class Act_Reply implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ACT_REPLY_NO")
    private	Integer	actreplyno;
    @Column(name="ACT_NO")
    private	Integer	actno;
    @Column(name="REPLY_CONTENT")
    private	String	replycontent;
    @Column(name="MEM_NO")
    private	Integer	memno;
    @Column(name="ACT_REPLY_TIME")
    private Timestamp actreplytime;
    @Column(name="ACT_REPLY_STATUS")
    private	Integer	actreplystatus;


}
