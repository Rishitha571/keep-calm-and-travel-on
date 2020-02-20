import React, {useState} from 'react';
import getCities from '../helpers/getCities'
import CityItemList from './CityItemList'



export default function SearchBar (props) {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  
  return(
    <>
      <form autoComplete="off" onSubmit={event=>event.preventDefault()}>
        <input 
          type='text'
          onChange={(event)=>{
              setCity(event.target.value);
              getCities(event.target.value, setCities);
            }}
          placeholder='e.g Bali'
          value={city}
        />
      </form>
      <CityItemList cities={cities} setCity={setCity} value={city}/>
    </>
  )
}
