package web.tkt.tktc.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import web.tkt.tktc.dao.TktOrdDetailsDao;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktOrdDetails;
import web.tkt.tktc.entity.TktOrdDetailsJoin;

public class TktOrdDetailsDaoImpl implements TktOrdDetailsDao {

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
	
	private static final String UPDATE = "UPDATE tkt_ord_details set comment_stat = 1 where tkt_ord_no = ? AND tkt_type_no = ?";
	private static final String GET_ONE_STMT = "SELECT * FROM tkt_ord_details where tkt_ord_no = ? AND tkt_type_no = ?";
	private static final String GET_ALL_STMT = "SELECT * FROM tkt_ord_details where tkt_ord_no = ? order by tkt_type_no";
	private static final String JOIN_STMT = "SELECT tkt_ord_no, tkt_name, plan_name, tkt_type, d.tkt_type_no, unit_price,"
			+ " tkt_ord_qty, location, ratetotal"
			+ " FROM tkt_ord_details d"
			+ " JOIN tkt_type t on d.tkt_type_no = t.tkt_type_no"
			+ " JOIN tkt_plan p on t.tkt_plan_no = p.tkt_plan_no"
			+ " JOIN tkt on p.tkt_no = tkt.tkt_no"
			+ " where tkt_ord_no = ?;";
	private static final String JOIN_ALL_STMT = "SELECT tkt_ord_no, tkt_name, plan_name, tkt_type, d.tkt_type_no, unit_price,"
			+ " tkt_ord_qty, location, ratetotal"
			+ " FROM tkt_ord_details d"
			+ " JOIN tkt_type t on d.tkt_type_no = t.tkt_type_no"
			+ " JOIN tkt_plan p on t.tkt_plan_no = p.tkt_plan_no"
			+ " JOIN tkt on p.tkt_no = tkt.tkt_no"
			+ " order by tkt_ord_no desc;";
	
	@Override
	public void insert(Integer tktOrdNo, List<TktJoin> tktJoinList, Integer commentStat) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void update(Integer tktOrdNo, Integer tktTypeNo) {
		Connection con = null;
		PreparedStatement pstmt = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(UPDATE);
			
			pstmt.setInt(1, tktOrdNo);
			pstmt.setInt(2, tktTypeNo);
			
			pstmt.executeUpdate();
			
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
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
	public TktOrdDetails findByPrimarkeyDetails(Integer tktOrdNo, Integer tktTypeNo) {
		TktOrdDetails tktOrdDetails = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ONE_STMT);
			
			pstmt.setInt(1, tktOrdNo);
			pstmt.setInt(2, tktTypeNo);
			rs = pstmt.executeQuery();
			
			while (rs.next()){
				tktOrdDetails = new TktOrdDetails();
				tktOrdDetails.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrdDetails.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktOrdDetails.setTktOrdQty(rs.getInt("tkt_ord_qty"));
				tktOrdDetails.setUnitPrice(rs.getInt("unit_price"));
				tktOrdDetails.setCommentStat(rs.getInt("comment_stat"));
			}
			
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
		}finally {
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
		return tktOrdDetails;
	}
	
	@Override
	public List<TktOrdDetails> getAll(Integer tktOrdNo) {
		List<TktOrdDetails> list = new ArrayList<TktOrdDetails>();
		TktOrdDetails tktOrdDetails = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ALL_STMT);
			
			pstmt.setInt(1, tktOrdNo);
			rs = pstmt.executeQuery();
			
			while (rs.next()) {
				tktOrdDetails = new TktOrdDetails();
				tktOrdDetails.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrdDetails.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktOrdDetails.setTktOrdQty(rs.getInt("tkt_ord_qty"));
				tktOrdDetails.setUnitPrice(rs.getInt("unit_price"));
				tktOrdDetails.setCommentStat(rs.getInt("comment_stat"));
				list.add(tktOrdDetails);
			}
			
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
		}finally {
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
	public List<TktOrdDetailsJoin> selectByTktOrdNo(Integer tktOrdNo) {
		List<TktOrdDetailsJoin> list = new ArrayList<TktOrdDetailsJoin>();
		TktOrdDetailsJoin tktOrdDetailsJoin = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(JOIN_STMT);
			
			pstmt.setInt(1, tktOrdNo);
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				tktOrdDetailsJoin = new TktOrdDetailsJoin();
				tktOrdDetailsJoin.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrdDetailsJoin.setTktName(rs.getString("tkt_name"));
				tktOrdDetailsJoin.setPlanName(rs.getString("plan_name"));
				tktOrdDetailsJoin.setTktType(rs.getString("tkt_type"));
				tktOrdDetailsJoin.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktOrdDetailsJoin.setUnitPrice(rs.getInt("unit_price"));
				tktOrdDetailsJoin.setTktOrdQty(rs.getInt("tkt_ord_qty"));
				tktOrdDetailsJoin.setLocation(rs.getString("location"));
				tktOrdDetailsJoin.setRateTotal(rs.getInt("rateTotal"));
				list.add(tktOrdDetailsJoin);
			}
			
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
		}finally {
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
	public List<TktOrdDetailsJoin> getAll() {
		List<TktOrdDetailsJoin> list = new ArrayList<TktOrdDetailsJoin>();
		TktOrdDetailsJoin tktOrdDetailsJoin = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
//			con = DriverManager.getConnection(url, userid, passwd);
			con = ds.getConnection();
			pstmt = con.prepareStatement(JOIN_ALL_STMT);
			
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				tktOrdDetailsJoin = new TktOrdDetailsJoin();
				tktOrdDetailsJoin.setTktOrdNo(rs.getInt("tkt_ord_no"));
				tktOrdDetailsJoin.setTktName(rs.getString("tkt_name"));
				tktOrdDetailsJoin.setPlanName(rs.getString("plan_name"));
				tktOrdDetailsJoin.setTktType(rs.getString("tkt_type"));
				tktOrdDetailsJoin.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktOrdDetailsJoin.setUnitPrice(rs.getInt("unit_price"));
				tktOrdDetailsJoin.setTktOrdQty(rs.getInt("tkt_ord_qty"));
				tktOrdDetailsJoin.setLocation(rs.getString("location"));
				tktOrdDetailsJoin.setRateTotal(rs.getInt("rateTotal"));
				list.add(tktOrdDetailsJoin);
			}
			
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
		}finally {
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
	
	
	
//	public static void main(String[] args) {
//		
//		TktOrdDetailsDaoImpl dao = new TktOrdDetailsDaoImpl();
		
		//修改
//		dao.update(1, 2);
		
		//查詢單一明細
//		TktOrdDetails tktOrdDetails = dao.findByPrimarkeyDetails(1, 1);
//		System.out.println(tktOrdDetails.toString());
		
		//查詢一筆訂單全部明細
//		List<TktOrdDetails> list = dao.getAll(1);
//		for (TktOrdDetails tOrdDetails : list) {
//			System.out.println(tOrdDetails.toString());
//			System.out.println();
//		}
		
		//Join查詢
//		List<TktOrdDetailsJoin> list = dao.selectByTktOrdNo(1);
//		for (TktOrdDetailsJoin tOrdDetailsJoin : list) {
//			System.out.println(tOrdDetailsJoin.toString());
//			System.out.println();
//		}
//	}
}
