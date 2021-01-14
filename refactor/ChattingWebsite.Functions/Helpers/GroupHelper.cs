using ChattingWebsite.Functions.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using System.Threading.Tasks;

namespace ChattingWebsite.Functions.Helpers
{
    public static class GroupHelper
    {
        public static Task AddToGroup(IAsyncCollector<SignalRGroupAction> signalRGroupActions, ChatMessage message, string connectionId)
        {
            return GroupAction(
                Microsoft.Azure.WebJobs.Extensions.SignalRService.GroupAction.Add,
                signalRGroupActions,
                message,
                connectionId);
        }

        public static Task RemoveFromGroup(IAsyncCollector<SignalRGroupAction> signalRGroupActions, ChatMessage message, string connectionId)
        {
            return GroupAction(
                Microsoft.Azure.WebJobs.Extensions.SignalRService.GroupAction.Remove,
                signalRGroupActions,
                message,
                connectionId);
        }

        private static Task GroupAction(GroupAction groupAction, IAsyncCollector<SignalRGroupAction> signalRGroupActions, ChatMessage message, string connectionId)
        {
            return signalRGroupActions.AddAsync(
                new SignalRGroupAction
                {
                    ConnectionId = connectionId,
                    UserId = message.Recipient,
                    GroupName = message.GroupName,
                    Action = groupAction
                });
        }
    }
}
