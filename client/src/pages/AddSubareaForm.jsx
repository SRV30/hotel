import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const AddSubareaForm = () => {
  const [subareaData, setSubareaData] = useState({
    region: '',
    sub_region: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubareaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hotel-theta-three.vercel.app/api/region', subareaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Subarea added successfully!');
        setSubareaData({
          region: '',
          sub_region: '',
        });
        navigate('/admindashboard');
      } else {
        alert('Failed to add subarea');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the subarea');
    }
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 5,
          boxShadow: 5,
          width: '40vw',
          border: '1px solid #ddd',
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
          Add New Subarea
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Region"
                variant="outlined"
                name="region"
                value={subareaData.region}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sub-Region"
                variant="outlined"
                name="sub_region"
                value={subareaData.sub_region}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: '12px 0',
                  fontSize: '16px',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#0066cc',
                  },
                }}
              >
                Add Subarea
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddSubareaForm;
