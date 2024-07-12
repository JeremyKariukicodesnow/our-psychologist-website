import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Appointment {
  _id: string;
  date: string;
  time: string;
  email: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/schedule/appointments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('There was an error fetching appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-cyan-200">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-cyan-200">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-200">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl text-center text-gray-800 mb-4">Scheduled Appointments</h2>
        <ul className="space-y-4">
          {appointments.map(appointment => (
            <li key={appointment._id} className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800"><strong>Date:</strong> {appointment.date}</p>
              <p className="text-gray-800"><strong>Time:</strong> {appointment.time}</p>
              <p className="text-gray-800"><strong>Email:</strong> {appointment.email}</p>
            </li>
          ))}
        </ul>
        <Link to='/schedule'>Schedule</Link>
      </div>
    </div>
  );
};

export default AppointmentsPage;
