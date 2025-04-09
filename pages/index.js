import LocationSelector from '../components/LocationSelector'; 
import { useState, useEffect, useRef } from 'react';


const HomePage = () => {
  const [locationId, setLocationId] = useState(null); // State to hold the selected location ID
  const [slots, setSlots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [notificationSent, setNotificationSent] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // State to toggle info visibility

  const toggleInfo = () => setShowInfo(!showInfo); // Function to toggle info visibility

  const intervalRef = useRef(null); // This will hold the interval ID

  const fetchSlots = async (locationId) => {
    if (!locationId) return; // Don't fetch if no location is selected
    setLoading(true);
    setLastChecked(new Date().toLocaleTimeString());
  
    try {
      const response = await fetch(`/api/slots?locationId=${locationId}`);
      const data = await response.json();
  
      console.log("API Response:", data);
  
      setSlots(data);
      setLoading(false);
  
      if (data.length > 0 && !notificationSent) {
        triggerNotification();
        setNotificationSent(true);
        clearInterval(intervalRef.current); // Stop polling after a slot is found
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!locationId) return; // Don't start polling if no location is selected
    fetchSlots(locationId); // Initial fetch
    intervalRef.current = setInterval(() => {
      fetchSlots(locationId);
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [locationId]); // Only run when locationId changes

  

  const triggerNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('A Global Entry appointment is available!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('A Global Entry appointment is available!');
        }
      });
    }
    const audio = new Audio('/bellchime.mp3'); // Bell sound for notification
    audio.play().catch((error) => {
      console.error('Error playing notification sound:', error);
    }
    );
  };

  const handleLocationSelect = (locationId) => {
    setNotificationSent(false); // Reset notification state when a new location is selected
    setLocationId(locationId); // Set the selected location ID
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-full max-w-lg text-gray-800">
        <h1 className="text-3xl font-bold mb-8">Global Entry Appointment Checker</h1>
        
        <LocationSelector onSelectLocation={handleLocationSelect} />

        {loading ? (
          <p className="text-lg font-semibold mt-4">Loading slots...</p>
        ) : slots && slots.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Available Appointments</h2>
            <ul className="space-y-2">
              {slots.map((slot, index) => (
                <li key={index} className="p-3 bg-gray-200 rounded-lg">
                  {new Date(slot.startTimestamp).toLocaleDateString()} -{' '}
                  {new Date(slot.startTimestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-lg font-semibold mt-4">No appointments are available.</p>
        )}

        {lastChecked && <p className="text-sm mt-4">Last checked: {lastChecked}</p>}

        <a href="https://ttp.dhs.gov" target="_blank" rel="noopener noreferrer">
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Login Now
          </button>
        </a>
        <div className="mb-6 text-left">
  <button
    onClick={toggleInfo}
    className="text-blue-700 hover:text-blue-900 font-semibold underline focus:outline-none"
  >
    {showInfo ? 'Hide Info ▲' : 'What is this app? ▼'}
  </button>

  {showInfo && (
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
      <p><strong>What this app does:</strong> This app checks for Global Entry interview appointments at your selected location.</p>
      <p className="mt-2"><strong>How it works:</strong> It auto-refreshes every 5 seconds until a slot becomes available. When one is found, it stops refreshing and notifies you with a browser notification and sound alert.</p>
      <p className="mt-2"><strong>Why it helps:</strong> Instead of manually checking for available appointments, this app monitors it for you and alerts you instantly when something opens up. Great for high-demand locations!</p>
      <p className="mt-2"><strong>Reminder:</strong> Once you see an available appointment, click &apos;Login Now&apos;&quot; to book it as fast as possible on the official site.</p>
      <p className="mt-2"><strong>Disclaimer:</strong> This app is not affiliated with DHS or the Global Entry program. Use at your own risk.</p>
      <p className="mt-2"><strong>Note:</strong> Make sure to allow notifications in your browser settings for this app to work properly. Please keep the tab open.</p>
      <p className="mt-2"><strong>Tip:</strong> If you don&apos;t see notifications, check your browser settings to ensure they are enabled for this site.</p>

    </div>
  )}
</div>
  
        <div className="mt-4 text-sm text-gray-600">
          <p>Made with ❤️ by odasys</p>
          <p>Data sourced from the official DHS website.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
