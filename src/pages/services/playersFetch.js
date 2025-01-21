export default async function fetchPlayers() {
    try {
      const response = await fetch('http://localhost:5120/api/players');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data; 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  