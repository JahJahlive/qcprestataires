import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useStateContext } from '../../context/ContextProvider';

function HeuresOuvertures() {
  const { user } = useStateContext();

  // Time options for dropdowns
  const timeOptions = Array.from({ length: 96 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const period = hours < 12 ? 'am' : 'pm';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    const label = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return { value, label };
  });

  // Initialize business hours from backend payload
  const [businessHours, setBusinessHours] = useState({
    Lundi: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
    Mardi: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
    Mercredi: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
    Jeudi: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
    Vendredi: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
    Samedi: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
    Dimanche: { id: null, isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
  });

  // Fetch and set business hours from backend on component mount
  useEffect(() => {
    // Map backend data to state format
    const updatedHours = { ...businessHours };
    user.heures_ouvertures?.forEach((item) => {
      const dayKey = item.day.charAt(0).toUpperCase() + item.day.slice(1);
      updatedHours[dayKey] = {
        id: item.id,
        isOpen: item.is_open,
        startTime: item.start_time ? `${item.start_time}:00` : '08:00:00',
        endTime: item.end_time ? `${item.end_time}:00` : '18:00:00',
      };
    });
    setBusinessHours(updatedHours);
  }, []); // Empty dependency array to run once on mount

  // Helper to convert time string to minutes for comparison
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Handle toggle change
  const handleToggleChange = (day) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen },
    }));
  };

  // Handle time change
  const handleTimeChange = (day, field, selectedOption) => {
    const newValue = selectedOption.value;
    setBusinessHours((prev) => {
      if (
        field === 'startTime' &&
        timeToMinutes(newValue) >= timeToMinutes(prev[day].endTime)
      ) {
        alert("L'heure de début doit être avant l'heure de fin.");
        return prev;
      }
      if (
        field === 'endTime' &&
        timeToMinutes(newValue) <= timeToMinutes(prev[day].startTime)
      ) {
        alert("L'heure de fin doit être après l'heure de début.");
        return prev;
      }
      return {
        ...prev,
        [day]: { ...prev[day], [field]: newValue },
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hoursArray = Object.entries(businessHours).map(([day, details]) => ({
      id: details.id,
      day: day.toLowerCase(),
      is_open: details.isOpen,
      start_time: details.isOpen ? details.startTime.slice(0, 5) : null,
      end_time: details.isOpen ? details.endTime.slice(0, 5) : null,
      user_id: user.id, // Assuming user object has an id property
    }));

    console.log('Business Hours to Submit:', hoursArray);

    // Example API call to send data to backend
    try {
      const response = await fetch('/api/heures_ouvertures', {
        method: 'POST', // or 'PUT' if updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hoursArray),
      });
      if (response.ok) {
        alert('Horaires mis à jour avec succès !');
      } else {
        alert('Erreur lors de la mise à jour des horaires.');
      }
    } catch (error) {
      console.error('Error submitting hours:', error);
      alert('Une erreur est survenue.');
    }
  };

  // Days of the week in French
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return (
    <div>
      <div className="aon-admin-heading">
        <h4>Horaires d'ouverture</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card aon-card">
          <div className="card-body aon-card-body">
            {days.map((day) => (
              <div key={day} className="row working-hours-admin m-b10 staff-schedule-item-row">
                <div className="col-lg-3">
                  <div className="sf-bh-onoff">
                    <h5>{day}</h5>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={businessHours[day].is_open}
                        onChange={() => handleToggleChange(day)}
                        aria-label={`Activer/Désactiver ${day}`}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="row sf-bh-timing-row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Heure de début</label>
                        <Select
                          options={timeOptions}
                          value={timeOptions.find(
                            (option) => option.value === businessHours[day].startTime
                          )}
                          onChange={(option) => handleTimeChange(day, 'startTime', option)}
                          isDisabled={!businessHours[day].isOpen}
                          aria-label={`Sélectionner l'heure de début pour ${day}`}
                        />
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Heure de fin</label>
                        <Select
                          options={timeOptions}
                          value={timeOptions.find(
                            (option) => option.value === businessHours[day].endTime
                          )}
                          onChange={(option) => handleTimeChange(day, 'endTime', option)}
                          isDisabled={!businessHours[day].isOpen}
                          aria-label={`Sélectionner l'heure de fin pour ${day}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right mt-3">
          <button type="submit" className="btn btn-primary">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeuresOuvertures;