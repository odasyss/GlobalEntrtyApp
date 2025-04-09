export default async function handler(req, res) {
    const { locationId } = req.query;
  
    try {
      const response = await fetch(
        `https://ttp.cbp.dhs.gov/schedulerapi/slots?locationId=${locationId}&minimum=1`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
    //   console.error("Error fetching slots:", error);
      res.status(500).json({ error: "Failed to fetch slots" });
    }
  }
