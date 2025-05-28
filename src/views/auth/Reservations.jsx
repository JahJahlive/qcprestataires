import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import { motion } from 'framer-motion';
import axiosClient from '../../axios-client';

const Reservations = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    clientName: '',
    clientPhone: '',
    amount: '',
  });
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch events from Laravel API
  useEffect(() => {
    axiosClient.get('/bookings')
      .then(({ data }) => {
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          extendedProps: {
            status: event.status,
            agentName: event.agent_name,
            clientName: event.client_name,
            clientPhone: event.client_phone,
            amount: event.amount,
            paymentStatus: event.payment_status,
          },
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des événements:', error);
        alert('Échec de la récupération des événements: ' + (error.response?.data?.errors || 'Erreur inconnue'));
      })
  }, []);

  // Handle date selection
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo);
    setNewEvent({
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Save new event
  const handleSaveEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/events', {
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        client_name: newEvent.clientName,
        client_phone: newEvent.clientPhone,
        amount: parseFloat(newEvent.amount),
      });
      setEvents([...events, {
        id: response.data.id,
        title: response.data.title,
        start: response.data.start,
        end: response.data.end,
        extendedProps: {
          status: response.data.status,
          agentName: response.data.agent_name,
          clientName: response.data.client_name,
          clientPhone: response.data.client_phone,
          amount: response.data.amount,
          paymentStatus: response.data.payment_status,
        },
      }]);
      setOpen(false);
      setNewEvent({ title: '', start: '', end: '', clientName: '', clientPhone: '', amount: '' });
      selectedDate.view.calendar.unselect(); // Clear selection
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
      alert('Échec de l\'enregistrement de l\'événement: ' + (error.response?.data?.errors || 'Erreur inconnue'));
    }
  };

  // Render event content
  const renderEventContent = (eventInfo) => (
    <Box sx={{ p: 1 }}>
      <Typography variant="body2"><b>{eventInfo.timeText}</b> {eventInfo.event.title}</Typography>
      <Typography variant="caption">Client: {eventInfo.event.extendedProps.clientName}</Typography>
    </Box>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <Typography variant="h4" gutterBottom>Mes Réservations</Typography>
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)}
            id='add-reservation-button'
          >
            Ajouter une Réservation
          </Button>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventContent={renderEventContent}
          locale="fr" // Set French locale
          locales={[frLocale]} // Include French locale
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
          }}
          slotMinTime="08:00:00"
          slotMaxTime="24:00:00"
          allDaySlot={false}
          allDayText="Toute la journée"
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
        />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Ajouter une Réservation</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Titre"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Nom du Client"
              name="clientName"
              value={newEvent.clientName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Téléphone du Client"
              name="clientPhone"
              value={newEvent.clientPhone}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Montant (€)"
              name="amount"
              type="number"
              value={newEvent.amount}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Début"
              name="start"
              type="datetime-local"
              value={newEvent.start}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Fin"
              name="end"
              type="datetime-local"
              value={newEvent.end}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveEvent} variant="contained">Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default Reservations;