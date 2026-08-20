export interface Lab {
  id: string
  name: string
  focus: string
  color: string
  logo: string
  image_id: string
  video_id: string
  description: string
  mission: string
  executives: {
    name: string
    role: string
    image?: string
    github?: string
    linkedin?: string
  }[]
  members: {
    name: string
    year: string
    github?: string
    linkedin?: string
  }[]
}



export const labs: Lab[] = [
  {
    id: "prajna-kritrima",
    name: "Prajna Kritrima Lab",
    focus: "AI/ML, Deep Learning & Generative AI",
    color: "#8B5CF6",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "v1771107649/web_nxsjmf",
    video_id: "v1771108954/aiml_nth8ay", // Add Cloudinary video public ID here if available
    description: "Prajna Kritrima — Sanskrit for Artificial Intelligence (Prajna = wisdom, Kritrima = man-made) — is where brains meet bytes! As the AI, ML, and DL wing of the Singularity Student Research Lab, we tinker, train, and twist neural nets into life. From wild AI agents to deep learning experiments, it’s where curiosity codes intelligence!",
    mission: "To advance the field of artificial intelligence through innovative research in machine learning, deep learning, and generative AI. We aim to create intelligent systems that are not only powerful but also ethical, explainable, and beneficial to society. Our research spans from fundamental theoretical advances to practical applications that solve real-world problems.",
    executives: [
      {
        name: "B Md Fawaz",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073654/team/fawaz.png",
        github: "https://github.com/f4w4z",
        linkedin: "https://www.linkedin.com/in/fawaaaaz/"
      },
      {
        name: "Lavjeet Kumar Rai",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073655/team/lavjeet.png",
        github: "https://github.com/lavjeetrai",
        linkedin: "https://www.linkedin.com/in/lavjeet-rai/"
      }
    ],
    members: [
      { name: "A Sai Shivanand", year: "Member", github: "https://github.com/asaishivanand-design", linkedin: "https://www.linkedin.com/in/sai-shivanand-appalla-9398b3321?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Akash Pandey", year: "Member" },
      { name: "Jameela Muskaan", year: "Member" },
      { name: "K Guna Vishnu", year: "Member", github: "https://github.com/vishnukusi", linkedin: "https://www.linkedin.com/in/guna-vishnu-kusi-208522375?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Priyanshu", year: "Member", github: "https://github.com/Priyanshu-777", linkedin: "https://www.linkedin.com/in/priyanshu002" },
      { name: "Ritabbrata Chakraborty", year: "Member", github: "https://github.com/ChakrabortyRitabbrata-design", linkedin: "https://www.linkedin.com/in/ritabbrata-chakraborty-028a83342?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Shashanka Biswas", year: "Member", github: "https://github.com/Shashanka25", linkedin: "https://www.linkedin.com/in/shashanka-biswas-b09967395?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Surya Teja E", year: "Member", github: "https://github.com/sonic-08/", linkedin: "https://www.linkedin.com/in/surya-teja-evuri-3bb1933b1" },
      { name: "Tarun Karma", year: "Member", github: "https://github.com/HackerZ-app", linkedin: "https://www.linkedin.com/in/tarun-karma-581a043b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Y Naga Pragnesh", year: "Member", github: "https://www.gitHub.com/Pragnesh-10", linkedin: "https://www.linkedin.com/in/yedrunagapragnesh" },
    ]
  },
  {
    id: "aanu-tattva",
    name: "Aanu Tattva Lab",
    focus: "Quantum Computing & Quantum Machine Learning",
    color: "#06B6D4",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "v1771107649/web_nxsjmf",
    video_id: "v1771110349/anu_x3nf1r",
    description: "Aanu Tattva Lab, derived from Sanskrit where 'Aanu' means atom and 'Tattva' means principle or essence, is the Quantum Computing division of the Singularity Student Research Lab at SRM University AP. It's where physics meets computation — students explore qubits, entanglement, and quantum algorithms to decode the mysteries of the subatomic world. From theoretical foundations to quantum simulations, Aanu Tattva Lab is where the next wave of computational revolution begins.",
    mission: "To unlock the potential of quantum computing through groundbreaking research in quantum algorithms, quantum machine learning, and quantum error correction. We aim to develop practical quantum solutions that provide exponential speedups over classical computing for real-world problems in optimization, simulation, and artificial intelligence.",
    executives: [
      {
        name: "Baratam Praneeth Gupta",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073657/team/praneeth_gupta.jpg",
        github: "https://github.com/Praneeth0910",
        linkedin: "https://www.linkedin.com/in/baratam-praneeth-gupta-baba24361?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      }
    ],
    members: [
      { name: "Ashwath Raj M", year: "Member", github: "https://github.com/Ashwath-Raj", linkedin: "https://www.linkedin.com/in/ashwath-raj-mulakalapalli?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "K. Y. Vardhan", year: "Member", github: "https://github.com/vardhan-kadali", linkedin: "https://www.linkedin.com/in/vardhan-kadali-655446395/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B7Z4BIk%2BST5CYd23ROdHC1g%3D%3D" },
      { name: "SRI VASTAVA SRI HARSHA GAMPA", year: "Member", github: "https://github.com/SRIVASTAVASRIHARSHA", linkedin: "https://www.linkedin.com/in/sri-vastava-sri-harsha-gampa-830b64382?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Aditi Gupta", year: "Member" }
    ]
  },
  {
    id: "chitra-darshan",
    name: "Chitra Darshan Lab",
    focus: "Game Development, AR, VR & Mixed Reality",
    color: "#EC4899",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "lab_chitra_darshan_v123",
    video_id: "v1771109806/game_ngq6ll",
    description: "Chitra Darshan Lab, meaning 'vision through imagery' in Sanskrit, is the AR, VR, MR, and Game Development division of the Singularity Student Research Lab at SRM University AP. It's where imagination meets immersion — students craft virtual worlds, interactive experiences, and mixed reality applications that blur the line between the real and the digital. From gamified learning to futuristic simulations, Chitra Darshan Lab is the canvas where creativity comes alive in 3D.",
    mission: "To revolutionize interactive entertainment and spatial computing through innovative game development, virtual reality, and augmented reality technologies. We create immersive experiences that engage, educate, and inspire users while advancing the state-of-the-art in real-time graphics, spatial computing, and human-computer interaction.",
    executives: [
      {
        name: "Pranav Sikka",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073656/team/pranav.png"
      },
      {
        name: "Shambo Chakraborty",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073658/team/shambo.jpg",
        github: "https://github.com/shambochakraborty10-stack",
        linkedin: "https://www.linkedin.com/in/shambo-chakraborty-480747395?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      }
    ],
    members: []
  },
  {
    id: "varahamihira",
    name: "Varahamihira Lab",
    focus: "Cybersecurity, Blockchain & Digital Defense",
    color: "#3B82F6",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "lab_chitra_darshan_v123",
    video_id: "v1771110176/cloud_jyh7tx",
    description: "Varahamihira Lab, named after the brilliant astronomer and polymath, is the Cybersecurity and Blockchain division of the Singularity Student Research Lab at SRM University AP. It's where cryptography meets security and strategy meets digital defense — students architect decentralized networks, fortify digital infrastructure, and explore threat intelligence. From smart contracts to safeguarding cyberspace, Varahamihira Lab empowers minds to protect the future of the digital world.",
    mission: "To advance cybersecurity and blockchain technology through innovative research in threat detection, cryptographic systems, smart contract auditing, and digital defense. We aim to architect secure, resilient decentralized solutions that protect critical infrastructure in an increasingly connected world.",
    executives: [
      {
        name: "Anmol Sharma",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073653/team/anmol.png",
        github: "https://github.com/Gostmennnnn",
        linkedin: "https://www.linkedin.com/in/Anmol-sharma-ba0b6a387"
      },
      {
        name: "Aditya Joshi",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073651/team/aditya.jpg",
        github: "https://github.com/adityajoshi18vk-art",
        linkedin: "https://www.linkedin.com/in/aditya-joshi-659001350/"
      }
    ],
    members: [
      { name: "Ayush Agnihotri", year: "Member", github: "https://github.com/ayushagnihotrii", linkedin: "https://www.linkedin.com/in/ayush-agnihotri-b3719b380" },
      { name: "Tanishq Yadav", year: "Member" },
      { name: "Ishan Jha", year: "Member" },
      { name: "Yugal Sunil Patil", year: "Member" }
    ]
  },
  {
    id: "bhaskaracharya",
    name: "Bhaskaracharya Lab",
    focus: "Web Development & Cloud Computing",
    color: "#10B981",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "lab_chitra_darshan_v123",
    video_id: "v1771109808/nav_gezae4",
    description: "Bhaskaracharya Lab, named after the legendary mathematician and astronomer, is the Web Development and Cloud Computing division of the Singularity Student Research Lab at SRM University AP. It's where design meets logic and creativity meets code — students craft resilient web architectures, scalable cloud platforms, and digital experiences that speak innovation. From front-end flair to back-end cloud brilliance, Bhaskaracharya Lab is the playground where ideas turn into interactive realities.",
    mission: "To advance web technologies and cloud computing through innovative research in distributed architectures, full-stack systems, and scalable cloud infrastructure. We develop high-performance, accessible solutions that power modern digital platforms and transform user experiences across the web.",
    executives: [
      {
        name: "Yuvraj Singh",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073660/team/yuvraj.jpg",
        github: "https://github.com/YUVRAJ-SINGH-3178",
        linkedin: "https://www.linkedin.com/in/yuvraj-singh-3178saturn/"
      },
      {
        name: "Praneeth",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073657/team/praneeth.jpg",
        github: "https://github.com/praneethzz",
        linkedin: "https://www.linkedin.com/in/praneeth-zz-985638391?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      }
    ],
    members: [
      { name: "Arnav Mehar", year: "Member", github: "https://github.com/Arnavmehar-5", linkedin: "https://www.linkedin.com/in/arnavmehar" },
      { name: "Avantika Singh", year: "Member", github: "https://github.com/avantika770", linkedin: "https://www.linkedin.com/in/avantika-space" },
      { name: "Jignesh Setty", year: "Member", github: "https://github.com/JIGNESH-SETTY", linkedin: "https://www.linkedin.com/in/jignesh-setty-957620380?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { name: "Sunkara Purna Jaswanth", year: "Member", github: "https://github.com/purnajaswanth-dev", linkedin: "https://linkedin.com/in/sunkara-purna-jaswanth" },
      { name: "Vinay Sathwik Motakatla", year: "Member", github: "https://github.com/vinaysathwik-ai", linkedin: "https://www.linkedin.com/in/motakatla-vinay-sathwik-387b94392/" },
      { name: "Yash Jaiswal", year: "Member", github: "https://github.com/Yash-programs16", linkedin: "https://www.linkedin.com/in/yash-jaiswal-78390739b?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
    ]
  },
  {
    id: "agastya",
    name: "Agastya Lab",
    focus: "Robotics, IoT & Embedded Systems",
    color: "#F97316",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "lab_chitra_darshan_v123",
    video_id: "v1771114402/robo_e9htbm",
    description: "Agastya Lab, inspired by the ancient sage known for his wisdom and innovation, is the Drones, IoT, and LoRa division of the Singularity Student Research Lab at SRM University AP. It's where circuits take flight and ideas connect — students build smart systems, autonomous drones, and long-range IoT networks that bridge the physical and digital worlds. From sky to sensor, Agastya Lab turns imagination into intelligent motion.",
    mission: "To advance the field of robotics, IoT, and embedded systems through innovative research in autonomous systems, smart sensors, and intelligent automation. We develop practical solutions that enhance human capabilities, improve efficiency, and create sustainable smart environments that benefit society and industry.",
    executives: [
      {
        name: "Agastya Pandey",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073651/team/agastya_pandey.jpg"
      }
    ],
    members: [
      { name: "Hriday Lath", year: "Member", linkedin: "https://www.linkedin.com/in/hridaylath" },
      { name: "Yandava Abhishek", year: "Member", github: "https://github.com/abhishekyandava7-png", linkedin: "https://www.linkedin.com/in/abhishek-yandava-557333352?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    ]
  },
  {
    id: "navya-vigyan",
    name: "Navya Vigyan Lab",
    focus: "Interdisciplinary & Experimental Technology",
    color: "#EF4444",
    logo: "https://res.cloudinary.com/djtemmctt/image/upload/v1771104005/singularity_new_logo_knedxr.png",
    image_id: "lab_chitra_darshan_v123",
    video_id: "v1771109807/Cyber_a7d0jd",
    description: "Navya Vigyan Lab, meaning 'Modern Science' in Sanskrit, is the Interdisciplinary and Management division of the Singularity Student Research Lab at SRM University AP. It's where innovation meets organization — students blend technology with strategy, exploring intersections of research, entrepreneurship, and leadership. From managing projects to driving interdisciplinary collaborations, Navya Vigyan Lab empowers visionaries to turn ideas into impactful realities.",
    mission: "To pioneer breakthrough innovations through interdisciplinary research and experimental technology development. We bring together diverse scientific disciplines to tackle complex global challenges, creating novel solutions that transcend traditional boundaries and open new possibilities for human advancement and technological progress.",
    executives: [
      {
        name: "Supreet Kothuri",
        role: "Executive",
        image: "https://res.cloudinary.com/dtlder1hw/image/upload/v1787073660/team/supreet.png"
      }
    ],
    members: []
  }
];
