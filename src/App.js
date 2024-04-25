import React, { useState, useEffect } from 'react';
import TimeComp from './components/TimeComp';
import './App.css';

function App() {

  const [UTC, setUTC] = useState(['12:00 AM', 0]);
  const [IST, setIST] = useState(['', 0]);
  const [PT, setPT] = useState(['', 0]);
  const [EDT, setEDT] = useState(['', 0]);
  const [displayStatus, setDisplayStatus] = useState({ UTC: true, IST: true, PT: true, EDT: true });
  const [isInternalChange, setIsInternalChange] = useState(true);

  const removeTime = (title) => {

    setDisplayStatus(prevState => ({
      ...prevState,
      [title]: false
    }));

  }

  const calculateAngle = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const angle = (parseInt(((hours * 60) + minutes) * 0.25)) % 1440;
    return angle;
  }

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

    const minutes12Min = minutes % 60

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

  const get24hrsFromAngle = (givenAngle) => {
    const hours = parseInt(givenAngle / 15)
    const minutes = (givenAngle / 0.25) % 60

    return { hours, minutes }
  }

  const ISTChanged = (angle) => {
    // const updatedAngle = calculateAngle(event)

    const { hours, minutes } = get24hrsFromAngle(angle)

    const format24 = `${hours}:${minutes}`

    setIST([convert24hrTo12hr(format24), angle])

    const utcFormat24 = addHoursMinutesToTime(format24, -5, -30)
    const utcAngle = calculateAngle(utcFormat24)
    const utcFormat12 = convert24hrTo12hr(utcFormat24);

    setTimeout(() => {
      setUTC([utcFormat12, utcAngle])
    }, 1000)
    setIsInternalChange(true);


  }

  const PTChanged = (angle) => {

    const { hours, minutes } = get24hrsFromAngle(angle)

    const format24 = `${hours}:${minutes}`
    const utcFormat24 = addHoursMinutesToTime(format24, 7, 0)
    const utcAngle = calculateAngle(utcFormat24)
    const utcFormat12 = convert24hrTo12hr(utcFormat24);

    setTimeout(() => {
      setUTC([utcFormat12, utcAngle])
    }, 1000)
    setIsInternalChange(true);

  }

  const EDTChanged = (angle) => {
    // setEDT(event)
    const { hours, minutes } = get24hrsFromAngle(angle)

    const format24 = `${hours}:${minutes}`
    const utcFormat24 = addHoursMinutesToTime(format24, 4, 0)
    const utcAngle = calculateAngle(utcFormat24)
    const utcFormat12 = convert24hrTo12hr(utcFormat24);
    setTimeout(() => {
      setUTC([utcFormat12, utcAngle])
    }, 1000)

    setIsInternalChange(true);
  }

  const UTCChanged = (angle) => {
    const { hours, minutes } = get24hrsFromAngle(angle)
    const format24 = `${hours}:${minutes}`
    setUTC([convert24hrTo12hr(format24), angle])
  }

  const changeRemainingTime = () => {

    let updatedIST = addHoursMinutesToTime(convert12hrTo24hr(UTC[0]), 5, 30)
    let updatedISTAngle = calculateAngle(updatedIST)
    setIST([convert24hrTo12hr(updatedIST), updatedISTAngle])

    let updatedPT = addHoursMinutesToTime(convert12hrTo24hr(UTC[0]), -7, 0)
    let updatedPTAngle = calculateAngle(updatedPT)
    setPT([convert24hrTo12hr(updatedPT), updatedPTAngle])

    let updatedEDT = addHoursMinutesToTime(convert12hrTo24hr(UTC[0]), -4, 0)
    let updatedEDTAngle = calculateAngle(updatedEDT)
    setEDT([convert24hrTo12hr(updatedEDT), updatedEDTAngle])
    setIsInternalChange(false);



  }

  useEffect(() => {
    if (isInternalChange) {
      changeRemainingTime();
    }
  }, [UTC])


  return (
    <div>
      <div className='title-container'>
        <h1>Time Zone Converter: Simplify Global Time Management</h1>
      </div>
      <div className='time-box'>
        {displayStatus.UTC && <TimeComp timezone={UTC} changeTime={UTCChanged} title="UTC" removeTime={removeTime} />}
        {displayStatus.IST && <TimeComp timezone={IST} changeTime={ISTChanged} title="IST" removeTime={removeTime} />}
        {displayStatus.EDT && <TimeComp timezone={EDT} changeTime={EDTChanged} title="EDT" removeTime={removeTime} />}
        {displayStatus.PT && <TimeComp timezone={PT} changeTime={PTChanged} title="PT" removeTime={removeTime} />}
      </div>

    </div>

  );
}

export default App;


