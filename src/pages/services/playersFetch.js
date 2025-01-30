export default async function fetchPlayers(updateBeforeFetch = true) {
  try {
    if (updateBeforeFetch) {
      const postResponse = await fetch('http://localhost:5120/api/players/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Додано Content-Type
        },
      });

      if (!postResponse.ok) {
        console.error(`POST failed with status: ${postResponse.status}`);
        throw new Error(`HTTP error! status: ${postResponse.status}`);
      }
      console.log("Database updated successfully.");
    }
    const getResponse = await fetch('http://localhost:5120/api/players', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // відключення кешу
      }
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