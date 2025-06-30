export default async function fetchPlayers({ country, race, league, page }) {
  try {
    const params = new URLSearchParams();
    if (country) params.append('country_code', country);
    if (race) params.append('race', race);
    if (league && league.length > 0) {
      league.forEach(r => params.append('league', r));
    }

    const limit = 25;
    const offset = (page - 1) * limit;

    params.append('limit', limit);
    params.append('offset', offset);

    const url = `http://localhost:5000/api/players?${params.toString()}`;

    const getResponse = await fetch(url, {
      method: 'GET',
    });

    if (!getResponse.ok) {
      throw new Error(`HTTP error! status: ${getResponse.status}`);
    }

    const data = await getResponse.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}