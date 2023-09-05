package web.mem.meminfo.dao.impl;

import java.util.Base64;
import java.util.List;

import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import web.mem.meminfo.dao.MemDao;
import web.mem.meminfo.entity.Mem;
import web.mem.meminfo.entity.MemLevel;

@Repository
public class MemDaoImpl implements MemDao {

	@PersistenceContext
	private Session session;
	
	
	@Override
	public int insert(Mem mem) {
		session.persist(mem);
		return 1;
	}

	@Override
	public int delectByMemNo(Integer memNo) {
		Mem mem = session.get(Mem.class, memNo);
		session.remove(mem);
		return 1;
	}

	@Override
	public int updateAll(Mem mem) {
		final String hql = "UPDATE Mem SET memLevelNo = :memLevelNo, memAcc = :memAcc ,"
				+ " memPwd = :memPwd, memAccStatus = :memAccStatus, memName = :memName, memGender = :memGender,"
				+ " memBday = :memBday, memEmail = :memEmail, memMobile = :memMobile, memCity = :memCity, memDist = :memDist,"
				+ " memAddr = :memAddr, memActStatus = :memActStatus WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memLevelNo", mem.getMemLevelNo())
				.setParameter("memAcc", mem.getMemAcc())
				.setParameter("memPwd", mem.getMemPwd())
				.setParameter("memAccStatus", mem.getMemAccStatus())
				.setParameter("memName", mem.getMemName())
				.setParameter("memGender", mem.getMemGender())
				.setParameter("memBday", mem.getMemBday())
				.setParameter("memEmail", mem.getMemEmail())
				.setParameter("memMobile", mem.getMemMobile())
				.setParameter("memCity", mem.getMemCity())
				.setParameter("memDist", mem.getMemDist())
				.setParameter("memAddr", mem.getMemAddr())
				.setParameter("memActStatus", mem.getMemActStatus())
				.setParameter("memNo", mem.getMemNo())
				.executeUpdate();	
	}
	
	@Override
	public int updateMemInfo(Mem mem) {
		final String hql = "UPDATE Mem SET memName = :memName, memGender = :memGender, "
				+ "memBday = :memBday, memMobile = :memMobile, memCity = :memCity, memDist = :memDist,"
				+ " memAddr = :memAddr WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memName", mem.getMemName())
				.setParameter("memGender", mem.getMemGender())
				.setParameter("memBday", mem.getMemBday())
				.setParameter("memMobile", mem.getMemMobile())
				.setParameter("memCity", mem.getMemCity())
				.setParameter("memDist", mem.getMemDist())
				.setParameter("memAddr", mem.getMemAddr())
				.setParameter("memNo", mem.getMemNo())
				.executeUpdate();	
	}
	
	@Override
	public int updateMemImage(byte[] memPic, Integer memNo) {
		final String hql = "UPDATE Mem SET memPic = :memPic WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memPic", memPic)
				.setParameter("memNo", memNo)
				.executeUpdate();
	}
	
	
	@Override
	public int updateMemEmail(String memEmail, Integer memNo) {
		final String hql = "UPDATE Mem SET memEmail = :memEmail WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memEmail", memEmail)
				.setParameter("memNo", memNo)
				.executeUpdate();
	}
	
	@Override
	public int updateMemPassword(String newMemPwd, Integer memNo) {
		final String hql = "UPDATE Mem SET memPwd = :memPwd WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memPwd", newMemPwd)
				.setParameter("memNo", memNo)
				.executeUpdate();
	}
	
	@Override
	public int updateMemAccStatus(Integer memAccStatus, Integer memNo) {
		final String hql = "UPDATE Mem SET memAccStatus = :memAccStatus WHERE memNo = :memNo";
		
		return session.createQuery(hql)
				.setParameter("memAccStatus", memAccStatus)
				.setParameter("memNo", memNo)
				.executeUpdate();
	}

	@Override
	public Mem selectByMemNo(Integer memNo) {
		return session.get(Mem.class, memNo);
	}
	
	@Override
	public Mem selectByMemAcc(String memAcc) {
		final String hql = "SELECT new web.mem.meminfo.entity.Mem(memNo, memLevelNo, memAcc, memAccStatus, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memRegDate, memPic, memActStatus) FROM Mem WHERE memAcc = :memAcc";	
		return session.createQuery(hql, Mem.class).setParameter("memAcc", memAcc).uniqueResult();
	}
	
	@Override
	public Mem selectByMemEmail(String memEmail) {
		final String hql = "SELECT new web.mem.meminfo.entity.Mem(memNo, memLevelNo, memAcc, memAccStatus, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memRegDate, memPic, memActStatus) FROM Mem WHERE memEmail = :memEmail";	
		return session.createQuery(hql, Mem.class).setParameter("memEmail", memEmail).uniqueResult();
	}
	
	@Override
	public Mem selectByMemMobile(String memMobile) {
		final String hql = "SELECT new web.mem.meminfo.entity.Mem(memNo, memLevelNo, memAcc, memAccStatus, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memRegDate, memPic, memActStatus) FROM Mem WHERE memMobile = :memMobile";	
		return session.createQuery(hql, Mem.class).setParameter("memMobile", memMobile).uniqueResult();
	}
	

	@Override
	public Mem selectAccAndPwd(String memAcc, String memPwd) {
		final String hql = "SELECT new web.mem.meminfo.entity.Mem(memNo, memLevelNo, memAcc, memAccStatus, memName, memGender, memBday, memEmail, memMobile, memCity, memDist, memAddr, memRegDate, memPic, memActStatus) FROM Mem WHERE memAcc = :memAcc AND memPwd = :memPwd";		
		
		Mem mem = session.createQuery(hql, Mem.class)
				.setParameter("memAcc", memAcc)
				.setParameter("memPwd", memPwd)
				.uniqueResult();
		
		if(mem == null) {
			return mem;
		}else {
			Mem memGetMemLevel = session.get(Mem.class, mem.getMemNo()); 
			MemLevel memLevel = memGetMemLevel.getMemLevel();
			
			mem.setMemLevel(memLevel);
			
			if(mem.getMemPic() != null) {
				byte[] memPic = mem.getMemPic();
				String memPicBase64 = Base64.getEncoder().encodeToString(memPic); 
				mem.setMemPicBase64(memPicBase64);  
			}
			return mem;
		}	
	}

	@Override
	public List<Mem> selectAll() {
		final String hql = "FROM mem ORDER BY id";
		return session.createQuery(hql, Mem.class).getResultList();
	}
}
