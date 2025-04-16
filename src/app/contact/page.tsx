"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

 const ContactUs = () => {
  // ✅ Type the form ref correctly
  const form = useRef<HTMLFormElement | null>(null);

  // ✅ Type the event parameter
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Make sure form.current is not null before using it
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_4h4ld0d", // Replace with your actual service ID
        "template_yu7smcu", // Replace with your actual template ID
        form.current,
        "fY2PeEYQlVdIoM6iz" // Replace with your actual public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          console.log(result.text);
        },
        (error) => {
          alert("Failed to send message. Try again later.");
          console.error(error.text);
        }
      );

    e.currentTarget.reset(); // ✅ Resets the form safely
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black p-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white bg-opacity-5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-xl mt-14 dark:bg-gray-700"
      >
        <h2 className="text-4xl font-bold text-black text-center mb-6 dark:text-white ">
          Connect with Qluster
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Drop us a message or reach out via socials. We're here to help!
        </p>

        <div className="flex justify-center gap-8 mb-6 text-white text-2xl">
          <a
            href="https://instagram.com/qluster"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition text-blck"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:support@qluster.io"
            className="hover:text-blue-400 transition "
          >
            <FaEnvelope />
          </a>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          <input
            type="text"
            name="from_name"
            required
            className="w-full px-4 py-3 bg-transparent border border-black dark:border-white text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
          <input
            type="email"
            name="user_email"
            required
            className="w-full px-4 py-3 bg-transparent border border-black dark:border-white text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
          />
          <textarea
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 bg-transparent border border-black dark:border-white text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Your Message"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs
