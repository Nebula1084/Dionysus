package hku.cs.vis.dionysus.api;

import hku.cs.vis.dionysus.business.Business;
import hku.cs.vis.dionysus.business.BusinessPoint;
import hku.cs.vis.dionysus.business.BusinessTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class StateStatistics {
    private final BusinessTree businessTree;

    @Autowired
    public StateStatistics(BusinessTree businessTree) {
        this.businessTree = businessTree;
    }

    @RequestMapping("/api/us/business")
    public List<BusinessPoint> business(@RequestParam String category) {
        return businessTree.getBusiness(category);
    }

    @RequestMapping("/api/us/numbers")
    public Map<String, Integer> numbers(@RequestParam String category) {
        return businessTree.getNumber(category);
    }

    @RequestMapping("/api/us/numbers/category")
    public Map<String, Integer> categoryNumbers(@RequestParam String state) {
        return businessTree.getNumberCategory(state);
    }

    @RequestMapping("/api/us/stars")
    public Map<String, Double> stars(@RequestParam String category) {
        return businessTree.getStars(category);
    }

    @RequestMapping("/api/us/reviews")
    public Map<String, Integer> reviews(@RequestParam String category) {
        return businessTree.getReview(category);
    }

    @RequestMapping("/api/us/hours")
    public Map<String, Integer> hours(@RequestParam String state, @RequestParam String category) {
        return businessTree.getHours(state, category);
    }

    @RequestMapping("/api/us/checkin")
    public Map<String, Integer> checkIns(@RequestParam String state, @RequestParam String category) {
        return businessTree.getCheckIn(state, category);
    }

    @RequestMapping("/api/us/attributes")
    public Map<String, Integer> attributes(@RequestParam String state, @RequestParam String category) {
        return businessTree.getAttributes(state, category);
    }
}

