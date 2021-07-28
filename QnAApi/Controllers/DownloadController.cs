using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QnAApi.Model;

namespace QnAApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        static string host = "https://westus.api.cognitive.microsoft.com";
        static string service = "/qnamaker/v4.0";
        static string method = "/knowledgebases/{0}/{1}/qna/";

        // NOTE: Replace this with a valid subscription key.
        static string key = "42641218-eef5-49a2-994b-7e4018e35060";

        // NOTE: Replace this with a valid knowledge base ID.
        static string KBId = "";

        // NOTE: Replace this with "test" or "prod".
        static string env = "prod";

        static string PrettyPrint(string s)
        {
            return JsonConvert.SerializeObject(JsonConvert.DeserializeObject(s), Formatting.Indented);
        }
        protected async Task<string> GetResult(string path)
        {
            var _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");

            var response = await _client.GetAsync(path);
            var responseContent = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
                return responseContent;

            return null;
        }
        [HttpGet("{id}")]
        public async Task<string> GetQnA(int id)
        {          
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");
                var KBResponse = await GetResult("https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/knowledgebases");
                string responseText;
                var finalKBResult = JsonConvert.DeserializeObject<KnowledgebasesResponse>(KBResponse);// PrettyPrint(response);
                List<Knowledgebase> kbResult = new List<Knowledgebase>();
                kbResult = finalKBResult.Knowledgebases.ToList();
                KBId = kbResult[id].Id;
                var kbName = kbResult[id].Name;
                var method_with_id = String.Format(method, KBId, env);
                var uri = host + service + method_with_id;
                request.Method = HttpMethod.Get;
                request.RequestUri = new Uri(uri);
                request.Headers.Add("Ocp-Apim-Subscription-Key", "");

                var response = await client.SendAsync(request);
                responseText = await response.Content.ReadAsStringAsync();
                return responseText;
            }
        } 
    }
}