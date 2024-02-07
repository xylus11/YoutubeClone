


const container = document.getElementById("display-section");
const val = document.getElementById('search-inp');
const btn = document.querySelector('button');
btn.addEventListener('click', (()=>{
    container.innerHTML='';
   const query = val.value;
   read(query);

   
  
   


}));




read('dbz');
async function read(key)
{

    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${key}&geo=US&lang=en`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
		'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
    // Assuming jsonData contains the JSON string you provided
const data = JSON.parse(result);
console.log(typeof data);
// Now you can access the properties of the data object
data.data.forEach(video => {
    function formatViews(views) {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M ';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K ';
        } else {
            return views.toString();
        }
    }
    
    // Example usage:
   const total_views=formatViews(video.viewCount);
    
      const image = video.thumbnail[0].url;
     

    const main_contain = document.createElement('div');
    const video_container = document.createElement('div');
   
    const video_desc     = document.createElement('div');
    const profile_pic    = document.createElement('div');
   
    const img=   document.createElement('img');
    const  title = document.createElement('div')
   
    img.src= image;
    video_desc.innerHTML=`<h4>${video.title}</h4>
                           <h5> ${video.channelTitle} </h5>
                           <span> ${total_views}views </span><span id='dot'>.</span> <span>${ video.publishedText} </span>
                        `;
    profile_pic.innerHTML=`<img  src=${video.channelThumbnail[0].url}  />`

   
    title.append(profile_pic);
    title.append(video_desc);
    video_container.append(img);
    
    const anchorTag = document.createElement('a');
    // Setting the href attribute to the video URL
    anchorTag.href = `video.html?videoId=${video.videoId}`;
    // Appending the video container to the anchor tag
    anchorTag.append(video_container);
    // Appending the title to the anchor tag (optional)
    anchorTag.append(title);

    main_contain.append(anchorTag);
    container.append(main_contain);
    main_contain.style.width='350px';
    profile_pic.className='channel-dp';
    main_contain.className='main-contain';
    title.className='title';
    video_desc.className='desc';
    video_container.className='video-container';
    // Accessing channel thumbnail URL
  
    // console.log("Video Title:", video.title);
    // console.log("Channel Title:", video.channelTitle);
    // console.log("Description:", video.description);
    // console.log("View Count:", video.viewCount);
    // console.log("Published Text:", video.publishedText);
    // console.log("Length:", video.lengthText);
    // Access other properties as needed
});

} catch (error) {
	console.error(error);
}
}





// const url = 'https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet&id=5r3RxHoZEyQ';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
// 		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
// 	}
// };



// async function read()
// {
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// }
// read();