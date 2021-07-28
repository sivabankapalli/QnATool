using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QnAApi.Model;
using System.Web.Http;

namespace QnAApi.Controllers
{
    public struct Response
    {
        public HttpResponseHeaders headers;
        public string response;

        public Response(HttpResponseHeaders headers, string response)
        {
            this.headers = headers;
            this.response = response;
        }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateKBController : ControllerBase
    {
        static string host = "https://westus.api.cognitive.microsoft.com";
        static string service = "/qnamaker/v4.0";
        static string method = "/knowledgebases/";

        // NOTE: Replace this with a valid subscription key.
        static string key = "42641218-eef5-49a2-994b-7e4018e35060";

        // NOTE: Replace this with a valid knowledge base ID.
        static string KBId = "";
        /*static string new_kb = @"
{
""delete"": {
    ""ids"": [
      34
    ],
    ""sources"": [
      ""Custom Editorial""
    ],
    ""questions"": [
        ""How can I change the default message from QnA Maker?????""
     ]
    }
}
";*/
        /*static string new_kb = @"
         {
          ""add"": {
             ""qnaList"": [
               {
                 ""id"":{0},
                 ""answer"": ""You can change the default message if you use the QnAMakerDialog. See this for details: https://docs.botframework.com/en-us/azure-bot-service/templates/qnamaker/#navtitle"",
                 ""source"": ""Custom Editorial"",
                 ""questions"": [
                   ""How can I change the default message from QnA Maker???""
                 ],
                 ""metadata"": []
         }
         ]
         }
 }";*/
        /* static string new_kb = @"
 {
  ""add"": {
     ""qnaList"": [
       {
         ""id"": 0,
         ""answer"": ""You can change the default message if you use the QnAMakerDialog. See this for details: https://docs.botframework.com/en-us/azure-bot-service/templates/qnamaker/#navtitle"",
         ""source"": ""Custom Editorial"",
         ""questions"": [
           ""How can I change the default message from QnA Maker?????""
         ],
         ""metadata"": []
 }
 ]
 },
   ""update"": {
 ""name"": ""AccessPortal"",
     ""qnaList"": [
       {
         ""id"": 34,
         ""answer"": ""You can change the default message if you use the QnAMakerDialog. See this for details: https://docs.botframework.com/en-us/azure-bot-service/templates/qnamaker/#navtitle"",
         ""source"": ""Custom Editorial"",
         ""questions"": {
         ""add"":[
           ""How can I change the default message from QnA Maker??""
         ],
 ""delete"": [
             ""How can I change the default message from QnA Maker?""
           ]
     },
         ""metadata"": []
 }
   ]
   }
 }
 ";*/

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
        async static Task<Response> Patch(string uri, string body)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                request.Method = new HttpMethod("PATCH");
                request.RequestUri = new Uri(uri);
                request.Content = new StringContent(body, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", "");

                var response = await client.SendAsync(request);
                var responseBody = await response.Content.ReadAsStringAsync();
                return new Response(response.Headers, responseBody);
            }
        }

        async static Task<Response> Get(string uri)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                request.Method = HttpMethod.Get;
                request.RequestUri = new Uri(uri);
                request.Headers.Add("Ocp-Apim-Subscription-Key", "");

                var response = await client.SendAsync(request);
                var responseBody = await response.Content.ReadAsStringAsync();
                return new Response(response.Headers, responseBody);
            }
        }

        async static Task<Response> PostUpdateKB(string kb, string new_kb)
        {
            string uri = host + service + method + kb;
            return await Patch(uri, new_kb);
        }

        async static Task<Response> GetStatus(string operation)
        {
            string uri = host + service + operation;
            return await Get(uri);
        }

        async static Task<bool> UpdateKB(string kb, string new_kb)
        {
            var response = await PostUpdateKB(kb, new_kb);
            var operation = response.headers.GetValues("Location").First();

            var done = false;
            while (true != done)
            {
                response = await GetStatus(operation);

                var fields = JsonConvert.DeserializeObject<Dictionary<string, string>>(response.response);

                String state = fields["operationState"];
                if (state.CompareTo("Running") == 0 || state.CompareTo("NotStarted") == 0)
                {
                    var wait = response.headers.GetValues("Retry-After").First();
                    Thread.Sleep(Int32.Parse(wait) * 1000);
                }
                else
                {
                   done = true;
                }
            }
            return done;
        }
        [HttpGet("{id}")]
        public async Task<string> UpdateQnA(int id,string qn,string ans)
        {
            string question = qn;
            string answer = ans.Replace("'", "&apos;");
            bool updateQnAResult = false;
            string new_kb = "{'add': {'qnaList': [{'id': 0,'answer':'"+answer+"','source': 'Custom Editorial','questions': ['"+question+"'],'metadata': []}]}}";
            
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");
                var KBResponse = await GetResult("https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/knowledgebases");
                var finalKBResult = JsonConvert.DeserializeObject<KnowledgebasesResponse>(KBResponse);// PrettyPrint(response);
                List<Knowledgebase> kbResult = new List<Knowledgebase>();
                kbResult = finalKBResult.Knowledgebases.ToList();
                KBId = kbResult[id].Id;
                updateQnAResult = UpdateKB(KBId, new_kb).Result;                
            }
            if (updateQnAResult == true)
            {
                return "Question: "+qn + "Answer: "+ ans + " added to the knowledgebase";
            }
            else
                return "failed";
        } 
    }
}