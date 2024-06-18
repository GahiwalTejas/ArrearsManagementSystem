using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Contexts;
using System.Web.Http;
using System.Web.Http.Description;
using ArrearsManagementSystemApis.Models;

namespace ArrearsManagementSystemApis.Controllers
{
    [RoutePrefix("api/Arrears")]
    public class ArrearsController : ApiController
    {
        private ArrearsDbEntities db = new ArrearsDbEntities();

        // GET: api/Arrears
        public IQueryable<Arrear> GetArrears()
        {
            return db.Arrears;
        }
        [HttpGet]
        [Route("getArrearByArrearId/{id}")]

        public IHttpActionResult GetRole(int id)
        {
            var result = from user in db.Users
                         join arrear in db.Arrears on user.Id equals arrear.UserId
                         where arrear.ArrearId == id
                         select new
                         {
                             user.Name,
                             arrear.Amount
                         };

           // Arrear role = db.Arrears.Find(id);
            if (result == null)
            {
               return NotFound();
            }

            return Ok(result);
        }
        // GET: api/Arrears/5
        [ResponseType(typeof(Arrear))]
        public IHttpActionResult GetArrear(int id)
        {

            var userId = id; 
    

            var result = from arrear in db.Arrears
                         join stores in db.Stores on arrear.StoreId equals stores.StoreId
                         where arrear.UserId == userId
                         select new
                         {   ArrearId=arrear.ArrearId,
                             StoreName = stores.StoreName,
                             Amount = arrear.Amount,
                             Dates = arrear.Dates,
                             Times = arrear.Times
                         };
            var arrearsList = result.ToList();



            return Ok(arrearsList);
        }

        [HttpGet]
        [Route("getArrearByStore/{id}")]
        public IHttpActionResult GetArrearByStore(int id)
        {


            
            var store = (from stores in db.Stores
                          where stores.UserId == id
                          select stores).FirstOrDefault();

            var result = from arrear in db.Arrears
                         join user in db.Users on arrear.UserId equals user.Id
                         where arrear.StoreId == store.StoreId
                         select new
                         {
                             ArrearId = arrear.ArrearId,
                             userName = user.Name,
                             Amount = arrear.Amount,
                             Dates = arrear.Dates,
                             Times = arrear.Times
                         };
            var arrearsList = result.ToList();



            return Ok(arrearsList);
        }


        // PUT: api/Arrears/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutArrear(int id, Arrear arrear)
        {
            DateTime currentDateTime = DateTime.Now;
            TimeSpan currentTime = DateTime.Now.TimeOfDay;
            var arrearUpdateData=db.Arrears.SingleOrDefault(a=>a.ArrearId==id);

            if (arrearUpdateData != null)
            {
                // Update the amount
                arrearUpdateData.Amount = arrear.Amount;
                arrearUpdateData.Dates = currentDateTime;
                arrearUpdateData.Times = currentTime;

                // Save changes to the database
                db.SaveChanges();
            }

            // Arrear arrear1 = new Arrear();
            // arrear1.Amount = arrear.Amount;
            //arrear1.ArrearId= id;
            // arrear1.Dates = currentDateTime;
            // arrear1.Times = currentTime;
            // if (!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }

            // if (id != arrear1.ArrearId)
            // {
            //     return BadRequest();
            // }

            // db.Entry(arrear1).State = EntityState.Modified;

            // try
            // {
            //     db.SaveChanges();
            // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!ArrearExists(id))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Arrears
        [ResponseType(typeof(Arrear))]
        public IHttpActionResult PostArrear(ArrearData arrear)
        {
            //  DateTime time = DateTime.Now;
            // DateTime today = DateTime.Today;
            DateTime currentDateTime = DateTime.Now;
            TimeSpan currentTime = DateTime.Now.TimeOfDay;
            Arrear arrear1 = new Arrear();
            arrear1.Amount = arrear.Amount;
            arrear1.StoreId=arrear.StoreId;
            arrear1.UserId = arrear.UserId;
            arrear1.Dates = currentDateTime;
            arrear1.Times =currentTime;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Arrears.Add(arrear1);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = arrear1.ArrearId }, arrear);
        }

        // DELETE: api/Arrears/5
        [ResponseType(typeof(Arrear))]
        public IHttpActionResult DeleteArrear(int id)
        {
            Arrear arrear = db.Arrears.Find(id);
            if (arrear == null)
            {
                return NotFound();
            }

            db.Arrears.Remove(arrear);
            db.SaveChanges();

            return Ok(arrear);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArrearExists(int id)
        {
            return db.Arrears.Count(e => e.ArrearId == id) > 0;
        }
    }
}