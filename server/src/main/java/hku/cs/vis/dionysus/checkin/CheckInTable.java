package hku.cs.vis.dionysus.checkin;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Component
public class CheckInTable {
    final private static String DATA_SOURCE = "yelp_checkin.csv";
    private Map<String, CheckIn> checkInMap;

    public CheckInTable() throws IOException {

        checkInMap = new HashMap<>();
        InputStream dataSource = this.getClass().getClassLoader().getResourceAsStream(DATA_SOURCE);
        Iterable<CSVRecord> records = CSVFormat.EXCEL.withHeader().parse(new InputStreamReader(dataSource));

        for (CSVRecord record : records) {
            String businessId = record.get(0);
            CheckIn checkIn = checkInMap.get(businessId);
            if (checkIn == null) {
                checkIn = new CheckIn();
                checkInMap.put(businessId, checkIn);
            }

            checkIn.put(record);
        }

        System.out.println(checkInMap.size());
    }

    public CheckIn getCheckIn(String id) {
        return checkInMap.getOrDefault(id, new CheckIn());
    }

    public static void main(String args[]) throws IOException {
        new CheckInTable();
    }
}
