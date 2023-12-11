
using AutoMapper;
using DAL.Data.Models.Filter;
using DAL;
using DAL.Data.Models.Product;
using Services.Interfaces.Filter;
using DAL.Data.Helpers;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using DAL.Data.Models.Exclusion;
using DAL.Repositories.Interfaces;
using DAL.Data.Models.PlaceCategory;
using DAL.Repositories.Interfaces.Filter;
using static Google.Apis.Requests.BatchRequest;

namespace Services.Classess.Filter
{
    public class FiltersService : IFiltersService
    {
        private readonly IMapper _mapper;
        private readonly AppEFContext _context;
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IFilterRepository _filterRepository;

        public FiltersService(IMapper mapper, AppEFContext context, IProductRepository productRepository, ICategoryRepository categoryRepository, IFilterRepository filterRepository)
        {
            _mapper = mapper;
            _context = context;
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _filterRepository = filterRepository;
        }
        public async Task<ServiceResponse> SearchAsync(ProductSearchVM model, string userEmail = "")
        {
            // Auto return errors from viewModel and other global errors

            long[] values = model.Values.ToArray();
            var filtersList = GetListFilters(_context);
            long[] filterValueSearchList = values; //масив ID вибраних фільтрів
            var query = _productRepository
                .Products
                .AsQueryable();
            foreach (var fName in filtersList)
            {
                int countFilter = 0; //Кількість співпадінь у даній групі фільтрів
                var predicate = PredicateBuilder.False<ProductEntity>();
                foreach (var fValue in fName.Children)
                {
                    for (int i = 0; i < filterValueSearchList.Length; i++)
                    {
                        var idV = fValue.Id;
                        if (filterValueSearchList[i] == idV)
                        {
                            predicate = predicate
                                .Or(p => p.Filters
                                    .Any(f => f.FilterValueId == idV));
                            countFilter++;
                        }
                    }
                }
                if (countFilter != 0)
                    query = query.Where(predicate);
            }


            //var res = await query
            //.Select(p => new
            //{
            //    Id = p.Id,
            //    Name = p.Name,
            //    Filters = p.Filters
            //        .Select(f => new
            //        {
            //            Filter = f.FilterName.Name,
            //            ValueId = f.FilterValueId,
            //            Value = f.FilterValue.Name
            //        })

            //})
            //    .ToListAsync();

            if (!string.IsNullOrWhiteSpace(model.CategoryName))
            {
                query = await GetByCategoryNameAsync(model.CategoryName, query);
            }

          

            // int count = query.Count();

            ExclusionVM searchModel = new ExclusionVM()
            {
                Page = model.Page,
                Sort = model.Sort,
                Search = model.Search,
                CountOnPage = model.CountOnPage,
                CategoryName = model.CategoryName
            };

            var result = PaginationAndSort(query, searchModel);
            //var payload = await ((IQueryable<ProductEntity>)result.Payload).Select(x => _mapper.Map<ProductViewModel>(x)).ToListAsync();

            var payload = await ((IQueryable<ProductEntity>)result.Payload).ToListAsync();
            var productList = _mapper.Map<List<ProductViewModel>>(payload, opt => opt.Items.Add("UserEmail", userEmail));


            var response = new ExclusionResultVM()
            {
                CurrentPage = result.CurrentPage,
                Pages = result.Pages,
                TotalElements = result.TotalElements,
                Payload = productList
            };

            return new ServiceResponse()
            {
                IsSuccess = true,
                Message = "Search by filter successed.",
                Payload = response
            };
        }

        private List<FNameViewModel> GetListFilters(AppEFContext context)
        {
            var queryName = from f in context.FilterNames.AsQueryable()
                            select f;
            var queryGroup = from g in context.FilterNameGroups.AsQueryable()
                             select g;

            //Отримуємо загальну множину значень
            var query = from u in queryName
                        join g in queryGroup on u.Id equals g.FilterNameId into ua
                        from aEmp in ua.DefaultIfEmpty()
                        select new
                        {
                            FNameId = u.Id,
                            FName = u.Name,
                            FValueId = aEmp != null ? aEmp.FilterValueId : 0,
                            FValue = aEmp != null ? aEmp.FilterValue.Name : null,
                        };

            //Групуємо по іменам і сортуємо по спаданню імен
            //var groupNames = (from f in query
            //                  group f by new
            //                  {
            //                      Id = f.FNameId,
            //                      Name = f.FName
            //                  } into g
            //                  //orderby g.Key.Name
            //                  select g).OrderByDescending(g => g.Key.Name).AsEnumerable();

            var groupNames = query
                        .AsEnumerable()
                        .GroupBy(f => new { Id = f.FNameId, Name = f.FName })
                        .Select(g => g)
                        .OrderByDescending(p => p.Key.Name);

            //По групах отримуємо
            var result = from fName in groupNames
                         select
                         new FNameViewModel
                         {
                             Id = fName.Key.Id,
                             Name = fName.Key.Name,
                             Children = (from v in fName
                                         group v by new FValueViewModel
                                         {
                                             Id = v.FValueId,
                                             Value = v.FValue
                                         } into g
                                         select g.Key)
                                         .OrderBy(l => l.Value).ToList()
                         };

            return result.ToList();
        }


        private ExclusionResultVM PaginationAndSort(IQueryable<ProductEntity> query, ExclusionVM model)
        {
            if (!String.IsNullOrWhiteSpace(model.Search))
                query = query
                    .Where(x => (x.Name + x.Description)
                        .ToLower()
                        .Contains(model.Search.ToLower()));

            int countProducts = query.Count();
            int countPages = (int)Math.Ceiling(countProducts / (double)model.CountOnPage);


            query = SortProducts(query, model.Sort);

            query = query
                .Skip((model.Page - 1) * model.CountOnPage)
                .Take(model.CountOnPage);

            var result = new ExclusionResultVM()
            {
                CurrentPage = model.Page,
                Pages = countPages,
                TotalElements = countProducts,
                Payload = query
            };

            return result;
        }

        private IQueryable<ProductEntity> SortProducts(IQueryable<ProductEntity> products, string sort)
        {
            switch (sort.ToLower())
            {
                case "price (high to low)":
                    return products.OrderByDescending(x => x.Price);
                case "price (low to high)":
                    return products.OrderBy(x => x.Price);
                default:
                    return products.OrderByDescending(x => x.Name);
            }
        }


       

        private async Task<IQueryable<ProductEntity>> GetByCategoryNameAsync(string categoryName, IQueryable<ProductEntity> query)
        {
            var resCategories = await _categoryRepository.Categories().Include(c => c.Childrens).ThenInclude(c => c.Childrens).FirstOrDefaultAsync(t => t.Name.Equals(categoryName));
            var resVM = _mapper.Map<CategoryListViewModel>(resCategories);

            if (resVM == null) return query;

            List<int> childIdList = GetListChildrenId(resVM); // ID категорій пошуку

            var predicate = PredicateBuilder.False<ProductEntity>();
            foreach (var id in childIdList)
            {
                predicate = predicate
                            .Or(p => p.CategoryId == id);
            }
            query = query.Where(predicate);

            return query;
        }


        private List<int> GetListChildrenId(CategoryListViewModel node)
        {
            List<int> res = new List<int>() { node.Data.Id };
            if (node.Children.Count == 0)
                return res;

            for (int i = 0; i < node.Children.Count; i++)
            {
                res.AddRange(GetListChildrenId(node.Children[i]));
            }
            return res;
        }

        public async Task<ServiceResponse> CreateAsync(ConnectionFilterVM model)
        {
            var res = await _filterRepository.ConnectFilterByProduct(model);

            if (res <= 0)
                return new ServiceResponse()
                {
                    IsSuccess = false,
                    Message = "Filters are`n created.",
                    Payload = null
                };


            return new ServiceResponse()
            {
                IsSuccess = true,
                Message = "Filters added successed.",
                Payload = null
            };
        }

        public async Task<ServiceResponse> GetFiltersIdListByProductIdAsync(int id)
        {
            var res = await _filterRepository.GetFiltersByProductIdAsync(id);

            return new ServiceResponse()
            {
                IsSuccess = true,
                Message = "Filters loaded successed.",
                Payload = res.Select(e=>e.FilterValueId)
            };
        }
    }
}
