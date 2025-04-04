import Parse from 'parse/dist/parse.min.js';

const Sleep = Parse.Object.extend("Sleep");

export async function saveSleepEntry(data) {
	const sleep = new Sleep();

	sleep.set("bedtime", data.bedtime);
	sleep.set("wakeTime", data.wakeTime);
	sleep.set("totalSleep", data.totalSleep);

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