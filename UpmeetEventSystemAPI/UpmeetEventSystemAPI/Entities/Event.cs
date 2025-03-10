using System;
using System.Collections.Generic;

namespace UpmeetEventSystemAPI.Entities;

public partial class Event
{
    public int EventId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime Date { get; set; }

    public string Location { get; set; } = null!;

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}
