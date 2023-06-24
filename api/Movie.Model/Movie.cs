namespace Movie.Model;

public class Movie : BaseRecord
{
    public string Title { get; set; }
}

public class User : BaseRecord
{
    public string Username { get; set; }
    public string Role { get; set; }
    
}

public class Rating : BaseRecord
{
    public int Score { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public int RatingEventId { get; set; }
    public virtual RatingEvent RatingEvent { get; set; }

}

public class RatingEvent : BaseRecord
{
    public int MovieId { get; set; }
    public virtual Movie Movie { get; set; }
    public DateTime Date { get; set; }
    public virtual IEnumerable<Rating> Ratings { get; set; }

}

public abstract class BaseRecord
{
    public int Id { get; set;}
}