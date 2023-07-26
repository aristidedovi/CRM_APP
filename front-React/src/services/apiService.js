import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

 
 
 // Remplacez par l'URL de base de votre API
 const apiUrl = 'http://144.126.232.79:5000/api/v1';
 //const apiUrl = 'http://localhost:5000/api/v1';


const options = {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('Auth Token')}`,
    }
  }


  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   // dev code
  //   apiUrl = 'http://localhost:5000/api/v1';
  // } else if(!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
  //   // prod code
  //   const currentHost = `${window.location.protocol}//${window.location.hostname}`;
  //   apiUrl = currentHost+':5000/api/v1';
  // }else {
  //   // test code
  //   apiUrl = 'http://localhost:5000/api/v1';
  // }

export const apiService = {
  get: (endpoint) => {
    return fetch(apiUrl+'/'+endpoint, options)
      .then(response => {
        if (!response.ok) {
          //<Navigate to="/auth/login" replace={true} />
          sessionStorage.clear()

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
    return fetch(apiUrl+'/'+endpoint,
        {
            method: 'POST',
            body: formData,
        }
      )
      .then(response => {
        if (!response.ok) {
          //<Navigate to="/auth/login" replace={true} />
          sessionStorage.clear()
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        throw error;
      });
  }, 
  get_update_products: (endpoint) => {
    return fetch(apiUrl+'/'+endpoint, options)
    .then(response => {
      if(!response.ok) {
        //<Navigate to="/auth/login" replace={true} />
        sessionStorage.clear()
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch Error', error);
      throw error;
    })
  }
  // Vous pouvez également ajouter des méthodes pour d'autres types de requêtes (POST, PUT, DELETE, etc.) selon vos besoins.
};
