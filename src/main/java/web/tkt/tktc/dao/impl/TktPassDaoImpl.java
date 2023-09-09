package web.tkt.tktc.dao.impl;

import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import web.tkt.tktc.dao.TktPassDao;
import web.tkt.tktc.entity.TktPass;

public class TktPassDaoImpl implements TktPassDao {
	
	String driver = "com.mysql.cj.jdbc.Driver";
	String url = "jdbc:mysql://localhost:3306/flyday?serverTimezone=Asia/Taipei";
	String userid = "root";
	String passwd = "123456";
	
//	private static DataSource ds = null;
//	static {
//		try {
//			Context ctx = new InitialContext();
//			ds = (DataSource) ctx.lookup("java:comp/env/jdbc/flyday");
//		} catch (NamingException e) {
//			e.printStackTrace();
//		}
//	}
	
	private static final String INSERT_STMT = "INSERT INTO tkt_pass (tkt_type_no, mem_no, qrcode, exp_date)"
			+ " values (?, ?, '?', '?')";
	private static final String SELECT_MEM_STMT = "SELECT p.mem_no, tkt_ord_no, tkt_pass_no, tkt_type_no,"
			+ " qrcode, exp_date, ord_stat FROM tkt_pass p"
			+ " JOIN tkt_ord o on p.mem_no = o.mem_no"
			+ " WHERE p.mem_no = ? and tkt_ord_no = ?";
	@Override
	public void insert(TktPass tktPass) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public List selectOrdNo(Integer memNo, Integer tktOrdNo) {
		// TODO Auto-generated method stub
		return null;
	}
}
