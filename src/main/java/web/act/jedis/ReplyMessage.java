package web.act.jedis;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.*;

public class ReplyMessage {

    private static JedisPool jedisPool = JedisPoolUtil.getJedisPool();
    public List<Message> getAllMessages() {
        List<Message> messages = new ArrayList<>();
        try (Jedis jedis = jedisPool.getResource()) {
            Set<String> messageKeys = new TreeSet<>(jedis.keys("message:*"));
            for (String key : messageKeys) {
                Map<String, String> messageData = jedis.hgetAll(key);
                Message message = new Message();
                message.setUsername(messageData.get("username"));
                message.setContent(messageData.get("content"));
                messages.add(message);
            }
        }
        return messages;
    }

    public void addMessage(Message message) {
        try (Jedis jedis = jedisPool.getResource()) {
            long messageId = jedis.incr("message_id_counter");
            String key = "1:message:" + messageId;
            Map<String, String> messageData = new HashMap<>();
            messageData.put("username", message.getUsername());
            messageData.put("content", message.getContent());
            jedis.hmset(key, messageData);
        }
    }
}
