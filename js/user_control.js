const get_user_id = (user) => {return `user-${user.login}`;}
const login = () => { return document.getElementById("login"); }
const email = () => {return document.getElementById("email"); }
const is_admin = () => { return document.getElementById("is-admin"); }
const is_web = () => { return document.getElementById("web-user"); }
const is_mobile = () => { return document.getElementById("mobile-user"); }

function clear_inputs(){
	login().value = "";
	email().value = "";
	is_admin().checked = false;
	is_mobile().checked = false;
	is_web().checked = false;
}

function set_users_counters() {
	document.getElementById("mobile-users-counter").innerHTML = mobile_users_counter;
	document.getElementById("web-users-counter").innerHTML = web_users_counter;
}

function add_to_table(new_user) {

	const user_table = document.getElementById("users-container");
	const edit_button = `<button onclick="edit_user(${get_user_id(new_user)})"><img src="../../images/svg/pencil-fill.svg" alt="Edit"></button>`
	const delete_button = `<button onclick="delete_user(${get_user_id(new_user)})"><img src="../../images/svg/trash-fill.svg" alt="Delete"></button>`

	let user_template = 
	`<tr id="${get_user_id(new_user)}"> \
		<td>${new_user.login}</td> \
		<td>${new_user.email}</td> \
		<td>${new_user.is_mobile}</td> \
		<td>${new_user.is_web}</td> \
		<td>${edit_button} ${delete_button}</td>\
	</tr>`;

	user_table.innerHTML += user_template;
}

function add_user() {

	const new_user = {
		login: login().value, 
		email: email().value, 
		is_admin: is_admin().checked, 
		is_web: is_web().checked, 
		is_mobile: is_mobile().checked
	};

	if(is_web().checked) {web_users_counter++;}
	if(is_mobile().checked) {mobile_users_counter++;}

	set_users_counters();
	clear_inputs();

	add_to_table(new_user)
}

function delete_user(id) {
	deleted_elem = document.getElementById(id);
	document.removeChild(deleted_elem);
}

function edit_user(id) {
}