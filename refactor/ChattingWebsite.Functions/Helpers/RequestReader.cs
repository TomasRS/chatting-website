using ChattingWebsite.Functions.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;

namespace ChattingWebsite.Functions.Helpers
{
    public static class RequestReader
    {
        public static ChatMessage GetChatMessageFromRequest(HttpRequest request)
        {
            return new JsonSerializer().Deserialize<ChatMessage>(new JsonTextReader(new StreamReader(request.Body)));
        }
    }
}
