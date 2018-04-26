package hku.cs.vis.dionysus.business;

public class BusinessPoint {
    final private Double stars;
    final private Double[] position;

    public BusinessPoint(Double latitude, Double longitude, Double stars) {
        this.stars = stars;
        this.position = new Double[2];
        position[0] = longitude;
        position[1] = latitude;
    }

    public Double getStars() {
        return stars;
    }

    public Double[] getPosition() {
        return position;
    }
}
