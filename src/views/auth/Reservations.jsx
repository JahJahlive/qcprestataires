import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar, Alert, MenuItem, CircularProgress } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { motion } from 'framer-motion';
import axiosClient from '../../axios-client';
import { parseISO, format, subHours, addHours } from 'date-fns';
import { debounce } from 'lodash';

const Reservations = () => {
  const [events, setEvents] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '', start: '', end: '', amount: '', serviceId: '', clientId: '', providerId: '',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useRef(false);
  const lastFetchedRange = useRef({ start: null, end: null }); // Track last fetched date range
  const calendarRef = useRef(null);

  const formatDateTimeLocal = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = parseISO(dateStr);
      if (isNaN(date.getTime())) return '';
      const adjustedDate = subHours(date, 1);
      const formatted = format(adjustedDate, "yyyy-MM-dd'T'HH:mm");
      console.log('formatDateTimeLocal:', { input: dateStr, output: formatted });
      return formatted;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  useEffect(() => {
    axiosClient.get('/categories')
      .then(({ data }) => setServices(data))
      .catch((error) => {
        setSnackbar({
          open: true,
          message: 'Échec de la récupération des services: ' + (error.response?.data?.errors || error.message),
          severity: 'error',
        });
      });

    axiosClient.get('/users')
      .then(({ data }) => setUsers(data))
      .catch((error) => {
        setSnackbar({
          open: true,
          message: 'Échec de la récupération des utilisateurs: ' + (error.response?.data?.errors || error.message),
          severity: 'error',
        });
      });
  }, []);

  const fetchEvents = useCallback(
    debounce(async (startStr, endStr) => {
      // Skip if already fetching or same date range
      if (isFetching.current || (lastFetchedRange.current.start === startStr && lastFetchedRange.current.end === endStr)) {
        console.log('Fetch skipped:', { reason: isFetching.current ? 'Already fetching' : 'Same date range', startStr, endStr });
        return;
      }
      isFetching.current = true;
      lastFetchedRange.current = { start: startStr, end: endStr };
      setIsLoading(true);
      console.log('Fetching events:', { startStr, endStr });
      try {
        const { data } = await axiosClient.get('/bookings', {
          params: { start: startStr, end: endStr },
        });
        console.log('API response:', data);
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title || 'Sans titre',
          start: event.start,
          end: event.end || event.start,
          extendedProps: {
            status: event.status || 'pending',
            amount: event.amount || 0,
            clientName: event.client?.name || 'Inconnu',
            clientPhone: event.client?.phone || '',
            serviceId: event.service?.id || '',
            clientId: event.client?.id || '',
            providerId: event.provider?.id || '',
            paymentStatus: event.payment_status ?? 'pending',
          },
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        setSnackbar({
          open: true,
          message: 'Échec de la récupération des événements: ' + (error.response?.data?.errors || error.message),
          severity: 'error',
        });
      } finally {
        isFetching.current = false;
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (calendarRef.current) {
      console.log('Initial fetch triggered');
      const calendarApi = calendarRef.current.getApi();
      const { activeStart, activeEnd } = calendarApi.view;
      fetchEvents(activeStart.toISOString(), activeEnd.toISOString());
    }
  }, [fetchEvents]);

  const handleDatesSet = useCallback(
    debounce((dateInfo) => {
      console.log('datesSet triggered:', { start: dateInfo.startStr, end: dateInfo.endStr });
      fetchEvents(dateInfo.startStr, dateInfo.endStr);
    }, 300),
    [fetchEvents]
  );

  const handleDateSelect = (selectInfo) => {
    console.log('Date selected:', { start: selectInfo.startStr, end: selectInfo.endStr });
    setSelectedDate(selectInfo);
    setNewEvent({
      title: '',
      start: formatDateTimeLocal(selectInfo.startStr),
      end: formatDateTimeLocal(selectInfo.endStr),
      amount: '',
      serviceId: '',
      clientId: '',
      providerId: '',
    });
    setOpenCreate(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const startFormatted = formatDateTimeLocal(event.startStr);
    const endFormatted = formatDateTimeLocal(event.endStr || event.startStr);
    console.log('handleEventClick:', {
      eventId: event.id,
      startStr: event.startStr,
      endStr: event.endStr,
      startFormatted,
      endFormatted,
    });
    setEditEvent({
      id: event.id,
      title: event.title,
      start: startFormatted,
      end: endFormatted,
      amount: event.extendedProps.amount || '',
      serviceId: event.extendedProps.serviceId || '',
      clientId: event.extendedProps.clientId || '',
      providerId: event.extendedProps.providerId || '',
    });
    setOpenEdit(true);
  };

  const handleInputChange = (e, setEvent) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.amount || !newEvent.serviceId || !newEvent.clientId || !newEvent.providerId) {
        throw new Error('Tous les champs obligatoires doivent être remplis.');
      }
      if (parseFloat(newEvent.amount) <= 0) {
        throw new Error('Le montant doit être supérieur à 0.');
      }
      const startDate = parseISO(newEvent.start);
      const endDate = newEvent.end ? parseISO(newEvent.end) : null;
      if (endDate && endDate <= startDate) {
        throw new Error('La date de fin doit être postérieure à la date de début.');
      }

      const startUTC = format(addHours(startDate, 1), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      const endUTC = endDate ? format(addHours(endDate, 1), "yyyy-MM-dd'T'HH:mm:ss'Z'") : null;
      console.log('Saving event:', { start: newEvent.start, startUTC, end: newEvent.end, endUTC });

      const response = await axiosClient.post('/bookings', {
        title: newEvent.title,
        start: startUTC,
        end: endUTC,
        amount: parseFloat(newEvent.amount),
        service_id: newEvent.serviceId,
        client_id: newEvent.clientId,
        provider_id: newEvent.providerId,
      });
      const newEventData = {
        id: response.data.id,
        title: response.data.title,
        start: response.data.start,
        end: response.data.end || response.data.start,
        extendedProps: {
          status: response.data.status,
          amount: response.data.amount,
          serviceId: response.data.service?.id,
          clientId: response.data.client?.id,
          providerId: response.data.provider?.id,
          clientName: response.data.client?.name,
          clientPhone: response.data.client?.phone,
          paymentStatus: response.data.payment_status ?? 'pending',
        },
      };
      setEvents((prev) => [...prev, newEventData]);
      setOpenCreate(false);
      setNewEvent({ title: '', start: '', end: '', amount: '', serviceId: '', clientId: '', providerId: '' });
      setSelectedDate(null);
      setSnackbar({ open: true, message: 'Réservation ajoutée avec succès.', severity: 'success' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Échec de l\'enregistrement de l\'événement: ' + (error.response?.data?.errors || 'Erreur inconnue'),
        severity: 'error',
      });
    }
  };

  const handleUpdateEvent = async () => {
    try {
      if (!editEvent.title || !editEvent.amount || !editEvent.serviceId || !editEvent.clientId || !editEvent.providerId) {
        throw new Error('Tous les champs obligatoires doivent être remplis.');
      }
      if (parseFloat(editEvent.amount) <= 0) {
        throw new Error('Le montant doit être supérieur à 0.');
      }
      const startDate = parseISO(editEvent.start);
      const endDate = editEvent.end ? parseISO(editEvent.end) : null;
      if (endDate && endDate <= startDate) {
        throw new Error('La date de fin doit être postérieure à la date de début.');
      }

      const startUTC = format(addHours(startDate, 1), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      const endUTC = endDate ? format(addHours(endDate, 1), "yyyy-MM-dd'T'HH:mm:ss'Z'") : null;
      console.log('Updating event:', { start: editEvent.start, startUTC, end: editEvent.end, endUTC });

      const response = await axiosClient.put(`/bookings/${editEvent.id}`, {
        title: editEvent.title,
        start: startUTC,
        end: endUTC,
        amount: parseFloat(editEvent.amount),
        service_id: editEvent.serviceId,
        client_id: editEvent.clientId,
        provider_id: editEvent.providerId,
      });
      const updatedEvent = {
        id: response.data.id,
        title: response.data.title,
        start: response.data.start,
        end: response.data.end || response.data.start,
        extendedProps: {
          status: response.data.status,
          amount: response.data.amount,
          serviceId: response.data.service?.id,
          clientId: response.data.client?.id,
          providerId: response.data.provider?.id,
          clientName: response.data.client?.name,
          clientPhone: response.data.client?.phone,
          paymentStatus: event.payment_status ?? 'pending',
        },
      };
      setEvents((prev) => prev.map((event) => (event.id === editEvent.id ? updatedEvent : event)));
      setOpenEdit(false);
      setEditEvent(null);
      setSnackbar({ open: true, message: 'Réservation modifiée avec succès.', severity: 'success' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Échec de la modification de l\'événement: ' + (error.response?.data?.errors || error.message),
        severity: 'error',
      });
    }
  };

  const renderEventContent = (eventInfo) => (
    <Box sx={{ p: 1 }}>
      <Typography variant="body2"><b>{eventInfo.timeText}</b> {eventInfo.event.title}</Typography>
      <Typography variant="caption">Client: {eventInfo.event.extendedProps.clientName}</Typography>
    </Box>
  );

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setNewEvent({ title: '', start: '', end: '', amount: '', serviceId: '', clientId: '', providerId: '' });
    setSelectedDate(null);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditEvent(null);
  };

  // Memoize events to prevent unnecessary re-renders
  const memoizedEvents = useMemo(() => events, [events]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box>
        {isLoading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}
        <div className='d-flex justify-content-between align-items-center mb-3 p-0'>
          <Typography variant="h5" gutterBottom>Mes Réservations</Typography>
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            sx={{ mb: 2 }}
            onClick={() => setOpenCreate(true)}
            id='add-reservation-button'
          >
            <span></span>
          </Button>
        </div>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={memoizedEvents}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          datesSet={handleDatesSet}
          locale="fr"
          locales={[frLocale]}
          timeZone="Africa/Lagos"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: "Aujourd'hui",
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
          }}
          slotMinTime="08:00:00"
          slotMaxTime="24:00:00"
          allDaySlot={false}
          allDayText="Non applicable"
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
        {/* Create Event Modal */}
        <Dialog open={openCreate} onClose={handleCloseCreate}>
          <DialogTitle>Ajouter une Réservation</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Titre"
              name="title"
              value={newEvent.title || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              required
              inputProps={{ 'aria-label': 'Titre de la réservation' }}
            />
            <TextField
              fullWidth
              label="Montant (€)"
              name="amount"
              type="number"
              value={newEvent.amount || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              required
              inputProps={{ 'aria-label': 'Montant de la réservation' }}
            />
            <TextField
              select
              fullWidth
              label="Service"
              name="serviceId"
              value={newEvent.serviceId || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              required
              inputProps={{ 'aria-label': 'Sélection du service' }}
            >
              {services.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Client"
              name="clientId"
              value={newEvent.clientId || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              required
              inputProps={{ 'aria-label': 'Sélection du client' }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Prestataire"
              name="providerId"
              value={newEvent.providerId || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              required
              inputProps={{ 'aria-label': 'Sélection du prestataire' }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Début"
              name="start"
              type="datetime-local"
              value={newEvent.start || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
              inputProps={{ 'aria-label': 'Date et heure de début' }}
            />
            <TextField
              fullWidth
              label="Fin"
              name="end"
              type="datetime-local"
              value={newEvent.end || ''}
              onChange={(e) => handleInputChange(e, setNewEvent)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ 'aria-label': 'Date et heure de fin' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate}>Annuler</Button>
            <Button onClick={handleSaveEvent} variant="contained">Enregistrer</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Event Modal */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Modifier une Réservation</DialogTitle>
          <DialogContent>
            {editEvent && (
              <>
                <TextField
                  fullWidth
                  label="Titre"
                  name="title"
                  value={editEvent.title || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  required
                  inputProps={{ 'aria-label': 'Titre de la réservation' }}
                />
                <TextField
                  fullWidth
                  label="Montant (€)"
                  name="amount"
                  type="number"
                  value={editEvent.amount || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  required
                  inputProps={{ 'aria-label': 'Montant de la réservation' }}
                />
                <TextField
                  select
                  fullWidth
                  label="Service"
                  name="serviceId"
                  value={editEvent.serviceId || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  required
                  inputProps={{ 'aria-label': 'Sélection du service' }}
                >
                  {services.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Client"
                  name="clientId"
                  value={editEvent.clientId || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  required
                  inputProps={{ 'aria-label': 'Sélection du client' }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Prestataire"
                  name="providerId"
                  value={editEvent.providerId || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  required
                  inputProps={{ 'aria-label': 'Sélection du prestataire' }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Début"
                  name="start"
                  type="datetime-local"
                  value={editEvent.start || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{ 'aria-label': 'Date et heure de début' }}
                />
                <TextField
                  fullWidth
                  label="Fin"
                  name="end"
                  type="datetime-local"
                  value={editEvent.end || ''}
                  onChange={(e) => handleInputChange(e, setEditEvent)}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ 'aria-label': 'Date et heure de fin' }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Annuler</Button>
            <Button onClick={handleUpdateEvent} variant="contained">Enregistrer</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })}
        >
          <Alert severity={snackbar.severity || 'error'} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Reservations;