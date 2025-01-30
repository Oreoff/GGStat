export async function fetchReplayLink(matchId) {
    try {
      const response = await fetch(`http://localhost:5120/api/matches/${matchId}/replay`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.replayLink;
    } catch (error) {
      console.error("Error fetching replay link:", error);
      return null;
    }
  }