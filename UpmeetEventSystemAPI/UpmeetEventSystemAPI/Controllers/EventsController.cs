using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UpmeetEventSystemAPI.DTOs;
using UpmeetEventSystemAPI.Entities;

namespace UpmeetEventSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly UpMeetEventDbContext _context;

        public EventsController(UpMeetEventDbContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetAllEvents()
        {
            var eventsList = await _context.Events.ToListAsync();
            var eventDTOs = eventsList.Select(e => new EventDTO
            {
                Id = e.EventId,
                Title = e.Title,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
            }).ToList();
            return Ok(eventDTOs);

        }
    // GET: api/Events/5
    [HttpGet("{id}")]
        public async Task<ActionResult<EventDTO>> GetEvent(int id)
        {
           var findEvent = await _context.Events.FindAsync(id);
            if (findEvent == null)
            {
                return NotFound("Event Not Found");
            }
            return Ok(findEvent);
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventDTO eventDTO)
        {
            var existingEvent = await _context.Events.FindAsync(id);
            if (existingEvent == null) return NotFound("Event Not Found");

            existingEvent.Title = eventDTO.Title;
            existingEvent.Description = eventDTO.Description;
            existingEvent.Date = eventDTO.Date;
            existingEvent.Location = eventDTO.Location;

            _context.Events.Update(existingEvent);
            await _context.SaveChangesAsync();

            var updatedEventDTO = new EventDTO
            {
                Id = existingEvent.EventId,
                Title = existingEvent.Title,
                Description = existingEvent.Description,
                Date = existingEvent.Date,
                Location = existingEvent.Location,
            };
                
            return Ok(updatedEventDTO);
        }

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EventDTO>> AddEvent([FromBody]CreateEventDTO createEventDTO)
        {
            var newEvent = new Event
            {
                Title = createEventDTO.Title,
                Description = createEventDTO.Description,
                Date = createEventDTO.Date,
                Location = createEventDTO.Location
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            var createEvent = new EventDTO
            {
                Id = newEvent.EventId,
                Title = newEvent.Title,
                Description = newEvent.Description,
                Date = newEvent.Date,
                Location = newEvent.Location,
            };

            return CreatedAtAction("AddEvent", new { id = newEvent.EventId }, createEvent);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventEntity = await _context.Events.FindAsync(id);
            if (eventEntity == null)
            {
                return NotFound();
            }
            // Get all favorites with this event Id 
            // Loop through and delete favorite Ids
            _context.Events.Remove(eventEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.EventId == id);
        }
    }
}
