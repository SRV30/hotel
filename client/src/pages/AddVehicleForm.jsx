import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const AddVehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    type: '',
    price: '',
    regionSubregion: '', // Added region and subregion combination
  });

  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);

  const navigate = useNavigate();

  // Fetch regions and subregions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('https://hotel-theta-three.vercel.app/api/region');
        const combinedData = response.data.map((item) => ({
          id: item._id,
          displayName: `${item.region} - ${item.sub_region}`, // Combine region and subregion
        }));
        setRegions(combinedData);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', vehicleData); // Log vehicle data before making the request
    try {
      const response = await axios.post('https://hotel-theta-three.vercel.app/api/vehicle/new', vehicleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response); // Log the response data
  
      if (response.status === 200) {
        alert('Vehicle added successfully!');
        setVehicleData({
          type: '',
          price: '',
          regionSubregion: '',
        });
        navigate('/admindashboard');
      } else {
        alert('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error:', error.response || error); // Log the error response if available
      alert('An error occurred while adding the vehicle');
    }
  };
  

  return (
    <Container
      maxWidth="100vw" // Changed to xs to control the container size better
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
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
          Add New Vehicle
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vehicle Type"
                variant="outlined"
                name="type"
                value={vehicleData.type}
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
                label="Price for Rent"
                variant="outlined"
                type="number"
                name="price"
                value={vehicleData.price}
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

            {/* Region and Subregion Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ mb: 2 }}>
                <InputLabel>Region & Subregion</InputLabel>
                <Select
                  label="Region & Subregion"
                  name="regionSubregion"
                  value={vehicleData.regionSubregion}
                  onChange={handleChange}
                >
                  {regions.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.displayName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                Add Vehicle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddVehicleForm;
