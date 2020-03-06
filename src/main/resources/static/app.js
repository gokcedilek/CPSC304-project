// Set up alerts to be close-able
$('.alert').on('click','.close',function(){
    $(this).closest('.alert').fadeOut();
});

// There"s no need for this to be in its own method, only for organization sake
function setUpCreateOrder() {
    $("#submit_order").on("click", function (e) {
        e.preventDefault(); // Prevent the submit button from re-loading the page

        const quantity = $("#quantity").val();
        const blueprint = $("#blueprint_size").val();
        const purchaser = $("#purchaser_username").val();
        axios.get("/createOrder", { 
            params: {
                quantity: quantity,
                blueprint: blueprint,
                purchaser: purchaser
            }
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