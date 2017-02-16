using System;

namespace NetCoreApp.Models.Sample
{
    public class SampleItem
    {
        public SampleItem()
        {
            var rng = new Random();

            Date = DateTimeOffset.Now;
            Text = Guid.NewGuid().ToString("N");
            Number = rng.Next(1, 10000);
        }

        public DateTimeOffset Date { get; }
        public string Text { get; }
        public int Number { get; }
    }
}