package hku.cs.vis.dionysus.business;

import hku.cs.vis.dionysus.attribute.BusinessAttribute;
import hku.cs.vis.dionysus.checkin.CheckIn;
import hku.cs.vis.dionysus.checkin.CheckInTable;
import hku.cs.vis.dionysus.hours.Hours;
import hku.cs.vis.dionysus.hours.TimeTable;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

@Component
public class BusinessTree {
    final private static String DATA_SOURCE = "yelp_business.csv";
    final static String TOTAL = "TOTAL";
    final static String ALL = "all";

    private RootNode root;

    @Autowired
    public BusinessTree(Hours hours, CheckInTable checkInTable, BusinessAttribute businessAttribute) throws IOException {

        InputStream dataSource = this.getClass().getClassLoader().getResourceAsStream(DATA_SOURCE);
        root = new RootNode();

        Iterable<CSVRecord> records = CSVFormat.EXCEL.withHeader().parse(new InputStreamReader(dataSource));
        for (CSVRecord record : records) {
            try {
                root.insert(new Business(record, hours, checkInTable, businessAttribute));
            } catch (Exception ignored) {
            }
        }

        root.calculate();
    }

    public List<BusinessPoint> getBusiness(String category) {
        return root.getBusiness(category);
    }

    public Map<String, Integer> getNumber(String category) {
        return root.getNumber(category);
    }


    public Map<String, Integer> getNumberCategory(String state) {
        return maxN(root.getNumberCategory(state), 8);
    }

    public Map<String, Double> getStars(String category) {
        return root.getStars(category);
    }


    public Map<String, Integer> getReview(String category) {
        return root.getReview(category);
    }

    public Map<String, Integer> getHours(String state, String category) {
        return toOrder(root.getHours(state, category), TimeTable.WEEKS);
    }


    public Map<String, Integer> getCheckIn(String state, String category) {
        return toOrder(root.getCheckIn(state, category), CheckIn.WEEKS);
    }

    public Map<String, Integer> getAttributes(String state, String category) {
        return maxN(root.getAttributes(state, category), 6);
    }


    private static Map<String, Integer> toOrder(Map<String, Integer> map, String[] order) {
        Map<String, Integer> orderedMap = new LinkedHashMap<>();
        for (String i : order) {
            Integer n = map.get(i);
            if (n != null) {
                orderedMap.put(i, n);
            }
        }
        return orderedMap;
    }


    private Map<String, Integer> maxN(Map<String, Integer> map, int n) {
        Comparator<Map.Entry<String, Integer>> comparator =
                (e0, e1) -> {
                    Integer v0 = e0.getValue();
                    Integer v1 = e1.getValue();
                    return v0.compareTo(v1);
                };
        PriorityQueue<Map.Entry<String, Integer>> highest = new PriorityQueue<>(n, comparator);
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            highest.offer(entry);
            while (highest.size() > n) {
                highest.poll();
            }
        }

        Map<String, Integer> result = new HashMap<>();
        while (highest.size() > 0) {
            Map.Entry<String, Integer> e = highest.poll();
            result.put(e.getKey(), e.getValue());
        }
        return result;
    }

    public static void main(String args[]) throws IOException {


        BusinessTree tree = new BusinessTree(new Hours(), new CheckInTable(), new BusinessAttribute());

        List<BusinessPoint> points = tree.getBusiness("Fashion");
        System.out.println(points.size());


        tree.getNumberCategory("all").forEach((category, count) -> {
            System.out.printf("%s:%d\n", category, count);
        });
        tree.getHours("ALL", "Food").forEach((k, v) -> System.out.printf("%s:%d\n", k, v));
    }


    static void addInt(Map<String, Integer> to, Map<String, Integer> from) {
        from.forEach((k, v) -> {
            Integer n = to.getOrDefault(k, 0);
            to.put(k, n + v);
        });
    }

    static void addDouble(Map<String, Double> to, Map<String, Double> from) {
        from.forEach((k, v) -> {
            Double n = to.getOrDefault(k, 0.);
            to.put(k, n + v);
        });
    }
}
