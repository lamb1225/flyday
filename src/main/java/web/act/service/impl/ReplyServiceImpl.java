package web.act.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.act.dao.ActJoinDAO;
import web.act.dao.ActReplyDAO;
import web.act.dao.RpGroupDAO;
import web.act.entity.Act_Reply;
import web.act.service.ReplyService;

import java.util.List;
@Service //Spring 設定為Service層Bean元件
@Transactional
public class ReplyServiceImpl implements ReplyService {
    @Autowired
    private ActReplyDAO dao;
    @Override
    public Act_Reply Enter(Act_Reply reply) {
        final int result = dao.insert(reply);
        if (result < 1) {
            reply.setMessage("輸入失敗");
            reply.setSuccessful(false);
            return reply;
        }

        return reply;
    }

    @Override
    public List<Act_Reply> selectActno(Integer actno) {
        return dao.selectByactno(actno);
    }
}
