package web.tkt.tktt.entity;

public class TktCore {
	private boolean successful;
	private String message;
	
	@Override
	public String toString() {
		return "TktCore [successful=" + successful + ", message=" + message + "]";
	}

	public TktCore() {
	}

	public TktCore(boolean successful, String message) {
		this.successful = successful;
		this.message = message;
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
}
