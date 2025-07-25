import React, { useState } from 'react'
import Container from '@components/layout/Container'
import { Card, CardContent, Button, Input, Label } from '@components/ui'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

/**
 * Contact page component with form and contact information
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    alert('Thank you! Your message has been sent.')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      content: "hello@materialbank.com",
      link: "mailto:hello@materialbank.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Address",
      content: "123 Design Street, New York, NY 10001",
      link: null
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Hours",
      content: "Mon-Fri 9AM-6PM EST",
      link: null
    }
  ]

  const faqs = [
    {
      question: "How long does sample delivery take?",
      answer: "We offer next-day delivery for orders placed before 6:30 PM CET. Samples are completely free for verified design professionals."
    },
    {
      question: "How do I become a verified professional?",
      answer: "Simply create an account and provide your professional credentials. Our team will verify your status within 24 hours."
    },
    {
      question: "Can I order materials directly through the platform?",
      answer: "Yes! Once you've specified materials, you can order directly from our partner brands through our integrated ordering system."
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section gradient-hero">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-1 mb-6">Get in Touch</h1>
            <p className="body-large text-gray-600">
              Have questions about Material Bank? We're here to help. Contact our team 
              and we'll get back to you within 24 hours.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <section className="section bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="heading-3 mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" required>Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" required>Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" required>Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" required>Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="text-brand-600 mt-1">
                          {info.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{info.title}</div>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-600 hover:text-brand-600 transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <div className="text-gray-600">{info.content}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Quick Answers</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-6">
                    View All FAQs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Support Options */}
      <section className="section bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-6">Other Ways to Reach Us</h2>
            <p className="body-base text-gray-600">
              Choose the support option that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Email Support</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get detailed help via email. We typically respond within 4 hours.
                </p>
                <Button variant="outline" size="sm">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Phone Support</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Speak directly with our support team during business hours.
                </p>
                <Button variant="outline" size="sm">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Live Chat</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get instant answers with our live chat support feature.
                </p>
                <Button variant="outline" size="sm">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default ContactPage
