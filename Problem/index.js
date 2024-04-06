document.addEventListener('DOMContentLoaded', async function() {
    const postsContainer = document.getElementById('posts');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error:', error);
        postsContainer.innerHTML = '<p>Error fetching posts. Please try again later.</p>';
    }
});
