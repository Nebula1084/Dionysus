package hku.cs.vis.dionysus.attribute;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Component
public class BusinessAttribute {
    final private static String DATA_SOURCE = "yelp_business_attributes.csv";
    private Map<String, Attribute> attributeMap;

    private CSVRecord header;

    public BusinessAttribute() throws IOException {
        attributeMap = new HashMap<>();
        InputStream dataSource = this.getClass().getClassLoader().getResourceAsStream(DATA_SOURCE);
        Iterable<CSVRecord> records = CSVFormat.EXCEL.parse(new InputStreamReader(dataSource));
        Iterator<CSVRecord> iterator = records.iterator();
        header = iterator.next();
        while (iterator.hasNext()) {
            CSVRecord record = iterator.next();
            attributeMap.put(record.get(0), new Attribute(header, record));
        }
    }


    public Attribute getAttribute(String id) {
        return attributeMap.getOrDefault(id, new Attribute(header));
    }

    public static void main(String args[]) throws IOException {
        new BusinessAttribute();
    }
}
