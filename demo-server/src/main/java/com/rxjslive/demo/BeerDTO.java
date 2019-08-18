package com.rxjslive.demo;

import com.github.javafaker.Beer;

public class BeerDTO {

    public String hop;
    public String malt;
    public String name;
    public String style;
    public String yeast;

    public BeerDTO(Beer beer) {
        this.hop = beer.hop();
        this.malt = beer.malt();
        this.name = beer.name();
        this.style = beer.style();
        this.yeast = beer.yeast();
    }

}
