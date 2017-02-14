using Microsoft.AspNetCore.Mvc;

namespace NetCoreApp.Controllers.User
{
    public class UserController : Controller
    {
        [Route("user/locale")]
        public IActionResult Locale()
        {
            //TODO => get user's configured locale from their profile
            return Json(new {locale = "en-GB"});
        }
    }
}