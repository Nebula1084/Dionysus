package hku.cs.vis.dionysus.attribute;

import org.apache.commons.csv.CSVRecord;

import java.util.HashMap;
import java.util.Map;

public class Attribute {
    Map<String, Integer> attributes;

    Attribute(CSVRecord header) {
        attributes = new HashMap<>();
        for (int i = 1; i < header.size(); i++) {
            attributes.put(header.get(i), 0);
        }
    }

    Attribute(CSVRecord header, CSVRecord record) {
        attributes = new HashMap<>();
        for (int i = 1; i < header.size(); i++) {
            attributes.put(header.get(i), isAvailable(record.get(i)));
        }
    }

    private Integer isAvailable(String v) {
        if (v.equals("True"))
            return 1;
        else
            return 0;
    }

    public Map<String, Integer> getAttributes() {
        return attributes;
    }
}
