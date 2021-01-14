using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.AspNetCore.Http;
using System;
using ChattingWebsite.Functions.Helpers;

namespace ChattingWebsite.Functions
{
    public static class SendToGroup
    {
        [FunctionName(nameof(SendToGroup))]
        public static Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
        [SignalR(HubName = "chatHub")] IAsyncCollector<SignalRMessage> signalRMessages)
        {
            var message = RequestReader.GetChatMessageFromRequest(req);
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    UserId = message.Recipient,
                    GroupName = message.GroupName,
                    Target = Environment.GetEnvironmentVariable("NewMessageEventName"),
                    Arguments = new[] { message }
                }
            );
        }
    }
}