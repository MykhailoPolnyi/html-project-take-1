export const create_message = async (message_text, message_type) => {
    const main = document.getElementsByTagName("main")[0];
    const message = document.createElement("aside");
    message.innerHTML = message_text;
    message.setAttribute("class", message_type);
    main.appendChild(message);
    await remove_message(main, message, 6000);
}

const remove_message = (parent, message, time) => new Promise(() => {
    setTimeout( () => parent.removeChild(message), time);
})

export const creation_succeed_message = async () =>
    create_message("Order created successfully!", "succeed-message");

export const creation_failed_message = async (err) =>
    create_message(`Order creation failed! <br> ${err}`, "failed-message")


export const delete_succeed_message = async (id) =>
    create_message(`Order ${id} deleted successfully!`, "succeed-message");


export const delete_failed_message = async (err) =>
    create_message(`Order deleting failed. <br> ${err}`, "failed-message");

export const edit_succeed_message = async (id) =>
    create_message(`Order №${id} edited successfully!`, "succeed-message");

export const edit_failed_message = async (id, err) =>
    create_message(`Order №${id} edit failed! <br> ${err}`, "failed-message");

export const order_not_found_message = async (id) =>
    create_message(
        `Order №${id} not found! <br> <b> <a href="./orders.html">Go to all orders.</a> </b>`,
        "failed-message"
    );
