//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ArrearsManagementSystemApis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Store
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Store()
        {
            this.Arrears = new HashSet<Arrear>();
        }
    
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public int UserId { get; set; }
        public Nullable<int> Col1 { get; set; }
        public string Col2 { get; set; }
        public string Col3 { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrear> Arrears { get; set; }
        public virtual User User { get; set; }
    }
}
