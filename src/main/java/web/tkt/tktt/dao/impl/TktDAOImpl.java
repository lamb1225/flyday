package web.tkt.tktt.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import web.tkt.tktt.dao.TktDAO;
import web.tkt.tktt.entity.Tkt;
import web.tkt.tktt.entity.TktPlan;
import web.tkt.tktt.util.Util;

public class TktDAOImpl implements TktDAO{
	
	static {
		try {
			Class.forName(Util.DRIVER);
		} catch (ClassNotFoundException ce) {
			ce.printStackTrace();
		}
	}

	
//	private static DataSource ds = null;
//	static {
//		try {
//			Context ctx = new InitialContext();
//			ds = (DataSource) ctx.lookup("java:comp/env/jdbc/flyday");
//		} catch (NamingException e) {
//			e.printStackTrace();
//		}
//	}

	private static final String INSERT_STMT = 
			"INSERT INTO tkt(TKT_NAME, TKT_STARTDATE, TKT_ENDDATE, TKT_INSTRUCTION, PROD_DESC, NOTICE, HOWUSE, LOCATION, COUNTYCITY, ADDRESS, SC_LATITUDE, SC_LONGITUDE, SC_HOWARRIVAL, SC_SERVICEHR, TKT_STAT, TKT_SORT, RATETOTAL, RATEQTY)"
			+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	private static final String findMaxTktno_STMT = 
			"SELECT MAX(TKT_NO) TKT_NO FROM tkt";
	private static final String INSERTPLAN_STMT = 
			"INSERT INTO tkt_plan(TKT_NO,PLAN_NAME,PLAN_CONTENT,SOLD_AMOUNT,PLAN_STAT) VALUES (?, ?, ?, ? ,?)";
	private static final String findByPK_STMT = 
			"SELECT TKT_NO,TKT_NAME FROM tkt WHERE TKT_NO = ?";
	private static final String getAll_STMT = 
			"SELECT TKT_NO,TKT_NAME,TKT_STARTDATE,TKT_ENDDATE,TKT_STAT,TKT_SORT FROM tkt ORDER BY TKT_NO";
	
	// 新增商品
	@Override
	public void insertTkt(Tkt tkt) {
		System.out.println("有到insert()");
		
		try (	Connection con = DriverManager.getConnection(Util.URL, Util.USER, Util.PASSWORD);
				PreparedStatement pstmt = con.prepareStatement(INSERT_STMT);){
		
//		try (	Connection con = ds.getConnection();
//				PreparedStatement pstmt = con.prepareStatement(INSERT_STMT);){
			
			pstmt.setString(1, tkt.getTktname());
			pstmt.setString(2, tkt.getTktstartdate());
			pstmt.setString(3, tkt.getTktenddate());			
			pstmt.setString(4, tkt.getTktinstruction());
			pstmt.setString(5, tkt.getProddesc());			
			pstmt.setString(6, tkt.getNotice());
			pstmt.setString(7, tkt.getHowuse());
			pstmt.setString(8, tkt.getLocation());
			pstmt.setString(9, tkt.getCountycity());
			pstmt.setString(10, tkt.getAddress());
			pstmt.setDouble(11, tkt.getSclatitude());
			pstmt.setDouble(12, tkt.getSclongitude());
			pstmt.setString(13, tkt.getSchowarrival());
			pstmt.setString(14, tkt.getScservicehr());
			pstmt.setInt(15, tkt.getTktstat());
			pstmt.setInt(16, tkt.getTktsort());
			pstmt.setInt(17, tkt.getRatetotal());
			pstmt.setInt(18, tkt.getRateqty());			
			
			System.out.println("新增成功222");

			pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
//		return -1;
	}
	
	// 查詢最大Tkt_NO
//	@Override
//	public void findMaxTktno(Integer tktno) {
//		TktPlan tktplan = null;
//		
//		try (	Connection con = DriverManager.getConnection(Util.URL, Util.USER, Util.PASSWORD);
//				PreparedStatement pstmt = con.prepareStatement(findMaxTktno_STMT);){
//		
////		try (	Connection con = ds.getConnection();
////				PreparedStatement pstmt = con.prepareStatement(findByPK_STMT);){
//			
////			pstmt.setInt(1, tktno);
//			
//			try(ResultSet rs = pstmt.executeQuery();){
//				while (rs.next()) {
//					tktplan = new TktPlan();
//					tktplan.setTktno(rs.getInt("TKT_NO"));				
//				}
//			}
//						
//			System.out.println("查詢成功="+tktplan);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		
//	}

	// 新增方案
	@Override
	public void insertPlan(TktPlan tktplan) {
		System.out.println("有到insertplan()");
		
		List<String> plannameList = tktplan.getPlanname();
		List<String> plancontentList = tktplan.getPlancontent();
		List<Integer> planstatList = tktplan.getPlanstat();

		try (	Connection con = DriverManager.getConnection(Util.URL, Util.USER, Util.PASSWORD);
				PreparedStatement pstmtno = con.prepareStatement(findMaxTktno_STMT);
				PreparedStatement pstmt = con.prepareStatement(INSERTPLAN_STMT);){
		
//		try (	Connection con = ds.getConnection();
//				PreparedStatement pstmtno = con.prepareStatement(findMaxTktno_STMT);
//				PreparedStatement pstmt = con.prepareStatement(INSERTPLAN_STMT);){
			
			try(ResultSet rsno = pstmtno.executeQuery();){
				while (rsno.next()) {
					pstmt.setInt(1, rsno.getInt("TKT_NO"));
				}
				for (int i = 0; i < plannameList.size(); i++) {
	                String planname = plannameList.get(i);
	                String planconten = plancontentList.get(i);
	                Integer planstat = planstatList.get(i);
	                
	                pstmt.setString(2, planname);
	                pstmt.setString(3, planconten);
	                pstmt.setInt(4, tktplan.getSoldamount());
	                pstmt.setInt(5, planstat);
	                pstmt.addBatch(); // 如果需要批量插入多个值，可以使用addBatch
				}
				
			}
			pstmt.executeBatch(); // 執行批量插入
		} catch (Exception e) {
			e.printStackTrace();
		}

	}


	// 單筆查詢
	@Override
	public Tkt findByPK(Integer tktno) {
		
		Tkt tkt = null;
		
		try (	Connection con = DriverManager.getConnection(Util.URL, Util.USER, Util.PASSWORD);
				PreparedStatement pstmt = con.prepareStatement(findByPK_STMT);){
		
//		try (	Connection con = ds.getConnection();
//				PreparedStatement pstmt = con.prepareStatement(findByPK_STMT);){
			
			pstmt.setInt(1, tktno);
			
			try(ResultSet rs = pstmt.executeQuery();){
				while (rs.next()) {
					tkt = new Tkt();
					tkt.setTktno(rs.getInt("TKT_NO"));
					tkt.setTktname(rs.getString("TKT_NAME"));				
				}
			}
						
			System.out.println("查詢成功");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return tkt;

	}
	

	// 多筆查詢
	@Override
	public List<Tkt> getAll() {
		List<Tkt> list = new ArrayList<Tkt>();
		Tkt tkt = null;

		try (	Connection con = DriverManager.getConnection(Util.URL, Util.USER, Util.PASSWORD);
				PreparedStatement pstmt = con.prepareStatement(getAll_STMT);){
		
//		try (	Connection con = ds.getConnection();
//				PreparedStatement pstmt = con.prepareStatement(findAll_STMT);){
			
			
			try(ResultSet rs = pstmt.executeQuery();){
				while (rs.next()) {
					tkt = new Tkt();
					tkt.setTktno(rs.getInt("TKT_NO"));
					tkt.setTktname(rs.getString("TKT_NAME"));
					tkt.setTktstartdate(rs.getString("TKT_STARTDATE"));
					tkt.setTktenddate(rs.getString("TKT_ENDDATE"));
					tkt.setTktstat(rs.getInt("TKT_STAT"));
					tkt.setTktsort(rs.getInt("TKT_SORT"));
					
					list.add(tkt); 
				}
			}
			
			System.out.println("查詢成功");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}






	
	

}
