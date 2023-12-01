 const jsonLink = 'https://raw.githubusercontent.com/swaggyP36000/TrollStore-IPAs/main/apps.json';
const readmeLink = 'https://raw.githubusercontent.com/swaggyP36000/TrollStore-IPAs/main/README.md?plain=1';

let originalApps = [];

// Loading progress bar elements
const loadingProgressBar = document.getElementById('loadingProgressBar');
const loadingProgress = document.getElementById('loadingProgress');

function updateProgressBar(percentage) {
  loadingProgressBar.style.width = percentage + '%';
}

function fetchWithProgressBar(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        updateProgressBar(percentage);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`Failed to fetch: ${url}, status: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error(`Failed to fetch: ${url}`));
    };
    xhr.send();
  });
}

Promise.all([fetchWithProgressBar(jsonLink), fetch(readmeLink)])
  .then(([jsonResponse, readmeResponse]) => {
    originalApps = JSON.parse(jsonResponse).apps;
    displayApps(originalApps);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    hideLoadingSpinner();
  })
  .finally(() => {
    // Hide loading progress bar
    loadingProgress.style.display = 'none';
  });

function displayApps(apps) {
  showLoadingSpinner();

  // Sort apps based on version date in descending order
  apps.sort((a, b) => {
    return new Date(b.versionDate) - new Date(a.versionDate);
  });

  const latestVersions = {}; // Keep track of the latest version for each app

  const appListDiv = document.getElementById('appList');
  appListDiv.innerHTML = '';

  apps.forEach(app => {
    const appDiv = document.createElement('div');
    appDiv.className = 'app-container';

    // Check if this is the latest version for this app
    const isLatest = !latestVersions[app.bundleIdentifier] || new Date(app.versionDate) > latestVersions[app.bundleIdentifier];

    // If it's the latest, update the latestVersions object
    if (isLatest) {
      latestVersions[app.bundleIdentifier] = new Date(app.versionDate);
    }

    appDiv.innerHTML = `
      <h3>${app.name} (${app.version})${isLatest ? '<span class="latest-version-label">(Latest)</span>' : ''}</h3>
      <img src="${app.iconURL}" alt="${app.name} icon">
      <p><strong>Bundle Identifier:</strong> ${app.bundleIdentifier}</p>
      <p><strong>Size:</strong> ${app.size} bytes</p>
      <p><strong>Version Date:</strong> ${app.versionDate}</p>
      <p><strong>Download:</strong> <a href="${app.downloadURL}" target="_blank">Download Now</a></p>
      <button onclick="showAppDetails('${app.name}')">Show Details</button>
      <button onclick="installApp('${app.downloadURL}')">TrollStore</button>
    `;

    // Add the 'show' class to trigger the fade-in animation
    appDiv.classList.add('show');

    appListDiv.appendChild(appDiv);
  });

  hideLoadingSpinner();
}

    function filterApps() {
      const searchInput = document.getElementById('searchInput');
      const searchTerm = searchInput.value.toLowerCase();

      const filteredApps = originalApps.filter(app => app.name.toLowerCase().includes(searchTerm));
      displayApps(filteredApps);
    }

    function showAppDetails(appName) {
      showLoadingSpinner();

      // Fetch the README.md content
      fetch(readmeLink)
        .then(response => response.text())
        .then(data => {
          // Extract the details based on the app name
          const regex = new RegExp(`\\| ${appName} \\| ([^|]+) \\| ([^|]+) \\|`, 's');
          const matches = data.match(regex);

          if (matches) {
            const description = matches[1].trim();
            const status = matches[2].trim();

            // Display the details in the modal
            const detailsModal = document.getElementById('detailsModal');
            const detailsContent = document.getElementById('detailsContent');
            detailsContent.innerHTML = `
            <h3>${appName} Details</h3>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Description:</strong> ${description}</p>
            <button onclick="closeDetailsModal()">OK</button>
          `;
            detailsModal.style.display = 'flex';
          } else {
            alert(`Details not found for ${appName}`);
          }

          hideLoadingSpinner();
        })
        .catch(error => {
          console.error('Error fetching app details:', error);
          hideLoadingSpinner();
        });
    }

    function closeDetailsModal() {
      const detailsModal = document.getElementById('detailsModal');
      detailsModal.style.display = 'none';
    }

    // TrollStore

    function showConfirmationModal(ipaURL) {
      const confirmationModal = document.getElementById('confirmationModal');
      confirmationModal.style.display = 'flex';

      // Add the following line to set the ipaURL in the confirmation modal
      document.getElementById('confirmationModal').dataset.ipaURL = ipaURL;
    }

    function confirmInstall() {
      showLoadingSpinner();

      // Get the ipaURL from the confirmation modal dataset
      const ipaURL = document.getElementById('confirmationModal').dataset.ipaURL;

      // Construct the TrollStore URL scheme
      const trollStoreURL = `apple-magnifier://install?url=${ipaURL}`;

      // Redirect to the TrollStore URL scheme
      window.open(trollStoreURL, '_blank');

      // Hide the loading spinner once the installation is complete
      hideLoadingSpinner();
      closeConfirmationModal();
    }

    function closeConfirmationModal() {
      const confirmationModal = document.getElementById('confirmationModal');
      confirmationModal.style.display = 'none';
    }


    function installApp(ipaURL) {
      // Show the confirmation modal
      showConfirmationModal(ipaURL);
    }

    function showLoadingSpinner() {
      const loadingSpinner = document.getElementById('loadingSpinner');
      loadingSpinner.style.display = 'flex';
    }

    function hideLoadingSpinner() {
      const loadingSpinner = document.getElementById('loadingSpinner');
      loadingSpinner.style.display = 'none';
    }
