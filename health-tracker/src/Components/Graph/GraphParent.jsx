import { useState, useEffect } from 'react';
import GraphChild from './GraphChild';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const GraphParent = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [keywords, setKeywords] = useState(["Sleep", "Food", "mood", "symptom", "activity"]);
  
  const APP_ID = "abc";
  const REST_API_KEY = "abc";
  const OPENAI_API_KEY = "abc";
  

  useEffect(() => {
    async function fetchDataAndSendToAI() {
      try {
        let foodItems = [];
        let sleepTimes = [];
        let moods = [];
        let symptoms = [];
        let activities = [];
    
        for (const target of keywords) {
          const url = target === "Sleep" || target === "Food" 
            ? `https://parseapi.back4app.com/classes/${target}`
            : `https://parseapi.back4app.com/classes/GeneralLog`;
    
          const response = await axios.get(url, {
            headers: {
              "X-Parse-Application-Id": APP_ID,
              "X-Parse-REST-API-Key": REST_API_KEY,
            }
          });
    
          const results = response.data.results;
    
          if (target === "Sleep") {
            for (const val of results) {
              const segments = val.totalSleep.split(' ');
              sleepTimes.push(
                parseFloat(segments[0]) + parseFloat(segments[2]) / 60
              );
            }
            console.log('SleepTimes:', sleepTimes);
          }
    
          if (target === "Food") {
            const categories = ['breakfast', 'lunch', 'dinner', 'snacks'];
            for (const val of results) {
              for (const cat of categories) {
                if (val[cat] && val[cat] !== '') {
                  foodItems.push(val[cat]);
                }
              }
            }
            console.log('Foods:', foodItems);
          }
    
          if (target === "mood") {
            moods = results.filter(r => r.category === 'mood').map(r => parseFloat(r.value));
            console.log('Moods:', moods);
          }
    
          if (target === "symptom") {
            symptoms = results.filter(r => r.category === 'symptom').map(r => r.value);
            console.log('Symptoms:', symptoms);
          }
    
          if (target === "activity") {
            activities = results.filter(r => r.category === 'activity').map(r => r.value);
            console.log('Activities:', activities);
          }
        }
    
        // Now you can safely use moods, symptoms, activities
        if (foodItems.length > 0) {
          const promptData = {
            foods: foodItems,
            sleepTimes: sleepTimes,
            moods: moods,
            symptoms: symptoms,
            activities: activities,
          };
          
          const prompt = `
          Analyze the following user data and provide a health summary.
          Create six sections: 
          Have the start of the 11th character be the start of the next section.:
          section 1 will be a summary of the user's health.
          section 2 will be a summary of the user's sleep intake.
          section 3 will be a summary of the user's food.
          section 4 will be a summary of the user's mood.
          section 5 will be a summary of the user's symptoms.
          section 6 will be a summary of the user's activity.

          section 1 will be only a percentage comparing the user to the average person. Give only the percentage and no other text.
          The keys should be: health, sleep, food, mood, symptoms, activity.
          The values should be a summary of the data in the section.
          The JSON object should be formatted as follows:
          {
            "health": "#%",
            "sleep": "summary of sleep",
            "food": "summary of food",
            "mood": "summary of mood",
            "symptoms": "summary of symptoms",
            "activity": "summary of activity"
          }
          Do not include quotation marks and the json title or any other text outside of the json.
          Make the values, the text, sound like you are speaking to the user.
          Here is the user data:
          ${JSON.stringify(promptData, null, 2)}
          `;
    
          const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: 'You are a health assistant.' },
                { role: 'user', content: prompt },
              ],
            },
            {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
              }
            }
          );
    
          const message = openaiResponse.data.choices[0].message.content;
          setAiResponse(message);
          console.log('AI Response:', message);
        }
    
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    }
    

    fetchDataAndSendToAI();
  }, []);

  /*let data = {};
try {
  data = aiResponse ? JSON.parse(aiResponse) : {};
} catch (error) {
  console.error('Error parsing AI response:', error);
}
const chartData = Object.entries(data).map(([name, count]) => ({ name, count }));*/
let parsedResponse = {};
          try {
            parsedResponse = JSON.parse(aiResponse);
          } catch (error) {
            console.error('Error parsing AI response:', error);
          }
    const key = 'health';
    const Healthranking = parsedResponse[key];

return (
  <div>
    <h1>Summary</h1>
    {aiResponse && (
      <div>
        {/* --- Linear Gauge --- */}
        <div style={{ marginBottom: "40px" }}>
          
          <h2>Overall Health</h2>
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '30px', 
            backgroundColor: '#eee', 
            borderRadius: '15px' 
          }}>
            {/* Hardcoded marker at 70% */}
            <div style={{ 
              position: 'absolute', 
              left: Healthranking, 
              top: '-10px',
              transform: 'translateX(-50%)',
              fontSize: '20px'
            }}>
              🔵
            </div>
            <div style={{ 
              position: 'absolute', 
              width: '100%', 
              top: '35px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '14px'
            }}>
              <span>Bad Health</span>
              <span>Good Health</span>
            </div>
          </div>
        </div>

        {/* --- Secific Metrics --- */}
        {(() => {

          return keywords.map((keyword) => {
            const key = keyword.toLowerCase();
            const value = parsedResponse[key];

            return value ? (
              <div key={keyword}>
                <h2>{keyword}</h2>
                <p>{value}</p>
              </div>
            ) : null;
          });
        })()}
      </div>
    )}
  </div>
);




}

export default GraphParent;