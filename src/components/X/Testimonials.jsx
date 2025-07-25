import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Stephanie Wexler",
      title: "Senior Associate",
      quote:
        "Material Bank has evolved into a source of inspiration for my projects. The breadth and depth of products available is incredible.",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fb205f0e8ef4e4b3dbb4ae7d5f483e9f6%2Ff970178c98524fdb97d05e75a6606468?format=webp&width=800",
    },
    {
      name: "Kati Kirby",
      title: "Interior Designer",
      quote:
        "I would be lost without Material Bank. It has improved my efficiency by allowing me to see the quality of materials before specifying.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Jessica Havard",
      title: "Design Studio Manager",
      quote:
        "From saving time on sample ordering to collaborating with team members, Material Bank has transformed our workflow completely.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            See what our members
            <br />
            are saying.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Material Bank isn't just a sampling platform — it's a source of
            discovery and connection for a community of over 120,000 designers
            and architects.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-lg">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name and Title */}
              <div className="text-center mb-6">
                <h3 className="font-semibold text-slate-800 text-lg">
                  {testimonial.name}
                </h3>
                <p className="text-slate-500 text-sm">{testimonial.title}</p>
              </div>

              {/* Quote */}
              <blockquote className="text-slate-600 text-center italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Decorative quote marks */}
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">"</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Join thousands of design professionals
            </h3>
            <p className="text-slate-600 mb-6">
              Discover why Material Bank is the preferred choice for architects
              and designers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity">
                Start Free Today
              </button>
              <button className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-colors">
                See More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
