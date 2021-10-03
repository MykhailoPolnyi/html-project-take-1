let id = 1;
class Order {
	constructor(customer, realization_date, is_completed) {
		this.id = id++;
		this.customer = customer;
		this.realization_date = new Date(realization_date);
		this.is_completed = is_completed;	
	}

	get status() {
		if (this.is_completed) {
			return "Done";
		}
		return "In progress";
	}
}

let orders_prog_counter = 0;
const orders_container = document.getElementById("orders");
const orders_counter_elem = document.getElementById("tasks-in-progress");
const search_button = document.getElementById("search-button");
const search_field = document.getElementById("search-order");
const orders = [
	new Order("Feel good inc.", "09/28/2021", true), 
	new Order("Milky way", "10/11/2021", false),
	new Order("Highway", "9/30/2021", true),
	new Order("Kern Inc.", "10/5/2021", false),
	new Order("Furniture Prod", "10/7/2021", true)
	];

function order_template(order) {
	return ` \
	<tr id="order-${order.id}"> \
		<td>${order.id}</td> \
		<td>${order.customer}</td> \
		<td>${order.realization_date.toLocaleDateString()}</td> \
		<td>${order.status}</td> \
		<td></td> \
	</tr>`;
}

function add_order(order) {
	orders_container.insertAdjacentHTML(
	    "beforeend",
	    order_template(order)
	  );
	if (!order.is_completed) {
		orders_prog_counter++;
	}
}

function add_orders(order_arr) {
	for (order of order_arr) {
		add_order(order);
	}
	orders_counter_elem.innerHTML = orders_prog_counter;
}

function refresh_orders(new_orders) {
	orders_prog_counter = 0;
	orders_container.innerHTML = "";
	add_orders(new_orders);
}


function sort_table() {
	sort_param = document.getElementById("sort").value;
	orders.sort((a, b) => {
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
	refresh_orders(orders);
}

search_button.addEventListener("change", (event) => {
    event.preventDefault();
    let search_name = document.getElementById("search-order").value.toLowerCase();
    const foundOrders = orders.filter(order => order.customer.toLowerCase().search(search_name) !== -1);
    refresh_orders(foundOrders);
});

add_orders(orders);
