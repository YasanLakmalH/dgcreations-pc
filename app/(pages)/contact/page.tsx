'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { sendEmailFromClient } from '@/mailService';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: "We'll get back to you as soon as possible.",
    });
    sendEmailFromClient(formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (

    <div className="min-h-screen pt-16">
      {/* Contact Header */}
      <section className=" py-16 bg-black text-white">
        <div className="container mx-auto px-4 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or services? Were here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground">
                      597/1/5,
                      <br />
                      Jayanthi Road,
                      <br />
                      Athurugiriya,
                      <br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">+94 (77) 534 9909</p>
                    <p className="text-muted-foreground">+94 (76) 322 6489</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">dgcreationslk@gmail.com</p>
                    <p className="text-muted-foreground">gimeshikakumari@gmail.com</p>

                  </div>
                </div>
              </div>
              {/* Google Map Embed */}
              <div className="mt-8">
                <div className="w-full relative" style={{ height: '250px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3631.0750542664264!2d79.9873889!3d6.8698889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTInMTEuNiJOIDc5wrA1OScxNC42IkU!5e1!3m2!1sen!2slk!4v1732268795988!5m2!1sen!2slk"
                    width="80%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>


              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <h2 className="text-2xl font-bold mb-4">Submit Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-11">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-12 text-lg" // Uniform height for input
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12 text-lg" // Uniform height for input
                  />
                </div>
                <div>
                  <Input
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="h-12 text-lg" // Uniform height for input
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="min-h-[150px] text-lg h-32" // Consistent height for textarea
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 w-full text-lg">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
