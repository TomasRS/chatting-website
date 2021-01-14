using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.AspNetCore.Http;

namespace ChattingWebsite.Functions
{
    public static class Negotiate
    {
        [FunctionName(nameof(Negotiate))]
        public static SignalRConnectionInfo GetSignalRInfo(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
            [SignalRConnectionInfo(HubName = "chatHub", UserId = "{headers.x-ms-signalr-userid}")] SignalRConnectionInfo connectionInfo)
        {
            return connectionInfo;
        }
    }
}