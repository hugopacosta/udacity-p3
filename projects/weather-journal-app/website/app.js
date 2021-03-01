/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
let apiKey = '&appid=fcf84eb90579590bb33703f689c0636c';

document.getElementById('generate').addEventListener('click', retrieveWeather);

function retrieveWeather(e){
    const zipCode = document.getElementById('zip').value;
    getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
            if(data.cod == '404'){
                document.getElementById('warning-label').innerHTML = 'City not found!'
                throw new Error("City not found!");
            }
            else{
                console.log(data);
                const dateTime = new Date(data.dt * 1000).toISOString().slice(0,10);
                const content = document.getElementById('feelings').value;
                addEntry('/addEntry',{temperature:data.main.temp, date:dateTime, content:content});
            } 
    }).then(function(){
        updateUI();
    }).catch(function(error){
        console.log(error);
    });
}

const getWeather = async (baseURL, zipCode, apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try{
        const data = await res.json();
        return data;
    } catch(error){
        console.log('error',error);
    }
}

const addEntry = async (url, data = {})=>{
    const response = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        return newData;
    } catch(error){
        console.log('error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/recentEntry');
    try{
        const allEntries = await request.json();
        console.log(allEntries);
        document.getElementById('warning-label').innerHTML = '';
        document.getElementById('date').innerHTML = `Date: ${allEntries.entry.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allEntries.entry.temperature} C`;
        document.getElementById('content').innerHTML = `Content: ${allEntries.entry.content}`;        
    } catch(error) {
        console.log('error', error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();