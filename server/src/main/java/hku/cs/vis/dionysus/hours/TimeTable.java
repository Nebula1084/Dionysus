package hku.cs.vis.dionysus.hours;

import org.apache.commons.csv.CSVRecord;

import java.util.HashMap;
import java.util.Map;

public class TimeTable {

    private final static String MONDAY = "monday";
    private final static String TUESDAY = "tuesday";
    private final static String WEDNESDAY = "wednesday";
    private final static String THURSDAY = "thursday";
    private final static String FRIDAY = "friday";
    private final static String SATURDAY = "saturday";
    private final static String SUNDAY = "sunday";
    public final static String[] WEEKS = {MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY};

    Map<String, Integer> hours;

    TimeTable() {
        hours = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            hours.put(WEEKS[i], 0);
        }
    }

    TimeTable(CSVRecord record) {

        hours = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            hours.put(WEEKS[i], isAvailable(record.get(i + 1)));
        }
    }

    private Integer isAvailable(String s) {
        return s.equals("None") ? 0 : 1;
    }


    public Map<String, Integer> getHours() {
        return hours;
    }
}
