using Microsoft.Identity.Client;

namespace UpmeetEventSystemAPI.DTOs
{
    public class EventDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date {  get; set; }
        public string Location { get; set; }
    }
}
