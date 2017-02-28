using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        [Route("todos/{limit:int?}")]
        public IActionResult GetTodos(int limit = 5) {
            var todos = new List<TodoItem>();

            for (var i = 0; i < limit; ++i) {
                todos.Add(new TodoItem($"Item {i}"));
            }

            return Json(todos);
        }
    }
}