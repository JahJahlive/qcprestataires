import React, { useState } from 'react';
import Select from 'react-select';

function HeuresOuvertures() {
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

  // State for business hours
  const [businessHours, setBusinessHours] = useState({
    Lundi: { isOpen: true, startTime: '08:00:00', endTime: '18:00:00' },
    Mardi: { isOpen: true, startTime: '08:00:00', endTime: '18:00:00' },
    Mercredi: { isOpen: true, startTime: '08:00:00', endTime: '18:00:00' },
    Jeudi: { isOpen: true, startTime: '08:00:00', endTime: '18:00:00' },
    Vendredi: { isOpen: true, startTime: '08:00:00', endTime: '18:00:00' },
    Samedi: { isOpen: true, startTime: '08:00:00', endTime: '18:00:00' },
    Dimanche: { isOpen: false, startTime: '08:00:00', endTime: '18:00:00' },
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const hoursArray = Object.entries(businessHours).map(([day, details]) => ({
      day,
      isOpen: details.isOpen,
      startTime: details.isOpen ? details.startTime : null,
      endTime: details.isOpen ? details.endTime : null,
    }));
    console.log('Business Hours:', hoursArray);
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
                        checked={businessHours[day].isOpen}
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