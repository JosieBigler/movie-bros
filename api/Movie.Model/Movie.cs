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

public class UserRating : BaseRecord
{
    public int Score { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public int RatingId { get; set; }
    public virtual Rating Rating { get; set; }

}

public class Rating : BaseRecord
{
    public int MovieId { get; set; }
    public virtual Movie Movie { get; set; }
    public virtual IEnumerable<UserRating> UserRatings { get; set; }

}

public abstract class BaseRecord
{
    public int Id { get; set;}
}