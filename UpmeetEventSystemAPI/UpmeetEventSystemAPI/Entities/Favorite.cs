using System;
using System.Collections.Generic;

namespace UpmeetEventSystemAPI.Entities;

public partial class Favorite
{
    public int FavoriteId { get; set; }

    public int UserId { get; set; }

    public int EventId { get; set; }

    public virtual Event Event { get; set; } = null!;
}
