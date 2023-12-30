using Microsoft.AspNetCore.SignalR;
using MovieBro.API.DTO;

namespace MovieBro.API
{
    public class RatingHub : Hub
    {
        public async Task SendMessage(RatingDTO message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
