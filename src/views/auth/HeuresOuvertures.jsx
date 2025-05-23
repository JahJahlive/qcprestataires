import React, { useState } from 'react';
import Select from 'react-select';

function HeuresOuvertures() {
   // Time options for dropdowns
   const timeOptions = Array.from({ length: 92 }, (_, i) => {
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
    Lundi: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
    Mardi: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
    Mercredi: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
    Jeudi: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
    Vendredi: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
    Samedi: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
    Dimanche: {
      isOpen: true,
      startTime: '08:00:00',
      endTime: '18:00:00',
      breaks: [
        { start: '13:00:00', end: '14:00:00' },
        { start: '14:00:00', end: '16:00:00' },
      ],
    },
  });

  // Handle toggle change
  const handleToggleChange = (day) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen },
    }));
  };

  // Handle time change
  const handleTimeChange = (day, field, selectedOption) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: selectedOption.value },
    }));
  };

  // Add break time
  const addBreakTime = (day) => {
    // Default break time (e.g., 12:00 pm to 1:00 pm)
    const newBreak = { start: '12:00:00', end: '13:00:00' };
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: [...prev[day].breaks, newBreak],
      },
    }));
  };

  // Remove break time
  const removeBreakTime = (day, index) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: prev[day].breaks.filter((_, i) => i !== index),
      },
    }));
  };

  // Format time for display
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const period = parseInt(hours) < 12 ? 'am' : 'pm';
    const displayHours = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;
    return `${displayHours}:${minutes} ${period}`;
  };

  // Days of the week in French
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return (
    <div>
      <div className="aon-admin-heading">
        <h4>Horaires d'ouverture</h4>
      </div>

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

                  <div className="col-sm-2 sf-add-breaktime-btn">
                    <button
                      className="admin-button"
                      onClick={() => addBreakTime(day)}
                      disabled={!businessHours[day].isOpen}
                      aria-label={`Ajouter une pause pour ${day}`}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>

                  <div className="selected-working-hours">
                    <ul className="list-unstyled">
                      {businessHours[day].breaks.map((breakTime, index) => (
                        <li key={index}>
                          {formatTime(breakTime.start)} À {formatTime(breakTime.end)}{' '}
                          <span
                            className="working-hours-remove"
                            onClick={() => removeBreakTime(day, index)}
                            role="button"
                            aria-label={`Supprimer la pause de ${formatTime(
                              breakTime.start
                            )} à ${formatTime(breakTime.end)} pour ${day}`}
                          >
                             <i className="fa fa-times"></i>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeuresOuvertures