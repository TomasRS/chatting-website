using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using ChattingWebsite.Functions.Models;
using System;

namespace ChattingWebsite.Functions
{
    public static class JoinGroup
    {
        [FunctionName(nameof(JoinGroup))]
        public static Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] UserGroup userGroup,
        [SignalR(HubName = "chatHub")]
        IAsyncCollector<SignalRGroupAction> signalRGroupActions,
        IAsyncCollector<SignalRMessage> signalRMessages)
        {
            //Joins a user to a group
            signalRGroupActions.AddAsync(
                new SignalRGroupAction
                {
                    ConnectionId = userGroup.User.ConnectionId,
                    GroupName = userGroup.GroupName,
                    Action = GroupAction.Add
                });

            //Sends a message to the user to welcome them to the group
            signalRMessages.AddAsync(
                new SignalRMessage
                {
                    ConnectionId = userGroup.User.ConnectionId,
                    Target = "newMessage",
                    
                });

            //Sends a message to the group (except for the user) that a new user has joined
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    GroupName = userGroup.GroupName,
                    Target = "newMessage",
                    Arguments = new[] {
                        new Message {
                            IsChatBot = true,
                            UserName = "ChatBot",
                            Content = $"{userGroup.User.Name} has joined the chat",
                            Time = $"{DateTime.Now.TimeOfDay.Hours}:{DateTime.Now.TimeOfDay.Minutes}",
                            ToGroupName = userGroup.GroupName
                        }
                    }
                });
        }
    }
}