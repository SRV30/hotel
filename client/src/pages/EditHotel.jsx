import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

const Container = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const Main = styled.main`
  flex-grow: 1;
  padding: 40px 20px;
  max-width: 900px;
  margin: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;

  &:focus {
    border-color: #2196f3;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #2196f3;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  font-size: 16px;
`;

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({ name: "", price: "", address: "", subregion: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`https://hotelmanagementss.onrender.com/api/hotel/${id}`);
        setHotel(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://hotelmanagementss.onrender.com/api/hotel/${id}`, hotel, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/admindashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Main>
        <Title>Edit Hotel</Title>
        {loading ? (
          <LoadingText>Loading...</LoadingText>
        ) : error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <div>
            <FormGroup>
              <Label htmlFor="name">Hotel Name</Label>
              <Input
                type="text"
                name="name"
                value={hotel.name}
                onChange={handleChange}
                placeholder="Hotel Name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                value={hotel.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                name="address"
                value={hotel.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </FormGroup>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </Main>
    </Container>
  );
};

export default EditHotel;
