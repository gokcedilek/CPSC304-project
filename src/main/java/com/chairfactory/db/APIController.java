package com.chairfactory.db;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.sql.DataSource;
import javax.inject.Inject;

@RestController
public class APIController {
    @Inject
    DataSource ds;

    @GetMapping("/createOrder")
    public void createOrder(@RequestParam int quantity,
                              @RequestParam String blueprint, @RequestParam String purchaser) {
        JdbcTemplate jt = new JdbcTemplate(ds);
        jt.update("insert into purchases (quantity, blueprint_size, purchaser_username) values (?, ?, ?)",
                quantity, blueprint, purchaser);
    }

    @RequestMapping("/celebrationStation")
    public String celebrationStation() {
        return "\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89";
    }

}
