package hku.cs.vis.dionysus.business;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static hku.cs.vis.dionysus.business.BusinessTree.ALL;
import static hku.cs.vis.dionysus.business.BusinessTree.addInt;

class StateNode {
    private List<Business> children;

    Integer number;
    Double stars;
    Integer review;
    Map<String, Integer> hours;
    Map<String, Integer> checkIns;
    Map<String, Integer> attributes;

    Map<String, Integer> categoryNumbers;
    Map<String, Double> categoryStars;
    Map<String, Integer> categoryReviews;
    Map<String, Map<String, Integer>> categoryHours;
    Map<String, Map<String, Integer>> categoryCheckIns;
    Map<String, Map<String, Integer>> categoryAttributes;


    StateNode() {
        children = new LinkedList<>();
        stars = 0.;
        number = 0;
        review = 0;
        hours = new HashMap<>();
        checkIns = new HashMap<>();
        attributes = new HashMap<>();

        categoryNumbers = new HashMap<>();
        categoryStars = new HashMap<>();
        categoryReviews = new HashMap<>();
        categoryHours = new HashMap<>();
        categoryCheckIns = new HashMap<>();
        categoryAttributes = new HashMap<>();

    }

    void insert(Business business) {
        children.add(business);
    }

    void calculate() {

        number = children.size();


        for (Business business : children) {
            stars += business.stars;
            review += business.reviewCount;
            addInt(hours, business.getTimeTable());
            addInt(checkIns, business.getCheckIn());
            addInt(attributes, business.getAttribute());

            for (String category : business.categories) {
                Integer categoryNumber = categoryNumbers.getOrDefault(category, 0);
                categoryNumbers.put(category, categoryNumber + 1);

                Double categoryStar = categoryStars.getOrDefault(category, 0.);
                categoryStars.put(category, categoryStar + business.stars);

                Integer categoryReview = categoryReviews.getOrDefault(category, 0);
                categoryReviews.put(category, categoryReview + business.reviewCount);

                Map<String, Integer> categoryHour = categoryHours.getOrDefault(category, new HashMap<>());
                addInt(categoryHour, business.getTimeTable());
                categoryHours.put(category, categoryHour);

                Map<String, Integer> categoryCheckIn = categoryCheckIns.getOrDefault(category, new HashMap<>());
                addInt(categoryCheckIn, business.getCheckIn());
                categoryCheckIns.put(category, categoryCheckIn);

                Map<String, Integer> categoryAttribute = categoryAttributes.getOrDefault(category, new HashMap<>());
                addInt(categoryAttribute, business.getAttribute());
                categoryAttributes.put(category, categoryAttribute);
            }
        }
    }


    List<BusinessPoint> getBusiness(String category) {
        Stream<Business> stream = children.stream();
        if (!category.equals(ALL)) {
            stream = stream.filter(e -> e.contain(category));
        }
        return stream.map(Business::toPoint).collect(Collectors.toList());
    }

    public Integer getNumber(String category) {
        if (category.equals(ALL)) {
            return number;
        } else {
            return categoryNumbers.getOrDefault(category, 0);
        }
    }

    public Double getStars(String category) {
        if (category.equals(ALL)) {
            return stars;
        } else {
            return categoryStars.getOrDefault(category, 0.);
        }
    }

    public Integer getReview(String category) {
        if (category.equals(ALL)) {
            return review;
        } else {
            return categoryReviews.getOrDefault(category, 0);
        }
    }


    public Map<String, Integer> getHours(String category) {
        if (category.equals(ALL)) {
            return hours;
        } else {
            return categoryHours.getOrDefault(category, new HashMap<>());
        }
    }


    public Map<String, Integer> getCheckIn(String category) {
        if (category.equals(ALL)) {
            return checkIns;
        } else {
            return categoryCheckIns.getOrDefault(category, new HashMap<>());
        }
    }


    public Map<String, Integer> getAttributes(String category) {
        if (category.equals(ALL)) {
            return attributes;
        } else {
            return categoryAttributes.getOrDefault(category, new HashMap<>());
        }
    }
}
