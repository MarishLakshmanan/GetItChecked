import React from 'react';
import { Box, Modal, Typography, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
};

export default function UploadingModal({ open }) {
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      // Allow programmatic close if needed
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Uploading File...
        </Typography>
      </Box>
    </Modal>
  );
}
