using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCoreApp.Models.Sample;

namespace NetCoreApp.Controllers.Sample
{
    public class SampleController : Controller
    {
        [Route("sample/{number:int?}")]
        public async Task<IActionResult> GetSample(int number = 100)
        {
            var result = new List<SampleItem>();

            if (number < 1)
            {
                number = 1;
            }

            var task = Task.Run(() =>
            {
                for (var i = 0; i < number; ++i)
                {
                    result.Add(new SampleItem());
                }
            });

            await task;
            
            return Json(result);
        }

        [Route("sample/todo")]
        public IActionResult GetTodo()
        {
            var result = new List<TodoItem>()
            {
                new TodoItem()
                {
                    Complete = false,
                    Description = "Get cheese"
                },
                new TodoItem()
                {
                    Complete = true,
                    Description = "Get milk"
                }
            };

            return Json(result);
        }
    }
}