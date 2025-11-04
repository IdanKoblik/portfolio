export interface Experience {
  title: string;
  company: string;
  type: 'Work' | 'Volunteer';
  startDate: string;
  endDate: string | null;
  description: string;
}

export const portfolioConfig = {
  name: 'Idan Koblik',
  title: 'Backend Developer & Devops',
  bio: 'Backend developer with 3 years of experience in software development. Skilled in Linux and system architecture, with a strong focus on designing scalable and efficient backend systems.',
  experience: '3 years',
  experiences: [
    {
      title: 'Gaming, Web & Networking Industry Development',
      company: 'Apartium development',
      type: 'Volunteer',
      startDate: '2023-03',
      endDate: null,
      description: 'Worked with development teams in gaming and web industries.',
    },
    {
      title: 'Self-Maintained Projects',
      company: 'Independent Developer',
      type: '',
      startDate: '2022-01',
      endDate: null,
      description: 'Built and maintained personal backend projects with DevOps practices.',
    },
  ] as Experience[],
  skills: [
    'Java',
    'Kotlin',
    'Go',
    'C/C++',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'InfluxDB',
    'GraphiteDB',
    'PrometheusDB',
    'Docker',
    'Git',
    'REST APIs',
  ],

  github: {
    username: 'IdanKoblik',
    portfolioTag: 'portfolio',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/idan-k/',
    discord: 'https://discord.com/users/',
    email: 'me@idank.dev',
    github: 'https://github.com/IdanKoblik',
  },

  cv: [
    {
      language: 'IdanKoblik',
      url: '/cv/cv-en.pdf',
      flag: '📓',
    },
  ],
};
