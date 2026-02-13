export default async function fetchPlayers({ country, race, league, page, IsUnique}) {
  try {
    const params = new URLSearchParams();
    if (country) params.append('country_code', country);
    if (race) params.append('race', race);
    if (league && league.length > 0) {
      league.forEach(r => params.append('league', r));
    }
   params.append('isUnique', IsUnique ? 'true' : 'false');
    const limit = 25;
    const offset = (page - 1) * limit;

    params.append('limit', limit);
    params.append('offset', offset);

    const url = `/api/players?${params.toString()}`;
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