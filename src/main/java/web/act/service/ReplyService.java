package web.act.service;

import web.act.entity.Act;
import web.act.entity.Act_Reply;

import java.util.List;

public interface ReplyService {
    Act_Reply Enter(Act_Reply reply);
    List<Act_Reply> selectActno(Integer actno);
}
