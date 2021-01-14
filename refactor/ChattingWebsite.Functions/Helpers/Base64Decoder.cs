using System;
using System.Text;

namespace ChattingWebsite.Functions.Helpers
{
    public static class Base64Decoder
    {
        public static string Decode(string source)
        {
            if (string.IsNullOrEmpty(source))
            {
                return source;
            }

            return Encoding.UTF8.GetString(Convert.FromBase64String(source));
        }
    }
}
