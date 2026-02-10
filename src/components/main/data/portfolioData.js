// Portfolio Data - All data arrays for the portfolio sections

// Skills data organized by category
export const fullStackSkills = [
    { name: 'Next.JS', img: '/skills/nextjs.png' },
    { name: 'React', img: '/skills/reactjs.png' },
    { name: 'Tailwind', img: '/skills/tailwind.png' },
    { name: 'Django', img: '/skills/django.png' },
    { name: 'FastAPI', img: '/skills/fastapi.png' },
    { name: 'Flask', img: '/skills/flask.png' },
    { name: 'PostgreSQL', img: '/skills/postgresql.png' },
    { name: 'MongoDB', img: '/skills/mongodb.png' },
    { name: 'SQLite3', img: '/skills/sqlite3.png' },
    { name: 'Express', img: '/skills/express.png' },
];

export const devToolsSkills = [
    { name: 'Git', img: '/skills/git.png' },
    { name: 'GitHub', img: '/skills/github.png' },
    { name: 'Jupyter', img: '/skills/jupyter.png' },
    { name: 'Docker', img: '/skills/docker.png' },
    { name: 'VS Code', img: '/skills/vscode.png' },
    { name: 'Postman', img: '/skills/postman.png' },
    { name: 'Digital Ocean', img: '/skills/digital_ocean.png' },
    { name: 'Arch Linux', img: '/skills/linux.png' },
    { name: 'NGINX', img: '/skills/nginx.png' },
    { name: 'Vite.JS', img: '/skills/vitejs.png' },
    { name: 'Vercel', img: '/skills/vercel.png' },
];

export const aiMlSkills = [
    { name: 'TensorFlow', img: '/skills/tensorflow.png' },
    { name: 'PyTorch', img: '/skills/pytorch.png' },
    { name: 'OpenCV', img: '/skills/opencv.png' },
    { name: 'Keras', img: '/skills/keras.png' },
    { name: 'Pandas', img: '/skills/pandas.png' },
    { name: 'NumPy', img: '/skills/numpy.png' },
    { name: 'Scikit-learn', img: '/skills/sklearn.png' },
];

// Projects data with images
export const projects = [
    {
        name: 'Disaster Aggregation Software',
        desc: 'Aggregates disaster data from social media using LLMs and image captioning',
        techStack: ['GPT-2', 'Vicuna AI', 'BLIP-ICM'],
        github: 'https://github.com/TitanNatesan/BLIP-ICM',
        live: null,
        image: '/projects/disaster.png',
    },
    {
        name: 'Medical Image Report Generation',
        desc: 'Generates reports for bone fracture X-ray scans using image analysis',
        techStack: ['BERT', 'PyTorch', 'OpenCV'],
        github: 'https://github.com/TitanNatesan/Medical-Image-Report',
        live: null,
        image: '/projects/medical.png',
    },
    {
        name: 'E-Commerce Web Site',
        desc: 'Full-stack e-commerce platform for a clothing company',
        techStack: ['DRF', 'Next.js', 'PostgreSQL', 'Razorpay'],
        github: 'https://github.com/TitanNatesan/Aslam-Garments',
        live: 'https://renz-trending.titandev.me/',
        image: '/projects/renz.png',
    },
    {
        name: 'Herbal Plant Classification',
        desc: 'AI-powered classification of Indian herbal plants',
        techStack: ['TensorFlow', 'Streamlit'],
        github: 'https://github.com/TitanNatesan/HerbalPlantClassification',
        live: 'https://herbalplantclassification.streamlit.app/',
        image: '/projects/herbal.png',
    },
    {
        name: 'CBCS Enrollment System',
        desc: 'Web app enabling college students to select courses for academics',
        techStack: ['DRF', 'Next.js', 'TypeScript'],
        github: 'https://github.com/TitanNatesan/CBCS',
        live: null,
        image: '/projects/cbcs.png',
    },
    {
        name: 'LMS Platform',
        desc: 'Platform for teachers to upload course videos for enrolled students',
        techStack: ['Django', 'React.js'],
        github: 'https://github.com/TitanNatesan/EduConnect',
        live: null,
        image: '/projects/lms.png',
    },
    {
        name: 'E-commerce Mobile App',
        desc: 'Mobile application for e-commerce with full backend integration',
        techStack: ['React Native', 'Django'],
        github: 'https://github.com/TitanNatesan/Ecom',
        live: null,
        image: '/projects/ecom.png',
    },
];

// Timeline data for Resume section
export const timeline = [
    {
        period: '2020 - 2022',
        title: 'High School',
        subtitle: 'Universal Matriculation Higher Secondary School',
        side: 'left',
    },
    {
        period: "Sep'2022 - Present",
        title: 'BE in Computer Science',
        subtitle: 'Karpagam Academy of Higher Education',
        side: 'right',
    },
    {
        period: "2024 - Present",
        title: 'Freelance Full Stack Developer',
        subtitle: 'Full-stack & AI/ML Projects, Backend Specialist',
        side: 'left',
    },
    {
        period: "Aug'2025 - Oct'2025",
        title: 'AI Researcher Intern',
        subtitle: 'National Chung Cheng University, Taiwan',
        side: 'right',
    },
];
