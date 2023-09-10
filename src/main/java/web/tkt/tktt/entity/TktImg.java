package web.tkt.tktt.entity;

import java.util.Arrays;
import java.util.List;

public class TktImg extends TktCore{
	private Integer tktimgno;
    private Integer tktno;
    private byte[] tktimg;
    private List<String> tktimgBase64;
    
	
	@Override
	public String toString() {
		return "TktImg [tktimgno=" + tktimgno + ", tktno=" + tktno + ", tktimg=" + tktimg + ", tktimgBase64="
				+ tktimgBase64 + "]";
	}



	public TktImg(Integer tktimgno, Integer tktno, byte[] tktimg, List<String> tktimgBase64) {
		super();
		this.tktimgno = tktimgno;
		this.tktno = tktno;
		this.tktimg = tktimg;
		this.tktimgBase64 = tktimgBase64;
	}



	public TktImg(){
		super();
	}

	public Integer getTktimgno() {
		return tktimgno;
	}

	public void setTktimgno(Integer tktimgno) {
		this.tktimgno = tktimgno;
	}

	public Integer getTktno() {
		return tktno;
	}

	public void setTktno(Integer tktno) {
		this.tktno = tktno;
	}

	public byte[] getTktimg() {
		return tktimg;
	}

	public void setTktimg(byte[] tktimg) {
		this.tktimg = tktimg;
	}

	public List<String> getTktimgBase64() {
		return tktimgBase64;
	}

	public void setTktimgBase64(List<String> tktimgBase64) {
		this.tktimgBase64 = tktimgBase64;
	}
	
}
