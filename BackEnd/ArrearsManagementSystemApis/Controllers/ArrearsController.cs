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
    public class ArrearsController : ApiController
    {
        private ArrearsDbEntities db = new ArrearsDbEntities();

        // GET: api/Arrears
        public IQueryable<Arrear> GetArrears()
        {
            return db.Arrears;
        }

        // GET: api/Arrears/5
        [ResponseType(typeof(Arrear))]
        public IHttpActionResult GetArrear(int id)
        {
            Arrear arrear = db.Arrears.Find(id);
            if (arrear == null)
            {
                return NotFound();
            }

            return Ok(arrear);
        }

        // PUT: api/Arrears/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutArrear(int id, Arrear arrear)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != arrear.ArrearId)
            {
                return BadRequest();
            }

            db.Entry(arrear).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArrearExists(id))
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

        // POST: api/Arrears
        [ResponseType(typeof(Arrear))]
        public IHttpActionResult PostArrear(Arrear arrear)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Arrears.Add(arrear);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = arrear.ArrearId }, arrear);
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