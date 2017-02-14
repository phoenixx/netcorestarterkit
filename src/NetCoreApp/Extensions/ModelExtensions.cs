using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace NetCoreApp.Extensions
{
    /// <summary>
    /// Helper class for serializing models passed to view as Json
    /// </summary>
    public static class ModelExtensions
    {
        private static readonly JsonSerializerSettings Settings;

        static ModelExtensions()
        {
            Settings = new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }
        /// <summary>
        /// Plain / default conversion
        /// </summary>
        /// <param name="obj">The object to serialize</param>
        /// <returns>The object as a json string</returns>
        public static string ToJson(this object obj)
        {
            try
            {
                return JsonConvert.SerializeObject(obj, Settings);
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
    }
}