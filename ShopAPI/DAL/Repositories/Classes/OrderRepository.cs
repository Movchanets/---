using DAL.Data.Models.Exclusion;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes;

public class OrderRepository : GenericRepository<OrderEntity, int>, IOrderRepository
{
    private readonly AppEFContext _dbContext;

    public OrderRepository(AppEFContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }


    public IQueryable<OrderEntity> Orders()
    {
        return GetAll()
        .Include(c => c.User)
            .AsNoTracking();
    }

    public ExclusionResultVM GetByPagination(ExclusionVM model)
    {
        var orders = Orders();

        if (!String.IsNullOrEmpty(model.Search))
            orders = orders
                .Where(x => (x.Name + x.User.UserName  )
                    .ToLower()
                    .Contains(model.Search.ToLower()));

        int countProducts = orders.Count();
        int countPages = (int)Math.Ceiling(countProducts / (double)model.CountOnPage);

        orders = SortOrders(orders, model.Sort);

        orders = orders
            .Skip((model.Page - 1) * model.CountOnPage).Include(o=> o.User).Include(o=>o.Details).ThenInclude(d => d.Product)
            .Take(model.CountOnPage);

        var result = new ExclusionResultVM()
        {
            CurrentPage = model.Page,
            Pages = countPages,
            TotalElements = countProducts,
            Payload = orders
        };

        return result;
    }

    public ExclusionResultVM UserOrdersGetByPagination(ExclusionVM model, string userEmail = "")
    {
        var orders = Orders();

        if (!String.IsNullOrEmpty(model.Search))
            orders = orders.Include(o=> o.User).Where(x=>x.User.Email == userEmail)
                .Where(x => (x.Name + x.User.UserName   )
                    .ToLower()
                    .Contains(model.Search.ToLower()));

        int countProducts = orders.Count();
        int countPages = (int)Math.Ceiling(countProducts / (double)model.CountOnPage);

        orders = SortOrders(orders.Include(o=> o.User).Where(x=>x.User.Email == userEmail), model.Sort);

        orders = orders
            .Skip((model.Page - 1) * model.CountOnPage).Include(o=>o.Details).ThenInclude(d => d.Product)
            .Take(model.CountOnPage);

        var result = new ExclusionResultVM()
        {
            CurrentPage = model.Page,
            Pages = countPages,
            TotalElements = countProducts,
            Payload = orders
        };

        return result;
    }

    private IQueryable<OrderEntity> SortOrders(IQueryable<OrderEntity> orders, string sort)
    {
        switch (sort.ToLower())
        {
            case "title":
                return orders.OrderBy(x => x.Name);
            case "userid":
                return orders.OrderBy(x => x.UserId);
            case "price":
                return orders.OrderBy(x => x.TotalPrice);
            default:
                return orders.OrderByDescending(x => x.DateCreated);
        }
    }
}