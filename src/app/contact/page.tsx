"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    console.log({ name, email, subject, message });

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer:
        "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line.",
    },
    {
      question: "What information should I include in my message?",
      answer:
        "Please include your name, contact information, and as much detail about your inquiry as possible to help us assist you better.",
    },
    {
      question: "Do you have office hours for in-person meetings?",
      answer:
        "Yes, our office is open Monday through Friday from 9am to 5pm. We recommend scheduling an appointment before visiting.",
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      title: "Email Us",
      value: "info@qluster.com",
      href: "mailto:info@qluster.com",
      color: "from-[#37113c] to-[#611f69]",
    },
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      title: "Call Us",
      value: "+1 (234) 567-890",
      subtext: "Mon-Fri, 9am-5pm EST",
      href: "tel:+1234567890",
      color: "from-[#47214c] to-[#712f79]",
    },
    {
      icon: <MapPin className="h-5 w-5 text-white" />,
      title: "Visit Us",
      value: "123 Innovation Street",
      subtext: "Tech Hub, CA 94103",
      href: "#map",
      color: "from-[#57315c] to-[#813f89]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] pt-30">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[url('/grid-pattern.svg')] opacity-5 -z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-bl-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-tr-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#37113c] to-[#611f69] blur-xl opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-r from-[#37113c] to-[#611f69] p-4 rounded-2xl">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#37113c] to-[#611f69] bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out
            using any of the methods below.
          </p>
        </motion.div>

        {/* Contact Methods Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <a
              href={method.href}
              key={index}
              className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#37113c]/80 to-[#611f69]/80 backdrop-blur group-hover:opacity-90"></div>
              <div className="relative p-6 flex flex-col items-center text-center text-white h-full">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${method.color} mb-4 shadow-lg`}
                >
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="font-medium mb-1">{method.value}</p>
                {method.subtext && (
                  <p className="text-xs opacity-80">{method.subtext}</p>
                )}
                <div className="mt-auto pt-4">
                  <div className="inline-flex items-center text-xs font-medium">
                    <span className="mr-2 opacity-80">Learn more</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-purple-200 dark:border-purple-900/50 shadow-xl rounded-xl backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
              <div className="h-1 bg-gradient-to-r from-[#37113c] to-[#611f69]"></div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-gradient-to-r from-[#37113c] to-[#611f69] p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#611f69] dark:text-purple-300">
                    Send us a message
                  </h2>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-8 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700 dark:text-green-400">
                      Thank you for reaching out. We'll get back to you as soon
                      as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20 rounded-lg h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20 rounded-lg h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20 rounded-lg h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full rounded-lg border border-purple-200 dark:border-purple-900/50 bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69]/20 focus-visible:ring-offset-2"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white rounded-lg font-medium"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="space-y-6">
              <Card className="border-purple-200 dark:border-purple-900/50 overflow-hidden rounded-xl shadow-lg backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#611f69] dark:text-purple-300 mb-6 flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Business Hours
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-purple-100 dark:border-purple-900/30 pb-3">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-[#611f69] dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                        9:00 AM - 5:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-purple-100 dark:border-purple-900/30 pb-3">
                      <span className="font-medium">Saturday</span>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-[#611f69] dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                        10:00 AM - 2:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sunday</span>
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm">
                        Closed
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-purple-100 dark:border-purple-900/30 flex items-center gap-2 text-sm text-[#611f69] dark:text-purple-300">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span>All times are in Eastern Time (ET)</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 dark:border-purple-900/50 overflow-hidden rounded-xl shadow-lg backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#611f69] dark:text-purple-300 mb-6">
                    Connect With Us
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="group">
                      <div className="border border-purple-200 dark:border-purple-900/50 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24 transition-all duration-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 hover:border-[#611f69]">
                        <Facebook className="h-6 w-6 text-[#611f69] dark:text-purple-300 mb-2" />
                        <span className="text-sm font-medium text-[#611f69] dark:text-purple-300">
                          Facebook
                        </span>
                      </div>
                    </a>
                    <a href="#" className="group">
                      <div className="border border-purple-200 dark:border-purple-900/50 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24 transition-all duration-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 hover:border-[#611f69]">
                        <X className="h-6 w-6 text-[#611f69] dark:text-purple-300 mb-2" />
                        <span className="text-sm font-medium text-[#611f69] dark:text-purple-300">
                          Twitter
                        </span>
                      </div>
                    </a>
                    <a href="#" className="group">
                      <div className="border border-purple-200 dark:border-purple-900/50 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24 transition-all duration-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 hover:border-[#611f69]">
                        <Instagram className="h-6 w-6 text-[#611f69] dark:text-purple-300 mb-2" />
                        <span className="text-sm font-medium text-[#611f69] dark:text-purple-300">
                          Instagram
                        </span>
                      </div>
                    </a>
                    <a href="#" className="group">
                      <div className="border border-purple-200 dark:border-purple-900/50 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24 transition-all duration-300 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 hover:border-[#611f69]">
                        <Linkedin className="h-6 w-6 text-[#611f69] dark:text-purple-300 mb-2" />
                        <span className="text-sm font-medium text-[#611f69] dark:text-purple-300">
                          LinkedIn
                        </span>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
          id="map"
        >
          <Card className="border-purple-200 dark:border-purple-900/50 overflow-hidden rounded-xl shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15657.889824898237!2d75.882080832171!3d11.152612476945082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6502f41ef4e8b%3A0xf4c653a7548cccd!2sKinfra%20Techno%20Industrial%20Park!5e0!3m2!1sen!2sin!4v1745393085687!5m2!1sen!2sin"
                  width="50%"
                  height="50%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full rounded-xl"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#611f69] dark:text-purple-300 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#37113c] to-[#611f69] mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Find quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`border-purple-200 dark:border-purple-900/50 overflow-hidden transition-all duration-200 rounded-xl ${
                  expandedFaq === index ? "shadow-lg" : ""
                }`}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full p-6 text-left"
                  >
                    <span className="font-medium text-[#611f69] dark:text-purple-300">
                      {faq.question}
                    </span>
                    <div
                      className={`p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 transition-transform duration-200 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      {expandedFaq === index ? (
                        <ChevronUp className="h-4 w-4 text-[#611f69] dark:text-purple-300" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#611f69] dark:text-purple-300" />
                      )}
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 text-muted-foreground border-t border-purple-100 dark:border-purple-900/30"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mb-8"
        >
          <Card className="border-purple-200 dark:border-purple-900/50 overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a0d1e]">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-[#611f69] dark:text-purple-300 mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out today and discover how we can help transform your
                  business.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button
                    className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white rounded-lg px-8 py-2 h-12"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#611f69] text-[#611f69] hover:bg-purple-50 dark:border-purple-300 dark:text-purple-300 dark:hover:bg-purple-900/20 rounded-lg px-8 py-2 h-12"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
