using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UpmeetEventSystemAPI.DTOs;
using UpmeetEventSystemAPI.Entities;

namespace UpmeetEventSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly UpMeetEventDbContext _context;

        public FavoritesController(UpMeetEventDbContext context)
        {
            _context = context;
        }

        // GET: api/Favorites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTOs.FavoriteDTO>>> GetFavorites(int userId)
        {
           var favorites = await _context.Favorites.Where(fav =>  fav.UserId == userId).Include(fav => fav.Event).ToListAsync();
           var favoriteDTOs = favorites.Select(fav => new FavoriteDTO
           { 
             Id = fav.FavoriteId,
             EventId = fav.EventId,
             UserId = fav.UserId,
             Title = fav.Event.Title,
             Description = fav.Event.Description,
             EventDate = fav.Event.Date,
             Location = fav.Event.Location
           }).ToList();
            return Ok(favoriteDTOs);
        }

        // GET: api/Favorites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteDTO>> GetFavorite(int id)
        {
            var findFavorite = await _context.Favorites.FindAsync(id);

            if (findFavorite == null)
            {
                return NotFound();
            }

            return Ok(findFavorite);
        }

        // PUT: api/Favorites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavorite(int id, Entities.Favorite favorite)
        {
            if (id != favorite.FavoriteId)
            {
                return BadRequest();
            }

            _context.Entry(favorite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Favorites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DTOs.FavoriteDTO>> AddFavorite([FromBody]CreateFavoriteDTO createFavoriteDTO)
        {
            var existingEvent = await _context.Events.FindAsync(createFavoriteDTO.EventId);
            if (existingEvent == null) return NotFound("Event Not Found");

            var favoriteEvent = new Favorite
            {
                EventId = createFavoriteDTO.EventId,
                UserId = createFavoriteDTO.UserId,
            };

            _context.Favorites.Add(favoriteEvent);
            await _context.SaveChangesAsync();

            var favoriteDTO = new FavoriteDTO
            {
                Id = favoriteEvent.FavoriteId,
                EventId = favoriteEvent.EventId,
                UserId = favoriteEvent.UserId,
                Title = existingEvent.Title,
                EventDate = existingEvent.Date,
                Location = existingEvent.Location,
            };

            return Created();
        }

        // DELETE: api/Favorites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id, [FromQuery] int userId)
        {
            try
            {
                var favoriteEvent = await _context.Favorites.FindAsync(id);
                if (favoriteEvent == null) return NotFound();
                if (favoriteEvent.UserId != userId)
                {
                    return BadRequest("The favorite does not belong to user");
                }
                _context.Favorites.Remove(favoriteEvent);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred.");
            }
        }

        private bool FavoriteExists(int id)
        {
            return _context.Favorites.Any(e => e.FavoriteId == id);
        }
    }
}
