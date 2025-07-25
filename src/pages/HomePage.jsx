import React from 'react'
import HeroSection from '@components/features/HeroSection'
import FeatureCard from '@components/features/FeatureCard'
import BrandCarousel from '@components/features/BrandCarousel'
import TestimonialCard from '@components/features/TestimonialCard'
import Container from '@components/layout/Container'
import { Button } from '@components/ui'
import { Search, Truck, CheckCircle, Users, Award, Globe } from 'lucide-react'

/**
 * Homepage component showcasing all the main features and content
 */
const HomePage = () => {
  // Feature cards data
  const features = [
    {
      title: "Instant Material Search",
      description: "Search through thousands of materials from hundreds of brands in seconds. Find exactly what you need with our advanced filtering system.",
      icon: <Search />,
      features: [
        "50,000+ materials available",
        "Advanced search filters",
        "Real-time availability",
        "Technical specifications"
      ],
      action: {
        label: "Start Searching",
        variant: "primary",
        onClick: () => console.log('Search clicked')
      }
    },
    {
      title: "Fast Sample Delivery",
      description: "Order samples by 6:30 PM CET and receive them the next day, completely free for design professionals.",
      icon: <Truck />,
      features: [
        "Next-day delivery",
        "Free for professionals",
        "Worldwide shipping",
        "Eco-friendly packaging"
      ],
      action: {
        label: "Order Samples",
        variant: "outline",
        onClick: () => console.log('Samples clicked')
      }
    },
    {
      title: "Quality Assurance",
      description: "Every material is verified for quality and authenticity. Get detailed specifications and technical data for informed decisions.",
      icon: <CheckCircle />,
      features: [
        "Quality verified materials",
        "Detailed specifications",
        "Technical documentation",
        "Sustainability ratings"
      ],
      action: {
        label: "Learn More",
        variant: "outline",
        onClick: () => console.log('Quality clicked')
      }
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      quote: "Material Bank has completely transformed our design process. The speed of sample delivery and the quality of materials is exceptional.",
      author: {
        name: "Sarah Chen",
        title: "Senior Interior Designer",
        company: "Studio Modern",
        badge: "Verified Professional"
      },
      rating: 5
    },
    {
      quote: "As an architect, having access to this vast library of materials with next-day samples is invaluable for client presentations.",
      author: {
        name: "Michael Rodriguez",
        title: "Principal Architect",
        company: "Rodriguez Associates",
        badge: "Top Contributor"
      },
      rating: 5
    },
    {
      quote: "The platform's ease of use and comprehensive material database has saved us countless hours in sourcing for our projects.",
      author: {
        name: "Emily Watson",
        title: "Creative Director",
        company: "Watson Design Co.",
        badge: "Verified Professional"
      },
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Search. Sample. Specify."
        subtitle="🎯 For Design Professionals"
        description="The fastest and most sustainable way to search and sample materials from hundreds of leading brands. Join thousands of architects and designers who trust Material Bank."
        variant="gradient"
        actions={[
          {
            label: "Start Free Account",
            variant: "primary",
            size: "lg",
            onClick: () => console.log('Sign up clicked')
          },
          {
            label: "Watch Demo",
            variant: "outline",
            size: "lg",
            onClick: () => console.log('Demo clicked')
          }
        ]}
      />

      {/* Features Section */}
      <section className="section bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Why Choose Material Bank?</h2>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Streamline your material sourcing process with our comprehensive platform designed specifically for design professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                variant={index === 1 ? "highlighted" : "default"}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* How It Works Section */}
      <section className="section bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">How It Works</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and revolutionize your material sourcing process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Search & Discover</h3>
              <p className="text-gray-600">
                Browse our extensive library of materials using advanced filters to find exactly what you need for your project.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Order Samples</h3>
              <p className="text-gray-600">
                Request samples with one click. Order by 6:30 PM CET and receive them the next day, completely free.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Specify & Order</h3>
              <p className="text-gray-600">
                Make informed decisions with detailed specifications and order materials directly from our partner brands.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">What Our Users Say</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied design professionals who trust Material Bank for their projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                variant={index === 1 ? "featured" : "default"}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="section bg-brand-600 text-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Trusted Worldwide</h2>
            <p className="body-large opacity-90 max-w-2xl mx-auto">
              Join the global community of design professionals who rely on Material Bank every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="opacity-80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="opacity-80">Partner Brands</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="opacity-80">Countries</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="opacity-80">Uptime</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to Get Started?</h2>
            <p className="body-large text-gray-600 mb-8">
              Join thousands of design professionals who are already transforming their workflow with Material Bank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Create Free Account
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
