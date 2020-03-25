package com.chairfactory.db;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.sql.DataSource;
import javax.inject.Inject;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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

    //example endpoint
    @GetMapping("/findAll")
    public List<Order> findAll(){
        JdbcTemplate jt = new JdbcTemplate(ds);
        List<Order> orders = jt.query("select * from purchases", new OrderRowMapper());
        return orders;
    }

    @GetMapping("/selectOrders")
    public List<Order> selectOrders(@RequestParam int quantity, @RequestParam String blueprint) {
        JdbcTemplate jt = new JdbcTemplate(ds);
        List<Order> orders = jt.query("select * from purchases where quantity >= ? and blueprint_size = ?",
                new Object[] {quantity, blueprint},
                new OrderRowMapper());
        return orders;
    }

    static class DeleteOrderData {
        public int order_id;
    }

    @PostMapping("/deleteOrder")
    public int deleteOrder(@RequestBody DeleteOrderData data) {
        JdbcTemplate jt = new JdbcTemplate(ds);
        int rows = jt.update("delete from purchases where id = ?", new Object[] {data.order_id});
        return rows;
    }

    @GetMapping("/getOrderLocation")
    public String getOrderLocation(@RequestParam int id) {
        JdbcTemplate jt = new JdbcTemplate(ds);
        //map a single row to a String object:
        String username = jt.queryForObject("select purchaser_username from purchases where id = ?", new Object[]{id}, String.class);
        return username;
    }

    @RequestMapping("/celebrationStation")
    public String celebrationStation() {
        return "\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89";
    }

}
