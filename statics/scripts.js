const projects = [
    {
        title: "Guitar Image Classifier",
        imageUrl: "images/guitarn.gif",
        description: "Simple fine-tuned neural network to classify Fender's big three electric guitars",
        links: [
            { text: "GitHub Repo", url: "https://github.com/cswxyz/guitarNeuralNetwork" },
            { text: "Project Demo", url: "https://guitarneuralnetwork.onrender.com/" }
        ]
    },
    {
        title: "2D Platformer (In Progress)",
        imageUrl: "images/super-mario-video-game.gif",
        description: "Technically demanding platformer inspired by artistic level design and fighting game mechanics"
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
        imageUrl: "images/chip8emulator.jpg",
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
            linksContainer.style.marginTop = '10px'; // Adds space between description and links

            project.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.textContent = link.text;
                linkElement.target = "_blank"; // Opens link in new tab
                linkElement.className = 'project-link';
                linkElement.style.color = '#000000';
                linkElement.style.textDecoration = 'none';
                linkElement.style.display = 'block'; // Display each link on a new line
                linkElement.style.marginTop = '5px'; // Adds spacing between links

                linksContainer.appendChild(linkElement);
            });

            projectCard.appendChild(linksContainer);
        }

        if (index < 3) {
            topProjectsContainer.appendChild(projectCard);
        } else {
            bottomProjectsContainer.appendChild(projectCard);
        }
    });
}

// Call the function to display the projects on page load
displayProjects();

// Snowfall Effect - Creating snowflakes
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
