import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Signup({ onLogin }) {
  const [userData, setUserData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    profession: ''
  });

  const [missingDetails, setMissingDetails] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignup = () => {
    if (
      userData.name === '' ||
      userData.password === '' ||
      userData.email === '' ||
      userData.phone === '' ||
      userData.profession === ''
    ) {
      setMissingDetails(true); 
    } else {
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('User signed up:', userData);
      onLogin(); 
      setUserData({
        name: '',
        password: '',
        email: '',
        phone: '',
        profession: ''
      });
      setMissingDetails(false);
    }
  };

  return (
    <div style={{
      display:'flex',
      width:'40%',
      padding:'10px',
      flexDirection:'column'
    }}>
      <h2 style={{
        marginLeft:'200px',
        color:'blue',
        fontStyle:'italic'
      }}>User Signup</h2>
      <input type="text" name="name" placeholder="Name" value={userData.name} onChange={handleChange} 
      style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige'
      }}
      />
      <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige'
      }}/>
      <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige'
      }}/>
      <input type="tel" name="phone" placeholder="Phone Number" value={userData.phone} onChange={handleChange}style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige'
      }} />
      <select name="profession" value={userData.profession} onChange={handleChange}style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige'
      }}>
        <option value="">Select Profession</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Engineer">Engineer</option>
      </select>
      <button onClick={handleSignup}
      style={{
        width:'100px',
        marginLeft:'240px',
        border:'2px solid green',
        borderRadius:'20px',
        backgroundColor:'green',
        color:'white',
        fontSize:'20px',
        cursor:'pointer',
        boxShadow:'2px 2px lightgreen',
        
      }}>Signup</button>
      {missingDetails && <p style={{ color: 'red' }}>Please fill in all details</p>} 
    </div>
  );
}

function Login({ onLogin, onFetchMovies }) {
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.name === credentials.name && storedUserData.password === credentials.password) {
      onLogin();
      try {
        const response = await axios.post('https://hoblist.com/api/movieList', {
          category: 'movies',
          language: 'kannada',
          genre: 'all',
          sort: 'voting'
        });
        onFetchMovies(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setInvalidCredentials(true);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <input type="text" name="name" placeholder="Name" value={credentials.name} onChange={handleChange}style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige',
        width:'100%',
      }} />
      <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange}style={{
        height:'40px',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'beige',
        width:'100%',
      }} />
      {invalidCredentials && <p style={{color:'red'}}>Invalid Credentials !</p>}
      <button onClick={handleLogin}
       style={{
        width:'100px',
        marginLeft:'240px',
        border:'2px solid green',
        borderRadius:'20px',
        backgroundColor:'green',
        color:'white',
        fontSize:'20px',
        cursor:'pointer',
        boxShadow:'2px 2px lightgreen',
        
      }}
      >Login</button>
    </div>
  );
}

function Menu({ toggleCompanyInfo }) {
  return (
    <div>
      <ul type="none">
    
        <li><a href="#" style={{textDecoration:'none',
            width:'100px',
          
            border:'2px solid green',
            borderRadius:'20px',
            backgroundColor:'green',
            color:'white',
            fontSize:'20px',
            cursor:'pointer',
            boxShadow:'2px 2px lightgreen',
            marginLeft:'1200px',
            marginRight:'38px'
      }}onClick={toggleCompanyInfo}>Company Info</a></li>
      </ul>
    </div>
  );
}

function CompanyInfo() {
  return (
    <div>
      <h2>Company Info</h2>
      <p>Company: Geeksynergy Technologies Pvt Ltd</p>
      <p>Address: Sanjayanagar, Bengaluru-56</p>
      <p>Phone: XXXXXXXXX09</p>
      <p>Email: XXXXXX@gmail.com</p>
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <div className="mov">
    
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            
            <img src={movie.poster} style={{width:'200px'}}/>
            <p>Director: {movie.director.join(', ')}</p>
            <p>Genre: {movie.genre}</p>
            <p>Language: {movie.language}</p>
            <p>Description: {movie.description}</p>
            <p>Page Views: {movie.pageViews}</p>
            <p>Total Votes: {movie.totalVoted}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false); 
  const [companyInfoVisible, setCompanyInfoVisible] = useState(false);
  const [movies, setMovies] = useState([]);

  const toggleSignupMode = () => {
    setSignupMode(!signupMode); 
  };

  const toggleCompanyInfo = () => {
    setCompanyInfoVisible(!companyInfoVisible);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {!loggedIn && !signupMode && <Login onLogin={handleLogin} onFetchMovies={setMovies} />}
      {!loggedIn && signupMode && <Signup onLogin={handleLogin} />}
      {loggedIn && <button onClick={handleLogout} style={{
        width:'100px',
        marginLeft:'240px',
        border:'2px solid green',
        borderRadius:'20px',
        backgroundColor:'green',
        color:'white',
        fontSize:'20px',
        cursor:'pointer',
        boxShadow:'2px 2px lightgreen',
        marginLeft:'1200px',
        marginRight:'38px'
      }}>Logout</button>}
      {loggedIn && !companyInfoVisible && <Menu toggleCompanyInfo={toggleCompanyInfo} />}
      {companyInfoVisible && <CompanyInfo />}
      {loggedIn && movies.length > 0 && <MovieList movies={movies} />}
      
      {!loggedIn && (
        <button onClick={toggleSignupMode}>
          {signupMode ? 'Login' : 'Signup'}
        </button>
      )}
    </div>
  );
}

export default App;
