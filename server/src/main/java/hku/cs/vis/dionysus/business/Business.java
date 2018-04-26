package hku.cs.vis.dionysus.business;

import hku.cs.vis.dionysus.attribute.Attribute;
import hku.cs.vis.dionysus.attribute.BusinessAttribute;
import hku.cs.vis.dionysus.checkin.CheckIn;
import hku.cs.vis.dionysus.checkin.CheckInTable;
import hku.cs.vis.dionysus.hours.Hours;
import hku.cs.vis.dionysus.hours.TimeTable;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.servlet.tags.form.CheckboxesTag;

import java.util.Map;

public class Business {
    String businessId;
    String name;
    String neighborhood;
    String address;
    String city;
    String state;
    String postalCode;
    Double latitude;
    Double longitude;
    Double stars;
    Integer reviewCount;
    Integer isOpen;
    String[] categories;
    TimeTable timeTable;
    CheckIn checkIn;
    Attribute attribute;


    Business(CSVRecord record, Hours hours, CheckInTable checkInTable, BusinessAttribute businessAttribute) {
        businessId = record.get(0);
        name = record.get(1);
        neighborhood = record.get(2);
        address = record.get(3);
        city = record.get(4);
        state = record.get(5);
        postalCode = record.get(6);
        latitude = Double.valueOf(record.get(7));
        longitude = Double.valueOf(record.get(8));
        stars = Double.valueOf(record.get(9));
        reviewCount = Integer.valueOf(record.get(10));
        isOpen = Integer.valueOf(record.get(11));
        categories = record.get(12).split(";");
        timeTable = hours.getTimeTable(businessId);
        checkIn = checkInTable.getCheckIn(businessId);
        attribute = businessAttribute.getAttribute(businessId);
    }


    BusinessPoint toPoint() {
        return new BusinessPoint(latitude, longitude, stars);
    }

    Map<String, Integer> getTimeTable() {
        return timeTable.getHours();
    }

    Map<String, Integer> getCheckIn(){
        return checkIn.getCount();
    }

    Map<String, Integer>  getAttribute() {
        return attribute.getAttributes();
    }

    boolean contain(String category) {
        for (String e : categories) {
            if (category.equals(e))
                return true;
        }
        return false;
    }
}
