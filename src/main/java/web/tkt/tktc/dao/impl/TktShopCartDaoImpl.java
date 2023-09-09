package web.tkt.tktc.dao.impl;

import java.util.*;
import java.sql.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import web.tkt.tktc.dao.TktShopCartDao;
import web.tkt.tktc.entity.TktJoin;
import web.tkt.tktc.entity.TktShopCart;

public class TktShopCartDaoImpl implements TktShopCartDao {

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

	private static final String INSERT_STMT = "INSERT INTO tkt_shop_cart (mem_no, tkt_type_no, tkt_qty) VALUES (?, ?, ?)";
	private static final String DELETE = "DELETE FROM tkt_shop_cart where mem_no = ? and tkt_type_no = ?";
	private static final String DELETE_ALL = "DELETE FROM tkt_shop_cart where mem_no = ?";
	private static final String UPDATE = "UPDATE tkt_shop_cart set tkt_qty = ? where mem_no = ? and tkt_type_no = ?";
	private static final String GET_ALL_STMT = "SELECT * FROM tkt_shop_cart where mem_no = ? order by tkt_type_no";
	private static final String GET_ONE_STMT = "SELECT * FROM tkt_shop_cart where mem_no = ? and tkt_type_no = ?";
	private static final String JOIN_STMT = "SELECT mem_no, tkt_name, plan_name, tkt_type, c.tkt_type_no, price, tkt_qty, location, ratetotal"
			+ " FROM tkt_shop_cart c"
			+ " join tkt_type t on c.tkt_type_no = t.tkt_type_no"
			+ " join tkt_plan p on t.tkt_plan_no = p.tkt_plan_no"
			+ " join tkt on p.tkt_no = tkt.tkt_no where mem_no = ?";
	
	@Override
	public void insert(TktShopCart tktShopCart) {

		Connection con = null;
		PreparedStatement pstmt = null;

		try {

			con = ds.getConnection();
			pstmt = con.prepareStatement(INSERT_STMT);

			pstmt.setInt(1, tktShopCart.getMemNo());
			pstmt.setInt(2, tktShopCart.getTktTypeNo());
			pstmt.setInt(3, tktShopCart.getTktQty());

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
	public void delete(Integer memNo, Integer tktTypeNo) {

		Connection con = null;
		PreparedStatement pstmt = null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(DELETE);

			pstmt.setInt(1, memNo);
			pstmt.setInt(2, tktTypeNo);

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
	
	//刪除全部(給結帳時清空用的)
	@Override
	public void delete(Integer memNo) {
		
		Connection con = null;
		PreparedStatement pstmt = null;
		
		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(DELETE_ALL);

			pstmt.setInt(1, memNo);

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
	public void update(TktShopCart tktshopCart) {

		Connection con = null;
		PreparedStatement pstmt = null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(UPDATE);

			pstmt.setInt(1, tktshopCart.getTktQty());
			pstmt.setInt(2, tktshopCart.getMemNo());
			pstmt.setInt(3, tktshopCart.getTktTypeNo());

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
	public TktShopCart findByPrimaryKey(Integer memNo, Integer tktTypeNo) {

		TktShopCart tktShopCart = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ONE_STMT);

			pstmt.setInt(1, memNo);
			pstmt.setInt(2, tktTypeNo);

			rs = pstmt.executeQuery();

			while (rs.next()) {
				tktShopCart = new TktShopCart();
				tktShopCart.setMemNo(rs.getInt("mem_no"));
				tktShopCart.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktShopCart.setTktQty(rs.getInt("tkt_qty"));

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
		return tktShopCart;
	}

	
	//可能會刪除，因為被join後的list取代
//	@Override
	public List<TktShopCart> getAll(Integer memNo) {
		List<TktShopCart> list = new ArrayList<TktShopCart>();
		TktShopCart tktShopCart = null;

		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ALL_STMT);
			
			pstmt.setInt(1, memNo);
			rs = pstmt.executeQuery();

			while (rs.next()) {
				tktShopCart = new TktShopCart();
				tktShopCart.setMemNo(rs.getInt("mem_no"));
				tktShopCart.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktShopCart.setTktQty(rs.getInt("tkt_qty"));
				list.add(tktShopCart); // Store the row in the list
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
	public List<TktJoin> selectByMemNo(Integer memNo) {
		List<TktJoin> list = new ArrayList<TktJoin>();
		TktJoin tktJoin = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(JOIN_STMT);

			pstmt.setInt(1, memNo);
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				tktJoin = new TktJoin();
				tktJoin.setMemNo(rs.getInt("mem_no"));
				tktJoin.setTktName(rs.getString("tkt_name"));
				tktJoin.setPlanName(rs.getString("plan_name"));
				tktJoin.setTktType(rs.getString("tkt_type"));
				tktJoin.setTktTypeNo(rs.getInt("tkt_type_no"));
				tktJoin.setPrice(rs.getInt("price"));
				tktJoin.setTktQty(rs.getInt("tkt_qty"));
				tktJoin.setLocation(rs.getString("location"));
				tktJoin.setRateTotal(rs.getInt("rateTotal"));
				list.add(tktJoin); // Store the row in the list
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

	

//	public static void main(String[] args) {
//
//		TktShopCartDaoImpl dao = new TktShopCartDaoImpl();
		// 新增
//			TktShopCart tktShop1 = new TktShopCart();
//			tktShop1.setMemNo(4);
//			tktShop1.setTktTypeNo(2);
//			tktShop1.setTktQty(2);
//			dao.insert(tktShop1);
//		
		
		// 刪除
//			dao.delete(4, 2);
		
		// 修改
//			TktShopCart tktShop2 = new TktShopCart();
//			tktShop2.setTktQty(3);
//			tktShop2.setMemNo(4);
//			tktShop2.setTktTypeNo(2);
//			dao.update(tktShop2);
		
		// 查詢單一
//			TktShopCart tktShop3 = dao.findByPrimaryKey(3, 1);
//			System.out.println(tktShop3.toString());

		// 查詢
//			List<TktShopCart> list = dao.getAll(2);
//			for (TktShopCart tShopCart : list) {
//				System.out.print(tShopCart.toString());
//				System.out.println();
//			}
		
		//join查詢
//			List<TktJoin> list = dao.selectByMemNo(1);
//			for (TktJoin tktJoin : list) {
//				System.out.print(tktJoin.toString());
//				System.out.println();
//			}
//	}
}
