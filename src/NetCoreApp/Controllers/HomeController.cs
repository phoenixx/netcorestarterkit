using Microsoft.AspNetCore.Mvc;
using NetCoreApp.Models.User;

namespace NetCoreApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //get user's locale (if logged in), otherwise default...
            var userModel = new UserModel() { Locale = "en-GB" };

            return View("~/Views/Home/Index.cshtml", userModel);
        }
    }
}