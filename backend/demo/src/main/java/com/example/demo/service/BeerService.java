package com.example.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;


@Service
public class BeerService {

    RestTemplate restTemplate = new RestTemplate();

    public List searchBeers(
            String name, Long id, String food, String malt, String hops, String yeast,
            String brewedAfter, String brewedBefore, Long ebcLt, Long ebcGt,
            Long ibuLt, Long ibuGt, Long abvLt, Long abvGt, Integer page) {

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("https://api.punkapi.com/v2/beers");
        System.out.println(page);

        if (name != null) builder.queryParam("beer_name", name.replace(' ', '_'));
        if (id != null) builder.queryParam("ids", id);
        if (malt != null) builder.queryParam("malt", malt.replace(' ', '_'));
        if (food != null) builder.queryParam("food", food.replace(' ', '_'));
        if (hops != null) builder.queryParam("hops", hops.replace(' ', '_'));
        if (yeast != null) builder.queryParam("yeast", yeast.replace(' ', '_'));
        if (brewedAfter != null) builder.queryParam("brewed_after", brewedAfter);
        if (brewedBefore != null) builder.queryParam("brewed_before", brewedBefore);
        if (ebcLt != null) builder.queryParam("ebc_lt", ebcLt);
        if (ebcGt != null) builder.queryParam("ebc_gt", ebcGt);
        if (ibuLt != null) builder.queryParam("ibu_lt", ibuLt);
        if (ibuGt != null) builder.queryParam("ibu_gt", ibuGt);
        if (abvLt != null) builder.queryParam("abv_lt", abvLt);
        if (abvGt != null) builder.queryParam("abv_gt", abvGt);
        builder.queryParam("page", page);
        builder.queryParam("per_page", 10);
        String url = builder.toUriString();
        ResponseEntity<List> resp = restTemplate
                .getForEntity(url, List.class);

        return resp.getBody();
    }


    public ResponseEntity<?> searchTest(Long id, String name) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("https://api.punkapi.com/v2/beers");
        if (name != null) builder.queryParam("beer_name", name.replace(' ', '_'));
        if (id != null) builder.queryParam("ids", id);
        String url = builder.toUriString();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        String jsonResponse = responseEntity.getBody();

        return restTemplate.getForEntity(url, String.class);
    }
}

