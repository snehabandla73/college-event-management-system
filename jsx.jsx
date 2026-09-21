import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/events';

function App() {
  const [events, setEvents] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [form, setForm] = useState({ title:'', date:'', venue:'', category:'Tech Fest', description:'' });

  const fetchEvents = () => {
    axios.get(API).then(res => setEvents(res.data));
  };

  useEffect(() => { fetchEvents(); }, []);

  const createEvent = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    alert('Event Created!');
    setForm({ title:'', date:'', venue:'', category:'Tech Fest', description:'' });
    fetchEvents();
    setShowAdmin(false);
  };

  const register = async (id) => {
    const name = document.getElementById(`name-${id}`).value;
    const rollNo = document.getElementById(`roll-${id}`).value;
    const branch = document.getElementById(`branch-${id}`).value;
    if(!name || !rollNo) return alert('Name & Roll No pettu');
    await axios.post(`${API}/${id}/register`, { name, rollNo, branch });
    alert('Registered!');
    fetchEvents();
  };

  return (
    <div style={{fontFamily:'Arial', background:'#fff8f8', minHeight:'100vh'}}>
      <header style={{background:'#800000', color:'white', padding:'15px 30px', display:'flex', justifyContent:'space-between'}}>
        <h2>🎓 St. Ann's College of Engineering & Technology</h2>
        <button onClick={()=>setShowAdmin(!showAdmin)} style={{background:'white', color:'#800000', padding:'8px 15px', borderRadius:'5px', border:'none', fontWeight:'bold', cursor:'pointer'}}>{showAdmin?'View Events':'Admin Panel'}</button>
      </header>

      <div style={{padding:'25px'}}>
        {showAdmin ? (
          <form onSubmit={createEvent} style={{maxWidth:'500px', margin:'auto', background:'white', padding:'20px', borderRadius:'10px'}}>
            <h3>Only Admin - Create Event</h3>
            <input required placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}} />
            <input required placeholder="Date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}} />
            <input required placeholder="Venue" value={form.venue} onChange={e=>setForm({...form, venue:e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}} />
            <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}}>
              <option>Tech Fest</option><option>Cultural</option><option>Workshop</option><option>Sports</option>
            </select>
            <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{width:'100%', padding:'10px', margin:'5px 0'}}></textarea>
            <button type="submit" style={{width:'100%', padding:'12px', background:'#800000', color:'white', border:'none', borderRadius:'5px'}}>Create Event</button>
          </form>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px'}}>
            {events.map(ev => (
              <div key={ev.id} style={{background:'white', padding:'20px', borderRadius:'10px', borderLeft:'5px solid #800000'}}>
                <b style={{background:'#ffe0e0', padding:'3px 8px', borderRadius:'10px', fontSize:'12px'}}>{ev.category}</b>
                <h3>{ev.title}</h3>
                <p>📅 {ev.date} | 📍 {ev.venue}</p>
                <p>{ev.description}</p>
                <p><b>Registered: {ev.registrations.length}</b></p>
                <input id={`name-${ev.id}`} placeholder="Your Name" style={{width:'90%', padding:'6px', margin:'3px'}} />
                <input id={`roll-${ev.id}`} placeholder="Roll No" style={{width:'90%', padding:'6px', margin:'3px'}} />
                <input id={`branch-${ev.id}`} placeholder="Branch" style={{width:'90%', padding:'6px', margin:'3px'}} />
                <button onClick={()=>register(ev.id)} style={{width:'100%', background:'#800000', color:'white', padding:'8px', border:'none', borderRadius:'5px', marginTop:'5px'}}>Register</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;