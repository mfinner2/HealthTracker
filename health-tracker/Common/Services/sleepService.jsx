import Parse from './parseConfig';

const Sleep = Parse.Object.extend("Sleep");

export async function saveSleepEntry(data, date) {
	const sleep = new Sleep();

	sleep.set("bedtime", data.bedtime);
	sleep.set("wakeTime", data.wakeTime);
	sleep.set("totalSleep", data.totalSleep);

	const currentUser = Parse.User.current();
	if (currentUser) {
		sleep.set("user", currentUser);
	}

	if(date){
		// strip time
		const midnight = new Date(date);
		midnight.setHours(0, 0, 0, 0);
		sleep.set("date", midnight);
	}

	try {
		const saved = await sleep.save();
		console.log("Sleep saved:", saved);
		return saved;
	} catch (error) {
		console.error("Error saving sleep:", error.message);
		throw error;
	}
}

export async function getSleepEntryByDate(date) {
	const start = new Date(date);
	start.setHours(0, 0, 0, 0);

	const end = new Date(date);
	end.setHours(23, 59, 59, 999);

	const query = new Parse.Query(Sleep);
	query.greaterThanOrEqualTo("date", start);
	query.lessThanOrEqualTo("date", end);

	const currentUser = Parse.User.current();
	console.log("saving for user:", currentUser?.id)
	if(currentUser) {
		query.equalTo("user", currentUser);
	}

	try {
		const results = await query.find();
		if (results.length > 0){
			const sleep = results[0];
			return {
				id: sleep.id,
				bedtime: sleep.get("bedtime"),
				wakeTime: sleep.get("wakeTime"),
				totalSleep: sleep.get("totalSleep"),
			};
		}
		return null;
	} catch (error) {
		console.error("error fetching sleep:", error.message);
		throw error;
	}
}