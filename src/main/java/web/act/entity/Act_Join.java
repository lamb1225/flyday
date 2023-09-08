package web.act.entity;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

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
public class Act_Join extends Core {
    @Id
    @Column(name = "ACT_NO")
    private Integer actno;
    @Id
    @Column(name = "MEM_NO")
    private Integer memno;
    @Column(name = "JOIN_TIME", insertable = false, updatable = false)
    private Timestamp jointime;
    @Column(name = "JOIN_STATUS", insertable = false)
    private Integer joinstatus;
    @Column(updatable = false)
    private Integer Payment;
    @ManyToOne
    @JoinColumn(name = "ACT_NO", insertable = false, updatable = false)
    private Act act;

}

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
class Act_JoinID implements Serializable {
    private static final long serialVersionUID = 8998283781632096270L;
    private Integer actno;
    private Integer memno;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Act_JoinID actJoinID = (Act_JoinID) o;

        if (!Objects.equals(actno, actJoinID.actno)) return false;
        return Objects.equals(memno, actJoinID.memno);
    }

    @Override
    public int hashCode() {
        int result = actno != null ? actno.hashCode() : 0;
        result = 31 * result + (memno != null ? memno.hashCode() : 0);
        return result;
    }
}
