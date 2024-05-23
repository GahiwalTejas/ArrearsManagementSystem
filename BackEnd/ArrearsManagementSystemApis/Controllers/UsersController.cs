using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ArrearsManagementSystemApis.Models;

namespace ArrearsManagementSystemApis.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private ArrearsDbEntities db = new ArrearsDbEntities();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        //[ResponseType(typeof(User))]
        //public IHttpActionResult Registration(User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Users.Add(user);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        //}

        [HttpPost]
        [Route("login")]

        public IHttpActionResult Login([FromBody] User user)
        {
            var UserBy = (from users in db.Users
                          where users.MoNumber == user.MoNumber && users.Password == user.Password
                          select users).FirstOrDefault();

            if (UserBy != null)
            {
                return Ok(UserBy);
            }
            else
            {

                return NotFound();
            }



        }


        [HttpPost]
        [Route("registration")]

        public IHttpActionResult Registration([FromBody] SellerClass userSeller)
        {


            User user = new User();
            user.MoNumber = userSeller.MoNumber;
            user.Password = userSeller.Password;
            user.Name = userSeller.Name;
            user.RoleId = userSeller.RoleId;




                if (!ModelState.IsValid)
            {
                return BadRequest("error");
            }
            db.Users.Add(user);


            db.SaveChanges();
            var UserBy = (from users in db.Users
                          where users.MoNumber == user.MoNumber && users.Password == user.Password
                          select users).FirstOrDefault();


            Store store = new Store();
            store.StoreName = userSeller.StoreName;
            store.UserId = UserBy.Id;
            db.Stores.Add(store);

            db.SaveChanges();

            if (db.SaveChanges() != 0) {
            
                return Ok("Registration Succesfully");
            }
               
            else return BadRequest("Mo Number Should be unique");

        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();
            return
CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}