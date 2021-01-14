using System;

namespace ChattingWebsite.Functions.Models
{
    public class Message
    {
        public string ToGroupName { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
        public string Time { get; set; }
    }
}
