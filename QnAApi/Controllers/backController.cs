using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QnAApi.Model;

namespace QnAApi.Controllers
{
    [Route("api/[controller]")]
    public class backController : Controller
    {
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

        static string PrettyPrint(string s)
        {
            return JsonConvert.SerializeObject(JsonConvert.DeserializeObject(s), Formatting.Indented);
        }
        [HttpGet("{id}")]
        public async Task<string> DontPublishKB(int id)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                string key = "";
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");
                var KBResponse = await GetResult("https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/knowledgebases");
                string responseText;
                var finalKBResult = JsonConvert.DeserializeObject<KnowledgebasesResponse>(KBResponse);// PrettyPrint(response);
                List<Knowledgebase> kbResult = new List<Knowledgebase>();
                kbResult = finalKBResult.Knowledgebases.ToList();
                var KBId = kbResult[id].Id;
                var kbName = kbResult[id].Name;
                var uri = "https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/knowledgebases/" + KBId;
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri(uri);
                request.Headers.Add("Ocp-Apim-Subscription-Key", key);
                //var result = "";
                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    responseText = kbName + "Publish Success.";
                    //result = "{'result' : 'Success.'}";
                }
                else
                {
                    responseText = kbName + "Publish Fail.";
                    //result = await response.Content.ReadAsStringAsync();
                }
                //responseText = PrettyPrint(result);
                return responseText;
            }
        }
    }
}