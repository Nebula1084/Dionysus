package hku.cs.vis.dionysus.hours;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@Component
public class Hours {
    final private static String DATA_SOURCE = "yelp_business_hours.csv";

    private Map<String, TimeTable> timeTables;

    public Hours() throws IOException {
        timeTables = new HashMap<>();
        InputStream dataSource = this.getClass().getClassLoader().getResourceAsStream(DATA_SOURCE);
        Iterable<CSVRecord> records = CSVFormat.EXCEL.withHeader().parse(new InputStreamReader(dataSource));
        for (CSVRecord record : records) {
            timeTables.put(record.get(0), new TimeTable(record));
        }

    }


    public static void main(String args[]) throws IOException {
        Hours hours = new Hours();

    }

    public TimeTable getTimeTable(String id) {
        return timeTables.getOrDefault(id, new TimeTable());
    }

    public static Map<String, Integer> reduce(Stream<Map<String, Integer>> stream) {
        return stream
                .reduce((a, b) -> {
                    Map<String, Integer> ret = new HashMap<>();
                    for (String i : TimeTable.WEEKS) {
                        ret.put(i, a.getOrDefault(i, 0) + b.getOrDefault(i, 0));
                    }
                    return ret;
                }).orElse(new HashMap<>());
    }
}
