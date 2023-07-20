 // Remplacez par l'URL de base de votre API
 var apiUrl = 'http://localhost:5000/api/v1';


var options = {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('Auth Token')}`,
    }
  }

  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //       // dev code
  //       apiUrl = 'http://localhost:5000/api/v1';
  //   } else {
  //       // dev code
  //       apiUrl = 'http://localhost:5000/api/v1';
  //   }

export const apiService = {
  get: (endpoint) => {
    return fetch(`${apiUrl}/${endpoint}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        throw error;
      });
  },
  post: (endpoint, formData) => {
    return fetch(`${apiUrl}/${endpoint}`,
        {
            method: 'POST',
            body: formData,
        }
      )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        throw error;
      });
  }
  // Vous pouvez également ajouter des méthodes pour d'autres types de requêtes (POST, PUT, DELETE, etc.) selon vos besoins.
};
