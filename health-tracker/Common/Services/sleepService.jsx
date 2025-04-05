import Parse from './parseConfig';

const Sleep = Parse.Object.extend("Sleep");

export async function saveSleepEntry(data) {
	const sleep = new Sleep();

	sleep.set("bedtime", data.bedtime);
	sleep.set("wakeTime", data.wakeTime);
	sleep.set("totalSleep", data.totalSleep);

	const currentUser = Parse.User.current();
	if (currentUser) {
		sleep.set("user", currentUser);
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

export async function getLatestSleepEntry() {
	const query = new Parse.Query(Sleep);
	query.descending("createdAt");
	query.limit(1);

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