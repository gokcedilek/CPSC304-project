// Set up alerts to be close-able

$('.alert').on('click','.close',function(){
    $(this).closest('.alert').fadeOut();
});

// There"s no need for this to be in its own method, only for organization sake
function setUpCreateOrder() {
    $("#create_order_submit").on("click", function (e) {
        e.preventDefault(); // Prevent the submit button from re-loading the page

        const quantity = $("#create_order_quantity").val();
        const blueprint = $("#create_order_blueprint_size").val();
        const purchaser = $("#create_order_purchaser_username").val();
        axios.post("/createOrder", {
            quantity: parseInt(quantity),
            blueprint: blueprint,
            purchaser: purchaser
        }).then((res) => {
            $("#create_order_fail_alert").hide();
            $("#create_order_success_alert").fadeIn();
            console.log(res);
        }).catch((err) => {
            $("#create_order_fail_alert").fadeIn();
            $("#create_order_success_alert").hide();
            console.log(err);
        })
    });
}

// Let's set up the create order portion!
setUpCreateOrder();

function setUpFindAll() {
    $("#find_all_submit").on("click", function (e) {
        e.preventDefault();

        axios.get("/findAll")
            .then((res) => {
                $("#find_all_fail_alert").hide();
                console.log("findAll successful!");
                let html = "<ul>";
                for(let item in res.data) {
                    let line = "id: " + res.data[item].id + ", quantity: " + res.data[item].quantity + ", blueprint size: " + res.data[item].blueprint_size + ", purchaser: " + res.data[item].purchaser_username;
                    //console.log(line);
                    html += "<li>" + line + "</li>";
                }
                html += "</ul>";
                $("#find_all_success_alert").html(html);
                $("#find_all_success_alert").fadeIn();
            }).catch((err) => {
                $("#find_all_fail_alert").fadeIn();
                $("#find_all_success_alert").hide();
                console.log("findAll failed!");
                console.log(err);
        })
    });
}

setUpFindAll();

function setUpSelectOrder() {
    $("#select_order_submit").on("click", function (e) {
        e.preventDefault();

        const quantity = $("#select_order_quantity").val();
        const blueprint = $("#select_order_blueprint_size").val();
        axios.get("/selectOrders", {
            params: {
                quantity: quantity,
                blueprint: blueprint
            }
        }).then((res) => {
            $("select_order_fail_alert").hide();
            console.log("selection successful!");
            let html;
            if(res.data.length != 0) {
                html = "<ul>";
                for(let item in res.data) {
                    let line = "id: " + res.data[item].id + ", quantity: " + res.data[item].quantity + ", blueprint size: " + res.data[item].blueprint_size + ", purchaser: " + res.data[item].purchaser_username;
                    html += "<li>" + line + "</li>";
                }
                html += "</ul>";
            } else {
                html = "<em>" + "No orders qualify for this query!" + "</em>";
            }
            $("#select_order_success_alert").html(html);
            $("#select_order_success_alert").fadeIn();
        }).catch((err) => {
            $("select_order_fail_alert").fadeIn();
            $("#select_order_success_alert").hide();
            console.log("selection failed!");
            console.log(err);
        })
    });
}

setUpSelectOrder();

function setUpDeleteOrder(){
    $("#delete_order_submit").on("click", function (e) {
        e.preventDefault();

        const order_id = $("#delete_order_id").val();
        axios.post("/deleteOrder", {
            order_id: parseInt(order_id)
        }).then((res) => {
            $("#delete_order_fail_alert").hide();
            console.log("deletion successful!");
            //console.log(res + " rows deleted.");
            let html = "<em>" + "Order with id: " + order_id + " is deleted." + "</em>";
            $("#delete_order_success_alert").html(html);
            $("#delete_order_success_alert").fadeIn();
        }).catch((err) => {
            console.log("deletion failed!");
            console.log(err);
        })
    });
}

setUpDeleteOrder();

function setUpGetOrderLocation() {
    $("#get_location_submit").on("click", function (e) {
        e.preventDefault();

        const id = $("#get_location_id").val();
        axios.get("/getOrderLocation", {
            params: {
                id: id
            }
        }).then((res) => {
            $("#get_location_fail_alert").hide();
            console.log("received the location!");
            let html;
            if(res.data.length != 0) {
                html = "<em>" + "Order with id " + id + " is from " + res.data.country + ", " + res.data.city + "</em>";
            } else {
                html = "<em>" + "No results for this query!" + "</em>";
            }
            $("#get_location_success_alert").html(html);
            $("#get_location_success_alert").fadeIn();
        }).catch((err) => {
            console.log("could not receive the location!");
            console.log(err);
            $("#get_location_fail_alert").fadeIn();
            $("#get_location_success_alert").hide();
        })
    });
}

setUpGetOrderLocation();

function setUpGetNumOrders() {
    $("#get_num_orders_submit").on("click", function (e) {
        e.preventDefault();

        axios.get("/getNumOrders")
            .then((res) => {
                $("#get_num_orders_fail_alert").hide();
                console.log("getNumOrders successful!");
                let html;
                if(res.data.length != 0) {
                    html = "<ul>";
                    for(let item in res.data) {
                        let line = "blueprint: " + res.data[item].blueprint_size + ", count: " + res.data[item].bp_count;
                        html += "<li>" + line + "</li>";
                    }
                    html += "</ul>";
                } else {
                    html = "<em>" + "No orders qualify for this query!" + "</em>";
                }
                $("#get_num_orders_success_alert").html(html);
                $("#get_num_orders_success_alert").fadeIn();
            }).catch((err) => {
                $("#get_num_orders_fail_alert").fadeIn();
                $("#get_num_orders_success_alert").hide();
                console.log("getNumOrders failed!");
                console.log(err);
        })
    });
}

setUpGetNumOrders();

function setUpGetPartNames() {
    $("#get_part_names_submit").on("click", function (e) {
        e.preventDefault();

        axios.get("/getParts")
            .then((res) => {
                $("#get_part_names_fail_alert").hide();
                console.log("getParts successful!");
                let html;
                if(res.data.length != 0) {
                    html = "<ul>";
                    for(let item in res.data) {
                        let line = "part name: " + res.data[item];
                        html += "<li>" + line + "</li>";
                    }
                    html += "</ul>";
                } else {
                    html = "<em>" + "No orders qualify for this query!" + "</em>";
                }
                $("#get_part_names_success_alert").html(html);
                $("#get_part_names_success_alert").fadeIn();
            }).catch((err) => {
                $("#get_part_names_fail_alert").fadeIn();
                $("#get_part_names_success_alert").hide();
                console.log("getParts failed!");
                console.log(err);
        })
    });
}

setUpGetPartNames();