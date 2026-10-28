"use client";

import { motion } from "framer-motion";

const skills = [
  "Python",
  "JavaScript",
  "SQL",
  "HTML/CSS",
  "R",
  "Flask",
  "Streamlit",
  "React Native",
  "Next.js",
  "Tailwind CSS",
  "TensorFlow",
  "YOLOv8",
  "scikit-learn",
  "SpaCy",
  "VADER",
  "TextBlob",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Pillow",
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "SQLite",
  "Tableau",
  "Power BI",
  "Git",
  "GitHub",
  "Render",
  "Firebase",
  "Supabase",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <h2 className="text-2xl font-bold whitespace-nowrap">Skills</h2>
          <div className="h-px bg-border flex-1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="font-mono text-sm text-text-secondary border border-border px-4 py-2 rounded-full hover:text-accent hover:border-accent/40 transition-colors duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
