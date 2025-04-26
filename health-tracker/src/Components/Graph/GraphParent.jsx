import { useState, useEffect } from 'react';
import GraphChild from './GraphChild';
import axios from 'axios';


const GraphParent = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [keywords, setKeywords] = useState(["Sleep", "Food", "mood", "symptom", "activity"]);
  
  const APP_ID = "abcde";
  const REST_API_KEY = "abcd";
  const OPENAI_API_KEY = "abc";
  

  useEffect(() => {
    async function fetchDataAndSendToAI() {
      try {
        let foodItems = [];
        let sleepTimes = [];

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
            const moods = results.filter(r => r.category === 'mood').map(r => parseFloat(r.value));
            console.log('Moods:', moods);
          }

          if (target === "symptom") {
            const symptoms = results.filter(r => r.category === 'symptom').map(r => r.value);
            console.log('Symptoms:', symptoms);
          }

          if (target === "activity") {
            const activities = results.filter(r => r.category === 'activity').map(r => r.value);
            console.log('Activities:', activities);
          }
        }

        // Once you have foodItems, send it to OpenAI
        if (foodItems.length > 0) {
          const prompt = `Take this list of foods and tell me if it is healthy: ${foodItems.join(', ')}`;

          const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: 'You are a health assistant helping evaluate foods.' },
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

  return (
    <div>
      <h1>Graphs</h1>
      {aiResponse && <p><strong>AI Evaluation:</strong> {aiResponse}</p>}
      {keywords.map(keyword => (
        <GraphChild key={keyword} keyword={keyword} />
      ))}
    </div>
  );
};

export default GraphParent;
