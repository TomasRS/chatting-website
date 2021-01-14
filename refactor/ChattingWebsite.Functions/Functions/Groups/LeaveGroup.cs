using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using ChattingWebsite.Functions.Models;
using Microsoft.AspNetCore.Http;
using ChattingWebsite.Functions.Helpers;
using System;

namespace ChattingWebsite.Functions
{
    public static class LeaveGroup
    {
        [FunctionName(nameof(LeaveGroup))]
        public static Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
        [SignalR(HubName = "chatHub")]
        IAsyncCollector<SignalRGroupAction> signalRGroupActions,
        IAsyncCollector<SignalRMessage> signalRMessages)
        {
            var message = RequestReader.GetChatMessageFromRequest(req);
            var decodedConnectionId = Base64Decoder.Decode(message.ConnectionId);

            GroupHelper.RemoveFromGroup(signalRGroupActions, message, decodedConnectionId);

            //Sends a message to the group that the user has left
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    GroupName = message.GroupName,
                    Target = Environment.GetEnvironmentVariable("NewMessageEventName"),
                    Arguments = new[] {
                        new ChatMessage {
                            IsChatBot = true,
                            Sender = "ChatBot",
                            Text = $"{message.Sender} has left the chat",
                            Time = $"{DateTime.Now.TimeOfDay.Hours}:{DateTime.Now.TimeOfDay.Minutes}"
                        }
                    }
                });
        }
    }
}