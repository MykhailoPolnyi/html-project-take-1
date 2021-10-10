import {
    delete_order
} from "./api.js";
import {
    delete_failed_message,
    delete_succeed_message
} from "./aside_messages.js";

export const search_button = document.getElementById("search-button");
export const search_field = document.getElementById("search-order");
export const sort_select = document.getElementById("sort");

export class Order {
    constructor(id, customer, date_to, is_completed) {
        this.id = id;
        this.customer = customer;
        this.date_to = new Date(date_to);
        this.is_completed = is_completed;
    }

    get status() {
        if (this.is_completed) {
            return "Done";
        }
        return "In progress";
    }
}

const orders_container = document.getElementById("orders");
const orders_counter_elem = document.getElementById("tasks-in-progress");


const order_template = (order) => ` \
	<tr id="order-${order.id}"> \
		<td>${order.id}</td> \
		<td>${order.customer}</td> \
		<td>${order.date_to.toLocaleDateString()}</td> \
		<td>${order.status}</td> \
		<td id="order-${order.id}-actions"></td> \
	</tr>`;

const set_action_buttons = (id, action_panel) => {
    set_info_button(id, action_panel);
    set_edit_button(id,action_panel);
    set_delete_button(id, action_panel);
}

const set_info_button = (id, action_panel) => {
    const info_button = document.createElement("button");
    const anchor = document.createElement("a");
    anchor.href = `./orderDetails.html?id=${id}`;
    const img = document.createElement("img");
    img.src = "../../images/svg/info-circle.svg";
    img.alt = "Info";
    anchor.appendChild(img);
    info_button.appendChild(anchor);
    action_panel.appendChild(info_button);
}

const set_edit_button = (id, action_panel) => {
    const edit_button = document.createElement("button");
    const anchor = document.createElement("a");
    anchor.href = `./editOrder.html?id=${id}`;
    const img = document.createElement("img");
    img.src = "../../images/svg/pencil-fill.svg";
    img.alt = "Edit";
    anchor.appendChild(img);
    edit_button.appendChild(anchor);
    action_panel.appendChild(edit_button);
}

const set_delete_button = (id, action_panel) => {
    const delete_button = document.createElement("button");
    const img = document.createElement("img");
    img.src = "../../images/svg/trash-fill.svg";
    img.alt = "Delete";
    delete_button.appendChild(img);
    delete_button.addEventListener("click", (event) => {
        event.preventDefault();
        delete_order_by_id(id);
    })
    action_panel.appendChild(delete_button);
}

const add_order = (order) => {
    orders_container.insertAdjacentHTML(
        "beforeend",
        order_template(order)
    );
    const action_panel = document.getElementById(`order-${order.id}-actions`);
    set_action_buttons(order.id, action_panel);
}

export const delete_order_by_id = async (id) => {
    const response = await delete_order(id);
    if (response.ok) {
        delete_succeed_message(id);
        const deleted_child = document.getElementById(`order-${id}`);
        orders_container.removeChild(deleted_child);
    }
    else {
        if (response.status < 500) {
            const body = await response.json();
            delete_failed_message(`${body.message}`);
        }
        else {
            delete_failed_message("Server error occurred.");
        }
    }
}


export const add_orders = (order_arr) => {
    order_arr.map(order => add_order(order));
    orders_counter_elem.innerHTML = order_arr.reduce((counter, order) => order.is_completed ? counter : ++counter, 0);
}

export const refresh_orders = (new_orders) => {
    orders_container.innerHTML = "";
    add_orders(new_orders);
}

export const sort_table_by = (array_to_sort, sort_param) => {
    array_to_sort.sort((a, b) => {
        if (typeof(a[sort_param]) == "string") {
            let a_lower = a[sort_param].toLowerCase();
            let b_lower = b[sort_param].toLowerCase();
            if ( a_lower > b_lower) {return 1;}
            if ( a_lower < b_lower) {return -1;}
            return 0;
        }
        if (typeof(a[sort_param]) == "Date") {
            if (a[sort_param] < b[sort_param]) {return 1;}
            if (a[sort_param] > b[sort_param]) {return -1;}
            return 0;
        }
        return a[sort_param] - b[sort_param];
    })
    return array_to_sort;
}

export const show_search_input = (order_arr) => {
    let search_name = document.getElementById("search-order").value.toLowerCase();
    const foundOrders = order_arr.filter(order => order.customer.toLowerCase().search(search_name) !== -1);
    refresh_orders(foundOrders);
}

