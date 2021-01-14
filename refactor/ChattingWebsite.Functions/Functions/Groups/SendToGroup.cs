using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using ChattingWebsite.Functions.Models;

namespace ChattingWebsite.Functions
{
    public static class SendToGroup
    {
        [FunctionName(nameof(SendToGroup))]
        public static Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] Message message,
        [SignalR(HubName = "chatHub")] IAsyncCollector<SignalRMessage> signalRMessages)
        {
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    GroupName = message.ToGroupName,
                    Target = "newMessage",
                    Arguments = new[] { message }
                }
            );
        }
    }
}