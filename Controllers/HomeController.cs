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

        [Route("todos")]
        public IActionResult GetTodos(int limit = 5) {
            var todos = new List<TodoItem>() {
                new TodoItem("Feed the dog"),
                new TodoItem("Fix all the things"),
                new TodoItem("Clean the car"),
                new TodoItem("Read a book"),
                new TodoItem("Sleep")
            };
           

            return Json(todos);
        }
    }
}