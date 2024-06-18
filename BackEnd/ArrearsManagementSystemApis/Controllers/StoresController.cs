using System;
using System.Collections;
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
    [RoutePrefix("api/Store")]
    public class StoresController : ApiController
    {
        private ArrearsDbEntities db = new ArrearsDbEntities();

        // GET: api/Stores
        public IQueryable<Store> GetStores()
        {
            return db.Stores;
        }

        // GET: api/Stores/5
        [ResponseType(typeof(Store))]
        public IHttpActionResult GetStore(int id)
        {
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return NotFound();
            }

            return Ok(store);
        }

        // PUT: api/Stores/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStore(int id, Store store)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != store.StoreId)
            {
                return BadRequest();
            }

            db.Entry(store).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
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


        // POST: api/Stores
        //  [ResponseType(typeof(Store))]
        [HttpGet]
        [Route("search")]
        public List<String> SearchStore( String keyword)
        {

            //List<String> ListStores   = db.Stores.Find(store);
            List<string> ListStores = new List<string>();
            var resultContact = db.Stores
           .Where(stores => stores.StoreName.StartsWith(keyword))
           .Select(store => new
           {
               store.StoreName,
           })
           .ToList();
            if (resultContact.Count == 0)
            {
                ListStores.Add("Not Found");
                return ListStores;
            }
            else
            {
                foreach (var item in resultContact)
                {
                    ListStores.Add(item.StoreName);
                }
            }

            return ListStores;
        }

        // DELETE: api/Stores/5
        [ResponseType(typeof(Store))]
        public IHttpActionResult DeleteStore(int id)
        {
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return NotFound();
            }

            db.Stores.Remove(store);
            db.SaveChanges();

            return Ok(store);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StoreExists(int id)
        {
            return db.Stores.Count(e => e.StoreId == id) > 0;
        }
    }
}