import Parse from './parseConfig';

// const Food = Parse.Object.extend("Food");

export async function saveFoodEntry(data, date) {

	const start = new Date(date);
	start.setHours(0,0,0,0); // midnight

	const end = new Date(date);
	end.setHours(23,59,59,999); 

	const currentUser = Parse.User.current();

	const query = new Parse.Query("Food");
	query.greaterThanOrEqualTo("date", start);
	query.lessThanOrEqualTo("date", end);
	if(currentUser) {
		query.equalTo("user", currentUser);
	}

	let food;

	try {
		const existing = await query.first();
		if (existing) {
			food = existing;
			Object.keys(data).forEach((key) => {
				food.set(key, data[key]);
			});
		} else {
			const Food = Parse.Object.extend("Food");
			food = new Food();
			food.set("date", start);
			if (currentUser) {
				food.set("user", currentUser);
			}
			Object.keys(data).forEach((key) => {
				food.set(key, data[key]);
			});
		}

		const saved = await food.save();
		console.log("Food saved:", saved);
		return saved;
	} catch (error) {
		console.error("Error saving food:", error.message);
		throw error;
	}
}

export async function getFoodEntryByDate(date) {
	const start = new Date(date);
	start.setHours(0,0,0,0);

	const end = new Date(date);
	end.setHours(23,59,59,999); 

	const currentUser = Parse.User.current();

	const query = new Parse.Query("Food");
	query.greaterThanOrEqualTo("date", start);
	query.lessThanOrEqualTo("date", end);
	if (currentUser) {
		query.equalTo("user", currentUser);
	}

	try {
		const result = await query.first();
		if (result){
			return {
				breakfast: result.get("breakfast"),
				lunch: result.get("lunch"),
				dinner: result.get("dinner"),
				snacks: result.get("snacks"),
			};
		}
		return null;
	} catch (error) {
		console.error("error fetching food:", error.message);
		throw error;
	}
}