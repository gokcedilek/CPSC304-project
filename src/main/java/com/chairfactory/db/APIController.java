package com.chairfactory.db;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
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
import java.sql.SQLException;
import java.util.ArrayList;
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
        jt.update("insert into Purchases (quantity, blueprint_size, purchaser_username) values (?, ?, ?)",
                data.quantity, data.blueprint, data.purchaser);
    }

    static class UpdateOrderData {
        public int id;
        public int quantity;
        public String blueprint;
        public String purchaser;
    }

    @PostMapping("/updateOrder")
    public int updateOrder(@RequestBody UpdateOrderData data) {
        if (data.quantity == 0 || data.blueprint.length() == 0 || data.purchaser.length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Oops - looks like one of your params is invalid!");
        }

        JdbcTemplate jt = new JdbcTemplate(ds);
        return jt.update("update Purchases set quantity = ?, blueprint_size = ?, purchaser_username = ? where id = ?",
                        data.quantity, data.blueprint, data.purchaser, data.id);
    }

    @GetMapping("/getPurchaserNames")
    public List<String> purchaserNames() {
        JdbcTemplate jt = new JdbcTemplate(ds);
        return jt.queryForList("select full_name from Purchaser", String.class);
    }

    @GetMapping("/getMinChairPrice")
    public Integer getMinChairPrice() {
        JdbcTemplate jt = new JdbcTemplate(ds);
        return jt.queryForObject("select MIN(msrp) from ChairBlueprint", Integer.class);
    }

    //example endpoint
    @GetMapping("/findAll")
    public List<Order> findAll(){
        JdbcTemplate jt = new JdbcTemplate(ds);
        List<Order> orders = jt.query("select * from Purchases", new OrderRowMapper());
        return orders;
    }

    @GetMapping("/selectOrders")
    public List<Order> selectOrders(@RequestParam int quantity, @RequestParam String blueprint) {
        JdbcTemplate jt = new JdbcTemplate(ds);
        List<Order> orders = jt.query("select * from Purchases where quantity >= ? and blueprint_size = ?",
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
        int rows = jt.update("delete from Purchases where id = ?", new Object[] {data.order_id});
        return rows;
    }

    @GetMapping("/getOrderLocation")
    public Location getOrderLocation(@RequestParam int id) {
        JdbcTemplate jt = new JdbcTemplate(ds);
        try {
            return jt.queryForObject("select pr.country, pr.city from Purchaser pr, Purchases ps where pr.username = ps.purchaser_username and ps.id = ?", new Object[]{id}, new LocationRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Uh oh - there is no order with id " + id);
        }
    }

    @GetMapping("/getNumOrders")
    public List<BPCount> getNumOrders() {
        JdbcTemplate jt = new JdbcTemplate(ds);
        List<BPCount> bpcounts = jt.query("select blueprint_size, count(*) from Purchases group by blueprint_size", new BPCountRowMapper());
        return bpcounts;
    }

    @GetMapping("/getParts")
    public List<String> getParts() {
        JdbcTemplate jt = new JdbcTemplate(ds);
        String sql = "select pt.name from PartType pt where not exists ( (select cb.size from ChairBlueprint cb) except (select brp.blueprint_size from ChairBlueprintRequiresPartType brp where brp.part_id = pt.id) )";
        return jt.queryForList(sql, String.class);
    }

    @RequestMapping("/celebrationStation")
    public String celebrationStation() {
        return "\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89";
    }

}
