package com.rxjslive.demo.controller;

import com.github.javafaker.Faker;
import com.rxjslive.demo.BeerPageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("pagedBeer")
public class BeerDetailsController {

    @GetMapping("/{page}")
    @ResponseBody
    public BeerPageDTO getSingleBeer(@PathVariable("page") int page) {
        BeerPageDTO beerDTO = new BeerPageDTO(page);
        return beerDTO;
    }

}
