namespace UpmeetEventSystemAPI.DTOs
{
    public class FavoriteDTO
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime EventDate { get; set; }
        public string Location { get; set; }

    }
}
