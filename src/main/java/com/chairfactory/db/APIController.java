package com.chairfactory.db;

import org.springframework.dao.DataAccessException;
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
        try {
            jt.update("insert into Purchases (quantity, blueprint_size, purchaser_username) values (?, ?, ?)",
                    data.quantity, data.blueprint, data.purchaser);
        } catch(DataAccessException de) {
            System.out.print("hello");
        }
        catch (Exception e) {
            System.out.print("hi");
        }
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
        String username = jt.queryForObject("select purchaser_username from Purchases where id = ?", new Object[]{id}, String.class);
        Location location = jt.queryForObject("select country, city from Purchaser where username = ?", new Object[]{username}, new LocationRowMapper());
        return location;
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
        List<Map<String, Object>> parts = jt.queryForList(sql);
        List<String> partNames = new ArrayList<>();
        for(Map part : parts) {
            partNames.add((String) part.get("name"));
        }
        return partNames;
    }

    @RequestMapping("/celebrationStation")
    public String celebrationStation() {
        return "\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89";
    }

}
