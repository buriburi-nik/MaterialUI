import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Stephanie Wexler",
      title: "Senior Associate",
      quote:
        "Material Bank has evolved into a source of inspiration for my projects. The breadth and depth of products available is incredible.",
      avatar:
        "https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/pics/jessica_havard.jpg",
    },
    {
      name: "Kati Kirby",
      title: "Interior Designer",
      quote:
        "I would be lost without Material Bank. It has improved my efficiency by allowing me to see the quality of materials before specifying.",
      avatar:
        "https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/pics/stephanie_wexler.jpg",
    },
    {
      name: "Jessica Havard",
      title: "Design Studio Manager",
      quote:
        "From saving time on sample ordering to collaborating with team members, Material Bank has transformed our workflow completely.",
      avatar:
        "https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/homepage/pics/kati_kirby.jpg",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container max-w-6xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl text-slate-800">
            See what our members
            <br />
            are saying.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Material Bank isn't just a sampling platform — it's a source of
            discovery and connection for a community of over 120,000 designers
            and architects.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 overflow-hidden bg-gray-200 rounded-full shadow-lg ring-4 ring-white">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Name and Title */}
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-slate-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-slate-500">{testimonial.title}</p>
              </div>

              {/* Quote */}
              <blockquote className="italic leading-relaxed text-center text-slate-600">
                "{testimonial.quote}"
              </blockquote>

              {/* Decorative quote marks */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <span className="text-lg font-bold text-white">"</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-slate-800">
              Join thousands of design professionals
            </h3>
            <p className="mb-6 text-slate-600">
              Discover why Material Bank is the preferred choice for architects
              and designers worldwide.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="px-8 py-3 font-semibold text-white transition-opacity rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                Start Free Today
              </button>
              <button className="px-8 py-3 font-semibold transition-colors border-2 rounded-full border-slate-300 text-slate-700 hover:bg-slate-50">
                See More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
