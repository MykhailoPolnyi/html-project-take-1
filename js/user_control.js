class User {
	constructor(login, email, is_admin, is_web, is_mobile) {
		this.login = login;
		this.email = email;
		this.is_admin = is_admin;
		this.is_web = is_web;
		this.is_mobile = is_mobile;
	}
}

function add_to_table(new_user, table_id) {

	let user_id = new_user.login;

	const edit_button = `<button onclick="edit_user(${user_id})"><img src="../../images/svg/pencil-fill.svg" alt="Edit"></button>`
	const delete_button = `<button onclick="edit_user(${user_id})"><img src="../../images/svg/trash-fill.svg" alt="Delete"></button>`

	let user_template = `<tr id="${user_id}"> \
	<td>${new_user.login}</td> \
	<td>${new_user.email}</td> \
	<td>${new_user.is_web}</td> \
	<td>${new_user.is_mobile}</td> \
	<td>${edit_button} ${delete_button}</td>\
	</tr>`;
	document.getElementById(table_id).innerHTML += user_template;
}

function add_user() {
	let login = document.getElementById("login").value;
	let email = document.getElementById("email").value;
	let is_admin = document.getElementById("is-admin").checked;
	let is_web = document.getElementById("web-user").checked;
	let is_mobile = document.getElementById("mobile-user").checked;

	const new_user = new User(login, email, is_admin, is_web, is_mobile);

	add_to_table(new_user, "users")
}

function delete_user(user_id) {
}

function edit_user(user_id) {

}