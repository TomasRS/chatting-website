namespace ChattingWebsite.Functions.Models
{
    public class ChatMessage
    {
        public string Sender { get; set; }
        public string Text { get; set; }
        public string GroupName { get; set; }
        public string Recipient { get; set; }
        public string ConnectionId { get; set; }
        public string Time { get; set; }
        public bool IsChatBot { get; set; }
    }
}
