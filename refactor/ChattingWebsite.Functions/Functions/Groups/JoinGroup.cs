using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using ChattingWebsite.Functions.Models;
using System;
using Newtonsoft.Json;
using System.IO;
using ChattingWebsite.Functions.Helpers;
using Microsoft.AspNetCore.Http;

namespace ChattingWebsite.Functions
{
    public static class JoinGroup
    {
        [FunctionName(nameof(JoinGroup))]
        public static Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
        [SignalR(HubName = "chatHub")]
        IAsyncCollector<SignalRGroupAction> signalRGroupActions,
        IAsyncCollector<SignalRMessage> signalRMessages)
        {
            var message = RequestReader.GetChatMessageFromRequest(req);
            var decodedConnectionId = Base64Decoder.Decode(message.ConnectionId);

            GroupHelper.AddToGroup(signalRGroupActions, message, decodedConnectionId);

            //Sends a message to the group (except for the user) that a new user has joined
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    GroupName = message.GroupName,
                    Target = Environment.GetEnvironmentVariable("NewMessageEventName"),
                    Arguments = new[] {
                        new ChatMessage {
                            IsChatBot = true,
                            Sender = "ChatBot",
                            Text = $"{message.Sender} has joined the chat",
                            Time = $"{DateTime.Now.TimeOfDay.Hours}:{DateTime.Now.TimeOfDay.Minutes}"
                        }
                    }
                });
        }
    }
}