package web.emp.empinfo.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.emp.empinfo.dao.EmpDao;
import web.emp.empinfo.entity.Emp;

@Repository
public class EmpDaoImpl implements EmpDao {

	@PersistenceContext
	private Session session;
	
	
	@Override
	public int insert(Emp emp) {
		session.persist(emp);
		return 1;
	}

	@Override
	public int delectByEmpNo(Integer empNo) {
		Emp emp = session.get(Emp.class, empNo);
		session.remove(emp);
		return 1;
	}

	@Override
	public int update(Emp emp) {
		final String hql = "UPDATE Emp SET empAcc = :empAcc ,empPwd = :empPwd"
				+ "empName = :empName, empStatus = :empStatus WHERE empNo = :empNo";
				
		
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
		final String hql = "FROM emp ORDER BY id";
		return session.createQuery(hql, Emp.class).getResultList();
	}
	
}
