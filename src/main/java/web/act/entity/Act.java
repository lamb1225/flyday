package web.act.entity;

import core.entity.Core;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.mapping.ToOne;
import web.pkg.pkgmanage.entity.Pkg;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * @author CHA102_10
 * 建立資料庫欄位及對應實體變數
 */
/**
 * strategy = GenerationType.IDENTITY
 * TABLE：使用一個特定的資料庫表格來保存主鍵。
 * SEQUENCE：根據底層資料庫的序列來生成主鍵，條件是資料庫支援序列。
 * IDENTITY：主鍵由資料庫自動生成（主要是自動增長型）
 * AUTO：主鍵由程式控制。
 * */
@Entity //設定為實體類別
@Setter //建立類別Setter
@Getter // 建立類別Getter
@NoArgsConstructor // 生成一個沒有參數的構造函數
@AllArgsConstructor // 為類中的每個字段生成一個帶有 1 個參數的構造函數
//@Table(name = "act")與資料庫同名不須再設定(不區分⼤⼩寫)

public class Act extends Core {
    @Id //設定識別屬性。可在屬性或Setter/Getter前設定
    @GeneratedValue(strategy = GenerationType.IDENTITY) //設定識別值產⽣⽅式
    @Column(name = "ACT_NO") //設定屬性映射欄位 若與資料表同名則不用設定(不區分⼤⼩寫)
    private Integer actno;
    @Column(name = "MEM_NO", updatable = false) //設定屬性映射欄位，updatable = false 設定不能更新
    private Integer memno;
    @Column(name = "PKG_NO", updatable = false) //設定屬性映射欄位，updatable = false 設定不能更新
    private Integer pkgno;
    @Column(name = "ACT_TITLE")
    private String acttitle;
    @Column(name = "ACT_CONTENT")
    private String actcontent;
    @Column(name = "ACT_MAX_COUNT", updatable = false)
    private Integer actmaxcount;
    @Column(name = "ACT_MIN_COUNT", updatable = false)
    private Integer actmincount;
    @Column(name = "ACT_CURRENT_COUNT", insertable = false)//設定屬性映射欄位，insertable = false 設定不能新增
    private Integer actcurrentcount;
    @Column(name = "ACT_JOIN_BEGIN", updatable = false)//設定屬性映射欄位，updatable = false 設定不能修改
    private Timestamp actjoinbegin;
    @Column(name = "ACT_JOIN_END", updatable = false)
    private Timestamp actjoinend;
    @Column(name = "ACT_STATUS", insertable = false)
    private Integer actstatus;
    @Column(updatable = false)
    private Double price;


}
