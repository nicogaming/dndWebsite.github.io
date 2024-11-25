const baseUrl = 'https://www.dnd5eapi.co';

// Fetch categories from the API
fetch(`${baseUrl}/api`)
  .then(response => response.json())
  .then(data => {
    const categories = Object.keys(data);
    const navBar = document.getElementById('nav-bar');

    // Create navigation items
    categories.forEach(category => {
      const navItem = document.createElement('a');
      navItem.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      navItem.classList.add('nav-item');
      navItem.dataset.category = category; // Add category as data attribute
      navItem.addEventListener('click', () => fetchCategoryDetails(category));
      navBar.appendChild(navItem);
    });
  })
  .catch(error => console.error('Error fetching categories:', error));

// Fetch and display category details
function fetchCategoryDetails(category) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<p>Loading...</p>'; // Loading indicator

  fetch(`${baseUrl}/api/${category}`)
    .then(response => response.json())
    .then(data => {
      // Render category details
      mainContent.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
      if (data.results && data.results.length > 0) {
        const list = document.createElement('ul');
        data.results.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item.name; // Display item names
          listItem.addEventListener('click', ()=> fetchSubcategoryDetails(item.url,item.name));
          list.appendChild(listItem);
        });
        mainContent.appendChild(list);
      } else {
        mainContent.innerHTML += '<p>No items found in this category.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching category details:', error);
      mainContent.innerHTML = '<p>Error loading data. Please try again.</p>';

          });
      }

      function fetchSubcategoryDetails(url, name) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<p>Loading details for ${name}...</p>`; // Loading indicator
  
        fetch(`${baseUrl}${url}`)
          .then(response => response.json())
          .then(data => {
            // Render subcategory details
            mainContent.innerHTML = `<h2>${name}</h2>`;
            const detailKeys = Object.keys(data);
            const details = document.createElement('div');
            detailKeys.forEach(key => {
              const detailItem = document.createElement('p');
              detailItem.innerHTML = `<strong>${key}:</strong> ${JSON.stringify(data[key])}`;
              details.appendChild(detailItem);
            });
            mainContent.appendChild(details);
          })
          .catch(error => {
            console.error('Error fetching subcategory details:', error);
            mainContent.innerHTML = `<p>Error loading details for ${name}. Please try again.</p>`;
          });
      }