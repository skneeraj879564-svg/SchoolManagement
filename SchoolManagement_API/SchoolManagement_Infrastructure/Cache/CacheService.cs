using Microsoft.Extensions.Caching.Memory;
using SchoolManagement_Application.Interfaces;

namespace SchoolManagement_Infrastructure.Cache
{
    public class CacheService : ICacheService
    {
        private readonly IMemoryCache _cache;

        private readonly HashSet<string> _cacheKeys = new();

        public CacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public void Set<T>(
            string key,
            T value,
            int durationInMinutes = 10)
        {
            _cache.Set(
                key,
                value,
                TimeSpan.FromMinutes(durationInMinutes));

            _cacheKeys.Add(key);
        }

        public T? Get<T>(string key)
        {
            _cache.TryGetValue(key, out T? value);

            return value;
        }

        public void Remove(string key)
        {
            _cache.Remove(key);

            _cacheKeys.Remove(key);
        }

        public void RemoveByPrefix(string prefix)
        {
            var keysToRemove = _cacheKeys
                .Where(x => x.StartsWith(prefix))
                .ToList();

            foreach (var key in keysToRemove)
            {
                _cache.Remove(key);
                _cacheKeys.Remove(key);
            }
        }
    }
}