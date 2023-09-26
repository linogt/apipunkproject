package com.example.demo.model.beer;

import lombok.Data;

import java.util.List;

@Data

public class Method {
    private List<MashTemp> mashTemp;
    private Fermentation fermentation;
    private String twist;
}