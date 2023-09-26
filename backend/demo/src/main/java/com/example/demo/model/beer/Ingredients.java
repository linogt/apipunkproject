package com.example.demo.model.beer;

import lombok.Data;

import java.util.List;

@Data
public class Ingredients {
    private List<Malt> malt;
    private List<Hop> hops;
    private String yeast;

}
