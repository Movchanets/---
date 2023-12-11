using DAL.Data.Models.PlaceCategory;

namespace DAL.Helpers
{
    public static class CategoryHelper
    {
        public static IList<CategoryListViewModel> BuildTree(this IEnumerable<CategoryListViewModel> source)
        {
            var groups = source.GroupBy(i => i.Data.ParentId);

            var roots = groups.FirstOrDefault(g => g.Key.HasValue == false).ToList();

            if (roots.Count > 0)
            {
                var dict = groups.Where(g => g.Key.HasValue).ToDictionary(g => g.Key.Value, g => g.ToList());
                for (int i = 0; i < roots.Count; i++)
                    AddChildren(roots[i], dict);
            }

            return roots;
        }

        private static void AddChildren(CategoryListViewModel node, IDictionary<int, List<CategoryListViewModel>> source)
        {
            if (source.ContainsKey(node.Data.Id))
            {
                node.Children = source[node.Data.Id];
                for (int i = 0; i < node.Children.Count; i++)
                    AddChildren(node.Children[i], source);
            }
            else
            {
                node.Children = new List<CategoryListViewModel>();
            }
        }
    }
}
