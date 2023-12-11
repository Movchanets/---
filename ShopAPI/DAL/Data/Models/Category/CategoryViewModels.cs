namespace DAL.Data.Models.PlaceCategory
{
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int ProductCount { get; set; }
        public int? ParentId { get; set; }
    }

    public class CategoryCreateViewModel
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public int ParentID { get; set; }
    }

    public class CategoryUpdateViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int? ParentId { get; set; }
    }

    public class CategoryGroupViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Image { get; set; }

        public int? ParentId { get; set; }

        public List<CategoryGroupViewModel> Children { get; set; }
    }

    public class CategoryListViewModel
    {
        public int Key { get; set; }
        public string Label { get; set; }
        public CategoryViewModel Data { get; set; }
        public List<CategoryListViewModel> Children { get; set; }
    }
}
