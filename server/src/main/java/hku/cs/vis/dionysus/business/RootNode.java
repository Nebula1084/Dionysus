package hku.cs.vis.dionysus.business;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static hku.cs.vis.dionysus.business.BusinessTree.*;

public class RootNode {
    private Map<String, StateNode> children;

    private Integer number;
    private Double stars;
    private Integer review;
    private Map<String, Integer> hours;
    private Map<String, Integer> checkIns;
    private Map<String, Integer> attributes;

    private Map<String, Integer> categoryNumbers;
    private Map<String, Double> categoryStars;
    private Map<String, Integer> categoryReviews;
    private Map<String, Map<String, Integer>> categoryHours;
    private Map<String, Map<String, Integer>> categoryCheckIns;
    private Map<String, Map<String, Integer>> categoryAttributes;

    RootNode() {
        children = new HashMap<>();
    }


    void insert(Business business) {
        StateNode node = children.get(business.state);
        if (node == null) {
            node = new StateNode();
            children.put(business.state, node);
        }
        node.insert(business);
    }

    void calculate() {

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

        for (StateNode node : children.values()) {
            node.calculate();
            number += node.number;
            stars += node.stars;
            review += node.review;
            addInt(hours, node.hours);
            addInt(checkIns, node.checkIns);
            addInt(attributes, node.attributes);

            addInt(categoryNumbers, node.categoryNumbers);
            addDouble(categoryStars, node.categoryStars);
            addInt(categoryReviews, node.categoryReviews);

            node.categoryHours.forEach((category, hour) -> {
                Map<String, Integer> l = categoryHours.getOrDefault(category, new HashMap<>());
                addInt(l, hour);
                categoryHours.put(category, l);
            });

            node.categoryCheckIns.forEach((category, checkIn) -> {
                Map<String, Integer> l = categoryCheckIns.getOrDefault(category, new HashMap<>());
                addInt(l, checkIn);
                categoryCheckIns.put(category, l);
            });

            node.categoryAttributes.forEach((category, attribute) -> {
                Map<String, Integer> l = categoryAttributes.getOrDefault(category, new HashMap<>());
                addInt(l, attribute);
                categoryAttributes.put(category, l);
            });

        }
    }


    private StateNode getChild(String state) {
        return children.getOrDefault(state, new StateNode());
    }

    List<BusinessPoint> getBusiness(String category) {
        List<BusinessPoint> business = new LinkedList<>();
        for (StateNode node : children.values()) {
            business.addAll(node.getBusiness(category));
        }
        return business;
    }

    public Map<String, Integer> getNumber(String category) {
        Map<String, Integer> ret = new HashMap<>();
        children.forEach((state, node) -> ret.put(state, node.getNumber(category)));
        Integer n;
        if (!category.equals(ALL)) {
            n = categoryNumbers.getOrDefault(category, 0);
        } else {
            n = number;
        }
        ret.put(BusinessTree.TOTAL, n);
        return ret;
    }

    public Map<String, Integer> getNumberCategory(String state) {
        if (!state.equals(ALL)) {
            return getChild(state).categoryNumbers;
        }
        return categoryNumbers;
    }

    public Map<String, Double> getStars(String category) {
        Map<String, Double> ret = new HashMap<>();
        children.forEach((state, node) -> ret.put(state, node.getStars(category) / node.getNumber(category)));
        ret.put(BusinessTree.TOTAL, stars / number);
        return ret;

    }

    public Map<String, Integer> getReview(String category) {
        Map<String, Integer> ret = new HashMap<>();
        children.forEach((state, node) -> ret.put(state, node.getReview(category)));
        return ret;
    }


    public Map<String, Integer> getHours(String state, String category) {
        if (!state.equals(ALL)) {
            return getChild(state).getHours(category);
        }
        if (category.equals(ALL)) {
            return hours;
        } else {
            return categoryHours.getOrDefault(category, new HashMap<>());
        }
    }


    public Map<String, Integer> getCheckIn(String state, String category) {
        if (!state.equals(ALL)) {
            return getChild(state).getCheckIn(category);
        }
        if (category.equals(ALL)) {
            return checkIns;
        } else {
            return categoryCheckIns.getOrDefault(category, new HashMap<>());
        }
    }


    public Map<String, Integer> getAttributes(String state, String category) {
        if (!state.equals(ALL)) {
            return getChild(state).getAttributes(category);
        }
        if (category.equals(ALL)) {
            return attributes;
        } else {
            return categoryAttributes.getOrDefault(category, new HashMap<>());
        }
    }

    void print() {
        System.out.println(stars / number);
        System.out.println(categoryNumbers.size());
        categoryNumbers.forEach((category, count) -> {

            if (count > 5000) {
                System.out.printf("%s:%d\n", category, count);
            }
        });
    }
}
