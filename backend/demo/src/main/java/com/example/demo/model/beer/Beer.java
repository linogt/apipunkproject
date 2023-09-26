package com.example.demo.model.beer;

import lombok.Data;

import java.util.List;

@Data
public class Beer {
    private int id;
    private String name;
    private String tagline;
    private String firstBrewed;
    private String description;
    private String imageUrl;
    private double abv;
    private int ibu;
    private int targetFg;
    private int targetOg;
    private int ebc;
    private int srm;
    private double ph;
    private int attenuationLevel;
    private Volume volume;
    private Volume boilVolume;
    private Method method;
    private Ingredients ingredients;
    private List<String> foodPairing;
    private String brewersTips;
    private String contributedBy;

}

