using System;

namespace NetCoreApp.Models.Sample
{
    public class SampleItem
    {
        private static readonly Random Random;

        static SampleItem()
        {
            Random = new Random((int)DateTime.Now.Ticks);
        }

        public SampleItem()
        {
            Date = DateTimeOffset.Now;
            Text = Guid.NewGuid().ToString();
            Number = Random.Next();
        }

        public DateTimeOffset Date { get; }
        public string Text { get; }
        public int Number { get; }
    }
}