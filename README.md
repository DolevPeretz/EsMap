
Event Management and Local Discovery Platform

Project Objective :
The application is designed to share upcoming events at nearby locations with users and allow business owners to easily publish this information.

What Makes Our Platform Unique?
	•	Access to Upcoming Events at Nearby Locations – Users can view events happening at places close to their current location.
	•	Reviews and Experiences – Alongside events, users can read reviews and recommendations from previous customers about various businesses.
	•	Event Publishing by Business Owners – Business owners verify their ownership and publish upcoming events through the platform.

How Does It Work?
	1.	Business Owner Verification – The business owner uploads documents verifying ownership. Site administrators approve the documents and enable the owner to publish upcoming events.
	2.	Displaying Nearby Locations – The user opens the application, the map loads according to their current location, and displays nearby businesses.
	3.	Access to Events and Reviews – Users can click on points on the map to view business details, reviews, ratings, and upcoming events at that location.
Additionally, users are presented with a window showcasing upcoming events within a 5-kilometer radius and a list of the top-rated places.

Technologies:
	•	Frontend: React, CSS
	•	Backend: Node.js, Express, MongoDB
	•	External API: Google Maps API
	•	File Management and Verification: Multer, bcrypt, Axios

Installation and Execution:
git clone https://github.com/username/event-management.git  
cd event-management  
npm install  
cd client  
npm install  

Running the Project
cd server                                   # Run Server  
node server.js                              # Start Backend Server  
lcp --proxyUrl https://maps.googleapis.com  # Proxy Server Execution:
npm start                                   # Run Frontend  

System Usage:
	•	Adding Events – After verifying the business, the owner can add events through the interface.
	•	Reviewing Nearby Events – Users open the map and can view upcoming events at nearby locations.
	•	Reviews and Ratings – Users can add reviews about businesses directly through the platform after visiting a location.
