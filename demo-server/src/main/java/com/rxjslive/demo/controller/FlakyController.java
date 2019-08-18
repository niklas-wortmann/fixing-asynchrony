package com.rxjslive.demo.controller;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.github.javafaker.Beer;
import com.github.javafaker.Faker;
import com.rxjslive.demo.BeerDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("flaky")
public class FlakyController {

    Faker faker = new Faker();
    int i = 0;

    @GetMapping()
    public @ResponseBody List<BeerDTO> getFakeBeers() throws InterruptedException {
        i++;
        List<BeerDTO> beers = new ArrayList<BeerDTO>(100);
        for(int i = 0; i < 100; i++){
            BeerDTO beer = new BeerDTO(faker.beer());
            beers.add(beer);
        }
        if (i % 3 != 0) {
            Thread.sleep((long) Math.floor(Math.random() * 50000));
        }
        return beers;
    }

}
