package web.emp.empinfo.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.emp.empinfo.dao.EmpDao;
import web.emp.empinfo.entity.Emp;

@Repository
public class EmpDaoImpl implements EmpDao {
	private static final String DELETE = 
			"DELETE FROM `flyday`.`emp` WHERE  (`EMP_NO` = ?);";
	
	private static DataSource ds = null;
	static {
		try {
			Context ctx = new InitialContext();
			ds = (DataSource) ctx.lookup("java:comp/env/jdbc/flyday");
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}
	
	@PersistenceContext
	private Session session;
	
	
	@Override
	public int insert(Emp emp) {
		session.persist(emp);
		return 0;
	}

	@Override
	public int deleteByEmpNo(Integer empNo) {
		int affectedRows = 0;


		try {

			Connection conn= ds.getConnection();
			PreparedStatement ps = conn.prepareStatement(DELETE);

			ps.setInt(1, empNo);

			affectedRows = ps.executeUpdate();

			// Handle any driver errors
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException("A database error occured. "
					+ e.getMessage());
			// Clean up JDBC resources
		} 

		return affectedRows;

	}
	
	
	@Override
	public int update(Emp emp) {
		final String hql = "UPDATE Emp SET "
				+ "empAcc = :empAcc, empPwd = :empPwd, empName = :empName, "
				+ "empStatus = :empStatus WHERE empNo = :empNo";
		
		System.out.println("Updating emp with empNo: " + emp.getEmpNo());
					
		
		return session.createQuery(hql)
				.setParameter("empAcc", emp.getEmpAcc())
				.setParameter("empPwd", emp.getEmpPwd())
				.setParameter("empName", emp.getEmpName())
				.setParameter("empStatus", emp.getEmpStatus())
				.setParameter("empNo", emp.getEmpNo())
				.executeUpdate();	
		
	}

	@Override
	public Emp selectByEmpNo(Integer empNo) {
		return session.get(Emp.class, empNo);
	}
	
	@Override
	public Emp selectByEmpStatus(Integer empStatus) {
		return session.get(Emp.class, empStatus);
	}

@Override
	public Emp selectByEmpAcc(String empAcc) {
		final String hql = "FROM Emp WHERE empAcc = :empAcc";	
		return session.createQuery(hql, Emp.class).setParameter("empAcc", empAcc).uniqueResult();
	}

	@Override
	public Emp selectAccAndPwd(String empAcc, String empPwd) {
		final String hql = "FROM Emp WHERE empAcc = :empAcc AND empPwd = :empPwd";
		return session.createQuery(hql, Emp.class)
				.setParameter("empAcc", empAcc)
				.setParameter("empPwd", empPwd)
				.uniqueResult();
	}

	
	@Override
	public List<Emp> selectAll() {
		final String hql = "FROM Emp ORDER BY id";
		return session.createQuery(hql, Emp.class).getResultList();
	}
	
}
