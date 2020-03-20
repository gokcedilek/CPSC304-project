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
        }).then(() => {
            $("#create_order_fail_alert").hide();
            $("#create_order_success_alert").fadeIn();
        }).catch(() => {
            $("#create_order_fail_alert").fadeIn();
            $("#create_order_success_alert").hide();
        })
    });
}

// Let's set up the create order portion!
setUpCreateOrder();