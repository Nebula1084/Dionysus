package hku.cs.vis.dionysus.checkin;

import org.apache.commons.csv.CSVRecord;

import java.util.HashMap;
import java.util.Map;

public class CheckIn {

    private final static String MON = "Mon";
    private final static String TUE = "Tue";
    private final static String WED = "Wed";
    private final static String THU = "Thu";
    private final static String FRI = "Fri";
    private final static String SAT = "Sat";
    private final static String SUN = "Sun";

    public final static String[] WEEKS = {MON, TUE, WED, THU, FRI, SAT, SUN};

    Map<String, Integer> count;

    CheckIn() {
        count = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            count.put(WEEKS[i], 0);
        }
    }

    void put(CSVRecord record) {
        String weekday = record.get(1);
        Integer n = count.get(weekday);
        n += Integer.valueOf(record.get(3));
        count.put(weekday, n);
    }

    public Map<String, Integer> getCount() {
        return count;
    }
}
