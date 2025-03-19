
const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

// Exemplo de uso em uma chamada à API
const response = await fetch(`https://api.unsplash.com/topics/wallpapers/photos?orientation=landscape/?client_id=${apiKey}`);
const data = await response.json();
console.log(data);

//https://api.unsplash.com/topics/wallpapers/photos?orientation=landscape/?client_id=CVe-zanwCUH01uEG2XrfRKUQK-M8rFgO18oZK22X8VE