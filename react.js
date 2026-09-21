const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory lo data - MongoDB lekunda
let events = [
  { 
    id: 1, 
    title: 'Tech Fest 2026', 
    date: '28 Sep 2026', 
    venue: 'Main Auditorium - St.Anns', 
    category: 'Tech Fest', 
    description: 'Annual Tech Fest with Coding, Robotics, Paper Presentation at St.Ann\'s College.', 
    registrations: [] 
  },
  { 
    id: 2, 
    title: 'Cultural Night', 
    date: '30 Sep 2026', 
    venue: 'Open Ground', 
    category: 'Cultural', 
    description: 'Dance, Music, Drama competitions.', 
    registrations: [] 
  }
];

// 1. All events get cheyadam
app.get('/api/events', (req, res) => {
  res.json(events);
});

// 2. Admin - New event create cheyadam
app.post('/api/events', (req, res) => {
  const newEvent = {
    id: Date.now(),
    title: req.body.title,
    date: req.body.date,
    venue: req.body.venue,
    category: req.body.category,
    description: req.body.description,
    registrations: []
  };
  events.unshift(newEvent);
  res.json({ message: 'Event Created at St.Ann\'s', event: newEvent });
});

// 3. Student - Event ki register avvadam
app.post('/api/events/:id/register', (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  if (!event) return res.status(404).json({ msg: 'Event not found' });

  event.registrations.push({
    name: req.body.name,
    rollNo: req.body.rollNo,
    branch: req.body.branch
  });
  res.json({ message: 'Registered Successfully!' });
});

// 4. Admin - Event delete cheyadam
app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events = events.filter(e => e.id !== id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => {
  console.log('✅ St.Ann\'s Express Server running on http://localhost:5000');
});