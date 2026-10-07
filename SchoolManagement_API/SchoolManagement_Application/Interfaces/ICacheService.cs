namespace SchoolManagement_Application.Interfaces
{
    public interface ICacheService
    {
        void Set<T>(
            string key,
            T value,
            int durationInMinutes = 10);

        T? Get<T>(string key);

        void Remove(string key);

        void RemoveByPrefix(string prefix);
    }
}