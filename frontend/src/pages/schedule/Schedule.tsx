import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !time || !email) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:4000/api/schedule/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          time,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(`Appointment scheduled successfully! ID: ${result._id}`);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('There was an error scheduling the appointment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToAppointments = () => {
    navigate('/appointments');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-200 mt-5">
      <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-cyan-100 p-8 flex flex-col justify-center items-center w-72">
          <h2 className="text-2xl text-center text-gray-800 mb-4">Schedule a meeting with a psychiatrist</h2>
          <button onClick={navigateToAppointments} className="bg-purple-300 text-black rounded-full w-44 h-44 flex justify-center items-center text-center hover:bg-purple-400 transition">
            Check for scheduled meetings
          </button>
        </div>
        <div className="p-8 flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-xl font-bold mb-2 mt-8">February</h3>
            <div className="flex relative">
              <span className="flex-1 text-center mr-4 absolute top-20 right-60">W1</span>
              <span className="flex-1 text-center mr-4 absolute top-32 right-60">W2</span>
              <span className="flex-1 text-center mr-4 absolute top-44 right-60">W3</span>
              <span className="flex-1 text-center mr-4 absolute top-56 right-60">W4</span>
            </div>
            <div className="flex justify-between w-full mt-2">
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Monday</div>
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Tuesday</div>
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Wednesday</div>
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Thursday</div>
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Friday</div>
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Saturday</div>
              <div className="w-20 h-12 bg-cyan-100 border flex justify-center items-center">Sunday</div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
              {Array(4).fill(null).map((_, weekIndex) => (
                <React.Fragment key={weekIndex}>
                  {Array(7).fill(null).map((_, dateIndex) => {
                    const date = `Week ${weekIndex + 1} Day ${dateIndex + 1}`;
                    return (
                      <div
                        key={dateIndex}
                        className={`w-12 h-12 border flex justify-center items-center cursor-pointer ${selectedDate === date ? 'bg-purple-300' : 'bg-purple-200'}`}
                        onClick={() => handleDateClick(date)}
                      ></div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            <label htmlFor="date" className="label">Date:</label>
            <input type="text" id="date" name="date" value={selectedDate} readOnly className="input mb-2" placeholder='Select from the calendar...'/>
            <label htmlFor="time" className="label">Time:</label>
            <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} required className="input mb-2" placeholder='Choose time...'/>
            <label htmlFor="email" className="label">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input mb-4" placeholder='Input an email...'/>
            <button type="submit" disabled={isSubmitting} className="button w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">{isSubmitting ? 'Booking...' : 'Book Appointment'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;