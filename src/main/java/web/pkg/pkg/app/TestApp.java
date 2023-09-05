package web.pkg.pkg.app;

import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericApplicationContext;

import com.mysql.cj.xdevapi.SessionFactory;

import core.util.HibernateUtil;
import web.mem.meminfo.dao.MemDao;
import web.mem.meminfo.dao.impl.MemDaoImpl;
import web.mem.meminfo.entity.Mem;
import web.pkg.pkg.dao.PkgOrdDetailsDao;
import web.pkg.pkg.dao.impl.PkgOrdDetailsDaoImpl;
import web.pkg.pkg.entity.PkgOrdDetails;
import web.pkg.pkg.entity.PkgOrdDetailsId;

public class TestApp {
public static void main(String[] args) {
	
		GenericApplicationContext applicationContext = new GenericApplicationContext();
        new XmlBeanDefinitionReader(applicationContext).loadBeanDefinitions("applicationContext.xml");
        applicationContext.refresh();
//	MemDao memDao = new MemDaoImpl();
//	Mem mem = memDao.selectAccAndPwd("testacc01","testpwd01");
//	System.out.println(mem.getMemAcc());
        Session ses=HibernateUtil.getSessionFactory().openSession();
        PkgOrdDetailsDao pkgOrdDetailsDao = new PkgOrdDetailsDaoImpl(ses);
        
        
//        List<PkgOrdDetails> test=new ArrayList<PkgOrdDetails>();
        PkgOrdDetailsId pddsId = new PkgOrdDetailsId();
        pddsId.setPkgOrdNo(1);
        pddsId.setPkgDetailsNo(1);
        System.out.println(pkgOrdDetailsDao.selectByPkgOrdDetailsId(pddsId));

        System.out.println("---------------");
        List<PkgOrdDetails> test = pkgOrdDetailsDao.selectAll();
        System.out.println(test.get(1));

//        PkgOrdDetailsId 
//        pdsDetails.setPkgOrdDetailsid();
//        test.add(OPkgOrdDetails.getPkgOrdDetailsid().getPkgOrdNo());
//        test.add(.getPkgOrdDetailsid().getPkgDetailsNo());
//
//        System.out.println(pkgOrdDetailsDao.selectByPkgOrdDetailsId(test));
//        
        ((ConfigurableApplicationContext) applicationContext).close();
}
}
