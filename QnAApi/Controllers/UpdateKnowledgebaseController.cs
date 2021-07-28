using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QnAApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QnAApi.Controllers
{
    [Route("api/[controller]")]
    public class UpdateKnowledgebaseController : Controller
    {
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<string> GetPublishKB(int id)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                string key = "42641218-eef5-49a2-994b-7e4018e35060";
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
                request.Headers.Add("Ocp-Apim-Subscription-Key", "");
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
        
        
        // POST api/<controller>
        
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
