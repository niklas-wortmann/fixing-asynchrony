package com.rxjslive.demo;

import com.github.javafaker.Beer;
import com.github.javafaker.Faker;

import java.util.ArrayList;
import java.util.List;

public class BeerPageDTO {

    public List<BeerDTO> beers;
    public Page page;

    public BeerPageDTO(int p) {
        Faker fake = new Faker();
        this.beers = new ArrayList<>(10);
        for(int i = 0; i < 10; i++) {
            this.beers.add(new BeerDTO(fake.beer()));
        }
        Page page = new Page(p, 10);
        this.page = page;
    }

}
