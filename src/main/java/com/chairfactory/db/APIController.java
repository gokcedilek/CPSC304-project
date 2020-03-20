package com.chairfactory.db;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.DataSource;
import javax.inject.Inject;

@RestController
public class APIController {
    @Inject
    DataSource ds;

    static class CreateOrderData {
        public int quantity;
        public String blueprint;
        public String purchaser;
    }

    @PostMapping("/createOrder")
    public void createOrder(@RequestBody CreateOrderData data) {
        if (data.quantity == 0 || data.blueprint.length() == 0 || data.purchaser.length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Oops - looks like one of your params is invalid!");
        }

        JdbcTemplate jt = new JdbcTemplate(ds);
        jt.update("insert into purchases (quantity, blueprint_size, purchaser_username) values (?, ?, ?)",
                data.quantity, data.blueprint, data.purchaser);
    }

    @RequestMapping("/celebrationStation")
    public String celebrationStation() {
        return "\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89";
    }

}
