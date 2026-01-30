export async function fetchReplayLink(matchId) {
  try {
    const id = matchId.trim();
    const response = await fetch(`http://localhost:5000/api/matches/${id}/replay`);

    if (!response.ok) {
      console.warn(`Failed to fetch replay link. Status: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data && typeof data.replayLink === 'string') {
      return data.replayLink;
    } else {
      console.warn("Replay link not found in response:", data);
      return null;
    }

  } catch (error) {
    console.error("Error fetching replay link:", error);
    return null;
  }
}