export default async function countryFetch() {
  try {
    
    const getResponse = await fetch('/api/countries', {
      method: 'GET',
    
    });
    if (!getResponse.ok) {
      throw new Error(`HTTP error! status: ${getResponse.status}`);
    }
    const data = await getResponse.json();
    console.log("Fetched players:", data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}