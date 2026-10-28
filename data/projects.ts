export interface Project {
  name: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    name: "PomodoroPet",
    description:
      "Focus timer with a virtual pet and phone detection to keep you productive.",
    tags: ["Flask", "TensorFlow.js", "Python"],
    github: "https://github.com/pragati-lad/PomodoroPet",
  },
  {
    name: "wordmirror",
    description:
      "Vocabulary app with AI-powered sentences for learning and retention.",
    tags: ["Flask", "React Native", "AI"],
    github: "https://github.com/pragati-lad/wordmirror",
  },
  {
    name: "Mumbai-local-bot",
    description:
      "Chatbot for Mumbai local train routes using natural language processing.",
    tags: ["Streamlit", "SpaCy", "NLP"],
    github: "https://github.com/pragati-lad/Mumbai-local-bot",
  },
];
