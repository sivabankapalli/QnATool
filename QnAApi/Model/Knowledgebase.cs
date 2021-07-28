using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QnAApi.Model
{
    public class KnowledgebasesResponse
    {
        public List<Knowledgebase> Knowledgebases { get; set; }
    }
    public class Knowledgebase
    {
        public string Id { get; set; }
        public string HostName { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public string Language { get; set; }


    }

    public class KnowledgebaseResponse
    {
        public List<KnowledgebaseItem> QnaDocuments { get; set; }
    }

    public class KnowledgebaseItem
    {
        public int Id { get; set; }
        public string Answer { get; set; }
        public List<string> Questions { get; set; }

        public string Source { get; set; }
        
    }
    public class QuestionAndAnswers
    {
        public QuestionAndAnswers(int i,string q, string a,string name,string source)
        {
            Id = i;
            Question = q;
            Answer = a;
            Name = name;
            Source = source;
        }
        public int Id { get; set; }
        public string Answer { get; set; }
        public string Question { get; set; }
        public string Name { get; set; }

        public string Source { get; set; }
    }

}
