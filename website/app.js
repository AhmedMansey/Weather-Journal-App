/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d58a5e99e81cd95b8246bd1e711d8efd&units=metric';
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newZip =  document.getElementById('zip').value;
const feeling = document.getElementById('feelings').value;

//Get temperature from openweathermap website then post the corrisponding data and update UI
getWeather(baseURL, newZip, apiKey).then (function next(data){
postData('/add', 
    {
        date:newDate,
        content:feeling,
        temp:data
    })
  }).then (function next(datasss){
updateUI(datasss
)})
  

}

//GET data
const getData = async (url='')=>{

    const res = await fetch(url);
    try {
      const allData = await res.json();
      console.log(allData)
      return allData;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  //Function to get temprature data from openweathermap website
  const getWeather = async (baseURL, newZip, apiKey)=>{
    const res = await fetch(baseURL+newZip+apiKey)
    try {
      const datass = await res.json();
      console.log(datass)
      console.log(datass.main.temp)
      return await Math.round(datass.main.temp);
    }  catch(error) {
      console.log("error", error);
      document.getElementById('temp').innerHTML = `Temperature: Please Purchase the Bundles from the website for More`
      // appropriately handle the error
    }
  }

  //Updating UI
  const updateUI = async (allData = {}) => {
    const request = await fetch('all');
    try{
      const allDatas = await request.json();
      document.getElementById('date').innerHTML = "Date: " +allDatas.date;
      document.getElementById('content').innerHTML = "Feeling: " +allDatas.content;

      if (allDatas.temp == null) {
        document.getElementById('temp').innerHTML = `Temperature: Please Purchase the Bundles from the website for More`;
      } else {
      document.getElementById('temp').innerHTML = `Temperature: ${allDatas.temp}°C`;
      }
      
    }catch(error){
      console.log("error", error);
    }
  }