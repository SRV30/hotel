import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography, Box, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddHotelForm = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    price: "",
    address: "",
    region_subregion: "", // To store the combined selection
  });

  const [regionsWithSubregions, setRegionsWithSubregions] = useState([]); // Combined data

   const navigate = useNavigate();
  // Fetch regions with subregions when the component mounts
  useEffect(() => {
    const fetchRegionsWithSubregions = async () => {
      try {
        const response = await axios.get("https://hotelmanagementss.onrender.com/api/regions"); // Adjust the endpoint as per your API
        const combinedData = response.data.map((item) => ({
          id: item._id,
          displayName: `${item.region} - ${item.sub_region}`, // Combine region and subregion
        }));
        setRegionsWithSubregions(combinedData);
      } catch (error) {
        console.error("Error fetching regions with subregions:", error);
        alert("Failed to fetch regions and subregions");
      }
    };

    fetchRegionsWithSubregions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Form submitted:', hotelData); // Log hotel data before making the request
      const response = await axios.post("https://hotelmanagementss.onrender.com/api/hotels", hotelData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Hotel added successfully!");
        setHotelData({
          name: "",
          price: "",
          address: "",
          region_subregion: "",
        });
        navigate("/admindashboard")
      } else {
        alert("Failed to add hotel");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the hotel");
    }
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 5,
          boxShadow: 5,
          width: "100%",
          maxWidth: 500,
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
          Add New Hotel
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hotel Name"
                variant="outlined"
                name="name"
                value={hotelData.name}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                value={hotelData.price}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                value={hotelData.address}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Region - Subregion"
                variant="outlined"
                name="region_subregion"
                value={hotelData.region_subregion}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              >
                {regionsWithSubregions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.displayName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: "12px 0",
                  fontSize: "16px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#0066cc",
                  },
                }}
              >
                Add Hotel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddHotelForm;
