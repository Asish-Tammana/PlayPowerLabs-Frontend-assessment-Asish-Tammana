import React, { useState, useEffect } from 'react';
import TimeComp from './components/TimeComp';
import './App.css';

function App() {

  const [UTC, setUTC] = useState('12:00 AM');
  const [IST, setIST] = useState('');
  const [PT, setPT] = useState('');
  const [EDT, setEDT] = useState('');

  const convert12hrTo24hr = (timeString) => {
    const [timePart, ampm] = timeString.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
  
    const ampmUpperCase = ampm.toUpperCase();
  
    let totalHours = hours;
  
    if (ampmUpperCase === 'PM' && hours < 12) {
      totalHours += 12;
    } else if (ampmUpperCase === 'AM' && hours === 12) {
      totalHours = 0;
    }
  
    const formattedTime = `${totalHours < 10 ? '0' + totalHours : totalHours}:${minutes < 10 ? '0' + minutes : minutes}`;
  
    return formattedTime;
  }
  
  const convert24hrTo12hr = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);

    const minutes12Min = minutes%60
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    let hours12hr = hours % 12;
    if (hours12hr === 0) {
      hours12hr = 12; 
    }
  
    const formattedTime = `${hours12hr < 10 ? '0' + hours12hr : hours12hr}:${minutes12Min < 10 ? '0' + minutes12Min : minutes12Min} ${ampm}`;
  
    return formattedTime;
  }
  
  const addHoursMinutesToTime = (timeString, hoursToAdd, minutesToAdd) => {
    const [hours, minutes] = timeString.split(':').map(Number);
  
    let totalMinutes = minutes + minutesToAdd;
  
    let totalHours = hours + hoursToAdd + Math.floor(totalMinutes / 60);
  
    if (totalMinutes < 0) {
      totalMinutes += 60;
    }
  
    if (totalHours < 0) {
      totalHours += 24;
    }
  
    totalHours = totalHours % 24;
  
    const formattedTime = `${totalHours < 10 ? '0' + totalHours : totalHours}:${totalMinutes < 10 ? '0' + totalMinutes : totalMinutes}`;
  
    return formattedTime;
  }

  const ISTChanged = (event) => {
    setIST(event)

    const format24 = convert12hrTo24hr(event)
    const utcFormat24 = addHoursMinutesToTime(format24, -5, -30)
    const utcFormat12 = convert24hrTo12hr(utcFormat24);

    setTimeout(()=>{
      setUTC(utcFormat12)
    }, 100)

    

  }

  const UTCChanged = (event) => {
    setUTC(event)
  }

  const changeRemainingTime = () => {
    setIST(convert24hrTo12hr(addHoursMinutesToTime(convert12hrTo24hr(UTC), 5, 30)))
    setPT(convert24hrTo12hr(addHoursMinutesToTime(convert12hrTo24hr(UTC), -7, 0)))
    setEDT(convert24hrTo12hr(addHoursMinutesToTime(convert12hrTo24hr(UTC), -4, 0)))

  }

  const PTChanged = (event) => {
    setPT(event)

    const format24 = convert12hrTo24hr(event)
    const utcFormat24 = addHoursMinutesToTime(format24, 7, 0)
    const utcFormat12 = convert24hrTo12hr(utcFormat24);
    setTimeout(()=>{
      setUTC(utcFormat12)
    },100)

  }

  const EDTChanged = (event) => {
    setEDT(event)

    const format24 = convert12hrTo24hr(event)
    const utcFormat24 = addHoursMinutesToTime(format24, 4, 0)
    const utcFormat12 = convert24hrTo12hr(utcFormat24);
    setTimeout(()=>{
      setUTC(utcFormat12)
    }, 100)

  }

  useEffect(changeRemainingTime,[UTC])

  return (
    <div className='time-box'>
      {/* <span>UTC: </span> <br /><br /> */}
      {/* <span>IST: </span> <input type='text' value={IST} onChange={ISTChanged} /><br /><br />
      <span>PT: </span> <input type='text' value={PT} onChange={PTChanged}  /><br /><br />
      <span>EDT: </span> <input type='text' value={EDT} onChange={EDTChanged}  /><br /><br /> */}
      <TimeComp timezone={UTC} changeTime={UTCChanged} convert24hrTo12hr={convert24hrTo12hr} title="UTC" />
      <TimeComp timezone={IST} changeTime={ISTChanged} convert24hrTo12hr={convert24hrTo12hr} title="IST" />
      <TimeComp timezone={EDT} changeTime={EDTChanged} convert24hrTo12hr={convert24hrTo12hr} title="EDT" />
      <TimeComp timezone={PT} changeTime={PTChanged} convert24hrTo12hr={convert24hrTo12hr} title="PT" />
    </div>
  );
}

export default App;


