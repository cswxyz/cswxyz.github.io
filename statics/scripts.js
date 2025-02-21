// Array of projects
const projects = [
    {
        title: "Guitar Image Classifier",
        imageUrl: "images/awesome.gif",
        description: "Simple fine-tuned neural network to classify Fender's big three electric guitars",
        links: [
            { text: "GitHub Repo", url: "https://github.com/cswxyz/guitarNeuralNetwork" },
            { text: "Project Demo", url: "https://guitarneuralnetwork.onrender.com/" }
        ]
    },
    {
        title: "Analog Delay Guitar Pedal",
        imageUrl: "images/delay.gif",
        description: "Designed and built a delay pedal for personal recording use"
    },
    {
        title: "Autonomous Vehicle Reinforcement Learning",
        imageUrl: "images/success.gif",
        description: "Hackathon research project, simple reward-based learning approach to vehicle driving",
        links: [
            { text: "Abstract", url: "images/hackresearchwin.pdf" },
            { text: "GitHub Repo", url: "https://github.com/cswxyz/hackresearch2024" }
        ]
    },
    {
        title: "Chip8 Emulator",
        imageUrl: "images/glitch.gif",
        description: "Simple emulator for classic retro games",
        links: [
            { text: "GitHub Repo", url: "https://github.com/cswxyz/chip8emulator" }
        ]
    },
    {
        title: "Preventing Opioid Abuse",
        imageUrl: "images/opioidabuse.jpg",
        description: "Pill bottle constrained by time, to prevent overuse of prescription drugs"
    }
];

// Function to display projects dynamically
function displayProjects() {
    const topProjectsContainer = document.getElementById('top-projects');
    const bottomProjectsContainer = document.getElementById('bottom-projects');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const projectImage = document.createElement('img');
        projectImage.src = project.imageUrl;
        projectImage.alt = project.title;
        projectImage.className = 'project-image';

        const projectTitle = document.createElement('div');
        projectTitle.className = 'project-title';
        projectTitle.textContent = project.title;

        const projectDescription = document.createElement('p');
        projectDescription.className = 'project-description';
        projectDescription.textContent = project.description;

        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDescription);

        // Add multiple links if the project has them
        if (project.links) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'project-links';
            linksContainer.style.marginTop = '10px';

            project.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.textContent = link.text;
                linkElement.target = "_blank";
                linkElement.className = 'project-link';
                linksContainer.appendChild(linkElement);
            });

            projectCard.appendChild(linksContainer);
        }

        // Distribute projects between the top and bottom containers
        if (index < 3) {
            topProjectsContainer.appendChild(projectCard);
        } else {
            bottomProjectsContainer.appendChild(projectCard);
        }
    });
}

// Display projects on page load
displayProjects();

// Snowfall effect
const snowflakeCount = 50;
const body = document.body;

for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.classList.add(`snowflake-${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`);
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random fall duration
    snowflake.style.animationDelay = `${Math.random() * 5}s`; // Random delay before falling starts

    body.appendChild(snowflake);
}
