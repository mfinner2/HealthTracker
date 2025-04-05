import Parse from "./parseConfig";

const GeneralLog = Parse.Object.extend("GeneralLog");

export async function saveGeneralEntry(data, date){
	const log = new GeneralLog();

	log.set("category", data.category);
	log.set("value", data.value);

	if (date.severity) {
		log.set("severity", data.severity);
	}	
	if (date.notes) {
		log.set("notes", data.notes);
	}

	const currentUser = Parse.User.current();
	if (currentUser) {
		log.set("user", currentUser);
	}

	const day = new Date(date);
	day.setHours(0, 0, 0, 0);
	log.set("date", day);

	try{
		const saved = await log.save();
		console.log("General log saved:", saved);
		return saved;
	} catch (error) {
		console.error("Error saving general log:", error.message);
		throw error;
	}
}

export async function getGeneralEntriesByDate(date) {
	const currentUser = Parse.User.current();
	if (!currentUser) return [];

	const start = new Date(date);
	start.setHours(0, 0, 0, 0);

	const end = new Date(date);
	end.setHours(23, 59, 59, 999);

	const query = new Parse.Query("GeneralLog");
	query.greaterThanOrEqualTo("date", start);
	query.lessThanOrEqualTo("date", end);
	query.equalTo("user", currentUser);
	query.ascending("createdAt");

	try {
		const results = await query.find();
		return results.map((log) => ({
			id: log.id,
			category: log.get("category"),
			value: log.get("value"),
			severity: log.get("severity"),
			notes: log.get("notes"),
			createdAt: log.createdAt,
		}));
	} catch (error) {
		console.error("error fetching gen logs:", error.message);
		throw error;
	}
	
}