using System;
using NUnit.Framework;

namespace Cuckoo.Spa.Tests
{
    public abstract class TestContext<T> where T : new()
    {
        public T Target;

        [SetUp]
        public void Setup()
        {
            Context();
            Because();
        }

        public virtual void Context()
        {
            Target = new T();
        }

        public abstract void Because();
    }
}
