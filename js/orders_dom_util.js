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


function order_template(order) {
    return ` \
	<tr id="order-${order.id}"> \
		<td>${order.id}</td> \
		<td>${order.customer}</td> \
		<td>${order.date_to.toLocaleDateString()}</td> \
		<td>${order.status}</td> \
		<td></td> \
	</tr>`;
}

function add_order(order) {
    orders_container.insertAdjacentHTML(
        "beforeend",
        order_template(order)
    );
}

export function add_orders(order_arr) {
    order_arr.map(order => add_order(order));
    orders_counter_elem.innerHTML = order_arr.reduce((counter, order) => order.is_completed ? counter : ++counter, 0);
}

export function refresh_orders(new_orders) {
    orders_container.innerHTML = "";
    add_orders(new_orders);
}


export function sort_table_by(array_to_sort, sort_param) {
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

export function show_search_input(order_arr) {
    let search_name = document.getElementById("search-order").value.toLowerCase();
    const foundOrders = order_arr.filter(order => order.customer.toLowerCase().search(search_name) !== -1);
    refresh_orders(foundOrders);
}