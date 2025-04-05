import Parse from './parseConfig';

export async function signUpUser(username, password, email) {
	const user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	user.set("email", email);

	try {
		const result = await user.signUp();
		console.log("user signed up:", result);
		return result;
	} catch (error) {
		console.error("Sign up error:", error.message);
		throw error;
	}
}

export async function logInUser(username, password) {
	try {
		const user = await Parse.User.logIn(username, password);
		console.log("User logged in:", user);
		return user;
	} catch (error) {
		console.error ("Login error:", error.message);
		throw error;
	}
}

export async function logOutUser() {
	try {
		await Parse.User.logOut();
		console.log("user logged out");
	} catch (error) {
		console.error("logout error:", error.message);
		throw error;
	}
}

export function getCurrentUser() {
	return Parse.User.current();
}