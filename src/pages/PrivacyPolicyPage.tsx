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
              <strong>
                We do not collect, store, or process any personal information.
              </strong>{" "}
              Our application is designed to function without requiring you to
              provide personally identifiable information such as your name,
              phone number, email address, or location.
            </p>
            <p className="text-sm leading-relaxed font-medium mt-2">
              The only permission our app requests is for{" "}
              <strong>Push Notifications</strong>. This permission is solely
              used to send you important updates, such as changes in live
              gold/silver rates, new product arrivals, or store announcements.
              We do not use this permission to track you or collect background
              data.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              3. Data Security
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              Because our application does not collect any personal information,
              there is no personal user data stored on our servers that could be
              compromised. The Push Notification service relies on anonymous
              device or push tokens handled securely by third-party notification
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              The app relies on trusted third-party services (such as Expo and
              Firebase Cloud Messaging) to deliver Push Notifications. These
              services may collect anonymous device identifiers necessary to
              route the notifications to your device. They have their own
              Privacy Policies addressing how they handle such infrastructure
              data.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 mb-3">
              5. Data Deletion Rights
            </h2>
            <p className="text-sm leading-relaxed font-medium">
              Because our app does not require account creation and does not
              collect any personal data, we do not store personal records linked
              to you. Therefore, there is no personal data to delete upon
              request. If you wish to stop receiving push notifications, you can
              simply revoke the notification permission in your device's
              settings or uninstall the app.
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
