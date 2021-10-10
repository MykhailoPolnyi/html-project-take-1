import {
    post_order
} from "./api.js";

import {
    confirm_button,
    create_order_body, validate_inputs, clear_inputs
} from "./order_create_dom.js";

import {
    creation_failed_message, creation_succeed_message
} from "./aside_messages.js";

confirm_button.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        validate_inputs();
    }
    catch (err) {
        creation_failed_message(err);
        return;
    }

    const response = await post_order(create_order_body());

    if (response.ok) {
        creation_succeed_message();
        clear_inputs();
    }
    else {
        creation_failed_message(response.status);
    }
})
