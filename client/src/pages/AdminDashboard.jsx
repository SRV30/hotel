import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios"; // Import axios

const Container = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const Navbar = styled.nav`
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;

  ul {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
  }

  li a {
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Main = styled.main`
  flex-grow: 1;
  padding: 20px;
  max-width: 800px;
  margin: auto;

  h1 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #555;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .edit, .delete {
    cursor: pointer;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
  }

  .edit {
    background-color: #4caf50;
    color: white;
  }

  .delete {
    background-color: #f44336;
    color: white;
  }
`;

const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of hotels from an API or database using axios
    const fetchHotels = async () => {
      try {
        const response = await axios.get("https://hotel-theta-three.vercel.app/api/hotel");
        setHotels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  // Handle edit button click (navigate to edit hotel page)
  const handleEdit = (hotelId) => {
    navigate(`/edithotel/${hotelId}`);
  };

  // Handle delete button click
  const handleDelete = async (hotelId) => {
    console.log("Deleting hotel with ID:", hotelId);
    try {
      const response = await axios.delete(`https://hotel-theta-three.vercel.app/api/hotel/${hotelId}`);
      if (response.status === 200) {
        // If the deletion was successful, update the state to reflect the changes
        setHotels(hotels.filter((hotel) => hotel._id !== hotelId));

        // Optionally, you can fetch the updated list of hotels
        const updatedResponse = await axios.get("https://hotel-theta-three.vercel.app/api/hotel");
        setHotels(updatedResponse.data);
      } else {
        console.error("Failed to delete the hotel");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <Container>
      <Navbar>
        <div>ADMIN Dashboard</div>
        <ul>
          <li>
            <Link to="/addhotel">➕ Hotel</Link>
          </li>
          <li>
            <Link to="/addvehicle">➕ Vehicle</Link>
          </li>
          <li>
            <Link to="/addsubregion">➕ Subregion</Link>
          </li>
        </ul>
      </Navbar>
      <Main>
        <h1>List of Hotels</h1>
        {hotels.length > 0 ? (
          <ul>
            {hotels.map((hotel) => (
              <li key={hotel._id}>
                <div>
                  <strong>{hotel.name}</strong>
                  <p>Price: ${hotel.price}</p>
                  <p>Address: {hotel.address}</p>
                </div>
                <div className="buttons">
                  <button className="edit" onClick={() => handleEdit(hotel._id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(hotel._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hotels found. Please add some hotels.</p>
        )}
      </Main>
    </Container>
  );
};

export default AdminDashboard;
