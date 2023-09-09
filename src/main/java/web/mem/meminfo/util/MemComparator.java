package web.mem.meminfo.util;

import java.util.Comparator;

import web.mem.meminfo.entity.Mem;

public class MemComparator implements Comparator<Mem> {

	@Override
	public int compare(Mem o1, Mem o2) {
		return o1.getMemNo().compareTo(o2.getMemNo());
	}
	
}
