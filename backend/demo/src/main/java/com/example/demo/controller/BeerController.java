package com.example.demo.controller;

import com.example.demo.model.beer.Beer;
import com.example.demo.service.BeerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/beers")
@CrossOrigin("http://127.0.0.1:5173")
public class BeerController {
    @Autowired
    private BeerService beerService;

    @RequestMapping(value = "/teste", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> searchTest(@RequestParam(required = false) Long id, @RequestParam(required = false) String name){
        return beerService.searchTest(id,name);
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Beer> searchBeers(
            @RequestParam(required = false) @Valid String name,
            @RequestParam(required = false) @Valid Long id,
            @RequestParam(required = false) @Valid String food,
            @RequestParam(required = false) @Valid String malt,
            @RequestParam(required = false) @Valid String hops,
            @RequestParam(required = false) @Valid String yeast,
            @RequestParam(required = false) @Valid String brewedAfter,
            @RequestParam(required = false) @Valid String brewedBefore,
            @RequestParam(required = false) @Valid Long ebcLt,
            @RequestParam(required = false) @Valid Long ebcGt,
            @RequestParam(required = false) @Valid Long ibuLt,
            @RequestParam(required = false) @Valid Long ibuGt,
            @RequestParam(required = false) @Valid Long abvLt,
            @RequestParam(required = false) @Valid Long abvGt,
            @RequestParam Integer page)
    {
        return new ResponseEntity<>(beerService.searchBeers(
                name, id, food, malt, hops, yeast, brewedAfter, brewedBefore,
                ebcLt, ebcGt, ibuLt, ibuGt, abvLt, abvGt,page), HttpStatus.OK).getBody();
    }

}


