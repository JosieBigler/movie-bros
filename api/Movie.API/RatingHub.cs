using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using MovieBro.API.DTO;
using MovieBros.Data;

namespace MovieBro.API
{
    public class RatingHub : Hub
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly MovieContext _movieContext;
        public RatingHub(UserManager<IdentityUser> userManager, MovieContext movieContext)
        {
            _movieContext = movieContext;
            _userManager = userManager;
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        public async Task SendMessage(RatingDTO message)
        {
            //Get the user from the cookie.  If not authorized then don't do nothing.
            //We only send the message if we haven't rated.
            if (Context.User is null) return;

            if (!Context.User.Identities.Any(x => x.IsAuthenticated)) return;

            var user = await _userManager.GetUserAsync(Context.User);

            if (user == null) return;

            var hasRated = _movieContext.Rating.Any(x => x.UserId == Guid.Parse(user.Id) && x.MovieId == message.MovieId);

            if (hasRated) return;

            await Clients.All.SendAsync("ReceiveMessage", new { message.MovieId, message.Value, user.UserName });
        }
    }
}
