document.addEventListener('DOMContentLoaded', async function() {
    const classCardContainer = document.getElementById('classesContainer');

    const classes = [
        { name: 'Barbarian', slug: 'barbarian', imageUrl: 'https://example.com/barbarian.png' },
        { name: 'Bard', slug: 'bard', imageUrl: 'https://example.com/bard.png' },
        { name: 'Cleric', slug: 'cleric', imageUrl: 'https://example.com/cleric.png' },
        { name: 'Druid', slug: 'druid', imageUrl: 'https://i.ibb.co/6HChyYH/druid.png' },
        { name: 'Fighter', slug: 'fighter', imageUrl: 'https://i.ibb.co/9nVfvgK/warrior.png' },
        { name: 'Monk', slug: 'monk', imageUrl: 'https://i.ibb.co/d4p19z0/monk.png' },
        { name: 'Paladin', slug: 'paladin', imageUrl: 'https://i.ibb.co/nMZChj0/paladin.png' },
        { name: 'Ranger', slug: 'ranger', imageUrl: 'https://example.com/ranger.png' },
        { name: 'Rogue', slug: 'rogue', imageUrl: 'https://i.ibb.co/1K1mYyd/rogue.png' },
        { name: 'Sorcerer', slug: 'sorcerer', imageUrl: 'https://i.ibb.co/Y45RB3C/sorcerer.png' },
        { name: 'Warlock', slug: 'warlock', imageUrl: 'https://example.com/warlock.png' },
        { name: 'Wizard', slug: 'wizard', imageUrl: 'https://i.ibb.co/hBnYfdN/mage.png' }
    ];

    const baseUrl = 'https://api.open5e.com/v1';

    async function fetchClassDetails(slug) {
        try {
            const response = await fetch(`${baseUrl}/classes/${slug}`);
            if (!response.ok) {
                throw new Error(`Network error ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch details for ${slug}`, error);
            return null;
        }
    }

    async function loadClassCards() {
        const classPromises = classes.map(cls => fetchClassDetails(cls.slug));

        try {
            const classDetailsArray = await Promise.all(classPromises);

            classDetailsArray.forEach((classDetails, index) => {
                if (classDetails && classDetails.name) {
                    const imageUrl = classes[index].imageUrl;

                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${imageUrl}" alt="${classes[index].name}">
                        <h2>${classes[index].name}</h2>
                        <p>Click to see more...</p>
                    `;
                    card.addEventListener('click', function() {
                        window.location.href = `class.html?slug=${classes[index].slug}`;
                    });

                    classCardContainer.appendChild(card);
                } else {
                    console.warn(`No results found for ${classes[index].name}`);
                }
            });
        } catch (error) {
            console.error('Error loading class cards:', error);
        }
    }

    await loadClassCards();
});
