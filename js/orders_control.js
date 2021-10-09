import {
	Order,
	refresh_orders,
	search_button, search_field,
	show_search_input,
	sort_select,
	sort_table_by,
} from "./orders_dom_util.js";

import {
	getOrders
} from "./api.js";

const request_results = await getOrders();

const orders = request_results.map((order => new Order(
		order.id,
		order.customer,
		order.date_to,
		order.is_completed
	)
));


search_button.addEventListener("click", (event) => {
    event.preventDefault();
    show_search_input(orders);
});

search_field.addEventListener("change", (event) => {
	event.preventDefault();
	show_search_input(orders);
})

sort_select.addEventListener("change", (event) => {
	event.preventDefault();
	let sort_param = sort_select.value;
	sort_table_by(orders, sort_param);
	refresh_orders(orders);
})

refresh_orders(orders);
