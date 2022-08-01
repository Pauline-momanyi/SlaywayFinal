import React, { useState } from "react";
import {Link} from 'react-router-dom'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./Calender.css";

function Calender({user}) {
  const [date, setDate] = useState(new Date());
  const [service, setService] = useState('Hair')
  const [time, setTime] = useState('')
  const [booked, setBooked] = useState('')

  function onChange(date) {
    // change results based on calendar date click
    setDate(date);
  }
  // console.log(date.toString().slice(4, 15));

  function handleService(e){
    setService(e.target.value)
  }

  // console.log(selection);

  // slots
  let intime = "07:00 Am";
  let outtime = "08:00 Pm";
  const [result, setResult] = useState([]);
  // console.log("Array", result)

  function intervals(startString, endString) {
    var start = moment(startString, "hh:mm a");
    var end = moment(endString, "hh:mm a");
    start.minutes(Math.ceil(start.minutes() / 15) * 15);

    var current = moment(start);

    while (current <= end) {
      if (result.includes(current.format("hh:mm a"))) {
        return null;
      } else {
        result.push(current.format("hh:mm a"));
        current.add(120, "minutes");
      }
    }

    return result;
  }


  function handleSubmit(e){
    console.log(service);
    console.log(date.toString().slice(4, 15));
    console.log(time.time);

    e.preventDefault();
    // setIsLoading(true);
    fetch("/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service,
        date: date.toString().slice(4, 15),
        time: time.time,
      }),
    }).then((r) => {
      // setIsLoading(false);
      if (r.ok) {
        r.json().then(data=> {
          setBooked('booked')
          console.log(data)})
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  const reloadPage = () => {
    window.location.reload()
  }



  intervals(intime, outtime);
  return (
    <div className="book">
      <div>
        <h4 className="text-center">{date.toString().slice(0, 15)}</h4>
        <Calendar onChange={onChange} value={date} />
        {/* {date && <p>{date}</p>} */}
        {/* <p>{date.toString().slice(0, 25)}</p> */}
      </div>

      <div>
      <div className="mt-20 text-lg text-center">
        <label htmlFor="service" className="text-lg font-bold mr-5">
          Select Service:
        </label>

        <select name="service" id="service" value={service} onChange={handleService}>
          <option value="Hair">Hair</option>
          <option value="Nails">Nails</option>
          <option value="Make-Up">Make Up</option>
        </select>
      </div>
      <div className="slots">
        {result && result.length > 0
          ? result.map((time, index) => {
              return (
                <div key={index}>
                  <p onClick={() => setTime({ time })}>{time}</p>
                </div>
              );
            })
          : null}
      </div>

      {
        booked? <div>
          <p >Slot Booked Successfuly. See you then.</p>
             <div className="bg-pink text-white p-8 font-semibold border border-black border-double">
          <p>Date: {date.toString().slice(4, 15)}</p>
          <p>Time: {time.time}</p>
          <p>Service: {service}</p>
        </div>
        <div className="space-x-10 mt-5">
          <button onClick={reloadPage}>Book Again</button>
          <Link to='/mybookings'><button>My Bookings</button></Link>
          </div>
        </div>:
      <div className="flex flex-col items-center justify-center ml-20">
        <div className="bg-pink text-white p-8 font-semibold border border-black ml-20">
          <p>Date: {date.toString().slice(4, 15)}</p>
          <p>Time: {time.time}</p>
          <p>Service: {service}</p>
        </div>
      
        <button className="bg-pink hover:bg-red-200 text-white font-bold py-2 px-2 rounded outline-none mt-5" onClick={handleSubmit}>
          Book Appointment
        </button>
      </div>
}
      </div>
    </div>
  );
}

export default Calender;