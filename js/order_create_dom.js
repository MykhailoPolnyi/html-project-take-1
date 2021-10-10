export const confirm_button = document.getElementById("create-order");

const customer_field = document.getElementById("order-customer");
const date_field = document.getElementById("realization-time");

const date_to_sql_format = (date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

export const create_order_body = () => {
    const received_customer = customer_field.value;
    const received_date = new Date(date_field.value);
    return {
    "customer": received_customer,
    "date_to": date_to_sql_format(received_date),
    "is_completed": 0
}
}

export const clear_inputs = () => {
    customer_field.value = "";
    date_field.value = "";
}

export const validate_inputs = () => {
    if (customer_field.value === "") {
        throw new Error("Customer field cannot be empty.");
    }
    if (date_field.value === "") {
        throw new Error("Realization Time field cannot be empty.");
    }
    const test_date = new Date(date_field.value);
    if (isNaN(test_date.getTime())) {
        throw new Error("Invalid date provided. Expecting date format: YYYY-MM-DD");
    }
}
