using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using ChattingWebsite.Functions.Models;

namespace ChattingWebsite.Functions
{
    public static class LeaveGroup
    {
        [FunctionName(nameof(LeaveGroup))]
        public static Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] UserGroup userGroup,
        [SignalR(HubName = "chatHub")] IAsyncCollector<SignalRGroupAction> signalRGroupActions)
        {
            return signalRGroupActions.AddAsync(
             new SignalRGroupAction
             {
                 UserId = userGroup.UserName,
                 GroupName = userGroup.GroupName,
                 Action = GroupAction.Remove
             });
        }
    }
}