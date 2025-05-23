import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Equipes = () => {
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    phone: '',
    email: '',
    isAdmin: false,
  });
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'James Miller', phone: '+01 234 567 89', email: 'xyz78576@gmail.com', isAdmin: true },
    { id: 2, name: 'Devid', phone: '+01 234 567 67', email: 'demo123@gmail.com', isAdmin: false },
    { id: 3, name: 'Jilly', phone: '+01 234 567 49', email: 'sample@gmail.com', isAdmin: true },
    { id: 4, name: 'James Miller', phone: '+01 234 567 89', email: 'xyz78576@gmail.com', isAdmin: true },
    { id: 5, name: 'Devid', phone: '+01 234 567 67', email: 'demo123@gmail.com', isAdmin: false },
    { id: 6, name: 'Jilly', phone: '+01 234 567 49', email: 'sample@gmail.com', isAdmin: true },
    // Add other members as needed
  ]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.phone || !newMember.email) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setTeamMembers((prev) => [
      ...prev,
      { id: prev.length + 1, ...newMember },
    ]);
    setNewMember({ name: '', phone: '', email: '', isAdmin: false });
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedMemberId) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== selectedMemberId));
      setSelectedMemberId(null);
    }
  };

  const columns = [
    {
      field: 'select',
      headerName: '',
      width: 100,
      sortable: false,
      renderHeader: () => (
        <div className="checkbox sf-radio-checkbox">
          <input
            id="th1"
            type="radio"
            name="selectMember"
            onChange={handleDelete}
            disabled={!selectedMemberId}
            aria-label="Supprimer le membre sélectionné"
          />
          <label htmlFor="th1">
            <span className="btn btn-danger btn-xs" title="Supprimer">
            <i className="fa fa-trash"></i>
            </span>
          </label>
        </div>
      ),
      renderCell: (params) => (
        <div className="checkbox sf-radio-checkbox">
          <input
            type="radio"
            id={`td${params.row.id}`}
            name="selectMember"
            value={params.row.id}
            checked={selectedMemberId === params.row.id}
            onChange={() => setSelectedMemberId(params.row.id)}
            aria-label={`Sélectionner ${params.row.name}`}
          />
          <label htmlFor={`td${params.row.id}`}></label>
        </div>
      ),
    },
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'phone', headerName: 'Téléphone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'Est Admin ?',
      width: 120,
      renderCell: (params) => (params.value ? 'Oui' : 'Non'),
    },
    { field: 'action', headerName: 'Action', width: 100, sortable: false, renderCell: () => <span></span> },
  ];
  
  return (
    <div>
    <div className="aon-admin-heading">
      <h4>Ajouter des membres de l'équipe</h4>
    </div>

    <div className="card aon-card">
      <div className="card-body aon-card-body">
        <div className="sf-bd-data-tb-head">
          <button
            className="admin-button"
            onClick={() => setShowModal(true)}
            aria-label="Ajouter un membre de l'équipe"
          >
            <i className="fa fa-plus"></i>
            Ajouter des membres de l'équipe
          </button>
        </div>

        <div className="sf-bs-data-table">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={teamMembers}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              disableColumnMenu
              localeText={{
                noRowsLabel: 'Aucun membre trouvé',
                MuiTablePagination: {
                  labelRowsPerPage: 'Lignes par page',
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from}–${to} de ${count !== -1 ? count : `plus de ${to}`}`,
                },
              }}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f9fa',
                },
                '& .MuiDataGrid-row:nth-of-type(odd)': {
                  backgroundColor: '#f9f9f9',
                },
                '& .MuiDataGrid-cell': {
                  border: '1px solid #ddd',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>

    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h5>Ajouter un membre de l'équipe</h5>
          <button onClick={() => setShowModal(false)} aria-label="Fermer">
            ×
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleAddMember}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                required
                aria-label="Nom du membre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={newMember.phone}
                onChange={handleInputChange}
                required
                aria-label="Numéro de téléphone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newMember.email}
                onChange={handleInputChange}
                required
                aria-label="Adresse email"
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={newMember.isAdmin}
                  onChange={handleInputChange}
                  aria-label="Définir comme administrateur"
                />
                Est Admin ?
              </label>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setShowModal(false)}>
                Annuler
              </button>
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Equipes;