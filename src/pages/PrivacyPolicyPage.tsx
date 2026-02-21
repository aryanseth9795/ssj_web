import { motion } from "framer-motion";
import { fadeUp } from "../components/ui";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-16 space-y-8">
      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-950 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm font-semibold text-amber-700">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </motion.div>

      <motion.div
        initial="hid"
        whileInView="shw"
        viewport={{ once: true }}
        variants={fadeUp}
        className="rounded-3xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(255,248,230,0.75),rgba(255,248,230,0.40))] p-6 sm:p-8 md:p-10 shadow-[0_18px_60px_-44px_rgba(139,105,20,0.25)] prose prose-amber max-w-none text-amber-900"
      >
        <div className="space-y-6">
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              1. Introduction
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              Welcome to Shri Sai Jewellers. This Privacy Policy outlines our
              practices regarding the collection, use, and disclosure of your
              information when you use our mobile application (the "Service")
              and tells you about your privacy rights and how the law protects
              you. By using the Service, you agree to the collection and use of
              information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              2. Information Collection and Use
            </h2>
            <p className="text-sm leading-relaxed font-medium mb-2">
              For a better experience while using our Service, we may require
              you to provide us with certain personally identifiable
              information, including but not limited to:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 font-medium">
              <li>Name and Contact Information (Phone Number)</li>
              <li>Device Information and App Usage Data</li>
              <li>Location Information (if granted permission)</li>
            </ul>
            <p className="text-sm leading-relaxed font-medium mt-2">
              The information that we request will be retained by us and used as
              described in this privacy policy to provide, maintain, and improve
              our services, as well as to facilitate order processing and
              customer support.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              3. Data Security
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              We value your trust in providing us your Personal Information,
              thus we are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet, or method of electronic storage is 100% secure and
              reliable, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              The app does use third-party services that may collect information
              used to identify you. These third-party service providers have
              their own Privacy Policies addressing how they use such
              information (e.g., Google Play Services, Firebase Cloud
              Messaging).
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              5. Data Deletion Rights
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              You have the right to request the deletion of your personal data
              that we have collected. To exercise this right, you can contact us
              using the information provided below. We will process your request
              in accordance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              6. Changes to This Privacy Policy
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. These changes are effective immediately after they are
              posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              7. Contact Us
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us.
            </p>
            <div className="mt-3 bg-white/30 p-4 rounded-xl border border-amber-200/50">
              <p className="text-sm font-bold text-amber-950 mb-1">
                Shri Sai Jewellers
              </p>
              <p className="text-sm font-medium text-amber-900">
                Sai Katra, Hanuman Ghat Gali, Jaunpur 222001
              </p>
              <p className="text-sm font-medium text-amber-900 mt-2">
                Phone: +91 9889466529 / +91 7880448085
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
