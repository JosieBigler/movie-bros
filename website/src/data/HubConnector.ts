import * as signalR from "@microsoft/signalr";
interface RatingMessage{
    userName : string,
    rating : number,
    movieId : string
}
const URL =  "https://localhost:7097/hubs/rating"; //or whatever your backend port is
class HubConnector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (movieId : string, userName : string, rating : number) => void) => void;
    static instance: HubConnector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived) => {
            this.connection.on("messageReceived", (movieId, userName, rating) => {
                onMessageReceived(movieId, userName, rating);
            });
        };
    }
    public newMessage  = (message : RatingMessage) => {
        //On .send the first parameter needs to map to the Method in the Hub class on the backend.
        this.connection.send("newMessage", message.movieId, message.userName, message.rating).then(x => console.log("sent"))
    }
    public static getInstance(): HubConnector {
        if (!HubConnector.instance)
            HubConnector.instance = new HubConnector();
        return HubConnector.instance;
    }
}
export default HubConnector.getInstance;