"use client";

import { motion } from "framer-motion";
import { PaintBucket, GraduationCap, Megaphone, Car, MessageCircle } from "lucide-react";

export default function SecondaryServices() {
  const services = [
    {
      icon: PaintBucket,
      number: "01",
      title: "Interior & Decor",
      description: "Professional screeding, premium painting, and POP installations. We transform your spaces with precision craftsmanship and artistic excellence, ensuring every detail reflects quality and style.",
    },
    {
      icon: GraduationCap,
      number: "02",
      title: "Human Capital Development",
      description: "Comprehensive skill acquisition programs and development schemes. We empower your workforce with training, certification, and corporate development initiatives that drive organizational success.",
    },
    {
      icon: Megaphone,
      number: "03",
      title: "Digital Marketing",
      description: "Strategic digital marketing and business promotions that amplify your brand's voice. From social media campaigns to SEO optimization, we help you reach and engage your target audience effectively.",
    },
    {
      icon: Car,
      number: "04",
      title: "Auto Mobile Dealership",
      description: "Your trusted partner for buying and selling cars. We offer a wide range of verified automobiles, ensuring you get the best value and performance for your investment.",
    },
  ];

  return (
    <section className="pt-16 pb-32 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <span className="inline-block text-sm font-bold text-secondary uppercase tracking-wider mb-3">
              Extended Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Beyond the Basics
            </h2>
            <p className="text-lg text-white/80 max-w-2xl">
              Comprehensive services to meet all your business needs under one roof.
            </p>
          </motion.div>

          {/* Services List */}
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Number and Icon */}
                  <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                    <div className="text-5xl md:text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                      {service.number}
                    </div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg">
                      {service.description}
                    </p>

                    <a
                      href={`https://wa.me/2349059456831?text=Hi, I am interested in your ${service.title} service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 mt-6 rounded-full bg-white/5 hover:bg-secondary border border-white/10 hover:border-secondary text-white text-sm font-semibold transition-all duration-300 group-hover:shadow-lg"
                    >
                      <span>Speak With an Agent</span>
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Decorative Divider */}
                {index < services.length - 1 && (
                  <div className="mt-12 flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-[#050505]"
          ></path>
        </svg>
      </div>
    </section>
  );
}
