using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Classes
{
    public class GenericRepository<TEntity, T> : IGenericRepository<TEntity, T> where TEntity : class, IEntity<T>
    {
        private readonly AppEFContext _dbContext;

        protected GenericRepository(AppEFContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateAsync(TEntity entity)
        {
            entity.DateCreated = DateTime.Now.ToUniversalTime();
            
            await _dbContext.Set<TEntity>().AddAsync(entity);
            var result = await _dbContext.SaveChangesAsync();
            return result != 0;
        }

        public async Task<bool> DeleteAsync(T id)
        {
            var entity = await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id.Equals(id));
            if (entity == null) return false;

            entity.IsDelete = true;
            return await UpdateAsync(entity);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().Where(e => e.IsDelete == false);
        }

        public async Task<TEntity> GetByIdAsync(T id)
        {
            return await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id.Equals(id));
        }

        public async Task<TEntity> GetByNameAsync(string name)
        {
            return await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Name.Equals(name));
        }

        public async Task<bool> UpdateAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            var result = await _dbContext.SaveChangesAsync();
            return result != 0;
        }
    }
}
