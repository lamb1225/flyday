package web.tkt.tktt.service;

import java.util.List;

import web.tkt.tktt.entity.Tkt;

public interface TktService {

	Tkt addtkt(Tkt tkt);

	List<Tkt> findAll();

}
