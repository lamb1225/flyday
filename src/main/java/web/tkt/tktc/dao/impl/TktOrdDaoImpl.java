package web.tkt.tktc.dao.impl;

import java.util.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import web.tkt.tktc.dao.TktOrdDao;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktOrd;
import java.sql.*;

public class TktOrdDaoImpl implements TktOrdDao {
	
//	String driver = "com.mysql.cj.jdbc.Driver";
//	String url = "jdbc:mysql://localhost:3306/flyday?serverTimezone=Asia/Taipei";
//	String userid = "root";
//	String passwd = "123456";
	
	private static DataSource ds = null;
	static {
		try {
			Context ctx = new InitialContext();
			ds = (DataSource) ctx.lookup("java:comp/env/jdbc/flyday");
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}
	
	private static final String INSERT_STMT = "INSERT INTO tkt_ord (mem_no, mem_tkt_coup_no, "
			+ "org_price, disc_price, pay_price, con_title, con_name, con_phone, con_email, "
			+ "ord_date, ord_ref_date, ord_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, default, "
			+ "default, default)";
	private static final String UPDATE = "UPDATE tkt_ord set ord_ref_date = current_timestamp(), ord_stat = ? where tkt_ord_no = ?";
	private static final String GET_ONE_STMT = "SELECT * FROM tkt_ord where tkt_ord_no = ?";
	private static final String GET_ALL_BYMEM_STMT = "SELECT * FROM tkt_ord where mem_no = ? order by tkt_ord_no desc";
	public static final String GET_ALL_STMT = "SELECT * FROM tkt_ord order by tkt_ord_no desc";
	
	//產生同條連線用
	public Connection getConnectionForTx() throws SQLException{
		return ds.getConnection();
	}

	public int insert(TktOrd tktOrd, Connection con) {
		Integer generatedOrderNo = -1;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
//			con = ds.getConnection();
			
			//預防多筆訂單同時下單，會出錯
//			int[] cols = {1};
			pstmt = con.prepareStatement(INSERT_STMT, Statement.RETURN_GENERATED_KEYS);

			pstmt.setInt(1, tktOrd.getMemNo());
			//如果未使用的優惠券，統一都設1
			pstmt.setInt(2, tktOrd.getMemTktCoupNo());
			pstmt.setInt(3, tktOrd.getOrgPrice());
			pstmt.setInt(4, tktOrd.getDiscPrice());
			pstmt.setInt(5, tktOrd.getPayPrice());
			pstmt.setString(6, tktOrd.getConTitle());
			pstmt.setString(7, tktOrd.getConName());
			pstmt.setString(8, tktOrd.getConPhone());
			pstmt.setString(9, tktOrd.getConEmail());

			int i = pstmt.executeUpdate();
			rs = pstmt.getGeneratedKeys();
			if (i > 0) {
				try (ResultSet generatedKeys = rs) {
					if (generatedKeys.next()) {
						generatedOrderNo = generatedKeys.getInt(1); // MySQL驅動只支援欄位索引值取得自增主鍵值，此為訂單編號
						return generatedOrderNo;
					}else {
						System.out.println("NO KEYS WERE GENERATED.");
					}
				}
			}
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
		}
		return generatedOrderNo;
	}
	
	public void insert(Integer tktOrdNo, List<TktJoin> tktJoinList, Connection con) {
		PreparedStatement pstmt = null;
		
		StringBuffer sqlBuffer = new StringBuffer("insert into TKT_ORD_DETAILS "
				+ "(TKT_ORD_NO, TKT_TYPE_NO, TKT_ORD_QTY, UNIT_PRICE, COMMENT_STAT) "
				+ "values (?, ?, ?, ?, default)");
		int size = tktJoinList.size();
		for (int i = 0; i < size - 1; i++) {
			sqlBuffer.append(",(?, ?, ?, ?, default)");
		}
		String sql = sqlBuffer.substring(0, sqlBuffer.length() - 1) + ");";
		
		try {
			pstmt = con.prepareStatement(sql);
			for (int i = 0; i < size; i++) {
				TktJoin tktJoin = tktJoinList.get(i);
				int parameterIndex = i * 4;
				pstmt.setInt(1 + parameterIndex, tktOrdNo);
				pstmt.setInt(2 + parameterIndex, tktJoin.getTktTypeNo());
				pstmt.setInt(3 + parameterIndex, tktJoin.getTktQty());
				pstmt.setInt(4 + parameterIndex, tktJoin.getPrice());
			}
			pstmt.executeUpdate();
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
		}finally {
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
		}
	}
	
	//還要再同時insert持有票券(用同條連線)
	
	
	
	
	
	@Override
	public void update(Integer tktOrdNo, Integer ordStat) {
		Connection con = null;
		PreparedStatement pstmt = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(UPDATE);

			pstmt.setInt(1, tktOrdNo);
			pstmt.setInt(2, ordStat);

			pstmt.executeUpdate();

			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
	}

	@Override
	public TktOrd findByPrimaryKey(Integer tktOrdNo) {
		TktOrd tktOrd = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ONE_STMT);

			pstmt.setInt(1, tktOrdNo);
			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				tktOrd = new TktOrd();
				tktOrd.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrd.setMemNo(rs.getInt("mem_no"));
				tktOrd.setMemTktCoupNo(rs.getInt("mem_tkt_coup_no"));
				tktOrd.setOrgPrice(rs.getInt("org_price"));
				tktOrd.setDiscPrice(rs.getInt("disc_price"));
				tktOrd.setPayPrice(rs.getInt("pay_price"));
				tktOrd.setConTitle(rs.getString("con_title"));
				tktOrd.setConName(rs.getString("con_name"));
				tktOrd.setConPhone(rs.getString("con_phone"));
				tktOrd.setConEmail(rs.getString("con_email"));
				tktOrd.setOrdDate(rs.getTimestamp("ord_date"));
				tktOrd.setOrdRefDate(rs.getTimestamp("ord_ref_date"));
				tktOrd.setOrdStat(rs.getInt("ord_stat"));
			}

			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return tktOrd;
	}
	
	@Override
	public List<TktOrd> getAll(Integer memNo) {
		List<TktOrd> tktOrdList = new ArrayList<TktOrd>();
		TktOrd tktOrd = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {

//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ALL_BYMEM_STMT);

			pstmt.setInt(1, memNo);
			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				tktOrd = new TktOrd();
				tktOrd.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrd.setMemNo(rs.getInt("mem_no"));
				tktOrd.setMemTktCoupNo(rs.getInt("mem_tkt_coup_no"));
				tktOrd.setOrgPrice(rs.getInt("org_price"));
				tktOrd.setDiscPrice(rs.getInt("disc_price"));
				tktOrd.setPayPrice(rs.getInt("pay_price"));
				tktOrd.setConTitle(rs.getString("con_title"));
				tktOrd.setConName(rs.getString("con_name"));
				tktOrd.setConPhone(rs.getString("con_phone"));
				tktOrd.setConEmail(rs.getString("con_email"));
				tktOrd.setOrdDate(rs.getTimestamp("ord_date"));
				tktOrd.setOrdRefDate(rs.getTimestamp("ord_ref_date"));
				tktOrd.setOrdStat(rs.getInt("ord_stat"));
				tktOrdList.add(tktOrd);
			}

			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return tktOrdList;
	}
	
	@Override
	public List<TktOrd> getAll() {
		List<TktOrd> list = new ArrayList<TktOrd>();
		TktOrd tktOrd = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {

//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ALL_STMT);

			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				tktOrd = new TktOrd();
				tktOrd.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrd.setMemNo(rs.getInt("mem_no"));
				tktOrd.setMemTktCoupNo(rs.getInt("mem_tkt_coup_no"));
				tktOrd.setOrgPrice(rs.getInt("org_price"));
				tktOrd.setDiscPrice(rs.getInt("disc_price"));
				tktOrd.setPayPrice(rs.getInt("pay_price"));
				tktOrd.setConTitle(rs.getString("con_title"));
				tktOrd.setConName(rs.getString("con_name"));
				tktOrd.setConPhone(rs.getString("con_phone"));
				tktOrd.setConEmail(rs.getString("con_email"));
				tktOrd.setOrdDate(rs.getTimestamp("ord_date"));
				tktOrd.setOrdRefDate(rs.getTimestamp("ord_ref_date"));
				tktOrd.setOrdStat(rs.getInt("ord_stat"));
				list.add(tktOrd);
			}

			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return list;
	}

	@Override
	public void insert(TktOrd tktord) {
		// TODO Auto-generated method stub
	}
	
//	public static void main(String[] args) {
//		
//		TktOrdDaoImpl dao = new TktOrdImpl();
		
		//新增
//		TktOrd tktOrd1 = new TktOrd();
//		tktOrd1.setMemNo(2);
//		tktOrd1.setMemTktCoupNo(1);
//		tktOrd1.setOrgPrice(400);
//		tktOrd1.setDiscPrice(0);
//		tktOrd1.setPayPrice(400);
//		tktOrd1.setConTitle("先生");
//		tktOrd1.setConName("William");
//		tktOrd1.setConPhone("2345678901");
//		tktOrd1.setConEmail("222@gmail.com");
//		dao.insert(tktOrd1);
		
		//修改
//		dao.update(2, 2);
//		System.out.println("修改成功");
		
		//查詢單一
//		TktOrd tktOrd2 = dao.findByPrimaryKey(1);
//		System.out.println(tktOrd2.toString());
		
		//查詢會員全部
//		List<TktOrd> list = dao.getAll(2);
//		for (TktOrd tOrd : list) {
//			System.out.println(tOrd.toString());
//			System.out.println();
//		}
		
		//查詢全部訂單
//		List<TktOrd> list = dao.getAll();
//		for (TktOrd tOrdAll : list) {
//			System.out.println(tOrdAll.toString());
//			System.out.println();
//		}
//	}
}
