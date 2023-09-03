package web.act.entity.ComKey;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

/**
 * 定義複合識別類別
 * 覆寫equals()
 * 覆寫hashCode()
 * 註:建議將複合識別類別，
 * 定義成實體類別的靜態巢狀類別
 */


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Act_JoinID1 implements Serializable {
    private static final long serialVersionUID = 8998283781632096270L;
    private Integer actno;
    private Integer memno;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Act_JoinID1 actJoinID = (Act_JoinID1) o;

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
