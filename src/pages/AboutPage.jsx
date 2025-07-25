import React from 'react'
import Container from '@components/layout/Container'
import { Card, CardContent, Button } from '@components/ui'
import { Users, Target, Award, Heart } from 'lucide-react'

/**
 * About page component
 */
const AboutPage = () => {
  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer First",
      description: "We put our users at the center of everything we do, ensuring their success is our success."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation",
      description: "We continuously innovate to provide the best possible experience for design professionals."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality",
      description: "We maintain the highest standards in everything from our platform to our partnerships."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Sustainability",
      description: "We're committed to promoting sustainable practices in the design and construction industry."
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former architect with 15+ years in the design industry",
      image: null
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Technology leader with expertise in scalable platforms",
      image: null
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "UX expert passionate about user-centered design",
      image: null
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section gradient-hero">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">About Material Bank</h1>
            <p className="body-large text-gray-600 mb-8">
              We're revolutionizing how design professionals discover, sample, and specify materials. 
              Our mission is to make the material sourcing process faster, more sustainable, and more efficient.
            </p>
            <Button variant="primary" size="lg">
              Join Our Mission
            </Button>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="section bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Material Bank was founded in 2018 by a team of architects and designers who experienced 
                  firsthand the frustrations of traditional material sourcing. Waiting weeks for samples, 
                  dealing with multiple vendors, and lacking access to comprehensive material libraries 
                  were daily challenges.
                </p>
                <p>
                  We envisioned a world where design professionals could access any material sample 
                  within 24 hours, discover new products through intelligent search, and make more 
                  informed decisions with comprehensive technical data.
                </p>
                <p>
                  Today, we serve over 100,000 design professionals worldwide and partner with 500+ 
                  leading brands to make this vision a reality.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">Company Photo/Video</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="section bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Our Values</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-brand-600">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Meet Our Team</h2>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              We're a diverse team of designers, engineers, and industry experts passionate about 
              transforming the material sourcing experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-brand-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-brand-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-6">Join Our Growing Community</h2>
            <p className="body-large opacity-90 mb-8">
              Be part of the revolution that's transforming how design professionals work with materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Create Account
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-600">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default AboutPage
