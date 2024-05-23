using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArrearsManagementSystemApis.Models
{
    public class SellerClass
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string MoNumber { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public  string StoreName { get; set; }
    }
}