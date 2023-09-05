package web.mem.meminfo.entity;

import java.io.Serializable;

public class MemSuper implements Serializable{
	private static final long serialVersionUID = 1457755989409740329L;
	private	boolean successful;
	private String message;
	//用來將byte陣列轉成base64格式用
	private String memPicBase64;
	//當多個前端呼叫相同Servlet時，存放對應操作動作使用
	private String action;
	
	public MemSuper() {
	}
	
	public boolean isSuccessful() {
		return successful;
	}
	public void setSuccessful(boolean successful) {
		this.successful = successful;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getMemPicBase64() {
		return memPicBase64;
	}
	
	public void setMemPicBase64(String memPicBase64) {
		this.memPicBase64 = memPicBase64;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	
}
