package web.act.entity.ComKey;

import java.io.Serializable;
import java.util.Objects;
/**
 * 定義複合識別類別
 * 覆寫equals()
 * 覆寫hashCode()
 * 註:建議將複合識別類別，
 * 定義成實體類別的靜態巢狀類別
 * */
public class Act_JoinID implements Serializable {
    public 	Integer actno;
    public 	Integer	memno;

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
