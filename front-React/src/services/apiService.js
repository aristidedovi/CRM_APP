import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { setupCache } from 'axios-cache-interceptor';



 
 // Remplacez par l'URL de base de votre API
 //const apiUrl = 'http://144.126.232.79:5000/api/v1';
 var apiUrl = '';


const options = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('Auth Token')}`,
    }
  }

  const customHeaders = {
    Authorization: `Bearer ${localStorage.getItem('Auth Token')}`,// Example of an authorization header
    //'Custom-Header': 'Custom-Value', // Example of a custom header
  };


  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
     // dev code
     apiUrl = 'http://localhost:5000/api/v1/';

   } else if(!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
     // prod code
     //const currentHost = `${window.location.protocol}//${window.location.hostname}`;
     apiUrl = 'https://144.126.232.79:5000/api/v1/';
   }else {
     // test code
     apiUrl = 'http://localhost:5000/api/v1/';
   }

   // Create an Axios instance with default configurations
const apiInstance = axios.create({
  baseURL: apiUrl,
});

const responseCache = new Map();

// Custom caching duration (in milliseconds) - you can adjust this value as needed
const CACHE_DURATION = 60000; // 1 minute

// Request Interceptor
apiInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers)
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('Auth Token')}`;
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

//var productsDataCache = {};
//var prodcutsUpdateDataCache = {};

//const cache = setupCache(axios);

// Custom function to check if a cached response is still valid
function isCacheValid(cacheEntry) {
  return cacheEntry && Date.now() - cacheEntry.timestamp <= CACHE_DURATION;
}



export const apiService = {
  get: async (endpoint, options, data='data') => {
    try {
      const cacheKey = `GET`;

      const cachedResponse = responseCache.get(cacheKey);
      if (isCacheValid(cachedResponse)) {
        console.log('Serving cached GET response:', endpoint);
        return cachedResponse.data;
      }


      const response = await apiInstance.get(`${endpoint}`);
       // Store the response in the cache
      responseCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      return response.data;

      // console.log(prodcutsUpdateDataCache)
      // if (!productsDataCache[data]) {
      //   const response = await apiInstance.get(`${endpoint}`);
      //   productsDataCache[data] = response.data
      // }
      
      // return productsDataCache[data];
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        toast.error(error.message)
        window.location.reload()

      }else {
        console.error('Fetch Error:', error);
      }
      
      throw error;
    }
  },
  post: async (endpoint, formData, data='data') => {
    try{
      const cacheKey = `GET`;
      const cacheKeyUpdate = `GET-UPDATE`;
      
      const response = await apiInstance.post(endpoint, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });

      // Clear the cached response for this POST endpoint
      responseCache.delete(cacheKey);
      responseCache.delete(cacheKeyUpdate);

      //productsDataCache = {}
      //prodcutsUpdateDataCache = {}

      //apiService.get()
      //apiService.get_update_products()

      return response.data;

    } catch (error) {
      
      if (error.response.status === 401) {
        localStorage.clear()
        toast.error(error.message)
        window.location.reload()
        //useNavigate().navigate('/auth/login')

      }else {
        console.error('Fetch Error:', error);
      }
      //console.error('Fetch Error:', error);
      throw error;
    }
  },
  get_update_products: async (endpoint, data='data') => {
    try{

      const cacheKey = `GET-UPDATE`;

      const cachedResponse = responseCache.get(cacheKey);
      if (isCacheValid(cachedResponse)) {
        console.log('Serving cached GET response:', endpoint);
        return cachedResponse.data;
      }

      const response = await apiInstance.get(`${endpoint}`);
       // Store the response in the cache
       responseCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });


      return response.data;
      // if (!prodcutsUpdateDataCache[data]) {
      //   const response = await apiInstance.get(`${endpoint}`);
      //   prodcutsUpdateDataCache[data] = response.data
      // }
      // //prodcutsUpdateDataCache[data] = {}
      // //console.log(prodcutsUpdateDataCache[data])
      
      // return prodcutsUpdateDataCache[data];

      //const response = await apiInstance.get(`${endpoint}`);
      //return response.data;

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        toast.error(error.message)
        window.location.reload()

      }else {
        console.error('Fetch Error:', error);
      }
      //console.error('Fetch Error:', error);
      throw error;
    }
  }
  // get: (endpoint) => {
  //   return fetch(`${apiUrl}/${endpoint}`, options)
  //     .then(response => {
  //       // if (!response.ok) {
  //       //   //<Navigate to="/auth/login" replace={true} />
  //       //   //sessionStorage.clear()

  //       //   throw new Error('Network response was not ok');
  //       // }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('Fetch Error:', error);
  //       throw error;
  //     });
  // },
  // post: (endpoint, formData) => {
  //   return fetch(`${apiUrl}/${endpoint}`,
  //       {
  //           method: 'POST',
  //           body: formData,
  //       }
  //     )
  //     .then(response => {
  //       // if (!response.ok) {
  //       //   //<Navigate to="/auth/login" replace={true} />
  //       //   //sessionStorage.clear()
  //       //   throw new Error('Network response was not ok');
  //       // }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('Fetch Error:', error);
  //       throw error;
  //     });
  // }, 
  // get_update_products: (endpoint) => {
  //   return fetch(`${apiUrl}/${endpoint}`, options)
  //   .then(response => {
  //     // if(!response.ok) {
  //     //   //<Navigate to="/auth/login" replace={true} />
  //     //   //sessionStorage.clear()
  //     //   throw new Error('Network response was not ok');
  //     // }
  //     return response.json();
  //   })
  //   .catch(error => {
  //     console.error('Fetch Error', error);
  //     throw error;
  //   })
  // }
  // Vous pouvez également ajouter des méthodes pour d'autres types de requêtes (POST, PUT, DELETE, etc.) selon vos besoins.
};
