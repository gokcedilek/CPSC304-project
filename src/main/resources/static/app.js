// Set up alerts to be close-able

$('.alert').on('click','.close',function(){
    $(this).closest('.alert').fadeOut();
});

function errOrMsg(err) {
    return err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message : "Could not get a response from the backend :(";
}

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
            $("#create_order_fail_alert > span").html(errOrMsg(err));
            $("#create_order_fail_alert").fadeIn();
            $("#create_order_success_alert").hide();
            console.log(err);
        })
    });
}

// Let's set up the create order portion!
setUpCreateOrder();

function setUpUpdateOrder() {
    $("#update_order_submit").on("click", function (e) {
        e.preventDefault(); // Prevent the submit button from re-loading the page

        const id = $("#update_order_id").val();
        const quantity = $("#update_order_quantity").val();
        const blueprint = $("#update_order_blueprint_size").val();
        const purchaser = $("#update_order_purchaser_username").val();
        axios.post("/updateOrder", {
            id: parseInt(id),
            quantity: parseInt(quantity),
            blueprint: blueprint,
            purchaser: purchaser
        }).then((res) => {
            $("#update_order_fail_alert").hide();
            $("#update_order_success_alert").fadeIn();
            console.log(res);
        }).catch((err) => {
            $("#update_order_fail_alert > span").html(errOrMsg(err));
            $("#update_order_fail_alert").fadeIn();
            $("#update_order_success_alert").hide();
            console.log(err);
        })
    });
}

setUpUpdateOrder();

function setUpGetPurchaserNames() {
    $("#get_purchaser_names_submit").on("click", function (e) {
        e.preventDefault(); // Prevent the submit button from re-loading the page

        axios.get("/getPurchaserNames").then((res) => {
            $("#get_purchaser_names_fail_alert").hide();
            let html = "<ul>";
            for(let name of res.data) {
                html += "<li>" + name + "</li>";
            }
            html += "</ul>";
            $("#get_purchaser_names_success_alert > span").html(html);
            $("#get_purchaser_names_success_alert").fadeIn();
            console.log(res);
        }).catch((err) => {
            $("#get_purchaser_names_fail_alert > span").html(errOrMsg(err));
            $("#get_purchaser_names_fail_alert").fadeIn();
            $("#get_purchaser_names_success_alert").hide();
            console.log(err);
        })
    });
}

setUpGetPurchaserNames();

function setUpGetMinChairPrice() {
    $("#get_min_chair_price_submit").on("click", function (e) {
        e.preventDefault(); // Prevent the submit button from re-loading the page

        axios.get("/getMinChairPrice").then((res) => {
            $("#get_min_chair_price_fail_alert").hide();
            let html = "Minimum Chair Price (MSRP): $" + res.data;
            $("#get_min_chair_price_success_alert > span").html(html);
            $("#get_min_chair_price_success_alert").fadeIn();
            console.log(res);
        }).catch((err) => {
            $("#get_min_chair_price_fail_alert > span").html(errOrMsg(err));
            $("#get_min_chair_price_fail_alert").fadeIn();
            $("#get_min_chair_price_success_alert").hide();
            console.log(err);
        })
    });
}

setUpGetMinChairPrice();

function setUpFindAll() {
    $("#find_all_submit").on("click", function (e) {
        e.preventDefault();

        axios.get("/findAll")
            .then((res) => {
                $("#find_all_fail_alert").hide();
                let html;
                if(res.data.length){
                    html = "<ul>";
                    for(let item of res.data) {
                        let line = `id: ${item.id}, quantity: ${item.quantity}, blueprint size: ${item.blueprint_size}, purchaser: ${item.purchaser_username}`;
                        html += `<li> ${line} </li>`;
                    }
                    html += "</ul>";
                } else {
                    html = "There are no results for this query!";
                }
                $("#find_all_success_alert > span").html(html);
                $("#find_all_success_alert").fadeIn();
            }).catch((err) => {
            $("#find_all_fail_alert > span").html(errOrMsg(err));
            $("#find_all_fail_alert").fadeIn();
            $("#find_all_success_alert").hide();
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
            let html;
            if(res.data.length) {
                html = "<ul>";
                for(let item of res.data) {
                    let line = `id: ${item.id}, quantity: ${item.quantity}, blueprint size: ${item.blueprint_size}, purchaser: ${item.purchaser_username}`;
                    html += `<li> ${line} </li>`;
                }
                html += "</ul>";
            } else {
                html = "There are no results for this query!";
            }
            $("#select_order_success_alert > span").html(html);
            $("#select_order_success_alert").fadeIn();
        }).catch((err) => {
            $("select_order_fail_alert > span").html(errOrMsg(err));
            $("#select_order_success_alert").hide();
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
            let html;
            if(res.data) {
                html = `Order with id ${order_id} is deleted.`;
            } else {
                html = `There is no order with id ${order_id}!`;
            }
            $("#delete_order_success_alert > span").html(html);
            $("#delete_order_success_alert").fadeIn();
        }).catch((err) => {
            $("#delete_order_fail_alert > span").html(errOrMsg(err));
            $("#delete_order_fail_alert").fadeIn();
            $("#delete_order_success_alert").hide();
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
            let html;
            //this endpoint returns a Location, not List<Location>, so need to check res.data instead of res.data.length!
            if(res.data) {
                html = `Order with id ${id} is from ${res.data.country}, ${res.data.city}`;
            } else {
                html = "There are no results for this query!";
            }
            $("#get_location_success_alert > span").html(html);
            $("#get_location_success_alert").fadeIn();
        }).catch((err) => {
            $("#get_location_fail_alert > span").html(errOrMsg(err));
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
                let html;
                if(res.data.length) {
                    html = "<ul>";
                    for(let item of res.data) {
                        let line = `blueprint: ${item.blueprint_size}, count: ${item.bp_count}`;
                        html += `<li> ${line} </li>`;
                    }
                    html += "</ul>";
                } else {
                    html = "There are no results for this query!";
                }
                $("#get_num_orders_success_alert > span").html(html);
                $("#get_num_orders_success_alert").fadeIn();
            }).catch((err) => {
                $("#get_num_orders_fail_alert > span").html(errOrMsg(err));
                $("#get_num_orders_fail_alert > span").fadeIn();
                $("#get_num_orders_success_alert").hide();
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
                let html;
                if(res.data.length) {
                    console.log(res.data);
                    html = "<ul>";
                    for(let item of res.data) {
                        let line = `part name: ${item}`;
                        html += `<li> ${line} </li>`;
                    }
                    html += "</ul>";
                } else {
                    html = html = "There are no results for this query!";
                }
                $("#get_part_names_success_alert > span").html(html);
                $("#get_part_names_success_alert").fadeIn();
            }).catch((err) => {
                $("#get_part_names_fail_alert > span").html(errOrMsg(err));
                $("#get_part_names_fail_alert").fadeIn();
                $("#get_part_names_success_alert").hide();
        })
    });
}

setUpGetPartNames();